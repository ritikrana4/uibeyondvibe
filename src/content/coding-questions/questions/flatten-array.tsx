import { ArticleSection } from "@/components/ui/section";
import { AnimationCard } from "@/components/ui/animation-card";
import { Code, InterviewNote, P, ProblemStatement, Ul } from "@/components/ui/prose";
import { CodeBlock } from "@/components/ui/code-block";
import { Reveal } from "@/components/ui/reveal";
import { CodePlayground } from "@/components/coding-questions/code-playground";
import { FlattenTrace } from "@/components/animations/flatten-trace";

const FLATTEN_STARTER = `function flatten(arr, depth = Infinity) {
  // your code here
}`;

const FLATTEN_TESTS = `
if (typeof flatten !== "function") {
  __check("flatten is defined", false, "Expected a top-level function named 'flatten'.");
} else {
  var r1 = flatten([1, [2, 3, [4, 5]], 6]);
  __check("fully flattens by default", __deepEqual(r1, [1, 2, 3, 4, 5, 6]), "got " + JSON.stringify(r1));

  var r2 = flatten([1, [2, [3, [4]]]], 1);
  __check("respects a depth of 1", __deepEqual(r2, [1, 2, [3, [4]]]), "got " + JSON.stringify(r2));

  var r3 = flatten([]);
  __check("handles an empty array", __deepEqual(r3, []), "got " + JSON.stringify(r3));

  var r4 = flatten([1, 2, 3]);
  __check("leaves an already-flat array unchanged", __deepEqual(r4, [1, 2, 3]), "got " + JSON.stringify(r4));
}
`;

const FLATTEN_SOLUTION = `function flatten(arr, depth = Infinity) {
  return arr.reduce((result, item) => {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flatten(item, depth - 1));
    } else {
      result.push(item);
    }
    return result;
  }, []);
}

flatten([1, [2, 3, [4, 5]], 6]);   // [1, 2, 3, 4, 5, 6]
flatten([1, [2, [3, [4]]]], 1);    // [1, 2, [3, [4]]] — only one level deep`;

const CONCAT_TRICK = `function flattenFully(arr) {
  while (arr.some(Array.isArray)) {
    arr = [].concat(...arr);
  }
  return arr;
}`;

const FLATTEN_ITERATIVE = `function flattenIterative(arr, depth = Infinity) {
  const stack = [...arr].map((item) => [item, depth]).reverse();
  const result = [];

  while (stack.length > 0) {
    const [item, d] = stack.pop();

    if (Array.isArray(item) && d > 0) {
      // Push children in reverse so popping (LIFO) visits them
      // left-to-right — same trick as the DOM Finder question.
      stack.push(...item.map((child) => [child, d - 1]).reverse());
    } else {
      result.push(item);
    }
  }

  return result;
}`;

