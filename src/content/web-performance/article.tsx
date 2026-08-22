"use client";

import {
  Clock,
  Layers3,
  Gauge,
  ImageIcon,
  MousePointerClick,
  ArrowDownUp,
  Blocks,
  Rocket,
  Package,
  Activity,
  MemoryStick,
  LineChart,
} from "lucide-react";
import { ArticleSection } from "@/components/ui/section";
import { AnimationCard } from "@/components/ui/animation-card";
import { Code, InterviewNote, P, Ul } from "@/components/ui/prose";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { PipelineOverview } from "@/components/animations/pipeline-overview";
import { WebVitalsTimeline } from "@/components/animations/web-vitals-timeline";
import { LcpBreakdown } from "@/components/animations/lcp-breakdown";
import { InpBreakdown } from "@/components/animations/inp-breakdown";
import { ClsShiftDemo } from "@/components/animations/cls-shift-demo";
import { RenderingStrategies } from "@/components/animations/rendering-strategies";
import { LoadingOptimizations } from "@/components/animations/loading-optimizations";
import { BundleOptimization } from "@/components/animations/bundle-optimization";
import { DebounceThrottle } from "@/components/animations/debounce-throttle";
import { MemoryLeakDemo } from "@/components/animations/memory-leak-demo";
import { PerformanceObserverDemo } from "@/components/animations/performance-observer-demo";
import { InterviewFaq } from "@/components/interview-faq";
import { performanceFaqs, performanceFaqCategories } from "@/data/faq-performance";
import { sections } from "./sections-meta";

const PIPELINE_NODES = [
  { id: "web-vitals", label: "Web Vitals", icon: Gauge },
  { id: "lcp", label: "LCP", icon: ImageIcon },
  { id: "inp", label: "INP", icon: MousePointerClick },
  { id: "cls", label: "CLS", icon: ArrowDownUp },
  { id: "rendering-strategies", label: "Rendering", icon: Blocks },
  { id: "loading", label: "Loading", icon: Rocket },
  { id: "bundling", label: "Bundling", icon: Package },
  { id: "runtime", label: "Runtime", icon: Activity },
  { id: "memory", label: "Memory", icon: MemoryStick },
  { id: "measuring", label: "Measuring", icon: LineChart },
];

