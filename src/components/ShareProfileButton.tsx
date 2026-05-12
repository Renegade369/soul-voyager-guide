import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { toast } from "sonner";

export function ShareProfileButton({ shareId, soulName }: { shareId: string | null; soulName?: string }) {
  const [copied, setCopied] = useState(false);
  if (!shareId) return null;

  const url = typeof window !== "undefined" ? `${window.location.origin}/profile/${shareId}` : "";

  const onShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "My Soul Profile",
          text: soulName ? `My Soul Profile: ${soulName}` : "My Soul Profile",
          url,
        });
        return;
      } catch { /* fallback to copy */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied!", {
        style: { background: "#1A1209", border: "1px solid #C9A84C", color: "#F5F0E8" },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link.");
    }
  };

  return (
    <button onClick={onShare}
      className="flex items-center justify-center gap-2 rounded-none border px-6 py-4 text-[11px] uppercase tracking-[0.22em]"
      style={{ borderColor: "#C9A84C", color: "#C9A84C" }}>
      {copied ? <><Check size={13} /> Copied</> : <><Share2 size={13} /> Share My Profile</>}
    </button>
  );
}
