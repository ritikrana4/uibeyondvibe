import { ArticleSection } from "@/components/ui/section";
import { AnimationCard } from "@/components/ui/animation-card";
import { Code, InterviewNote, P, ProblemStatement, Ul } from "@/components/ui/prose";
import { CodeBlock } from "@/components/ui/code-block";
import { Reveal } from "@/components/ui/reveal";
import { DomFinderTrace } from "@/components/animations/dom-finder-trace";

const DOM_FINDER_SOLUTION = `function findElement(root, target) {
  if (root === target) return [];

  const children = root.children;

  for (let i = 0; i < children.length; i++) {
    const path = findElement(children[i], target);
    if (path !== null) {
      return [i, ...path]; // prepend this level's index on the way back up
    }
  }

  return null; // not found anywhere in this subtree
}`;

const DOM_FINDER_ITERATIVE = `function findElementIterative(root, target) {
  const stack = [{ node: root, path: [] }];

  while (stack.length > 0) {
    const { node, path } = stack.pop();

    if (node === target) return path;

    const children = node.children;
    // Push in reverse so children come off the stack left-to-right,
    // matching the recursive version's traversal order.
    for (let i = children.length - 1; i >= 0; i--) {
      stack.push({ node: children[i], path: [...path, i] });
    }
  }

  return null;
}`;

export function DomFinderQuestion() {
  return (
    <ArticleSection id="dom-finder" index="02" kicker="Medium · DOM Traversal & Recursion" title="DOM Finder">
      <ProblemStatement>
        Given the root element of a DOM tree and a specific{" "}
        <Code>target</Code> element somewhere inside it, write a function{" "}
        <Code>findElement(root, target)</Code> that returns an array of
        indices describing the path from root to target — each number is
        the index of the child to step into at that level, via{" "}
        <Code>element.children</Code>. If <Code>root</Code> is{" "}
        <Code>target</Code> itself, return an empty array. If target
        isn&apos;t in the tree at all, return <Code>null</Code>.
      </ProblemStatement>

      <P>
        For example, if <Code>target</Code> is{" "}
        <Code>root.children[1].children[0]</Code>, the answer is{" "}
        <Code>[1, 0]</Code>. Underneath the DOM-flavored wrapping, this is a
        plain tree-search problem: try each child in order, recurse into it,
        and if the target turns up somewhere inside that child, remember
        which child index led you there.
      </P>

      <AnimationCard eyebrow="Depth-first, stops the instant it finds a match">
        <DomFinderTrace />
      </AnimationCard>

      <P>Try writing it yourself first, then compare against this:</P>

      <Reveal>
        <CodeBlock code={DOM_FINDER_SOLUTION} />
      </Reveal>

      <P>
        Walking through it: the base case is <Code>root === target</Code> —
        you&apos;re already there, so the path so far is empty. Otherwise,
        the function loops over <Code>root</Code>&apos;s children in order
        and recurses into each one. A recursive call returning anything
        other than <Code>null</Code> means the target was found somewhere
        inside that child, so the current index <Code>i</Code> gets
        prepended to whatever path came back — that prepending, unwinding
        one level at a time as the recursion returns, is what builds the
        full path from the root down. If no child&apos;s subtree contains
        the target, the loop finishes and the function returns{" "}
        <Code>null</Code>.
      </P>

      <InterviewNote question="Doesn't the browser already have a built-in for this, like Node.contains()?">
        <Code>root.contains(target)</Code> answers a yes-or-no question —
        &ldquo;is target somewhere inside root?&rdquo; — using the browser
        engine&apos;s own internal tree bookkeeping, without you writing any
        traversal at all. But it only gives you a boolean, not the address.
        This problem is asking you to reconstruct that address by hand,
        which is really a test of recursion and tree traversal — real code
        would rarely need to do this itself.
      </InterviewNote>

      <InterviewNote question="Does it matter that the solution uses .children instead of .childNodes?">
        Yes, and it&apos;s a genuine gotcha. <Code>.children</Code> is an{" "}
        <Code>HTMLCollection</Code> containing only element nodes — exactly
        what a person means by &ldquo;the second child.&rdquo;{" "}
        <Code>.childNodes</Code> is a <Code>NodeList</Code> containing every
        node type, including text nodes for whitespace between tags and
        comment nodes. Swap one for the other and the exact same visible
        page can produce a completely different, usually much longer path,
        purely because of how the HTML happened to be formatted.
      </InterviewNote>

      <InterviewNote question="How would you write this iteratively, without recursion?">
        Use an explicit stack that holds both a node and the path taken to
        reach it, instead of relying on the call stack. One subtlety:
        children need to be pushed in reverse order, so that popping them
        back off (last in, first out) visits them in the original
        left-to-right order — otherwise the traversal order silently flips
        compared to the recursive version.
        <div className="mt-3">
          <CodeBlock code={DOM_FINDER_ITERATIVE} />
        </div>
      </InterviewNote>

      <InterviewNote question="What should happen if target isn't actually inside root?">
        Every recursive call needs to explicitly handle &ldquo;not found in
        this subtree&rdquo; by returning <Code>null</Code>, and the caller
        has to check for that <Code>null</Code> before spreading it into a
        path array — skip that check and a missing target silently produces
        a broken path like <Code>[0, ...null]</Code> instead of a clean
        &ldquo;not found.&rdquo;
      </InterviewNote>

      <Ul>
        <li>
          <Code>Time:</Code> O(n), where n is the total number of elements
          in the tree — worst case (target missing, or it&apos;s the very
          last node in traversal order) visits every one.
        </li>
        <li>
          <Code>Space:</Code> O(h) for the recursion call stack, where h is
          the height of the tree, plus another O(h) for the path array
          being built and returned.
        </li>
      </Ul>
    </ArticleSection>
  );
}
