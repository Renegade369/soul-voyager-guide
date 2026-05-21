export function DispenzaPromoCallout() {
  return (
    <aside
      className="mt-10 rounded-none p-7 md:p-8"
      style={{
        background: "linear-gradient(135deg, rgba(201,168,76,0.10), rgba(232,130,26,0.06))",
        border: "1px solid rgba(201,168,76,0.55)",
        boxShadow: "0 0 32px rgba(232,130,26,0.18), inset 0 0 24px rgba(201,168,76,0.06)",
        fontFamily: '"Outfit", sans-serif',
      }}
    >
      <p
        className="text-[10px] uppercase tracking-[0.32em]"
        style={{ color: "#C9A84C" }}
      >
        🎁 Exclusive Discount
      </p>
      <p
        className="mt-4 text-base leading-relaxed md:text-lg"
        style={{ color: "#F5F0E8" }}
      >
        New customers receive{" "}
        <strong style={{ color: "#C9A84C" }}>20% off</strong> their first digital
        meditation or online course at{" "}
        <a
          href="https://drjoedispenza.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:underline"
          style={{ color: "#C9A84C" }}
        >
          DrJoeDispenza.com
        </a>{" "}
        using code{" "}
        <span
          className="mx-1 inline-block rounded-none px-3 py-1 align-middle text-sm font-bold tracking-[0.18em]"
          style={{
            color: "#0A0B09",
            background: "linear-gradient(135deg, #C9A84C, #D4A017)",
            border: "1px solid #C9A84C",
            boxShadow: "0 0 14px rgba(232,130,26,0.45)",
          }}
        >
          WELCOME20
        </span>{" "}
        at checkout.
      </p>
    </aside>
  );
}
