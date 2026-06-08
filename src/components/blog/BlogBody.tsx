export function BlogBody({ body }: { body: string }) {
  const blocks = body.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="mx-auto max-w-[680px] space-y-7">
      {blocks.map((block, i) => {
        if (block.startsWith(">")) {
          const quote = block.replace(/^>\s?/gm, "").trim();
          return (
            <blockquote
              key={i}
              className="my-10 border-l-2 pl-6 font-serif text-2xl font-light italic leading-snug md:text-3xl"
              style={{ borderColor: "#C9A84C", color: "#F5F0E8" }}
            >
              {quote.replace(/^"|"$/g, "")}
            </blockquote>
          );
        }
        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="mt-12 font-serif text-3xl font-light" style={{ color: "#F5F0E8" }}>
              {block.slice(4)}
            </h3>
          );
        }
        return (
          <p
            key={i}
            className="text-[17px] font-light leading-[1.85] md:text-[18px]"
            style={{ color: "rgba(245,240,232,0.85)" }}
          >
            {block}
          </p>
        );
      })}
    </div>
  );
}
