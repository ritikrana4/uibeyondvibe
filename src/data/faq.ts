export interface FaqItem {
  id: string;
  category: string;
  q: string;
  a: string;
}

export const faqCategories = [
  "Networking",
  "DNS",
  "Security (TLS)",
  "HTTP",
  "Browser & Rendering",
  "Performance & Misc",
];

export const faqs: FaqItem[] = [
  // Networking
  {
    id: "tcp-vs-udp",
    category: "Networking",
    q: "Why does HTTP run over TCP instead of UDP?",
    a: "HTML, CSS, and JS need to arrive complete and in order — a dropped or reordered packet would corrupt the page. TCP guarantees ordered, reliable delivery with retransmission and congestion control, which is exactly that. UDP gives none of that for free, which is why HTTP/3 doesn't just swap in raw UDP — it layers QUIC on top, which reimplements reliability itself but per-stream, so one lost packet doesn't stall unrelated streams.",
  },
  {
    id: "socket",
    category: "Networking",
    q: "What is a socket?",
    a: "The pair (IP address, port) that identifies one endpoint of a connection. A TCP connection is really identified by the 4-tuple (client IP, client port, server IP, server port) — which is how a server can handle many simultaneous connections from different clients all hitting the same port 443.",
  },
  {
    id: "rtt",
    category: "Networking",
    q: "Why do interviewers care so much about 'round trips'?",
    a: "Each round trip costs at least one RTT — Round-Trip Time, how long it takes a packet to reach the other side and a reply to come back — before the next step can even begin — DNS, TCP's SYN/SYN-ACK, TLS's ClientHello/ServerHello, then the actual HTTP request. On a slow connection (think 100ms+ RTT on mobile), that's 300-400ms spent before a single byte of your page has arrived. This is exactly why TLS 1.3 cutting the handshake from 2 RTTs to 1, HTTP/2 multiplexing over one connection, and preconnect hints all matter for real-world performance.",
  },
  {
    id: "tcp-close",
    category: "Networking",
    q: "How does a TCP connection close, and how is that different from opening it?",
    a: "Opening is the 3-way handshake (SYN, SYN-ACK, ACK). Closing is typically a 4-way exchange (FIN, ACK, FIN, ACK) since both sides need to independently signal they're done sending — a connection can be 'half-closed' while one side still finishes streaming data to the other.",
  },

  // DNS
  {
    id: "dns-what",
    category: "DNS",
    q: "What actually is DNS, in one sentence?",
    a: "A globally distributed, hierarchical, cached key-value lookup that maps human-readable hostnames to IP addresses — because computers route packets by IP, not by name.",
  },
  {
    id: "dns-records",
    category: "DNS",
    q: "What DNS record types should you know?",
    a: "A (hostname → IPv4), AAAA (hostname → IPv6), CNAME (alias → another hostname), MX (mail server priority), TXT (arbitrary text — used for domain verification and SPF/DKIM), and NS (which nameservers are authoritative for a zone).",
  },
  {
    id: "dns-caching",
    category: "DNS",
    q: "Where does DNS get cached, and what stops it going stale?",
    a: "In layers: the browser's own DNS cache, the OS resolver cache, often a router/ISP cache, and the recursive resolver itself. Every record has a TTL (time-to-live) in seconds; once it expires, the cache has to ask again — which is the trade-off between 'fast lookups' and 'how quickly can I redirect traffic if a server's IP changes.'",
  },
  {
    id: "dns-cdn",
    category: "DNS",
    q: "How does DNS help a CDN send you to the nearest server?",
    a: "A CDN — Content Delivery Network — is a set of servers spread across many physical locations, all serving copies of the same static files. DNS is how it routes you to the closest one: via anycast (the same IP is announced from many locations at once, and normal internet routing sends you to the topologically nearest one) or geo-DNS (the resolver looks at where your query came from and returns a different IP for different regions). Either way, DNS is the mechanism that turns one hostname into 'whichever edge server is closest to you.'",
  },
  {
    id: "dns-prefetch",
    category: "DNS",
    q: "What does <link rel=\"dns-prefetch\"> actually save you?",
    a: "It resolves a third-party domain's DNS ahead of time, before the browser would otherwise need it — so when you do request something from that origin, you skip straight past DNS lookup. preconnect goes further and also completes the TCP and TLS handshake in advance, at a higher resource cost, so it's best reserved for origins you're sure you'll use (e.g. the CDN serving your fonts).",
  },

  // Security / TLS
  {
    id: "tls-why",
    category: "Security (TLS)",
    q: "What is the TLS handshake actually accomplishing?",
    a: "Two things: authenticating the server (so you know you're really talking to example.com, not an attacker) and agreeing on symmetric encryption keys that both sides can use for the rest of the session — without ever sending the key itself over the wire.",
  },
  {
    id: "tls-sym-asym",
    category: "Security (TLS)",
    q: "Why does TLS use both asymmetric and symmetric encryption?",
    a: "Asymmetric (public/private key) crypto is what lets two strangers agree on a secret without a prior shared password, but it's computationally expensive. Symmetric crypto (like AES) is much faster but requires both sides to already share a key. So TLS uses asymmetric crypto only during the handshake to establish a shared secret, then switches to fast symmetric encryption for the actual data.",
  },
  {
    id: "tls-cert",
    category: "Security (TLS)",
    q: "What is a certificate, and why do browsers trust it?",
    a: "A certificate binds a public key to a domain name and is digitally signed by a Certificate Authority (CA). Your browser/OS ships with a built-in list of trusted root CAs; if it can walk a chain of signatures from the site's certificate up to one of those roots, it trusts the certificate — this is the 'chain of trust.'",
  },
  {
    id: "sni",
    category: "Security (TLS)",
    q: "What is SNI, and why does it matter?",
    a: "Server Name Indication — the hostname the client is trying to reach, sent in the (historically unencrypted) ClientHello. It lets one IP address / one server host HTTPS certificates for many different domains, since the server needs to know which certificate to present before the encrypted channel exists. Encrypted Client Hello (ECH) is the newer effort to hide even this.",
  },
  {
    id: "hsts",
    category: "Security (TLS)",
    q: "What is HSTS?",
    a: "HTTP Strict Transport Security — a response header (Strict-Transport-Security) telling the browser 'always use HTTPS for this domain from now on, for N seconds.' Combined with the browser-shipped HSTS preload list, it closes the window where a first request over plain HTTP could be intercepted and downgraded to a fake, unencrypted connection (an attack called SSL-stripping).",
  },

  // HTTP
  {
    id: "http-versions",
    category: "HTTP",
    q: "What's actually different between HTTP/1.1, HTTP/2, and HTTP/3?",
    a: "HTTP/1.1 is plain text, one request waiting on one response per connection (browsers work around this by opening several parallel connections). HTTP/2 is binary-framed and multiplexes many requests over a single TCP connection with header compression (HPACK) — but one lost TCP packet still blocks every stream on that connection. HTTP/3 keeps multiplexing but runs over QUIC (on UDP) instead of TCP, so a lost packet only blocks its own stream, and connection setup can happen in 0-1 round trips.",
  },
  {
    id: "http-methods",
    category: "HTTP",
    q: "Which HTTP methods are idempotent, and why does that matter?",
    a: "GET, PUT, and DELETE are idempotent — calling them once or ten times leaves the server in the same state. POST and PATCH generally aren't. This matters for safe retries: a browser or proxy can safely retry a failed GET automatically, but retrying a POST could double-charge a credit card.",
  },
  {
    id: "redirects",
    category: "HTTP",
    q: "301 vs 302 vs 307 vs 308 — what's the real difference?",
    a: "301/308 are permanent, 302/307 are temporary (mainly a signal for whether to update bookmarks/SEO indexing). Separately, 301/302 historically allowed the method to change on redirect (a POST could become a GET), while 307/308 explicitly guarantee the method and body are preserved — which matters a lot when you're redirecting a form submission.",
  },
  {
    id: "cookies",
    category: "HTTP",
    q: "What do the main cookie attributes actually do?",
    a: "HttpOnly hides the cookie from JavaScript entirely, which mitigates XSS (Cross-Site Scripting — an attacker sneaking their own script onto your page) stealing it. Secure means it's only ever sent over HTTPS, never plain HTTP. SameSite=Strict/Lax/None controls whether the cookie is sent on requests that originate from another site, which mitigates CSRF (Cross-Site Request Forgery — tricking a logged-in user's browser into firing a request they didn't mean to make) — Lax is the modern default, only withholding the cookie on cross-site subresource/POST-like requests.",
  },
  {
    id: "cors",
    category: "HTTP",
    q: "What triggers a CORS preflight request?",
    a: "CORS — Cross-Origin Resource Sharing, the mechanism that lets a server explicitly allow requests from another origin — adds a preflight step for a 'non-simple' cross-origin request — one using a method other than GET/POST/HEAD, custom headers, or a content type other than form-encoded/plain-text. The browser sends an OPTIONS request first asking the server 'would you allow this?' before sending the real one. It's the browser enforcing this, not the server — CORS exists to relax the same-origin policy safely, not to secure an API by itself.",
  },
  {
    id: "http-caching",
    category: "HTTP",
    q: "What's the difference between a cache hit, a 304, and a fresh 200?",
    a: "A cache hit (from Cache-Control: max-age) never touches the network at all. If the cached response is stale, the browser can send a conditional request (If-None-Match with an ETag, or If-Modified-Since) — if the resource hasn't changed, the server replies 304 Not Modified with no body, and the browser reuses its cached copy. Otherwise it's a normal fresh 200 with the full new body.",
  },

  // Browser & Rendering
  {
    id: "crp-summary",
    category: "Browser & Rendering",
    q: "Can you summarize the critical rendering path in one breath?",
    a: "HTML → DOM, CSS → CSSOM, DOM + CSSOM → Render Tree (display:none nodes dropped), Render Tree → Layout (compute geometry), Layout → Paint (fill in pixels), Paint → Composite (GPU stacks layers onto the screen).",
  },
  {
    id: "reflow-repaint",
    category: "Browser & Rendering",
    q: "What's the difference between reflow and repaint?",
    a: "Reflow (layout) recomputes the size/position of elements — it's needed whenever geometry changes (resizing, adding/removing DOM nodes, changing width/font-size) and can cascade to parents and siblings. Repaint just redraws pixels for a region without changing geometry (e.g. a background-color change). Reflow always implies a repaint after it; repaint doesn't imply a reflow. Reflow is the more expensive of the two.",
  },
  {
    id: "cheap-animations",
    category: "Browser & Rendering",
    q: "Why are transform and opacity the 'cheap' CSS properties to animate?",
    a: "Changing them doesn't affect any other element's geometry and doesn't need new pixels painted — the browser can hand the existing painted layer straight to the GPU compositor and just move/fade it. Animating width, top, or margin, by contrast, forces layout (and usually paint) on every single frame.",
  },
  {
    id: "layout-thrashing",
    category: "Browser & Rendering",
    q: "What is layout thrashing?",
    a: "Interleaving DOM writes (e.g. el.style.width = ...) with layout-dependent reads (el.offsetHeight, getBoundingClientRect()) inside a loop. Each read forces the browser to synchronously flush any pending layout work to give you an accurate number — do that N times in a loop and you've forced N synchronous reflows instead of one batched one.",
  },
  {
    id: "preload-scanner",
    category: "Browser & Rendering",
    q: "What is the 'preload scanner'?",
    a: "A lightweight, speculative parser that scans the raw HTML response ahead of the main parser to discover resources — scripts, stylesheets, images, preload hints — and kicks off their network requests immediately, even before the main parser (which builds the actual DOM and can be paused by a blocking script) reaches that point.",
  },
  {
    id: "dcl-vs-load",
    category: "Browser & Rendering",
    q: "DOMContentLoaded vs. load — what's the actual difference?",
    a: "DOMContentLoaded fires once HTML is fully parsed and the DOM is built (deferred scripts have run, but images/stylesheets/iframes may still be loading). load fires only after every subresource on the page — images, stylesheets, fonts, iframes — has finished loading too.",
  },
  {
    id: "css-blocks-js",
    category: "Browser & Rendering",
    q: "Does CSS block anything besides rendering?",
    a: "Yes — a common trick question. External CSS is render-blocking (nothing paints until the CSSOM is ready), but it also blocks JavaScript execution: if a <script> tag comes after a pending stylesheet in the HTML, the browser holds up that script until the CSS finishes loading, since the script might synchronously read a computed style that depends on it.",
  },

  // Performance & Misc
  {
    id: "bfcache",
    category: "Performance & Misc",
    q: "What is the back/forward cache (bfcache)?",
    a: "A full, frozen snapshot of a page — DOM, JS heap, everything — kept in memory when you navigate away, so hitting the browser's back/forward button restores it instantly instead of reloading from scratch. Certain things make a page ineligible, most commonly unload event listeners and open connections the browser can't safely freeze.",
  },
  {
    id: "service-worker",
    category: "Performance & Misc",
    q: "How does a service worker change this whole flow?",
    a: "Once registered for an origin, it sits as a programmable network proxy between the page and the network. Its fetch event handler can intercept every request and decide to serve from a cache, go to the network, or synthesize a response entirely — which is the foundation of offline support and custom caching strategies (and it runs even before some of the 'browser checks' step in this article).",
  },
  {
    id: "resource-hints",
    category: "Performance & Misc",
    q: "dns-prefetch vs preconnect vs preload vs prefetch — when do you use which?",
    a: "They're ordered by how much work they do ahead of time: dns-prefetch only resolves DNS. preconnect does DNS + TCP + TLS. preload fetches a specific resource this page needs right now, at high priority (e.g. a hero font). prefetch fetches a resource a likely future navigation will need, at low priority, so it doesn't compete with the current page.",
  },
  {
    id: "ttfb",
    category: "Performance & Misc",
    q: "What is TTFB and what makes it slow?",
    a: "Time To First Byte — the time from starting the navigation to the first byte of the response arriving. It bundles up DNS lookup, TCP handshake, TLS handshake, and however long the server took to start streaming a response — which is why a slow TTFB can mean a networking problem or a slow backend, and you need other metrics (or a waterfall) to tell which.",
  },
  {
    id: "same-origin",
    category: "Performance & Misc",
    q: "What exactly counts as 'the same origin'?",
    a: "Scheme, host, and port must all match exactly. https://example.com and http://example.com are different origins (different scheme). https://example.com and https://api.example.com are different origins (different host). https://example.com and https://example.com:8443 are different origins (different port).",
  },
  {
    id: "localhost",
    category: "Performance & Misc",
    q: "What's different if you type 'localhost:3000' instead of a real domain?",
    a: "No scheme, so the browser assumes http:// (or upgrades to https:// if it's HSTS-listed, which localhost normally isn't). And there's effectively no DNS resolution — 'localhost' is resolved locally, almost always straight to the loopback address 127.0.0.1, so the whole DNS section of this pipeline is skipped.",
  },
];
