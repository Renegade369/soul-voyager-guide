import { createFileRoute } from "@tanstack/react-router";
import { Star, ArrowRight, Sparkles } from "lucide-react";
import MUSHROOM_FOREST from "@/assets/rainbow-mushroom-forest.png";
import KIM_HERO from "@/assets/kim-alfano-hero.png";
import KIM_FOREST from "@/assets/kim-alfano-forest.png";
import KIM_SUNFLOWERS from "@/assets/kim-alfano-sunflowers.png";
import KIM_GODDESS from "@/assets/kim-alfano-goddess.png";
import HV_LOGO from "@/assets/higher-vibes-logo.png";
import HV_TAKE_MICRO from "@/assets/higher-vibes-take-your-micro.png";
import HV_RETRO from "@/assets/higher-vibes-retro-mushroom.png";
import HV_GOLDEN_BRAIN from "@/assets/higher-vibes-golden-brain.png";

const C = {
  bg: "#0A0B09",
  gold: "#C9A84C",
  goldAlt: "#D4A017",
  text: "#F5F0E8",
  glow: "#E8821A",
  card: "#13100A",
  border: "rgba(201,168,76,0.45)",
  borderSoft: "rgba(201,168,76,0.22)",
  muted: "rgba(245,240,232,0.7)",
  dim: "rgba(245,240,232,0.5)",
};
const fonts = {
  display: '"Cormorant Garamond", serif',
  body: '"Outfit", sans-serif',
};

export const Route = createFileRoute("/higher-vibes")({
  head: () => ({
    meta: [
      { title: "Higher Vibes — Kim Alfano · Soul True Partner" },
      { name: "description", content: "Kim Alfano: plant medicine facilitator, spiritual guide, quantum healer. 80,000+ souls transformed. Sessions, ceremonies, and sacred guidance." },
      { property: "og:title", content: "Higher Vibes — Kim Alfano · Soul True Partner" },
      { property: "og:description", content: "Awaken Your Higher Self. Activate Your Highest Timeline. Plant medicine, quantum healing, subconscious reprogramming." },
    ],
  }),
  component: HigherVibesPage,
});

