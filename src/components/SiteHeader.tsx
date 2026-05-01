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
    <header className="sticky top-0 z-40 border-b border-border bg-background/92 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" className="text-foreground" aria-label="Sacred Journey home">
          <span className="font-serif text-2xl font-normal tracking-tight">Sacred Journey</span>
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[11px] font-normal uppercase tracking-[0.22em] text-foreground/65 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/discovery"
            className="rounded-none border border-foreground px-5 py-2.5 text-[11px] font-normal uppercase tracking-[0.22em] text-foreground transition hover:bg-foreground hover:text-background"
          >
            Begin Here
          </Link>
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <CartDrawer />
          <button
            aria-label="Toggle menu"
            className="text-foreground"
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
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-[11px] uppercase tracking-[0.22em] text-foreground/70 hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/discovery"
              onClick={() => setOpen(false)}
              className="mt-3 border border-foreground px-5 py-3 text-center text-[11px] uppercase tracking-[0.22em] text-foreground"
            >
              Begin Here
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
