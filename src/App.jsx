import React, { useEffect, useMemo, useState } from "react";

const markers = {
  heat: {
    kicker: "Thermal Hotspot",
    title: "Cool the mound",
    text: "Vegetated caps, tree canopies, and wetland edges reduce exposed heat and turn the landfill into a cooling landscape."
  },
  water: {
    kicker: "Leachate and Runoff",
    title: "Filter the edge",
    text: "Constructed wetlands, subsurface drainage, and planted buffers slow water movement before it reaches sensitive hydrological systems."
  },
  ecology: {
    kicker: "Ecological Succession",
    title: "Grow habitat patches",
    text: "Phytocapping and medium-scale planting create the first stable surfaces for secondary forest, fauna movement, and biodiversity recovery."
  },
  people: {
    kicker: "Public Reuse",
    title: "Open controlled trails",
    text: "Learning walks and community stewardship spaces reconnect people with the recovered landscape without exposing them to unstable landfill zones."
  }
};

const phases = [
  {
    image: "/assets/report-page-20.jpg",
    alt: "Master plan diagram showing the phased transformation of Karadiyana landfill",
    kicker: "Phase 01",
    title: "Control and Reduce",
    text: "Stabilize the landfill through material separation, gas control, leachate treatment, compression, cut-and-fill operations, and structured recycling facilities.",
    items: [
      "Organized material separation zones",
      "Emission pipes and ventilation",
      "Landform stabilization and surface treatment"
    ]
  },
  {
    image: "/assets/report-page-21.jpg",
    alt: "Phased strategy diagrams showing ecological recovery and wetland drainage strategies",
    kicker: "Phase 02",
    title: "Ecological Recovery and Cooling",
    text: "Introduce phytocapping, reinforced slopes, drainage systems, wetland filtration, and medium-scale planting to create the first stable ecological layer.",
    items: [
      "Phytocapping to stabilize surfaces",
      "Constructed wetlands for filtration",
      "Planting to initiate ecological succession"
    ]
  },
  {
    image: "/assets/report-page-19.jpg",
    alt: "Design concept sketch showing climate, social, and ecological relationships",
    kicker: "Phase 03",
    title: "Integration and Public Engagement",
    text: "Bring people into the recovered ground through controlled access, community forest trails, learning spaces, and public-private management structures.",
    items: [
      "Controlled public forest trails",
      "Community learning and stewardship spaces",
      "Management roles for surrounding communities"
    ]
  },
  {
    image: "/assets/report-page-01.jpg",
    alt: "Karadiyana landfill landscape with birds above the mound",
    kicker: "Future Vision",
    title: "Resilient and Adaptive Landscape",
    text: "The landfill evolves into a self-sustaining landscape where ecological processes, monitoring, and community ownership keep the site responsive.",
    items: [
      "Long-term ecological monitoring",
      "Adaptive maintenance and planting",
      "Continuous community ownership"
    ]
  }
];

const navItems = ["Vision", "Context", "Site", "Phases", "Future"];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const syncHeader = () => setIsScrolled(window.scrollY > 28);
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
    return () => window.removeEventListener("scroll", syncHeader);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", isOpen);
    return () => document.body.classList.remove("nav-open");
  }, [isOpen]);

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`} aria-label="Primary navigation">
      <a className="brand" href="#top" aria-label="Regrounding the Landfill home">
        <span className="brand-mark" />
        <span>Regrounding</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="site-nav"
        onClick={() => setIsOpen((value) => !value)}
      >
        Menu
      </button>
      <nav id="site-nav" className="site-nav">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Reveal({ children, className = "", as: Component = "div", ...props }) {
  return (
    <Component className={`reveal ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}

