"use client";

import {
  Clock,
  Layers3,
  Link2,
  ListChecks,
  Globe,
  Cable,
  ShieldCheck,
  ArrowLeftRight,
  Server,
  LayoutTemplate,
} from "lucide-react";
import { ArticleSection } from "@/components/ui/section";
import { AnimationCard } from "@/components/ui/animation-card";
import { Code, InterviewNote, P, Ul } from "@/components/ui/prose";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { PipelineOverview } from "@/components/animations/pipeline-overview";
import { UrlAnatomy } from "@/components/animations/url-anatomy";
import { PreflightChecks } from "@/components/animations/preflight-checks";
import { DnsResolution } from "@/components/animations/dns-resolution";
import { TcpHandshake } from "@/components/animations/tcp-handshake";
import { TlsHandshake } from "@/components/animations/tls-handshake";
import { HttpExchange } from "@/components/animations/http-exchange";
import { ServerProcessing } from "@/components/animations/server-processing";
import { RenderingPipeline } from "@/components/animations/rendering-pipeline";
import { ParserBlocking } from "@/components/animations/parser-blocking";
import { InterviewFaq } from "@/components/interview-faq";
import { faqs, faqCategories } from "@/data/faq";
import { sections } from "./sections-meta";

const PIPELINE_NODES = [
  { id: "anatomy", label: "Parse URL", icon: Link2 },
  { id: "preflight", label: "Browser checks", icon: ListChecks },
  { id: "dns", label: "DNS lookup", icon: Globe },
  { id: "tcp", label: "TCP handshake", icon: Cable },
  { id: "tls", label: "TLS handshake", icon: ShieldCheck },
  { id: "http", label: "HTTP exchange", icon: ArrowLeftRight },
  { id: "server", label: "Server work", icon: Server },
  { id: "rendering", label: "Render page", icon: LayoutTemplate },
];

