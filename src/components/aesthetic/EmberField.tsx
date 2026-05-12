import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

/**
 * Parallax ember starfield using tsparticles.
 * Warm gold drift dots + occasional amber sparks. Brand-locked palette only.
 */
export function EmberField({ density = 50 }: { density?: number }) {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
    setIsMobile(window.matchMedia("(max-width: 640px)").matches);
  }, []);

  if (!ready) return null;

  const count = isMobile ? 20 : density;
  const moveEnabled = !isMobile;

  const goldCount = Math.round(count * 0.75);
  const emberCount = count - goldCount;

  const baseMove = {
    enable: moveEnabled,
    speed: 0.25,
    direction: "none" as const,
    random: true,
    straight: false,
    outModes: { default: "out" as const },
  };

  const goldOptions: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
      number: { value: goldCount },
      color: { value: "#C9A84C" },
      size: { value: { min: 1, max: 1.5 } },
      opacity: { value: 0.6 },
      links: { enable: false },
      move: baseMove,
    },
  };

  const emberOptions: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
      number: { value: emberCount },
      color: { value: "#E8821A" },
      size: { value: { min: 2, max: 3 } },
      opacity: { value: 0.3 },
      shadow: { enable: true, color: "#E8821A", blur: 6 },
      links: { enable: false },
      move: baseMove,
    },
  };

  return (
    <div className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }} aria-hidden>
      <Particles id="ember-field-gold" options={goldOptions} />
      <Particles id="ember-field-ember" options={emberOptions} />
    </div>
  );
}
