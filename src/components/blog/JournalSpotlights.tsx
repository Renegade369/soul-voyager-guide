import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  fetchWellnessProducts,
  fetchPractitioners,
  categoryLabel,
  specialtyLabel,
  type WellnessProduct,
  type Practitioner,
} from "@/lib/directory";

function pickByPostId<T>(items: T[], postId: string): T | null {
  if (items.length === 0) return null;
  let h = 0;
  for (let i = 0; i < postId.length; i++) h = (h * 31 + postId.charCodeAt(i)) >>> 0;
  return items[h % items.length];
}

const cardStyle: React.CSSProperties = {
  borderColor: "rgba(201,168,76,0.45)",
  backgroundColor: "#1A1209",
  borderRadius: "0.25rem",
  boxShadow: "0 0 24px rgba(201,168,76,0.08)",
};

const labelStyle: React.CSSProperties = { color: "#C9A84C" };
const bodyTextStyle: React.CSSProperties = { color: "rgba(245,240,232,0.82)" };
const ctaStyle: React.CSSProperties = {
  backgroundColor: "#C9A84C",
  color: "#0A0A0A",
  borderRadius: "0.25rem",
};

function PlaceholderArt({ label }: { label: string }) {
  return (
    <div
      className="flex aspect-square w-full items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(232,130,26,0.12))",
        color: "#C9A84C",
        borderRadius: "0.25rem",
      }}
    >
      <span className="font-serif text-2xl font-light italic">{label}</span>
    </div>
  );
}

export function JournalSpotlights({ postId }: { postId: string }) {
  const [product, setProduct] = useState<WellnessProduct | null>(null);
  const [practitioner, setPractitioner] = useState<Practitioner | null>(null);

  useEffect(() => {
    fetchWellnessProducts()
      .then((items) => setProduct(pickByPostId(items, postId + "w")))
      .catch(() => setProduct(null));
    fetchPractitioners()
      .then((items) => setPractitioner(pickByPostId(items, postId + "p")))
      .catch(() => setPractitioner(null));
  }, [postId]);

  if (!product && !practitioner) return null;

  return (
    <div className="mx-auto mt-16 grid max-w-3xl gap-6 md:grid-cols-2">
      {product && (
        <div className="border p-6" style={cardStyle}>
          <p className="text-[10px] font-light uppercase tracking-[0.28em]" style={labelStyle}>
            Featured Wellness Tool
          </p>
          <div className="mt-5">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
                style={{ borderRadius: "0.25rem" }}
              />
            ) : (
              <PlaceholderArt label={categoryLabel(product.category)} />
            )}
          </div>
          <h3 className="mt-5 font-serif text-2xl font-light leading-snug" style={{ color: "#F5F0E8" }}>
            {product.name}
          </h3>
          {product.why_william_uses_it && (
            <p className="mt-4 font-serif text-base font-light italic leading-relaxed" style={bodyTextStyle}>
              "{product.why_william_uses_it.slice(0, 180)}
              {product.why_william_uses_it.length > 180 ? "…" : ""}"
            </p>
          )}
          <Link
            to="/wellness/$slug"
            params={{ slug: product.slug }}
            className="mt-6 inline-flex items-center justify-center px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={ctaStyle}
          >
            See it
          </Link>
        </div>
      )}
      {practitioner && (
        <div className="border p-6" style={cardStyle}>
          <p className="text-[10px] font-light uppercase tracking-[0.28em]" style={labelStyle}>
            Trusted Practitioner Spotlight
          </p>
          <div className="mt-5">
            {practitioner.photo ? (
              <img
                src={practitioner.photo}
                alt={practitioner.name}
                className="aspect-square w-full object-cover"
                style={{ borderRadius: "0.25rem" }}
              />
            ) : (
              <PlaceholderArt label={specialtyLabel(practitioner.specialty)} />
            )}
          </div>
          <h3 className="mt-5 font-serif text-2xl font-light leading-snug" style={{ color: "#F5F0E8" }}>
            {practitioner.name}
          </h3>
          {practitioner.how_william_knows_them && (
            <p className="mt-4 font-serif text-base font-light italic leading-relaxed" style={bodyTextStyle}>
              "{practitioner.how_william_knows_them.slice(0, 180)}
              {practitioner.how_william_knows_them.length > 180 ? "…" : ""}"
            </p>
          )}
          <Link
            to="/practitioners/$slug"
            params={{ slug: practitioner.slug }}
            className="mt-6 inline-flex items-center justify-center px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={ctaStyle}
          >
            Meet them
          </Link>
        </div>
      )}
    </div>
  );
}