const testimonials: { name: string; quote: string }[] = [
  { name: "Kari Villarreal", quote: "It's been about 2 weeks since finishing the 4 week journey with Kim. I am crying real tears while writing this. My whole life has changed — who I am now is who I've always dreamt of being. I feel joy about my life, abundance, purpose. I feel like a brand new person. She has guided me through a portal into my dream life. I am forever grateful. I am free." },
  { name: "Laura Baker", quote: "I highly recommend Kim to anyone who feels stuck, anxious, or disconnected from their worth. I had no idea how much of my fear came from childhood until she helped me gently uncover it. The shadow work we did together was powerful but felt safe the entire time. Within 2 weeks, my anxiety was gone. Everything started shifting so fast. I finally see my dream life clearly, and for the first time, I know it's mine." },
  { name: "Labella", quote: "I'm writing this and tears are pouring down. My life was in complete shambles. And now I feel so free, I feel so filled with joy it's hard to find the words. To anyone reading this wondering if it's worth it — IT IS. I wish I could give a million stars." },
  { name: "Michelle", quote: "It's been 3 weeks since beginning my guided journey with Kim, and I can already say this has changed my life. I'm 65 years old, and for the last 20 years I've lived with constant anxiety after a traumatic experience. I tried everything and never found lasting relief. Since working with Kim, the anxiety has quieted in a way I didn't know was possible. I wake up feeling joyful and actually excited for the day ahead. I feel like myself again." },
  { name: "Anonymous", quote: "I did the Magic of Microdosing course and my whole life changed. I am in absolute awe. I had severe anxiety my whole life — I didn't realize it was trauma from childhood. Once Kim helped me realize I was holding onto it and I could choose to release it, my anxiety left. It's like a miracle. You are an angel." },
  { name: "Anonymous", quote: "When I signed up I was in the darkest place of my life. I saw one of Kim's videos about her own journey and took the leap. Now my life looks nothing like it did before. I am excited to wake up every day. Being alive is my most favorite thing. Her work is saving lives." },
  { name: "Anonymous", quote: "I just made a $3,000 sale! I would have never expanded my abundance this far without Kim. I allowed myself to release my money blocks, changed my price, and woke up to a sale. This work is real." },
  { name: "Anonymous", quote: "On my 3rd day I finally asked my company owner for a long overdue raise — something I had been avoiding for years out of anxiety. The following Monday I was given a raise of $35,000 extra a year. Kim's work opened my mind and gave me the confidence to self-advocate." },
  { name: "Anonymous", quote: "My life has changed. My body is so alive — no anxiety, deep thinking, creativity. This gave me my life back. I haven't ever felt this free. You are a Warrior of Light." },
  { name: "A Husband", quote: "I just wanted to thank you for guiding my wife. She is a completely brand new woman. She had such crippling anxiety she couldn't even leave her bed for years. She's now up every day, ready, and she's even singing. She said she feels so free. This is what a miracle is. We are forever grateful." },
  { name: "Barb", quote: "In the first couple weeks of working with Kim, my anxiety was gone. Completely gone. I had lived in fear and low self worth for as long as I could remember. Kim helped me gently dig into my subconscious and unravel beliefs I didn't even know were running my life. The way she guided me through shadow work felt safe, grounded, and so deeply opening. Things started shifting immediately." },
  { name: "Sarah Machoney", quote: "I honestly didn't know what to expect going into Kim's class. I thought maybe I'd learn a few mindset shifts — but I had NO idea how deep these money blocks really were. Within minutes of identifying my root center block, everything clicked. 2 days after the masterclass, I received a completely unexpected work bonus. Out of nowhere. I swear the timing was too aligned to ignore. More than the bonus, I feel different." },
  { name: "Aliyah", quote: "Before this masterclass, I felt constant anxiety around money. After Kim guided us through clearing the 8 core money blocks, I felt a huge weight lift. The next week, I attracted a client who paid in full without hesitation. I'm in awe." },
  { name: "Matt", quote: "Kim's teaching blew me away. I've taken other money mindset courses, but nothing ever clicked like this. She combines neuroscience, spirituality, and embodiment in a way that makes abundance feel natural. Since the class, I've had unexpected checks, opportunities, and clients come in, like magic." },
  { name: "Anonymous", quote: "I've been working with Kim for some time now, and she's already helped me so much. But this class sent it over the top. I had money blocks I didn't even know I had until this class. At the end of it, I felt so much more at peace and confident that money can and will flow to me." },
  { name: "Amanda", quote: "Microdosing and having Kim as our guide has saved my marriage. My husband and I were on the brink of a terrible divorce. We decided to try microdosing and found Kim. Miracles happened — my husband and I reconnected, we grew together, we are in love again. Thank you Kim. You are a true blessing to this world." },
  { name: "Marleen", quote: "An absolute miracle having Kim as my life coach. I highly recommend her to anyone having any issues in their lives. She is so knowledgeable about body, mind, and soul. This course will shift your entire life around in the most miraculous ways." },
  { name: "Kristin", quote: "All I can say is YES. This is life changing. Thank you Kim. Thank you to microdosing." },
  { name: "Mindy", quote: "Kim has been an absolute blessing in my life. She really knows what she's doing and she is very consistent and attentive. My life did a 180 taking this course with her, and she continues to check on me even after the 30 days. I am so grateful. Thank you Angel Kim." },
  { name: "Mark", quote: "This course is life changing. Before taking it I was curious but hesitant about how to start microdosing safely. Kim's course provided not only the knowledge I needed but also the emotional and spiritual insights that helped me reconnect with myself. I've noticed a significant boost in my mood, creativity, and overall mindset. 10 stars." },
  { name: "Lexie", quote: "Before I took Kim's course, I was struggling in every area of my life — emotionally, financially, and mentally. Once I started working with Kim, everything shifted. She opened my eyes to the fact that I've been creating my entire reality through my thoughts, beliefs, and emotions. When it finally hit me that I have the power to change my reality, everything changed. I started expanding my abundance and learning to love myself. If you're ready for transformation, this is it." },
  { name: "Michelle", quote: "This course has been a life altering experience. Kim's depth of knowledge and compassionate guidance made the entire journey feel safe, supportive, and transformative. I learned not only the science behind microdosing but also how to integrate it into my life for deeper frequency wellness, clarity, and personal growth. I highly recommend this course." },
  { name: "Sam", quote: "This program has been nothing short of life changing. From the moment we started, Kim guided me with such care, wisdom, and compassion. Her deep understanding of microdosing, combined with her intuitive approach, made the process feel so natural and transformative. I had been stuck in patterns of self doubt and fear, but with Kim's help, I was able to break through those barriers." },
  { name: "Lisa Brichum", quote: "Kim is absolutely incredible at what she does. I have been stuck in limiting beliefs for so long — I had so many I didn't consciously know were there until Kim brought them to my awareness. I feel so different about my life, I can say I absolutely feel abundant. It all starts with your energy — clear your blocks. Do not skip on this. Work with Kim." },
];

