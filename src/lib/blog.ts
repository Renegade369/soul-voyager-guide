import { supabase } from "@/integrations/supabase/client";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string | null;
  hook: string | null;
  body: string;
  hero_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  reading_time_minutes: number;
  primary_reader: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
};

export type BlogPostCard = Omit<BlogPost, "body">;

export async function fetchPublishedPosts(): Promise<BlogPostCard[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id,slug,title,category,excerpt,hook,hero_image_url,meta_title,meta_description,reading_time_minutes,primary_reader,status,published_at,created_at"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPostCard[];
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return (data as BlogPost | null) ?? null;
}

export async function fetchRelatedPosts(
  category: string,
  excludeSlug: string,
  limit = 3
): Promise<BlogPostCard[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id,slug,title,category,excerpt,hook,hero_image_url,meta_title,meta_description,reading_time_minutes,primary_reader,status,published_at,created_at"
    )
    .eq("status", "published")
    .eq("category", category)
    .neq("slug", excludeSlug)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  let posts = (data ?? []) as BlogPostCard[];
  if (posts.length < limit) {
    const { data: extras } = await supabase
      .from("blog_posts")
      .select(
        "id,slug,title,category,excerpt,hook,hero_image_url,meta_title,meta_description,reading_time_minutes,primary_reader,status,published_at,created_at"
      )
      .eq("status", "published")
      .neq("slug", excludeSlug)
      .neq("category", category)
      .order("published_at", { ascending: false })
      .limit(limit - posts.length);
    posts = [...posts, ...((extras ?? []) as BlogPostCard[])];
  }
  return posts;
}

export function formatPublishedDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
