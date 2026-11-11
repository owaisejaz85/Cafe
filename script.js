// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Featured menu carousel
const track = document.getElementById("specialTrack");
const cards = [...track.children];
const dotsWrap = document.getElementById("carouselDots");
let slideIndex = 0;

function visibleCards() {
  if (window.innerWidth <= 680) return 1;
  if (window.innerWidth <= 900) return 2;
  return 4;
}
function maxIndex() { return Math.max(0, cards.length - visibleCards()); }
function renderCarousel() {
  slideIndex = Math.min(slideIndex, maxIndex());
  const gap = 15;
  const cardWidth = cards[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${slideIndex * (cardWidth + gap)}px)`;
  [...dotsWrap.children].forEach((dot, i) => dot.classList.toggle("active", i === slideIndex));
}
function buildDots() {
  dotsWrap.innerHTML = "";
  for (let i = 0; i <= maxIndex(); i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => { slideIndex = i; renderCarousel(); });
    dotsWrap.appendChild(dot);
  }
  renderCarousel();
}
document.getElementById("prevSlide").addEventListener("click", () => {
  slideIndex = slideIndex <= 0 ? maxIndex() : slideIndex - 1;
  renderCarousel();
});
document.getElementById("nextSlide").addEventListener("click", () => {
  slideIndex = slideIndex >= maxIndex() ? 0 : slideIndex + 1;
  renderCarousel();
});
window.addEventListener("resize", buildDots);
buildDots();

// Demo newsletter form. Connect to a backend to store subscribers.
document.getElementById("subscribeForm").addEventListener("submit", event => {
  event.preventDefault();
  const email = document.getElementById("email");
  document.getElementById("subscribeMessage").textContent = `Thanks! ${email.value} has been added to our demo list.`;
  event.target.reset();
});

// Demo reservation form. This front-end version does not send data to a server.
document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.target);
  const name = data.get("name").trim();
  document.getElementById("bookingMessage").textContent =
    `Thank you, ${name}! Your table request is ready. Please connect a backend to receive real bookings.`;
  event.target.reset();
});

// Prevent choosing a past date in the reservation form.
const dateInput = document.querySelector('input[name="date"]');
const today = new Date();
dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
