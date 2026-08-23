import { ArticleSection } from "@/components/ui/section";
import { AnimationCard } from "@/components/ui/animation-card";
import { Code, InterviewNote, P, ProblemStatement, Ul } from "@/components/ui/prose";
import { CodeBlock } from "@/components/ui/code-block";
import { Reveal } from "@/components/ui/reveal";
import { CodePlayground } from "@/components/coding-questions/code-playground";
import { PromiseAllTrace } from "@/components/animations/promise-all-trace";

const PROMISE_ALL_STARTER = `function promiseAll(promises) {
  // your code here — return a Promise
}`;

const PROMISE_ALL_TESTS = `
if (typeof promiseAll !== "function") {
  __check("promiseAll is defined", false, "Expected a top-level function named 'promiseAll'.");
} else {
  var p1 = new Promise(function (resolve) { setTimeout(function () { resolve("A"); }, 30); });
  var p2 = new Promise(function (resolve) { setTimeout(function () { resolve("B"); }, 10); });
  var p3 = new Promise(function (resolve) { resolve("C"); });

  try {
    var result1 = await promiseAll([p1, p2, p3]);
    __check("resolves with values in the original order, not settle order", __deepEqual(result1, ["A", "B", "C"]), "got " + JSON.stringify(result1));
  } catch (err) {
    __check("resolves with values in the original order, not settle order", false, "threw/rejected: " + (err && err.message ? err.message : String(err)));
  }

  try {
    var result2 = await promiseAll([]);
    __check("resolves with an empty array for empty input", __deepEqual(result2, []), "got " + JSON.stringify(result2));
  } catch (err) {
    __check("resolves with an empty array for empty input", false, "threw/rejected instead of resolving");
  }

  try {
    await promiseAll([
      new Promise(function (resolve) { setTimeout(function () { resolve("ok"); }, 20); }),
      Promise.reject("boom"),
    ]);
    __check("rejects when any input promise rejects", false, "expected a rejection, but it resolved");
  } catch (err) {
    __check("rejects when any input promise rejects", err === "boom", "rejected with " + JSON.stringify(err) + " instead of \\"boom\\"");
  }

  try {
    var result4 = await promiseAll([1, Promise.resolve(2), 3]);
    __check("handles plain values mixed in with promises", __deepEqual(result4, [1, 2, 3]), "got " + JSON.stringify(result4));
  } catch (err) {
    __check("handles plain values mixed in with promises", false, "threw/rejected: " + (err && err.message ? err.message : String(err)));
  }
}
`;

const PROMISE_ALL_SOLUTION = `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((item, index) => {
      Promise.resolve(item).then((value) => {
        results[index] = value;
        completed += 1;
        if (completed === promises.length) {
          resolve(results);
        }
      }, reject); // any single rejection rejects the whole thing, immediately
    });
  });
}`;

const ALL_SETTLED_SNIPPET = `function promiseAllSettled(promises) {
  return Promise.all(
    promises.map((item) =>
      Promise.resolve(item).then(
        (value) => ({ status: "fulfilled", value }),
        (reason) => ({ status: "rejected", reason })
      )
    )
  );
}`;

const RACE_SNIPPET = `function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((item) => {
      Promise.resolve(item).then(resolve, reject);
    });
  });
}`;

