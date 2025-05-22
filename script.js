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
  const airRegulationSyllabus = [
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
  ];

  const leftSyllabus = document.getElementById("syllabus-left");
  // const rightSyllabus = document.getElementById("syllabus-right");

  airRegulationSyllabus.forEach((item, index) => {
    // const halfLen = (airRegulationSyllabus.length / 2).toFixed(0);

    const bgColor = index % 2 === 0 ? "bg-[#CAE7F666]" : "bg-white";
    const li = document.createElement("li");

    li.className = `grid grid-cols-12 gap-2 ${bgColor} py-2 px-6 text-[#1C3867] font-[500]`;

    li.innerHTML = `
   <p class="col-span-2 text-center">${item.l.no}</p>
              <p class="col-span-4">${item.l.topic}</p>
   <p class="col-span-2 text-center">${item.r.no}</p>
              <p class="col-span-4">${item.r.topic}</p>
  `;

    leftSyllabus.appendChild(li);
    // if (index < halfLen) {
    // } else {
    //   rightSyllabus.appendChild(li);
    // }
  });
});

// enroll with confidance
document.addEventListener("DOMContentLoaded", () => {
  const data = [
    {
      img: "./public/2-ewc-meteorology.png",
      title: "Meteorology",
      desc: "Air meteorology is the study of the Earth's atmosphere and its impact on aviation, equipping pilots with essential knowledge to navigate safely through changing weather conditions and optimize flight operations.",
    },
    {
      img: "./public/2-ewc-reg.png",
      title: "Regulations",
      desc: "Air regulations, a critical component of pilot training, encompass the rules and guidelines governing aviation operations to ensure safety, compliance, and efficient air travel, enabling pilots to operate aircraft in accordance with legal and safety standards.",
    },
    {
      img: "./public/2-ewc-nav.jpg",
      title: "Navigation",
      desc: "Air navigation, a fundamental aspect of pilot training, involves mastering the skills and techniques needed to plan routes, navigate in the sky, and safely guide aircraft to their destinations, ensuring precise and efficient flight operations.",
    },
    {
      img: "./public/2-ewc-rtr.jpg",
      title: "RTR",
      desc: "Radio telephony encompasses the communication techniques and protocols essential for effective and safe air-to-ground and air-to-air communication, ensuring seamless interactions between pilots and air traffic control for safe and efficient flights.",
    },
  ];

  const carousel = document.getElementById("enrollCardCarousel");

  // Inject cards
  data.forEach((item) => {
    const card = document.createElement("div");

    card.className =
      "w-[240px] md:w-[300px] lg:w-[350px] shrink-0 bg-[#CAE7F666] overflow-hidden rounded-xl flex flex-col gap-1";
    card.innerHTML = `
       <div class="w-full relative ">
                  <img
                    src=${item.img}
                    class="aspect-[4/3] md:aspect-[4/2] object-cover"
                    alt=""
                  />
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

document.addEventListener("DOMContentLoaded", function () {
  const syllabusItems = [
    {
      title: "Air Meteorology",
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
      chunks: [
        {
          chunk: [
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
  ];

  const syllabusContainer = document.getElementById("syllabus-item-container");

  syllabusItems.forEach((item) => {
    let curTile = 0;
    const syllabusItem = document.createElement("div");
    syllabusItem.classList = "syllabus-item w-full flex flex-col gap-6";

    syllabusItem.innerHTML = `
 <div
                class="syllabus-title rounded-md bg-[#CAE7F6] p-3 px-4 flex flex-row gap-2 justify-between items-center w-full"
              >
                <h1
                  class="syllabus-title capitalize text-[#1c3867] font-semibold text-lg text-left"
                >
                 ${item.title}
                </h1>
                <div class="w-6 text-[#1c3867]">
                  <img
                    src="./public/chevron-dpwn-blue.svg"
                    class="syllabus-toggle w-5 h-5 transform transition-transform duration-300"
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
                  class="data-div flex flex-col items-center justify-center gap-2 w-full hidden"
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
              </div>
`;

    syllabusContainer.appendChild(syllabusItem);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const syllabusItems = document.querySelectorAll(".syllabus-item"); // Changed to class selector

  syllabusItems.forEach((item) => {
    const syllabusHeader = item.querySelector(".syllabus-title");
    const wrapper = item.querySelector(".syllabus-data-wrapper");
    const chevron = item.querySelector(".syllabus-toggle"); // Changed to class
    const dataDivs = item.querySelectorAll(".data-div"); // Changed to class
    const prevBtn = item.querySelector("#prev-btn");
    const nextBtn = item.querySelector("#next-btn");
    const countDisplay = item.querySelector("#num-count");

    let currentIndex = 0;
    const visibleCards = 1; // Number of slides to show

    // Toggle accordion
    syllabusHeader.addEventListener("click", () => {
      wrapper.classList.toggle("open");
      chevron.classList.toggle("rotate-180");

      // Reset carousel when closing
      if (!wrapper.classList.contains("open")) {
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
