import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  fetchPractitioners,
  PRACTITIONER_SPECIALTIES,
  specialtyLabel,
  type Practitioner,
  type PractitionerSpecialty,
} from "@/lib/directory";
import { makeRouteMeta } from "@/components/PageShell";

export const Route = createFileRoute("/practitioners/")({
  head: () =>
    makeRouteMeta({
      title: "Trusted Practitioners — Soul True",
      description:
        "The healers, coaches, and teachers William trusts. Personal referrals from Soul True. Let's Go Deeper.",
    }),
  component: PractitionersIndex,
});

function PractitionersIndex() {
  const [items, setItems] = useState<Practitioner[]>([]);
  const [filter, setFilter] = useState<PractitionerSpecialty | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPractitioners()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  const featured = useMemo(() => items.filter((i) => i.is_featured), [items]);
  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.specialty === filter)),
    [items, filter],
  );

  return (
    <div style={{ backgroundColor: "#0A0A0A", color: "#F5F0E8" }}>
      <section className="border-b px-6 py-24 text-center md:py-32" style={{ borderColor: "rgba(201,168,76,0.18)" }}>
        <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "#C9A84C" }}>Trusted Practitioners</p>
        <h1 className="mx-auto mt-6 max-w-3xl font-serif text-5xl font-light leading-[1.05] md:text-6xl">
          The healers, coaches, and teachers William trusts.
        </h1>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pt-16">
          <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "#C9A84C" }}>Featured</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {featured.map((p) => (
              <PractitionerCard key={p.id} item={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 pt-16">
        <div className="flex flex-wrap gap-2 border-b pb-4" style={{ borderColor: "rgba(201,168,76,0.18)" }}>
          {PRACTITIONER_SPECIALTIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setFilter(c.value)}
              className="rounded-none px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition"
              style={{
                color: filter === c.value ? "#0A0A0A" : "rgba(245,240,232,0.7)",
                backgroundColor: filter === c.value ? "#C9A84C" : "transparent",
                border: "1px solid rgba(201,168,76,0.35)",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        {loading ? (
          <p className="py-20 text-center text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="py-20 text-center text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>Nothing here yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map((p) => (
              <PractitionerCard key={p.id} item={p} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t px-6 py-20 text-center" style={{ borderColor: "rgba(201,168,76,0.18)" }}>
        <p className="font-serif text-2xl italic" style={{ color: "#F5F0E8" }}>
          Are you a practitioner William should know?
        </p>
        <a
          href="mailto:William@Soul-True.com"
          className="mt-6 inline-block rounded-none px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "#0A0A0A", background: "linear-gradient(135deg,#C9A84C,#D4A017)" }}
        >
          Reach out
        </a>
      </section>
    </div>
  );
}

function PractitionerCard({ item }: { item: Practitioner }) {
  return (
    <Link
      to="/practitioners/$slug"
      params={{ slug: item.slug }}
      className="group block transition"
      style={{ backgroundColor: "#1A1209", border: "1px solid rgba(201,168,76,0.18)" }}
    >
      <div className="aspect-[4/3] w-full overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
        {item.photo ? (
          <img src={item.photo} alt={item.name} className="h-full w-full object-cover transition group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-5xl italic" style={{ color: "rgba(201,168,76,0.3)" }}>
            ST
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "#C9A84C" }}>
          {specialtyLabel(item.specialty)}
          {item.location ? ` · ${item.location}` : ""}
        </p>
        <h3 className="mt-2 font-serif text-xl font-light group-hover:text-[#E8C87A]" style={{ color: "#F5F0E8" }}>
          {item.name}
        </h3>
        {item.bio && (
          <p className="mt-2 line-clamp-2 text-sm font-light" style={{ color: "rgba(245,240,232,0.65)" }}>
            {item.bio}
          </p>
        )}
      </div>
    </Link>
  );
}
