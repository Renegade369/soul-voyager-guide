import { useState, useRef, useEffect } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────
const T = {
  void: "#040404", stone: "#111111", stone2: "#0d0d0d",
  gold: "#c8a94a", goldBright: "#f0d060", amber: "#e07020",
  ocean: "#00c8ff", green: "#3a9a50", purple: "#9a6aaa",
  blood: "#8b1a1a", ash: "#888888", bone: "#d4c9a8", white: "#f0ece0",
  teal: "#8b6e3a", rose: "#9a4a6a",
};

// ─── ERA DEFINITIONS ─────────────────────────────────────────
const ERAS = [
  { id: "intervention", label: "Deep Prehistory — Open Questions", color: T.purple, range: "450,000 – 200,000 BC" },
  { id: "lemuria", label: "Lemuria & Early Civilization", color: T.teal, range: "100,000 – 50,000 BC" },
  { id: "atlantis", label: "The Atlantean Age", color: T.ocean, range: "50,000 – 9,600 BC" },
  { id: "flood", label: "The Great Catastrophe", color: T.blood, range: "10,900 – 9,600 BC" },
  { id: "recovery", label: "Post-Flood Recovery", color: T.amber, range: "9,600 – 3,000 BC" },
  { id: "suppression", label: "The Age of Suppression", color: T.gold, range: "3,000 BC – Present" },
];