const sessions: { name: string; tag: string; desc: string; url: string }[] = [
  { name: "Clarity Call", tag: "30 MIN · FREE", desc: "Curious if this is the right path? Start here.", url: "https://shop.beacons.ai/higher_vibes/18b24f23-8c3c-489c-b78c-e850e1bfdecc" },
  { name: "1:1 Quantum Call", tag: "60 MIN", desc: "A deep one-on-one session to quantum leap past your limitations.", url: "https://shop.beacons.ai/higher_vibes/023daaf8-525f-4329-9d0c-fa59e8cbc8f7" },
  { name: "Path of Remembrance", tag: "120 MIN · 4 WEEKS · 1:1", desc: "An extended guided journey back to your true self.", url: "https://shop.beacons.ai/higher_vibes/4afff2af-39be-479d-86d9-5118283a84d3" },
  { name: "Ascension Portal", tag: "GUIDED GROUP JOURNEY", desc: "Group ceremony and collective consciousness expansion.", url: "https://shop.beacons.ai/higher_vibes/3ae584ad-48de-4a45-a570-85006a03611e" },
  { name: "Custom Microdosing Kit", tag: "6 MONTH SOLO JOURNEY", desc: "A fully personalized protocol for your unique path.", url: "https://shop.beacons.ai/higher_vibes/747cfcf8-39ea-4b17-a16b-7d38bca3f104" },
  { name: "Frequency of Abundance", tag: "1:1 GUIDED JOURNEY", desc: "Clear your money blocks and expand your prosperity frequency.", url: "https://shop.beacons.ai/higher_vibes/2af65f0f-91ed-4cbb-a1d6-e7d5330f4bc4" },
  { name: "HigherVibes Wellness Ceremony", tag: "360 MIN · SACRED", desc: "A full ceremonial plant medicine experience in sacred circle.", url: "https://shop.beacons.ai/higher_vibes/12741891-34fd-4954-aef3-62e1e21591d9" },
  { name: "Why Microdose?", tag: "EDUCATIONAL GUIDE", desc: "Understand the science and soul behind intentional microdosing.", url: "https://shop.beacons.ai/higher_vibes/63468a37-44ea-4ffd-9ac5-b549152b70b9" },
  { name: "Subconscious Reprogramming", tag: "GUIDE", desc: "Rewire the deep programs running your life on autopilot.", url: "https://shop.beacons.ai/higher_vibes/f0429c83-4d0d-41fa-9710-c6c37963d7d0" },
  { name: "Quantum Sleep Leap", tag: "MANIFEST WHILE YOU SLEEP", desc: "Subconscious reprogramming activated during your sleep cycles.", url: "https://shop.beacons.ai/higher_vibes/31d8a66e-de77-4355-b496-2357ab5de94c" },
  { name: "Clear Your Money Blocks", tag: "MASTERCLASS", desc: "Break through the hidden beliefs blocking your financial expansion.", url: "https://shop.beacons.ai/higher_vibes/b0a2531c-7004-41d7-bd9a-e7e4d2d33e76" },
  { name: "The Marilyn Monroe Effect", tag: "MASTERCLASS", desc: "Step into your magnetic, authentic power and own every room you enter.", url: "https://shop.beacons.ai/higher_vibes/aef20b97-b94d-4abd-8989-fe63e75b3037" },
  { name: "Sacred Plant Medicine Ceremony", tag: "CEREMONIAL EXPERIENCE", desc: "A sacred ceremonial journey with intention, integration, and community.", url: "https://shop.beacons.ai/higher_vibes/f97396b8-fbb4-43e6-bd3a-ebb6e1825640" },
];

