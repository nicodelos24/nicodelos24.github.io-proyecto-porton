/* ==========================================================================
   modules/parallax.js
   --------------------------------------------------------------------------
   Parallax de la foto del hero, de las fotos de la galería y del botón
   "volver arriba".

   Se calcula con requestAnimationFrame para no disparar el cálculo en
   cada evento de scroll: se lee la posición una vez por frame.

   La foto del hero se mueve con la propiedad --parallax, que hero.css
   usa dentro de la animación ken-burns. Así las dos capas no se pisan.

   Las fotos de la galería usan --drift, que galeria.css aplica a la capa de
   la foto (`::after`). Antes estas fotos usaban `background-attachment:
   fixed`, que las dejaba totalmente quietas; ahora la foto es un poco más
   grande que su marco y va recorriendo ese excedente al pasar el bloque, como
   el efecto ParallaxZoom de la página de referencia.

   El desplazamiento va en px y se calcula sobre la altura de cada marco, así
   que todas las fotos se mueven en la misma proporción por más que sean de
   tamaños distintos.
   ========================================================================== */

const HERO_SPEED = 0.35; // cuánto se desplaza la foto (0 = fijo, 1 = total)
const TO_TOP_OFFSET = 320; // px de scroll antes de mostrar el botón

// Solo en pantallas anchas y si no se pidió menos movimiento.
const canDrift = () =>
  window.matchMedia("(min-width: 1025px)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Deriva las fotos visibles de la galería.
//
// Se mide el avance de cada marco a través de la ventana: 0 cuando recién
// entra por abajo, 1 cuando sale por arriba. La foto se desplaza la mitad del
// recorrido en cada sentido, o sea que muestra el fondo de la imagen al
// entrar y el fondo de la imagen al salir. El 0.40 tiene que coincidir con el
// margen que deja la capa de la foto en galeria.css (`inset: -20% 0`): si
// alguno de los dos cambia, la foto deja de cubrir el marco.
const driftGallery = (items) => {
  if (!canDrift() || !items.length) return;
  const vh = window.innerHeight;
  for (const item of items) {
    const rect = item.getBoundingClientRect();
    // Solo las que están en pantalla o cerca: tocar todas en cada frame es
    // trabajo de sobra para algo que no se ve.
    if (rect.bottom < -100 || rect.top > vh + 100) continue;
    const p = (vh - rect.top) / (vh + rect.height); // 0..1
    const travel = (p - 0.5) * 0.40 * rect.height;
    item.style.setProperty("--drift", `${travel.toFixed(1)}px`);
  }
};

export function initParallax() {
  const heroBg = document.querySelector(".hero__bg");
  const toTop = document.querySelector(".to-top");
  const galleryItems = document.querySelectorAll(".gallery__item");

  let ticking = false;

  const update = () => {
    const y = window.scrollY;

    // Parallax del hero: solo dentro del rango de la propio sección
    if (heroBg && y < window.innerHeight * 1.5) {
      heroBg.style.setProperty("--parallax", `${y * HERO_SPEED}px`);
    }

    // Parallax de las fotos de la galería
    driftGallery(galleryItems);

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