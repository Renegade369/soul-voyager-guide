import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-2xl text-foreground">Sacred Journey</h3>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A sanctuary for holistic wellness, remembrance, and the unveiling of life's hidden truths.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/teachings" className="hover:text-primary">Teachings</Link></li>
            <li><Link to="/events" className="hover:text-primary">Events</Link></li>
            <li><Link to="/practitioners" className="hover:text-primary">Practitioners</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Visit</h4>
          <p className="mt-3 text-sm text-muted-foreground">
            Open Tue–Sun · 9am–7pm<br />
            <Link to="/visit" className="hover:text-primary">Find us & book a session →</Link>
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sacred Journey. All paths welcome.
      </div>
    </footer>
  );
}
