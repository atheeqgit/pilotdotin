document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  // Toggle mobile menu
  menuBtn.addEventListener("click", function () {
    mobileMenu.classList.add("show-menu");
    document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
  });

  closeBtn.addEventListener("click", function () {
    mobileMenu.classList.remove("show-menu");
    document.body.style.overflow = ""; // Restore scrolling
  });

  // Submenu toggle functionality
  const submenuToggles = document.querySelectorAll(".submenu-toggle");

  submenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const parentLi = this.closest("li");
      const submenu = parentLi.querySelector("ul");

      // Rotate chevron
      this.classList.toggle("rotated");

      // Toggle submenu
      submenu.classList.toggle("show");

      // Close other open submenus if needed
      document
        .querySelectorAll("#mobile-menu > ul > li > ul")
        .forEach((menu) => {
          if (menu !== submenu && menu.classList.contains("show")) {
            menu.classList.remove("show");
            menu.previousElementSibling
              .querySelector(".submenu-toggle")
              .classList.remove("rotated");
          }
        });
    });
  });

  // Close menu when clicking on a link
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("show-menu");
      document.body.style.overflow = "";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // hero carousel
  const slides = document.getElementById("carousel-slides");
  const slideElements = slides.children;
  const dotsContainer = document.getElementById("dots");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let currentIndex = 0;
  let timer;

  // Create dots
  for (let i = 0; i < slideElements.length; i++) {
    const dot = document.createElement("div");
    dot.className =
      "w-3 h-3 bg-[#1C3867] rounded-full cursor-pointer transition border-2 border-[#A7E1FF]";
    if (i === 0) dot.classList.add("bg-[#A7E1FF]");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.children;

  function updateCarousel() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    Array.from(dots).forEach((dot) =>
      dot.classList.replace("bg-[#1C3867]", "bg-[#A7E1FF]")
    );
    dots[currentIndex].classList.replace("bg-[#A7E1FF]", "bg-[#1C3867]");
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetTimer();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideElements.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex =
      (currentIndex - 1 + slideElements.length) % slideElements.length;
    updateCarousel();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetTimer();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetTimer();
  });

  function startTimer() {
    timer = setInterval(nextSlide, 3000);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  startTimer();

  // middle nav

  const countryLinks = document.querySelectorAll(".country-link");

  countryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      countryLinks.forEach((l) => {
        l.classList.remove("bg-[#1C3867]", "text-white");
        l.classList.add("bg-transparent", "text-[#1C3867]");
      });

      // Add active styles to the clicked one
      link.classList.remove("bg-transparent", "text-[#1C3867]");
      link.classList.add("bg-[#1C3867]", "text-white");
    });
  });
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      navLinks.forEach((l) => l.classList.remove("bg-[#1C3867]", "text-white"));
      navLinks.forEach((l) =>
        l.classList.add("bg-transparent", "text-[#787878]")
      );
      link.classList.remove("bg-transparent", "text-[#787878]");
      link.classList.add("bg-[#1C3867]", "text-white");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const reviews = [
    {
      name: "Sid g",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: "★★★★★",
      date: "2024-07-15",
      content:
        "The pilot really guides you well from getting a visa to getting an admission in your choice of flying school and all the processes very smoothly and without facing difficulties . Absolutely recommend their guidance !",
    },
    {
      name: "Priya Verma",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: "★★★★★",
      date: "1 week ago",
      content:
        "Completely beautiful website and amazing support! This is my second website from this author and I love both of the sites so much and she has helped me so well when I needed it!",
    },
    {
      name: "Arjun Mehta",
      image: "https://randomuser.me/api/portraits/men/77.jpg",
      stars: "★★★★☆",
      date: "2 weeks ago",
      content:
        "Very helpful. Would have given 5 stars if the batch size was smaller.",
    },
    {
      name: "Neha Gupta",
      image: "https://randomuser.me/api/portraits/women/19.jpg",
      stars: "★★★★★",
      date: "4 days ago",
      content:
        "Best aviation coaching platform! Super impressed with their guidance.",
    },
    {
      name: "Kunal Joshi",
      image: "https://randomuser.me/api/portraits/men/63.jpg",
      stars: "★★★★★",
      date: "Yesterday",
      content: "Supportive staff and very useful study material. 5/5!",
    },
  ];

  // DOM Elements
  const carousel = document.getElementById("carousel");
  const countDisplay = document.getElementById("carousel-count");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  // Carousel state
  let currentIndex = 0;
  let visibleCards = 1;
  const CARD_WIDTH = 310; // Width including margin/padding
  const GAP = 24; // 6 units in Tailwind (6 * 4px = 24px)

  // Initialize carousel
  function initCarousel() {
    calculateVisibleCards();
    renderCards();
    updateCarousel();
    updateControls();
    window.addEventListener("resize", handleResize);
  }

  // Create and append review cards
  function renderCards() {
    carousel.innerHTML = "";

    reviews.forEach((review) => {
      const card = document.createElement("div");
      card.className =
        "min-w-[280px] max-w-[320px] p-6 bg-white rounded-xl shadow-lg flex-shrink-0";
      card.innerHTML = `
        <div class="flex items-center gap-4 mb-4">
          <img src="${review.image}" class="w-12 h-12 rounded-full" alt="${review.name}" loading="lazy" />
          <div>
            <p class="font-semibold text-gray-900">${review.name}</p>
            <div class="flex items-center gap-2">
              <p class="text-yellow-400">${review.stars}</p>
              <p class="text-sm text-gray-500">${review.date}</p>
            </div>
          </div>
        </div>
        <p class="text-gray-700 text-base">${review.content}</p>
      `;
      carousel.appendChild(card);
    });
  }

  // Calculate visible cards based on screen width
  function calculateVisibleCards() {
    const screenWidth = window.innerWidth;
    const totalCardWidth = CARD_WIDTH + GAP;
    visibleCards = Math.min(
      Math.max(1, Math.floor((screenWidth - 64) / totalCardWidth)), // 64px padding
      reviews.length
    );
    updateCounter();
    return visibleCards;
  }

  // Update counter display
  function updateCounter() {
    const totalVisible = Math.min(visibleCards, reviews.length);
    const showing = Math.min(currentIndex + totalVisible, reviews.length);
    countDisplay.textContent = `${showing} / ${reviews.length}`;
  }

  // Update carousel position
  function updateCarousel() {
    const offset = currentIndex * (CARD_WIDTH + GAP);
    carousel.style.transform = `translateX(-${offset}px)`;
    updateCounter();
  }

  // Update control buttons state
  function updateControls() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= reviews.length - visibleCards;
  }

  // Handle window resize
  function handleResize() {
    const prevVisibleCards = visibleCards;
    calculateVisibleCards();

    // Adjust currentIndex if needed after resize
    if (currentIndex > reviews.length - visibleCards) {
      currentIndex = Math.max(0, reviews.length - visibleCards);
    }

    updateCarousel();
    updateControls();
  }

  // Move carousel in direction (1 for next, -1 for previous)
  function moveCarousel(direction) {
    currentIndex += direction;
    currentIndex = Math.max(
      0,
      Math.min(currentIndex, reviews.length - visibleCards)
    );
    updateCarousel();
    updateControls();
  }

  // Event listeners
  prevBtn.addEventListener("click", () => moveCarousel(-1));
  nextBtn.addEventListener("click", () => moveCarousel(1));

  // Initialize
  initCarousel();
});

