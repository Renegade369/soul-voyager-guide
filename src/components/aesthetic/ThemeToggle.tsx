import { useEffect, useState } from "react";
import { Moon, Flame } from "lucide-react";

const KEY = "soul-true-theme";
type Theme = "default" | "sacred-gold";

/** Tiny header toggle: 🌙 default candlelit / 🕯 sacred gold (warmer, deeper). */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("default");

  useEffect(() => {
    const saved = (typeof window !== "undefined" ? localStorage.getItem(KEY) : null) as Theme | null;
    const initial: Theme = saved === "sacred-gold" ? "sacred-gold" : "default";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggle = () => {
    const next: Theme = theme === "default" ? "sacred-gold" : "default";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem(KEY, next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "sacred-gold" ? "Switch to moonlit theme" : "Switch to candlelit Sacred Gold"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors"
      style={{
        color: theme === "sacred-gold" ? "#E8821A" : "#C9A84C",
        border: "1px solid rgba(201,168,76,0.3)",
      }}
      title={theme === "sacred-gold" ? "Sacred Gold" : "Moonlit"}
    >
      {theme === "sacred-gold" ? <Flame size={15} /> : <Moon size={15} />}
    </button>
  );
}
