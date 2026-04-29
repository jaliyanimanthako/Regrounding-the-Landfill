import React, { useEffect, useMemo, useRef, useState } from "react";
import mainLogo from "../assets/karadiyana-logo.webp";

const markers = {
  heat: {
    kicker: "Research",
    title: "Research Team Opportunities",
    text: "The research team invites individuals to engage in field-based and applied research that supports the evolution of the site through ecological assessment, environmental monitoring, and regenerative design practices.",
    sections: [
      {
        title: "Available Roles / Positions",
        items: [
          { title: "Biodiversity & Ecology Researchers" },
          { title: "Flora & Vegetation Analysts" },
          { title: "Faunal Monitoring Specialists" },
          { title: "Environmental Quality Analysts" },
          { title: "Waste & Material Innovation Researchers" },
          { title: "Climate & Microclimate Researchers" }
        ]
      }
    ]
  },
  water: {
    kicker: "Park Management",
    title: "Park Management Opportunities",
    text: "The regenerated community forest is sustained through an active and inclusive park management system that invites public participation in long-term stewardship, maintenance, ecological health, and social value.",
    sections: [
      {
        title: "Available Roles / Positions",
        items: [
          {
            title: "Landscape Maintenance Assistants",
            text: "Support and ensure healthy ecological growth."
          },
          {
            title: "Park Operations Coordinators",
            text: "Manage daily activities, visitor flow, safety protocols, and coordination between different functional zones of the park."
          },
          {
            title: "Environmental Monitoring Team",
            text: "Assist in tracking air quality, soil conditions, vegetation growth, and overall ecological performance of the regenerated site."
          },
          {
            title: "Community Engagement Facilitators",
            text: "Lead awareness programs, guided walks, and educational activities to connect visitors with the story and function of the landscape."
          }
        ]
      }
    ]
  },
  ecology: {
    kicker: "Waste Management",
    title: "Waste Management Team Opportunities",
    text: "The waste management team offers practical and technical roles that are essential for maintaining the daily functioning of the site.",
    sections: [
      {
        title: "Available Roles / Positions",
        items: [
          { title: "Waste Sorting & Segregation Staff" },
          { title: "Recycling Operations Assistants" },
          { title: "Organic Processing Technicians" },
          { title: "Emissions Monitoring Assistants" }
        ]
      }
    ]
  },
  people: {
    kicker: "Private Partners",
    title: "Private Partnership Opportunities",
    text: "The project offers entry points for private firms, entrepreneurs, and organizations to invest, operate, and innovate within a functioning regenerative landscape while contributing to environmental restoration.",
    sections: [
      {
        title: "Partnership Areas",
        items: [
          {
            title: "Material Procurement & Recycling Partnerships",
            text: "Purchase sorted waste streams such as plastic, paper, glass, and metal, and integrate them into industrial recycling and manufacturing processes."
          },
          {
            title: "Organic Waste & Bioenergy Ventures",
            text: "Invest in or operate composting, biogas, and organic processing systems to generate energy and soil products."
          },
          {
            title: "Waste-to-Product Innovation",
            text: "Develop new materials and products using recycled or recovered waste, including construction materials, composites, and design products."
          },
          {
            title: "Technology & Infrastructure Investment",
            text: "Support advanced technologies for waste sorting, emissions control, leachate treatment, and monitoring systems."
          }
        ]
      }
    ]
  }
};

