"use client";

import {
  Clock,
  Layers3,
  Plug,
  Boxes,
  Ban,
  RefreshCw,
  Radio,
  Waves,
  Webhook,
  Rss,
} from "lucide-react";
import { ArticleSection } from "@/components/ui/section";
import { AnimationCard } from "@/components/ui/animation-card";
import { Code, InterviewNote, P, Ul } from "@/components/ui/prose";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { PipelineOverview } from "@/components/animations/pipeline-overview";
import { RestMethods } from "@/components/animations/rest-methods";
import { PollingComparison } from "@/components/animations/polling-comparison";
import { ServerSentEvents } from "@/components/animations/sse-stream";
import { WebSocketFlow } from "@/components/animations/websocket-flow";
import { WebhookFlow } from "@/components/animations/webhook-flow";
import { HttpStreaming } from "@/components/animations/http-streaming";
import { ComparisonTable } from "@/components/animations/comparison-table";
import { InterviewFaq } from "@/components/interview-faq";
import { communicationFaqs, communicationFaqCategories } from "@/data/faq-communication";
import { sections } from "./sections-meta";

const PIPELINE_NODES = [
  { id: "api-basics", label: "What's an API?", icon: Plug },
  { id: "rest", label: "REST", icon: Boxes },
  { id: "push-problem", label: "Push problem", icon: Ban },
  { id: "polling", label: "Polling", icon: RefreshCw },
  { id: "sse", label: "SSE", icon: Radio },
  { id: "websockets", label: "WebSockets", icon: Waves },
  { id: "webhooks", label: "Webhooks", icon: Webhook },
  { id: "streaming", label: "Streaming", icon: Rss },
];

