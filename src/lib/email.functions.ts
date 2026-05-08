import { createServerFn } from "@tanstack/react-start";

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = createServerFn({ method: "POST" })
  .inputValidator((input: SendEmailInput) => {
    if (!input.to || !input.subject || !input.html) {
      throw new Error("Missing required email fields");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.to)) {
      throw new Error("Invalid email address");
    }
    return input;
  })
  .handler(async ({ data }) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Soul True <noreply@soul-true.com>",
        to: [data.to],
        subject: data.subject,
        html: data.html,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: "Unknown error" }));
      console.error("Resend API error:", response.status, err);
      throw new Error(`Email send failed: ${response.status}`);
    }

    return { ok: true };
  });
