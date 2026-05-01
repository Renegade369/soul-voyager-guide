import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:px-10">
        <div className="max-w-md">
          <h3 className="font-serif text-3xl text-foreground">Sacred Journey</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A sanctuary for holistic wellness, remembrance, and the unfolding
            of life's quieter truths.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm">
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/60">Explore</h4>
            <ul className="mt-5 space-y-3 text-foreground/80">
              <li><Link to="/services" className="hover:text-primary">Services</Link></li>
              <li><Link to="/teachings" className="hover:text-primary">Teachings</Link></li>
              <li><Link to="/events" className="hover:text-primary">Events</Link></li>
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/60">Visit</h4>
            <p className="mt-5 leading-relaxed text-foreground/80">
              Open Tue–Sun<br />
              9am – 7pm
            </p>
            <Link to="/visit" className="mt-4 inline-block text-primary hover:underline">
              Plan your visit →
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-8 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sacred Journey. All paths welcome.
        </p>
      </div>
    </footer>
  );
}
