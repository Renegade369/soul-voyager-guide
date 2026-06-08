import { Link } from "@tanstack/react-router";

export function GoDeeperBlock() {
  return (
    <section className="mx-auto mt-24 max-w-[680px]">
      <div
        className="relative overflow-hidden border px-8 py-14 md:px-14 md:py-16"
        style={{ backgroundColor: "#1A1209", borderColor: "rgba(201,168,76,0.25)" }}
      >
        <p
          className="text-[11px] font-light uppercase tracking-[0.28em]"
          style={{ color: "#C9A84C" }}
        >
          The Invitation
        </p>
        <h2
          className="mt-5 font-serif text-4xl font-light italic leading-[1.05] md:text-5xl"
          style={{ color: "#F5F0E8" }}
        >
          Let's Go Deeper.
        </h2>
        <p
          className="mt-6 text-[17px] font-light leading-[1.8]"
          style={{ color: "rgba(245,240,232,0.82)" }}
        >
          Ready to do this work in community? The Soul True Membership opens the door — $36/month,
          full access to the Sovereignty Code, daily transmissions, monthly wisdom drops, and the
          kind of energetic support that compounds over time. Sit with William 1-on-1 for a focused
          session on your specific field. Or go deeper with Kim Alfano at Higher Vibes, a coach in
          our extended circle who holds extraordinary space. Every doorway is here.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/sovereign"
            className="inline-flex items-center justify-center px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] transition-shadow"
            style={{
              backgroundColor: "#C9A84C",
              color: "#0A0A0A",
              borderRadius: "0.25rem",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 30px rgba(232,130,26,0.5)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            Join the Membership
          </Link>
          <Link
            to="/book-session"
            className="inline-flex items-center justify-center border px-7 py-3 text-[11px] font-light uppercase tracking-[0.22em]"
            style={{
              borderColor: "rgba(201,168,76,0.5)",
              color: "#F5F0E8",
              borderRadius: "0.25rem",
            }}
          >
            Sit with William
          </Link>
          <Link
            to="/kim-alfano"
            className="inline-flex items-center justify-center border px-7 py-3 text-[11px] font-light uppercase tracking-[0.22em]"
            style={{
              borderColor: "rgba(201,168,76,0.5)",
              color: "#F5F0E8",
              borderRadius: "0.25rem",
            }}
          >
            Higher Vibes with Kim
          </Link>
        </div>
        <p
          className="mt-10 text-[12px] font-light italic leading-relaxed"
          style={{ color: "rgba(245,240,232,0.5)" }}
        >
          Disclaimer: Soul True transmissions and sessions are educational and spiritual in nature.
          They are not a substitute for medical, psychological, or financial advice.
        </p>
      </div>
    </section>
  );
}