// Passing results
document.addEventListener("DOMContentLoaded", () => {
  const data = [
    {
      image: "./public/pass-1.png",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
    {
      image: "./public/pass-2.png",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
    {
      image: "./public/pass-3.png",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
    {
      image: "./public/pass-4.png",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
    {
      image: "./public/pass-5.jpg",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
    {
      image: "./public/pass-6.jpg",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
    {
      image: "./public/pass-7.jpg",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
    {
      image: "./public/pass-8.jpg",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
    {
      image: "./public/pass-9.jpg",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
    {
      image: "./public/pass-10.jpg",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
    {
      image: "./public/pass-11.jpg",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
    {
      image: "./public/pass-12.jpg",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
    {
      image: "./public/pass-13.jpg",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
    {
      image: "./public/pass-14.jpg",
      regs: 76,
      met: 76,
      nav: 76,
      rtr: 76,
    },
  ];

  const carousel = document.getElementById("cardCarousel");

  // Inject cards
  data.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "w-[160px] md:w-[180px] shrink-0 bg-[#EFF9FF] lg:bg-white  lg:border-2 lg:border-b-[5px] border-[#2D72EC26] p-2 rounded-xl";
    card.innerHTML = `
      <div class="w-full overflow-hidden rounded-xl">
              <img
                src=${item.image}
                alt="pass"
                class="w-full object-cover aspect-[4/4]"
              />
            </div>
            <div class="grid grid-cols-4 gap-3 mt-2">
              <div class="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-2 justify-center items-center">
                <h1 class="text-[#1C3867] text-sm md:text-lg font-semibold uppercase">
                  REGS
                </h1>
                <h2 class="text-black text-xs md:text-base font-semibold uppercase">${item.regs}</h2>
              </div>
              <div class="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-2 justify-center items-center">
                <h1 class="text-[#1C3867] text-sm md:text-lg font-semibold uppercase">
                  MET
                </h1>
                <h2 class="text-black text-xs md:text-base font-semibold uppercase">${item.met}</h2>
              </div>
              <div class="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-2 justify-center items-center">
                <h1 class="text-[#1C3867] text-sm md:text-lg font-semibold uppercase">
                  NAV
                </h1>
                <h2 class="text-black text-xs md:text-base font-semibold uppercase">${item.nav}</h2>
              </div>
              <div class="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-2 justify-center items-center">
                <h1 class="text-[#1C3867] text-sm md:text-lg font-semibold uppercase">
                  RTR
                </h1>
                <h2 class="text-black text-xs md:text-base font-semibold uppercase">${item.rtr}</h2>
              </div>
            </div>
    `;
    carousel.appendChild(card);
  });
});
function scrollCards(direction) {
  const container = document.getElementById("cardCarousel");
  const scrollAmount = 180;

  if (direction === "left") {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else if (direction === "right") {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      const wrapper = item.querySelector(".faq-answer-wrapper");
      const verticalLine = item.querySelector(".vertical-line");

      wrapper.classList.toggle("open");

      if (wrapper.classList.contains("open")) {
        verticalLine.classList.add("hidden"); // Minus
      } else {
        verticalLine.classList.remove("hidden"); // Plus
      }
    });
  });
});

// syllabus
document.addEventListener("DOMContentLoaded", function () {
  const allData = [
    {
      title: "air meterology",
      isMultiple: false,
      data: [
        {
          l: {
            no: "01",
            topic: "Atmosphere",
          },
          r: {
            no: "16",
            topic: "Clear Air Turbulence",
          },
        },
        {
          l: {
            no: "02",
            topic: "Atmospheric Pressure",
          },
          r: {
            no: "17",
            topic: "Mountain Waves",
          },
        },
        {
          l: {
            no: "03",
            topic: "Temperature",
          },
          r: {
            no: "18",
            topic: "Tropical Systems",
          },
        },
        {
          l: {
            no: "04",
            topic: "Air Density",
          },
          r: {
            no: "19",
            topic: "Climatology of India",
          },
        },
        {
          l: {
            no: "05",
            topic: "Humidity",
          },
          r: {
            no: "20",
            topic: "General Circulation",
          },
        },
        {
          l: {
            no: "06",
            topic: "Winds",
          },
          r: {
            no: "21",
            topic: "Met Services for Aviation",
          },
        },
        {
          l: {
            no: "07",
            topic: "Visibility & Fog",
          },
          r: {
            no: "22",
            topic: "Weather Radar & Met Satellites",
          },
        },
        {
          l: {
            no: "08",
            topic: "Vertical Motion & Clouds",
          },
          r: {
            no: "23",
            topic: "Met Instruments",
          },
        },
        {
          l: {
            no: "09",
            topic: "Stability and Instability of Atmosphere",
          },
          r: {
            no: "24",
            topic: "Station Model",
          },
        },
        {
          l: {
            no: "10",
            topic: "Optical Phenomena",
          },
          r: {
            no: "25",
            topic: "Aerodrome Met Reports and Codes of METAR & SPECI",
          },
        },
        {
          l: {
            no: "11",
            topic: "Precipitation",
          },
          r: {
            no: "26",
            topic: "Aviation Weather Forecasts",
          },
        },
        {
          l: {
            no: "12",
            topic: "Ice Accretion",
          },
          r: {
            no: "27",
            topic: "Radar Report,Sigmet Message and Satellite Bulletin",
          },
        },
        {
          l: {
            no: "13",
            topic: "Thunderstorm",
          },
          r: {
            no: "28",
            topic: "Met Doccumentation and Briefing",
          },
        },
        {
          l: {
            no: "14",
            topic: "Air Masses Fronts & Western Disturbances",
          },
          r: {
            no: "29",
            topic: "Flight Forecast",
          },
        },
        {
          l: {
            no: "15",
            topic: "Jet Streams",
          },
          r: {
            no: "",
            topic: "",
          },
        },
        // {
        //   l: {
        //     no: "sno",
        //     topic: "topic",
        //   },
        //   r: {
        //     no: "sno",
        //     topic: "topic",
        //   },
        // },
      ],
    },
    {
      title: "Air Regulations",
      isMultiple: false,
      data: [
        {
          l: {
            no: "01",
            topic: "Definitions & Abbreviations",
          },
          r: {
            no: "13",
            topic: "Procedures for Air Navigation Services Aircraft Operations",
          },
        },
        {
          l: {
            no: "02",
            topic: "International Organisations and Conventions",
          },
          r: {
            no: "14",
            topic: "National Law",
          },
        },
        {
          l: {
            no: "03",
            topic: "Aircraft Nationality and Registration Marks",
          },
          r: {
            no: "15",
            topic: "Personnel Licensing",
          },
        },
        {
          l: {
            no: "04",
            topic: "Rules of Air",
          },
          r: {
            no: "16",
            topic: "Airworthiness of Aircraft",
          },
        },
        {
          l: {
            no: "05",
            topic: "Air Traffic Services",
          },
          r: {
            no: "17",
            topic: "Operational Procedures",
          },
        },
        {
          l: {
            no: "06",
            topic: "Area Control Services",
          },
          r: {
            no: "18",
            topic: "Special Operational Procedures and Hazards",
          },
        },
        {
          l: {
            no: "07",
            topic: "Approach Control Service",
          },
          r: {
            no: "19",
            topic: "Communications",
          },
        },
        {
          l: {
            no: "08",
            topic: "Procedures for Aerodrome Control Service",
          },
          r: {
            no: "20",
            topic: "Aircraft Accident and Incident",
          },
        },
        {
          l: {
            no: "09",
            topic: "Use of Air Traffic Services Surveillance System",
          },
          r: {
            no: "21",
            topic: "Facilitation",
          },
        },
        {
          l: {
            no: "10",
            topic: "Aeronautical Information Services",
          },
          r: {
            no: "22",
            topic:
              "Security - Safeguarding International Civil Aviation against Acts of Unlawful Interference",
          },
        },
        {
          l: {
            no: "11",
            topic: "Search and Rescue",
          },
          r: {
            no: "23",
            topic: "Human Performance and Limitations",
          },
        },
        {
          l: {
            no: "12",
            topic: "Visual Aids for Navigation",
          },
          r: {
            no: "25",
            topic: "Revision",
          },
        },
      ],
    },
    {
      title: "Air Navigations",
      isMultiple: true,
      titles: [
        {
          title: "General Navigation",
          data: [
            {
              l: {
                no: "01",
                topic: "Direction, Latitude and Longitude",
              },
              r: {
                no: "10",
                topic: "Departure",
              },
            },
            {
              l: {
                no: "02",
                topic: "Great Circles, Rhumb Lines & Directions on the Earth",
              },
              r: {
                no: "11",
                topic: "Scale",
              },
            },
            {
              l: {
                no: "03",
                topic: "Earth Magnetism",
              },
              r: {
                no: "12",
                topic: "General Chart Properties",
              },
            },
            {
              l: {
                no: "04",
                topic: "The Direct Indicating Compass",
              },
              r: {
                no: "13",
                topic: "Mercator Charts",
              },
            },
            {
              l: {
                no: "05",
                topic: "Aircraft Magnetism",
              },
              r: {
                no: "14",
                topic: "Lambert's Conformal Chart-1",
              },
            },
            {
              l: {
                no: "06",
                topic: "Navigation Computer Functions",
              },
              r: {
                no: "15",
                topic: "The Polar Stereographic Chart",
              },
            },
            {
              l: {
                no: "07",
                topic: "The 1 in 60 rule and Application of the same",
              },
              r: {
                no: "16",
                topic: "Gridded Charts",
              },
            },
            {
              l: {
                no: "08",
                topic: "General Navigation Problems",
              },
              r: {
                no: "17",
                topic: "Plotting",
              },
            },
            {
              l: {
                no: "09",
                topic: "Convergency and Conversion Angle",
              },
              r: {
                no: "18",
                topic: "Topographical Maps and Map Reading",
              },
            },
          ],
        },
        {
          title: "Radio Navigation",
          data: [
            {
              l: { no: "01", topic: "Radio Propagation Theory" },
              r: { no: "09", topic: "Instrument Landing System (ILS)" },
            },
            {
              l: { no: "02", topic: "Properties of Radio Waves" },
              r: { no: "10", topic: "Microwave Landing System (MLS)" },
            },
            {
              l: { no: "03", topic: "Modulation" },
              r: { no: "11", topic: "Ground Radar & Principles" },
            },
            {
              l: { no: "04", topic: "Antennae" },
              r: { no: "12", topic: "Airborne Weather Radar" },
            },
            {
              l: { no: "05", topic: "Doppler Radar Systems" },
              r: { no: "13", topic: "Secondary Surveillance Radar (SSR)" },
            },
            {
              l: { no: "06", topic: "VHF Direction Finder (VDF)" },
              r: { no: "14", topic: "Distance Measuring Equipment (DME)" },
            },
            {
              l: { no: "07", topic: "Automatic Direction Finder (ADF)" },
              r: { no: "15", topic: "Area Navigation Systems (RNAV)" },
            },
            {
              l: { no: "08", topic: "VHF Omni-directional Range (VOR)" },
              r: {
                no: "16",
                topic:
                  "Electronic Flight Information System (EFIS) & Global Navigation Satellite System (GNSS)",
              },
            },
          ],
        },
        {
          title: "Flight Planning",
          data: [
            {
              l: { no: "01", topic: "Air Information Publications" },
              r: {
                no: "07",
                topic:
                  "Detailed Flight Planning, En Route Climb Table, Cruise/Integrated Range Tables, Descent Tables",
              },
            },
            {
              l: { no: "02", topic: "Fuel Policy and Fuel Monitoring" },
              r: { no: "08", topic: "Topographical Chart" },
            },
            {
              l: { no: "03", topic: "Nautical Air Miles" },
              r: { no: "09", topic: "Airways - Miscellaneous Charts" },
            },
            {
              l: { no: "04", topic: "Single-engine Piston Aeroplane (SEP)" },
              r: { no: "10", topic: "ATC Flight Plan" },
            },
            {
              l: { no: "05", topic: "Multi-engine Piston Aeroplane (MEP)" },
              r: { no: "11", topic: "Point of Equal Time (PET)" },
            },
            {
              l: { no: "06", topic: "Simplified Flight Planning" },
              r: { no: "12", topic: "Point of Safe Return (PSR)" },
            },
          ],
        },
        {
          title: "Instruments",
          data: [
            {
              l: { no: "01", topic: "Air data instruments" },
              r: { no: "04", topic: "Radio Altimeter" },
            },
            {
              l: { no: "02", topic: "Gyroscopic instruments" },
              r: {
                no: "05",
                topic: "Power Plant and System Monitoring Instruments",
              },
            },
            {
              l: { no: "03", topic: "Magnetic Compass" },
            },
          ],
        },
      ],
    },

    {
      title: "Technical General",
      isMultiple: false,
      data: [
        {
          l: { no: "01", topic: "Introduction to Technical General" },
          r: { no: "18", topic: "Instrumentation-Automatic Flight Control" },
        },
        {
          l: { no: "02", topic: "Powerplant - Piston Engines" },
          r: {
            no: "19",
            topic:
              "Instrumentation-Power Plant & System Monitoring Instruments",
          },
        },
        {
          l: { no: "03", topic: "Power plant -Gas Turbines" },
          r: {
            no: "20",
            topic: "Principles of Flight- Overview and Definitions",
          },
        },
        {
          l: { no: "04", topic: "Landing Gear" },
          r: {
            no: "21",
            topic: "Principles of Flight- Basic Aerodynamic Theory",
          },
        },
        {
          l: { no: "05", topic: "Flight Controls" },
          r: { no: "22", topic: "Principles of Flight-Subsonic Airflow" },
        },
        {
          l: { no: "06", topic: "Hydraulics" },
          r: { no: "23", topic: "Principles of Flight- Lift" },
        },
        {
          l: { no: "07", topic: "Air Systems & Air Conditioning" },
          r: { no: "24", topic: "Principles of Flight- Drag" },
        },
        {
          l: { no: "08", topic: "Anti-icing & De-icing" },
          r: { no: "25", topic: "Principles of Flight- Stalling" },
        },
        {
          l: { no: "09", topic: "Fuel Systems" },
          r: { no: "26", topic: "Principles of Flight-High Lift Devices" },
        },
        {
          l: { no: "10", topic: "Emergency Equipment" },
          r: { no: "27", topic: "Principles of Flight-Airframe Contamination" },
        },
        {
          l: { no: "11", topic: "Electrics – Electronics Direct Current" },
          r: { no: "28", topic: "Principles of Flight- Stability and Control" },
        },
        {
          l: { no: "12", topic: "Electrics – Electronics Alternating Current" },
          r: { no: "29", topic: "Principles of Flight-Controls" },
        },
        {
          l: { no: "13", topic: "Airframes & Systems" },
          r: { no: "30", topic: "Principles of Flight- Flight Mechanics" },
        },
        {
          l: { no: "14", topic: "Fuselage, Wings & Stabilising Surfaces" },
          r: { no: "31", topic: "Principles of Flight-High Speed Flight" },
        },
        {
          l: { no: "15", topic: "Instrumentation - Flight Instruments" },
          r: { no: "32", topic: "Principles of Flight- Limitations" },
        },
        {
          l: { no: "16", topic: "Instrumentation-Warning & Recording" },
          r: { no: "33", topic: "Principles of Flight-Propellers" },
        },
        {
          l: { no: "17", topic: "Principles of Flight- The Atmosphere" },
        },
      ],
    },
    {
      title: "RTR ",
      isMultiple: true,
      titles: [
        {
          title: "Part 1",
          data: [
            {
              l: {
                no: "01",
                topic:
                  "Introduction, RTR Exam Syllabus and Information on How to crack RTR Exam",
              },
              r: {
                no: "03",
                topic: "Aeronautical Services",
              },
            },
            {
              l: {
                no: "02",
                topic: "Organisations",
              },
            },
          ],
        },
        {
          title: "Part 2 (Radio Telephony Procedures)",
          data: [
            {
              l: { no: "01", topic: "Glossary" },
              r: { no: "8", topic: "Area Control" },
            },
            {
              l: { no: "02", topic: "General Operating Procedures" },
              r: {
                no: "9",
                topic:
                  "Distress and Urgency Procedures and Communications failure procedures",
              },
            },
            {
              l: { no: "03", topic: "General RT Phraseology" },
              r: {
                no: "10",
                topic:
                  "Transmission of Meteorological and other Aerodrome Information",
              },
            },
            {
              l: { no: "04", topic: "Aerodrome Control of Aircraft Traffic" },
              r: {
                no: "11",
                topic: "Miscellaneous Flight Handling Phraseology",
              },
            },
            {
              l: { no: "05", topic: "Aerodrome Control of Vehicular Traffic" },
              r: { no: "12", topic: "HF Communications" },
            },
            {
              l: {
                no: "06",
                topic: "General ATS Surveillance Service Phraseology",
              },
              r: {
                no: "13",
                topic: "Visual Signals, Runway/Taxiway Markings/Lightings",
              },
            },
            {
              l: { no: "07", topic: "Approach Control" },
              r: { no: "14", topic: "Miscellaneous" },
            },
          ],
        },
        {
          title: "Part 3 (Principles And Practice Chapter)",
          data: [
            {
              l: {
                no: "01",
                topic: "Electricity and Magnetism",
              },
              r: {
                no: "03",
                topic: "Aircraft Communication and Voice Systems",
              },
            },
            {
              l: {
                no: "02",
                topic: "Radio Theory",
              },
              r: {
                no: "04",
                topic: "Aircraft Navigation Systems",
              },
            },
          ],
        },
      ],
    },
  ];

  const leftSyllabus = document.getElementById("syllabus-left");
  const syllabusNav = document.getElementById("syllabus-nav");

  // Function to create header row
  const createHeaderRow = () => {
    const header = document.createElement("li");
    header.className =
      "grid grid-cols-12 gap-4 bg-[#1C3867] py-4 px-6 text-white";
    header.innerHTML = `
      <p class="text-base col-span-2 text-center">Sr No</p>
      <p class="text-base col-span-4">Topic</p>
      <p class="text-base col-span-2 text-center">Sr No</p>
      <p class="text-base col-span-4">Topic</p>
    `;
    return header;
  };
  const createHeadingRow = (text) => {
    const header = document.createElement("li");
    header.className =
      "grid grid-cols-12 gap-4 bg-[#1C3867] py-4 px-6 text-white";
    header.innerHTML = `
      <h1 class="text-base text-center text-white  col-span-12 text-center">${text}</h1>
     
    `;
    return header;
  };

  // Function to create content row
  const createContentRow = (item, rowIndex) => {
    const bgColor = rowIndex % 2 === 0 ? "bg-[#CAE7F666]" : "bg-white";
    const row = document.createElement("li");
    row.className = `grid grid-cols-12 gap-2 ${bgColor} py-2 px-6 text-[#1C3867] font-[500]`;
    row.innerHTML = `
      <p class="col-span-2 text-center">${item.l?.no || ""}</p>
      <p class="col-span-4">${item.l?.topic || ""}</p>
      <p class="col-span-2 text-center">${item.r?.no || ""}</p>
      <p class="col-span-4">${item.r?.topic || ""}</p>
    `;
    return row;
  };

  // Function to handle navigation clicks
  const handleNavClick = (id) => {
    const allLi = document.querySelectorAll(".syllabus-nav-link");

    allLi.forEach((li, index) => {
      const checkbox = li.querySelector(".syl-check-box");

      if (li.id == id) {
        // Active state
        li.classList.remove("bg-[#F6F6F6]", "text-[#707070]");
        li.classList.add("bg-[#1C3867]", "text-white");
        checkbox.innerHTML = `<img src="./public/checkbox-checked.svg" alt="Checked" />`;

        // Load the corresponding syllabus content
        loadSyllabusContent(index);
      } else {
        // Inactive state
        li.classList.remove("bg-[#1C3867]", "text-white");
        li.classList.add("bg-[#F6F6F6]", "text-[#707070]");
        checkbox.innerHTML = `<img src="./public/checkbox-unchecked.svg" alt="Unchecked" />`;
      }
    });
  };

  // Function to load syllabus content
  const loadSyllabusContent = (index) => {
    leftSyllabus.innerHTML = "";
    const syllabusItem = allData[index];

    // Add header row

    if (syllabusItem.isMultiple) {
      // Handle multiple titles case
      syllabusItem.titles.forEach((titleData) => {
        titleData.data.forEach((item, rowIndex) => {
          if (rowIndex === 0) {
            leftSyllabus.appendChild(createHeadingRow(titleData.title));
            leftSyllabus.appendChild(createHeaderRow());
          }
          leftSyllabus.appendChild(createContentRow(item, rowIndex));
        });
      });
    } else {
      // Handle single title case
      leftSyllabus.appendChild(createHeaderRow());
      syllabusItem.data.forEach((item, rowIndex) => {
        leftSyllabus.appendChild(createContentRow(item, rowIndex));
      });
    }
  };

  // Initialize navigation items
  allData.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className =
      "syllabus-nav-link flex flex-row gap-4 bg-[#F6F6F6] w-full py-2 px-4 text-[#707070] cursor-pointer";
    li.id = idx;
    li.innerHTML = `
      <div class="syl-check-box">
        <img src="./public/checkbox-unchecked.svg" alt="Unchecked" />
      </div>
      <p class="text-left">${item.title}</p>
    `;

    li.addEventListener("click", () => handleNavClick(idx));
    syllabusNav.appendChild(li);
  });

  // Load the first syllabus by default
  if (allData.length > 0) {
    handleNavClick(0);
  }
});

// enroll with confidance
document.addEventListener("DOMContentLoaded", () => {
  const data = [
    {
      img: "./public/2-ewc-meteorology.png",
      title: "Meteorology",
      videoUrl: "https://www.youtube.com/embed/ppA3xhDhW38?si=O1kLnthTVlx85iUz",
      desc: "Air meteorology is the study of the Earth's atmosphere and its impact on aviation, equipping pilots with essential knowledge to navigate safely through changing weather conditions and optimize flight operations.",
    },
    {
      img: "./public/2-ewc-reg.png",
      title: "Regulations",
      videoUrl: "https://www.youtube.com/embed/DxFsMTB05hs?si=JnwGkF4VgEgA3JQa",
      desc: "Air regulations, a critical component of pilot training, encompass the rules and guidelines governing aviation operations to ensure safety, compliance, and efficient air travel, enabling pilots to operate aircraft in accordance with legal and safety standards.",
    },
    {
      img: "./public/2-ewc-nav.jpg",
      title: "Navigation",
      videoUrl: "https://www.youtube.com/embed/iDfBFG4wKcY?si=64751-7RjOFwvYTI",
      desc: "Air navigation, a fundamental aspect of pilot training, involves mastering the skills and techniques needed to plan routes, navigate in the sky, and safely guide aircraft to their destinations, ensuring precise and efficient flight operations.",
    },
    {
      img: "./public/2-ewc-rtr.jpg",
      title: "RTR",
      videoUrl: "https://www.youtube.com/embed/Cvg1M7BnQGM?si=wR4ay2vqg5cyhWIg",
      desc: "Radio telephony encompasses the communication techniques and protocols essential for effective and safe air-to-ground and air-to-air communication, ensuring seamless interactions between pilots and air traffic control for safe and efficient flights.",
    },
    {
      img: "https://thepilot.in/wp-content/uploads/2024/03/enroll5-1.png.webp",
      title: "Technical General",
      videoUrl: "https://www.youtube.com/embed/rQRVGH3aXqc?si=ZvlpQb8AblzBfKWW",
      desc: "Technical general, a vital subject in pilot training, covers  essential aspects of aircraft systems and engines providing pilots with the knowledge and expertise to operate and troubleshoot aircraft systems effectively, ensuring the safety of passengers and crew. ",
    },
  ];

  const carousel = document.getElementById("enrollCardCarousel");

  // Inject cards
  data.forEach((item) => {
    const card = document.createElement("div");

    card.className =
      "w-[260px] md:w-[300px] lg:w-[350px] shrink-0 bg-[#CAE7F666] overflow-hidden rounded-xl flex flex-col gap-1";
    card.innerHTML = `
       <div class="w-full relative ">
                  <div
                    data-bg="https://thepilot.in/wp-content/uploads/2024/03/meterology.jpg"
                    type-content="video"
                    style="
                      background-image: url('${item.img}');
                    "
                    video-url="${item.videoUrl}"
                    class="object-cover aspect-[4/3] md:aspect-[4/2] object-center bg-center bg-cover text-white w-full h-fit aspect-video flex flex-col justify-between video-container rocket-lazyload entered lazyloaded"
                    data-ll-status="loaded"
                  >
                    <div
                      class="h-full flex justify-center w-full bg-black/20 video-player items-center"
                    >
                      <img
                        src="https://thepilot.in/wp-content/uploads/2024/03/play-button.svg"
                        class="w-16 h-16 entered lazyloaded"
                        alt="Play Button"
                        data-lazy-src="https://thepilot.in/wp-content/uploads/2024/03/play-button.svg"
                        data-ll-status="loaded"
                      /><noscript
                        ><img
                          class="w-16 h-16 entered lazyloaded"
                          src="https://thepilot.in/wp-content/uploads/2024/03/play-button.svg"
                          class="w-fit"
                          alt="Play Button"
                      /></noscript>
                    </div>
                  </div>
                </div>
                <div class="p-4 flex flex-col gap-3 w-full">
                  <h3
                    class="text-left text-lg md:text-2xl font-[500] capitalize text-[#1C3867] w-full"
                  >
                    ${item.title}
                  </h3>
                  <p
                    class="text-left text-sm md:text-base font-normal text-[#707070] w-fit"
                  >
                    ${item.desc}
                  </p>
                  </div>
                  <li
                    class="flex m-4 flex-row items-center justify-center gap-2 mt-auto"
                  >
                    <div class="w-5">
                      <img
                        class="w-full"
                        src="./public/2-pointer-hat.svg"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <p
                      class="text-left mt-auto text-sm md:text-base font-[500] capitalize text-[#1C3867] w-full"
                    >
                      Online & Offline Classes
                    </p>
                  </li>
    `;
    carousel.appendChild(card);
  });
});
// ewc script
document.addEventListener("DOMContentLoaded", function () {
  const videoContainers = document.querySelectorAll(".video-container");

  videoContainers.forEach(function (videoContainer) {
    const bgUrl = videoContainer.getAttribute("bg-url");
    const videoUrl = videoContainer.getAttribute("video-url");
    const videoPlayer = videoContainer.querySelector(".video-player");

    function loadYouTubeVideo() {
      videoContainer.innerHTML =
        '<iframe class="inset-0 w-full h-full" src="' +
        videoUrl +
        '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
    }

    videoPlayer.addEventListener("click", loadYouTubeVideo);
  });
});

function scrollEnrollCards(direction) {
  const container = document.getElementById("enrollCardCarousel");
  const scrollAmount = 200;

  if (direction === "left") {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else if (direction === "right") {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}

function scrollGalleryCards(direction) {
  const container = document.getElementById("galleryCardCarousel");
  const scrollAmount = 150;

  if (direction === "left") {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else if (direction === "right") {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}

// syllabus mobile
document.addEventListener("DOMContentLoaded", function () {
  const syllabusItems = [
    {
      title: "Air Meteorology",
      isMultiple: false,
      chunks: [
        {
          chunk: [
            "Atmosphere",
            "Atmospheric Pressure",
            "Temperature",
            "Air Density",
            "Humidity",
            "Winds",
            "Visibility & Fog",
            "Vertical Motion & Clouds",
          ],
        },
        {
          chunk: [
            "Stability and Instability of Atmosphere",
            "Optical Phenomena",
            "Precipitation",
            "Ice Accretion",
            "Thunderstorm",
            "Air Masses Fronts & Western Disturbances",
            "Jet Streams",
            "Clear Air Turbulence",
            "Mountain Waves",
          ],
        },
        {
          chunk: [
            "Tropical Systems",
            "Climatology of India",
            "General Circulation",
            "Met Services for Aviation",
            "Weather Radar & Met Satellites",
            "Met Instruments",
            "Station Model",
            "Aerodrome Met Reports and Codes of METAR & SPECI",
            "Aviation Weather Forecasts",
          ],
        },
        {
          chunk: [
            "Tropical Systems",
            "Climatology of India",

            "Radar Report, Sigmet Message and Satellite Bulletin",
            "Met Documentation and Briefing",
            "Flight Forecast",
          ],
        },
      ],
    },
    {
      title: "Air Regulations",
      isMultiple: false,
      chunks: [
        {
          chunk: [
            "Definitions & Abbreviations",
            "International Organisations and Conventions",
            "Aircraft Nationality and Registration Marks",
            "Rules of Air",
            "Air Traffic Services",
            "Area Control Services",
            "Approach Control Service",
          ],
        },
        {
          chunk: [
            "Procedures for Aerodrome Control Service",
            "Use of Air Traffic Services Surveillance System",
            "Aeronautical Information Services",
            "Search and Rescue",
            "Visual Aids for Navigation",
            "Procedures for Air Navigation Services Aircraft Operations",
            "National Law",
          ],
        },
        {
          chunk: [
            "Personnel Licensing",
            "Airworthiness of Aircraft",
            "Operational Procedures",
            "Special Operational Procedures and Hazards",
            "Communications",
            "Aircraft Accident and Incident",
            "Facilitation",
          ],
        },
        {
          chunk: [
            "Security - Safeguarding International Civil Aviation against Acts of Unlawful Interference",
            "Human Performance and Limitations",
            "Revision",
          ],
        },
      ],
    },
    {
      title: "Air Navigation",
      isMultiple: true,
      titles: [
        {
          title: "General Navigation",
          chunks: [
            {
              chunk: [
                "Direction, Latitude and Longitude",
                "Great Circles, Rhumb Lines & Directions on the Earth",
                "Earth Magnetism",
                "The Direct Indicating Compass",
                "Aircraft Magnetism",
                "Navigation Computer Functions",
                "The 1 in 60 rule and Application of the same",
              ],
            },
            {
              chunk: [
                "General Navigation Problems",
                "Convergency and Conversion Angle",
                "Departure",
                "Scale",
                "General Chart Properties",
                "Mercator Charts",
                "Lambert's Conformal Chart-1",
              ],
            },
            {
              chunk: [
                "The Polar Stereographic Chart",
                "Gridded Charts",
                "Plotting",
                "Topographical Maps and Map Reading",
              ],
            },
          ],
        },
        {
          title: "Radio Navigation",
          chunks: [
            {
              chunk: [
                "Radio Propagation Theory",
                "Properties of Radio Waves",
                "Modulation",
                "Antennae",
                "Doppler Radar Systems",
                "VHF Direction Finder (VDF)",
                "Automatic Direction Finder (ADF)",
              ],
            },
            {
              chunk: [
                "VHF Omni-directional Range (VOR)",
                "Instrument Landing System (ILS)",
                "Microwave Landing System (MLS)",
                "Ground Radar & Principles",
                "Airborne Weather Radar",
                "Secondary Surveillance Radar (SSR)",
                "Distance Measuring Equipment (DME)",
              ],
            },
            {
              chunk: [
                "Area Navigation Systems (RNAV)",
                "Electronic Flight Information System (EFIS) & Global Navigation Satellite System (GNSS)",
              ],
            },
          ],
        },
        {
          title: "Flight Planning",
          chunks: [
            {
              chunk: [
                "Air Information Publications",
                "Fuel Policy and Fuel Monitoring",
                "Nautical Air Miles",
                "Single-engine Piston Aeroplane (SEP)",
                "Multi-engine Piston Aeroplane (MEP)",
                "Simplified Flight Planning",
                "Detailed Flight Planning, En Route Climb Table, Cruise/Integrated Range Tables, Descent Tables",
              ],
            },
            {
              chunk: [
                "Topographical Chart",
                "Airways - Miscellaneous Charts",
                "ATC Flight Plan",
                "Point of Equal Time (PET)",
                "Point of Safe Return (PSR)",
              ],
            },
          ],
        },
        {
          title: "Instruments",
          chunks: [
            {
              chunk: [
                "Air data instruments",
                "Gyroscopic instruments",
                "Magnetic Compass",
                "Radio Altimeter",
                "Power Plant and System Monitoring Instruments",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Technical General",
      isMultiple: false,
      chunks: [
        {
          chunk: [
            "Introduction to Technical General",
            "Powerplant - Piston Engines",
            "Power plant -Gas Turbines",
            "Landing Gear",
            "Flight Controls",
            "Hydraulics",
            "Air Systems & Air Conditioning",
          ],
        },
        {
          chunk: [
            "Anti-icing & De-icing",
            "Fuel Systems",
            "Emergency Equipment",
            "Electrics – Electronics Direct Current",
            "Electrics – Electronics Alternating Current",
            "Airframes & Systems",
            "Fuselage, Wings & Stabilising Surfaces",
          ],
        },
        {
          chunk: [
            "Instrumentation - Flight Instruments",
            "Instrumentation-Warning & Recording",
            "Instrumentation-Automatic Flight Control",
            "Instrumentation-Power Plant & System Monitoring Instruments",
            "Principles of Flight- Overview and Definitions",
            "Principles of Flight- Basic Aerodynamic Theory",
            "Principles of Flight-Subsonic Airflow",
          ],
        },
        {
          chunk: [
            "Principles of Flight- Lift",
            "Principles of Flight- Drag",
            "Principles of Flight- Stalling",
            "Principles of Flight-High Lift Devices",
            "Principles of Flight-Airframe Contamination",
            "Principles of Flight- Stability and Control",
            "Principles of Flight-Controls",
          ],
        },
        {
          chunk: [
            "Principles of Flight- Flight Mechanics",
            "Principles of Flight-High Speed Flight",
            "Principles of Flight- Limitations",
            "Principles of Flight-Propellers",
            "Principles of Flight- The Atmosphere",
          ],
        },
      ],
    },
    {
      title: "RTR",
      isMultiple: true,
      titles: [
        {
          title: "Part 1",
          chunks: [
            {
              chunk: [
                "Introduction, RTR Exam Syllabus and Information on How to crack RTR Exam",
                "Organisations",
                "Aeronautical Services",
              ],
            },
          ],
        },
        {
          title: "Part 2 (Radio Telephony Procedures)",
          chunks: [
            {
              chunk: [
                "Glossary",
                "General Operating Procedures",
                "General RT Phraseology",
              ],
            },
            {
              chunk: [
                "Aerodrome Control of Aircraft Traffic",
                "Aerodrome Control of Vehicular Traffic",
                "General ATS Surveillance Service Phraseology",
                "Approach Control",
                "Area Control",
                "Distress and Urgency Procedures and Communications failure procedures",
              ],
            },
            {
              chunk: [
                "Transmission of Meteorological and other Aerodrome Information",
                "Miscellaneous Flight Handling Phraseology",
                "HF Communications",
                "Visual Signals, Runway/Taxiway Markings/Lightings",
                "Miscellaneous",
              ],
            },
          ],
        },
        {
          title: "Part 3 (Principles And Practice Chapter)",
          chunks: [
            {
              chunk: [
                "Electricity and Magnetism",
                "Radio Theory",
                "Aircraft Communication and Voice Systems",
                "Aircraft Navigation Systems",
              ],
            },
          ],
        },
      ],
    },
  ];

  const syllabusContainer = document.getElementById("syllabus-item-container");

  syllabusItems.forEach((item) => {
    if (!item.isMultiple) {
      let curTile = 0;
      const syllabusItem = document.createElement("div");
      syllabusItem.classList = "syllabus-item w-full flex flex-col";

      syllabusItem.innerHTML = `
   <div
                  class="syllabus-title rounded-md bg-[#CAE7F6] p-3 px-4 flex flex-row gap-2 justify-between items-center w-full"
                >
                  <h1
                    class="syllabus-title capitalize text-[#1c3867] font-semibold text-lg text-left"
                  >
                   ${item.title}
                  </h1>
                  <div class="w-8 text-[#1c3867]">
                    <img
                      src="./public/chevron-dpwn-blue.svg"
                      class="syllabus-toggle w-8 h-8 transform transition-transform duration-300"
                      alt=""
                    />
                  </div>
                </div>
                <div
                  class="syllabus-data-wrapper overflow-hidden transition-all duration-500 ease-in-out max-h-0 flex flex-col items-center justify-center gap-2 w-full"
                >
                  
                 ${item.chunks
                   .map((chunk, idx) => {
                     return `
                       <div
                    class=" data-div mt-2 flex flex-col items-center justify-center gap-2 w-full hidden"
                  >
                  ${chunk.chunk
                    ?.map((topic, index) => {
                      curTile++;
                      return `
                        <div class=${
                          index % 2 === 0 ? "colored-tile" : "white-tile"
                        }>
                        <div class="w-6 text-[#1c3867]">
                          <p>${curTile.toString().padStart(2, "0")}</p>
                        </div>
                        <h1 class="tile-text">${topic}</h1>
                      </div>`;
                    })
                    .join("")}
                  </div>`;
                   })
                   .join("")}
                  <div class="flex justify-between items-center mb-6 mt-2 w-full">
                    <!-- showing numbers -->
                    <button
                      id="prev-btn"
                      class="bg-white px-6 py-2 rounded-full shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled
                    >
                      ←
                    </button>
                    <div
                      id="num-count"
                      class="flex justify-center text-lg font-medium"
                    >
                      1 / 1
                    </div>
                    <button
                      id="next-btn"
                      class="bg-white px-6 py-2 rounded-full shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      →
                    </button>
                  </div>
                </div>
  `;

      syllabusContainer.appendChild(syllabusItem);
    } else {
      const syllabusItem = document.createElement("div");
      syllabusItem.classList = "syllabus-item w-full flex flex-col";

      syllabusItem.innerHTML = `
   <div
                  class="syllabus-title rounded-md bg-[#CAE7F6] p-3 px-4 flex flex-row gap-2 justify-between items-center w-full"
                >
                  <h1
                    class="capitalize text-[#1c3867] font-semibold text-lg text-left"
                  >
                   ${item.title}
                  </h1>
                  <div class="w-8 text-[#1c3867]">
                    <img
                      src="./public/chevron-dpwn-blue.svg"
                      class="syllabus-toggle w-8 h-8 transform transition-transform duration-300"
                      alt=""
                    />
                  </div>
                </div>
                ${item.titles
                  ?.map((item) => {
                    let curTile = 0;

                    return `
                  <div class="syllabus-data-wrapper overflow-hidden transition-all duration-500 ease-in-out max-h-0 flex flex-col items-center justify-center gap-2 w-full"
                >
                  <h1 class=" font-semibold capitalize my-2">${item.title}</h1>
                 ${item.chunks
                   .map((chunk, idx) => {
                     return `
                       <div
                    class="data-div mt-2 flex flex-col items-center justify-center gap-2 w-full hidden"
                  >
                  ${chunk.chunk
                    .map((topic, index) => {
                      curTile++;
                      return `
                        <div class=${
                          index % 2 === 0 ? "colored-tile" : "white-tile"
                        }>
                        <div class="w-6 text-[#1c3867]">
                          <p>${curTile.toString().padStart(2, "0")}</p>
                        </div>
                        <h1 class="tile-text">${topic}</h1>
                      </div>`;
                    })
                    .join("")}
                  </div>`;
                   })
                   .join("")}
                  <div class="flex justify-between items-center mb-6 mt-2 w-full">
                    <!-- showing numbers -->
                    <button
                      id="prev-btn"
                      class="bg-white px-6 py-2 rounded-full shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled
                    >
                      ←
                    </button>
                    <div
                      id="num-count"
                      class="flex justify-center text-lg font-medium"
                    >
                      1 / 1
                    </div>
                    <button
                      id="next-btn"
                      class="bg-white px-6 py-2 rounded-full shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      →
                    </button>
                  </div>
                </div>`;
                  })
                  .join(" ")}
                
  `;

      syllabusContainer.appendChild(syllabusItem);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelectorAll(".syllabus-data-wrapper");

  wrapper.forEach((item) => {
    const syllabusItems = item.parentElement;

    const syllabusHeader = syllabusItems.querySelector(".syllabus-title");
    const chevron = syllabusItems.querySelector(".syllabus-toggle"); // Changed to class

    const dataDivs = item.querySelectorAll(".data-div"); // Changed to class

    const prevBtn = item.querySelector("#prev-btn");
    const nextBtn = item.querySelector("#next-btn");

    const countDisplay = item.querySelector("#num-count");

    let currentIndex = 0;
    const visibleCards = 1; // Number of slides to show

    // Toggle accordion
    syllabusHeader.addEventListener("click", () => {
      item.classList.toggle("open");
      chevron.classList.toggle("rotate-180");

      // Reset carousel when closing
      if (!item.classList.contains("open")) {
        currentIndex = 0;
        updateCounter();
        updateData(0);
      }
    });

    // Update counter display
    function updateCounter() {
      countDisplay.textContent = `${currentIndex + 1} / ${dataDivs.length}`;
    }

    // Update control buttons state
    function updateControls() {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= dataDivs.length - visibleCards;
    }

    // Update carousel
    function updateData(direction) {
      currentIndex = Math.max(
        0,
        Math.min(currentIndex + direction, dataDivs.length - visibleCards)
      );

      dataDivs.forEach((div, idx) => {
        div.classList.toggle("hidden", idx !== currentIndex);
      });

      updateCounter();
      updateControls();
    }

    // Initialize first slide
    dataDivs.forEach((div, idx) => {
      div.classList.toggle("hidden", idx !== 0);
    });

    // Event listeners
    prevBtn?.addEventListener("click", () => updateData(-1));
    nextBtn?.addEventListener("click", () => updateData(1));

    updateCounter();
    updateControls();
  });
});

// // facility
document.addEventListener("DOMContentLoaded", function () {
  const facilityBanner = document.querySelector(".facility-banner");
  const facilityCards = document.querySelectorAll(".facility-card");
  const carousel = document.getElementById("facilityCardCarousel");
  let currentIndex = 0;

  // Function to update banner content
  function updateBanner(index) {
    const card = facilityCards[index];
    const url = card.getAttribute("cont-url");
    const type = card.getAttribute("type-content");

    if (type === "image") {
      facilityBanner.innerHTML = `
        <img src="${url}" class="w-full h-full object-cover" alt="" />
      
      `;
    } else {
      facilityBanner.innerHTML = `
        <div class="w-full relative">
          <div
            style="background-image: url('${url}')"
            class="object-cover aspect-[4/3] md:aspect-[4/2] object-center bg-center bg-cover text-white w-full h-full flex flex-col justify-between video-container"
          >
            <div class="h-full flex justify-center video-player items-center">
              <img
                src="https://thepilot.in/wp-content/uploads/2024/03/play-button.svg"
                class="w-16 h-16 cursor-pointer"
                alt="Play Button"
              />
            </div>
          </div>
        </div>
      `;

      const videoContainer = facilityBanner.querySelector(".video-container");
      videoContainer.addEventListener("click", function () {
        const videoUrl =
          "https://www.youtube.com/embed/YT6wYdELy9g?si=hNpyGwn6JGT0BTF5";
        videoContainer.innerHTML = `
          <iframe class="w-full h-full" src="${videoUrl}?autoplay=1" frameborder="0" allowfullscreen></iframe>
        `;
      });
    }

    // Update active card
    facilityCards.forEach((card, i) => {
      card.classList.toggle("border-2", i === index);
      card.classList.toggle("border-blue-500", i === index);
      card.classList.toggle("scale-105", i === index);
    });
  }

  // Initialize first banner
  updateBanner(currentIndex);

  // Navigation handlers
  document
    .querySelector(".facility-next-btn")
    ?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % facilityCards.length;
      updateBanner(currentIndex);
      scrollToCard(currentIndex);
    });

  document
    .querySelector(".facility-prev-btn")
    ?.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + facilityCards.length) % facilityCards.length;
      updateBanner(currentIndex);
      scrollToCard(currentIndex);
    });

  // Card click handlers
  facilityCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      currentIndex = index;
      updateBanner(currentIndex);
    });
  });

  // Auto-scroll carousel to show active card
  function scrollToCard(index) {
    const card = facilityCards[index];
    const containerWidth = carousel.offsetWidth;
    const cardWidth = card.offsetWidth;
    const scrollPosition = card.offsetLeft - containerWidth / 2 + cardWidth / 2;

    carousel.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }
});
