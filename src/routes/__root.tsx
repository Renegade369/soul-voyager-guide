import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { useCartSync } from "../hooks/useCartSync";
import { PwaInstallPrompt } from "../components/PwaInstallPrompt";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Soul True — Holistic Wellness & Spiritual Guidance" },
      { name: "description", content: "A sanctuary for holistic wellness, sacred teachings, and the remembrance of who you truly are. For educational and inspirational purposes." },
      { property: "og:title", content: "Soul True — Holistic Wellness & Spiritual Guidance" },
      { property: "og:description", content: "A sanctuary for holistic wellness, sacred teachings, and the remembrance of who you truly are. For educational and inspirational purposes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { rel: "preconnect", content: "" },
      { name: "twitter:title", content: "Soul True — Holistic Wellness & Spiritual Guidance" },
      { name: "twitter:description", content: "A sanctuary for holistic wellness, sacred teachings, and the remembrance of who you truly are. For educational and inspirational purposes." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/62d98259-29c8-42bc-a035-99775a6111cd/id-preview-488d0e7d--6b1d5b22-48bd-4874-861e-25c7727c1da0.lovable.app-1777590049998.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/62d98259-29c8-42bc-a035-99775a6111cd/id-preview-488d0e7d--6b1d5b22-48bd-4874-861e-25c7727c1da0.lovable.app-1777590049998.png" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Soul True" },
      { name: "theme-color", content: "#0D0F0E" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useCartSync();
  const location = useLocation();
  const appRoutes = ["/guide", "/dashboard", "/admin", "/welcome"];
  const hideShell = appRoutes.some(r => location.pathname === r || location.pathname.startsWith(r + "/"));

  // Register service worker (only in production, never in iframes/preview)
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const isInIframe = (() => {
      try { return window.self !== window.top; } catch { return true; }
    })();

    const isPreviewHost =
      window.location.hostname.includes("id-preview--") ||
      window.location.hostname.includes("lovableproject.com") ||
      window.location.hostname.includes("lovableproject-dev.com") ||
      window.location.hostname.includes("preview--");

    if (isPreviewHost || isInIframe) {
      // Unregister any existing SW in preview contexts
      navigator.serviceWorker.getRegistrations().then((regs) =>
        regs.forEach((r) => r.unregister())
      );
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch((err) =>
      console.warn("SW registration failed:", err)
    );
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {!hideShell && <SiteHeader />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideShell && <SiteFooter />}
      <Toaster position="top-center" richColors closeButton />
      <PwaInstallPrompt />
    </div>
  );
}
