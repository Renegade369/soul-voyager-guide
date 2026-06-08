import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BrandLoader } from "@/components/BrandLoader";
import { BlogBody } from "@/components/blog/BlogBody";
import { GoDeeperBlock } from "@/components/blog/GoDeeperBlock";
import { JournalSpotlights } from "@/components/blog/JournalSpotlights";
import {
  fetchPostBySlug,
  fetchRelatedPosts,
  formatPublishedDate,
  type BlogPost,
  type BlogPostCard,
} from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ loaderData }) => {
    const p = loaderData as BlogPost | undefined;
    if (!p) {
      return {
        meta: [
          { title: "Post — Soul True" },
          { name: "description", content: "Sacred writing from Soul True." },
        ],
      };
    }
    const title = p.meta_title ?? `${p.title} | Soul True`;
    const description = p.meta_description ?? p.excerpt ?? "Sacred writing from Soul True.";
    const meta: Array<Record<string, string>> = [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ];
    if (p.hero_image_url) {
      meta.push({ property: "og:image", content: p.hero_image_url });
      meta.push({ name: "twitter:image", content: p.hero_image_url });
    }
    return { meta };
  },
  loader: async ({ params }) => {
    const post = await fetchPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: BlogPostPage,
  errorComponent: BlogError,
  notFoundComponent: BlogNotFound,
});

function BlogPostPage() {
  const post = Route.useLoaderData() as BlogPost;
  const [related, setRelated] = useState<BlogPostCard[] | null>(null);

  useEffect(() => {
    fetchRelatedPosts(post.category, post.slug, 3)
      .then(setRelated)
      .catch(() => setRelated([]));
  }, [post.category, post.slug]);

  return (
    <article style={{ backgroundColor: "#0A0A0A" }}>
      {/* Hero */}
      <header className="relative isolate overflow-hidden" style={{ backgroundColor: "#141716" }}>
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
          <p
            className="text-[11px] font-light uppercase tracking-[0.28em]"
            style={{ color: "#C9A84C" }}
          >
            {post.category} · {post.reading_time_minutes} min read
          </p>
          <h1
            className="mt-8 font-serif text-4xl font-light leading-[1.05] md:text-6xl"
            style={{ color: "#F5F0E8" }}
          >
            {post.title}
          </h1>
          {post.hook && (
            <p
              className="mx-auto mt-10 max-w-2xl font-serif text-xl font-light italic leading-snug md:text-2xl"
              style={{ color: "rgba(245,240,232,0.82)" }}
            >
              {post.hook}
            </p>
          )}
          <p
            className="mt-10 text-[10px] font-light uppercase tracking-[0.28em]"
            style={{ color: "rgba(245,240,232,0.5)" }}
          >
            {formatPublishedDate(post.published_at ?? post.created_at)}
          </p>
        </div>
      </header>

      {/* Hero image */}
      {post.hero_image_url && (
        <div className="mx-auto max-w-4xl px-6 pt-12">
          <img
            src={post.hero_image_url}
            alt={post.title}
            className="aspect-[16/9] w-full object-cover"
            style={{ borderRadius: "0.25rem" }}
          />
        </div>
      )}

      {/* Body */}
      <div className="px-6 pb-20 pt-16 md:pt-24">
        <BlogBody body={post.body} />
        <JournalSpotlights postId={post.id} />
        <GoDeeperBlock />
      </div>

      {/* Related */}
      {related && related.length > 0 && (
        <section className="border-t px-6 py-20" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
          <div className="mx-auto max-w-5xl">
            <p
              className="text-[11px] font-light uppercase tracking-[0.28em]"
              style={{ color: "#C9A84C" }}
            >
              Keep Reading
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group block border p-6 transition-colors"
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
                    {r.category} · {r.reading_time_minutes} min
                  </p>
                  <h3
                    className="mt-4 font-serif text-xl font-light leading-snug group-hover:opacity-80"
                    style={{ color: "#F5F0E8" }}
                  >
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center justify-center border px-7 py-3 text-[11px] font-light uppercase tracking-[0.22em]"
                style={{
                  borderColor: "rgba(201,168,76,0.5)",
                  color: "#F5F0E8",
                  borderRadius: "0.25rem",
                }}
              >
                All Journal Entries
              </Link>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function BlogError({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-4xl font-light" style={{ color: "#F5F0E8" }}>
          Something went sideways.
        </h1>
        <p className="mt-4 text-sm" style={{ color: "rgba(245,240,232,0.7)" }}>
          We couldn't load this entry. Try again in a moment.
        </p>
        <button
          onClick={() => {
            reset();
            router.invalidate();
          }}
          className="mt-8 inline-flex items-center justify-center px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ backgroundColor: "#C9A84C", color: "#0A0A0A", borderRadius: "0.25rem" }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

function BlogNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p
          className="text-[11px] font-light uppercase tracking-[0.28em]"
          style={{ color: "#C9A84C" }}
        >
          Not found
        </p>
        <h1 className="mt-6 font-serif text-4xl font-light" style={{ color: "#F5F0E8" }}>
          This entry doesn't exist.
        </h1>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center justify-center px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ backgroundColor: "#C9A84C", color: "#0A0A0A", borderRadius: "0.25rem" }}
        >
          Back to the Journal
        </Link>
      </div>
    </div>
  );
}
