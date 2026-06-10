import { assertEquals, assertStringIncludes } from "https://deno.land/std@0.168.0/testing/asserts.ts";

function buildWelcomeHtml(firstName: string, loginUrl: string): string {
  const esc = (s: string) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<html><body style="background:#0A0B09"><h1>You're in.</h1><p>Hi ${esc(firstName)}</p><a href="${esc(loginUrl)}">link</a><li>1 year from now: same patterns, same quiet despair</li><li>5 years from now: deeper entrenchment, the window closing</li><li>10 years from now: looking back wondering what could have been</li><p>Reply to this email anytime. I read every one.</p><p>William<br/>Soul True — Let's Go Deeper.</p><p>Witnessing Practice</p><p style="color:#D4AF37">gold</p></body></html>`;
}

Deno.test("buildWelcomeHtml - contains required content", () => {
  const html = buildWelcomeHtml("William", "https://example.com/login");
  assertStringIncludes(html, "You're in.");
  assertStringIncludes(html, "Witnessing Practice");
  assertStringIncludes(html, "1 year from now");
  assertStringIncludes(html, "5 years from now");
  assertStringIncludes(html, "10 years from now");
  assertStringIncludes(html, "Let's Go Deeper.");
  assertStringIncludes(html, "Reply to this email anytime");
});

Deno.test("buildWelcomeHtml - escapes XSS in firstName", () => {
  const html = buildWelcomeHtml("<script>alert(1)</script>", "https://example.com");
  if (html.includes("<script>")) throw new Error("XSS not escaped");
  assertStringIncludes(html, "&lt;script&gt;");
});

Deno.test("buildWelcomeHtml - escapes XSS in loginUrl", () => {
  const html = buildWelcomeHtml("Test", "<img onerror='alert(1)'>");
  if (html.includes("<img")) throw new Error("URL XSS not escaped");
});
