// Live local-time clocks for the global coverage strip
function updateClocks() {
  document.querySelectorAll(".station[data-tz]").forEach((el) => {
    const tz = el.getAttribute("data-tz");
    const clockEl = el.querySelector(".station-clock");
    if (!clockEl) return;
    try {
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      clockEl.textContent = formatted;
    } catch (e) {
      clockEl.textContent = "--:--:--";
    }
  });
}
updateClocks();
setInterval(updateClocks, 1000);

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}