const symptoms = [
  "Constant anxiety", "Racing thoughts", "Feeling stuck",
  "Self-sabotage", "Fear of visibility", "Burnout cycles",
  "Emotional numbness", "People pleasing", "Perfectionism",
  "Chronic overthinking", "Fear of success", "Difficulty sleeping",
];

function GoldRule() {
  return (
    <div className="mx-auto my-20 flex w-full max-w-2xl items-center gap-4" aria-hidden>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${C.gold}88, transparent)` }} />
      <Sparkles size={14} style={{ color: C.gold }} />
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${C.gold}88, transparent)` }} />
    </div>
  );
}

function HigherVibesPage() {
  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: fonts.body }}>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, rgba(232,130,26,0.18) 0%, rgba(10,11,9,0) 60%), ${C.bg}`,
          }}
        />
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <img
            src={HV_LOGO}
            alt="Higher Vibes — Magic of Microdosing"
            className="mx-auto mb-8 h-28 w-28 object-contain md:h-36 md:w-36"
            style={{ filter: `drop-shadow(0 0 28px ${C.glow}55)` }}
            loading="eager"
          />
          <p className="mb-5 text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>
            Soul True Partner
          </p>
          <div className="mx-auto mb-10 w-full max-w-md overflow-hidden border" style={{ borderColor: C.border, boxShadow: `0 0 60px -10px ${C.glow}55` }}>
            <img
              src={KIM_HERO}
              alt="Kim Alfano — Plant Medicine Facilitator, Spiritual Guide, Quantum Frequency Guide"
              className="block h-auto w-full"
              loading="eager"
            />
          </div>
          <h1 className="text-5xl font-light leading-[1.05] md:text-7xl" style={{ fontFamily: fonts.display, color: C.text }}>
            Kim <em className="italic" style={{ color: C.gold }}>Alfano</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm uppercase tracking-[0.22em]" style={{ color: C.muted }}>
            Plant Medicine Facilitator · Spiritual Guide · Life Coach
            <br />
            Mindset Mastery Coach · Quantum Frequency Guide
          </p>
          <p className="mx-auto mt-10 max-w-2xl font-serif text-2xl font-light italic md:text-3xl" style={{ color: C.gold, fontFamily: fonts.display }}>
            "Awaken Your Higher Self. Activate Your Highest Timeline."
          </p>
          <p className="mx-auto mt-8 max-w-3xl text-[11px] uppercase tracking-[0.28em]" style={{ color: C.dim }}>
            Quantum Frequency Work · Plant Medicine · Neuroscience
            <br />
            Subconscious Reprogramming · Nervous System Regulation
          </p>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border md:grid-cols-4" style={{ borderColor: C.borderSoft, background: C.borderSoft }}>
            {[
              ["80K+", "Souls Transformed"],
              ["Global", "Movement"],
              ["1:1", "Real-Time"],
              ["Real", "Transformations"],
            ].map(([big, small]) => (
              <div key={small} className="px-4 py-6 text-center" style={{ background: C.bg }}>
                <p className="font-serif text-2xl" style={{ color: C.gold, fontFamily: fonts.display }}>{big}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.22em]" style={{ color: C.muted }}>{small}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldRule />

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>The Souls She's Walked With</p>
          <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl" style={{ fontFamily: fonts.display }}>
            What People Are <em className="italic" style={{ color: C.gold }}>Saying</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-serif text-lg italic" style={{ color: C.muted, fontFamily: fonts.display }}>
            Over 80,000 souls transformed. These are their words.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="flex flex-col rounded-none border p-6"
              style={{ background: C.card, borderColor: C.border }}
            >
              <div className="mb-3 flex gap-1" style={{ color: C.gold }}>
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={12} fill={C.gold} strokeWidth={0} />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed" style={{ color: C.muted }}>"{t.quote}"</p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.22em]" style={{ color: C.gold }}>— {t.name}</p>
            </article>
          ))}
        </div>
      </section>

      <GoldRule />

      {/* WHO IS KIM */}
      <section className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Who Is Kim</p>
        <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl" style={{ fontFamily: fonts.display }}>
          A modern-day <em className="italic" style={{ color: C.gold }}>quantum guide</em>
        </h2>
        <div className="mx-auto mt-10 w-full max-w-lg overflow-hidden border" style={{ borderColor: C.border, boxShadow: `0 0 60px -10px ${C.glow}55` }}>
          <img
            src={KIM_FOREST}
            alt="Kim Alfano in the forest — reconnecting with nature"
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>
        <div className="mt-10 space-y-6 text-left text-base leading-relaxed md:text-lg" style={{ color: C.text }}>
          <p>
            Kim Alfano is a modern-day quantum frequency guide and the visionary founder of HigherVibes — a global movement rooted in the power of plant medicine, frequency, and deep soul transformation. She blends neuroscience, quantum physics, and ancient wisdom into a revolutionary approach.
          </p>
          <p>
            Her path was forged through lived experience. After years of battling crippling anxiety and depression, Kim became her own guide — walked through the fire, rewired her mind, and emerged with a mission to lead others home to themselves. Since launching her work, she has supported over 70,000 students awakening to their true nature, reclaiming their power, and quantum leaping into the life they were born for.
          </p>
        </div>
        <blockquote className="mx-auto mt-12 max-w-2xl border-l-2 pl-6 text-left font-serif text-xl italic leading-relaxed md:text-2xl" style={{ borderColor: C.gold, color: C.gold, fontFamily: fonts.display }}>
          "You don't need to hustle harder. You need to reprogram the subconscious blocks keeping you in survival mode."
          <footer className="mt-3 text-[11px] not-italic uppercase tracking-[0.22em]" style={{ color: C.muted }}>— Kim Alfano</footer>
        </blockquote>

        <div className="mt-16">
          <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>The HigherVibes Wellness Center</p>
          <div className="mx-auto mt-8 w-full max-w-lg overflow-hidden border" style={{ borderColor: C.border, boxShadow: `0 0 60px -10px ${C.glow}55` }}>
            <img
              src={KIM_GODDESS}
              alt="Kim Alfano amongst sunflowers — goddess energy"
              className="block h-auto w-full"
              loading="lazy"
            />
          </div>
          <p className="mt-8 text-left text-base leading-relaxed md:text-lg">
            Kim is building a real, physical sanctuary — a space where your nervous system can finally exhale. Plant medicine. Nervous system regulation. Subconscious reprogramming. Community. Connection. Integration. A home for souls who are ready to remember their power.
          </p>
        </div>

        <blockquote className="mx-auto mt-12 max-w-2xl border-l-2 pl-6 text-left font-serif text-xl italic leading-relaxed md:text-2xl" style={{ borderColor: C.gold, color: C.gold, fontFamily: fonts.display }}>
          "People don't need to be saved or rescued. People need knowledge of their own power and how to access it."
          <footer className="mt-3 text-[11px] not-italic uppercase tracking-[0.22em]" style={{ color: C.muted }}>— Kim Alfano, Higher Vibes</footer>
        </blockquote>
      </section>

      <GoldRule />

      {/* FEATURED QUOTE — Kim's Core */}
      <section className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Kim's Core Truth</p>
        <figure
          className="relative mt-8 px-6 py-14 md:px-14 md:py-20"
          style={{
            background: `radial-gradient(ellipse at center, ${C.glow}12 0%, transparent 70%)`,
            border: `1px solid ${C.borderSoft}`,
            boxShadow: `0 0 80px -20px ${C.glow}33, inset 0 0 60px -30px ${C.glow}22`,
          }}
        >
          <span
            aria-hidden
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 px-4 font-serif text-6xl leading-none md:text-7xl"
            style={{ background: C.bg, color: C.gold, fontFamily: fonts.display }}
          >
            &ldquo;
          </span>
          <blockquote
            className="font-serif text-2xl font-light italic leading-snug md:text-4xl md:leading-snug"
            style={{ fontFamily: fonts.display, color: C.text }}
          >
            People don't need to be <span style={{ color: C.gold }}>saved</span> or rescued.
            <br className="hidden md:block" /> People need <span style={{ color: C.gold }}>knowledge of their own power</span> and how to access it.
          </blockquote>
          <figcaption className="mt-8 text-[11px] uppercase tracking-[0.4em]" style={{ color: C.muted }}>
            — Kim Alfano · Higher Vibes
          </figcaption>
        </figure>
      </section>

      <GoldRule />

      {/* WHY MICRODOSE */}
      <section className="mx-auto max-w-3xl px-6 text-center">
        <img
          src={HV_TAKE_MICRO}
          alt="Higher Vibes — Take Your Micro"
          className="mx-auto mb-8 h-44 w-44 object-contain md:h-56 md:w-56"
          style={{ filter: `drop-shadow(0 0 32px ${C.glow}55)` }}
          loading="lazy"
        />
        <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Sacred Frequency. Intentional Vibrational Wellness.</p>
        <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl" style={{ fontFamily: fonts.display }}>
          Why <em className="italic" style={{ color: C.gold }}>Microdose?</em>
        </h2>
        <p className="mt-10 text-left text-base leading-relaxed md:text-lg">
          Psilocybin gently guides the mind and body toward balance and renewal. It rewires neural pathways, releases stored patterns, unlocks creativity, enhances focus, and restores a sense of purpose and joy.
        </p>
        <p className="mt-5 text-left text-base leading-relaxed md:text-lg">
          Kim's mushrooms are cultivated in small batches, bathed in sound frequencies throughout the entire grow cycle. The intention of the grower becomes part of the medicine.
        </p>
      </section>

      {/* CINEMATIC DIVIDER — Rainbow mushroom forest */}
      <section className="relative mt-20 w-full overflow-hidden" aria-hidden>
        <img
          src={MUSHROOM_FOREST}
          alt=""
          className="block w-full"
          style={{
            height: 400,
            objectFit: "cover",
            maskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        />
      </section>

      {/* SCIENCE */}
      <section className="mx-auto max-w-3xl px-6 pt-8 text-center">
        <img
          src={HV_GOLDEN_BRAIN}
          alt="Golden brain dissolving into stardust"
          className="mx-auto mb-8 h-56 w-56 object-contain md:h-72 md:w-72"
          style={{ filter: `drop-shadow(0 0 60px ${C.glow}66)` }}
          loading="lazy"
        />
        <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>The Science Behind It</p>
        <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl" style={{ fontFamily: fonts.display }}>
          Your Brain Can <em className="italic" style={{ color: C.gold }}>Rewire Itself</em>
        </h2>
        <p className="mt-10 text-left text-base leading-relaxed md:text-lg">
          Your conscious mind is active and aware. Your subconscious programming runs 95% of your life on autopilot. True transformation requires working at the subconscious level — not just the surface.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { title: "Before", desc: "Limited neural pathways running the same old programs on loop." },
            { title: "After", desc: "Expanded, highly connected pathways. Neuroplasticity activated." },
          ].map((b) => (
            <div key={b.title} className="rounded-none border p-7 text-left" style={{ background: C.card, borderColor: C.border }}>
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>{b.title}</p>
              <BrainSvg active={b.title === "After"} />
              <p className="mt-4 text-sm leading-relaxed" style={{ color: C.muted }}>{b.desc}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-xl text-sm italic leading-relaxed" style={{ color: C.dim }}>
          More connections mean more creativity, emotional flexibility, and the power to permanently shift old patterns.
        </p>

        {/* TERENCE MCKENNA QUOTE */}
        <figure
          className="relative mx-auto mt-16 max-w-2xl px-6 py-12 text-left md:px-12 md:py-14"
          style={{
            background: `radial-gradient(ellipse at top, ${C.glow}10 0%, transparent 70%)`,
            border: `1px solid ${C.borderSoft}`,
            boxShadow: `0 0 60px -20px ${C.glow}33`,
          }}
        >
          <span
            aria-hidden
            className="absolute left-6 top-0 -translate-y-1/2 px-3 font-serif text-5xl leading-none md:left-10 md:text-6xl"
            style={{ background: C.bg, color: C.gold, fontFamily: fonts.display }}
          >
            &ldquo;
          </span>
          <blockquote
            className="font-serif text-xl font-light italic leading-relaxed md:text-2xl md:leading-relaxed"
            style={{ fontFamily: fonts.display, color: C.text }}
          >
            The mind is more powerful than any imaginable particle accelerator, more sensitive than any radio receiver or the largest optical telescope, more complete in its grasp of information than any computer: the <span style={{ color: C.gold }}>human body</span> — its organs, its voice, its powers of locomotion, and its imagination — is a more-than-sufficient means for the exploration of any place, time or energy level in the universe.
          </blockquote>
          <figcaption className="mt-6 text-[11px] uppercase tracking-[0.4em]" style={{ color: C.muted }}>
            — Terence McKenna
          </figcaption>
        </figure>
      </section>

      {/* CINEMATIC DIVIDER — Kim in sunflowers */}
      <section className="relative mt-20 w-full overflow-hidden" aria-hidden>
        <img
          src={KIM_SUNFLOWERS}
          alt=""
          className="block w-full"
          style={{
            height: 420,
            objectFit: "cover",
            objectPosition: "center 30%",
            maskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
        />
      </section>

      {/* SESSIONS */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="mx-auto mb-10 w-44 overflow-hidden border md:w-56" style={{ borderColor: C.border, boxShadow: `0 0 50px -12px ${C.glow}55` }}>
            <img
              src={HV_RETRO}
              alt="Higher Vibes retro mushroom illustration"
              className="block h-auto w-full"
              loading="lazy"
            />
          </div>
          <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Sessions & Offerings</p>
          <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl" style={{ fontFamily: fonts.display }}>
            Choose Your <em className="italic" style={{ color: C.gold }}>Path</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-serif text-lg italic" style={{ color: C.muted, fontFamily: fonts.display }}>
            Tap any session to book directly with Kim →
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sessions.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-none border p-7 transition-all hover:-translate-y-1"
              style={{ background: C.card, borderColor: C.border }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px -12px rgba(201,168,76,0.45)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: C.gold }}>{s.tag}</p>
              <h3 className="mt-4 font-serif text-2xl font-normal" style={{ fontFamily: fonts.display, color: C.text }}>{s.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: C.muted }}>{s.desc}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em]" style={{ color: C.gold }}>
                Book with Kim <ArrowRight size={12} />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://beacons.ai/higher_vibes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-none border px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition-colors hover:bg-[#1A1209]"
            style={{ borderColor: C.gold, color: C.gold, background: "transparent" }}
          >
            View All Services <ArrowRight size={14} />
          </a>
        </div>
      </section>

      <GoldRule />

      {/* IS THIS YOU */}
      <section className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Is This You?</p>
          <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl" style={{ fontFamily: fonts.display }}>
            There Is Nothing <em className="italic" style={{ color: C.gold }}>Wrong With You.</em>
          </h2>
        </div>
        <div className="mt-10 space-y-5 text-base leading-relaxed md:text-lg">
          <p>You wake up tired. Already carrying a quiet weight you can't explain. You're functioning — getting through the day — but it doesn't feel like truly living. You've read the books. Done the work. Tried to stay positive. And yet you still end up in the same emotional cycles.</p>
          <p>Your body and subconscious are simply running protective programs created earlier in life. What was learned can be rewired.</p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {symptoms.map((s) => (
            <div key={s} className="rounded-none border px-4 py-3 text-center text-[11px] uppercase tracking-[0.18em]" style={{ borderColor: C.border, color: C.gold, background: C.card }}>
              {s}
            </div>
          ))}
        </div>
      </section>

      <GoldRule />

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Ready to Go Deeper?</p>
        <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl" style={{ fontFamily: fonts.display }}>
          Your Transformation <em className="italic" style={{ color: C.gold }}>Begins Here.</em>
        </h2>
        <div className="mt-10 space-y-3 text-base leading-relaxed md:text-lg">
          <p>Soul True gives you the tools.</p>
          <p>Coaching gives you the breakthrough.</p>
          <p>Kim Alfano at Higher Vibes anchors everything you build here in real, lasting transformation.</p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:highervibrations36@gmail.com?subject=Book%20a%20Session%20%E2%80%94%20Soul%20True%20sent%20me"
            className="inline-flex items-center gap-2 rounded-none px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition-all hover:shadow-[0_0_36px_rgba(232,130,26,0.55)]"
            style={{ backgroundColor: C.gold, color: C.bg }}
          >
            Book a Session with Kim <ArrowRight size={14} />
          </a>
          <a
            href="https://shop.beacons.ai/higher_vibes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-none border px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition-colors hover:bg-[#1A1209]"
            style={{ borderColor: C.gold, color: C.gold }}
          >
            Visit Higher Vibes <ArrowRight size={14} />
          </a>
        </div>

        <p className="mx-auto mt-16 max-w-2xl text-[11px] leading-relaxed" style={{ color: C.dim }}>
          The content provided by HigherVibes is for informational and educational purposes only. Not intended as a substitute for professional medical advice. Always seek guidance from a qualified healthcare provider. Individual results may vary. Soul True presents this partner resource as part of our commitment to accessible, holistic vibrational wellness pathways.
        </p>
      </section>
    </div>
  );
}

function BrainSvg({ active }: { active: boolean }) {
  const stroke = active ? C.gold : "rgba(245,240,232,0.35)";
  const fill = active ? "rgba(201,168,76,0.12)" : "rgba(245,240,232,0.04)";
  return (
    <svg viewBox="0 0 200 140" className="mt-5 h-auto w-full" aria-hidden>
      <path d="M40 70 C 40 30, 100 20, 130 40 C 170 30, 180 80, 150 100 C 160 130, 100 130, 80 110 C 40 120, 20 90, 40 70 Z" fill={fill} stroke={stroke} strokeWidth="1" />
      {(active
        ? [[55,60,95,55],[95,55,130,70],[130,70,110,95],[110,95,75,85],[75,85,55,60],[95,55,110,95],[55,60,130,70],[75,85,130,70],[60,80,120,50],[100,40,140,90]]
        : [[60,70,100,70],[100,70,140,75]]
      ).map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="0.6" opacity={active ? 0.8 : 0.5} />
      ))}
      {(active
        ? [[55,60],[95,55],[130,70],[110,95],[75,85],[60,80],[120,50],[100,40],[140,90],[80,100]]
        : [[60,70],[100,70],[140,75]]
      ).map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill={stroke} />
      ))}
    </svg>
  );
}
