import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  fetchPractitioner,
  fetchPractitioners,
  specialtyLabel,
  type Practitioner,
} from "@/lib/directory";
import { makeRouteMeta } from "@/components/PageShell";

export const Route = createFileRoute("/practitioners/$slug")({
  head: ({ params }) =>
    makeRouteMeta({
      title: `${params.slug.replace(/-/g, " ")} — Trusted Practitioners · Soul True`,
      description: "A personal referral from William. Soul True does not provide these services.",
    }),
  component: PractitionerDetail,
});

function PractitionerDetail() {
  const { slug } = Route.useParams();
  const [item, setItem] = useState<Practitioner | null>(null);
  const [related, setRelated] = useState<Practitioner[]>([]);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    setLoading(true);
    setMissing(false);
    Promise.all([fetchPractitioner(slug), fetchPractitioners()])
      .then(([p, all]) => {
        if (!p) {
          setMissing(true);
          return;
        }
        setItem(p);
        const sameSpec = all.filter((x) => x.slug !== p.slug && x.specialty === p.specialty);
        const others = all.filter((x) => x.slug !== p.slug && x.specialty !== p.specialty);
        setRelated([...sameSpec, ...others].slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="min-h-[60vh] px-6 py-20 text-center text-sm" style={{ backgroundColor: "#0A0A0A", color: "rgba(245,240,232,0.5)" }}>Loading…</div>;
  }

  if (missing || !item) {
    return (
      <div className="min-h-[60vh] px-6 py-20 text-center" style={{ backgroundColor: "#0A0A0A", color: "#F5F0E8" }}>
        <h1 className="font-serif text-3xl">Not found</h1>
        <Link to="/practitioners" className="mt-6 inline-block text-sm underline" style={{ color: "#C9A84C" }}>← Back</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#0A0A0A", color: "#F5F0E8" }}>
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link to="/practitioners" className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "rgba(245,240,232,0.55)" }}>
          ← Trusted Practitioners
        </Link>

        {item.photo && (
          <div className="mt-8 aspect-[16/10] w-full overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
            <img src={item.photo} alt={item.name} className="h-full w-full object-cover" />
          </div>
        )}

        <p className="mt-10 text-[11px] uppercase tracking-[0.28em]" style={{ color: "#C9A84C" }}>
          {specialtyLabel(item.specialty)}
          {item.location ? ` · ${item.location}` : ""}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-light leading-[1.1] md:text-5xl">{item.name}</h1>

        {item.how_william_knows_them && (
          <blockquote
            className="my-12 border-l-2 py-2 pl-6 font-serif text-2xl italic leading-relaxed md:text-3xl"
            style={{ borderColor: "#C9A84C", color: "#F5F0E8" }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] not-italic mb-3" style={{ color: "#C9A84C" }}>How William knows them</p>
            "{item.how_william_knows_them}"
          </blockquote>
        )}

        {item.bio && (
          <p className="text-base font-light leading-relaxed md:text-lg" style={{ color: "rgba(245,240,232,0.82)" }}>
            {item.bio}
          </p>
        )}

        {item.what_they_offer && (
          <div className="mt-10">
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>What they offer</p>
            <p className="mt-3 text-base font-light leading-relaxed" style={{ color: "rgba(245,240,232,0.78)" }}>
              {item.what_they_offer}
            </p>
          </div>
        )}

        {item.booking_url && (
          <div className="mt-12">
            <a
              href={item.booking_url}
              target={item.booking_url.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="inline-block rounded-none px-8 py-4 text-[11px] uppercase tracking-[0.22em] transition hover:shadow-[0_0_20px_rgba(232,130,26,0.5)]"
              style={{ color: "#0A0A0A", background: "linear-gradient(135deg,#C9A84C,#D4A017)" }}
            >
              Book a session →
            </a>
          </div>
        )}

        <p className="mt-16 text-xs italic" style={{ color: "rgba(245,240,232,0.45)" }}>
          Soul True does not provide these services. This is a personal referral.
        </p>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl border-t px-6 py-16" style={{ borderColor: "rgba(201,168,76,0.18)" }}>
          <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "#C9A84C" }}>More practitioners</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                to="/practitioners/$slug"
                params={{ slug: r.slug }}
                className="block p-5"
                style={{ backgroundColor: "#1A1209", border: "1px solid rgba(201,168,76,0.18)" }}
              >
                <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "#C9A84C" }}>{specialtyLabel(r.specialty)}</p>
                <h3 className="mt-2 font-serif text-lg font-light">{r.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
