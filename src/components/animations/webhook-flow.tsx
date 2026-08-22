"use client";

import { HandshakeDiagram, type HandshakeFrame } from "./handshake-diagram";

const FRAMES: HandshakeFrame[] = [
  {
    dir: "right",
    label: "Register webhook",
    detail: "POST /webhooks — “call this URL when payment.succeeded happens.”",
  },
  {
    dir: "left",
    label: "payment.succeeded",
    detail: "Sometime later, a real payment completes — the provider proactively POSTs the event to your URL. You never asked; it just arrives.",
  },
  {
    dir: "right",
    label: "200 OK",
    detail: "Acknowledge fast. Anything other than a 2xx (or a timeout) triggers a retry with backoff — possibly delivering the same event twice.",
  },
];

export function WebhookFlow() {
  return (
    <HandshakeDiagram
      frames={FRAMES}
      leftLabel="Your server"
      rightLabel="Payment provider"
      accent="violet"
      stepDelay={900}
    />
  );
}