const phases = [
  {
    image: "/assets/report-page-20.webp",
    alt: "Master plan diagram showing the phased transformation of Karadiyana landfill",
    kicker: "Present (2026-2028)",
    title: "Existing Condition",
    text: "Stabilizing the landfill and controlling environmental impacts through cut-and-fill operations, improved slope stability, better soil conditions, and the formation of a basic surface.",
    items: [
      "Early engagement of surrounding communities",
      "Opportunities to participate as workers in waste management",
      "Participation in site improvement activities"
    ]
  },
  {
    image: "/assets/report-page-21.webp",
    alt: "Phased strategy diagrams showing ecological recovery and wetland drainage strategies",
    kicker: "Phase 02",
    title: "Ecological Recovery and Growth",
    text: "Planting strategies, wetland restoration, and habitat improvement shape the next stage of ecological recovery across the site.",
    items: [
      "Community participation in maintenance",
      "Active roles in planting programs",
      "Ongoing monitoring activities"
    ]
  },
  {
    image: "/assets/report-page-19.webp",
    alt: "Design concept sketch showing climate, social, and ecological relationships",
    kicker: "Phase 03",
    title: "Community Forest",
    text: "Trails, open spaces, and learning areas are introduced so people can experience ecological systems, biodiversity, and the visible transformation of the site.",
    items: [
      "Community members become part of the management structure",
      "Shared roles in site operations",
      "Stewardship of trails, learning areas, and public space"
    ]
  },
  {
    image: "/assets/report-page-01.webp",
    alt: "Karadiyana landfill landscape with birds above the mound",
    kicker: "Future Vision",
    title: "Resilient and Adaptive Landscape",
    text: "The long-term vision is a self-sustaining and resilient landscape where the project continues to evolve through ecological performance and adaptive care.",
    items: [
      "Strong community ownership",
      "Continuous care",
      "Ongoing adaptation"
    ]
  }
];

const navItems = [
  { label: "Things", id: "things-to-do" },
  { label: "News", id: "news" },
  { label: "Map", id: "map" },
  { label: "Learn", id: "learn-with-us" },
  { label: "Opportunities", id: "opportunities" },
  { label: "Project", id: "about" },
  { label: "History", id: "history" },
  { label: "Future", id: "future" }
];

const thingsToDoItems = [
  {
    number: "01",
    title: "Kayaking",
    text: "Follow calm water edges by kayak and read the recovered wetland from a slower, closer point of view.",
    detail: "Kayaking opens a direct relationship with the restored water system. It lets visitors move slowly through the wetland edge, observe cooling landscapes, and understand how water management becomes part of public experience.",
    images: [
      ["/assets/kayaking-1.webp", "Kayaking view across the restored wetland landscape"]
    ]
  },
  {
    number: "02",
    title: "Urban Observation",
    text: "Use lookouts and mapped stops to study landfill form, settlement edges, movement corridors, and city growth.",
    detail: "Observation points frame the site within the wider metropolitan landscape. These stops make it possible to read the landfill mound, surrounding neighborhoods, mobility corridors, and the environmental pressures created by urban expansion.",
    images: [
      ["/assets/urban-observation.webp", "Urban observation lawn area view across the Karadiyana landscape"]
    ]
  },
  {
    number: "03",
    title: "Forest Trail",
    text: "Walk shaded routes through new planting zones, habitat patches, and cooling groves as the site matures.",
    detail: "The forest trail is a guided movement system through recovering ecological ground. It connects planting zones, shaded routes, and habitat patches so visitors can experience ecological succession and long-term landscape care.",
    images: [
      ["/assets/forest-trail.webp", "Forest trail landscape view through restored planting and path systems"],
      ["/assets/forest-trail-2.webp", "Forest trail view showing dense vegetation and shaded movement routes"]
    ]
  },
  {
    number: "04",
    title: "Wetland Trails",
    text: "Gather in open flexible grounds for community events, outdoor learning, rest, and everyday public use.",
    detail: "Freedom Grounds are adaptable public clearings within the larger landscape. They support events, outdoor learning, rest, and casual everyday use while staying compatible with the site's long-term ecological recovery.",
    images: [
      ["/assets/freedom-grounds.webp", "Freedom Grounds wetland trail landscape view across the regenerated site"]
    ]
  },
  {
    number: "05",
    title: "Waste Sculpture Lands",
    text: "Explore art landscapes where recovered materials and waste memory become public installations.",
    detail: "Waste Sculpture Lands turn discarded materials into visible cultural elements. The installations keep the memory of the landfill present while reworking waste into public art, interpretation, and creative reuse.",
    images: [
      ["/assets/waste-sculpture-lands.webp", "Waste sculpture landscape view showing reused material installations across the regenerated site"]
    ]
  }
];

