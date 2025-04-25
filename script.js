document.addEventListener("DOMContentLoaded", () => {
  // nav bar
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtn = document.querySelectorAll("#close-btn");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("-translate-y-full"); // Slide menu into view
    mobileMenu.classList.add("translate-y-0");
  });

  closeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("closed clicked");
      mobileMenu.classList.remove("translate-y-0"); // Slide menu out of view
      mobileMenu.classList.add("-translate-y-full");
    });
  });

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
        l.classList.add("bg-white", "text-[#1C3867]");
      });

      // Add active styles to the clicked one
      link.classList.remove("bg-white", "text-[#1C3867]");
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

function scrollCards(direction) {
  const container = document.getElementById("cardCarousel");
  const scrollAmount = 300;

  if (direction === "left") {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else if (direction === "right") {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("close-btn");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("-translate-y-full"); // Slide menu into view
    mobileMenu.classList.add("translate-y-0");
  });

  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("translate-y-0"); // Slide menu out of view
    mobileMenu.classList.add("-translate-y-full");
  });

  const reviews = [
    {
      name: "Ravi Sharma",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: "★★★★★",
      date: "3 days ago",
      content:
        "Completely beautiful website and amazing support! This is my second website from this author and I love both of the sites so much and she has helped me so well when I needed it!",
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

  const carousel = document.getElementById("carousel");
  const countDisplay = document.getElementById("carousel-count");
  const cardWidth = 310;
  const visibleCards = 1;
  let index = 0;

  // Inject cards
  reviews.forEach((review) => {
    const card = document.createElement("div");
    card.className =
      "min-w-[300px] max-w-[300px] p-4 bg-white rounded-lg shadow-xl";
    card.innerHTML = `
      <div class="flex items-center gap-3 mb-2">
        <img src="${review.image}" class="w-12 h-12 rounded-full mr-3" alt="${review.name}" />
        <div>
          <p class="font-semibold">${review.name}</p>
          <div class="flex flex-row gap-2 items-center">
            <p class="text-yellow-400">${review.stars}</p>
            <p class="text-sm text-gray-500">${review.date}</p>
          </div>
        </div>
      </div>
      <p class="text-sm text-gray-700">${review.content}</p>
    `;
    carousel.appendChild(card);
  });

  function updateCounter() {
    const totalPages = Math.ceil(reviews.length / visibleCards);
    const currentPage = Math.floor(index / visibleCards) + 1;
    countDisplay.textContent = `${currentPage} / ${totalPages}`;
  }

  function moveCarousel(direction) {
    const maxIndex = reviews.length - visibleCards;
    index += direction;

    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;

    carousel.style.transform = `translateX(-${index * cardWidth}px)`;
    updateCounter();
  }

  // Initial counter setup
  updateCounter();
  window.moveCarousel = moveCarousel;

  // board carousel
});

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
