import { ArticleSection } from "@/components/ui/section";
import { AnimationCard } from "@/components/ui/animation-card";
import { Code, InterviewNote, P, ProblemStatement, Ul } from "@/components/ui/prose";
import { CodeBlock } from "@/components/ui/code-block";
import { Reveal } from "@/components/ui/reveal";
import { CodePlayground } from "@/components/coding-questions/code-playground";
import { FlattenObjectTrace } from "@/components/animations/flatten-object-trace";

const FLATTEN_OBJECT_STARTER = `function flattenObject(obj) {
  // your code here
}`;

const FLATTEN_OBJECT_TESTS = `
if (typeof flattenObject !== "function") {
  __check("flattenObject is defined", false, "Expected a top-level function named 'flattenObject'.");
} else {
  var r1 = flattenObject({ a: 1, b: { c: 2, d: { e: 3 } } });
  __check("flattens nested objects into dot-joined keys", __deepEqual(r1, { a: 1, "b.c": 2, "b.d.e": 3 }), "got " + JSON.stringify(r1));

  var r2 = flattenObject({});
  __check("handles an empty object", __deepEqual(r2, {}), "got " + JSON.stringify(r2));

  var r3 = flattenObject({ a: 1, b: 2 });
  __check("leaves an already-flat object unchanged", __deepEqual(r3, { a: 1, b: 2 }), "got " + JSON.stringify(r3));

  var r4 = flattenObject({ a: null, b: { c: null } });
  __check("treats null as a leaf value instead of recursing into it", __deepEqual(r4, { a: null, "b.c": null }), "got " + JSON.stringify(r4));
}
`;

const FLATTEN_OBJECT_SOLUTION = `function flattenObject(obj, prefix = "") {
  return Object.keys(obj).reduce((result, key) => {
    const path = prefix ? \`\${prefix}.\${key}\` : key;
    const value = obj[key];

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, path));
    } else {
      result[path] = value;
    }

    return result;
  }, {});
}

flattenObject({ a: 1, b: { c: 2, d: { e: 3 } } });
// => { a: 1, "b.c": 2, "b.d.e": 3 }`;

const ARRAY_INDEX_VARIANT = `if (Array.isArray(value)) {
  value.forEach((item, i) => {
    Object.assign(result, flattenObject({ [i]: item }, path));
  });
} else if (value !== null && typeof value === "object") {
  Object.assign(result, flattenObject(value, path));
} else {
  result[path] = value;
}`;

const UNFLATTEN_SNIPPET = `function unflattenObject(flat) {
  const result = {};

  for (const path in flat) {
    const keys = path.split(".");
    let cursor = result;

    keys.forEach((key, i) => {
      if (i === keys.length - 1) {
        cursor[key] = flat[path];
      } else {
        cursor[key] = cursor[key] || {};
        cursor = cursor[key];
      }
    });
  }

  return result;
}`;

const FLATTEN_OBJECT_ITERATIVE = `function flattenObjectIterative(obj) {
  const result = {};
  const stack = [{ value: obj, prefix: "" }];

  while (stack.length > 0) {
    const { value, prefix } = stack.pop();

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      for (const key of Object.keys(value)) {
        stack.push({ value: value[key], prefix: prefix ? \`\${prefix}.\${key}\` : key });
      }
    } else {
      result[prefix] = value;
    }
  }

  return result;
}`;

