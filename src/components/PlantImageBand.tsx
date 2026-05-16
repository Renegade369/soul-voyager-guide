type Props = { src: string; alt?: string };

export function PlantImageBand({ src, alt = "" }: Props) {
  return (
    <section className="relative w-full overflow-hidden" aria-hidden={alt === ""}>
      <img
        src={src}
        alt={alt}
        className="block w-full"
        style={{
          opacity: 0.7,
          objectFit: "cover",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      />
    </section>
  );
}

export const PLANT_IMAGES = {
  home: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778962225130.png",
  guide: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778962267591.png",
  meditations: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778962314040.png",
  soulQuiz: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778962364817.png",
  birthChart: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778962411643.png",
  bloodType: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778962452963.png",
  dashboard: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778962497298.png",
} as const;
