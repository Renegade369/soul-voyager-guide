import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://soul-true.com";
const FROM_ADDRESS = "Soul True Journal <notify@soul-true.com>";

function admin() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  hook: string | null;
  reading_time_minutes: number | null;
  published_at: string | null;
};

type Subscriber = {
  id: string;
  email: string;
  first_name: string | null;
  unsubscribe_token: string;
};

function renderHtml(post: Post, sub: Subscriber): string {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const unsubUrl = `${SITE_URL}/unsubscribe?token=${encodeURIComponent(sub.unsubscribe_token)}`;
  const greeting = sub.first_name ? `Hi ${escapeHtml(sub.first_name)},` : "Hello,";
  return `<!doctype html><html><body style="margin:0;padding:0;background:#ffffff;font-family:Georgia,'Cormorant Garamond',serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff;">
    <tr><td align="center" style="padding:40px 20px;">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;">
        <tr><td style="text-align:center;padding-bottom:24px;">
          <p style="margin:0;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#C9A84C;font-family:Arial,sans-serif;">Soul True · Let's Go Deeper.</p>
        </td></tr>
        <tr><td style="padding:0 8px;">
          <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:14px;color:#444;">${greeting}</p>
          <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-weight:300;font-size:30px;line-height:1.2;color:#0A0A0A;">${escapeHtml(post.title)}</h1>
          ${post.excerpt ? `<p style="margin:0 0 24px;font-family:Georgia,serif;font-size:17px;line-height:1.6;color:#333;">${escapeHtml(post.excerpt)}</p>` : ""}
          ${post.hook ? `<p style="margin:0 0 24px;font-family:Georgia,serif;font-style:italic;font-size:17px;line-height:1.6;color:#5a4a1a;border-left:2px solid #C9A84C;padding-left:16px;">${escapeHtml(post.hook)}</p>` : ""}
          <p style="margin:32px 0;text-align:center;">
            <a href="${url}" style="display:inline-block;background:#C9A84C;color:#0A0A0A;text-decoration:none;padding:14px 28px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;">Read the full post</a>
          </p>
          <p style="margin:0 0 32px;text-align:center;font-family:Arial,sans-serif;font-size:12px;">
            <a href="${SITE_URL}/blog" style="color:#C9A84C;text-decoration:none;letter-spacing:0.22em;text-transform:uppercase;">View all posts →</a>
          </p>
        </td></tr>
        <tr><td style="border-top:1px solid #eee;padding:24px 8px 0;text-align:center;font-family:Arial,sans-serif;font-size:11px;line-height:1.6;color:#888;">
          <p style="margin:0 0 8px;"><em>Soul True — Field notes for the awakening mind.</em></p>
          <p style="margin:0 0 8px;">You're receiving this because you signed up for one of our services.</p>
          <p style="margin:0;"><a href="${unsubUrl}" style="color:#888;text-decoration:underline;">Unsubscribe</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

async function sendOne(opts: { to: string; subject: string; html: string }): Promise<{ id?: string; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { error: "RESEND_API_KEY missing" };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ from: FROM_ADDRESS, to: opts.to, subject: opts.subject, html: opts.html }),
  });
  if (!res.ok) {
    const text = await res.text();
    return { error: `${res.status} ${text}` };
  }
  const json = (await res.json()) as { id?: string };
  return { id: json.id };
}

export const Route = createFileRoute("/api/public/hooks/send-monthly-journal")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabase = admin();

        let postSlug: string | undefined;
        try {
          const body = (await request.json().catch(() => ({}))) as { slug?: string };
          postSlug = body?.slug;
        } catch {
          /* empty body is fine */
        }

        // Pick post: explicit slug or most recent published
        const baseQuery = supabase
          .from("blog_posts")
          .select("id, slug, title, excerpt, hook, reading_time_minutes, published_at")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(1);

        const { data: posts, error: pErr } = postSlug
          ? await supabase
              .from("blog_posts")
              .select("id, slug, title, excerpt, hook, reading_time_minutes, published_at")
              .eq("slug", postSlug)
              .limit(1)
          : await baseQuery;

        if (pErr || !posts || posts.length === 0) {
          return Response.json({ ok: false, error: pErr?.message ?? "no_post" }, { status: 404 });
        }
        const post = posts[0] as Post;

        const { data: subs, error: sErr } = await supabase
          .from("subscribers")
          .select("id, email, first_name, unsubscribe_token")
          .eq("is_active", true);

        if (sErr) return Response.json({ ok: false, error: sErr.message }, { status: 500 });
        const subscribers = (subs ?? []) as Subscriber[];

        const subject = `Let's Go Deeper. — ${post.title}`;
        let sent = 0;
        let failed = 0;
        const logRows: Array<Record<string, unknown>> = [];

        for (const sub of subscribers) {
          const html = renderHtml(post, sub);
          const result = await sendOne({ to: sub.email, subject, html });
          if (result.error) {
            failed++;
            logRows.push({
              subscriber_id: sub.id,
              email: sub.email,
              post_id: post.id,
              post_slug: post.slug,
              status: "failed",
              error: result.error.slice(0, 500),
            });
          } else {
            sent++;
            logRows.push({
              subscriber_id: sub.id,
              email: sub.email,
              post_id: post.id,
              post_slug: post.slug,
              status: "sent",
              resend_id: result.id ?? null,
            });
          }
          // gentle pacing to stay within rate limits
          await new Promise((r) => setTimeout(r, 60));
        }

        if (logRows.length > 0) {
          await supabase.from("journal_email_sends").insert(logRows);
        }

        return Response.json({
          ok: true,
          post: { slug: post.slug, title: post.title },
          subscribers: subscribers.length,
          sent,
          failed,
        });
      },
    },
  },
});
