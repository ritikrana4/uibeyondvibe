import { ArticleSection } from "@/components/ui/section";
import { AnimationCard } from "@/components/ui/animation-card";
import { Code, InterviewNote, P, ProblemStatement, Ul } from "@/components/ui/prose";
import { CodeBlock } from "@/components/ui/code-block";
import { Reveal } from "@/components/ui/reveal";
import { CodePlayground } from "@/components/coding-questions/code-playground";
import { MemoizeCallLog } from "@/components/animations/memoize-call-log";

const MEMOIZE_STARTER = `function memoize(fn) {
  // your code here
}`;

const MEMOIZE_TESTS = `
if (typeof memoize !== "function") {
  __check("memoize is defined", false, "Expected a top-level function named 'memoize'.");
} else {
  var callCount = 0;
  var double = function (x) { callCount++; return x * 2; };
  var memoizedDouble = memoize(double);

  var r1 = memoizedDouble(5);
  __check("memoizedDouble(5) returns 10", r1 === 10, "got " + JSON.stringify(r1));

  var r2 = memoizedDouble(5);
  __check("calling again with the same argument returns the cached value", r2 === 10, "got " + JSON.stringify(r2));
  __check("the underlying function was only called once for repeated args", callCount === 1, "fn was actually called " + callCount + " time(s)");

  var r3 = memoizedDouble(6);
  __check("a new argument computes a fresh result", r3 === 12, "got " + JSON.stringify(r3));
  __check("a new argument actually invokes the underlying function", callCount === 2, "fn was called " + callCount + " time(s) in total");
}
`;

const MEMOIZE_SOLUTION = `function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key); // cache hit — skip fn entirely
    }

    const result = fn.apply(this, args); // cache miss — do the real work
    cache.set(key, result);
    return result;
  };
}

// Usage — note fib calls the *memoized* version of itself:
const fib = memoize(function (n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
});

fib(10); // computes once, caching every sub-call along the way
fib(10); // second call — returns 55 instantly, no recomputation`;

const LRU_SNIPPET = `function memoize(fn, maxSize = 100) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value); // re-insert → now "most recently used"
      return value;
    }

    const result = fn.apply(this, args);
    if (cache.size >= maxSize) {
      const oldestKey = cache.keys().next().value; // Map keeps insertion order
      cache.delete(oldestKey);
    }
    cache.set(key, result);
    return result;
  };
}`;

