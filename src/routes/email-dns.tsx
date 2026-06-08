import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/email-dns")({
  head: () => ({
    meta: [
      { title: "Email DNS — Soul True" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: EmailDnsPage,
});

const SUBDOMAIN = "notify.soul-true.com";
const NS_RECORDS = ["ns3.lovable.cloud", "ns4.lovable.cloud"];

// Plain-text block users can paste into their registrar
const CLIPBOARD_TEXT = [
  `Host/Name: notify`,
  `Type: NS`,
  `Value 1: ${NS_RECORDS[0]}`,
  `Value 2: ${NS_RECORDS[1]}`,
  `TTL: 3600 (or default)`,
  ``,
  `Full FQDN: ${SUBDOMAIN}`,
].join("\n");

function EmailDnsPage() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = async () => {
    setError(null);
    try {
      await navigator.clipboard.writeText(CLIPBOARD_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      setError("Couldn't access clipboard. Select and copy the text below manually.");
    }
  };

  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "#0A0A0A", color: "#F5F0E8", fontFamily: '"Outfit", sans-serif' }}
    >
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-4xl mb-3"
          style={{ fontFamily: '"Cormorant Garamond", serif', color: "#C9A84C", fontWeight: 400 }}
        >
          Email Sender DNS
        </h1>
        <p className="text-sm opacity-70 mb-8">
          NS records for <span style={{ color: "#C9A84C" }}>{SUBDOMAIN}</span>. Add these at your domain
          registrar to verify email sending.
        </p>

        <button
          onClick={handleCopy}
          className="w-full uppercase tracking-[0.22em] text-[11px] font-bold px-6 py-4 transition"
          style={{
            background: "#C9A84C",
            color: "#0A0A0A",
            borderRadius: "0.25rem",
            boxShadow: copied ? "0 0 24px rgba(232,130,26,0.6)" : "none",
          }}
        >
          {copied ? "✓ Copied to clipboard" : "Copy NS records"}
        </button>

        {error && (
          <p className="mt-4 text-sm" style={{ color: "#E8821A" }}>
            {error}
          </p>
        )}

        <div
          className="mt-8 p-5 text-sm whitespace-pre-wrap font-mono"
          style={{
            background: "#1A1209",
            border: "1px solid #2A1F12",
            borderRadius: "0.25rem",
            color: "#F5F0E8",
          }}
        >
{CLIPBOARD_TEXT}
        </div>

        <p className="text-xs opacity-60 mt-6 leading-relaxed">
          DNS propagation can take up to 72 hours, but usually completes within an hour. Once verified,
          emails from <span style={{ color: "#C9A84C" }}>notify@soul-true.com</span> will begin sending.
        </p>
      </div>
    </main>
  );
}
