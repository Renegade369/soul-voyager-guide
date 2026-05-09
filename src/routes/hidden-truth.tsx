import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/hidden-truth")({
  head: () => ({
    meta: [
      { title: "Hidden Truth — Soul True" },
      {
        name: "description",
        content:
          "Documented power networks, declassified events, and the quantum physics that overturns the materialist worldview. Educational content presented for inquiry.",
      },
      { property: "og:title", content: "Hidden Truth — Soul True" },
      {
        property: "og:description",
        content:
          "Secret societies, documented events, and quantum reality — what the public record and modern physics actually show.",
      },
    ],
  }),
  component: HiddenTruthPage,
});

// ─── SOUL TRUE TOKENS ───────────────────────────────────────
const T = {
  bg: "#0D0F0E",          // deep void (footer indigo)
  surface: "#141716",     // deep indigo brand
  surfaceAlt: "#23224A",  // raised surface
  cream: "#F5F0E8",       // primary text on dark
  bone: "#E8E4DA",        // secondary text on dark
  muted: "#8E8AA8",       // dim
  gold: "#C9A84C",        // single warm-gold accent
  goldSoft: "rgba(212,175,100,0.5)",
  forest: "#141716",      // forest accent
  border: "rgba(212,175,100,0.18)",
  borderSoft: "rgba(245,240,232,0.08)",
} as const;

const heading = { fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 };
const body = { fontFamily: "'Inter', sans-serif", fontWeight: 300 };
const label = { fontFamily: "'Inter', sans-serif", fontWeight: 500 };

// ─── DATA: SECRET SOCIETIES ─────────────────────────────────
type Fact = { label: "DOCUMENTED" | "OBSERVED PATTERN"; text: string };
type Entry = {
  id: string;
  name: string;
  subtitle: string;
  statusLabel: string;
  intro: string;
  facts: Fact[];
  observation: string;
};