export function FlattenObjectQuestion() {
  return (
    <ArticleSection id="flatten-object" index="04" kicker="Medium · Recursion & Objects" title="Flatten a deeply nested object">
      <ProblemStatement>
        Write a function <Code>flattenObject(obj)</Code> that takes a
        nested object and returns a new, flat object — one level deep —
        where each key is the dot-joined path to a leaf value.
      </ProblemStatement>

      <P>
        For example,{" "}
        <Code>{'flattenObject({ a: 1, b: { c: 2, d: { e: 3 } } })'}</Code>{" "}
        returns <Code>{'{ a: 1, "b.c": 2, "b.d.e": 3 }'}</Code>. It&apos;s the
        object-shaped sibling of the array-flattening question: same
        recursive instinct, except instead of collecting leaf values into a
        list, you&apos;re building up a key that records how you got there.
      </P>

      <AnimationCard eyebrow="Depth-first, building the path as it goes">
        <FlattenObjectTrace />
      </AnimationCard>

      <P>
        Write your solution below and run it against a few checks — no
        setup, it runs right here in your browser.
      </P>

      <CodePlayground slug="flatten-object" starterCode={FLATTEN_OBJECT_STARTER} testCode={FLATTEN_OBJECT_TESTS} />

      <Reveal label="Show reference solution">
        <CodeBlock code={FLATTEN_OBJECT_SOLUTION} />
      </Reveal>

      <P>
        Walking through it: <Code>prefix</Code> tracks the path taken to
        reach the current object, starting empty at the top level. For each{" "}
        <Code>key</Code>, the full <Code>path</Code> is{" "}
        <Code>prefix + &quot;.&quot; + key</Code> (or just <Code>key</Code>{" "}
        at the top, where there&apos;s no prefix yet). If the value at that
        key is itself a plain object, the function recurses into it,
        passing the accumulated <Code>path</Code> as the new prefix, and{" "}
        <Code>Object.assign</Code> merges whatever flat object comes back
        into <Code>result</Code>. Otherwise, the value is a leaf, and it
        gets assigned directly at <Code>result[path]</Code>.
      </P>

      <InterviewNote question="What about arrays inside the object?">
        The reference solution&apos;s <Code>!Array.isArray(value)</Code>{" "}
        check treats arrays as leaf values — an array gets assigned
        as-is, which is often exactly what you want for something like a{" "}
        <Code>tags: [&quot;a&quot;, &quot;b&quot;]</Code> field. If you instead need
        array items flattened with numeric keys (<Code>list.0</Code>,{" "}
        <Code>list.1</Code>), treat each index like an object key:
        <div className="mt-3">
          <CodeBlock code={ARRAY_INDEX_VARIANT} />
        </div>
      </InterviewNote>

      <InterviewNote question="Why check value !== null before typeof value === 'object'?">
        The classic gotcha, back again: <Code>typeof null</Code> is{" "}
        <Code>&quot;object&quot;</Code>. Without the explicit{" "}
        <Code>null</Code> check, hitting a key whose value is{" "}
        <Code>null</Code> would try to recurse into it — and{" "}
        <Code>Object.keys(null)</Code> throws a{" "}
        <Code>TypeError</Code>, immediately crashing on a perfectly valid
        input.
      </InterviewNote>

      <InterviewNote question="What would the reverse operation — unflattening — look like?">
        Split each flattened key on <Code>&quot;.&quot;</Code> to get the
        original path, then walk (or build, level by level) a nested
        structure from it, creating an empty object at each level that
        doesn&apos;t exist yet:
        <div className="mt-3">
          <CodeBlock code={UNFLATTEN_SNIPPET} />
        </div>
      </InterviewNote>

      <InterviewNote question="How would you write this iteratively, without recursion?">
        With an explicit stack of <Code>{"{ value, prefix }"}</Code> pairs —
        but unlike the array-flattening or DOM Finder questions, you{" "}
        <em>don&apos;t</em> need the &ldquo;push children in reverse&rdquo;
        trick here. The result is a plain object, not an ordered list, so
        it doesn&apos;t matter what order the keys get assigned in.
        <div className="mt-3">
          <CodeBlock code={FLATTEN_OBJECT_ITERATIVE} />
        </div>
      </InterviewNote>

      <Ul>
        <li>
          <Code>Time:</Code> O(n), where n is the total number of keys
          across every level of nesting — each one is visited exactly once.
        </li>
        <li>
          <Code>Space:</Code> O(n) for the output object, plus O(d) for the
          recursion call stack, where d is the maximum nesting depth.
        </li>
      </Ul>
    </ArticleSection>
  );
}
