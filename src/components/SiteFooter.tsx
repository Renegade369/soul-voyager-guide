import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-3 md:px-12">
        <div>
          <h3 className="font-serif text-2xl font-normal text-foreground">Sacred Journey</h3>
          <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
            A sanctuary for holistic wellness and the quiet unfolding of remembrance.
          </p>
        </div>
        <div>
          <h4 className="text-[11px] font-normal uppercase tracking-[0.22em] text-foreground/60">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm font-light text-foreground/80">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/teachings" className="hover:text-foreground">Teachings</Link></li>
            <li><Link to="/events" className="hover:text-foreground">Events</Link></li>
            <li><Link to="/visit" className="hover:text-foreground">Visit</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-normal uppercase tracking-[0.22em] text-foreground/60">Visit</h4>
          <p className="mt-5 text-sm font-light leading-relaxed text-foreground/80">
            Open Tue – Sun<br />
            9am – 7pm
          </p>
          <Link to="/visit" className="mt-5 inline-block text-sm font-light text-foreground underline-offset-4 hover:underline">
            Plan your visit →
          </Link>
        </div>
      </div>
      <div className="border-t border-border py-8 text-center">
        <p className="text-[11px] font-light uppercase tracking-[0.18em] text-muted-foreground">
          © {new Date().getFullYear()} Sacred Journey
        </p>
      </div>
    </footer>
  );
}
