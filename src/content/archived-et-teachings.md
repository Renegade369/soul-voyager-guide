# Archived: Extraterrestrial Contact, Disclosure & The Cosmic Family

Removed from `src/routes/teachings.tsx` on 2026-05-09. Preserved verbatim below as the original JSX source so all text remains fully intact.

```tsx
      {/* ============================================================ */}
      {/* EXTRATERRESTRIALS, DISCLOSURE & DR. STEVEN GREER              */}
      {/* ============================================================ */}
      <section className="mt-16">
        <TeachingImage
          src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1600&q=70"
          alt="Star-filled night sky over silent earth — the cosmic family."
        />
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">The Cosmic Family</p>
          <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">Extraterrestrial Contact, Disclosure & The Work of Dr. Steven Greer</h2>
          <p className="mx-auto mt-5 max-w-3xl text-muted-foreground">
            One of the most consequential remembrances of our time is this: we are not alone, we have never been alone, and the truth has been deliberately hidden for nearly 80 years. The veil thinning is not only spiritual — it is informational. What follows is a clear-eyed account of the history, the evidence, the work of disclosure pioneer Dr. Steven Greer, and how close humanity now is to full, official acknowledgment.
          </p>
        </div>

        {/* The Long Hidden History */}
        <article className="mt-10 rounded-none border border-border bg-secondary/40 p-8">
          <h3 className="font-serif text-3xl text-foreground">The Hidden History — A Timeline</h3>
          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li><strong className="text-foreground">Ancient times.</strong> Cultures across every continent — Sumerian, Egyptian, Mesoamerican, Vedic, Aboriginal, Hopi — describe "sky beings," "shining ones," and craft of the gods. The Vimanas of the Mahabharata, the Anunnaki of Sumer, the Star People of the Lakota. This was not metaphor; it was reportage.</li>
            <li><strong className="text-foreground">1947 — Roswell, NM.</strong> A craft of non-human origin crashes on a New Mexico ranch. The Army initially issues a press release confirming a "flying disc," then retracts it within 24 hours. This is the moment the modern cover-up begins.</li>
            <li><strong className="text-foreground">1947 — Kenneth Arnold.</strong> A pilot reports nine craft moving "like saucers skipping on water" near Mt. Rainier — birthing the term "flying saucer" and the modern UFO era.</li>
            <li><strong className="text-foreground">1952 — Washington, D.C. flyover.</strong> Multiple unidentified craft are tracked on radar over the U.S. Capitol for two consecutive weekends. Front-page news. F-94 jets scrambled. The Air Force's official explanation — "temperature inversion" — fooled almost no one.</li>
            <li><strong className="text-foreground">1961 — Eisenhower's farewell.</strong> President Eisenhower warns of "the unwarranted influence... by the military-industrial complex." Many disclosure researchers believe he was speaking, in part, of the unacknowledged programs already running outside congressional oversight.</li>
            <li><strong className="text-foreground">1966 — Project Blue Book.</strong> The Air Force's public UFO investigation closes most cases — but its scientific consultant, Dr. J. Allen Hynek, breaks publicly with the program, declaring a real phenomenon is being studied behind closed doors.</li>
            <li><strong className="text-foreground">1980 — Rendlesham Forest, UK.</strong> U.S. Air Force personnel at RAF Bentwaters witness, touch, and photograph a landed craft over three nights. Deputy Base Commander Lt. Col. Charles Halt records the event live on audio. Documents declassified decades later.</li>
            <li><strong className="text-foreground">1989–1996 — Belgian Wave.</strong> Thousands of citizens, police, and Belgian Air Force pilots track massive triangular craft. The Belgian government openly admits it has no conventional explanation — a near-unprecedented official acknowledgment.</li>
            <li><strong className="text-foreground">1997 — Phoenix Lights.</strong> A mile-wide V-shaped craft passes silently over Phoenix, witnessed by tens of thousands including Governor Fife Symington, who later admits he saw it himself and called it "otherworldly."</li>
            <li><strong className="text-foreground">2004 — USS Nimitz "Tic Tac" encounter.</strong> Navy F/A-18 pilots, including Cmdr. David Fravor, engage a 40-foot tic-tac-shaped craft demonstrating instantaneous acceleration, no visible propulsion, and trans-medium travel. Captured on FLIR. Officially confirmed by the Pentagon in 2020.</li>
            <li><strong className="text-foreground">2017 — The New York Times breaks the story.</strong> A front-page article by Leslie Kean, Helene Cooper, and Ralph Blumenthal reveals the secret Pentagon program AATIP. The dam begins to crack.</li>
            <li><strong className="text-foreground">2020 — Pentagon confirms the videos.</strong> The Department of Defense officially releases and authenticates the Navy "Gimbal," "GoFast," and "FLIR1" UAP videos. They are real. The objects are unknown.</li>
            <li><strong className="text-foreground">2022 — Congress holds first public UAP hearing in 50+ years.</strong> The House Intelligence Subcommittee questions Pentagon officials on camera. The conversation has officially returned to the chamber.</li>
            <li><strong className="text-foreground">2023 — David Grusch.</strong> A decorated Air Force intelligence officer testifies under oath to Congress that the U.S. has run a multi-decade program retrieving non-human craft — and the bodies of their occupants. He tells Congress this under penalty of perjury.</li>
            <li><strong className="text-foreground">2023–2026 — The slow drip becomes a flood.</strong> The UAP Disclosure Act is introduced. Whistleblowers continue to surface. Multiple nations — Mexico, Brazil, France, Chile — release portions of their classified files. The Schumer Amendment establishes a federal review board for non-human intelligence materials.</li>
          </ul>
        </article>

        {/* The Categories of Evidence */}
        <article className="mt-8 rounded-none border border-border bg-card p-8">
          <h3 className="font-serif text-3xl text-foreground">The Categories of Evidence</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            The phenomenon is not supported by a single proof but by multiple, independent, mutually-corroborating bodies of evidence:
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {[
              { t: "Government & Military Documents", d: "Tens of thousands of pages declassified worldwide — FBI Vault, CIA's CREST archive, FOIA releases from the U.S. Air Force, Brazil's Operation Saucer, France's COMETA Report (1999), the U.K.'s Project Condign, and Mexico's official UAP files." },
              { t: "Pilot & Military Witness Testimony", d: "Hundreds of credentialed pilots, naval officers, and intelligence personnel — including admirals and generals — have testified publicly. The Tic Tac, Gimbal, GoFast, and Aguadilla cases are among the most rigorously documented." },
              { t: "Radar & Sensor Data", d: "Multi-sensor (radar + infrared + visual) tracking of objects performing maneuvers impossible for known aircraft — instant 90° turns, hypersonic acceleration, trans-medium travel from air to water." },
              { t: "Photographic & Video Evidence", d: "From Trent Farm (1950) to STS shuttle missions to the Pentagon-confirmed Navy footage — a continuous photographic record spanning 75 years across film, digital, and satellite formats." },
              { t: "Whistleblower Testimony", d: "From Bob Lazar (S-4/Area 51) to Lue Elizondo (former AATIP director) to David Grusch (sworn congressional testimony) — insiders from the most classified compartments are stepping forward." },
              { t: "Physical Trace Evidence", d: "Soil samples, vegetation effects, and recovered material with isotopic ratios not naturally occurring on Earth — most notably the 'Art's Parts' analyzed by metallurgist Dr. Hal Puthoff." },
              { t: "Experiencer & Contactee Testimony", d: "Millions of credible accounts globally, gathered by Dr. John Mack of Harvard (Pulitzer winner), Dr. Edgar Mitchell (Apollo 14 astronaut), and ongoing academic studies. Patterns are remarkably consistent across cultures." },
              { t: "Indigenous & Ancient Records", d: "Star lineage traditions (Hopi, Dogon, Aboriginal, Maori), petroglyphs, and oral histories that describe contact with sky beings in language strikingly consistent with modern reports." },
            ].map((e) => (
              <div key={e.t} className="rounded-none border border-border bg-background/50 p-5">
                <h4 className="font-serif text-lg text-foreground">{e.t}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.d}</p>
              </div>
            ))}
          </div>
        </article>

        {/* DR. STEVEN GREER */}
        <article className="mt-10 rounded-none border border-border bg-secondary/40 p-8 ">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Pioneer of Disclosure</p>
          <h3 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">Dr. Steven Greer</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Few human beings have done more — at greater personal cost — to bring the truth of extraterrestrial presence into public consciousness than Dr. Steven Greer. A former emergency-room trauma physician (Chairman of the Department of Emergency Medicine at Caldwell Memorial Hospital), he walked away from a successful medical career to dedicate his life to disclosure, peaceful contact, and the release of suppressed clean-energy technologies.
          </p>

          <h4 className="mt-7 font-serif text-2xl text-foreground">His Major Contributions</h4>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {[
              { t: "The Disclosure Project (1993)", d: "Greer founded and funds the largest collection of high-level military, intelligence, government, and corporate witnesses to UAP/ET events ever assembled — over 950 testimonies on the record, with hundreds willing to testify before Congress under oath." },
              { t: "The National Press Club Event (May 9, 2001)", d: "Greer assembled 20+ military, government, and intelligence witnesses at the National Press Club in Washington D.C. The event was carried live and watched by millions. It is widely considered the most significant public disclosure event of the modern era." },
              { t: "CSETI — Center for the Study of Extraterrestrial Intelligence", d: "Founded in 1990, CSETI pioneered Contact through Conscious Coherent Thought-Sequencing (CE-5) — a peaceful, meditative protocol for initiating direct communication with non-human intelligence. The protocols have produced thousands of documented contact experiences worldwide." },
              { t: "The Documentaries", d: "Sirius (2013), Unacknowledged (2017), and Close Encounters of the Fifth Kind (2020) brought the evidence to mainstream audiences. Combined viewership is in the tens of millions across streaming platforms." },
              { t: "Suppressed Energy Technology", d: "Greer has long maintained that classified programs hold zero-point and over-unity energy systems reverse-engineered from recovered craft — and that the suppression of these technologies is the deepest reason for the cover-up. His Orion Project works to bring them to the public." },
              { t: "Briefings to Government", d: "Greer has personally briefed members of Congress, the Clinton administration, the Director of the CIA (R. James Woolsey), Pentagon officials, and members of European parliaments. Many he briefed went on to become public disclosure advocates." },
            ].map((c) => (
              <div key={c.t} className="rounded-none border border-border bg-background/60 p-5">
                <h5 className="font-serif text-lg text-foreground">{c.t}</h5>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>

          <h4 className="mt-8 font-serif text-2xl text-foreground">The CE-5 Protocol — Initiating Peaceful Contact</h4>
          <p className="mt-3 text-sm text-muted-foreground">
            Greer's CE-5 (Close Encounters of the Fifth Kind) is human-initiated contact through consciousness, not through technology. It is grounded in the understanding that ET civilizations are conscious beings who respond to coherent intention, not radio waves. The basic protocol:
          </p>
          <ol className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><strong className="text-foreground">1. Choose a remote, dark-sky location</strong> with a small, intentional group.</li>
            <li><strong className="text-foreground">2. Enter deep meditative coherence</strong> — heart-brain alignment, identical to HeartMath and Dispenza practices.</li>
            <li><strong className="text-foreground">3. Send a vector signal</strong> — visualize your location as a beacon of light to the cosmos.</li>
            <li><strong className="text-foreground">4. Project loving, peaceful intention</strong> as an invitation, never a demand.</li>
            <li><strong className="text-foreground">5. Open all senses</strong> — visual, auditory, telepathic — and remain present.</li>
            <li><strong className="text-foreground">6. Document and integrate</strong> what arises with the same reverence given to plant medicine work.</li>
          </ol>
          <p className="mt-4 text-sm italic text-muted-foreground">
            Soul True honors CE-5 as a contemplative discipline and incorporates coherent-meditation circles inspired by Greer's work into select gatherings.
          </p>

          <h4 className="mt-8 font-serif text-2xl text-foreground">Greer's Core Teachings</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>The vast majority of ET civilizations visiting Earth are <strong className="text-foreground">peaceful and concerned for our spiritual evolution</strong>.</li>
            <li>The narrative of "alien threat" is being <strong className="text-foreground">manufactured</strong> by classified human factions to justify a future weaponization of space and continued secrecy.</li>
            <li>True disclosure is not only about craft and beings — it is about <strong className="text-foreground">free energy, end of fossil fuel dependency, and the liberation of humanity</strong> from artificial scarcity.</li>
            <li>Consciousness is the bridge — <strong className="text-foreground">ET contact is fundamentally a spiritual event</strong>, not a technological one.</li>
          </ul>
        </article>

        {/* HOW CLOSE WE ARE */}
        <article className="mt-10 rounded-none border border-border bg-card p-8">
          <h3 className="font-serif text-3xl text-foreground">How Close Are We to Full Disclosure?</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Closer than at any point in human history. The shift from "fringe" to congressional record happened in less than a decade. Here is a clear-eyed assessment of where we stand in 2026:
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {[
              { t: "✓ Already Disclosed (Officially)", d: "UAP are real. They are unidentified. They display flight characteristics beyond known aerospace technology. The U.S. government tracks them as a national security matter. Multiple branches of the military have engaged them. — All officially confirmed by the Department of Defense." },
              { t: "✓ Sworn Congressional Testimony", d: "David Grusch (2023) testified under oath that the U.S. possesses non-human craft and biological remains. Cmdr. David Fravor and Ryan Graves corroborated direct encounters. AARO (the Pentagon's UAP office) acknowledges hundreds of unresolved cases." },
              { t: "✓ Legal Architecture in Place", d: "The Schumer-Rounds UAP Disclosure Act establishes a federal review board with eminent domain over recovered materials. Even in its weakened final form, it is the first U.S. law that legally acknowledges 'non-human intelligence' and 'recovered technologies of unknown origin.'" },
              { t: "→ Remaining Stages", d: "(1) Acknowledgment that craft and biologics have been recovered. (2) Acknowledgment of contact with non-human intelligence. (3) Release of suppressed propulsion and energy technologies. (4) Open dialogue with the public about the nature, intent, and origin of visiting civilizations. Stage 1 is unfolding now." },
            ].map((s) => (
              <div key={s.t} className="rounded-none border border-border bg-background/50 p-5">
                <h4 className="font-serif text-lg text-foreground">{s.t}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-none border border-border bg-secondary/40 p-6">
            <h4 className="font-serif text-xl text-foreground">The Honest Assessment</h4>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Limited disclosure — official acknowledgment of a real, unidentified phenomenon — is <strong className="text-foreground">already underway</strong>. Full disclosure — open public engagement with the reality of non-human intelligence and the release of suppressed technologies — is being actively negotiated within governments, intelligence services, and international bodies. Most veteran researchers (Greer, Elizondo, Coulthart, Sheehan) believe we are within <strong className="text-foreground">3 to 7 years</strong> of an undeniable, world-changing acknowledgment. Some believe events on the ground will force it sooner.
            </p>
            <p className="mt-3 text-sm italic text-muted-foreground">
              The veil is not just thinning between the living and the dead. It is thinning between humanity and our cosmic family.
            </p>
          </div>
        </article>

        {/* WHY THIS MATTERS SPIRITUALLY */}
        <article className="mt-10 rounded-none border border-border bg-card p-8">
          <h3 className="font-serif text-3xl text-foreground">Why This Matters Spiritually</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Disclosure is not a story about craft. It is a story about <em>who we are</em>. To remember that we are part of a vast, ensouled cosmos populated by countless intelligent civilizations is to permanently alter how we live, govern, consume, and relate to one another. It collapses tribalism. It makes endless war absurd. It restores the indigenous understanding of a living, peopled universe. It returns us to wonder.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Soul True holds extraterrestrial contact, plant medicine, near-death experience, and direct mystical experience as <strong className="text-foreground">four doorways to the same room</strong>: the remembrance that consciousness is primary, that we are not alone, and that we are loved by intelligences we are only beginning to perceive.
          </p>
        </article>

        {/* RESOURCES */}
        <article className="mt-10 rounded-none border border-border bg-card p-8">
          <h3 className="font-serif text-3xl text-foreground">For the Serious Student</h3>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-serif text-lg text-foreground">Films & Documentaries</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>🎬 <em>Sirius</em> (2013) — Dr. Steven Greer</li>
                <li>🎬 <em>Unacknowledged</em> (2017) — Dr. Steven Greer</li>
                <li>🎬 <em>Close Encounters of the Fifth Kind</em> (2020) — Dr. Steven Greer</li>
                <li>🎬 <em>The Phenomenon</em> (2020) — James Fox</li>
                <li>🎬 <em>Moment of Contact</em> (2022) — James Fox</li>
                <li>🎬 <em>A Tear in the Sky</em> (2022)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg text-foreground">Foundational Reading</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>📖 <em>Disclosure</em> — Dr. Steven Greer</li>
                <li>📖 <em>Hidden Truth, Forbidden Knowledge</em> — Dr. Steven Greer</li>
                <li>📖 <em>UFOs: Generals, Pilots & Government Officials Go on the Record</em> — Leslie Kean</li>
                <li>📖 <em>American Cosmic</em> — Dr. Diana Pasulka (UNC professor)</li>
                <li>📖 <em>Passport to the Cosmos</em> — Dr. John Mack (Harvard, Pulitzer winner)</li>
                <li>📖 <em>The COMETA Report</em> (1999, France)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg text-foreground">Voices to Follow</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>🎙️ Dr. Steven Greer — siriusdisclosure.com</li>
                <li>🎙️ Lue Elizondo — former AATIP director</li>
                <li>🎙️ Ross Coulthart — investigative journalist</li>
                <li>🎙️ Daniel Sheehan, Esq. — constitutional attorney, NDLS</li>
                <li>🎙️ Garry Nolan, PhD — Stanford immunology, UAP material analysis</li>
                <li>🎙️ Dr. Hal Puthoff — physicist, former AAWSAP</li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg text-foreground">Practice</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>🧘 CE-5 Contact Meditation (free CE-5 Contact app by Dr. Greer)</li>
                <li>🧘 Heart-brain coherence as the doorway</li>
                <li>🧘 Soul True contact circles — held quarterly</li>
                <li>📜 Journal every dream, synchronicity, and felt sense</li>
              </ul>
            </div>
          </div>
        </article>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm italic text-muted-foreground">
          You did not come here in a moment of accident. You came in a moment of revelation. The cosmos is waking up to itself — and you are part of how that happens.
        </p>
      </section>
```
