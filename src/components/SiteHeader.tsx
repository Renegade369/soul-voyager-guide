import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { ThemeToggle } from "./aesthetic/ThemeToggle";
import soulTrueLogo from "@/assets/soul-true-logo.png";
import { useAuth } from "@/hooks/useAuth";

const wisdomLinks = [
  { to: "/wisdom/origins", label: "Origins" },
  { to: "/wisdom/matrix-origins", label: "Matrix Origins" },
  { to: "/wisdom/suppressed-sacred-texts", label: "Suppressed Sacred Texts" },
  { to: "/wisdom/the-true-story-of-jeshua", label: "True Story of Jeshua" },
  { to: "/teachings", label: "The Codex" },
] as const;

const readingsLinks = [
  { to: "/aura-reader", label: "Aura Reader" },
  { to: "/blood-type", label: "Blood Type" },
  { to: "/soul-quiz", label: "Soul Quiz" },
  { to: "/birth-chart", label: "Birth Chart" },
  { to: "/numerology", label: "Numerology" },
  { to: "/astrology", label: "Astrology" },
] as const;

const primary = [
  { to: "/", label: "Home", exact: true },
  { to: "/meditations", label: "Meditations" },
  { to: "/the-sacred-journey", label: "Journey" },
  { to: "/store", label: "Store" },
] as const;

const navLinkStyle = { color: "rgba(245,240,232,0.7)" };
const navLinkClass =
  "text-[11px] font-normal uppercase tracking-[0.22em] transition-colors hover:text-[#F5F0E8]";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(10,10,10,0.95)", borderBottom: "1px solid rgba(201,168,76,0.18)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" aria-label="Soul True home" className="flex items-center">
          <img src={soulTrueLogo} alt="Soul True" className="h-9 w-auto lg:h-12" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {/* Home */}
          <Link to="/" className={navLinkClass} style={navLinkStyle} activeOptions={{ exact: true }} activeProps={{ style: { color: "#C9A84C" } }}>
            Home
          </Link>

          {/* Wisdom dropdown */}
          <div className="group relative">
            <button className={`${navLinkClass} flex items-center gap-1`} style={navLinkStyle}>
              Wisdom <ChevronDown size={12} />
            </button>
            <div
              className="invisible absolute left-1/2 top-full z-50 mt-3 flex w-60 -translate-x-1/2 flex-col opacity-0 transition-all group-hover:visible group-hover:opacity-100"
              style={{ backgroundColor: "#0A0A0A", border: "1px solid rgba(201,168,76,0.25)" }}
            >
              {wisdomLinks.map((r) => (
                <Link key={r.to + r.label} to={r.to} className="px-5 py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-[#1A1209]" style={{ color: "rgba(245,240,232,0.75)" }}>
                  {r.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Readings dropdown */}
          <div className="group relative">
            <Link to="/readings" className={`${navLinkClass} flex items-center gap-1`} style={navLinkStyle} activeProps={{ style: { color: "#C9A84C" } }}>
              Readings <ChevronDown size={12} />
            </Link>
            <div
              className="invisible absolute left-1/2 top-full z-50 mt-3 flex w-60 -translate-x-1/2 flex-col opacity-0 transition-all group-hover:visible group-hover:opacity-100"
              style={{ backgroundColor: "#0A0A0A", border: "1px solid rgba(201,168,76,0.25)" }}
            >
              {readingsLinks.map((r) => (
                <Link
                  key={r.label}
                  to={r.to}
                  className="px-5 py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-[#1A1209]"
                  style={{ color: "rgba(245,240,232,0.75)" }}
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/meditations" className={navLinkClass} style={navLinkStyle} activeProps={{ style: { color: "#C9A84C" } }}>
            Meditations
          </Link>
          <Link to="/the-sacred-journey" className={navLinkClass} style={navLinkStyle} activeProps={{ style: { color: "#C9A84C" } }}>
            Journey
          </Link>
          <Link to="/store" className={navLinkClass} style={navLinkStyle} activeProps={{ style: { color: "#C9A84C" } }}>
            Store
          </Link>
          <Link to="/higher-vibes" className={navLinkClass} style={navLinkStyle} activeProps={{ style: { color: "#C9A84C" } }}>
            Higher Vibes
          </Link>

          <Link
            to="/begin-here"
            className="rounded-none px-5 py-2.5 text-[11px] font-normal uppercase tracking-[0.22em] transition hover:shadow-[0_0_18px_rgba(232,130,26,0.45)]"
            style={{ color: "#0A0A0A", background: "linear-gradient(135deg,#C9A84C,#D4A017)", border: "1px solid #C9A84C" }}
          >
            Begin Here
          </Link>

          {user ? (
            <Link to="/my-readings" className={navLinkClass} style={navLinkStyle}>My Readings</Link>
          ) : (
            <Link to="/sign-in" className={navLinkClass} style={navLinkStyle}>Sign In</Link>
          )}
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <CartDrawer />
          <button aria-label="Toggle menu" aria-expanded={open} style={{ color: "#F5F0E8" }} onClick={() => setOpen((s) => !s)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <CartDrawer />
        </div>
      </div>

      {open && (
        <div className="lg:hidden" style={{ backgroundColor: "#0A0A0A", borderTop: "1px solid rgba(201,168,76,0.18)" }}>
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            <Link to="/" onClick={() => setOpen(false)} className="px-2 py-3 text-[11px] uppercase tracking-[0.22em]" style={navLinkStyle}>Home</Link>
            <p className="mt-3 px-2 text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>Wisdom</p>
            {wisdomLinks.map((r) => (
              <Link key={r.label} to={r.to} onClick={() => setOpen(false)} className="px-2 py-3 text-[11px] uppercase tracking-[0.22em]" style={navLinkStyle}>{r.label}</Link>
            ))}
            <p className="mt-3 px-2 text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>Readings</p>
            <Link to="/readings" onClick={() => setOpen(false)} className="px-2 py-3 text-[11px] uppercase tracking-[0.22em]" style={navLinkStyle}>All Readings</Link>
            {readingsLinks.map((r) => (
              <Link key={r.label} to={r.to} onClick={() => setOpen(false)} className="px-2 py-3 text-[11px] uppercase tracking-[0.22em]" style={navLinkStyle}>{r.label}</Link>
            ))}
            <Link to="/meditations" onClick={() => setOpen(false)} className="mt-3 px-2 py-3 text-[11px] uppercase tracking-[0.22em]" style={navLinkStyle}>Meditations</Link>
            <Link to="/the-sacred-journey" onClick={() => setOpen(false)} className="px-2 py-3 text-[11px] uppercase tracking-[0.22em]" style={navLinkStyle}>Journey</Link>
            <Link to="/store" onClick={() => setOpen(false)} className="px-2 py-3 text-[11px] uppercase tracking-[0.22em]" style={navLinkStyle}>Store</Link>
            <Link to="/higher-vibes" onClick={() => setOpen(false)} className="px-2 py-3 text-[11px] uppercase tracking-[0.22em]" style={navLinkStyle}>Higher Vibes</Link>
            <Link
              to="/begin-here"
              onClick={() => setOpen(false)}
              className="mt-3 px-5 py-3 text-center text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "#0A0A0A", background: "linear-gradient(135deg,#C9A84C,#D4A017)", border: "1px solid #C9A84C" }}
            >
              Begin Here
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