// ─── TIMELINE EVENTS ─────────────────────────────────────────
const EVENTS = [
  // ── INTERVENTION ERA ──────────────────────────────────────
  {
    id: "anunnaki-arrival",
    era: "intervention",
    date: "~3,000 – 1,700 BC (texts written) · Events claimed much earlier",
    sortKey: -450000,
    title: "The Anunnaki — What the Sumerian Texts Actually Say",
    subtitle: "Sumerian Cuneiform Records · Enuma Elish · Atrahasis Epic · One Researcher's Interpretation",
    symbol: "🌟",
    color: T.purple,
    category: "ANCIENT TEXTS",
    summary: "The Sumerian texts — among the oldest written records on Earth — describe beings called the Anunnaki in consistent detail across thousands of years of scribal tradition. The Atrahasis Epic describes the creation of humans to perform labor. The Enuma Elish describes cosmic events preceding the formation of Earth. The Sumerian King List records rulers with extraordinarily long reigns before a great flood. These texts are real, ancient, and remarkable. What they mean is genuinely contested.",
    evidence: [
      { type: "DOCUMENTED", text: "The Sumerian Atrahasis Epic — dated to approximately 1,700 BC but believed to draw on much older oral tradition — describes the creation of humans to relieve the Anunnaki of labor. It states: 'Let a human being be created, that he may bear the yoke.' This is one of the oldest written accounts of human origins." },
      { type: "DOCUMENTED", text: "The Sumerian King List, dated to approximately 2,100 BC, records kings ruling before a great flood for periods ranging from 18,000 to 43,200 years. After the flood, reign lengths drop to human-scale durations. The document is real and widely studied by mainstream scholars." },
      { type: "DOCUMENTED", text: "The Akkadian term Anunnaki appears consistently across Sumerian, Akkadian, and Babylonian texts over approximately 1,500 years of written tradition — described as powerful beings associated with the sky, earth, and underworld." },
      { type: "ONE RESEARCHER'S INTERPRETATION", text: "Zecharia Sitchin argued in The 12th Planet (1976) that the Anunnaki were physical extraterrestrials from a planet called Nibiru who genetically engineered Homo sapiens approximately 450,000 years ago. This interpretation is not accepted by mainstream Sumerologists, several of whom have published detailed critiques arguing that Sitchin's translations contain significant errors. His work is influential but contested." },
      { type: "OBSERVED PATTERN", text: "The Sumerian texts make no stylistic distinction between accounts of kings and trade — which mainstream scholars treat as historical — and accounts of the Anunnaki. Why certain parts of the same documents are treated as history and others as myth is a question worth examining." },
    ],
    researcher: "Mainstream Sumerology: Thorkild Jacobsen · Samuel Noah Kramer · Alternative interpretation: Zecharia Sitchin (contested)",
    observation: "The Sumerian texts are extraordinary documents regardless of interpretation. They describe a great flood, a creation of humanity, and beings of enormous power operating on Earth — in accounts that predate Genesis by over a thousand years. Whether those descriptions are allegory, mythology, or history is a question each reader must weigh against the evidence available to them. Soul True presents what the texts say and notes where interpretation begins.",
  },
  {
    id: "gold-mining",
    era: "intervention",
    date: "~300,000 – 100,000 BC",
    sortKey: -300000,
    title: "Ancient Gold Mines of Africa — A Genuine Anomaly",
    subtitle: "South African Archaeological Evidence · Genetic Bottleneck · Open Questions",
    symbol: "⛏",
    color: T.purple,
    category: "ARCHAEOLOGICAL",
    summary: "Very ancient mining operations in South Africa represent one of the genuine unsolved puzzles of human prehistory. Simultaneously, the human genetic record shows a severe bottleneck approximately 200,000-300,000 years ago — a period when the human population may have dropped to a few thousand breeding individuals. These are documented facts. What they mean remains genuinely open.",
    evidence: [
      { type: "DOCUMENTED", text: "Ancient stone-walled structures and mining operations in the Mpumalanga region of South Africa have been studied by multiple researchers. Optically stimulated luminescence dating of some sites suggests activity in the range of 100,000-300,000 years ago. The dating methodology is accepted by mainstream archaeology; the interpretation of the sites is debated." },
      { type: "DOCUMENTED", text: "The human genome shows a severe population bottleneck between approximately 200,000-300,000 years ago — confirmed by multiple independent genetic studies including research published in the American Journal of Human Genetics (2010). The cause of this bottleneck is not definitively established." },
      { type: "DOCUMENTED", text: "Africa is consistently identified by genetic research as the origin point of anatomically modern Homo sapiens, with the oldest confirmed fossil evidence dating to approximately 300,000 years ago (Jebel Irhoud, Morocco — published in Nature, 2017)." },
      { type: "CORRECTION", text: "A widely circulated claim states that 223 human genes have no evolutionary precursors — presented as evidence of genetic intervention. This originated from a 2001 paper in Nature that suggested horizontal gene transfer from bacteria as the explanation — not extraterrestrial modification. Subsequent research has revised the gene count significantly downward. This claim should not be presented as evidence of intervention." },
      { type: "OBSERVED PATTERN", text: "The proximity of ancient mining operations in southern Africa to the period of the human genetic bottleneck and the emergence of anatomically modern humans is noted by several researchers as potentially significant. It does not constitute evidence of intervention — but it is a convergence that mainstream archaeology has not fully addressed." },
    ],
    researcher: "Michael Tellinger (alternative interpretation) · Mainstream genetics: Sarah Tishkoff · Svante Pääbo",
    observation: "The ancient mines of South Africa and the human genetic bottleneck are real documented phenomena. The connection between them and the Sumerian accounts of the Anunnaki is a hypothesis — a plausible one that some researchers find compelling, but a hypothesis nonetheless. Soul True presents the documented facts and notes where the interpretive leap begins.",
  },
  {
    id: "homo-sapiens",
    era: "intervention",
    date: "~300,000 – 200,000 BC",
    sortKey: -200000,
    title: "The Anomalous Emergence of Homo Sapiens",
    subtitle: "Documented Genetic Puzzles · Unanswered Questions · No Settled Explanation",
    symbol: "🧬",
    color: T.purple,
    category: "GENETIC EVIDENCE",
    summary: "Anatomically modern Homo sapiens emerged approximately 200,000-300,000 years ago with cognitive capabilities — abstract reasoning, language, symbolic thought — that appear more abruptly in the fossil and genetic record than standard gradual evolutionary models predict. Several specific genetic features of Homo sapiens remain subjects of active research and genuine scientific debate. These are real puzzles — not proof of intervention, but open questions that mainstream science has not fully closed.",
    evidence: [
      { type: "DOCUMENTED", text: "Mitochondrial Eve — the most recent common female ancestor of all living humans — is dated to approximately 150,000-200,000 years ago. The relative speed of Homo sapiens' cognitive emergence compared to prior hominid evolution is acknowledged as requiring explanation within evolutionary biology." },
      { type: "DOCUMENTED", text: "Human chromosome 2 shows clear evidence of an ancient fusion of two ancestral chromosomes — confirmed by genetic analysis. All other great apes have 48 chromosomes; humans have 46. This fusion is documented and accepted by mainstream genetics. It occurred in a common ancestor through a natural chromosomal rearrangement — not through deliberate modification. It is evidence of our relationship to other primates, not evidence of intervention." },
      { type: "DOCUMENTED", text: "The human brain is metabolically expensive — consuming approximately 20% of the body's energy despite representing only 2% of body mass. Its rapid expansion in the hominid lineage over the past 2-3 million years is one of the most studied questions in evolutionary biology. No single explanation is universally accepted." },
      { type: "DOCUMENTED", text: "Michael Cremo's Forbidden Archaeology (1993) documents numerous archaeological finds — tools, bones, and artifacts — found in geological strata that would predate the official emergence of modern humans. Mainstream archaeology disputes the dating methodology of many of these finds. The book documents a genuine pattern of anomalous discoveries that deserve examination regardless of the interpretive framework applied." },
      { type: "OBSERVED PATTERN", text: "The combination of a relatively abrupt cognitive emergence, a severe genetic bottleneck, and ancient texts from multiple cultures describing the deliberate creation of humanity leads some researchers to propose an intervention hypothesis. This is a hypothesis — not an established conclusion. The anomalies it attempts to explain are real. The explanation remains unproven." },
    ],
    researcher: "Mainstream: Svante Pääbo (Nobel Prize, Genetics 2022) · Alternative: Lloyd Pye · Michael Cremo",
    observation: "The honest position on human origins is that several genuine puzzles remain unresolved within standard evolutionary theory. That does not mean the answer is extraterrestrial intervention — it means the question is not fully closed. Soul True presents the open questions accurately and notes where different researchers land. The questions themselves are extraordinary enough without overstating what the evidence supports.",
  },

  // ── LEMURIA ──────────────────────────────────────────────
  {
    id: "lemuria-civilization",
    era: "lemuria",
    date: "~100,000 – 50,000 BC",
    sortKey: -100000,
    title: "Lemuria — The Pacific Civilization",
    subtitle: "James Churchward · Pacific Oral Traditions · Geological Evidence",
    symbol: "🌊",
    color: T.teal,
    category: "GEOLOGICAL & TEXTUAL",
    summary: "Lemuria — also called Mu — is the name given to a proposed ancient civilization or landmass in the Pacific Ocean. The concept originated in 19th century geology as an explanation for species distribution anomalies, and was later developed into a full civilization theory by James Churchward. What is genuinely documented: significant Pacific landmasses existed during periods of lower sea levels, Pacific island cultures share striking similarities across vast distances, and multiple populations carry oral traditions of a lost homeland. Whether these facts point to a single advanced civilization is an open question — not an established conclusion.",
    evidence: [
      { type: "UNVERIFIED SOURCE", text: "James Churchward claimed in a four-volume series (1926-1931) to have studied ancient 'Naacal tablets' in Indian temples describing a Pacific civilization called Mu. These tablets have never been independently located, verified, or examined by any other researcher. Most scholars consider them unverified at best. Churchward's work should be read as a hypothesis, not as documented evidence." },
      { type: "DOCUMENTED", text: "Pacific island populations — Hawaiian, Polynesian, Maori, and Easter Island cultures — share similar oral traditions describing a lost homeland, similar astronomical knowledge, and similar megalithic construction techniques despite being separated by thousands of miles of ocean. This pattern of similarity is real and documented by mainstream anthropology." },
      { type: "DOCUMENTED", text: "Genetic research published in Nature (2020) confirmed that Polynesian populations made contact with South American populations approximately 1,200 years ago — long before European exploration. The Pacific was navigated more extensively in antiquity than mainstream history has traditionally acknowledged." },
      { type: "DOCUMENTED", text: "Sea levels were significantly lower during the last ice age — exposing large areas of Pacific continental shelf that are now submerged. Human populations in the Pacific would have inhabited coastal areas now underwater. This is geological fact, not hypothesis." },
      { type: "OBSERVED PATTERN", text: "The combination of shared Pacific cultural traditions, documented transoceanic contact, submerged landmasses, and unexplained megalithic sites leads some researchers to propose a common source civilization. This is a reasonable hypothesis given the evidence — but the specific name Lemuria and the detailed civilization described by Churchward go beyond what the documented evidence currently supports." },
    ],
    researcher: "James Churchward (unverified primary source) · Thor Heyerdahl · Graham Hancock",
    observation: "Something connected the Pacific world in deep prehistory — the genetic evidence, the cultural parallels, and the megalithic sites all point toward more contact and more complexity than the standard model acknowledges. Whether that something was a named civilization called Lemuria, or simply a broader and older maritime culture than we credit, is a question the evidence invites but does not yet answer.",
  },
  {
    id: "pacific-megaliths",
    era: "lemuria",
    date: "~50,000 – 10,000 BC",
    sortKey: -50000,
    title: "Pacific Megalithic Network",
    subtitle: "Nan Madol · Pohnpei · Easter Island · Shared Construction Knowledge",
    symbol: "🗿",
    color: T.teal,
    category: "ARCHAEOLOGICAL",
    summary: "A network of megalithic construction sites exists across the Pacific — separated by thousands of miles of open ocean — all showing similar engineering techniques, similar astronomical alignments, and similar artistic motifs. Nan Madol (Micronesia): 250 million tons of stone on a coral reef. Easter Island: 887 massive statues. The Polynesian stone platforms (Ahu). The Micronesian Latte stones. All built by island populations that supposedly had no contact with each other and no engineering tradition capable of explaining what they built.",
    evidence: [
      { type: "DOCUMENTED", text: "Nan Madol — 250 million tons of basalt columns on a coral reef in Micronesia — was built with no local quarry source. The engineering required to transport and place these stones across open ocean has no explanation within the acknowledged capabilities of the Saudeleur dynasty." },
      { type: "DOCUMENTED", text: "Genetic research (2020, Nature) confirmed that Polynesian populations made contact with South American populations approximately 1,200 years ago — well before European exploration. The mechanism of this contact across thousands of miles of open ocean implies navigational capability far exceeding what mainstream history credits to these cultures." },
      { type: "OBSERVED PATTERN", text: "The consistent pattern across Pacific megalithic sites — massive stones, astronomical alignment, ocean transport — suggests a shared engineering tradition that predates the individual island cultures and points toward a common source civilization that no longer exists above water." },
    ],
    researcher: "Thor Heyerdahl · Graham Hancock · Rand Flem-Ath",
    observation: "Thor Heyerdahl's Kon-Tiki expedition (1947) proved that transoceanic contact was physically possible with ancient technology. The 2020 genetic confirmation of Polynesian-South American contact proved it actually occurred. The Pacific was not an impassable barrier. It was a highway — for a civilization whose home port is now underwater.",
  },

  // ── ATLANTIS ─────────────────────────────────────────────
  {
    id: "atlantis-golden",
    era: "atlantis",
    date: "~50,000 – 12,000 BC",
    sortKey: -50000,
    title: "The Atlantean Golden Age",
    subtitle: "Plato's Timaeus & Critias · Edgar Cayce · Graham Hancock",
    symbol: "⚡",
    color: T.ocean,
    category: "TEXTUAL & GEOLOGICAL",
    summary: "Plato described Atlantis in precise, specific terms in his dialogues Timaeus and Critias (360 BC) — not as allegory but as a specific historical account transmitted through Egyptian priests to the Athenian statesman Solon approximately 150 years earlier. He gave its location (beyond the Pillars of Hercules — the Strait of Gibraltar), its size (larger than Libya and Asia combined), its political structure (a confederation of kings), its technological achievements, and its date of destruction (approximately 9,600 BC). This level of specificity is inconsistent with mythology.",
    evidence: [
      { type: "DOCUMENTED", text: "Plato's account gives the destruction of Atlantis as occurring '9,000 years before Solon' — placing it at approximately 9,600 BC. This date corresponds precisely with the end of the last ice age, the Younger Dryas impact event, and the global flooding events confirmed by geology." },
      { type: "DOCUMENTED", text: "Edgar Cayce — America's most documented psychic, with over 14,000 recorded readings — described Atlantis in consistent detail across hundreds of sessions over decades. He described an advanced civilization with energy technology, genetic experimentation, and a catastrophic destruction involving crystal energy devices. He predicted in 1940 that evidence of Atlantis would be found near Bimini in 1968 or 1969. The Bimini Road was discovered in 1968." },
      { type: "DOCUMENTED", text: "The mid-Atlantic Ridge — a massive volcanic mountain range running the length of the Atlantic Ocean — rises to above sea level at the Azores. Geological research has confirmed that portions of this ridge were above water during the last ice age. The Azorean plateau represents a potential remnant of a larger Atlantic landmass." },
      { type: "DOCUMENTED", text: "Identical pyramid structures exist on both sides of the Atlantic — in Egypt, Sudan, Mexico, Guatemala, Peru, Bolivia, and the Canary Islands. No acknowledged contact between these civilizations during their pyramid-building periods. The mainstream explanation is independent invention. An alternative explanation is a common source." },
      { type: "OBSERVED PATTERN", text: "The convergence of Plato's specific historical account, Cayce's corroborating descriptions, the geological evidence for Atlantic landmass instability at the end of the ice age, the Bimini Road discovery at the predicted location and time, and the global distribution of identical architectural and astronomical knowledge argues strongly for a real Atlantic civilization that was destroyed around 9,600 BC." },
    ],
    researcher: "Plato · Edgar Cayce · Graham Hancock · Ignatius Donnelly · Rand Flem-Ath",
    observation: "Ignatius Donnelly's Atlantis: The Antediluvian World (1882) documented over 30 cultural parallels between Old World and New World civilizations that have no explanation within the standard model of independent development. Graham Hancock's Fingerprints of the Gods (1995) updated and expanded this evidence with modern geological and archaeological data. Neither has been refuted within mainstream academia — they have simply been ignored.",
  },
  {
    id: "global-civilization",
    era: "atlantis",
    date: "~20,000 – 10,000 BC",
    sortKey: -20000,
    title: "Ancient Maps and the Question of Pre-Ice Age Navigation",
    subtitle: "Piri Reis Map · Hapgood's Analysis · Contested Interpretation",
    symbol: "🗺",
    color: T.ocean,
    category: "CONTESTED INTERPRETATION",
    summary: "The Piri Reis map (1513) and several other early modern maps have been cited as evidence of pre-ice age navigation capability — specifically as showing Antarctica's coastline before European discovery. This interpretation, developed by historian Charles Hapgood in the 1960s, is genuinely intriguing but is also genuinely contested by professional cartographers and historians. It is presented here as a contested claim worth examining — not as established evidence.",
    evidence: [
      { type: "DOCUMENTED", text: "The Piri Reis map was drawn by Ottoman admiral Piri Reis in 1513. He noted in marginalia that he compiled it from older source maps, including some he attributed to Christopher Columbus. The map is real, well-preserved, and held in the Topkapi Palace Museum in Istanbul." },
      { type: "DOCUMENTED", text: "Charles Hapgood — a history professor at Keene State College — published Maps of the Ancient Sea Kings in 1966, arguing that the Piri Reis map shows Antarctica's subglacial coastline with remarkable accuracy. He corresponded with Albert Einstein about his broader crustal displacement theory, though Einstein's endorsement was of that theory, not specifically the map analysis." },
      { type: "CONTESTED", text: "Professional cartographers including Gregory McIntosh have published detailed analyses arguing that Hapgood's identification of the southern landmass as Antarctica is incorrect — that the landmass is more likely a speculative extension of South America, common in maps of that era when cartographers filled unknown regions with hypothetical land. The 'accuracy' Hapgood identified has been disputed on methodological grounds." },
      { type: "DOCUMENTED", text: "Antarctica was not officially discovered until 1820. If the southern landmass on the Piri Reis map does represent Antarctica with genuine accuracy, the source data would have to predate the ice sheet — which has covered the continent for at least 6,000 years. This is the core of the claim and the core of the dispute." },
      { type: "OBSERVED PATTERN", text: "Whether or not the Piri Reis map shows Antarctica, the broader question it raises is legitimate: how much navigational and geographical knowledge existed in antiquity that has not survived? The answer to that question is almost certainly: more than we acknowledge." },
    ],
    researcher: "Charles Hapgood — Maps of the Ancient Sea Kings (1966) · Critique: Gregory McIntosh — The Piri Reis Map of 1513 (2000)",
    observation: "The Piri Reis map is presented here as a genuinely interesting open question — not as proof of a pre-ice age civilization. The cartographic dispute is real and has not been resolved in Hapgood's favor by mainstream scholarship. What is not in dispute is that ancient peoples navigated more extensively than the standard model acknowledges, and that significant geographic knowledge has been lost. The map is worth examining with that framing.",
  },

  // ── THE FLOOD ─────────────────────────────────────────────
  {
    id: "younger-dryas",
    era: "flood",
    date: "~10,900 BC",
    sortKey: -10900,
    title: "The Younger Dryas Impact Event",
    subtitle: "Peer-Reviewed 2024 · Pillar 43 · Platinum & Nanodiamonds · Mass Extinction",
    symbol: "☄",
    color: T.blood,
    category: "GEOLOGICALLY CONFIRMED",
    summary: "Approximately 12,900 years ago — 10,900 BC — a major cosmic impact or airburst event triggered a sudden return to ice-age conditions (the Younger Dryas period), wiped out the megafauna of North America and Europe, and likely destroyed the coastal civilizations of the late ice age. The evidence for this event is now overwhelming: platinum and nanodiamond concentrations in soil layers across three continents, a black mat layer marking the extinction boundary, and — most remarkably — a calendar recording the event carved into Pillar 43 at Göbekli Tepe, published in peer-reviewed form in 2024.",
    evidence: [
      { type: "DOCUMENTED", text: "Platinum-enriched soil layers consistent with cosmic impact ejecta have been found at over 50 sites across North America, Europe, and the Middle East, all dating to approximately 12,900 years ago. Published in Proceedings of the National Academy of Sciences." },
      { type: "DOCUMENTED", text: "Nanodiamond concentrations — which form only under the extreme pressure of cosmic impact — have been found in the same 12,900-year-old soil layers at sites from California to Syria. Published in Science (2009) and multiple subsequent peer-reviewed journals." },
      { type: "DOCUMENTED", text: "Dr. Martin Sweatman's peer-reviewed analysis published in Time and Mind (2024) demonstrates that carvings on Pillar 43 at Göbekli Tepe encode a specific astronomical date — approximately 10,850 BC — and depict animals consistent with the constellations visible at that date, alongside imagery consistent with a catastrophic cosmic impact. The people who built Göbekli Tepe were recording what destroyed the world before theirs." },
      { type: "DOCUMENTED", text: "The extinction of 35 genera of North American megafauna — including mammoths, mastodons, giant ground sloths, and horses — coincides precisely with the Younger Dryas boundary layer at 12,900 years ago. No climatic explanation fully accounts for the speed and completeness of these extinctions. An impact event does." },
    ],
    researcher: "Dr. Martin Sweatman · Dr. Richard Firestone (Lawrence Berkeley National Laboratory) · Graham Hancock",
    observation: "The Younger Dryas impact event is the most likely candidate for the catastrophe described in the global flood myths of over 200 cultures. The impact would have triggered massive tsunamis, rapid sea level rise as ice sheets destabilized, wildfires across multiple continents, and a nuclear-winter-style cooling period. Any coastal civilization existing before this event would have been destroyed almost entirely. This is not mythology. This is physics.",
  },
  {
    id: "global-flood",
    era: "flood",
    date: "~9,600 BC",
    sortKey: -9600,
    title: "The Global Flood — Every Culture Remembers It",
    subtitle: "200+ Independent Flood Traditions · Geological Confirmation · Sea Level Rise",
    symbol: "🌊",
    color: T.blood,
    category: "UNIVERSAL CULTURAL RECORD",
    summary: "Over 200 independent cultures worldwide — on every continent, speaking unrelated languages, with no documented contact — carry a flood myth describing a catastrophic global inundation that destroyed a prior world. The Sumerian Epic of Gilgamesh (older than Genesis). The Hindu Matsya Purana. The Aztec Codex Chimalpopoca. The Chinese legend of Gun-Yu. The Hopi emergence narrative. The Norse Ragnarok. The details differ. The core event is the same. And the geological record confirms it happened.",
    evidence: [
      { type: "DOCUMENTED", text: "Sea levels rose approximately 400 feet (120 meters) between 20,000 BC and 5,000 BC as ice age glaciers melted — submerging millions of square miles of previously habitable coastal land worldwide. This is confirmed by ocean floor geology and is not disputed by mainstream science." },
      { type: "DOCUMENTED", text: "The flooding of Doggerland — a landmass larger than England now beneath the North Sea — is confirmed by sediment analysis, tool finds, and ancient DNA research. It was inhabited and was submerged approximately 6,500-8,200 years ago by the sudden release of a glacial lake (Lake Agassiz). Fishermen regularly dredge up prehistoric tools, bones, and artifacts from the seafloor." },
      { type: "DOCUMENTED", text: "Plato's date for the destruction of Atlantis — approximately 9,600 BC — coincides with the period of most rapid sea level rise at the end of the last ice age. His description of Atlantis being swallowed by the sea 'in a single day and night' is consistent with a catastrophic event rather than gradual flooding." },
      { type: "DOCUMENTED", text: "The Black Sea was a freshwater lake until approximately 5,600 BC, when the Mediterranean broke through the Bosporus in what geologists estimate was a catastrophic flood — filling the lake at a rate 200 times greater than Niagara Falls. This event — documented by Columbia University geologists Ryan and Pitman — may be the direct origin of the Mesopotamian flood narratives." },
    ],
    researcher: "Ryan & Pitman — Noah's Flood (1998) · Graham Hancock · Rand Flem-Ath",
    observation: "The flood was real. Geology confirms it. The scale of what was lost — all coastal civilizations, all maritime knowledge, all the infrastructure of a global seafaring culture — is incalculable. The survivors carried their knowledge forward in oral tradition, in megalithic monuments, in the myths that every culture on Earth has preserved. The myth is the memory. The ruins are the proof.",
  },

  // ── POST-FLOOD RECOVERY ───────────────────────────────────
  {
    id: "gobekli-tepe-event",
    era: "recovery",
    date: "~9,600 – 8,000 BC",
    sortKey: -9600,
    title: "Göbekli Tepe — Survivors Record the Catastrophe",
    subtitle: "12,000 Years Old · Deliberately Buried · Comet Impact Calendar",
    symbol: "𓂀",
    color: T.amber,
    category: "ARCHAEOLOGICAL · CONFIRMED",
    summary: "The survivors of the Younger Dryas catastrophe built Göbekli Tepe on a mountaintop in southeastern Turkey — away from the destroyed coastlines — and carved a record of what happened into the stone. The astronomical calendar encoded in Pillar 43 records the comet impact. The carvings document the animals that were lost. The scale of the construction demonstrates that the builders were not primitive hunter-gatherers but the remnants of a sophisticated civilization rebuilding from catastrophe. They then deliberately buried the entire complex around 8,000 BC — hiding it from whatever came next.",
    evidence: [
      { type: "DOCUMENTED", text: "Göbekli Tepe dates to 12,000+ years ago — making it the oldest known megalithic structure on Earth, predating Stonehenge by 6,000 years and the Egyptian pyramids by 7,500 years." },
      { type: "DOCUMENTED", text: "Pillar 43's astronomical carvings have been peer-reviewed as encoding a specific date — approximately 10,850 BC — and depicting the Younger Dryas impact event. The builders were recording history, not creating myth." },
      { type: "DOCUMENTED", text: "The site was deliberately buried circa 8,000 BC — not abandoned, not destroyed by natural forces, but intentionally filled in by human hands. Someone buried this monument and left. The reason remains unknown." },
      { type: "DOCUMENTED", text: "Turkish Ministry of Culture announced in November 2025 that findings indicate 'densely populated settlements of various scales existed in the area 12,000 years ago' — multiple simultaneous settlements, not one isolated site." },
    ],
    researcher: "Klaus Schmidt · Dr. Martin Sweatman · Andrew Collins",
    observation: "Göbekli Tepe is the most important archaeological site ever discovered — not because of what it is, but because of what it implies. It implies that the flood mythology is history. It implies that the civilization destroyed in the Younger Dryas catastrophe was sophisticated enough to leave survivors capable of building a 12,000-year-old monument complex. It implies that someone deliberately buried the evidence. And it implies that the official timeline of human civilization is wrong by at least 7,000 years.",
  },
  {
    id: "sumer-egypt",
    era: "recovery",
    date: "~5,000 – 3,000 BC",
    sortKey: -5000,
    title: "Sumer and Egypt Appear — Fully Formed",
    subtitle: "No Gradual Development · Advanced Knowledge From Day One",
    symbol: "△",
    color: T.amber,
    category: "HISTORICAL ANOMALY",
    summary: "Both the Sumerian and Egyptian civilizations appear in the archaeological record already fully developed — with advanced writing systems, complex legal codes, sophisticated mathematics, astronomical knowledge, architectural capability, and organized religion — with almost no evidence of a gradual developmental period. The standard model of civilization predicts a slow progression from simple to complex. Sumer and Egypt appeared complex. This is consistent with the knowledge being inherited from a prior civilization rather than developed independently.",
    evidence: [
      { type: "DOCUMENTED", text: "The oldest known writing — Sumerian cuneiform — appears in the archaeological record already as a fully functional complex system. There is almost no evidence of a proto-writing developmental period. It appears, essentially fully formed, around 3,400 BC." },
      { type: "DOCUMENTED", text: "Ancient Egypt's earliest dynastic monuments — including the Sphinx, which geologist Robert Schoch dates to at least 7,000 BC based on water erosion evidence — demonstrate engineering capability that was not exceeded or equaled again for thousands of years after the Old Kingdom." },
      { type: "DOCUMENTED", text: "The Sumerian King List records kings ruling before the flood for periods of up to 43,200 years — and then states explicitly 'after the flood swept over the earth and kingship was lowered again from heaven' — describing the post-flood period as a restoration of an earlier order, not the creation of a new one." },
      { type: "OBSERVED PATTERN", text: "Both Sumer and Egypt carry explicit cultural memory of beings who brought knowledge and civilization to humanity after a catastrophic flood. The Apkallu of Sumer — seven sages who brought knowledge after the flood — and the Shemsu Hor of Egypt — the 'followers of Horus' who ruled for thousands of years before the first pharaoh — are described in both traditions as the transmitters of pre-flood knowledge." },
    ],
    researcher: "Zecharia Sitchin · Robert Schoch · John Anthony West",
    observation: "John Anthony West and Robert Schoch's geological re-dating of the Sphinx to at least 7,000 BC — based on documented water erosion evidence — places the construction of Egypt's most iconic monument 4,500 years before the First Dynasty. If the Sphinx is that old, then the civilization that built it predates anything in the official Egyptian timeline. That civilization had no name until now.",
  },

  // ── SUPPRESSION ───────────────────────────────────────────
  {
    id: "library-alexandria",
    era: "suppression",
    date: "~48 BC – 642 AD",
    sortKey: -48,
    title: "The Burning of Alexandria",
    subtitle: "Deliberate Destruction of Human Knowledge",
    symbol: "🔥",
    color: T.gold,
    category: "HISTORICAL · DOCUMENTED",
    summary: "The Great Library of Alexandria — which at its height may have contained up to 700,000 scrolls representing the accumulated knowledge of the ancient world — was destroyed in multiple events between approximately 48 BC and 642 AD. Julius Caesar burned part of it in 48 BC. The remainder was destroyed under the Roman Emperor Theophilus in 391 AD and again under the Arab conquest in 642 AD. What was lost is incalculable — and may have included records of pre-flood civilization, advanced astronomical knowledge, and mathematical and engineering texts whose loss set human progress back by centuries.",
    evidence: [
      { type: "DOCUMENTED", text: "The Library of Alexandria is confirmed by multiple ancient sources including Strabo, Plutarch, and Julius Caesar himself (who describes burning ships in the harbor whose fire spread to the library)." },
      { type: "DOCUMENTED", text: "Carl Sagan estimated in Cosmos (1980) that the destruction of Alexandria set human scientific and technological progress back by 500-1,000 years — based on the mathematical and astronomical knowledge documented as having existed in the library." },
      { type: "DOCUMENTED", text: "The Antikythera Mechanism — discovered in a Greek shipwreck in 1901 and dating to approximately 100 BC — is a bronze astronomical computer of extraordinary complexity that could not be replicated with modern manufacturing techniques until the 20th century. It demonstrates that the knowledge lost at Alexandria was more advanced than anything that survived." },
      { type: "OBSERVED PATTERN", text: "The systematic destruction of knowledge repositories — Alexandria, the Aztec codices burned by Bishop Landa in 1562, the Mayan books, the suppression of Egyptian hieroglyphic knowledge — follows a consistent pattern across history. Knowledge of the past is a threat to those who control the present." },
    ],
    researcher: "Carl Sagan · Luciano Canfora",
    observation: "The Antikythera Mechanism alone proves that the level of knowledge existing in the ancient world was far higher than the knowledge that survived. What else was in Alexandria that is now gone? The answer to that question — which we will never fully know — is the true measure of what was lost.",
  },
  {
    id: "council-nicea",
    era: "suppression",
    date: "325 AD",
    sortKey: 325,
    title: "Council of Nicaea — Canonizing the Narrative",
    subtitle: "Constantine · 300 Texts Excluded · Official Story Established",
    symbol: "✝",
    color: T.gold,
    category: "HISTORICAL · DOCUMENTED",
    summary: "In 325 AD, Roman Emperor Constantine convened the Council of Nicaea — a gathering of approximately 300 Christian bishops — to establish a unified Christian doctrine and canon. The council selected which texts would become the official Bible and which would be excluded. Hundreds of texts were rejected — including the Gospel of Thomas, the Gospel of Mary Magdalene, and numerous other early Christian writings that described a very different understanding of Jesus, consciousness, and the nature of reality. These texts were ordered destroyed. Many survived hidden — including the Nag Hammadi library, discovered in Egypt in 1945.",
    evidence: [
      { type: "DOCUMENTED", text: "The Council of Nicaea in 325 AD is historically confirmed. Its decisions shaped Christian doctrine and canon for all subsequent Western civilization." },
      { type: "DOCUMENTED", text: "The Nag Hammadi library — 52 texts buried in Egypt around 400 AD, discovered in 1945 — contains Gnostic gospels that describe Jesus teaching about inner consciousness, direct personal experience of the divine, and a cosmology entirely different from what became orthodox Christianity." },
      { type: "DOCUMENTED", text: "The Gospel of Thomas — one of the Nag Hammadi texts — contains 114 sayings attributed to Jesus, many of which describe the Kingdom of God as an inner state of consciousness rather than an external kingdom. Scholars believe it may predate the canonical gospels." },
      { type: "OBSERVED PATTERN", text: "The pattern at Nicaea mirrors the pattern across all information suppression: a central authority selects which version of history and reality the population will be permitted to know, destroys or marginalizes alternatives, and presents the selected version as the complete and final truth. The suppression of alternative Christian texts is one of the most consequential information control operations in human history." },
    ],
    researcher: "Elaine Pagels — The Gnostic Gospels (1979) · Bart Ehrman",
    observation: "Elaine Pagels' The Gnostic Gospels (1979) — winner of the National Book Award — documented what was excluded from Christianity at Nicaea. The excluded texts consistently describe human consciousness as capable of direct divine experience, without the mediation of institutional authority. That specific teaching — that you have direct access to truth without an institution between you and it — is precisely what was excluded. The selectivity is not random.",
  },
  {
    id: "modern-suppression",
    era: "suppression",
    date: "1900 – Present",
    sortKey: 1900,
    title: "The Modern Suppression",
    subtitle: "Media Consolidation · Academic Gatekeeping · LiDAR Revelation",
    symbol: "📡",
    color: T.gold,
    category: "DOCUMENTED · ONGOING",
    summary: "The suppression of true human history continues in the present through institutional gatekeeping, media consolidation, and academic credentialism. Six corporations control 90% of US media. Academic journals reject papers that contradict the established timeline — regardless of the quality of evidence. LiDAR, genetic research, and underwater archaeology are systematically producing discoveries that break the official narrative — and each one is either minimized in coverage, absorbed into the footnotes of academic literature, or actively suppressed. Soul True exists to document what they are finding before it disappears.",
    evidence: [
      { type: "DOCUMENTED", text: "Six corporations — Comcast, Disney, Warner Bros Discovery, Paramount, Fox, and Sony — control approximately 90% of US media as of 2024. The consolidation of media ownership into six entities represents the most concentrated information control in American history." },
      { type: "DOCUMENTED", text: "The Gunung Padang peer-reviewed study (2023) — which provided evidence of 25,000-year-old construction — was subjected to a retraction campaign by mainstream archaeologists. The retraction was attempted not on scientific grounds but on the grounds that the conclusions were unacceptable." },
      { type: "DOCUMENTED", text: "LiDAR surveys have produced more major archaeological discoveries in the past decade than the previous century of ground-level archaeology. The Amazon Upano Valley (2024), Guatemala Maya network (2018), and Cambodia Angkor expansion (2015-2024) all fundamentally revised our understanding of pre-Columbian and ancient civilization. Coverage in mainstream media remains minimal relative to significance." },
      { type: "DOCUMENTED", text: "The Human Genome Project's 2001 finding of 223 genes with no evolutionary precursors was noted in the published findings and has received almost no mainstream scientific or media discussion in the 23 years since publication." },
    ],
    researcher: "Soul True · Graham Hancock · Randall Carlson",
    observation: "The suppression of true human history is not a historical phenomenon. It is ongoing. Every year LiDAR finds another civilization. Every year genetics produces another anomaly. Every year underwater archaeology finds another pre-flood site. And every year the mainstream media finds other things to cover. The question of whether this is institutional inertia or deliberate management is one each person must answer for themselves — after reviewing the documented evidence.",
  },
  {
    id: "now",
    era: "suppression",
    date: "2026 — NOW",
    sortKey: 2026,
    title: "The Awakening Accelerates",
    subtitle: "LiDAR · Genetics · Quantum Physics · Soul True",
    symbol: "✦",
    color: T.goldBright,
    category: "PRESENT MOMENT",
    summary: "We are living in the most significant period of archaeological and scientific discovery in human history. LiDAR is finding hidden cities. Genetics is documenting unexplained anomalies. Quantum mechanics has formally ended the materialist model of reality. Underwater archaeology is confirming the flood myths. And for the first time in human history, the tools to share this knowledge globally — instantly, outside institutional control — exist in the hands of every person with a phone. The awakening is not coming. It is here.",
    evidence: [
      { type: "DOCUMENTED", text: "2026: Şika Rika 5 discovered in Turkey — 10,000-year-old settlement outside the accepted origin zone. Timeline breaking continues in real time." },
      { type: "DOCUMENTED", text: "2024: Upano Valley, Ecuador — 6,000+ structures, 15 cities, 2,500 years old — revealed by LiDAR and published in Science journal. Continental urban civilization in the Amazon confirmed." },
      { type: "DOCUMENTED", text: "2022: Nobel Prize in Physics confirms the universe is not locally real. The materialist model of existence is formally over." },
      { type: "DOCUMENTED", text: "2024: India's Prime Minister Modi scuba dives to the ruins of Dwarka — 9,500 years old, 120 feet underwater — calling them 'divine.' A sitting head of government acknowledging a pre-flood civilization." },
      { type: "OBSERVED PATTERN", text: "The rate of discovery is accelerating. Every year brings more evidence, more anomalies, more confirmation of what the official narrative denies. The window for managing this information is closing. The truth of human history is surfacing — in the ground, under the sea, and in the minds of anyone willing to look." },
    ],
    researcher: "Soul True · You",
    observation: "You are living at the exact moment when the suppressed history of humanity is being recovered. That is not an accident. The fact that you are here — reading this, asking these questions — is part of the pattern. The awakening requires people who are willing to look at what the evidence actually shows. That is what Soul True is here to support.",
  },
];

