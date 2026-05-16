import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { X } from "lucide-react";

const colors = {
  bg: "#0D0F0E",
  card: "#141917",
  inner: "#1C2420",
  hover: "#2A332F",
  border: "#2E3A35",
  teal: "#C9A84C",
  tealDark: "#8B6914",
  gold: "#C9A84C",
  text: "#E8EDE9",
  muted: "#8A9E94",
  red: "#E24B4A",
};

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const { signIn, signUp, signInWithGoogle } = useAuth();

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      if (tab === "signin") {
        await signIn(email, password);
        onClose();
      } else {
        if (password.length < 8) {
          setError("Password must be at least 8 characters");
          setLoading(false);
          return;
        }
        await signUp(email, password, fullName);
        setSuccess("Check your email for a confirmation link.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-200`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
      <div
        className="relative w-full max-w-md rounded-xl border p-8"
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 transition-colors"
          style={{ color: colors.muted }}
        >
          <X size={20} />
        </button>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg p-1" style={{ backgroundColor: colors.inner }}>
          {(["signin", "signup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); setSuccess(""); }}
              className="flex-1 rounded-md py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: tab === t ? colors.card : "transparent",
                color: tab === t ? colors.text : colors.muted,
                fontFamily: "Outfit, sans-serif",
              }}
            >
              {t === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={inputClass}
              style={{
                backgroundColor: colors.inner,
                color: colors.text,
                borderColor: colors.border,
                border: `0.5px solid ${colors.border}`,
                fontFamily: "Outfit, sans-serif",
              }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
            style={{
              backgroundColor: colors.inner,
              color: colors.text,
              border: `0.5px solid ${colors.border}`,
              fontFamily: "Outfit, sans-serif",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClass}
            style={{
              backgroundColor: colors.inner,
              color: colors.text,
              border: `0.5px solid ${colors.border}`,
              fontFamily: "Outfit, sans-serif",
            }}
          />

          {error && (
            <p className="text-sm" style={{ color: colors.red }}>{error}</p>
          )}
          {success && (
            <p className="text-sm" style={{ color: colors.teal }}>{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg py-3 text-sm font-medium transition-opacity disabled:opacity-60"
            style={{
              background: `linear-gradient(135deg, ${colors.tealDark}, ${colors.teal})`,
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            {loading ? "…" : tab === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={signInWithGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors"
            style={{
              backgroundColor: colors.inner,
              color: colors.text,
              border: `0.5px solid ${colors.border}`,
              fontFamily: "Outfit, sans-serif",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
