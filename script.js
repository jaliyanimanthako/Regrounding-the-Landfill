const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

const syncHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 28);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

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

const markerContent = {
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

const markerKicker = document.querySelector("#marker-kicker");
const markerTitle = document.querySelector("#marker-title");
const markerText = document.querySelector("#marker-text");

document.querySelectorAll(".hotspot").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".hotspot").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const content = markerContent[button.dataset.marker];
    markerKicker.textContent = content.kicker;
    markerTitle.textContent = content.title;
    markerText.textContent = content.text;
  });
});

const phases = [
  {
    image: "assets/report-page-20.jpg",
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
    image: "assets/report-page-21.jpg",
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
    image: "assets/report-page-19.jpg",
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
    image: "assets/report-page-01.jpg",
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

const phaseImage = document.querySelector("#phase-image");
const phaseKicker = document.querySelector("#phase-kicker");
const phaseTitle = document.querySelector("#phase-title");
const phaseText = document.querySelector("#phase-text");
const phaseList = document.querySelector("#phase-list");
const phaseTabs = document.querySelectorAll(".phase-tab");

const setPhase = (index) => {
  const phase = phases[index];
  phaseTabs.forEach((tab) => {
    const isActive = tab.dataset.phase === String(index);
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  phaseImage.classList.add("switching");
  window.setTimeout(() => {
    phaseImage.src = phase.image;
    phaseImage.alt = phase.alt;
    phaseKicker.textContent = phase.kicker;
    phaseTitle.textContent = phase.title;
    phaseText.textContent = phase.text;
    phaseList.replaceChildren(
      ...phase.items.map((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        return li;
      })
    );
    phaseImage.classList.remove("switching");
  }, 180);
};

phaseTabs.forEach((button) => {
  button.addEventListener("click", () => setPhase(Number(button.dataset.phase)));
});

const heroImage = document.querySelector(".hero-image");
window.addEventListener(
  "scroll",
  () => {
    const offset = Math.min(window.scrollY * 0.08, 42);
    heroImage.style.transform = `scale(1.03) translateY(${offset}px)`;
  },
  { passive: true }
);