function App() {
  const [activeMarker, setActiveMarker] = useState("heat");
  const [activePhase, setActivePhase] = useState(0);
  const [imageSwitching, setImageSwitching] = useState(false);
  const marker = markers[activeMarker];
  const phase = phases[activePhase];

  const hotspotData = useMemo(
    () => [
      { id: "heat", label: "Heat", x: "37%", y: "33%" },
      { id: "water", label: "Water", x: "16%", y: "75%" },
      { id: "ecology", label: "Ecology", x: "77%", y: "47%" },
      { id: "people", label: "Trail", x: "58%", y: "59%" }
    ],
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const heroImage = document.querySelector(".hero-image");
    const moveHero = () => {
      if (!heroImage) return;
      const offset = Math.min(window.scrollY * 0.08, 42);
      heroImage.style.transform = `scale(1.03) translateY(${offset}px)`;
    };

    moveHero();
    window.addEventListener("scroll", moveHero, { passive: true });
    return () => window.removeEventListener("scroll", moveHero);
  }, []);

  const changePhase = (index) => {
    setImageSwitching(true);
    window.setTimeout(() => {
      setActivePhase(index);
      setImageSwitching(false);
    }, 180);
  };

  return (
    <>
      <Header />

      <main id="top">
        <section className="hero section-dark" aria-labelledby="hero-title">
          <img className="hero-image" src="/assets/report-page-01.jpg" alt="Karadiyana landfill mound with birds in the sky" />
          <div className="hero-vignette" />
          <Reveal className="hero-content">
            <p className="eyebrow">Karadiyana Landfill, Piliyandala</p>
            <h1 id="hero-title">Regrounding the Landfill</h1>
            <p className="hero-subtitle">Transforming waste ground into a resilient landscape.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#phases">Explore the transformation</a>
              <a className="button button-secondary" href="/212920A%20-%20Report%20Submission_56c3db2afdf1e5737a1a73f453a2ec9c.pdf">
                Open report
              </a>
            </div>
          </Reveal>
          <Reveal className="hero-quote" as="blockquote">
            <span>"We shape our cities, and thereafter our cities shape us."</span>
            <cite>Winston Churchill</cite>
          </Reveal>
          <div className="scroll-cue" aria-hidden="true">
            <span />
            Scroll
          </div>
        </section>

        <section className="intro-band" id="vision" aria-label="Project summary">
          <Reveal className="intro-copy">
            <p className="eyebrow">Project Vision</p>
            <h2>Reduce. Cool. Reuse.</h2>
            <p>
              The landfill is treated as a living system of waste, heat, water, ecology, and community.
              Instead of hiding its damaged identity, the project turns it into a public landscape for
              recovery, learning, and long-term care.
            </p>
          </Reveal>
          <div className="metric-strip" aria-label="Key project facts">
            {[
              ["45", "acres of landfill landscape"],
              ["500", "metric tons received per day"],
              ["03", "phases toward a community forest"],
              ["262", "open landfills across Sri Lanka"]
            ].map(([number, label]) => (
              <article className="metric reveal" key={label}>
                <strong>{number}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="mosaic-section" aria-labelledby="mosaic-title">
          <Reveal className="section-heading">
            <p className="eyebrow">Natural Mosaics</p>
            <h2 id="mosaic-title">From fragmented systems to connected ground</h2>
            <p>
              Karadiyana sits at the meeting point of urban growth, wetland ecology, methane risk,
              hydrological pressure, and social exposure. The design reconnects these fragments through
              a process-based landscape framework.
            </p>
          </Reveal>

          <div className="pillar-grid">
            {[
              ["01", "Control and Reduce", "Stabilize the landfill form, reduce emissions, manage leachate, and organize material flows."],
              ["02", "Ecological Cooling", "Use phytocapping, wetlands, and successional planting to lower heat and rebuild habitats."],
              ["03", "Public Reuse", "Open controlled trails, learning spaces, and community stewardship programs over time."]
            ].map(([number, title, text]) => (
              <article className="pillar reveal" key={title}>
                <span className="pillar-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="context-panel section-dark" id="context" aria-labelledby="context-title">
          <Reveal className="context-copy">
            <p className="eyebrow">Global Context</p>
            <h2 id="context-title">Climate pressure becomes visible in the everyday city</h2>
            <p>
              In Sri Lanka, rising temperatures, high humidity, and rapid urbanization intensify heat stress.
              Open landfills add methane emissions, surface instability, odor, leachate, and localized thermal
              pressure to already vulnerable urban edges.
            </p>
          </Reveal>
          <div className="issue-list" aria-label="Issues created by unmanaged landfills">
            {["Heat generation", "GHG emissions", "Leachate risk", "Biodiversity loss", "Community exposure", "Urban fragmentation"].map((issue) => (
              <span className="issue reveal" key={issue}>{issue}</span>
            ))}
          </div>
        </section>

        <section className="site-section" id="site" aria-labelledby="site-title">
          <Reveal className="site-media">
            <img src="/assets/report-page-15.jpg" alt="Site analysis map of Karadiyana landfill and surrounding community structure" />
          </Reveal>
          <Reveal className="site-copy">
            <p className="eyebrow">Site Analysis</p>
            <h2 id="site-title">A landfill embedded in wetland, road, and community systems</h2>
            <p>
              The Karadiyana landfill is divided by the Mada Ela canal and shaped by organic landfill
              operations, mixed waste disposal, wetland edges, industrial uses, and nearby residential
              communities. Its environmental risk is high, but so is its spatial capacity for landscape-led
              regeneration.
            </p>
            <dl className="site-facts">
              <div><dt>Hydrology</dt><dd>Direct relationship with the Bolgoda River watershed.</dd></div>
              <div><dt>Community</dt><dd>Middle-income, industrial, transient, and vulnerable settlement edges.</dd></div>
              <div><dt>Spatial Form</dt><dd>Waste mounds create terraces, valleys, barriers, and strong visual landmarks.</dd></div>
            </dl>
          </Reveal>
        </section>

        <section className="terrain-lab section-dark" aria-labelledby="terrain-title">
          <Reveal className="terrain-copy">
            <p className="eyebrow">Interactive Reading</p>
            <h2 id="terrain-title">Read the landfill as a changing terrain</h2>
            <p>
              Select the landscape markers to trace how problems become design operations: heat becomes
              shade and evapotranspiration, leachate becomes wetland filtration, waste mounds become
              stabilized ecological ground.
            </p>
          </Reveal>
          <Reveal className="terrain-stage">
            <svg className="terrain-svg" viewBox="0 0 900 420" role="img" aria-labelledby="terrain-svg-title terrain-svg-desc">
              <title id="terrain-svg-title">Abstract terrain section of the Karadiyana landfill</title>
              <desc id="terrain-svg-desc">A stylized landfill mound beside wetland water, forest patches, trails, and emission pipes.</desc>
              <path className="water" d="M0 330 C120 315 200 360 310 335 C430 305 500 350 640 326 C740 310 820 335 900 315 L900 420 L0 420 Z" />
              <path className="ground" d="M0 300 C80 280 125 250 180 244 C245 236 280 160 350 146 C430 127 510 210 580 192 C670 168 725 198 790 220 C835 236 870 238 900 232 L900 420 L0 420 Z" />
              <path className="cap" d="M130 256 C214 230 262 185 333 165 C410 142 486 214 568 201 C661 186 724 207 815 234" />
              <path className="trail" d="M125 281 C214 255 305 230 375 229 C472 228 516 264 610 250 C686 238 745 247 823 234" />
              <g className="pipes"><path d="M340 155 L340 86" /><path d="M462 178 L462 92" /><path d="M589 193 L589 114" /></g>
              <g className="trees"><path d="M208 236 l-15 -34 l-15 34 h11 l-11 25 h30 l-11 -25z" /><path d="M704 204 l-17 -42 l-17 42 h13 l-14 31 h35 l-13 -31z" /><path d="M760 220 l-13 -32 l-13 32 h10 l-11 25 h28 l-11 -25z" /><path d="M270 200 l-12 -28 l-12 28 h9 l-9 21 h25 l-9 -21z" /></g>
              <g className="reeds"><path d="M52 325 C45 300 42 283 48 265" /><path d="M74 322 C70 294 78 280 90 262" /><path d="M102 328 C95 300 95 284 105 266" /><path d="M826 318 C819 296 823 278 836 260" /><path d="M852 318 C850 296 856 282 870 266" /></g>
            </svg>
            {hotspotData.map((hotspot) => (
              <button
                className={`hotspot ${activeMarker === hotspot.id ? "active" : ""}`}
                type="button"
                key={hotspot.id}
                style={{ "--x": hotspot.x, "--y": hotspot.y }}
                onClick={() => setActiveMarker(hotspot.id)}
              >
                {hotspot.label}
              </button>
            ))}
            <div className="marker-card" aria-live="polite">
              <span>{marker.kicker}</span>
              <h3>{marker.title}</h3>
              <p>{marker.text}</p>
            </div>
          </Reveal>
        </section>

        <section className="phases-section" id="phases" aria-labelledby="phases-title">
          <Reveal className="section-heading">
            <p className="eyebrow">Phased Landscape Narratives</p>
            <h2 id="phases-title">A landscape that improves through time</h2>
            <p>
              The proposal does not freeze the landfill into one finished image. It sets a sequence of
              operations so the ground can stabilize, recover, and finally become a community forest trail.
            </p>
          </Reveal>
          <Reveal className="phase-explorer">
            <div className="phase-tabs" role="tablist" aria-label="Project phases">
              {["2026-2028", "2029-2034", "2035-2040", "Future"].map((label, index) => (
                <button
                  className={`phase-tab ${activePhase === index ? "active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={activePhase === index}
                  key={label}
                  onClick={() => changePhase(index)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="phase-display">
              <div className="phase-image-wrap">
                <img className={imageSwitching ? "switching" : ""} src={phase.image} alt={phase.alt} />
              </div>
              <div className="phase-content">
                <span>{phase.kicker}</span>
                <h3>{phase.title}</h3>
                <p>{phase.text}</p>
                <ul>
                  {phase.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="strategy-gallery" aria-labelledby="strategy-title">
          <Reveal className="section-heading">
            <p className="eyebrow">Design Strategies</p>
            <h2 id="strategy-title">Landscape operations for recovery</h2>
          </Reveal>
          <div className="strategy-grid">
            {[
              ["/assets/report-page-05.jpg", "Reduce cool reuse project vision diagrams", "Reduce - Cool - Reuse", "Three actions guide the whole transformation from risk control to public landscape value."],
              ["/assets/report-page-18.jpg", "Project formulation diagram linking landfill issues to ecological, climate, and social potentials", "Regenerative Community Forest", "Environmental degradation, social stress, and climate pressure are reframed as design potentials."],
              ["/assets/report-page-21.jpg", "Phased strategy diagrams showing landfill stabilization, planting, wetlands, and community spaces", "Phased Implementation", "Each operation builds the conditions for the next: control, recovery, access, and stewardship."]
            ].map(([image, alt, title, text]) => (
              <article className="strategy reveal" key={title}>
                <img src={image} alt={alt} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="immersive-map section-dark" aria-labelledby="map-title">
          <Reveal className="map-copy">
            <p className="eyebrow">Master Plan Logic</p>
            <h2 id="map-title">Karadiyana becomes climate-responsive landscape infrastructure</h2>
            <p>
              The landfill is repositioned as a productive part of the urban ecological network, linking
              wetlands, cooling landscapes, habitat patches, learning trails, and community management.
            </p>
          </Reveal>
          <Reveal className="map-stack">
            <img className="map-base" src="/assets/report-page-10.jpg" alt="Context analysis map showing Karadiyana landfill in relation to Colombo and Horana routes" />
            <img className="map-overlay" src="/assets/report-page-19.jpg" alt="Design philosophy and concept sketch for regrading the mosaics" />
          </Reveal>
        </section>

        <section className="future-section" id="future" aria-labelledby="future-title">
          <Reveal className="future-visual" aria-hidden="true">
            <div className="future-sun" />
            <div className="future-forest">
              <span /><span /><span /><span /><span />
            </div>
          </Reveal>
          <Reveal className="future-copy">
            <p className="eyebrow">Steps to the Future</p>
            <h2 id="future-title">The final landscape is maintained by people and ecological processes</h2>
            <p>
              Public-private partnerships, controlled access, community workers, trails, monitoring, and
              ecological succession allow the site to keep adapting. Karadiyana is no longer treated as a
              permanent scar, but as a ground for responsibility and renewal.
            </p>
            <a className="button button-primary" href="#top">Return to start</a>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <p>Comprehensive Design Project 2026 - Bachelor of Landscape Architecture Honours - University of Moratuwa</p>
        <p>Jayanetti D. A. N. K - 212920A</p>
      </footer>
    </>
  );
}

export default App;
