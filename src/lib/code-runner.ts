export interface CheckResult {
  name: string;
  pass: boolean;
  detail?: string;
}

export interface RunResult {
  ok: boolean;
  results?: CheckResult[];
  error?: string;
  timedOut?: boolean;
}

// Runs entirely inside a Web Worker: no DOM access, no access to the page
// or its cookies/storage — the same trust boundary as pasting code into a
// browser console, just off the main thread so an infinite loop or runaway
// recursion in the user's own code can't freeze the page.
const WORKER_SOURCE = `
self.onmessage = function (e) {
  var userCode = e.data.userCode;
  var testCode = e.data.testCode;
  try {
    var preamble =
      '"use strict";\\n' +
      'var __results = [];\\n' +
      'function __check(name, pass, detail) { __results.push({ name: name, pass: !!pass, detail: detail || "" }); }\\n' +
      // Structural equality: order-sensitive for arrays (order is often
      // the point of the question), order-INsensitive for plain objects
      // (two objects with the same keys in a different order are still
      // equal — this matters once a question's answer is itself an
      // object, since key order isn't part of the contract).
      'function __deepEqual(a, b) {\\n' +
      '  if (a === b) return true;\\n' +
      '  if (a === null || b === null) return a === b;\\n' +
      '  if (typeof a !== "object" || typeof b !== "object") return false;\\n' +
      '  if (Array.isArray(a) !== Array.isArray(b)) return false;\\n' +
      '  if (Array.isArray(a)) {\\n' +
      '    if (a.length !== b.length) return false;\\n' +
      '    for (var i = 0; i < a.length; i++) { if (!__deepEqual(a[i], b[i])) return false; }\\n' +
      '    return true;\\n' +
      '  }\\n' +
      '  var aKeys = Object.keys(a), bKeys = Object.keys(b);\\n' +
      '  if (aKeys.length !== bKeys.length) return false;\\n' +
      '  for (var j = 0; j < aKeys.length; j++) {\\n' +
      '    var k = aKeys[j];\\n' +
      '    if (!Object.prototype.hasOwnProperty.call(b, k)) return false;\\n' +
      '    if (!__deepEqual(a[k], b[k])) return false;\\n' +
      '  }\\n' +
      '  return true;\\n' +
      '}\\n';
    // The test suite runs inside an async IIFE so it's free to use
    // "await" (needed for anything promise-based) — a synchronous test
    // suite works exactly the same as before, it just resolves on the
    // next microtask instead of returning immediately.
    var harness =
      preamble + userCode + '\\n' +
      'return (async function () {\\n' + testCode + '\\n' + 'return __results;\\n' + '})();';
    var resultPromise = new Function(harness)();
    Promise.resolve(resultPromise).then(function (results) {
      self.postMessage({ ok: true, results: results });
    }, function (err) {
      self.postMessage({ ok: false, error: (err && err.message) ? err.message : String(err) });
    });
  } catch (err) {
    self.postMessage({ ok: false, error: (err && err.message) ? err.message : String(err) });
  }
};
`;

const TIMEOUT_MS = 3000;

/**
 * Runs `userCode` (whatever the visitor typed) followed by `testCode` (a
 * per-question suite of `__check(name, pass, detail)` calls, with a
 * `__deepEqual` helper available) inside a fresh, disposable Web Worker.
 */
export function runUserTests(userCode: string, testCode: string): Promise<RunResult> {
  return new Promise((resolve) => {
    let settled = false;
    const blob = new Blob([WORKER_SOURCE], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    const finish = (result: RunResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(result);
    };

    const timer = setTimeout(() => {
      finish({
        ok: false,
        timedOut: true,
        error: `Timed out after ${TIMEOUT_MS / 1000}s — check for an infinite loop or unbounded recursion.`,
      });
    }, TIMEOUT_MS);

    worker.onmessage = (e: MessageEvent<RunResult>) => finish(e.data);
    worker.onerror = (e) => finish({ ok: false, error: e.message || "The worker crashed while running your code." });

    worker.postMessage({ userCode, testCode });
  });
}
