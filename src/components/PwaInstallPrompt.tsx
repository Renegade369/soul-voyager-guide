import { useState, useEffect, useCallback } from "react";
import { X, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem("pwa-dismissed")) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Show prompt after 30 seconds if install is available
  useEffect(() => {
    if (!deferredPrompt || dismissed) return;

    const timer = setTimeout(() => setShow(true), 30_000);
    return () => clearTimeout(timer);
  }, [deferredPrompt, dismissed]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShow(false);
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("pwa-dismissed", "1");
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-6 left-4 right-4 z-50 mx-auto max-w-md animate-in slide-in-from-bottom-4 fade-in duration-500"
    >
      <div
        className="relative overflow-hidden rounded-2xl border shadow-2xl"
        style={{
          backgroundColor: "#1A1C1B",
          borderColor: "#2E3A35",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)",
        }}
      >
        {/* Gold accent line */}
        <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />

        <div className="p-5">
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-4 rounded-full p-1 transition-colors hover:bg-white/10"
            style={{ color: "#8A9E94" }}
          >
            <X size={16} />
          </button>

          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: "#C9A84C15" }}
            >
              <Download size={22} style={{ color: "#C9A84C" }} />
            </div>
            <div className="flex-1 pr-4">
              <h3
                className="text-sm font-medium"
                style={{ fontFamily: '"Cormorant Garamond", serif', color: "#E8EDE9" }}
              >
                Add Soul True to your home screen
              </h3>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ fontFamily: '"Outfit", sans-serif', color: "#8A9E94", fontWeight: 300 }}
              >
                For instant access to your Soul True Life Guide
              </p>
            </div>
          </div>

          <button
            onClick={handleInstall}
            className="mt-4 w-full rounded-md py-2.5 text-xs font-medium uppercase tracking-[0.22em] transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #B8952E, #C9A84C)",
              color: "#0D0F0E",
              fontFamily: '"Outfit", sans-serif',
            }}
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