export function PromiseAllQuestion() {
  return (
    <ArticleSection id="promise-all" index="05" kicker="Hard · Promises & Async" title="Implement Promise.all">
      <ProblemStatement>
        Write a function <Code>promiseAll(promises)</Code> that takes an
        array of promises (or plain values) and returns a new{" "}
        <Code>Promise</Code> that resolves with an array of every resolved
        value, in the same order as the input — once all of them have
        resolved. If any of them rejects, <Code>promiseAll</Code> should
        reject immediately with that reason, without waiting for the rest.
      </ProblemStatement>

      <P>
        This is really a polyfill for the real <Code>Promise.all</Code>.
        The two behaviors worth internalizing before you write a line of
        code: the output order always matches the input order, regardless
        of which promise actually finishes first — and one rejection
        anywhere short-circuits the whole thing immediately.
      </P>

      <AnimationCard eyebrow="Same three promises, two outcomes">
        <PromiseAllTrace />
      </AnimationCard>

      <P>
        Write your solution below and run it against a few checks — no
        setup, it runs right here in your browser.
      </P>

      <CodePlayground slug="promise-all" starterCode={PROMISE_ALL_STARTER} testCode={PROMISE_ALL_TESTS} />

      <Reveal label="Show reference solution">
        <CodeBlock code={PROMISE_ALL_SOLUTION} />
      </Reveal>

      <P>
        Walking through it: <Code>promiseAll</Code> itself returns a{" "}
        <Code>new Promise</Code> right away — everything else happens
        inside its executor. For each item, <Code>Promise.resolve(item)</Code>{" "}
        normalizes it (a plain value becomes an already-resolved promise, a
        real promise passes through unchanged), then <Code>.then(value =&gt; ..., reject)</Code>{" "}
        attaches two handlers: on success, store the value and check if
        every promise has now completed; on failure, reject the outer
        promise immediately with whatever <Code>reject</Code> gets called
        with.
      </P>

      <InterviewNote question="Why does results[index] = value work correctly even though the promises can resolve in any order?">
        Because <Code>index</Code> is captured in a closure created fresh
        for each iteration of <Code>.forEach</Code> — every promise&apos;s{" "}
        <Code>.then</Code> callback &ldquo;remembers&rdquo; exactly which
        slot in the <Code>results</Code> array it owns, independent of when
        it actually fires. p3 can finish before p1 and it still lands at{" "}
        <Code>results[0]</Code> only when p1&apos;s own handler runs — the
        array is being filled in by index, not by arrival order.
      </InterviewNote>

      <InterviewNote question="Why wrap every item in Promise.resolve() instead of assuming they're all promises?">
        The real <Code>Promise.all</Code> accepts a mix of promises and
        plain values — <Code>Promise.resolve(value)</Code> on a non-promise
        just returns an already-resolved promise wrapping it, so the same{" "}
        <Code>.then</Code> logic handles both cases uniformly without a
        separate branch to check &ldquo;is this actually a promise?&rdquo;
      </InterviewNote>

      <InterviewNote question="How would you implement Promise.allSettled instead?">
        The key difference: it never rejects early — it waits for{" "}
        <em>every</em> promise no matter what, and wraps each outcome in a{" "}
        <Code>{'{ status, value }'}</Code> or{" "}
        <Code>{'{ status, reason }'}</Code> object instead of letting a
        rejection propagate. One clean way to build it: turn every possible
        rejection into a resolution first, then reuse{" "}
        <Code>Promise.all</Code> (or your own <Code>promiseAll</Code>) on
        the result.
        <div className="mt-3">
          <CodeBlock code={ALL_SETTLED_SNIPPET} />
        </div>
      </InterviewNote>

      <InterviewNote question="How would you implement Promise.race?">
        Much simpler — settle with whichever promise finishes first, in
        either direction, and ignore the rest entirely:
        <div className="mt-3">
          <CodeBlock code={RACE_SNIPPET} />
        </div>
        No counting, no results array — just attach{" "}
        <Code>.then(resolve, reject)</Code> to every item and let the
        outer <Code>Promise</Code> settle on whichever call happens first;
        every call after that is simply ignored, since a promise can only
        settle once.
      </InterviewNote>

      <Ul>
        <li>
          <Code>Time:</Code> O(n) to attach the handlers, where n is the
          number of promises — the actual wall-clock time is bounded by
          whichever input promise takes longest.
        </li>
        <li>
          <Code>Space:</Code> O(n) for the results array.
        </li>
      </Ul>
    </ArticleSection>
  );
}
