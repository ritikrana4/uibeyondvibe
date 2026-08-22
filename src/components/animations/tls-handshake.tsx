"use client";

import { Lock } from "lucide-react";
import { HandshakeDiagram, type HandshakeFrame } from "./handshake-diagram";

const FRAMES: HandshakeFrame[] = [
  {
    dir: "right",
    label: "ClientHello",
    detail: "Supported cipher suites, TLS version, a random value, and a guessed key share.",
  },
  {
    dir: "left",
    label: "ServerHello + Cert + Finished",
    detail: "Picks a cipher, sends its certificate chain and key share, and its own Finished — TLS 1.3 needs just this.",
  },
  {
    dir: "right",
    label: "Finished",
    detail: "Client verifies the certificate against a trusted CA, derives session keys, confirms — encrypted traffic starts now.",
  },
];

export function TlsHandshake() {
  return (
    <HandshakeDiagram
      frames={FRAMES}
      accent="emerald"
      footer={
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
          <Lock className="h-4 w-4" />
          Encrypted channel established — TLS 1.3 does this in 1 round trip (TLS 1.2 needed 2).
        </div>
      }
    />
  );
}
