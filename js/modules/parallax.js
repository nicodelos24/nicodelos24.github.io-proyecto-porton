/* ==========================================================================
   modules/parallax.js
   --------------------------------------------------------------------------
   Parallax de la foto del hero, de la foto de "Sobre nosotros" y del
   botón "volver arriba".

   Se calcula con requestAnimationFrame para no disparar el cálculo en
   cada evento de scroll: se lee la posición una vez por frame.

   La foto del hero se mueve con la propiedad --parallax, que hero.css
   usa dentro de la animación ken-burns. Así las dos capas no se pisan.
   ========================================================================== */

const HERO_SPEED = 0.35; // cuánto se desplaza la foto (0 = fijo, 1 = total)
const ABOUT_SPEED = 0.05; // el de "Sobre nosotros" es apenas perceptible
const TO_TOP_OFFSET = 320; // px de scroll antes de mostrar el botón

export function initParallax() {
  const heroBg = document.querySelector(".hero__bg");
  const aboutImg = document.querySelector(".about__figure img");
  const toTop = document.querySelector(".to-top");

  // Si en el sistema está puesto "reducir movimiento", este efecto no corre.
  // La regla de reset.css no alcanza: neutraliza transiciones y animaciones,
  // pero este desplazamiento lo aplica JavaScript con un transform directo.
  const pocoMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let ticking = false;

  const update = () => {
    const y = window.scrollY;

    // Parallax del hero: solo dentro del rango de la propia sección
    if (heroBg && y < window.innerHeight * 1.5) {
      heroBg.style.setProperty("--parallax", `${y * HERO_SPEED}px`);
    }

    // Parallax de la foto de "Sobre nosotros": se mueve apenas, en dirección
    // contraria al scroll. Solo se calcula mientras la figura está en pantalla.
    // El poco zoom que le aplica about.css es lo que le da margen para moverse
    // sin que aparezca un borde vacío.
    if (aboutImg && !pocoMovimiento) {
      const caja = aboutImg.closest(".about__figure").getBoundingClientRect();

      if (caja.bottom > 0 && caja.top < window.innerHeight) {
        const desvio = caja.top + caja.height / 2 - window.innerHeight / 2;
        aboutImg.style.setProperty("--parallax", `${-desvio * ABOUT_SPEED}px`);
      }
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