const SOCIETIES: Entry[] = [
  {
    id: "illuminati",
    name: "The Bavarian Illuminati",
    subtitle: "Founded May 1, 1776 · Adam Weishaupt · University of Ingolstadt",
    statusLabel: "Historically Confirmed",
    intro:
      "The Order of the Illuminati was founded on May 1, 1776 by Adam Weishaupt — a Jesuit-trained law professor at the University of Ingolstadt in Bavaria. Its stated goals were to oppose religious influence over public life and install a rationalist elite in positions of governmental control. Within a decade it had recruited nobles, politicians, judges, and military figures across Europe.",
    facts: [
      { label: "DOCUMENTED", text: "The Bavarian government officially banned the Illuminati by edict in 1785. State records of the suppression still exist." },
      { label: "DOCUMENTED", text: "Freemason and Royal Society Fellow John Robison published Proofs of a Conspiracy in 1797, documenting the Illuminati's infiltration of European Masonic lodges. George Washington's personal copy is preserved at the National Archives." },
      { label: "DOCUMENTED", text: "French priest Abbé Barruel's four-volume Memoirs Illustrating the History of Jacobinism (1797–98) documented Illuminati involvement in the French Revolution. The book was translated into English and widely read by European heads of state." },
      { label: "DOCUMENTED", text: "George Washington wrote in an 1798 letter — preserved at the Library of Congress — that he did not doubt 'that the doctrines of the Illuminati and the principles of Jacobinism had not spread in the United States.'" },
      { label: "OBSERVED PATTERN", text: "The organizational model the Illuminati established — small initiated inner circles operating inside larger legitimate institutions, with outer members unaware of the inner circle's true objectives — appears repeatedly in documented elite organizations throughout the following two centuries." },
    ],
    observation:
      "Whether the Illuminati was truly dissolved in 1785 or reconstituted under different names is a question history cannot definitively answer — because the suppression destroyed the records. What is not a question is that the model it created became a template. Power structures built on tiered knowledge, sworn secrecy, and institutional infiltration did not disappear. They adapted.",
  },
  {
    id: "freemasons",
    name: "Freemasonry",
    subtitle: "Grand Lodge of England · Founded 1717 · Est. 6 Million Members Worldwide",
    statusLabel: "Openly Documented",
    intro:
      "Freemasonry is the world's largest fraternal organization. It operates openly — lodges are listed in phone books, members wear lapel pins, and membership is acknowledged publicly. What is not publicly disclosed is the content of its upper degrees. The Scottish Rite has 33 degrees. The rituals of degrees 1–3 are widely published. The rituals of degrees 30–33 are invitation-only and not disclosed to lower-degree members.",
    facts: [
      { label: "DOCUMENTED", text: "15 US Presidents were confirmed Freemasons: Washington, Jackson, Polk, Buchanan, Andrew Johnson, Garfield, McKinley, Theodore Roosevelt, Taft, Harding, Franklin Roosevelt, Truman, Lyndon Johnson, Ford, and Reagan." },
      { label: "DOCUMENTED", text: "The street grid of Washington DC encodes Masonic symbols — including a pentagram north of the White House — documented by multiple architectural historians and acknowledged by the Masonic Service Association of North America." },
      { label: "DOCUMENTED", text: "The eye in the pyramid on the US dollar bill is a Masonic symbol. Its inclusion was championed by Henry Wallace and Franklin Roosevelt — both Masons — in 1935." },
      { label: "DOCUMENTED", text: "Albert Pike's Morals and Dogma (1871) — the definitive philosophical text of Scottish Rite Freemasonry — explicitly states that lower-degree initiates are given 'intentional misrepresentations' to conceal the true doctrine reserved for those 'worthy to receive it.'" },
      { label: "DOCUMENTED", text: "Freemasonic lodges operate within the UK Houses of Parliament. The Queen of England held the title of Grand Patroness of International Freemasonry." },
      { label: "OBSERVED PATTERN", text: "An organization whose own foundational text confirms that its lower members are deliberately given false information about its true nature — while its symbols appear on national currency and its members have occupied the presidency 15 times — is not a garden club. What the upper degrees actually teach remains undisclosed." },
    ],
    observation:
      "Freemasonry's own literature confirms a two-tier knowledge structure — outer and inner, public and concealed. That structure is not a theory. It is stated design. The question of what is concealed in the upper tiers has never been answered publicly, because those tiers are explicitly closed. That is not evidence of wrongdoing. It is evidence of a question that has never been answered.",
  },
  {
    id: "skull",
    name: "Skull & Bones",
    subtitle: "Yale University · Founded 1832 · 'Brotherhood of Death'",
    statusLabel: "Membership Confirmed",
    intro:
      "Skull & Bones is an elite secret society at Yale University founded in 1832. Fifteen seniors are selected ('tapped') each year. Membership is for life. Known internally as the Brotherhood of Death, it operates from a windowless building on the Yale campus called 'The Tomb.' Its alumni network has occupied positions at the apex of US government, intelligence, finance, and media for nearly 200 years.",
    facts: [
      { label: "DOCUMENTED", text: "In the 2004 US presidential election, both major-party candidates — George W. Bush and John Kerry — were Skull & Bones members. When separately asked about their membership during the campaign, both said the society was 'so secret' they couldn't discuss it." },
      { label: "DOCUMENTED", text: "George H.W. Bush: Skull & Bones member, CIA Director, then 41st President of the United States." },
      { label: "DOCUMENTED", text: "James Jesus Angleton — CIA chief of counterintelligence for 20 years, the most powerful counterintelligence officer in US history — was a Skull & Bones member." },
      { label: "DOCUMENTED", text: "Initiation involves the candidate lying in a coffin and confessing their complete sexual history to the assembled membership. Described by multiple former members in published accounts." },
      { label: "DOCUMENTED", text: "The society owns Deer Island — a private retreat island in the St. Lawrence River — used exclusively by members. Non-members are not permitted." },
      { label: "OBSERVED PATTERN", text: "When both candidates in a presidential election are members of the same 15-person-per-year secret society, the electorate is choosing between two pre-vetted members of the same private network. That is an observable fact about how the selection of American leadership operates, independent of any theory about what the society does." },
    ],
    observation:
      "Skull & Bones produces approximately 15 new members per year. Over 190 years that is roughly 2,850 total members — a very small number. The concentration of those members in positions of maximum power in government, intelligence, finance, and media is statistically extraordinary. Whether that concentration is the result of network advantage, shared gatekeeping, or something more is a question the documented facts invite.",
  },
  {
    id: "bohemian",
    name: "Bohemian Grove",
    subtitle: "Sonoma County, California · Annual July Gathering · Since 1878",
    statusLabel: "Filmed · Confirmed · Ongoing",
    intro:
      "Each July, several hundred of the world's most powerful men gather for two weeks in a private 2,700-acre redwood forest in Northern California. The gathering is called the Bohemian Grove. Attendance is by invitation only. No women are permitted. The event begins each year with a ritual called the Cremation of Care — conducted in robes, at night, in front of a 40-foot stone owl, involving a burning effigy.",
    facts: [
      { label: "DOCUMENTED", text: "Journalist Alex Jones infiltrated Bohemian Grove in July 2000 and filmed the Cremation of Care ritual. The footage has been widely viewed and its authenticity has never been disputed by the Grove or its members." },
      { label: "DOCUMENTED", text: "Confirmed attendees include: Richard Nixon, Ronald Reagan, George H.W. Bush, George W. Bush, Dick Cheney, Henry Kissinger, Donald Rumsfeld, Colin Powell, Alan Greenspan, and the CEOs of virtually every major US corporation and bank." },
      { label: "DOCUMENTED", text: "Richard Nixon was recorded on White House tapes in 1971 describing Bohemian Grove — confirming both his attendance and the nature of what occurred there." },
      { label: "DOCUMENTED", text: "The Manhattan Project — the US program to develop nuclear weapons — was conceived and initially discussed at Bohemian Grove in September 1942. This is confirmed in the official history of the Manhattan Project." },
      { label: "DOCUMENTED", text: "The 40-foot stone owl at the center of the ritual is referred to in Grove literature as 'the Owl of Bohemia.' The Cremation of Care involves the symbolic sacrifice of an effigy representing worldly conscience." },
      { label: "OBSERVED PATTERN", text: "The world's most consequential military program in history — nuclear weapons — was born in a private forest gathering where the same men conduct annual occult-themed ritual ceremonies. That is a documented fact. What it means about the relationship between power, ritual, and decision-making is a question worth sitting with." },
    ],
    observation:
      "The Bohemian Grove is not secret in the sense of unknown — its existence is reported, its location is known, and attendee lists have been partially published. It is secret in the sense that what happens inside is not subject to journalistic access, public accountability, or democratic oversight. The decisions made at Bohemian Grove — including at minimum the Manhattan Project — have affected every human being on Earth. That those decisions were made in a private ritual gathering rather than in accountable institutions is a documented fact about how power actually operates.",
  },
  {
    id: "cfr",
    name: "Council on Foreign Relations",
    subtitle: "New York · Founded 1921 · ~5,000 Members",
    statusLabel: "Open — Largely Unexamined",
    intro:
      "The Council on Foreign Relations was founded in 1921 with Rockefeller funding. It has approximately 5,000 members drawn from senior government, intelligence, finance, academia, and media. It publishes Foreign Affairs — the most influential foreign policy journal in the world. Every Secretary of State since Dean Rusk (1961) has been a CFR member. Multiple CIA directors, National Security Advisors, and Federal Reserve chairs have been CFR members.",
    facts: [
      { label: "DOCUMENTED", text: "Every US Secretary of State from Dean Rusk (1961) through the present has been a CFR member — regardless of which party held the presidency." },
      { label: "DOCUMENTED", text: "Georgetown historian Carroll Quigley — a mentor to Bill Clinton who had been granted access to the CFR's private records — wrote in Tragedy and Hope (1966): the network represents 'a secret society... whose aim is nothing less than to create a world system of financial control in private hands able to dominate the political system of each country and the economy of the world as a whole.'" },
      { label: "DOCUMENTED", text: "Quigley stated he was not opposed to the network's goals — only its secrecy. His book was subsequently suppressed: the publisher was pressured to discontinue it, and copies were pulled from distribution. Quigley confirmed this suppression in recorded interviews." },
      { label: "DOCUMENTED", text: "The CFR's own publications have advocated for reduced national sovereignty, global governance frameworks, and international financial coordination outside democratic accountability." },
      { label: "OBSERVED PATTERN", text: "When the same organization produces virtually every Secretary of State across administrations of both parties for over 60 years — and its own historian describes it as a network whose aim is global financial control — the question of whether US foreign policy serves the American public or a private network is legitimate and documented, not theoretical." },
    ],
    observation:
      "Carroll Quigley was not a conspiracy theorist. He was a credentialed academic with access to primary documents, writing an institutional history. His conclusion — that a private network has been systematically placing its members in the key foreign policy positions of Western governments — was drawn from that access. The fact that his book was suppressed after publication adds a layer of observable pattern to the documented claim.",
  },
  {
    id: "wef",
    name: "World Economic Forum",
    subtitle: "Davos, Switzerland · Founded 1971 · Klaus Schwab",
    statusLabel: "Publicly Stated Agenda",
    intro:
      "Unlike the Bilderberg Group or Skull & Bones, the World Economic Forum does not hide its agenda. It publishes it. Klaus Schwab's books The Great Reset (2020) and The Fourth Industrial Revolution (2016) lay out in explicit terms the restructuring of capitalism, the redesigning of food systems, the merger of physical and digital identity, and a future of 'stakeholder capitalism' where unelected corporate actors govern alongside — or instead of — elected governments.",
    facts: [
      { label: "DOCUMENTED", text: "Klaus Schwab publicly stated in a 2017 Harvard interview: 'What we are very proud of now is the young generation, like Prime Minister Trudeau... We penetrate the cabinets. So yesterday I was at a reception for Prime Minister Trudeau and I know that half of his cabinet, or even more than half of his cabinet, are actually Young Global Leaders of the World Economic Forum.'" },
      { label: "DOCUMENTED", text: "WEF Young Global Leaders alumni include: Justin Trudeau (Canada), Emmanuel Macron (France), Jacinda Ardern (New Zealand), Pete Buttigieg (US), Gavin Newsom (US), and dozens of other current or former heads of government and cabinet ministers across Western nations." },
      { label: "DOCUMENTED", text: "WEF adviser Yuval Noah Harari stated publicly on the WEF stage: 'Humans are now hackable animals... We have the technology to hack human beings on a massive scale.' He also stated: 'Free will — that's over.'" },
      { label: "DOCUMENTED", text: "WEF literature explicitly advocates for central bank digital currencies (CBDCs), digital identity systems, and what its own documents describe as a 'Great Reset' of global capitalism following COVID-19." },
      { label: "OBSERVED PATTERN", text: "When the head of a private unelected organization publicly states he has 'penetrated' the cabinets of multiple democratic governments — and those governments subsequently implement nearly identical policies simultaneously — the documented facts support the conclusion that policy coordination is occurring outside democratic accountability." },
    ],
    observation:
      "The WEF is unusual in the landscape of elite coordination because it states its goals openly. The Bohemian Grove keeps rituals private. The CFR keeps membership quiet. The WEF publishes books. Yuval Noah Harari gives speeches. Klaus Schwab holds press conferences. Whether this transparency is confidence, indifference to public reaction, or a calculated normalization strategy is an open question. The agenda itself is not open to interpretation — it is stated.",
  },
];