export function WebPerformanceArticle() {
  return (
    <article className="flex gap-10">
      <div className="min-w-0 flex-1">
        <header>
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Performance
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Core Web Vitals & performance, end to end
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            &ldquo;How would you improve this page&apos;s performance?&rdquo; is
            really five smaller questions in a trenchcoat. Here&apos;s every layer
            — the metrics, loading, bundling, runtime, and memory — animated,
            with the actual numbers behind each one.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> 26 min read
            </span>
            <span className="flex items-center gap-1.5">
              <Layers3 className="h-3.5 w-3.5" /> 11 sections · 37 interview
              Q&amp;As
            </span>
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-100 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
            <p className="mb-3 px-1 text-xs font-medium text-zinc-500 dark:text-zinc-500">
              Every layer, at a glance — click any stop to jump there.
            </p>
            <PipelineOverview nodes={PIPELINE_NODES} />
          </div>
        </header>

        <ArticleSection id="web-vitals" index="01" kicker="The metrics that matter" title="Core Web Vitals, on one timeline">
          <P>
            Google boiled &ldquo;is this page fast?&rdquo; down to three
            measurable moments in a page&apos;s life: how long until the
            biggest thing renders (<Code>LCP</Code>, Largest Contentful
            Paint), how fast it responds when someone actually interacts (
            <Code>INP</Code>, Interaction to Next Paint), and how much it
            shifts around while they&apos;re trying to read it (
            <Code>CLS</Code>, Cumulative Layout Shift). Together, these
            three are what people mean when they say &ldquo;Core Web
            Vitals.&rdquo;
          </P>
          <AnimationCard eyebrow="One page load, three vitals">
            <WebVitalsTimeline />
          </AnimationCard>
          <InterviewNote question="Why these three metrics specifically?">
            They each capture a distinct, user-perceptible failure mode:
            LCP catches slow loading, INP catches sluggish interactivity,
            and CLS catches visual instability — a page could ace any two
            of these and still feel broken because of the third.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="lcp" index="02" kicker="Largest Contentful Paint" title="LCP: how fast until the big stuff shows up">
          <P>
            LCP times how long it takes the largest visible element — almost
            always a hero image, a background image, or a large text block —
            to actually render. It breaks down into four parts, and each one
            is optimized differently.
          </P>
          <AnimationCard eyebrow="Good ≤ 2.5s · needs improvement ≤ 4s · poor > 4s">
            <LcpBreakdown />
          </AnimationCard>
          <InterviewNote question="If LCP is slow, how do you figure out which part is to blame?">
            Check them in order: a slow <Code>TTFB</Code> (Time To First
            Byte — how long until the very first byte of the response
            arrives) points at your server or your CDN (Content Delivery
            Network, a set of servers spread around the world that cache
            and serve your static files closer to each visitor). A long
            load delay usually means the LCP resource was discovered late —
            often because it&apos;s a CSS background-image instead of an{" "}
            <Code>&lt;img&gt;</Code>, or hidden behind other render-blocking
            requests. A long load time means the asset itself is too big —
            compress it, or serve it from a CDN. A long render delay usually
            means a long task is hogging the main thread right when the
            image is ready to paint.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="inp" index="03" kicker="Interaction to Next Paint" title="INP: how fast the page responds">
          <P>
            INP measures the full round trip of an interaction: from the
            moment a user clicks, types, or taps, to the moment the browser
            actually paints the next frame in response. It replaced First
            Input Delay, which only covered the first sliver of this.
          </P>
          <AnimationCard eyebrow="Good ≤ 200ms · needs improvement ≤ 500ms · poor > 500ms">
            <InpBreakdown />
          </AnimationCard>
          <InterviewNote question="What's the biggest lever for improving INP?">
            Almost always the processing time — breaking up long synchronous
            work so the main thread (the single thread that runs your
            JavaScript, layout, and paint — if it&apos;s busy, nothing else
            can happen) gets a chance to breathe between chunks. That can
            mean yielding back to the browser mid-task, or moving heavy
            computation onto a Web Worker — a separate background thread
            with no access to the DOM, used purely to run JavaScript
            without blocking the page — rather than running one giant
            handler that blocks everything until it&apos;s done.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="cls" index="04" kicker="Cumulative Layout Shift" title="CLS: how much things move around">
          <P>
            CLS adds up every unexpected shift of visible content — an image
            popping in without reserved space, a banner injecting itself
            above existing text, a web font swapping in at a different size.
            The fix is almost always the same idea: reserve the space before
            the content arrives.
          </P>
          <AnimationCard eyebrow="Same ad slot, two outcomes">
            <ClsShiftDemo />
          </AnimationCard>
          <InterviewNote question="Does an animation you trigger yourself (like an accordion opening) count against CLS?">
            No — CLS only counts <Code>unexpected</Code> shifts. A shift
            within 500ms of a real user interaction (a click that opens a
            panel) is excluded, on the assumption the user expected it.
            That&apos;s also why CSS <Code>transform</Code> is the recommended
            way to animate things like this — it never triggers layout at all.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="rendering-strategies" index="05" kicker="Where does your HTML actually come from?" title="Rendering strategies: CSR, SSR, and SSG">
          <P>
            Before any resource hint or bundle optimization even matters,
            one architectural decision already set the ceiling on your LCP
            and INP: where the HTML for this page actually gets built. There
            are three basic answers. <Code>CSR</Code> (Client-Side
            Rendering) ships an almost-empty page and a JavaScript bundle,
            and builds everything in the browser. <Code>SSR</Code>{" "}
            (Server-Side Rendering) runs that same component code on the
            server and sends back real, already-populated HTML for every
            request. <Code>SSG</Code> (Static Site Generation) does that
            same server-side rendering work only once, ahead of time at
            build/deploy time, and then just serves the finished HTML file
            to everyone.
          </P>
          <AnimationCard eyebrow="Same page, three different origins for the HTML">
            <RenderingStrategies />
          </AnimationCard>
          <P>
            Modern frameworks blur these lines on purpose:{" "}
            <Code>streaming SSR</Code> sends HTML in chunks as pieces become
            ready instead of waiting for the whole page,{" "}
            <Code>islands architecture</Code> hydrates only the interactive
            components and ships zero JS for the rest, and{" "}
            <Code>resumability</Code> skips hydration&apos;s replay step
            entirely by serializing enough state to pick up exactly where
            the server left off.
          </P>
          <InterviewNote question="What is hydration, and why can it hurt INP?">
            Hydration is the client re-running your component code against
            HTML that&apos;s already on the screen — rebuilding state and
            attaching event listeners without recreating the DOM. The page
            can look ready while this happens, but clicks silently do
            nothing yet — and a big JS bundle means a long task right when a
            user is most likely to try interacting, which is exactly what
            inflates INP.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="loading" index="06" kicker="Getting bytes to the screen faster" title="Loading performance">
          <P>
            Before any of the above can even happen, the right bytes have to
            arrive at the right time. Resource hints tell the browser what to
            fetch ahead of schedule; lazy loading tells it what to skip until
            it&apos;s actually needed.
          </P>
          <AnimationCard eyebrow="Prioritizing what loads, and when">
            <LoadingOptimizations />
          </AnimationCard>
          <P>
            Resource hints are small <Code>&lt;link&gt;</Code> tags that get
            a head start on work the browser would eventually do anyway.{" "}
            <Code>dns-prefetch</Code> just resolves a domain name early.{" "}
            <Code>preconnect</Code> goes further and also completes the TCP
            and TLS handshakes in advance, so the connection is already open
            when it&apos;s actually needed. <Code>preload</Code> tells the
            browser &ldquo;fetch this specific file now, at high priority
            — this page needs it.&rdquo; <Code>prefetch</Code> is the lazier
            cousin: &ldquo;fetch this at low priority, because the user will
            probably need it on the next page.&rdquo; And{" "}
            <Code>loading=&quot;lazy&quot;</Code> is the opposite move
            entirely — it tells the browser to hold off fetching an image or
            iframe at all until the user is about to scroll it into view.
          </P>
          <InterviewNote question="Should you lazy-load your hero image?">
            No — that&apos;s a common mistake. Lazy-loading delays the fetch
            until the browser thinks the image is nearly in view, which
            directly pushes back LCP if that image is your LCP candidate.
            Only lazy-load what&apos;s genuinely below the fold.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="bundling" index="07" kicker="Shipping less code" title="Bundle & network optimization">
          <P>
            Every kilobyte of JavaScript has to be downloaded, parsed, and
            executed before it can do anything — and unlike images, it can
            block the main thread while it runs. Each build-time technique
            below chips away at the same number.
          </P>
          <AnimationCard eyebrow="Same app, five optimization passes">
            <BundleOptimization />
          </AnimationCard>
          <P>
            Each pass above is solving a different problem. Code splitting
            breaks one giant bundle into smaller pieces, so a visitor
            downloads the code for the page they&apos;re actually on, not
            your entire app up front — the rest loads later, if and when
            they navigate somewhere that needs it. Tree shaking is a
            build-time step that looks at what your code actually imports
            and deletes anything exported by a library that nothing ever
            uses, so unused code never even makes it into the bundle.
            Minification then takes what&apos;s left and strips out
            everything a human needed but a browser doesn&apos;t —
            whitespace, comments, and long variable names — without
            changing what the code does. Finally, compression (typically
            Brotli, or gzip as an older fallback) re-encodes the whole file
            into a smaller byte stream for the trip over the network; the
            browser decompresses it the instant it arrives.
          </P>
          <InterviewNote question="Is there such a thing as over-splitting your bundles?">
            Yes — every chunk is a separate request, and each one still
            carries a little overhead. Split too aggressively (a separate
            chunk per tiny component) and you can end up with a waterfall of
            small requests that&apos;s slower than a moderately-sized bundle,
            especially over HTTP/1.1. HTTP/2&apos;s multiplexing makes this less
            painful, but it&apos;s not free.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="runtime" index="08" kicker="Keeping interactions smooth" title="Runtime performance">
          <P>
            Loading fast doesn&apos;t help if the page then stutters. Two of the
            most common runtime interview questions come down to controlling
            how often expensive work actually runs.
          </P>
          <AnimationCard eyebrow="Same burst of events, two strategies">
            <DebounceThrottle />
          </AnimationCard>
          <P>
            Debounce means: wait for a pause in the events, then run the
            function exactly once — perfect for a search box, where you want
            one API call after the user stops typing, not one per
            keystroke. Throttle means: run the function at most once every N
            milliseconds no matter how many events come in — perfect for a
            scroll handler, where you still want steady updates while it
            keeps firing, just not hundreds of them a second.
          </P>
          <Ul>
            <li>Rendering a 10,000-row list? Virtualize it — only render the rows currently in view.</li>
            <li>Animating something? Prefer <Code>transform</Code>/<Code>opacity</Code> with <Code>requestAnimationFrame</Code>, not <Code>setTimeout</Code>.</li>
            <li>Got real CPU-bound work? Move it off the main thread with a Web Worker.</li>
          </Ul>
          <InterviewNote question="Search-as-you-type: debounce or throttle?">
            Debounce — you want to wait until the user actually pauses
            before firing the (expensive) API call, not fire repeatedly
            while they&apos;re still mid-word.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="memory" index="09" kicker="The silent killer" title="Memory leaks">
          <P>
            Unlike a slow load, a leak doesn&apos;t show up on day one — it shows
            up as a tab that gets sluggish after being open for an hour.
            Almost every leak traces back to something outliving the
            component that created it.
          </P>
          <AnimationCard eyebrow="Same component, mounted and unmounted repeatedly">
            <MemoryLeakDemo />
          </AnimationCard>
          <InterviewNote question="What's the one-line mental model for avoiding leaks?">
            Anything you set up (a listener, a timer, a subscription) needs
            an equal and opposite teardown, run in the same place — a
            cleanup function in <Code>useEffect</Code>, a
            <Code>removeEventListener</Code> before the component goes away,
            a <Code>clearInterval</Code> you actually call.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="measuring" index="10" kicker="You can't improve what you don't measure" title="Measuring performance">
          <P>
            All of the above needs a number attached to it, or you&apos;re
            guessing. The browser exposes exactly the data behind these
            metrics through one API — it&apos;s what every real-user-monitoring
            tool is quietly built on top of.
          </P>
          <AnimationCard eyebrow="Subscribing to real metrics as they happen">
            <PerformanceObserverDemo />
          </AnimationCard>
          <InterviewNote question="Lighthouse says my LCP is great. Why are users complaining?">
            Lighthouse runs one simulated session on one device profile —
            lab data. Your real users are on a mix of devices, networks, and
            locations that lab data can&apos;t capture. Field data (from
            PerformanceObserver in production, or Chrome&apos;s public CrUX
            dataset) reflects what&apos;s actually happening; treat a lab/field
            gap as a real signal, not noise.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="faq" index="11" kicker="Everything else they might ask" title="Interview Q&A">
          <P>
            The rest of the questions that tend to come up around
            performance — grouped by area.
          </P>
          <InterviewFaq items={performanceFaqs} categories={performanceFaqCategories} />
        </ArticleSection>
      </div>

      <aside className="sticky top-20 hidden h-fit w-44 shrink-0 xl:block">
        <TableOfContents sections={sections} />
      </aside>
    </article>
  );
}
