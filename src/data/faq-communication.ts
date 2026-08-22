import type { FaqItem } from "./faq";

export const communicationFaqCategories = [
  "REST & APIs",
  "Polling",
  "WebSockets",
  "Server-Sent Events",
  "Webhooks",
  "Streaming & Misc",
];

export const communicationFaqs: FaqItem[] = [
  // REST & APIs
  {
    id: "restful",
    category: "REST & APIs",
    q: "What actually makes an API 'RESTful'?",
    a: "A handful of constraints: resources are addressed by URI, a uniform interface (standard HTTP methods mean the same thing everywhere), statelessness (no server-side session between requests), and cacheability. Most real APIs skip the more academic parts — like HATEOAS — and just mean 'resource-shaped URLs over HTTP verbs' in practice.",
  },
  {
    id: "rest-vs-graphql-grpc",
    category: "REST & APIs",
    q: "REST vs. GraphQL vs. gRPC — when would you pick each?",
    a: "REST: simple, cacheable, great for public APIs built around CRUD (Create, Read, Update, Delete) resources. GraphQL: the client asks for exactly the fields it needs in one round trip — great for complex, nested UI data where REST would mean multiple requests or over-fetching. gRPC: binary, using Protobuf (Protocol Buffers, a compact format for encoding structured data) over HTTP/2, very fast and supports streaming — great for internal service-to-service calls where both ends are code you control, less friendly for public/browser-facing APIs.",
  },
  {
    id: "stateless",
    category: "REST & APIs",
    q: "What does 'stateless' mean in REST, and why does it matter?",
    a: "Every request carries everything the server needs to handle it (auth token, params) — the server keeps no memory of previous requests from that client. That means any server instance can handle any request, which is exactly what makes horizontal scaling and load balancing simple: no 'sticky session' requirement.",
  },
  {
    id: "put-vs-patch",
    category: "REST & APIs",
    q: "What's the actual difference between PUT and PATCH?",
    a: "PUT replaces the entire resource with what you send — omit a field and it's typically cleared. PATCH applies a partial update — only the fields you include change. PUT is idempotent by definition; PATCH's idempotency depends on what the patch actually says (\"set status to done\" is idempotent, \"increment count by 1\" is not).",
  },
  {
    id: "status-codes",
    category: "REST & APIs",
    q: "What do the HTTP status code ranges mean?",
    a: "1xx: informational (rare to touch directly). 2xx: success (200 OK, 201 Created, 204 No Content). 3xx: redirection. 4xx: the client's fault (400 Bad Request, 401 Unauthenticated, 403 Forbidden, 404 Not Found, 429 Too Many Requests). 5xx: the server's fault (500 Internal Server Error, 503 Service Unavailable).",
  },
  {
    id: "hateoas",
    category: "REST & APIs",
    q: "What is HATEOAS, and why don't most APIs actually use it?",
    a: "Hypermedia As The Engine Of Application State — the idea that a response includes links describing what you can do next (like a website's links), so clients don't need to hard-code URL structures. It's rarely implemented fully because most client code ends up hard-coding endpoints anyway and the extra payload/complexity isn't seen as worth it — but it's a favorite interview trivia question.",
  },
  {
    id: "rate-limiting",
    category: "REST & APIs",
    q: "What is API rate limiting, and how is it usually communicated?",
    a: "A cap on how many requests a client can make in a given time window, protecting the server from abuse or overload. APIs typically communicate it via response headers like X-RateLimit-Limit and X-RateLimit-Remaining, and return 429 Too Many Requests (often with a Retry-After header) once the caller hits the limit.",
  },
  {
    id: "api-versioning",
    category: "REST & APIs",
    q: "How do you version a REST API?",
    a: "Most commonly in the URL (/v1/users) — visible and cache-friendly. Sometimes in a header instead (Accept: application/vnd.api+json;version=2) to keep URLs clean, at the cost of discoverability. Either way, the goal is the same: let existing clients keep working while you evolve the API underneath.",
  },

  // Polling
  {
    id: "short-polling-why-wasteful",
    category: "Polling",
    q: "Why is short polling considered wasteful?",
    a: "Most requests come back with 'nothing new' — you're paying the full cost of a request (DNS/TCP reuse aside, at minimum a full HTTP round trip and server hit) on a fixed schedule regardless of whether anything actually happened. Poll every second across thousands of idle clients and you're generating enormous load for almost no signal.",
  },
  {
    id: "long-polling-benefit",
    category: "Polling",
    q: "What problem does long polling actually solve?",
    a: "It removes the wasted 'nothing new' round trips: the server holds the request open and only responds once there's real data (or a timeout). The client immediately re-opens a new request. It approximates real-time push while still being plain HTTP request/response underneath — no special protocol needed.",
  },
  {
    id: "long-polling-downside",
    category: "Polling",
    q: "What's the downside of long polling compared to WebSockets?",
    a: "Each waiting client still ties up a server connection (and often a thread) for the duration of the hold — that's much heavier at scale than one persistent WebSocket handling many quick messages. You also pay full HTTP request overhead (headers, sometimes a new TCP+TLS setup) every time a poll resolves and immediately reopens.",
  },
  {
    id: "polling-interval",
    category: "Polling",
    q: "How do you choose a sensible short-polling interval?",
    a: "Balance staleness tolerance against load: too frequent wastes requests on no-ops, too infrequent means users see stale data for longer. A common pattern is exponential backoff — poll quickly right after a user action that's likely to produce a change, then slow down the interval the longer nothing changes.",
  },

  // WebSockets
  {
    id: "ws-handshake",
    category: "WebSockets",
    q: "How does a WebSocket connection actually start?",
    a: "As a normal HTTP GET request carrying an Upgrade: websocket and Connection: Upgrade header. If the server agrees, it replies 101 Switching Protocols instead of 200 — and from that point on, the same underlying TCP connection is reinterpreted as a WebSocket, framed messages instead of HTTP.",
  },
  {
    id: "ws-vs-wss",
    category: "WebSockets",
    q: "What's the difference between ws:// and wss://?",
    a: "Exactly the http:// vs https:// relationship — wss:// runs the WebSocket connection over TLS, encrypting the traffic. Browsers increasingly refuse to open plain ws:// connections from a page loaded over https://, for the same mixed-content reasons.",
  },
  {
    id: "ws-scaling",
    category: "WebSockets",
    q: "Why do WebSockets complicate horizontal scaling?",
    a: "Unlike stateless REST calls, a WebSocket is a long-lived, stateful connection pinned to one specific server instance. If you need to broadcast a message to a user who might be connected to any of N servers, you need something like a pub-sub backplane (Redis, etc.) so any instance can publish an event that reaches the instance actually holding that user's socket.",
  },
  {
    id: "ws-heartbeat",
    category: "WebSockets",
    q: "How do you detect a WebSocket connection that silently died?",
    a: "TCP alone won't always tell you — a dropped Wi-Fi connection can leave a socket looking 'open' with nothing arriving. The standard fix is a heartbeat: periodic ping frames from one side, pong replies from the other; missing a few in a row means the connection is dead and should be torn down and reconnected.",
  },
  {
    id: "ws-vs-sse-choice",
    category: "WebSockets",
    q: "When would you choose WebSockets over Server-Sent Events?",
    a: "As soon as the client needs to send data too, not just receive it — chat, multiplayer games, collaborative editing, anything bidirectional. If data only ever flows server → client (live scores, notifications, log tailing), SSE is simpler and rides on plain HTTP.",
  },

  // Server-Sent Events
  {
    id: "sse-what",
    category: "Server-Sent Events",
    q: "What problem does Server-Sent Events (SSE) solve?",
    a: "A simple way for a server to push a stream of updates to the browser over a single, long-lived HTTP connection — without the complexity of the WebSocket protocol — when the client never needs to send anything back on that channel.",
  },
  {
    id: "sse-format",
    category: "Server-Sent Events",
    q: "What does an SSE message actually look like on the wire?",
    a: "Plain text over a response with Content-Type: text/event-stream. Each message is a data: line (or several) followed by a blank line, e.g. data: {\"score\":42}\\n\\n. Optional event: names the event type, and id: sets a Last-Event-ID the browser will echo back automatically if it has to reconnect.",
  },
  {
    id: "sse-binary",
    category: "Server-Sent Events",
    q: "Can SSE send binary data?",
    a: "No — it's a text-only protocol. You'd base64-encode binary data into a data: field (with size overhead), or switch to WebSockets, which natively support binary frames.",
  },
  {
    id: "sse-reconnect",
    category: "Server-Sent Events",
    q: "What happens when an SSE connection drops?",
    a: "The browser's built-in EventSource API automatically reconnects on its own — no client code required — and sends a Last-Event-ID header with the id of the last event it saw, so a well-behaved server can resume the stream from where it left off instead of replaying everything.",
  },
  {
    id: "sse-connection-limit",
    category: "Server-Sent Events",
    q: "What's the classic SSE gotcha with browser connection limits?",
    a: "Over plain HTTP/1.1, browsers cap concurrent connections per domain at around 6 — so a handful of open SSE streams (e.g. several tabs) to the same origin can exhaust that limit and start blocking other requests. HTTP/2 multiplexes many streams over one connection, which removes this ceiling — a good reason to make sure SSE endpoints are served over HTTP/2.",
  },

  // Webhooks
  {
    id: "webhook-what",
    category: "Webhooks",
    q: "What is a webhook, in contrast to a normal API call?",
    a: "A normal API call is you asking a server a question. A webhook flips the direction: you register a URL with a provider ahead of time, and later, when some event happens on their side, they proactively POST to your URL — you never had to ask or poll.",
  },
  {
    id: "webhook-idempotent",
    category: "Webhooks",
    q: "Why must webhook handlers be idempotent?",
    a: "Delivery isn't guaranteed exactly-once — if your endpoint is slow, errors, or times out, the provider will typically retry with backoff, which can mean the same event arrives twice. Your handler needs to safely handle processing the same event ID more than once (e.g. by checking if you've already recorded it before acting).",
  },
  {
    id: "webhook-verify",
    category: "Webhooks",
    q: "How do you verify a webhook really came from the provider?",
    a: "Providers sign the payload with a shared secret, typically using HMAC-SHA256 (a standard algorithm that mixes a secret key into a hash so the result can't be faked without knowing that key), and send the resulting signature in a header (e.g. Stripe-Signature). Your endpoint recomputes the same signature from the raw request body and the shared secret and compares the two — anyone without the secret can't forge a valid one, even though the URL itself is effectively public.",
  },
  {
    id: "webhook-fast-response",
    category: "Webhooks",
    q: "Why do webhook endpoints need to respond quickly?",
    a: "The provider is usually waiting synchronously for a 2xx to consider delivery successful, often with a short timeout. If your handler does slow work (sending emails, heavy processing) inline, you risk the provider timing out and retrying — better to acknowledge immediately (200 OK) and process the event asynchronously in a background job.",
  },

  // Streaming & misc
  {
    id: "chunked-encoding",
    category: "Streaming & Misc",
    q: "What is chunked transfer encoding?",
    a: "An HTTP/1.1 mechanism (Transfer-Encoding: chunked) that lets a server start sending a response before it knows the total length — the body is sent as a series of chunks, each prefixed with its size, ending in a zero-length chunk. It's what makes streaming a response (rather than buffering it all server-side first) possible.",
  },
  {
    id: "streaming-ttfb",
    category: "Streaming & Misc",
    q: "Why does streaming matter for something like an LLM chat response?",
    a: "Without streaming, the client waits for the entire response to be generated before seeing anything. With streaming, tokens are pushed to the client as they're produced — the user sees the first word almost immediately instead of staring at a spinner for the full generation time, which is a huge perceived-performance win even though total time is the same.",
  },
  {
    id: "readable-stream",
    category: "Streaming & Misc",
    q: "What browser API lets you consume a streamed response?",
    a: "fetch() gives you response.body as a ReadableStream — call .getReader() and read() chunks as they arrive, rather than waiting for response.json() or .text() to buffer the whole thing. This is the foundation under most 'typewriter effect' streaming UIs.",
  },
  {
    id: "streamed-request",
    category: "Streaming & Misc",
    q: "Can you stream a request body too, not just a response?",
    a: "Yes, via ReadableStream request bodies in fetch(), though browser support and proxy/CDN compatibility historically lag behind response streaming — it's the less common direction, mostly used for large uploads.",
  },
  {
    id: "http2-http3-realtime",
    category: "Streaming & Misc",
    q: "How do HTTP/2 and HTTP/3 change these patterns?",
    a: "HTTP/2's multiplexing removes the old 'six connections per domain' ceiling, so many concurrent SSE/streaming/long-polling requests to one origin stop competing for connection slots. Looking forward, WebTransport (built on HTTP/3's QUIC) is emerging as a lower-latency alternative to WebSockets that also supports unreliable, unordered delivery — useful for things like real-time games.",
  },
  {
    id: "webrtc-vs-websocket",
    category: "Streaming & Misc",
    q: "How is WebRTC different from a WebSocket?",
    a: "A WebSocket is client-server — every message still passes through your server. WebRTC is peer-to-peer: once a connection is negotiated (with a signaling server's help, often over WebSockets), audio, video, or data can flow directly between two browsers without touching your server again — the basis for video calls and low-latency data channels.",
  },
];
