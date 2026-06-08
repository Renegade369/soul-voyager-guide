import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell, makeRouteMeta } from "@/components/PageShell";
import { BrandLoader } from "@/components/BrandLoader";
import { fetchPublishedPosts, formatPublishedDate, type BlogPostCard } from "@/lib/blog";

export const Route = createFileRoute("/blog")({
  head: () =>
    makeRouteMeta({
      title: "The Journal — Soul True",
      description:
        "Sacred writing on energy, frequency, vibration, awakening, numerology, and the practices that change everything.",
    }),
  component: BlogIndex,
});

function BlogIndex() {
  const [posts, setPosts] = useState<BlogPostCard[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    fetchPublishedPosts()
      .then(setPosts)
      .catch((e) => setError(e.message ?? "Failed to load posts"));
  }, []);

  const categories = useMemo(() => {
    if (!posts) return [];
    const set = new Set(posts.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [posts]);

  const visible = useMemo(() => {
    if (!posts) return [];
    if (activeCategory === "all") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <PageShell
      eyebrow="The Journal"
      title="Let's Go Deeper."
      intro="Sacred writing on energy, frequency, vibration, awakening, numerology, and the practices that change everything."
    >
      {error ? (
        <p className="text-center text-sm text-muted-foreground">{error}</p>
      ) : posts === null ? (
        <div className="flex justify-center py-16">
          <BrandLoader size={56} />
        </div>
      ) : posts.length === 0 ? (
        <p className="text-center text-sm" style={{ color: "rgba(245,240,232,0.65)" }}>
          The Journal is being prepared. New writing soon.
        </p>
      ) : (
        <>
          {categories.length > 2 && (
            <div className="mb-14 flex flex-wrap justify-center gap-2">
              {categories.map((c) => {
                const active = c === activeCategory;
                return (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className="border px-4 py-2 text-[11px] font-light uppercase tracking-[0.22em] transition-colors"
                    style={{
                      borderColor: active ? "#C9A84C" : "rgba(201,168,76,0.25)",
                      color: active ? "#0A0A0A" : "#F5F0E8",
                      backgroundColor: active ? "#C9A84C" : "transparent",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          )}

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </PageShell>
  );
}

function PostCard({ post }: { post: BlogPostCard }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group block border p-8 transition-colors"
      style={{
        borderColor: "rgba(201,168,76,0.18)",
        backgroundColor: "#1A1209",
        borderRadius: "0.25rem",
      }}
    >
      <p
        className="text-[10px] font-light uppercase tracking-[0.28em]"
        style={{ color: "#C9A84C" }}
      >
        {post.category} · {post.reading_time_minutes} min
      </p>
      <h2
        className="mt-5 font-serif text-2xl font-light leading-snug transition-opacity group-hover:opacity-80 md:text-[28px]"
        style={{ color: "#F5F0E8" }}
      >
        {post.title}
      </h2>
      {post.excerpt && (
        <p
          className="mt-5 text-sm font-light leading-relaxed"
          style={{ color: "rgba(245,240,232,0.72)" }}
        >
          {post.excerpt}
        </p>
      )}
      <p
        className="mt-7 text-[10px] font-light uppercase tracking-[0.28em]"
        style={{ color: "rgba(245,240,232,0.45)" }}
      >
        {formatPublishedDate(post.published_at)}
      </p>
    </Link>
  );
}