// ─── DATA: CONTROL & DOCUMENTED EVENTS ──────────────────────
const CONTROL_EVENTS: Entry[] = [
  {
    id: "mkultra",
    name: "Project MKUltra",
    subtitle: "CIA Mind Control Program · 1953–1973 · Confirmed by Congress",
    statusLabel: "Congressionally Confirmed",
    intro:
      "Project MKUltra was a classified CIA program that ran from 1953 to at least 1973. Its explicit purpose was to research mind control, behavior modification, and psychological manipulation — using unwitting human subjects. This is not alleged. It was confirmed by the US Senate Church Committee in 1975 and the Rockefeller Commission in the same year, after approximately 20,000 documents were accidentally discovered in a CIA financial records facility.",
    facts: [
      { label: "DOCUMENTED", text: "CIA Director Richard Helms ordered the destruction of all MKUltra files in 1973. The 20,000 documents that survived did so only because they were misfiled in a budget records facility and missed the destruction order." },
      { label: "DOCUMENTED", text: "MKUltra operated through at least 80 institutions including 44 universities and colleges, hospitals, prisons, and pharmaceutical companies — none of whose subjects were informed they were part of CIA experiments." },
      { label: "DOCUMENTED", text: "Confirmed methods included: LSD administration without consent, prolonged sleep deprivation, electroconvulsive therapy, sensory deprivation, verbal and sexual abuse, and hypnosis." },
      { label: "DOCUMENTED", text: "Frank Olson — a US Army biochemist — was dosed with LSD without his knowledge during an MKUltra experiment in 1953. He died days later, officially ruled a suicide. His family disputes this. His body was exhumed in 1994; a forensic pathologist concluded he was likely murdered." },
      { label: "DOCUMENTED", text: "No senior CIA official was prosecuted for MKUltra. The program was officially terminated in 1973 — the same year the director ordered its records destroyed. Successor programs including MKSearch and Project Artichoke were confirmed to have continued under different names." },
      { label: "OBSERVED PATTERN", text: "A government program specifically designed to learn how to control human minds — using American and Canadian citizens as unwitting test subjects — ran for at least 20 years. Its records were deliberately destroyed. No one was held accountable. The techniques developed were never confirmed to have been abandoned. These are documented facts." },
    ],
    observation:
      "The documented record of MKUltra establishes one unambiguous fact: the US government conducted systematic non-consensual psychological experimentation on its own citizens for the explicit purpose of learning how to control human behavior. What is unknown — because the records were destroyed — is the full scope of the program, what the techniques produced, and whether any successor programs continued that work after 1973.",
  },
  {
    id: "epstein",
    name: "Jeffrey Epstein & The Blackmail Network",
    subtitle: "Convicted Sex Trafficker · Federal Custody Death 2019 · Client List Sealed",
    statusLabel: "Court Documented · Client List Sealed",
    intro:
      "Jeffrey Epstein was a financier convicted of sex trafficking who operated a global network providing underage girls to powerful men. He was arrested in 2006, received what federal prosecutor Alexander Acosta later described as a deal he was told to back off because Epstein 'belonged to intelligence.' He was re-arrested in 2019. He died in federal custody on August 10, 2019 — officially ruled a suicide by hanging — the night before he was expected to provide information on his associates.",
    facts: [
      { label: "DOCUMENTED", text: "Epstein's private aircraft — documented in FAA flight logs entered into federal court records — carried confirmed passengers including Bill Clinton (26 documented flights), Prince Andrew, Alan Dershowitz, and numerous others to Epstein's private island and other locations." },
      { label: "DOCUMENTED", text: "Ghislaine Maxwell — Epstein's co-conspirator and alleged recruiter — was convicted in December 2021 on five counts including sex trafficking of a minor. She is currently serving a 20-year sentence." },
      { label: "DOCUMENTED", text: "The list of Epstein's clients — the individuals who used the trafficking network — was sealed by court order. As of 2026, the full list has not been made public. Partial names have been released through civil litigation, including Prince Andrew, who settled a civil case." },
      { label: "DOCUMENTED", text: "The two guards assigned to watch Epstein the night he died were both asleep. The security cameras in the hallway outside his cell malfunctioned and recorded nothing. The prison's suicide prevention protocols were not followed despite Epstein having been placed on suicide watch weeks earlier." },
      { label: "DOCUMENTED", text: "Former US Attorney Alexander Acosta — who gave Epstein the original 2008 plea deal — told Trump transition officials he had been instructed to back off Epstein because he 'belonged to intelligence.' This was reported by the Miami Herald and confirmed by multiple sources." },
      { label: "DOCUMENTED", text: "Forensic pathologist Dr. Michael Baden — hired by Epstein's family and present at the autopsy — stated that the injuries to Epstein's neck were 'more consistent with homicidal strangulation than suicidal hanging.'" },
      { label: "OBSERVED PATTERN", text: "The documented facts — intelligence protection, convenient camera failure, guard incapacitation, injuries inconsistent with suicide, sealed client list, and the timing of his death one night before cooperation was expected — form a pattern that multiple forensic and legal professionals have described as highly inconsistent with suicide. The official ruling is suicide. The documented anomalies are significant." },
    ],
    observation:
      "What is established by court record: Epstein ran a trafficking network that serviced the world's most powerful men. His co-conspirator was convicted. The client list exists and is sealed. He died in federal custody under circumstances that the coroner hired by his family described as inconsistent with the official ruling. The names on the sealed list have never been publicly accounted for. That accountability has been legally prevented.",
  },
  {
    id: "podesta",
    name: "Spirit Cooking, Podesta Emails & Occult Networks",
    subtitle: "WikiLeaks · 2016 · John Podesta · Marina Abramović",
    statusLabel: "Email Content Confirmed",
    intro:
      "In October 2016, WikiLeaks released emails from John Podesta — chairman of Hillary Clinton's presidential campaign and former White House Chief of Staff under Bill Clinton. Among the emails was an invitation from performance artist Marina Abramović inviting Podesta to a 'Spirit Cooking dinner.' The term Spirit Cooking refers to a series of works by Abramović involving occult ritual instructions written in pig's blood.",
    facts: [
      { label: "DOCUMENTED", text: "The Podesta Spirit Cooking email exists in the WikiLeaks archive and has been authenticated. The email is from Marina Abramović to Tony Podesta (John's brother), asking if John will be attending the dinner." },
      { label: "DOCUMENTED", text: "Marina Abramović's Spirit Cooking work — classified by art institutions as performance art — involves recipes written in pig's blood on walls instructing practitioners to mix human bodily fluids including blood, semen, and breast milk." },
      { label: "DOCUMENTED", text: "Abramović has stated in interviews that she considers Spirit Cooking a form of 'occult practice' when performed in private, and 'art' when performed in a museum context." },
      { label: "DOCUMENTED", text: "Tony Podesta's home was documented by the Washington Post as containing art including works depicting murder scenes and images described by visitors as disturbing. The Post's own profile of Podesta from 2004 documented this directly." },
      { label: "OBSERVED PATTERN", text: "The chairman of a major presidential campaign was attending private occult ritual dinners with an artist whose own stated philosophy distinguishes between public 'art' and private 'occult practice.' This is established by primary documents. The interpretation of what that means is left to the reader." },
    ],
    observation:
      "The Podesta emails represent a documented intersection of senior political power and private occult practice. The facts are in the record. Whether those practices extend beyond performance art into something more significant is not established by the available evidence. What is established is the intersection — and the fact that it was never meaningfully investigated by mainstream institutions.",
  },
];