export function UrlToEnterArticle() {
  return (
    <article className="flex gap-10">
      <div className="min-w-0 flex-1">
        <header>
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Networking &amp; Browsers
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            What happens when you type a URL and hit Enter?
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            It&apos;s the classic opener because it touches almost everything: URL
            parsing, DNS, TCP, TLS, HTTP, and the entire browser rendering
            pipeline. Ten animated steps, in order, with the follow-up
            questions interviewers actually ask along the way.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> 22 min read
            </span>
            <span className="flex items-center gap-1.5">
              <Layers3 className="h-3.5 w-3.5" /> 10 sections · 30+ interview
              Q&amp;As
            </span>
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-100 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
            <p className="mb-3 px-1 text-xs font-medium text-zinc-500 dark:text-zinc-500">
              The whole trip, at a glance — click any stop to jump there.
            </p>
            <PipelineOverview nodes={PIPELINE_NODES} />
          </div>
        </header>

        <ArticleSection id="anatomy" index="01" kicker="Parsing" title="First, the browser reads what you typed">
          <P>
            Before any network request happens, the browser has to figure out
            what you actually gave it. A URL — short for{" "}
            <Code>Uniform Resource Locator</Code>, the full address of a
            resource on the web — breaks down into the same handful of parts
            every time, and knowing what each one does, and which parts are
            optional, is the first thing interviewers check.
          </P>
          <AnimationCard eyebrow="Click a segment, or let it cycle">
            <UrlAnatomy />
          </AnimationCard>
          <InterviewNote question="What happens if you just type “shop” with no dot or scheme?">
            The browser has to guess whether you meant a URL or a search
            query. If it doesn&apos;t look like a valid hostname (no dot, not a
            known single-word host like <Code>localhost</Code>), most
            browsers hand the whole string to your default search engine
            instead of trying to resolve it as a domain.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="preflight" index="02" kicker="Before any bytes are sent" title="The browser runs a few checks first">
          <P>
            Hitting Enter doesn&apos;t immediately open a socket — a raw,
            two-way network connection between two machines. The browser
            walks through several checks first, some of which can
            short-circuit the entire rest of this article.
          </P>
          <AnimationCard eyebrow="Sequential checks">
            <PreflightChecks />
          </AnimationCard>
          <P>
            One of those checks is the domain&apos;s HSTS status —{" "}
            <Code>HTTP Strict Transport Security</Code>, a setting a site can
            ask browsers to remember (or ship in a built-in preload list)
            that says &ldquo;never load me over plain HTTP again.&rdquo; A
            <Code>Service Worker</Code> is different: a small script the
            browser keeps running in the background for a site, separate
            from any open tab, that&apos;s allowed to intercept every network
            request the page makes and decide how to answer it.
          </P>
          <InterviewNote question="Does a Service Worker run before or after the HTTP cache?">
            Conceptually before: if one is registered for that origin, its{" "}
            <Code>fetch</Code> event handler intercepts the request itself and
            decides what happens — serve from its own cache, go to the
            network, or fabricate a response — which means it can bypass the
            normal HTTP cache entirely.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="dns" index="03" kicker="Turning a name into an address" title="DNS resolution">
          <P>
            Computers route packets by IP address — a numeric address, short
            for <Code>Internet Protocol</Code> address, that identifies one
            machine on a network — not by name. So{" "}
            <Code>example.com</Code> has to become something like{" "}
            <Code>93.184.216.34</Code> before a connection can even be
            attempted. DNS, the <Code>Domain Name System</Code>, is the
            hierarchical, heavily cached lookup system built to make that
            translation fast.
          </P>
          <AnimationCard eyebrow="Cache miss → recursive resolution">
            <DnsResolution />
          </AnimationCard>
          <Ul>
            <li>Browser cache → OS cache → router cache, checked first and usually where a lookup actually gets answered.</li>
            <li>On a full miss, a recursive resolver — a server whose whole job is running this lookup on your behalf, often run by your ISP (Internet Service Provider, the company that connects you to the internet), or a public one like 1.1.1.1 — does the legwork.</li>
            <li>It walks the hierarchy: root nameserver → TLD (top-level domain, e.g. <Code>.com</Code>) nameserver → authoritative nameserver for the domain.</li>
            <li>The answer is cached at every layer for the record&apos;s TTL, so this whole chain is rarely repeated.</li>
          </Ul>
          <InterviewNote question="What decides how long a DNS answer stays cached?">
            The record&apos;s TTL (time-to-live), set by the domain&apos;s owner. It&apos;s
            a direct trade-off: a long TTL means faster repeat lookups but
            slower propagation if the IP ever needs to change — which is why
            teams often lower it in advance of a planned migration.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="tcp" index="04" kicker="Opening a reliable pipe" title="The TCP three-way handshake">
          <P>
            With an IP address in hand, the browser opens a TCP connection to
            it — almost always on port 443. TCP, the{" "}
            <Code>Transmission Control Protocol</Code>, is the set of rules
            that trades a little upfront latency for a guarantee: bytes
            arrive complete, in order, or not at all — as opposed to UDP
            (<Code>User Datagram Protocol</Code>), a lighter alternative that
            makes no such promise and is used where speed matters more than
            reliability, like video calls.
          </P>
          <AnimationCard eyebrow="Sequence diagram">
            <TcpHandshake />
          </AnimationCard>
          <InterviewNote question="Why three messages, not two?">
            Both sides need proof that the other can both send and receive.
            The three messages are named for what they carry: SYN
            (&ldquo;synchronize&rdquo; — let&apos;s agree on a starting
            sequence number), SYN-ACK (synchronize plus{" "}
            <Code>acknowledge</Code>), and ACK (acknowledge). SYN proves the
            client can send; SYN-ACK proves the server can both receive and
            send; the final ACK proves the client received that and can also
            send. Two messages would leave the server unsure whether its
            SYN-ACK ever arrived.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="tls" index="05" kicker="Only for https://" title="The TLS handshake">
          <P>
            If the scheme is <Code>https://</Code> — and it almost always is
            today — one more handshake runs on top of TCP before any HTTP
            data moves. TLS, or <Code>Transport Layer Security</Code> (the
            modern name for what used to be called SSL,{" "}
            <Code>Secure Sockets Layer</Code>), is what that handshake sets
            up: proof of who the server is, and a shared key that lets both
            sides encrypt everything from here on.
          </P>
          <AnimationCard eyebrow="TLS 1.3 — one round trip">
            <TlsHandshake />
          </AnimationCard>
          <InterviewNote question="Why not just use asymmetric encryption the whole way through?">
            It&apos;s far more computationally expensive than symmetric
            encryption. TLS uses asymmetric (public/private key) crypto only
            during the handshake, to safely agree on a shared secret — then
            switches to fast symmetric encryption, typically{" "}
            <Code>AES</Code> (Advanced Encryption Standard), for the actual
            session, getting both security and speed.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="http" index="06" kicker="The actual conversation" title="The HTTP request and response">
          <P>
            Only now — after DNS, TCP, and TLS are all done — does the
            browser send the request it actually wanted to send all along.
            HTTP, the <Code>HyperText Transfer Protocol</Code>, is just an
            agreed-on message format: a plain-text (or, over HTTP/2,
            binary-framed) request asking for a specific resource, and a
            response carrying it back.
          </P>
          <AnimationCard eyebrow="Request → Response">
            <HttpExchange />
          </AnimationCard>
          <InterviewNote question="Does the browser open a new TCP + TLS connection for every request?">
            No — that would repeat all of the last two sections for every
            single image and script. <Code>Connection: keep-alive</Code>{" "}
            reuses one connection for several requests, and HTTP/2 goes
            further, multiplexing many concurrent requests over that single
            connection instead of queuing them.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="server" index="07" kicker="What happens on the other end" title="Server-side processing">
          <P>
            This part is less &ldquo;frontend,&rdquo; but interviewers still
            probe it lightly — mostly to see if you understand where time
            actually goes before a response comes back.
          </P>
          <AnimationCard eyebrow="Request lifecycle">
            <ServerProcessing />
          </AnimationCard>
          <InterviewNote question="Why does a cache hit matter so much here?">
            Skipping a database round trip is often the single biggest
            latency win available on the backend — it&apos;s the same principle
            as browser caching, just one layer further back in the chain.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="rendering" index="08" kicker="Turning bytes into pixels" title="The critical rendering path">
          <P>
            The first bytes of the HTML response start this pipeline before
            the whole document has even finished downloading. This is the
            single most-asked-about diagram in frontend interviews — click
            through each stage.
          </P>
          <AnimationCard eyebrow="Click a stage to inspect it">
            <RenderingPipeline />
          </AnimationCard>
          <InterviewNote question="What's the difference between reflow and repaint?">
            Reflow (layout) recomputes size and position — needed whenever
            geometry changes, and it can cascade to parent and sibling
            elements. Repaint just redraws pixels without touching geometry
            (e.g. a color change). Reflow always triggers a repaint after it;
            a repaint alone is cheaper and doesn&apos;t imply a reflow.
          </InterviewNote>
          <InterviewNote question="Why are transform and opacity considered “free” to animate?">
            They can be resolved entirely at the composite step — the GPU
            (Graphics Processing Unit, the chip built for exactly this kind
            of pixel-shuffling work) just moves or fades an already-painted
            layer on its own, without asking the CPU to redo anything.
            Animating <Code>width</Code>, <Code>top</Code>, or{" "}
            <Code>margin</Code> instead forces layout (and then paint) to
            re-run on every single frame.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="loading" index="09" kicker="Parser vs. <script>" title="How scripts affect the parser">
          <P>
            Where — and how — you load a <Code>&lt;script&gt;</Code> changes
            everything about this timeline. This is where{" "}
            <Code>async</Code> and <Code>defer</Code> earn their keep.
          </P>
          <AnimationCard eyebrow="HTML parser vs. script timeline">
            <ParserBlocking />
          </AnimationCard>
          <InterviewNote question="DOMContentLoaded vs. load — when does each fire?">
            <Code>DOMContentLoaded</Code> fires once HTML is parsed and the
            DOM is built — <Code>defer</Code>red scripts have run by then, but
            images and stylesheets might still be loading. <Code>load</Code>{" "}
            waits for every subresource on the page to finish too.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="faq" index="10" kicker="Everything else they might ask" title="Interview Q&A">
          <P>
            The rest of the questions that tend to come up around this topic
            — grouped by area, and worth skimming even if you feel solid on
            the steps above.
          </P>
          <InterviewFaq items={faqs} categories={faqCategories} />
        </ArticleSection>
      </div>

      <aside className="sticky top-20 hidden h-fit w-44 shrink-0 xl:block">
        <TableOfContents sections={sections} />
      </aside>
    </article>
  );
}
