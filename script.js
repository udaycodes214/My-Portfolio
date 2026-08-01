window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 600);
  }
});
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    const icon = menuToggle.querySelector("i");
    if (nav.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });
}
const texts = [
  "AI Enthusiast",
  "Web Developer",
  "B.Tech CSE Student",
  "Problem Solver"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typingText");
function type() {
  if (!typingElement) return;
  const current = texts[textIndex];
  if (isDeleting) {
    typingElement.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(type, 1800);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }
  setTimeout(type, isDeleting ? 50 : 100);
}
window.addEventListener("load", () => setTimeout(type, 1000));
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  if (topBtn) {
    topBtn.style.display = window.scrollY > 400 ? "block" : "none";
  }
});
if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (formStatus) {
      formStatus.textContent = "Sending...";
      formStatus.style.color = "#ff6b00";
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        if (formStatus) {
          formStatus.textContent = "Message sent successfully! ✅";
          formStatus.style.color = "#22c55e";
        }
        form.reset();
      } else {
        if (formStatus) {
          formStatus.textContent = "Oops! Something went wrong.";
          formStatus.style.color = "#ef4444";
        }
      }
    } catch {
      if (formStatus) {
        formStatus.textContent = "Network error. Please try again.";
        formStatus.style.color = "#ef4444";
      }
    }
  });
}