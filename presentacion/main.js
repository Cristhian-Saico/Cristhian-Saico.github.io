/* =============================================
   main.js – Lógica de navegación por teclado
   ============================================= */

// Esperamos al DOM listo
window.addEventListener("DOMContentLoaded", () => {
  const slideContainer = document.getElementById("slides");
  if (!slideContainer) {
    console.error("#slides no encontrado en el DOM");
    return;
  }

  const slides = Array.from(slideContainer.querySelectorAll("section.slide"));
  if (!slides.length) {
    console.error("No hay elementos .slide dentro de #slides");
    return;
  }

  let current = 0;

  /* ---------- utilidades ---------- */
  const clamp = (idx) => Math.max(0, Math.min(idx, slides.length - 1));

  function setActive(idx, skipScroll = false) {
    idx = clamp(idx);
    current = idx;
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === idx);
      s.classList.toggle("prev", i < idx);
    });
    // Resetea scroll de la slide activa
    if (!skipScroll) slides[idx].scrollTo({ top: 0, behavior: "instant" });
    // Actualiza hash
    history.replaceState(null, "", `#slide-${idx}`);
  }

  /* ---------- inicialización desde hash ---------- */
  const hashMatch = location.hash.match(/slide-(\d+)/);
  if (hashMatch) current = clamp(parseInt(hashMatch[1], 10));
  setActive(current, true);

  /* ---------- manejador de teclas ---------- */
  window.addEventListener("keydown", (e) => {
    const activeSlide = slides[current];
    const atTop = activeSlide.scrollTop === 0;
    const atBottom = Math.ceil(activeSlide.scrollTop + activeSlide.clientHeight) >= activeSlide.scrollHeight;

    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
        setActive(current + 1);
        e.preventDefault();
        break;
      case "ArrowLeft":
      case "PageUp":
        setActive(current - 1);
        e.preventDefault();
        break;
      case "ArrowDown":
        if (atBottom) {
          setActive(current + 1);
        } else {
          activeSlide.scrollBy({ top: activeSlide.clientHeight * 0.8, behavior: "smooth" });
        }
        e.preventDefault();
        break;
      case "ArrowUp":
        if (atTop) {
          setActive(current - 1);
        } else {
          activeSlide.scrollBy({ top: -activeSlide.clientHeight * 0.8, behavior: "smooth" });
        }
        e.preventDefault();
        break;
      default:
        break;
    }
  });

  /* ---------- actualiza on hash change (ej. deep link) ---------- */
  window.addEventListener("hashchange", () => {
    const m = location.hash.match(/slide-(\d+)/);
    if (m) setActive(parseInt(m[1], 10));
  });

  /* ---------- manejo de resize (reasegurar layout) ---------- */
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => setActive(current, true), 200);
  });
});
