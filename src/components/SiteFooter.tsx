import { Link } from "@tanstack/react-router";
import soulTrueLogo from "@/assets/soul-true-logo.png";

export function SiteFooter() {
  const linkStyle = { color: "rgba(245,240,232,0.35)" };
  const labelStyle = { color: "rgba(212,175,100,0.7)" };
  return (
    <footer className="mt-32" style={{ backgroundColor: "#0D0F0E" }}>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-3 md:px-12">
        <div>
          <h3 className="font-serif text-2xl font-normal" style={{ color: "#C9A84C" }}>Soul True</h3>
          <p className="mt-5 max-w-xs text-sm font-light leading-relaxed" style={linkStyle}>
            A sanctuary for holistic wellness and the quiet unfolding of remembrance.
          </p>
        </div>
        <div>
          <h4 className="text-[11px] font-normal uppercase tracking-[0.22em]" style={labelStyle}>Explore</h4>
          <ul className="mt-5 space-y-3 text-sm font-light">
            <li><Link to="/about" style={linkStyle}>About</Link></li>
            <li><Link to="/services" style={linkStyle}>Services</Link></li>
            <li><Link to="/teachings" style={linkStyle}>Teachings</Link></li>
            <li><Link to="/events" style={linkStyle}>Events</Link></li>
            <li><Link to="/visit" style={linkStyle}>Visit</Link></li>
            <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-normal uppercase tracking-[0.22em]" style={labelStyle}>Visit</h4>
          <p className="mt-5 text-sm font-light leading-relaxed" style={linkStyle}>
            Coming Soon — South Florida
          </p>
          <Link to="/visit" className="mt-5 inline-block text-sm font-light underline-offset-4 hover:underline" style={linkStyle}>
            Plan your visit →
          </Link>
        </div>
      </div>
      <div className="py-8 text-center" style={{ borderTop: "1px solid rgba(212,175,100,0.15)" }}>
        <p className="text-[11px] font-light uppercase tracking-[0.18em]" style={linkStyle}>
          © {new Date().getFullYear()} Soul True
        </p>
      </div>
    </footer>
  );
}
