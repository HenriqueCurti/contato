function createParticles() {
  const particleCount = 50;
  const container = document.body;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 3 + 2 + "s";
    particle.style.animationDelay = Math.random() * 2 + "s";

    const keyframes = `
                    @keyframes float${i} {
                        0%, 100% { transform: translate(0, 0); opacity: 0; }
                        50% { opacity: 1; }
                        100% { transform: translate(${
                          Math.random() * 100 - 50
                        }px, ${Math.random() * 100 - 50}px); }
                    }
                `;

    const style = document.createElement("style");
    style.textContent = keyframes;
    document.head.appendChild(style);

    particle.style.animation = `float${i} ${
      Math.random() * 5 + 3
    }s ease-in-out infinite`;
    container.appendChild(particle);
  }
}

// Scroll suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Fechar menu mobile após clicar
      const navLinks = document.querySelector(".nav-links");
      const menuToggle = document.querySelector(".menu-toggle");
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    }
  });
});

// Menu hambúrguer
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Fechar menu ao clicar fora
document.addEventListener("click", (e) => {
  if (!e.target.closest("nav")) {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
  }
});

// Inicializar
window.addEventListener("load", () => {
  createParticles();
});

// Efeito parallax no hero (apenas desktop)
window.addEventListener("scroll", () => {
  if (window.innerWidth > 968) {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector(".hero-visual");

    if (heroVisual && scrolled < window.innerHeight) {
      heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }
});