// ─── DATA: QUANTUM REALITY ───────────────────────────────────
type QuantumPoint = { type: "DOCUMENTED" | "OBSERVED PATTERN"; title: string; text: string };
type QuantumEntry = {
  id: string;
  name: string;
  subtitle: string;
  concept: string;
  points: QuantumPoint[];
  application: string;
};

const QUANTUM: QuantumEntry[] = [
  {
    id: "nonlocal",
    name: "The Universe Is Not Locally Real",
    subtitle: "2022 Nobel Prize in Physics · Aspect, Clauser, Zeilinger",
    concept:
      "The 2022 Nobel Prize in Physics was awarded for experimentally proving that the universe violates 'local realism' — the foundational assumption of classical physics that objects have definite properties independent of observation, and that no influence travels faster than light. The experiments confirmed quantum entanglement at scale: two particles, separated by any distance, instantly share correlated states when one is measured.",
    points: [
      { type: "DOCUMENTED", title: "What the Nobel Experiments Proved", text: "The Bell inequality violation experiments — conducted over decades and awarded the 2022 Nobel — prove that no 'hidden variable' theory can explain quantum correlations. The universe does not operate on the classical model of separate objects with fixed properties existing at fixed locations." },
      { type: "DOCUMENTED", title: "What 'Non-Local' Means in Plain Terms", text: "Local realism assumes two things: (1) objects have definite properties whether or not they are observed, and (2) nothing influences anything else faster than light. Quantum mechanics violates both. Einstein called this 'spooky action at a distance' and spent his career rejecting it. The Nobel experiments confirmed it is real." },
      { type: "DOCUMENTED", title: "The End of Mechanistic Materialism", text: "The 2022 Nobel Prize commentary by physicist Igor Salom (Belgrade University) states directly that the underlying findings represent 'revolutionary changes in our worldview... eventually acknowledged by the Nobel committee.' The machine-universe model of classical physics is formally over — not as philosophy, but as physics." },
      { type: "OBSERVED PATTERN", title: "Why This Hasn't Reached Public Discourse", text: "The 2022 Nobel Prize proved the universe is not locally real. This finding has received almost no coverage in mainstream media relative to its significance. The implications — for consciousness, identity, free will, and the nature of existence — are extraordinary." },
    ],
    application:
      "If the separation between particles is not fundamental — if two particles once connected remain correlated regardless of distance — then the model of reality as a collection of separate, independent objects is incorrect at the most basic physical level. What practical use can be made of that understanding is one of the questions Soul True exists to explore.",
  },
  {
    id: "doubleslit",
    name: "The Double-Slit Experiment",
    subtitle: "The Most Consequential Experiment in the History of Science",
    concept:
      "Fire a single electron at a barrier with two slits. Without any attempt to detect which slit it passes through, the electron creates an interference pattern on the detector screen — behaving as a wave passing through both slits simultaneously. Place a detector at the slits to observe which one the electron passes through — and the interference pattern vanishes. The act of obtaining information about the electron's path changes its physical behavior.",
    points: [
      { type: "DOCUMENTED", title: "The Core Finding", text: "The double-slit experiment has been replicated thousands of times with electrons, photons, atoms, and molecules. The result is always the same: the system behaves differently when it is being measured than when it is not. The act of knowing the path is what matters." },
      { type: "DOCUMENTED", title: "The Delayed Choice Experiment", text: "John Wheeler's delayed-choice experiment — confirmed experimentally in 2007 at the Australian National University — showed that a decision made after a photon has already traveled whether to observe its path retroactively determines whether interference occurred." },
      { type: "DOCUMENTED", title: "Max Planck's Conclusion", text: "Max Planck — the founder of quantum theory and a Nobel laureate — stated: 'I regard consciousness as fundamental. I regard matter as derivative from consciousness. We cannot get behind consciousness. Everything we talk about, everything we regard as existing, postulates consciousness.'" },
      { type: "OBSERVED PATTERN", title: "The Observer Effect and Its Implications", text: "Physics has established that information about a system — the act of knowing — changes the physical behavior of that system. The implication that consciousness and physical reality are not entirely separate domains is held by a significant number of physicists, including multiple Nobel laureates." },
    ],
    application:
      "The double-slit experiment establishes that at the quantum level, reality behaves differently depending on whether it is being observed. The Institute of Noetic Sciences, the Princeton PEAR Lab, and others have published peer-reviewed studies on the relationship between human intention and physical systems. Their findings are contested by mainstream physics. They are not dismissed by it.",
  },
  {
    id: "consciousness",
    name: "Consciousness — Not Produced by the Brain",
    subtitle: "The Hard Problem · NDE Research · Quantum Mind Theory",
    concept:
      "The 'hard problem of consciousness' — identified by philosopher David Chalmers in 1995 — is the question of why and how physical processes in the brain give rise to subjective experience. No materialist theory has solved it. Simultaneously, a significant body of peer-reviewed research on near-death experiences has documented cases of verified accurate perception during periods of clinical death — when the brain shows zero measurable electrical activity.",
    points: [
      { type: "DOCUMENTED", title: "The Van Lommel NDE Study", text: "Dr. Pim van Lommel's prospective study of 344 cardiac arrest patients — published in The Lancet in 2001 — found that 18% reported near-death experiences. Several reported verified accurate perceptions of events occurring during periods of confirmed flat EEG — zero measurable brain activity." },
      { type: "DOCUMENTED", title: "The Penrose-Hameroff Model (Orch-OR)", text: "Physicist Roger Penrose (Nobel Prize, Physics, 2020) and anesthesiologist Stuart Hameroff proposed that consciousness arises from quantum computations within protein structures (microtubules) inside neurons. In 2023, physicists at Trinity College Dublin published evidence of quantum vibrations in microtubules consistent with the Orch-OR model." },
      { type: "DOCUMENTED", title: "The PEAR Lab Results", text: "Princeton University's Engineering Anomalies Research (PEAR) Laboratory operated for 28 years under Dr. Robert Jahn. Their published research documented statistically significant effects of human intention on physical random number generators — effects reproducible across operators, non-local in nature, and not explainable by known physical mechanisms. Effect sizes reported were extremely small, independent replication has been mixed, and the lab closed in 2007. These findings are interesting but remain contested." },
      { type: "OBSERVED PATTERN", title: "Why This Research Is Marginalized", text: "Near-death experience research, quantum consciousness models, and human intention studies are not rejected by mainstream science because they lack data. They are marginalized because their implications — that consciousness may be non-local and not brain-dependent — conflict with the materialist framework that dominates academic institutions." },
    ],
    application:
      "If consciousness is not produced by the brain — if it exists independently of and prior to physical processes — then the identity you carry is not your body, your history, or your circumstances. Multiple traditions and an emerging body of scientific research suggest that the relationship between consciousness and physical reality is far more dynamic than the materialist model allows.",
  },
  {
    id: "simulation",
    name: "The Simulation Question & Information-Based Reality",
    subtitle: "Max Planck · Nick Bostrom · Quantum Information Theory",
    concept:
      "Quantum mechanics shows that particles do not have definite positions or properties until measured — they exist as probability distributions that 'collapse' into specific values upon observation. Reality appears to resolve into definite states only where and when it is observed. Multiple physicists have noted that this behavior has structural similarities to computational rendering — a system that processes information on demand rather than maintaining all states simultaneously.",
    points: [
      { type: "DOCUMENTED", title: "John Wheeler's 'It from Bit'", text: "Physicist John Wheeler — who coined the term 'black hole' — proposed in his later work that the universe is fundamentally informational. He called the concept 'it from bit': every physical thing derives its existence from information." },
      { type: "DOCUMENTED", title: "The Holographic Principle", text: "The holographic principle — developed by physicists Gerard 't Hooft and Leonard Susskind and supported by string theory research — proposes that the information content of a volume of space is encoded on its boundary surface, not in its interior. The three-dimensional universe may be a projection of two-dimensional information." },
      { type: "DOCUMENTED", title: "Nick Bostrom's Simulation Argument", text: "Oxford philosopher Nick Bostrom published a formal mathematical argument in Philosophical Quarterly (2003) concluding that at least one of three propositions must be true: civilizations almost never reach the capability to run simulations; civilizations that reach that capability almost never run them; or virtually all conscious beings that will ever exist are in simulations." },
      { type: "OBSERVED PATTERN", title: "Convergence of Physics and Ancient Description", text: "Quantum mechanics describes reality as: consciousness-dependent, non-local, information-based, and not independently existent prior to observation. Ancient Hindu philosophy describes reality as Maya — a projection of consciousness. Ancient Buddhist philosophy describes phenomena as empty of inherent existence. The convergence is a pattern worth examining." },
    ],
    application:
      "Whether reality is literally a computational simulation or simply behaves like one at the quantum level is an open question. What is not open is that reality is information-based and observer-dependent. The practical implication — that what you direct your attention toward and how you engage with reality as a participant rather than a passenger may have real effects — is supported by quantum mechanics in principle and by intention research in practice.",
  },
  {
    id: "convergence",
    name: "What This Means — The Practical Application",
    subtitle: "From Physics to Personal Inquiry",
    concept:
      "Quantum mechanics has experimentally proven four things that directly challenge the narrative of human powerlessness: reality is non-local (separation is not fundamental), consciousness-dependent (observation participates in creating definite reality), information-based (matter is derivative of information), and non-deterministic (the future is not fixed).",
    points: [
      { type: "OBSERVED PATTERN", title: "Separation Is Not Fundamental", text: "Quantum non-locality proves that the appearance of separation between objects — and between people — is not the deepest description of reality. Every major contemplative and mystical tradition has made this same claim through different language. Physics now makes it through mathematics." },
      { type: "OBSERVED PATTERN", title: "Your Observation Participates in Reality", text: "The observer effect establishes that the act of obtaining information about a system changes that system's physical behavior. This is not a metaphor. It is a repeatable, documented experimental result." },
      { type: "OBSERVED PATTERN", title: "Intention Research Findings", text: "The PEAR Lab's 28 years of published research documented non-local effects of human intention on physical random systems. The Institute of Noetic Sciences has published similar findings. These results are contested but not refuted." },
      { type: "OBSERVED PATTERN", title: "The Control Narrative Requires a Specific Model of Reality", text: "Every system designed to limit human potential requires its subjects to believe they are powerless — that they are material beings in a mechanical universe, subject to forces they cannot affect. Quantum mechanics has disproven that model of reality at the most fundamental level." },
    ],
    application:
      "Understanding quantum reality is not the destination. It is the beginning of a different relationship with your own existence. If reality is participatory, non-local, and consciousness-dependent — then the question of how to work with those properties in daily life is one of the most important questions a human being can ask. That is what Soul True is here to explore.",
  },
];