export function CommunicationPatternsArticle() {
  return (
    <article className="flex gap-10">
      <div className="min-w-0 flex-1">
        <header>
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            APIs &amp; Real-Time Communication
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            REST, WebSockets, SSE, and everything in between
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Every real app needs the client and server to talk — and half the
            time, it needs the server to speak up first. Here&apos;s every major
            pattern for doing that, animated, plus the follow-up questions
            interviewers ask about each one.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> 24 min read
            </span>
            <span className="flex items-center gap-1.5">
              <Layers3 className="h-3.5 w-3.5" /> 10 sections · 32 interview
              Q&amp;As
            </span>
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-100 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
            <p className="mb-3 px-1 text-xs font-medium text-zinc-500 dark:text-zinc-500">
              Every pattern, at a glance — click any stop to jump there.
            </p>
            <PipelineOverview nodes={PIPELINE_NODES} />
          </div>
        </header>

        <ArticleSection id="api-basics" index="01" kicker="Foundations" title="What is an API, really?">
          <P>
            An API — short for <Code>Application Programming Interface</Code>{" "}
            — is just a contract: a defined way for one program to ask
            another for something, or tell it to do something, without
            needing to know how the other side is actually built. On the web,
            that contract is almost always expressed as messages sent over
            HTTP — a client sends a request, a server sends back a response.
          </P>
          <P>
            Everything in this article is really one question, answered
            several different ways: <Code>who talks first</Code>, and{" "}
            <Code>how long does the connection stay open</Code>?
          </P>
          <InterviewNote question="Is 'API' the same thing as 'REST API'?">
            No — REST is one style of API, not the only one. GraphQL is a
            query language where the client specifies exactly which fields
            it wants back in one request. gRPC (built by Google, the
            &ldquo;g&rdquo; is officially recursive — &ldquo;gRPC Remote
            Procedure Calls&rdquo;) is a fast, binary way for services to
            call each other&apos;s functions directly. SOAP (Simple Object Access
            Protocol) is an older, XML-based, heavily standardized style
            mostly seen in enterprise and banking systems now. And plenty of
            APIs are just plain RPC (Remote Procedure Call — call a named
            function, get a result back) over JSON (JavaScript Object
            Notation, the text format almost every API uses to structure
            data) without following REST&apos;s conventions at all. REST just
            happens to be the most common style for public, browser-facing
            web APIs.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="rest" index="02" kicker="The default choice" title="REST: resources over HTTP">
          <P>
            REST — <Code>REpresentational State Transfer</Code>, a set of
            conventions rather than a protocol you install — models
            everything as a <Code>resource</Code>: a user, an order, a
            comment, each addressed by its own URL and manipulated with
            standard HTTP methods. The method you pick isn&apos;t just a naming
            convention: it carries real meaning about safety and
            idempotency (whether calling it twice has the same effect as
            calling it once) that caches, browsers, and retry logic all rely
            on.
          </P>
          <AnimationCard eyebrow="Click a method to inspect it">
            <RestMethods />
          </AnimationCard>
          <InterviewNote question="REST vs. GraphQL vs. gRPC — how would you frame the trade-off?">
            REST is simple and cacheable, great for public APIs built around{" "}
            <Code>CRUD</Code> — Create, Read, Update, Delete, the four basic
            things you do to a piece of data. GraphQL lets the client ask
            for exactly the fields it needs in one round trip — good for
            complex, nested UI data. gRPC is binary and runs over HTTP/2
            with native streaming — very fast for internal
            service-to-service calls where you control both ends, less
            ideal for a public browser-facing API.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="push-problem" index="03" kicker="The limitation" title="The problem: servers can't just push">
          <P>
            Plain HTTP is fundamentally client-initiated — a server can only
            talk when it&apos;s been asked a question, and once it answers, the
            connection is done. But a lot of real products need the opposite:
            a chat message, a price update, a notification that should reach
            the client the moment it happens, not the next time the client
            happens to ask.
          </P>
          <P>
            Every pattern below is a different answer to the same question:{" "}
            <Code>how do you fake — or actually build — a server that can speak first?</Code>
          </P>
          <Ul>
            <li>Ask repeatedly and hope you catch it in time → polling.</li>
            <li>Ask once, but let the server hold the line until it has something → long polling.</li>
            <li>Open one channel the server can write to whenever it wants → SSE or WebSockets.</li>
            <li>Give the server a phone number to call you back on → webhooks.</li>
          </Ul>
        </ArticleSection>

        <ArticleSection id="polling" index="04" kicker="The simplest workaround" title="Short polling vs. long polling">
          <P>
            The most obvious fix needs no new protocol at all: just keep
            asking. The difference between the &ldquo;wasteful&rdquo; and
            &ldquo;pretty decent&rdquo; versions of this idea comes down to
            one thing — does the server answer immediately, or does it wait?
          </P>
          <AnimationCard eyebrow="Same time window, two strategies">
            <PollingComparison />
          </AnimationCard>
          <InterviewNote question="Why not just poll every 100ms and call it a day?">
            Because every poll costs a full request-response cycle — server
            load, and often battery on mobile — regardless of whether
            anything changed. Multiply that by every idle client and
            you&apos;re burning real infrastructure cost for a signal
            that&apos;s &ldquo;no&rdquo; almost all the time.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="sse" index="05" kicker="One-way live updates" title="Server-Sent Events">
          <P>
            SSE keeps a single HTTP request open indefinitely and lets the
            server write new events to it whenever it wants — no polling,
            no reopening. The catch: it&apos;s one-way. The client can&apos;t send
            anything back down that same channel.
          </P>
          <AnimationCard eyebrow="One request, held open">
            <ServerSentEvents />
          </AnimationCard>
          <InterviewNote question="What happens if the connection drops?">
            The browser&apos;s built-in EventSource API reconnects automatically
            — no extra code needed — and sends the ID of the last event it
            saw in a Last-Event-ID header, so a well-behaved server can
            resume the stream instead of replaying everything from scratch.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="websockets" index="06" kicker="Full duplex" title="WebSockets">
          <P>
            WebSockets start as a normal HTTP request that asks to change
            the rules: <Code>Upgrade: websocket</Code>. Once the server
            agrees, that same TCP connection stops speaking HTTP entirely —
            both sides can send framed messages to each other, at any time,
            in any order.
          </P>
          <AnimationCard eyebrow="Upgrade handshake, then full duplex">
            <WebSocketFlow />
          </AnimationCard>
          <InterviewNote question="Why does this complicate scaling more than a REST API does?">
            A REST call is stateless — any server instance behind a load
            balancer can handle it. A WebSocket is a long-lived connection
            pinned to one specific instance. Broadcasting a message to a user
            who might be connected to any of N servers needs a shared
            pub-sub layer (like Redis) so the instance that actually holds
            their socket hears about it.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="webhooks" index="07" kicker="Server calls server" title="Webhooks">
          <P>
            Every pattern so far assumed a browser on the other end. Webhooks
            are the server-to-server version: you register a URL with a
            provider ahead of time, and whenever something happens on their
            side, they call you — no polling their API to check.
          </P>
          <AnimationCard eyebrow="Register once, get called later">
            <WebhookFlow />
          </AnimationCard>
          <InterviewNote question="What's the most common webhook bug?">
            Treating delivery as exactly-once. Providers retry on timeouts
            or non-2xx responses, so the same event can arrive twice — your
            handler needs to be idempotent (e.g. checking an event ID
            you&apos;ve already processed) and should acknowledge fast,
            doing any slow work in a background job instead of inline.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="streaming" index="08" kicker="One request, progressive delivery" title="HTTP Streaming">
          <P>
            Streaming doesn&apos;t add a new connection type at all — it changes
            how a single response is delivered. Instead of the server
            building the entire body and sending it in one shot, it sends
            chunks as they become available, and the client can start using
            them immediately. This is exactly how token-by-token output from
            an LLM (Large Language Model — the kind of model behind ChatGPT
            and similar tools) reaches your screen word by word instead of
            all at once.
          </P>
          <AnimationCard eyebrow="Same total time, very different experience">
            <HttpStreaming />
          </AnimationCard>
          <InterviewNote question="What API lets you actually consume a streamed fetch() response?">
            <Code>response.body</Code> is a <Code>ReadableStream</Code> —
            call <Code>.getReader()</Code> and read chunks as they arrive,
            instead of awaiting <Code>.json()</Code> or <Code>.text()</Code>,
            which buffer the whole response before resolving.
          </InterviewNote>
        </ArticleSection>

        <ArticleSection id="choosing" index="09" kicker="Putting it together" title="Choosing the right tool">
          <P>
            None of these replace the others — most real products use
            several at once (REST for CRUD, WebSockets for a live chat
            panel, webhooks for billing events). The decision usually comes
            down to two questions: who needs to speak first, and how long
            does the connection need to stay open?
          </P>
          <AnimationCard eyebrow="Decision matrix">
            <ComparisonTable />
          </AnimationCard>
        </ArticleSection>

        <ArticleSection id="faq" index="10" kicker="Everything else they might ask" title="Interview Q&A">
          <P>
            The rest of the questions that tend to come up around APIs and
            real-time communication — grouped by area.
          </P>
          <InterviewFaq items={communicationFaqs} categories={communicationFaqCategories} />
        </ArticleSection>
      </div>

      <aside className="sticky top-20 hidden h-fit w-44 shrink-0 xl:block">
        <TableOfContents sections={sections} />
      </aside>
    </article>
  );
}