export function FlattenArrayQuestion() {
  return (
    <ArticleSection id="flatten-array" index="03" kicker="Easy · Recursion & Arrays" title="Flatten an array">
      <ProblemStatement>
        Write a function <Code>flatten(arr, depth = Infinity)</Code> that
        takes a nested array and returns a new, flat array — flattening
        nested arrays up to <Code>depth</Code> levels deep. With the default
        depth, the array should end up fully flat no matter how deeply it&apos;s
        nested.
      </ProblemStatement>

      <P>
        For example, <Code>flatten([1, [2, 3, [4, 5]], 6])</Code> returns{" "}
        <Code>[1, 2, 3, 4, 5, 6]</Code>. This is really the same shape of
        problem as the DOM Finder question — a tree hiding inside an
        array — except this time you&apos;re collecting every leaf value
        into one list instead of finding a single path.
      </P>

      <AnimationCard eyebrow="Depth-first, left to right, one item at a time">
        <FlattenTrace />
      </AnimationCard>

      <P>
        Write your solution below and run it against a few checks — no
        setup, it runs right here in your browser.
      </P>

      <CodePlayground slug="flatten-array" starterCode={FLATTEN_STARTER} testCode={FLATTEN_TESTS} />

      <Reveal label="Show reference solution">
        <CodeBlock code={FLATTEN_SOLUTION} />
      </Reveal>

      <P>
        Walking through it: <Code>reduce</Code> builds up the{" "}
        <Code>result</Code> array one item at a time. For each{" "}
        <Code>item</Code> in <Code>arr</Code>, if it&apos;s itself an array
        and there&apos;s still depth budget left (<Code>depth &gt; 0</Code>),
        the function calls itself on that item with <Code>depth - 1</Code>,
        then spreads every value it comes back with into{" "}
        <Code>result</Code>. Otherwise, the item isn&apos;t an array (or
        we&apos;ve hit the depth limit), so it gets pushed straight in
        as-is. The default parameter <Code>depth = Infinity</Code> is what
        makes a plain <Code>flatten(arr)</Code> call flatten all the way
        down.
      </P>

      <InterviewNote question="Isn't this just polyfilling Array.prototype.flat()?">
        Pretty much — <Code>flatten(arr, depth)</Code> mirrors{" "}
        <Code>arr.flat(depth)</Code> almost exactly (the real one defaults{" "}
        <Code>depth</Code> to <Code>1</Code>, not <Code>Infinity</Code>).
        Interviewers ask for it specifically because implementing it
        exercises recursion and edge-case thinking, not because you&apos;d
        actually write this instead of using the built-in in real code.
      </InterviewNote>

      <InterviewNote question="Is there a shorter way to fully flatten, if you don't need depth control?">
        Yes — a well-known trick: keep replacing the array with{" "}
        <Code>[].concat(...arr)</Code> for as long as any element is still
        an array. Each pass flattens exactly one level, so the loop runs
        once per level of nesting.
        <div className="mt-3">
          <CodeBlock code={CONCAT_TRICK} />
        </div>
        It&apos;s shorter, but worth knowing the trade-off: <Code>.some()</Code>{" "}
        rescans the entire array on every single pass, so this is closer to
        O(n × d) — n elements, d levels of nesting — instead of the roughly
        O(n) the recursive version gets by visiting each element exactly
        once.
      </InterviewNote>

      <InterviewNote question="What happens with something like a string or a Set inside the array?">
        <Code>Array.isArray()</Code> only returns <Code>true</Code> for
        actual arrays, so a string or a <Code>Set</Code> — both iterable,
        neither an array — gets pushed straight through untouched, which is
        the correct behavior here. The common mistake is checking{" "}
        <Code>typeof item === &quot;object&quot;</Code> instead: that
        misfires on <Code>null</Code> (famously, <Code>typeof null</Code> is{" "}
        <Code>&quot;object&quot;</Code>) and would also try to &ldquo;flatten&rdquo;
        a plain object, which has no meaningful definition here.
      </InterviewNote>

      <InterviewNote question="How would you avoid recursion for extremely deep input?">
        The same way as DOM Finder: swap the call stack for an explicit
        one. Push items onto a stack in reverse order so popping them back
        off (last in, first out) processes them in the original left-to-right
        order; when an item is an array within the depth budget, push its
        children instead of the array itself.
        <div className="mt-3">
          <CodeBlock code={FLATTEN_ITERATIVE} />
        </div>
        This matters for real, deeply-nested input (tens of thousands of
        levels deep) where plain recursion would blow the call stack —
        JavaScript engines don&apos;t optimize this kind of recursion away.
      </InterviewNote>

      <Ul>
        <li>
          <Code>Time:</Code> O(n), where n is the total number of elements
          across every level of nesting — each one is visited exactly once.
        </li>
        <li>
          <Code>Space:</Code> O(n) for the output array, plus O(d) for the
          recursion call stack, where d is the maximum nesting depth (O(n)
          worst case for the iterative version&apos;s explicit stack, on a
          wide, shallow input).
        </li>
      </Ul>
    </ArticleSection>
  );
}