// ─── SHARED UI ───────────────────────────────────────────────
function FactItem({ label, text }: Fact) {
  return (
    <div className="mb-3 flex items-start gap-3">
      <span
        className="mt-[3px] flex-shrink-0 whitespace-nowrap px-2 py-[3px] text-[9px] uppercase tracking-[0.18em]"
        style={{ ...label === "DOCUMENTED" ? { color: T.gold, border: `1px solid ${T.goldSoft}` } : { color: T.bone, border: `1px solid rgba(232,228,218,0.35)` }, ...labelFont }}
      >
        {label}
      </span>
      <p className="text-[13px] leading-[1.7]" style={{ color: T.bone, ...body }}>{text}</p>
    </div>
  );
}

const labelFont = { fontFamily: "'Inter', sans-serif", fontWeight: 500 };

function ObservationBox({ text }: { text: string }) {
  return (
    <div className="mt-5 px-5 py-4" style={{ borderLeft: `2px solid ${T.gold}`, background: "rgba(212,175,100,0.04)" }}>
      <div className="mb-2 text-[9px] uppercase tracking-[0.25em]" style={{ color: T.gold, ...labelFont }}>
        Observed Pattern
      </div>
      <p className="text-[13px] leading-[1.7]" style={{ color: T.bone, ...body }}>{text}</p>
    </div>
  );
}

