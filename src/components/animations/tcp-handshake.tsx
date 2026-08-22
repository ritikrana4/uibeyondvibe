"use client";

import { HandshakeDiagram, type HandshakeFrame } from "./handshake-diagram";

const FRAMES: HandshakeFrame[] = [
  { dir: "right", label: "SYN", detail: "seq = x — “I’d like to talk, starting at sequence x.”" },
  { dir: "left", label: "SYN-ACK", detail: "seq = y, ack = x+1 — “Sure, starting at y, and I got yours.”" },
  { dir: "right", label: "ACK", detail: "ack = y+1 — “Got it. Connection is open.”" },
];

export function TcpHandshake() {
  return <HandshakeDiagram frames={FRAMES} accent="sky" />;
}