export function MemoizeQuestion() {
  return (
    <ArticleSection id="memoize" index="01" kicker="Medium · Closures & Caching" title="Memoize a function">
      <ProblemStatement>
        Write a function <Code>memoize(fn)</Code> that takes any function{" "}
        <Code>fn</Code> and returns a new function with the exact same
        behavior — except calling it again with arguments it has already
        seen should return the cached result instantly, without running{" "}
        <Code>fn</Code> a second time.
      </ProblemStatement>

      <P>
        <Code>memoize</Code> is a classic <Code>Higher-Order Function</Code>{" "}
        (HOF) — a function that takes a function as input and returns a new
        function as output, rather than a plain value. The core idea: wrap{" "}
        <Code>fn</Code> in a closure that privately holds a cache, and on
        every call, check that cache before doing any real work. A closure
        just means the returned function keeps access to variables from the
        scope it was created in — here, that&apos;s the <Code>cache</Code> —
        even after <Code>memoize</Code> itself has finished running.
      </P>

      <AnimationCard eyebrow="Same argument, second call skips the work entirely">
        <MemoizeCallLog />
      </AnimationCard>

      <P>
        Write your solution below and run it against a few checks — no
        setup, it runs right here in your browser.
      </P>

      <CodePlayground slug="memoize" starterCode={MEMOIZE_STARTER} testCode={MEMOIZE_TESTS} />

      <Reveal label="Show reference solution">
        <CodeBlock code={MEMOIZE_SOLUTION} />
      </Reveal>

      <P>
        Walking through it: the returned function collects whatever
        arguments it&apos;s called with into an array (<Code>...args</Code>),
        turns that array into a single string key with{" "}
        <Code>JSON.stringify</Code>, and uses a <Code>Map</Code> to remember
        which keys it&apos;s already computed a result for. If the key is
        already in the cache, it returns immediately. If not, it calls the
        original <Code>fn</Code> — using <Code>fn.apply(this, args)</Code>{" "}
        rather than <Code>fn(...args)</Code> so that both the correct{" "}
        <Code>this</Code> and any number of arguments are preserved — stores
        the result, and returns it.
      </P>

      <InterviewNote question="If you memoize a recursive function like fib, does every recursive call actually benefit?">
        Only if the recursive calls inside the function refer to the{" "}
        <Code>memoized</Code> wrapper, not the original un-memoized one.
        That&apos;s why it&apos;s written as{" "}
        <Code>
          const fib = memoize(function (n) {"{"} ... fib(n - 1) ... {"}"})
        </Code>{" "}
        — by the time those inner calls actually run, the outer{" "}
        <Code>const fib = ...</Code> assignment has already completed, so{" "}
        <Code>fib</Code> inside the function body already refers to the
        memoized version. Every recursive call gets cache-checked too,
        which is what turns fibonacci from exponential time down to linear.
      </InterviewNote>

      <InterviewNote question="What if the function takes an object as an argument?">
        <Code>JSON.stringify</Code> quietly breaks down here: two objects
        with the same data but different key order (
        <Code>{"{a:1,b:2}"}</Code> vs <Code>{"{b:2,a:1}"}</Code>) serialize
        to different strings, and it silently drops functions and{" "}
        <Code>undefined</Code> values while throwing on circular references.
        For a function that takes exactly one object argument, a{" "}
        <Code>WeakMap</Code> keyed directly by the object reference is a
        better fit — no serialization at all, and as a bonus, a WeakMap
        doesn&apos;t stop the object from being garbage-collected once
        nothing else references it, so the cache can&apos;t leak memory for
        objects that fall out of scope.
      </InterviewNote>

      <InterviewNote question="How would you memoize an async function?">
        Cache the <Code>Promise</Code> itself, not the value it resolves to
        — and cache it immediately, before it even resolves. That way if the
        same arguments come in again while the first call is still in
        flight, the second caller gets back that same in-progress promise
        instead of triggering a duplicate network request. You also need to
        delete the entry if the promise rejects, so a failed call
        doesn&apos;t get permanently cached as broken.
      </InterviewNote>

      <InterviewNote question="This cache grows forever — how would you bound it?">
        An LRU cache — <Code>Least Recently Used</Code> — caps the cache at
        a fixed size, and when it&apos;s full, evicts whichever entry
        hasn&apos;t been touched in the longest time to make room for the
        new one. A plain <Code>Map</Code> already keeps its keys in
        insertion order, which is exactly what makes a simple LRU possible
        by hand: re-inserting an entry (<Code>delete</Code> then{" "}
        <Code>set</Code>) every time it&apos;s accessed moves it to the
        &ldquo;most recently used&rdquo; end, so the oldest untouched key
        always ends up first.
        <div className="mt-3">
          <CodeBlock code={LRU_SNIPPET} />
        </div>
      </InterviewNote>

      <InterviewNote question="Why Map instead of a plain object for the cache?">
        A <Code>Map</Code> accepts any value as a key, not just strings;
        tracks its size directly with <Code>cache.size</Code> instead of{" "}
        <Code>Object.keys(cache).length</Code>; iterates in guaranteed
        insertion order (the property the LRU trick above depends on); and
        has no prototype, so there&apos;s no risk of a key like{" "}
        <Code>&quot;__proto__&quot;</Code> or <Code>&quot;constructor&quot;</Code>{" "}
        accidentally colliding with something already built into a plain
        object.
      </InterviewNote>

      <Ul>
        <li>
          <Code>Time:</Code> O(1) on average for a cache hit — a single Map
          lookup, versus however long <Code>fn</Code> itself takes on a
          miss.
        </li>
        <li>
          <Code>Space:</Code> O(n), where n is the number of distinct
          argument combinations ever seen — this is the classic
          time-vs-memory trade-off memoization always makes.
        </li>
      </Ul>
    </ArticleSection>
  );
}