function ApplicationBox({ text }: { text: string }) {
  return (
    <div className="mx-7 mb-7 px-5 py-4" style={{ borderLeft: `2px solid ${T.forest}`, background: "rgba(45,90,61,0.08)" }}>
      <div className="mb-2 text-[9px] uppercase tracking-[0.25em]" style={{ color: "#7BAE8A", ...labelFont }}>
        Practical Application
      </div>
      <p className="text-[13px] leading-[1.7]" style={{ color: T.bone, ...body }}>{text}</p>
    </div>
  );
}

function AccordionCard({ entry }: { entry: Entry }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="mb-[2px] transition-colors"
      style={{
        background: T.surface,
        borderTop: open ? `1px solid ${T.gold}` : `1px solid ${T.borderSoft}`,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="text-[1.1rem] leading-tight" style={{ ...heading, color: T.cream }}>
            {entry.name}
          </div>
          <div className="mt-1 truncate text-[10.5px] uppercase tracking-[0.16em]" style={{ color: T.muted, ...labelFont }}>
            {entry.subtitle}
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-3">
          <span
            className="hidden whitespace-nowrap px-2 py-[3px] text-[9px] uppercase tracking-[0.18em] sm:inline-block"
            style={{ color: T.gold, border: `1px solid ${T.goldSoft}`, ...labelFont }}
          >
            {entry.statusLabel}
          </span>
          <span
            className="text-base transition-transform"
            style={{ color: T.gold, transform: open ? "rotate(90deg)" : "none" }}
          >
            ▸
          </span>
        </div>
      </button>
      {open && (
        <div style={{ borderTop: `1px solid ${T.borderSoft}` }} className="px-6 py-6">
          <p className="mb-5 text-[14px] leading-[1.75]" style={{ color: T.bone, ...body }}>{entry.intro}</p>
          <div className="mb-2">
            {entry.facts.map((f, i) => (
              <FactItem key={i} label={f.label} text={f.text} />
            ))}
          </div>
          <ObservationBox text={entry.observation} />
        </div>
      )}
    </div>
  );
}

function SectionIntro({ eyebrow, title, accent, children }: { eyebrow: string; title: React.ReactNode; accent: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl">
      <div className="mb-3 text-[10px] uppercase tracking-[0.32em]" style={{ color: T.gold, ...labelFont }}>{eyebrow}</div>
      <h2 className="mb-4 text-[1.9rem] leading-[1.15] md:text-[2.4rem]" style={{ ...heading, color: T.cream }}>
        {title}
      </h2>
      <div style={{ background: "rgba(212,175,100,0.04)", borderLeft: `2px solid ${accent}` }} className="px-4 py-3 text-[13px] leading-[1.7]" >
        <span style={{ color: T.bone, ...body }}>{children}</span>
      </div>
    </div>
  );
}

// ─── TAB SECTIONS ────────────────────────────────────────────
function SecretSocieties() {
  return (
    <div className="px-5 py-12 md:px-10">
      <SectionIntro
        eyebrow="Networks of Power"
        accent={T.gold}
        title={<>Coordination <em style={{ color: T.gold, fontStyle: "italic" }}>Outside Public Accountability</em></>}
      >
        Elite coordination through private networks is not a theory — it is a documented feature of how power has operated throughout modern history. Content is labeled throughout: <strong style={{ color: T.cream }}>Documented</strong> means confirmed by official records, court documents, or primary published sources. <strong style={{ color: T.cream }}>Observed Pattern</strong> means an inference drawn from documented facts.
      </SectionIntro>
      <div className="mx-auto max-w-4xl">
        {SOCIETIES.map((s) => <AccordionCard key={s.id} entry={s} />)}
      </div>
    </div>
  );
}

function ControlDocumented() {
  return (
    <div className="px-5 py-12 md:px-10">
      <SectionIntro
        eyebrow="The Public Record"
        accent={T.gold}
        title={<>Documented <em style={{ color: T.gold, fontStyle: "italic" }}>Events &amp; Patterns</em></>}
      >
        These are not allegations. They are documented by Congressional testimony, court records, primary documents, and confirmed by official investigations. Same labeling applies throughout.
      </SectionIntro>
      <div className="mx-auto max-w-4xl">
        {CONTROL_EVENTS.map((e) => <AccordionCard key={e.id} entry={e} />)}
      </div>
    </div>
  );
}

function QuantumReality() {
  return (
    <div className="px-5 py-12 md:px-10">
      <SectionIntro
        eyebrow="What Physics Actually Shows"
        accent={T.gold}
        title={<>The End of <em style={{ color: T.gold, fontStyle: "italic" }}>Mechanistic Materialism</em></>}
      >
        The 2022 Nobel Prize in Physics was awarded for proving the universe is not locally real. That finding — the most significant in physics in a century — received almost no coverage of its implications. This section presents what the physics shows, what researchers have concluded, and what practical use might be made of that understanding.
      </SectionIntro>

      <div className="mx-auto mb-10 grid max-w-4xl grid-cols-2 gap-[2px] md:grid-cols-4">
        {[
          ["2022", "Nobel Prize\nConfirmed Non-Locality"],
          ["100+", "Years Physics Has\nKnown This Is Real"],
          ["0", "Mainstream Coverage\nOf The Implications"],
          ["∞", "Implications For\nHuman Potential"],
        ].map(([n, l]) => (
          <div key={n} className="px-3 py-5 text-center" style={{ background: T.surface, borderTop: `1px solid ${T.gold}` }}>
            <div className="text-[1.9rem] leading-none" style={{ ...heading, color: T.gold }}>{n}</div>
            <div className="mt-2 whitespace-pre-line text-[10px] uppercase leading-[1.4] tracking-[0.12em]" style={{ color: T.muted, ...labelFont }}>{l}</div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-4xl">
        {QUANTUM.map((q) => (
          <div key={q.id} className="mb-[2px]" style={{ background: T.surface, borderTop: `1px solid ${T.gold}` }}>
            <div className="px-7 pt-7">
              <h3 className="text-[1.25rem] leading-tight" style={{ ...heading, color: T.cream }}>{q.name}</h3>
              <div className="mt-1 text-[10.5px] uppercase tracking-[0.16em]" style={{ color: T.gold, ...labelFont }}>{q.subtitle}</div>
              <p className="mt-4 mb-5 text-[14px] leading-[1.75]" style={{ color: T.bone, ...body }}>{q.concept}</p>
              <div className="mb-5 grid grid-cols-1 gap-[2px] md:grid-cols-2">
                {q.points.map((p, i) => (
                  <div key={i} className="px-4 py-4" style={{ background: T.bg, borderLeft: `2px solid ${p.type === "DOCUMENTED" ? T.gold : "rgba(232,228,218,0.4)"}` }}>
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="px-[6px] py-[2px] text-[8.5px] uppercase tracking-[0.18em]"
                        style={p.type === "DOCUMENTED"
                          ? { color: T.gold, border: `1px solid ${T.goldSoft}`, ...labelFont }
                          : { color: T.bone, border: `1px solid rgba(232,228,218,0.35)`, ...labelFont }}
                      >
                        {p.type}
                      </span>
                      <span className="text-[12.5px]" style={{ ...heading, color: T.cream }}>{p.title}</span>
                    </div>
                    <p className="text-[12.5px] leading-[1.65]" style={{ color: T.bone, ...body }}>{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <ApplicationBox text={q.application} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────
function HiddenTruthPage() {
  const [tab, setTab] = useState<"societies" | "control" | "quantum">("societies");
  const tabs = [
    { id: "societies" as const, label: "Secret Societies" },
    { id: "control" as const, label: "Documented Events" },
    { id: "quantum" as const, label: "Quantum Reality" },
  ];

  return (
    <div className="min-h-screen" style={{ background: T.bg, color: T.bone }}>
      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-24 text-center md:py-32" style={{ background: T.surface }}>
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 text-[10px] uppercase tracking-[0.4em]" style={{ color: T.gold, ...labelFont }}>
            Soul True · Hidden Truth
          </div>
          <h1 className="mb-6 text-[2.4rem] leading-[1.05] md:text-[4rem]" style={{ ...heading, color: T.cream }}>
            Who Runs the World <br />
            <em style={{ color: T.gold, fontStyle: "italic" }}>and What Is Reality</em>
          </h1>
          <p className="mb-10 text-[11px] uppercase tracking-[0.28em]" style={{ color: T.muted, ...labelFont }}>
            Secret Societies · Documented Events · Quantum Truth
          </p>
          <div className="mx-auto max-w-2xl px-6 text-left text-[14.5px] leading-[1.85]" style={{ color: T.bone, ...body, borderLeft: `1px solid ${T.goldSoft}` }}>
            This section covers two questions. <em>First:</em> who coordinates power outside of public accountability, and what does the documented record show about how that coordination operates. <em>Second:</em> what does the most precise science ever developed — quantum mechanics — reveal about the actual nature of reality, and what practical use can be made of that understanding.
            <div className="mt-5" style={{ color: T.cream }}>
              Everything presented here is clearly labeled as either documented fact or observed pattern. No claims are made beyond what the evidence supports.
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-6">
            {[
              ["1776", "Illuminati Founded\nHistorically Confirmed"],
              ["2022", "Nobel Prize Proved\nReality Is Non-Local"],
              ["33", "Masonic Degrees\nUpper Tiers Undisclosed"],
              ["2019", "Epstein Died in Custody\nCamera Failed · Guards Slept"],
            ].map(([n, l]) => (
              <div key={n} className="text-center">
                <div className="text-[1.9rem] leading-none" style={{ ...heading, color: T.gold }}>{n}</div>
                <div className="mt-2 whitespace-pre-line text-[10px] uppercase leading-[1.4] tracking-[0.12em]" style={{ color: T.muted, ...labelFont }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TAB NAV */}
      <div
        className="sticky top-[73px] z-30 flex justify-center overflow-x-auto"
        style={{ background: T.bg, borderBottom: `1px solid ${T.borderSoft}` }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="whitespace-nowrap px-6 py-5 text-[11px] uppercase tracking-[0.22em] transition-colors"
            style={{
              color: tab === t.id ? T.gold : T.muted,
              borderBottom: tab === t.id ? `1px solid ${T.gold}` : "1px solid transparent",
              ...labelFont,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div key={tab}>
        {tab === "societies" && <SecretSocieties />}
        {tab === "control" && <ControlDocumented />}
        {tab === "quantum" && <QuantumReality />}
      </div>

      {/* CONVERGENCE FOOTER */}
      <section className="px-6 py-20 text-center" style={{ background: T.surface, borderTop: `1px solid ${T.goldSoft}` }}>
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 text-[10px] uppercase tracking-[0.32em]" style={{ color: T.gold, ...labelFont }}>The Convergence</div>
          <h2 className="mb-12 text-[2rem] md:text-[2.6rem]" style={{ ...heading, color: T.cream }}>
            When the <em style={{ color: T.gold, fontStyle: "italic" }}>documented record</em> points in the same direction
          </h2>
          <div className="mb-12 grid grid-cols-1 gap-6 text-left md:grid-cols-2">
            {[
              { title: "Ancient History Shows", text: "A prior civilization existed and was erased from the official record. The suppression of human history did not begin yesterday." },
              { title: "Documented Networks Show", text: "Elite coordination operates through private organizations — some secret, some open — that operate outside democratic accountability and have placed their members in the key positions of Western power for generations." },
              { title: "Quantum Mechanics Shows", text: "Reality is non-local, consciousness-dependent, and participatory. The model of the powerless individual in a mechanical universe has been formally disproven by the most precise science ever developed." },
              { title: "What This Suggests", text: "When the documented facts across history, power, and physics all point in the same direction — toward a reality that is more connected, more conscious, and more malleable than official narratives allow — that convergence is worth taking seriously." },
            ].map((item) => (
              <div key={item.title} className="px-5 py-4" style={{ borderLeft: `1px solid ${T.goldSoft}` }}>
                <div className="mb-2 text-[1rem]" style={{ ...heading, color: T.cream }}>{item.title}</div>
                <p className="text-[13.5px] leading-[1.7]" style={{ color: T.bone, ...body }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-2xl pt-8 text-[14px] leading-[1.85]" style={{ color: T.bone, ...body, borderTop: `1px solid ${T.borderSoft}` }}>
            The purpose of this section is not to tell you what to conclude. It is to put in front of you what is documented, what the patterns suggest, and what the physics shows — and trust that an informed person can draw their own conclusions. <span style={{ color: T.cream }}>That trust in the reader is what makes Soul True different.</span>
          </div>
          <p className="mx-auto mt-10 max-w-xl text-[11px] leading-[1.7]" style={{ color: T.muted, ...body }}>
            For educational and inspirational purposes only. Soul True does not provide medical advice, diagnosis, treatment, or cure for any condition.
          </p>
        </div>
      </section>
    </div>
  );
}