const gallerySlides = [
  [
    "/assets/gallery-slide-1.webp",
    "Concept visualization of the regenerated Karadiyana landscape"
  ],
  [
    "/assets/gallery-slide-2.webp",
    "View of public landscape spaces imagined for the Karadiyana site"
  ],
  [
    "/assets/gallery-slide-3.webp",
    "Illustration of ecological restoration and community use at Karadiyana"
  ],
  [
    "/assets/gallery-slide-4.webp",
    "Future vision rendering of the Karadiyana transformed landscape"
  ]
];

const mapImageSrc = "/assets/map.webp";

const wasteCollectionData = [
  { label: "Dehiwala - Mt. Lavinia MC", value: 179, color: "#c1ae92" },
  { label: "Moratuwa MC", value: 126, color: "#9cb07b" },
  { label: "Sri Jayawardenepura MC", value: 37, color: "#95a985" },
  { label: "Boralesgamuwa UC", value: 30, color: "#d8c46b" },
  { label: "Kesbewa UC", value: 47, color: "#4c6757" },
  { label: "Maharagama UC", value: 75, color: "#7b6246" },
  { label: "Homagama PS", value: 32, color: "#6f8660" }
];

const wasteCollectionTotal = wasteCollectionData.reduce((sum, item) => sum + item.value, 0);

const wasteCollectionBreakdown = wasteCollectionData.map((item) => ({
  ...item,
  share: (item.value / wasteCollectionTotal) * 100
}));

