import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { ThemeToggle } from "./aesthetic/ThemeToggle";
import soulTrueLogoAsset from "@/assets/soul-true-logo-tagline.png.asset.json";
const soulTrueLogo = soulTrueLogoAsset.url;
import { useAuth } from "@/hooks/useAuth";

// Primary top-level nav (locked order — June 2026 update)
const primary = [
  { to: "/", label: "Home", exact: true },
  { to: "/wisdom", label: "Wisdom" },
  { to: "/readings", label: "Readings" },
  { to: "/meditations", label: "Meditations" },
  { to: "/the-sacred-journey", label: "Journey" },
] as const;

// Explore dropdown
const exploreLinks = [
  { to: "/sovereign", label: "The Sovereignty Code" },
  { to: "/blog", label: "The Journal" },
  { to: "/store", label: "The Store" },
  { to: "/book-session", label: "Sit With William" },
  { to: "/meet-william", label: "About William" },
] as const;

const navLinkStyle = { color: "rgba(245,240,232,0.78)" };
const navLinkBase =
  "relative pb-1 text-[11px] font-normal uppercase tracking-[0.22em] transition-colors hover:text-[#F5F0E8]";

export function SiteHeader() {
  const [open, setOpen] = useState(false); // mobile drawer
  const [exploreOpen, setExploreOpen] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Close Explore dropdown on outside click or Escape
  useEffect(() => {
    if (!exploreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setExploreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExploreOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [exploreOpen]);

  const isActive = (to: string, exact = false) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  const exploreActive = exploreLinks.some((l) => isActive(l.to));

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        backgroundColor: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201,168,76,0.18)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" aria-label="Soul True — Let's Go Deeper. — home" className="flex items-center">
          <img src={soulTrueLogo} alt="Soul True — Let's Go Deeper." className="h-10 w-auto lg:h-12" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {primary.map((item) => {
            const active = isActive(item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={navLinkBase}
                style={{
                  ...navLinkStyle,
                  color: active ? "#F5F0E8" : navLinkStyle.color,
                  borderBottom: active ? "2px solid #C9A84C" : "2px solid transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Explore dropdown — click-based */}
          <div className="relative" ref={exploreRef}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={exploreOpen}
              onClick={() => setExploreOpen((s) => !s)}
              className={`${navLinkBase} flex items-center gap-1`}
              style={{
                ...navLinkStyle,
                color: exploreActive || exploreOpen ? "#F5F0E8" : navLinkStyle.color,
                borderBottom: exploreActive ? "2px solid #C9A84C" : "2px solid transparent",
              }}
            >
              Explore <ChevronDown size={12} style={{ transform: exploreOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>
            {exploreOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-3 flex w-60 flex-col"
                style={{
                  backgroundColor: "#1A1209",
                  border: "1px solid rgba(201,168,76,0.2)",
                  boxShadow: "0 18px 40px -16px rgba(0,0,0,0.7)",
                }}
              >
                {exploreLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    role="menuitem"
                    onClick={() => setExploreOpen(false)}
                    className="px-5 py-3 text-[11px] uppercase tracking-[0.22em] transition-all"
                    style={{
                      color: "#F5F0E8",
                      borderLeft: "2px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderLeft = "2px solid #C9A84C";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,168,76,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderLeft = "2px solid transparent";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/begin-here"
            className="rounded-none px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] transition hover:shadow-[0_0_18px_rgba(232,130,26,0.5)]"
            style={{ color: "#0A0A0A", background: "linear-gradient(135deg,#C9A84C,#D4A017)", border: "1px solid #C9A84C" }}
          >
            Begin Here
          </Link>

          {user ? (
            <Link to="/my-readings" className={navLinkBase} style={navLinkStyle}>My Readings</Link>
          ) : (
            <Link to="/sign-in" className={navLinkBase} style={navLinkStyle}>Sign In</Link>
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
            {primary.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-[11px] uppercase tracking-[0.22em]"
                style={{
                  ...navLinkStyle,
                  color: isActive(item.to, item.exact) ? "#C9A84C" : navLinkStyle.color,
                }}
              >
                {item.label}
              </Link>
            ))}
            <p className="mt-3 px-2 text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>Explore</p>
            {exploreLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-[11px] uppercase tracking-[0.22em]"
                style={navLinkStyle}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/begin-here"
              onClick={() => setOpen(false)}
              className="mt-3 px-5 py-3 text-center text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "#0A0A0A", background: "linear-gradient(135deg,#C9A84C,#D4A017)", border: "1px solid #C9A84C" }}
            >
              Begin Here
            </Link>
            {user ? (
              <Link to="/my-readings" onClick={() => setOpen(false)} className="mt-2 px-2 py-3 text-[11px] uppercase tracking-[0.22em]" style={navLinkStyle}>My Readings</Link>
            ) : (
              <Link to="/sign-in" onClick={() => setOpen(false)} className="mt-2 px-2 py-3 text-[11px] uppercase tracking-[0.22em]" style={navLinkStyle}>Sign In</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