// ─── ERA COLOR MAP ────────────────────────────────────────────
const ERA_COLORS = {
  intervention: T.purple,
  lemuria: T.teal,
  atlantis: T.ocean,
  flood: T.blood,
  recovery: T.amber,
  suppression: T.gold,
};

// ─── CATEGORY BADGE ───────────────────────────────────────────
function CategoryBadge({ type }) {
  const colors = {
    "ANCIENT TEXTS": T.purple,
    "ARCHAEOLOGICAL": T.amber,
    "GENETIC EVIDENCE": T.ocean,
    "GEOLOGICAL & TEXTUAL": T.teal,
    "TEXTUAL & GEOLOGICAL": T.ocean,
    "CARTOGRAPHIC EVIDENCE": T.green,
    "CONTESTED INTERPRETATION": "#e07020",
    "GEOLOGICALLY CONFIRMED": T.blood,
    "UNIVERSAL CULTURAL RECORD": T.blood,
    "ARCHAEOLOGICAL · CONFIRMED": T.amber,
    "HISTORICAL ANOMALY": T.amber,
    "HISTORICAL · DOCUMENTED": T.gold,
    "DOCUMENTED · ONGOING": T.gold,
    "PRESENT MOMENT": T.goldBright,
  };
  const color = colors[type] || T.gold;
  return (
    <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, letterSpacing: "0.2em", padding: "3px 8px", border: `1px solid ${color}`, color, textTransform: "uppercase", whiteSpace: "nowrap" }}>
      {type}
    </span>
  );
}