const wasteCollectionChart = (() => {
  let currentAngle = 0;

  return `conic-gradient(${wasteCollectionBreakdown
    .map(({ color, share }) => {
      const start = currentAngle;
      const end = currentAngle + share * 3.6;
      currentAngle = end;
      return `${color} ${start}deg ${end}deg`;
    })
    .join(", ")})`;
})();

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
        <span className="brand-logo-frame" aria-hidden="true">
          <img className="brand-logo" src={mainLogo} alt="Karadiyana Forest Management" />
        </span>
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
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isMapImageReady, setIsMapImageReady] = useState(false);
  const [activeThingToDo, setActiveThingToDo] = useState(null);
  const [activeGallerySlide, setActiveGallerySlide] = useState(0);
  const [isHeroVideoLoading, setIsHeroVideoLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const heroVideoRef = useRef(null);
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
    let isActive = true;
    const preloadMapImage = new Image();
    const markMapReady = () => {
      if (isActive) setIsMapImageReady(true);
    };

    preloadMapImage.onload = markMapReady;
    preloadMapImage.onerror = markMapReady;
    preloadMapImage.src = mapImageSrc;

    if (preloadMapImage.complete) {
      markMapReady();
    }

    return () => {
      isActive = false;
      preloadMapImage.onload = null;
      preloadMapImage.onerror = null;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            const ring = entry.target.querySelector(".history-chart-ring");
            if (ring) {
              window.setTimeout(() => ring.classList.add("chart-loaded"), 300);
            }
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
    const heroBackground = document.querySelector(".hero-background");
    const moveHero = () => {
      if (!heroBackground) return;
      const offset = Math.min(window.scrollY * 0.08, 42);
      heroBackground.style.transform = `scale(1.03) translateY(${offset}px)`;
    };

    moveHero();
    window.addEventListener("scroll", moveHero, { passive: true });
    return () => window.removeEventListener("scroll", moveHero);
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return undefined;

    const onPlaying = () => {
      setIsHeroVideoLoading(false);
      setIsVideoPlaying(true);
    };
    const onCanPlay = () => setIsHeroVideoLoading(false);
    const onWaiting = () => setIsHeroVideoLoading(true);
    const onStalled = () => setIsHeroVideoLoading(true);
    const onError = () => setIsHeroVideoLoading(true);

    video.addEventListener("playing", onPlaying);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("stalled", onStalled);
    video.addEventListener("error", onError);

    const handleVisibility = () => {
      if (!document.hidden && video.paused) video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const unlockEvents = ["click", "touchstart", "touchend", "scroll", "keydown"];
    const doPlay = () => {
      video.play().catch(() => {});
      unlockEvents.forEach((e) => document.removeEventListener(e, doPlay));
    };
    const addGestureListeners = () => {
      unlockEvents.forEach((e) => document.addEventListener(e, doPlay, { passive: true }));
    };

    // Let the autoPlay attribute attempt play first.
    // After 600 ms, if the video is still paused (autoPlay was blocked by Safari policy),
    // register gesture listeners so the first interaction starts it.
    const fallbackTimer = setTimeout(() => {
      if (video.paused) addGestureListeners();
    }, 600);

    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("stalled", onStalled);
      video.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", handleVisibility);
      unlockEvents.forEach((e) => document.removeEventListener(e, doPlay));
    };
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

  useEffect(() => {
    document.body.classList.toggle("map-expanded", isMapExpanded);
    return () => document.body.classList.remove("map-expanded");
  }, [isMapExpanded]);

  useEffect(() => {
    document.body.classList.toggle("activity-open", Boolean(activeThingToDo));
    return () => document.body.classList.remove("activity-open");
  }, [activeThingToDo]);

  useEffect(() => {
    if (!isMapExpanded) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMapExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMapExpanded]);

  useEffect(() => {
    if (!activeThingToDo) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveThingToDo(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeThingToDo]);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveGallerySlide((current) => (current + 1) % gallerySlides.length);
    }, 3500);

    return () => window.clearInterval(timerId);
  }, []);

  const changePhase = (index) => {
    setActivePhase(index);
  };

  return (
    <>
      <Header />

      <main id="top">
        <section className="hero section-dark" aria-labelledby="hero-title">
          <div className="hero-background" aria-hidden="true">
            <video
              ref={heroVideoRef}
              className={`hero-media hero-video${isVideoPlaying ? " is-playing" : ""}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              x-webkit-airplay="deny"
            >
              <source src="/assets/hero-video-hevc.mp4" type='video/mp4; codecs="hvc1"' />
              <source src="/assets/hero-video-h264.mp4" type='video/mp4; codecs="avc1.4D401E"' />
              <source src="/assets/hero-video-av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
              <source src="/assets/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
          <div className={`hero-loader ${isHeroVideoLoading ? "active" : ""}`} aria-hidden="true">
            <span className="hero-loader-ring" />
            <span className="hero-loader-text">Loading landscape</span>
          </div>
          <div className="hero-vignette" />
          <Reveal className="hero-content">
            <p className="eyebrow">Karadiyana, Piliyandala</p>
            <h1 id="hero-title">Community Forest Park</h1>
            <p className="hero-subtitle">Regrounding the landfill.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#about">Explore the project</a>
              <a className="button button-secondary" href="/report-submission.pdf">
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
            {thingsToDoItems.map((item) => (
              <button
                className="pillar reveal"
                type="button"
                key={item.title}
                aria-haspopup="dialog"
                aria-label={`Open details for ${item.title}`}
                onClick={() => setActiveThingToDo(item)}
              >
                <div className="pillar-media" aria-hidden="true">
                  <img
                    src={item.images[0][0]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="pillar-cta">Click to explore</span>
                <span className="pillar-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="strategy-gallery" id="news" aria-labelledby="news-title">
          <Reveal className="section-heading">
            <p className="eyebrow">News</p>
            <h2 id="news-title">Project gallery</h2>
          </Reveal>
          <Reveal className="gallery-slider">
            <div className="gallery-slider-frame">
              {gallerySlides.map(([image, alt], index) => (
                <img
                  className={`gallery-slide ${activeGallerySlide === index ? "active" : ""}`}
                  src={image}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  key={image}
                />
              ))}
            </div>
            <div className="gallery-slider-dots" aria-label="Gallery navigation">
              {gallerySlides.map((_, index) => (
                <button
                  className={`gallery-slider-dot ${activeGallerySlide === index ? "active" : ""}`}
                  type="button"
                  key={index}
                  aria-label={`Show slide ${index + 1}`}
                  onClick={() => setActiveGallerySlide(index)}
                />
              ))}
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
          <Reveal className={`map-embed${isMapImageReady ? " is-loaded" : ""}`}>
            <button
              className="map-expand-trigger"
              type="button"
              aria-label="Enlarge map"
              aria-haspopup="dialog"
              aria-expanded={isMapExpanded}
              onClick={() => setIsMapExpanded(true)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7" />
                <path d="M9 7h8v8" />
                <path d="M15 17H7V9" />
              </svg>
            </button>
            {!isMapImageReady ? (
              <div className="map-loader" aria-live="polite">
                <span className="map-loader-ring" aria-hidden="true" />
                <span className="map-loader-text">Loading the map</span>
              </div>
            ) : null}
            <img
              src={mapImageSrc}
              alt="Map showing the Karadiyana project site and surrounding area"
              loading="lazy"
              decoding="async"
              onLoad={() => setIsMapImageReady(true)}
              onError={() => setIsMapImageReady(true)}
            />
          </Reveal>
        </section>

        <section className="learn-section" id="learn-with-us" aria-labelledby="learn-title">
          <Reveal className="learn-banner">
            <img
              className="learn-banner-img"
              src="/assets/learn.webp"
              alt="Site analysis map of Karadiyana landfill and surrounding community structure"
              loading="lazy"
              decoding="async"
            />
            <div className="learn-banner-veil" aria-hidden="true" />
            <div className="learn-banner-copy">
              <p className="eyebrow">Learn With Us</p>
              <h2 id="learn-title">Read the ground like an open classroom</h2>
              <p>
                The project turns technical landfill recovery into public knowledge. Students, residents,
                researchers, and visitors can learn how waste systems, water, heat, planting, and community
                stewardship connect inside one landscape.
              </p>
            </div>
          </Reveal>
          <div className="learn-cards-section">
            <p className="learning-intro">Four ways to study how a damaged ground becomes a living system.</p>
            <div className="learning-grid" aria-label="Learning experiences">
              {[
                ["01", "Route", "Field Walks", "Guided routes explain landfill layers, wetland buffers, planting zones, and safe public access."],
                ["02", "Habitat", "Flora and Fauna", "Observe pioneer plants, wetland vegetation, bird movement, insects, and habitat patches as biodiversity returns."],
                ["03", "Cycle", "Waste Recycling", "Learn how waste separation, material recovery, reuse, and recycling reduce pressure on landfill systems."],
                ["04", "Studio", "Research Studio", "Mapping, monitoring, and design exercises help improve the project through evidence."]
              ].map(([number, kicker, title, text]) => (
                <article className="learning-card reveal" key={title}>
                  <div className="learning-card-top">
                    <span className="learning-card-number">{number}</span>
                    <span className="learning-card-kicker">{kicker}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
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
            <div className="terrain-canvas">
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
            </div>
            <div className="marker-card" aria-live="polite">
              <span>{marker.kicker}</span>
              <h3>{marker.title}</h3>
              <p>{marker.text}</p>
              {marker.sections?.map((section) => (
                <div className="marker-section" key={section.title}>
                  <h4>{section.title}</h4>
                  <ul className="marker-list">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}</strong>
                        {item.text ? <p>{item.text}</p> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
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
              className="project-overview-formulation"
              src="/assets/formulation.webp"
              alt="Project formulation diagram for transforming Karadiyana landfill into a regenerative community forest"
              loading="lazy"
              decoding="async"
            />
            <div className="project-overview-panel">
              <span>Karadiyana Regeneration Framework</span>
              <p>
                The project shifts waste landscapes from degraded and isolated zones into productive,
                resilient, and interconnected ecological systems that support both nature and community.
              </p>
              <p className="project-overview-detail">
                Guided by the concept of "Regrounding the Natural Mosaics," the design responds through
                landscape architectural strategies that integrate mitigation, adaptation, and spatial
                experience.
              </p>
              <ul className="project-overview-list" aria-label="Project formulation objectives">
                <li>Improving ecological systems</li>
                <li>Enhancing climate performance</li>
                <li>Strengthening community interaction</li>
              </ul>
            </div>
          </Reveal>
          <div className="project-sections" aria-label="Project sections">
            <section className="project-main-section project-vision reveal">
              <div className="project-section-heading">
                <span>01</span>
                <p>Vision</p>
              </div>
              <div className="project-vision-grid">
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
                <figure className="project-vision-figure">
                  <img
                    src="/assets/reduce-cool-reuse-card.webp"
                    alt="Concept diagram showing reduce, cool, and reuse strategies transforming the landfill into a healthier public landscape"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </div>
            </section>

            <section className="project-designer reveal">
              <div className="designer-grid">
                <div className="designer-left">
                  <div className="designer-label">
                    <span>02</span>
                    <p>The Designer</p>
                  </div>
                  <span className="designer-tag">Design Student Portfolio</span>
                  <h3>Landscape as responsibility.</h3>
                  <p className="designer-body-text">
                    <span className="designer-name">Nethma Jayanetti</span> develops this proposal as a Comprehensive Design Project for the
                    Bachelor of Landscape Architecture Honours program at the University of Moratuwa. The
                    design position treats Karadiyana as environmental repair, public memory, and future
                    community infrastructure.
                  </p>
                  <p className="designer-note">
                    The work connects research, mapping, systems thinking, and landscape imagination into
                    one proposal for a place that is usually seen only as waste ground.
                  </p>
                  <div className="designer-attrs">
                    {[
                      ["Focus", "Landfill recovery, climate adaptation, ecological succession, community learning, and public landscape value."],
                      ["Method", "Site analysis, phased planning, hydrological thinking, planting strategy, access control, and long-term care systems."],
                      ["Role", "Translate technical landfill problems into spatial experiences that people can understand, use, maintain, and learn from."]
                    ].map(([label, text]) => (
                      <div className="designer-attr" key={label}>
                        <strong>{label}</strong>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <figure className="designer-figure">
                  <div className="designer-photo-wrap">
                    <img
                      src="/assets/designer-photo.webp"
                      alt="Portrait of Nethma Jayanetti"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption>
                    <strong>Nethma Jayanetti</strong>
                    <span>BLA Honours, University of Moratuwa</span>
                  </figcaption>
                </figure>
              </div>
            </section>
          </div>
        </section>

        <section className="history-section section-dark" id="history" aria-labelledby="history-title">
          <div className="history-top">
            <Reveal className="context-copy">
              <p className="eyebrow">History</p>
              <h2 id="history-title">From open dumping ground to metropolitan landfill</h2>
              <p>
                The Karadiyana Landfill at Thumbowila within the Kesbewa Divisional Secretariat Division in
                Colombo District has functioned as a principal municipal solid waste disposal site for the
                Colombo Metropolitan Region since the early 1990s.
              </p>
              <p>
                It was selected during a period of rapid urban expansion when surrounding local authorities
                needed a centralized location to absorb growing waste volumes from urban and peri-urban
                settlements. The site initially operated as an open dumping ground under local government
                administration, including Kesbewa and Boralesgamuwa.
              </p>
              <p>
                Because the ground developed without engineered containment, segregation systems, or formal
                environmental management, waste accumulated incrementally in layered mounds through the 1990s
                and early 2000s as population, urbanization, and consumption increased across greater Colombo.
              </p>
            </Reveal>
            <Reveal className="history-era-card">
              <img
                className="history-era-image"
                src="/assets/history.webp"
                alt="Karadiyana landfill history landscape"
                loading="lazy"
                decoding="async"
              />
              <div className="history-era-decade" aria-hidden="true">90s</div>
              <span className="history-era-badge">Early 1990s</span>
              <h3>A 40-acre landfill grows with the city</h3>
              <p>
                Throughout the 1990s and early 2000s, Karadiyana received mixed municipal waste and, at
                times, commercial and industrial waste with minimal long-term planning. Continuous
                depositing, spreading, and compaction gradually formed the large waste mounds that define
                the site today.
              </p>
            </Reveal>
          </div>

          <Reveal className="history-stats-strip" aria-label="Key statistics">
            {[
              ["40 acres", "Karadiyana site area"],
              ["Early 1990s", "principal disposal role begins"],
              ["526 MT/day", "listed daily waste collection"],
              ["7 local bodies", "feeding the landfill system"]
            ].map(([value, label]) => (
              <article className="history-stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </Reveal>

          <div className="history-bottom">
            <article className="history-chart reveal" aria-labelledby="history-chart-title">
              <div
                className="history-chart-ring"
                style={{ "--chart-fill": wasteCollectionChart }}
                aria-hidden="true"
              >
                <div className="history-chart-center">
                  <strong>{wasteCollectionTotal}</strong>
                  <span>MT per day</span>
                </div>
              </div>
              <div className="history-chart-copy">
                <h3 id="history-chart-title">Waste collection per day by local authority</h3>
                <p>
                  By the mid-2000s, Karadiyana had become a key disposal site serving multiple local
                  authorities across the greater Colombo edge.
                </p>
                <ul className="history-chart-list">
                  {wasteCollectionBreakdown.map((item) => (
                    <li className="history-chart-item" key={item.label}>
                      <span
                        className="history-chart-swatch"
                        style={{ "--swatch": item.color }}
                        aria-hidden="true"
                      />
                      <span className="history-chart-label">{item.label}</span>
                      <strong>{item.value} MT</strong>
                      <span className="history-chart-share">{item.share.toFixed(1)}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            <div className="history-notes reveal">
              <p>
                The absence of structured landfill engineering meant waste was accepted and layered over
                time with limited control, making Karadiyana one of the region&apos;s most visible examples of
                unmanaged metropolitan expansion.
              </p>
              <p>
                This project treats that history as unfinished ground, where environmental repair, public
                memory, and future landscape stewardship need to be planned together.
              </p>
            </div>
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
            <div className="phase-display">
              <div className="phase-plan-wrap">
                <div className="phase-plan-label">Master Plan</div>
                <img
                  src="/assets/master-plan.png"
                  alt="Master plan for the Karadiyana Landfill transformation"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="phase-right">
                <div className="phase-tabs" role="tablist" aria-label="Project phases">
                  {["2026–2028", "2029–2034", "2035–2040", "Future"].map((label, index) => (
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
                <div className="phase-content">
                  <span className="phase-kicker">{phase.kicker}</span>
                  <h3>{phase.title}</h3>
                  <p>{phase.text}</p>
                  <ul>
                    {phase.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <a className="button button-primary" href="#top">Return to start</a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {activeThingToDo ? (
        <div
          className="activity-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="activity-lightbox-title"
          onClick={() => setActiveThingToDo(null)}
        >
          <div className="activity-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button
              className="activity-lightbox-close"
              type="button"
              onClick={() => setActiveThingToDo(null)}
              aria-label="Close activity details"
            >
              Close
            </button>
            <div className="activity-lightbox-copy">
              <span className="activity-lightbox-number">{activeThingToDo.number}</span>
              <p className="activity-lightbox-kicker">Things To Do</p>
              <h3 id="activity-lightbox-title">{activeThingToDo.title}</h3>
              <p>{activeThingToDo.text}</p>
              <p>{activeThingToDo.detail}</p>
            </div>
            <div className={`activity-lightbox-gallery ${activeThingToDo.images.length === 1 ? "single-image" : ""}`}>
              {activeThingToDo.images.map(([src, alt]) => (
                <figure className="activity-lightbox-figure" key={src}>
                  <img src={src} alt={alt} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {isMapExpanded ? (
        <div
          className="map-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="map-lightbox-title"
          onClick={() => setIsMapExpanded(false)}
        >
          <div className="map-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="map-lightbox-bar">
              <div>
                <p className="map-lightbox-kicker">Expanded map</p>
                <h3 id="map-lightbox-title">Karadiyana site map</h3>
              </div>
              <button
                className="map-lightbox-close"
                type="button"
                onClick={() => setIsMapExpanded(false)}
                aria-label="Close enlarged map"
              >
                Close
              </button>
            </div>
            <div className={`map-lightbox-frame${isMapImageReady ? " is-loaded" : ""}`}>
              {!isMapImageReady ? (
                <div className="map-loader map-loader-lightbox" aria-live="polite">
                  <span className="map-loader-ring" aria-hidden="true" />
                  <span className="map-loader-text">Loading the map</span>
                </div>
              ) : null}
              <img
                src={mapImageSrc}
                alt="Map showing the Karadiyana project site and surrounding area"
                loading="eager"
                decoding="async"
                onLoad={() => setIsMapImageReady(true)}
                onError={() => setIsMapImageReady(true)}
              />
            </div>
          </div>
        </div>
      ) : null}

      <footer className="site-footer">
        <p>Comprehensive Design Project 2026 - Bachelor of Landscape Architecture Honours - University of Moratuwa</p>
        <p>Nethma Jayanetti</p>
      </footer>
    </>
  );
}

export default App;
