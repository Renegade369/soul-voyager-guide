import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/teachings", label: "Teachings" },
  { to: "/events", label: "Events" },
  { to: "/visit", label: "Visit" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(28,27,58,0.95)", borderBottom: "1px solid rgba(212,175,100,0.18)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" aria-label="Sacred Journey home" style={{ color: "#D4AF64" }}>
          <span className="font-serif text-2xl font-normal tracking-tight">Sacred Journey</span>
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[11px] font-normal uppercase tracking-[0.22em] transition-colors"
              style={{ color: "rgba(248,245,240,0.6)" }}
              activeProps={{ style: { color: "#F8F5F0" } }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/discovery"
            className="rounded-none px-5 py-2.5 text-[11px] font-normal uppercase tracking-[0.22em] transition"
            style={{ color: "#D4AF64", border: "1px solid #D4AF64" }}
          >
            Begin Here
          </Link>
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <CartDrawer />
          <button
            aria-label="Toggle menu"
            style={{ color: "#F8F5F0" }}
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className="hidden md:block">
          <CartDrawer />
        </div>
      </div>
      {open && (
        <div className="md:hidden" style={{ backgroundColor: "#1C1B3A", borderTop: "1px solid rgba(212,175,100,0.18)" }}>
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "rgba(248,245,240,0.7)" }}
                activeProps={{ style: { color: "#F8F5F0" } }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/discovery"
              onClick={() => setOpen(false)}
              className="mt-3 px-5 py-3 text-center text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "#D4AF64", border: "1px solid #D4AF64" }}
            >
              Begin Here
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
