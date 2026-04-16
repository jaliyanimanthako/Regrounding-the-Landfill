import React, { useEffect, useMemo, useState } from "react";

const markers = {
  heat: {
    kicker: "Research",
    title: "Use the site as a living laboratory",
    text: "Support heat mapping, biodiversity records, water testing, landfill monitoring, and long-term landscape performance studies."
  },
  water: {
    kicker: "Park Management",
    title: "Care for the public landscape",
    text: "Create roles for trail safety, visitor guidance, planting maintenance, public programs, monitoring, and everyday park operations."
  },
  ecology: {
    kicker: "Waste Management",
    title: "Improve material systems",
    text: "Connect sorting, recycling, composting, waste education, and safe residual handling with the wider recovery of the landfill ground."
  },
  people: {
    kicker: "Private Partners",
    title: "Invest in long-term stewardship",
    text: "Open space for sponsorships, technical partnerships, research funding, managed facilities, public programs, and maintenance support."
  }
};

const phases = [
  {
    image: "/assets/report-page-20.webp",
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
    image: "/assets/report-page-21.webp",
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
    image: "/assets/report-page-19.webp",
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
    image: "/assets/report-page-01.webp",
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

const navItems = [
  { label: "Project", id: "about" },
  { label: "History", id: "history" },
  { label: "Things", id: "things-to-do" },
  { label: "Learn", id: "learn-with-us" },
  { label: "Opportunities", id: "opportunities" },
  { label: "Map", id: "map" },
  { label: "News", id: "news" },
  { label: "Future", id: "future" }
];

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
          <a key={item.id} href={`#${item.id}`} onClick={() => setIsOpen(false)}>
            {item.label}
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
      { id: "heat", label: "Research", x: "37%", y: "33%" },
      { id: "water", label: "Park", x: "16%", y: "75%" },
      { id: "ecology", label: "Waste", x: "77%", y: "47%" },
      { id: "people", label: "Partners", x: "88%", y: "32%" }
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

  useEffect(() => {
    const preloadPhaseImages = () => {
      phases.forEach(({ image }) => {
        const preloadImage = new Image();
        preloadImage.src = image;
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preloadPhaseImages, { timeout: 4000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = window.setTimeout(preloadPhaseImages, 2500);
    return () => window.clearTimeout(timerId);
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
          <img
            className="hero-image"
            src="/assets/report-page-01.webp"
            alt="Karadiyana landfill mound with birds in the sky"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="hero-vignette" />
          <Reveal className="hero-content">
            <p className="eyebrow">Karadiyana Landfill, Piliyandala</p>
            <h1 id="hero-title">Regrounding the Landfill</h1>
            <p className="hero-subtitle">Transforming waste ground into a resilient landscape.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#about">Explore the project</a>
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

        <section className="intro-band project-band" id="about" aria-label="Project summary">
          <Reveal className="intro-copy project-intro-copy">
            <p className="eyebrow">About the Project</p>
            <h2>Groundwork for a living public landscape</h2>
            <p>
              The landfill is treated as a living system of waste, heat, water, ecology, and community.
              Instead of hiding its damaged identity, the project turns it into a public landscape for
              recovery, learning, and long-term care.
            </p>
          </Reveal>
          <Reveal className="project-overview">
            <img
              src="/assets/report-page-18.webp"
              alt="Project formulation diagram for transforming Karadiyana landfill into a regenerative community forest"
              loading="lazy"
              decoding="async"
            />
            <div className="project-overview-panel">
              <span>Karadiyana Regeneration Framework</span>
              <p>
                A landscape architecture proposal for transforming landfill pressure into ecological,
                climatic, educational, and social value.
              </p>
            </div>
          </Reveal>
          <div className="project-sections" aria-label="Project sections">
            <section className="project-main-section project-vision reveal">
              <div className="project-section-heading">
                <span>01</span>
                <p>Vision</p>
              </div>
              <div className="project-section-copy">
                <h3>Reduce. Cool. Reuse.</h3>
                <p>
                  A damaged waste mound becomes a climate-responsive community forest for learning,
                  ecological recovery, and long-term public care.
                </p>
                <p>
                  The vision is not to hide the landfill behind a finished park image. It is to make the
                  process of recovery visible: waste is controlled, heat is softened through canopy and
                  wetland edges, and public life returns only where the ground can safely support it.
                </p>
                <div className="vision-actions" aria-label="Project vision actions">
                  <span>Reduce landfill impact</span>
                  <span>Cool exposed ground</span>
                  <span>Reuse through learning</span>
                </div>
              </div>
            </section>

            <section className="project-main-section project-development reveal">
              <div className="project-section-heading">
                <span>02</span>
                <p>Development Plan</p>
                <figure className="plan-plate">
                  <img
                    src="/assets/report-page-20.webp"
                    alt="Development plan drawing for the phased transformation of Karadiyana landfill"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>
                    <strong>From waste mound to community forest</strong>
                    <span>Control, repair, access, and long-term care move together.</span>
                  </figcaption>
                  <div className="plan-plate-phases" aria-label="Development plan sequence">
                    <b>Stabilize</b>
                    <b>Recover</b>
                    <b>Open</b>
                    <b>Maintain</b>
                  </div>
                </figure>
              </div>
              <div className="project-section-copy">
                <h3>Control first, open carefully.</h3>
                <p>
                  The plan works in stages because the landfill must be made stable before it can become
                  an everyday public landscape. Each stage reduces risk, strengthens ecological systems,
                  and prepares the next layer of access.
                </p>
                <p>
                  The development strategy moves from technical control to ecological repair and then to
                  public use. This gives the project a realistic order: first stop the most harmful
                  processes, then create living surfaces, then guide people through selected zones, and
                  finally build a maintenance culture around the site.
                </p>
                <div className="project-detail-grid">
                  {[
                    ["Stabilize", "Waste separation, gas control, leachate treatment, landform shaping, and safer landfill edges become the first layer of action."],
                    ["Recover", "Phytocapping, drainage, constructed wetlands, soil improvement, and resilient planting rebuild the ecological ground."],
                    ["Open", "Controlled trails, learning stops, viewpoints, community spaces, and managed access introduce public life gradually."],
                    ["Maintain", "Monitoring, adaptive planting, local stewardship, and public-private management keep the landscape responsive."]
                  ].map(([title, text]) => (
                    <article className="project-detail" key={title}>
                      <h4>{title}</h4>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
                <p className="project-process-note">
                  This sequence keeps the proposal grounded: public experience follows environmental
                  performance, not the other way around.
                </p>
              </div>
            </section>

            <section className="project-designer reveal">
              <div className="designer-showcase">
                <div className="designer-copy">
                  <div className="designer-heading-row">
                    <span>03</span>
                    <p>The Designer</p>
                  </div>
                  <span className="designer-tag">Design Student Portfolio</span>
                  <h3>Landscape as responsibility.</h3>
                  <p>
                    Jayanetti D. A. N. K develops this proposal as a Comprehensive Design Project for the
                    Bachelor of Landscape Architecture Honours program at the University of Moratuwa. The
                    design position treats Karadiyana as environmental repair, public memory, and future
                    community infrastructure.
                  </p>
                  <p className="designer-note">
                    The work connects research, mapping, systems thinking, and landscape imagination into
                    one proposal for a place that is usually seen only as waste ground.
                  </p>
                  <div className="designer-profile">
                    <div>
                      <strong>Focus</strong>
                      <span>Landfill recovery, climate adaptation, ecological succession, community learning, and public landscape value.</span>
                    </div>
                    <div>
                      <strong>Method</strong>
                      <span>Site analysis, phased planning, hydrological thinking, planting strategy, access control, and long-term care systems.</span>
                    </div>
                    <div>
                      <strong>Role</strong>
                      <span>Translate technical landfill problems into spatial experiences that people can understand, use, maintain, and learn from.</span>
                    </div>
                  </div>
                </div>
                <figure className="designer-portrait">
                  <div className="designer-photo-frame">
                    <img
                      src="/assets/designer-photo.webp"
                      alt="Portrait of Jayanetti D. A. N. K"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption>
                    <strong>Jayanetti D. A. N. K</strong>
                    <span>BLA Honours, University of Moratuwa</span>
                  </figcaption>
                </figure>
              </div>
            </section>
          </div>
        </section>

        <section className="context-panel section-dark" id="history" aria-labelledby="history-title">
          <Reveal className="context-copy">
            <p className="eyebrow">History</p>
            <h2 id="history-title">From waste ground to energy promise</h2>
            <p>
              Karadiyana is also known through the Colombo South Waste Processing Facility, referred to as
              the Karadiyana W2E Project or Karadiyana Power Station. Its recent history connects landfill
              pressure, waste-to-energy ambition, private operation, and public environmental concern.
            </p>
            <p>
              The facility was planned as a municipal solid waste-fired thermal power station on a 10-acre
              site, with construction beginning on 23 August 2017. The proposal linked 500 metric tons of
              daily waste intake with a 10 MW generation target, reframing waste as both an energy resource
              and a landscape burden.
            </p>
          </Reveal>
          <div className="history-panel" aria-label="Karadiyana project history">
            <article className="history-feature reveal">
              <span>2017</span>
              <h3>Waste-to-energy works begin</h3>
              <p>
                Construction began after the project was selected through the Urban Development Authority
                bid process. Fairway Waste Management was identified as operator, with Fairway Holdings as
                owner.
              </p>
            </article>
            <div className="history-facts">
              {[
                ["10 acres", "Karadiyana site area"],
                ["10 MW", "planned generation capacity"],
                ["500 MT/day", "municipal solid waste intake"],
                ["$91M", "estimated 2017 project cost"]
              ].map(([value, label]) => (
                <article className="history-fact reveal" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
            <div className="history-notes reveal">
              <p>
                The scheme described bottom ash reuse for road construction and other applications, while
                unusable fly ash was to be disposed of at designated locations.
              </p>
              <p>
                This design project reads that industrial history as unfinished ground: a place where
                technical systems, ecological repair, and public memory need to be planned together.
              </p>
            </div>
          </div>
        </section>

        <section className="mosaic-section" id="things-to-do" aria-labelledby="things-title">
          <Reveal className="section-heading">
            <p className="eyebrow">Things To Do</p>
            <h2 id="things-title">Move through a recovered landscape</h2>
            <p>
              The site is imagined as a careful public landscape where movement, observation, play, art,
              and ecological recovery sit together. Activities stay guided by safety and landscape care.
            </p>
          </Reveal>

          <div className="pillar-grid">
            {[
              ["01", "Kayaking", "Follow calm water edges by kayak and read the recovered wetland from a slower, closer point of view."],
              ["02", "Urban Observation", "Use lookouts and mapped stops to study landfill form, settlement edges, movement corridors, and city growth."],
              ["03", "Forest Trail", "Walk shaded routes through new planting zones, habitat patches, and cooling groves as the site matures."],
              ["04", "Freedom Grounds", "Gather in open flexible grounds for community events, outdoor learning, rest, and everyday public use."],
              ["05", "Waste Sculpture Lands", "Explore art landscapes where recovered materials and waste memory become public installations."]
            ].map(([number, title, text]) => (
              <article className="pillar reveal" key={title}>
                <span className="pillar-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="site-section" id="learn-with-us" aria-labelledby="learn-title">
          <Reveal className="site-media">
            <img
              src="/assets/report-page-15.webp"
              alt="Site analysis map of Karadiyana landfill and surrounding community structure"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
          <Reveal className="site-copy">
            <p className="eyebrow">Learn With Us</p>
            <h2 id="learn-title">Read the ground like an open classroom</h2>
            <p>
              The project turns technical landfill recovery into public knowledge. Students, residents,
              researchers, and visitors can learn how waste systems, water, heat, planting, and community
              stewardship connect inside one landscape.
            </p>
            <dl className="site-facts">
              <div><dt>Field Walks</dt><dd>Guided routes explain landfill layers, wetland buffers, planting zones, and safe public access.</dd></div>
              <div><dt>Flora and Fauna</dt><dd>Observe pioneer plants, wetland vegetation, bird movement, insects, and habitat patches as biodiversity returns.</dd></div>
              <div><dt>Waste Recycling</dt><dd>Learn how waste separation, material recovery, reuse, and recycling reduce pressure on landfill systems.</dd></div>
              <div><dt>Research Studio</dt><dd>Mapping, monitoring, and design exercises help improve the project through evidence.</dd></div>
            </dl>
          </Reveal>
        </section>

        <section className="terrain-lab section-dark" id="opportunities" aria-labelledby="opportunities-title">
          <Reveal className="terrain-copy">
            <p className="eyebrow">Opportunities</p>
            <h2 id="opportunities-title">Join the regeneration network</h2>
            <p>
              The recovered landscape can support research, park management, waste management, and private
              partnerships. Select a marker to see how each opportunity can help the site work over time.
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

        <section className="location-section" id="map" aria-labelledby="map-title">
          <Reveal className="location-copy">
            <p className="eyebrow">Map</p>
            <h2 id="map-title">Find the ground where recovery begins</h2>
            <p>
              The project site sits at Thumbowila, Karadiyana, Piliyandala, within the Colombo
              metropolitan edge where landfill operations, wetland systems, residential communities,
              and regional movement corridors meet.
            </p>
            <div className="location-facts" aria-label="Location facts">
              <span>Thumbowila, Karadiyana</span>
              <span>Piliyandala, Sri Lanka</span>
              <span>Near Bolgoda watershed</span>
            </div>
            <a
              className="button button-map"
              href="https://www.google.com/maps/search/?api=1&query=MIHISARU%20Resource%20Management%20Centre%20Thumbowila%20Karadiyana%20Piliyandala%20Sri%20Lanka"
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps
            </a>
          </Reveal>
          <Reveal className="map-embed">
            <iframe
              title="Google Map showing Mihisaru Resource Management Centre in Karadiyana, Piliyandala"
              src="https://www.google.com/maps?q=MIHISARU%20Resource%20Management%20Centre%20Thumbowila%20Karadiyana%20Piliyandala%20Sri%20Lanka&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </section>

        <section className="strategy-gallery" id="news" aria-labelledby="news-title">
          <Reveal className="section-heading">
            <p className="eyebrow">News</p>
            <h2 id="news-title">Field notes from the recovery ground</h2>
            <p>
              Updates keep the project visible as it moves from design proposal into discussion,
              stewardship planning, field learning, and future implementation.
            </p>
          </Reveal>
          <div className="strategy-grid">
            {[
              ["/assets/report-page-05.webp", "Reduce cool reuse project vision diagrams", "Design Story Published", "The project frames Karadiyana through three clear actions: reduce waste impact, cool the ground, and reuse the landscape."],
              ["/assets/report-page-18.webp", "Project formulation diagram linking landfill issues to ecological, climate, and social potentials", "Community Forest Idea Shared", "The landfill is presented as a future learning forest where climate repair and public care can grow together."],
              ["/assets/report-page-21.webp", "Phased strategy diagrams showing landfill stabilization, planting, wetlands, and community spaces", "Roadmap Ready", "The implementation sequence sets out control, ecological recovery, public access, and long-term stewardship."
              ]
            ].map(([image, alt, title, text]) => (
              <article className="strategy reveal" key={title}>
                <img src={image} alt={alt} loading="lazy" decoding="async" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="phases-section" id="future" aria-labelledby="future-title">
          <Reveal className="section-heading">
            <p className="eyebrow">Future</p>
            <h2 id="future-title">The forest after the landfill</h2>
            <p>
              The proposal does not freeze the landfill into one finished image. It sets a sequence of
              operations so the ground can stabilize, recover, open carefully, and become a community
              forest maintained by people and ecological processes.
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
                <img
                  className={imageSwitching ? "switching" : ""}
                  src={phase.image}
                  alt={phase.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="phase-content">
                <span>{phase.kicker}</span>
                <h3>{phase.title}</h3>
                <p>{phase.text}</p>
                <ul>
                  {phase.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <a className="button button-primary" href="#top">Return to start</a>
              </div>
            </div>
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