// ─── EVIDENCE ITEM ────────────────────────────────────────────
function EvidenceItem({ type, text }) {
  const colorMap = {
    "DOCUMENTED": T.gold,
    "ANCIENT TEXT": T.purple,
    "OBSERVED PATTERN": T.purple,
    "ONE RESEARCHER'S INTERPRETATION": "#e07020",
    "CONTESTED": "#e07020",
    "UNVERIFIED SOURCE": "#888888",
    "CORRECTION": "#cc2222",
  };
  const col = colorMap[type] || T.gold;
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
      <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, letterSpacing: "0.12em", color: col, border: `1px solid ${col}`, padding: "3px 7px", whiteSpace: "nowrap", marginTop: 2, flexShrink: 0, fontWeight: 700, maxWidth: 160, textAlign: "center", lineHeight: 1.3 }}>{type}</span>
      <p style={{ fontSize: 13, lineHeight: 1.65, color: type === "CORRECTION" ? "#d4a0a0" : type === "UNVERIFIED SOURCE" ? T.ash : T.bone, fontWeight: 300 }}>{text}</p>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function TrueHumanTimeline() {
  const [activeEra, setActiveEra] = useState("all");
  const [activeEvent, setActiveEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const sorted = [...EVENTS].sort((a, b) => a.sortKey - b.sortKey);

  const filtered = sorted.filter(e => {
    const eraMatch = activeEra === "all" || e.era === activeEra;
    const searchMatch = !searchQuery || [e.title, e.subtitle, e.summary, e.date].some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return eraMatch && searchMatch;
  });

  const active = EVENTS.find(e => e.id === activeEvent);

  return (
    <div style={{ background: T.void, color: T.bone, fontFamily: "'Rajdhani', sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Courier+Prime:wght@400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(200,169,74,0.1)}50%{box-shadow:0 0 40px rgba(200,169,74,0.3)}}
        .era-btn{font-family:'Rajdhani',sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;background:transparent;border:1px solid rgba(255,255,255,0.08);color:#888;cursor:pointer;white-space:nowrap;transition:all 0.2s;}
        .era-btn:hover{color:#d4c9a8;border-color:rgba(255,255,255,0.2);}
        .era-btn.active{color:#040404;font-weight:700;}
        .event-card{background:#111;border-left:3px solid transparent;cursor:pointer;transition:all 0.2s;padding:20px 22px;margin-bottom:2px;}
        .event-card:hover{background:#161616;transform:translateX(4px);}
        .event-card.active-card{background:rgba(255,255,255,0.03);}
        input[type=text]{background:#111;border:1px solid rgba(200,169,74,0.25);color:#f0ece0;font-family:'Rajdhani',sans-serif;font-size:14px;padding:12px 16px;outline:none;width:100%;transition:border-color 0.2s;letter-spacing:0.05em;}
        input[type=text]:focus{border-color:#c8a94a;}
        input[type=text]::placeholder{color:rgba(136,136,136,0.4);font-style:italic;}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:#0a0a0a}
        ::-webkit-scrollbar-thumb{background:#c8a94a44}
      `}</style>

      {/* HEADER */}
      <div style={{ padding: "64px 40px 48px", textAlign: "center", background: "radial-gradient(ellipse at 50% 0,rgba(100,50,150,0.08),transparent 60%)", animation: "fadeUp 0.6s ease" }}>
        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: "0.4em", color: T.purple, opacity: 0.65, textTransform: "uppercase", marginBottom: 16 }}>Soul True · The True Human Timeline</div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem,5.5vw,4rem)", fontWeight: 900, color: T.white, lineHeight: 0.93, marginBottom: 14, textShadow: "0 0 60px rgba(154,106,170,0.3)" }}>
          WHERE WE<br /><span style={{ color: T.purple }}>ACTUALLY</span><br />CAME FROM
        </h1>
        <p style={{ fontSize: 12, letterSpacing: "0.28em", color: T.ash, textTransform: "uppercase", marginBottom: 28 }}>450,000 BC to Present · Evidence-Anchored · Nothing Omitted</p>
        <div style={{ maxWidth: 680, margin: "0 auto 36px", fontSize: 15, lineHeight: 1.78, color: T.bone, fontWeight: 300, borderLeft: `2px solid ${T.purple}`, paddingLeft: 22, textAlign: "left" }}>
          The official human timeline begins with Mesopotamia around 3,500 BC. The evidence — ancient texts, genetics, geology, and archaeology — raises questions that push much further back. This timeline presents what the evidence actually shows, what researchers have concluded from it, and where the line between documented fact and interpretation falls.<br /><br />
          <strong style={{ color: T.goldBright }}>Every item is labeled: DOCUMENTED means confirmed by primary sources. OBSERVED PATTERN means inference from facts. CONTESTED, UNVERIFIED SOURCE, and ONE RESEARCHER'S INTERPRETATION are clearly marked. You decide what to conclude.</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 36, flexWrap: "wrap" }}>
          {[["300,000 BC", "Oldest evidence\nin the record"], ["200+", "Cultures with\nflood myths"], ["12,000 BC", "Age of\nGöbekli Tepe"], ["9,600 BC", "Plato's date for\nAtlantis' destruction"]].map(([n, l]) => (
            <div key={n} style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1.8rem", color: T.purple, display: "block" }}>{n}</span>
              <span style={{ fontSize: 10, letterSpacing: "0.12em", color: T.ash, textTransform: "uppercase", lineHeight: 1.4, whiteSpace: "pre-line", display: "block", marginTop: 4 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ERA FILTER */}
      <div style={{ padding: "0 40px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 16, scrollbarWidth: "none" }}>
          <button className={`era-btn${activeEra === "all" ? " active" : ""}`} onClick={() => setActiveEra("all")} style={{ ...(activeEra === "all" ? { background: T.gold, borderColor: T.gold } : {}) }}>All Eras</button>
          {ERAS.map(era => (
            <button key={era.id} className={`era-btn${activeEra === era.id ? " active" : ""}`} onClick={() => setActiveEra(era.id)} style={{ ...(activeEra === era.id ? { background: era.color, borderColor: era.color } : { borderColor: `${era.color}44` }) }}>
              {era.label}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH */}
      <div style={{ padding: "16px 40px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <input type="text" placeholder="Search the timeline — Anunnaki, Atlantis, flood, genetics, LiDAR..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>

      {/* MAIN LAYOUT */}
      <div style={{ display: "grid", gridTemplateColumns: active ? "1fr 1fr" : "1fr", gap: 0, maxWidth: 1400, margin: "0 auto", minHeight: "60vh" }}>

        {/* EVENT LIST */}
        <div style={{ padding: "24px 40px 80px", overflowY: active ? "auto" : "visible", maxHeight: active ? "80vh" : "none" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: T.ash }}>No events match your search.</div>
          ) : (
            filtered.map((event, idx) => {
              const eraColor = ERA_COLORS[event.era];
              const isActive = activeEvent === event.id;
              return (
                <div key={event.id} className={`event-card${isActive ? " active-card" : ""}`} style={{ borderLeftColor: isActive ? event.color : `${eraColor}44`, animation: `fadeUp ${0.1 + idx * 0.03}s ease` }} onClick={() => setActiveEvent(isActive ? null : event.id)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{event.symbol}</span>
                      <div>
                        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: event.color, marginBottom: 3, opacity: 0.8 }}>{event.date}</div>
                        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "0.95rem", fontWeight: 700, color: isActive ? T.white : T.bone, lineHeight: 1.2 }}>{event.title}</h3>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                      <CategoryBadge type={event.category} />
                      <span style={{ color: event.color, fontSize: "0.8rem", transform: isActive ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>▸</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: T.ash, lineHeight: 1.5, fontWeight: 300, paddingLeft: 34 }}>{event.subtitle}</p>
                </div>
              );
            })
          )}
        </div>

        {/* DETAIL PANEL */}
        {active && (
          <div style={{ padding: "24px 40px 80px", borderLeft: "1px solid rgba(255,255,255,0.05)", overflowY: "auto", maxHeight: "80vh", background: T.stone2, animation: "fadeUp 0.3s ease", position: "sticky", top: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: active.color, opacity: 0.8, marginBottom: 4 }}>{active.date}</div>
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700, color: T.white, marginBottom: 4, lineHeight: 1.2 }}>{active.title}</h2>
                <CategoryBadge type={active.category} />
              </div>
              <button onClick={() => setActiveEvent(null)} style={{ background: "none", border: "none", color: T.ash, cursor: "pointer", fontSize: "1.1rem", flexShrink: 0, marginLeft: 16 }}>✕</button>
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.72, color: T.ash, fontWeight: 300, marginBottom: 20, borderLeft: `2px solid ${active.color}`, paddingLeft: 14 }}>{active.summary}</p>

            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, letterSpacing: "0.3em", color: active.color, textTransform: "uppercase", marginBottom: 12 }}>Evidence</div>
            <div style={{ marginBottom: 20 }}>
              {active.evidence.map((e, i) => <EvidenceItem key={i} type={e.type} text={e.text} />)}
            </div>

            {active.researcher && (
              <div style={{ marginBottom: 16, padding: "10px 14px", background: "rgba(255,255,255,0.02)", borderLeft: `1px solid rgba(255,255,255,0.1)` }}>
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, letterSpacing: "0.25em", color: T.ash, marginBottom: 4 }}>KEY RESEARCHERS</div>
                <p style={{ fontSize: 12, color: T.bone, fontWeight: 300 }}>{active.researcher}</p>
              </div>
            )}

            <div style={{ padding: "12px 16px", borderLeft: `3px solid ${active.color}`, background: `rgba(${active.color === T.purple ? "154,106,170" : active.color === T.ocean ? "0,200,255" : active.color === T.amber ? "224,112,32" : active.color === T.blood ? "139,26,26" : "200,169,74"},0.05)`, marginBottom: 16 }}>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, letterSpacing: "0.25em", color: active.color, marginBottom: 6 }}>OBSERVED PATTERN</div>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: T.bone, fontWeight: 300 }}>{active.observation}</p>
            </div>
          </div>
        )}
      </div>

      {/* ERA LEGEND */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 40px 80px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: "0.3em", color: T.ash, textTransform: "uppercase", textAlign: "center", marginBottom: 28 }}>The Six Eras of True Human History</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
          {ERAS.map(era => {
            const count = EVENTS.filter(e => e.era === era.id).length;
            return (
              <button key={era.id} onClick={() => { setActiveEra(era.id); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ background: activeEra === era.id ? "rgba(255,255,255,0.04)" : T.stone, border: "none", borderLeft: `3px solid ${activeEra === era.id ? era.color : `${era.color}33`}`, padding: "18px 20px", textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.9rem", color: era.color, marginBottom: 4 }}>{era.label}</div>
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: T.ash, marginBottom: 6 }}>{era.range}</div>
                <div style={{ fontSize: 11, color: T.ash, letterSpacing: "0.1em" }}>{count} documented events</div>
              </button>
            );
          })}
        </div>

        {/* Closing statement */}
        <div style={{ background: T.stone, borderTop: `2px solid ${T.gold}`, padding: "36px 32px", marginTop: 40, textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.4rem", color: T.gold, marginBottom: 12 }}>The Timeline Is Not Complete</h3>
          <p style={{ fontSize: 14, color: T.ash, lineHeight: 1.82, maxWidth: 680, margin: "0 auto 24px", fontWeight: 300 }}>
            New discoveries are made every year. Every LiDAR scan, every genetic study, every underwater excavation adds to the picture. <strong style={{ color: T.bone }}>Soul True updates this timeline in real time as new evidence surfaces.</strong> The awakening of true human history is not a past event. It is happening now.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/awakening-assessment" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", padding: "13px 28px", border: `1px solid ${T.gold}`, color: T.gold, textDecoration: "none", fontWeight: 700 }}>Discover Your Level →</a>
            <a href="/hidden-truth" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", padding: "13px 28px", border: "1px solid rgba(200,169,74,0.25)", color: T.ash, textDecoration: "none", fontWeight: 700 }}>Explore the Archive →</a>
            <a href="/reality-map" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", padding: "13px 28px", border: "1px solid rgba(200,169,74,0.25)", color: T.ash, textDecoration: "none", fontWeight: 700 }}>View the Reality Map →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
