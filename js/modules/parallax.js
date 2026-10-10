/* ==========================================================================
   modules/parallax.js
   --------------------------------------------------------------------------
   Parallax de la foto del hero y del botón "volver arriba".

   Se calcula con requestAnimationFrame para no disparar el cálculo en
   cada evento de scroll: se lee la posición una vez por frame.

   La foto del hero se mueve con la propiedad --parallax, que hero.css
   usa dentro de la animación ken-burns. Así las dos capas no se pisan.
   ========================================================================== */

const HERO_SPEED = 0.35; // cuánto se desplaza la foto (0 = fijo, 1 = total)
const TO_TOP_OFFSET = 320; // px de scroll antes de mostrar el botón

export function initParallax() {
  const heroBg = document.querySelector(".hero__bg");
  const toTop = document.querySelector(".to-top");

  let ticking = false;

  const update = () => {
    const y = window.scrollY;

    // Parallax del hero: solo dentro del rango de la propia sección
    if (heroBg && y < window.innerHeight * 1.5) {
      heroBg.style.setProperty("--parallax", `${y * HERO_SPEED}px`);
    }

    // Botón volver arriba
    if (toTop) {
      toTop.classList.toggle("is-visible", y > TO_TOP_OFFSET);
    }

    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return; // ya hay un frame pendiente
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();

  // Acción del botón
  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}