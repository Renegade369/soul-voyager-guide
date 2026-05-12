import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchSharedProfile, type SoulProfile } from "@/lib/profileSharing";
import { SoulProfileView } from "@/components/SoulProfileView";

export const Route = createFileRoute("/profile/$id")({
  head: () => ({
    meta: [
      { title: "A Soul Profile — Soul True" },
      { name: "description", content: "A shared Soul Profile reading from Soul True." },
    ],
  }),
  component: SharedProfilePage,
});

function SharedProfilePage() {
  const { id } = Route.useParams();
  const [profile, setProfile] = useState<SoulProfile | null>(null);
  const [state, setState] = useState<"loading" | "found" | "missing">("loading");

  useEffect(() => {
    fetchSharedProfile(id).then((p) => {
      if (p) { setProfile(p); setState("found"); } else setState("missing");
    });
  }, [id]);

  if (state === "loading") {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0A", color: "#C9A84C" }}>Loading…</div>;
  }
  if (state === "missing" || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center" style={{ background: "#0A0A0A", color: "#F5F0E8" }}>
        <p className="font-serif text-2xl">This profile could not be found.</p>
        <Link to="/" className="text-[11px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>Get your own reading →</Link>
      </div>
    );
  }
  return (
    <div style={{ background: "#0A0A0A" }}>
      <SoulProfileView profile={profile} />
      <div className="mx-auto max-w-2xl px-6 pb-20 text-center">
        <div className="mt-4 rounded-none border p-8" style={{ borderColor: "rgba(201,168,76,0.4)", background: "#1A1209" }}>
          <p className="font-serif text-2xl italic" style={{ color: "#E8C87A" }}>Discover your own.</p>
          <p className="mt-2 text-sm" style={{ color: "rgba(245,240,232,0.7)" }}>
            Your soul has its own signature. See what yours reveals.
          </p>
          <Link to="/" className="mt-6 inline-block rounded-none px-8 py-3 text-[11px] uppercase tracking-[0.22em]"
            style={{ background: "#C9A84C", color: "#0A0A0A" }}>
            Get Your Own Reading →
          </Link>
        </div>
      </div>
    </div>
  );
}
