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
// entrar y el fondo de la imagen al salir. El 0.42 tiene que coincidir con el
// margen que deja la capa de la foto en galeria.css (`inset: -21% 0`, o sea
// 2 × 21): si alguno de los dos cambia, la foto deja de cubrir el marco y se
// ve el borde de la imagen en un extremo.
//
// SUAVIZADO (lerp). La foto NO se pega al scroll: en cada frame se queda a
// una fracción (SMOOTH) de la distancia que le falta para llegar a la posición
// que le tocaría. Con la rueda del mouse, que avanza a saltos, eso converts los
// tirones en un deslizamiento continuo: la foto va siempre un poco detrás del
// scroll y lo alcanza sola. Con 0.18 se mueve rápido para no "flotar" pero
// igual suaviza los saltos. Sube SMOOTH a 0.30+ para más inercia, bajalo a 0.1
// para que siga al scroll casi exacto.
const SMOOTH = 0.18;

const driftGallery = (items) => {
  if (!canDrift() || !items.length) return;
  const vh = window.innerHeight;
  for (const item of items) {
    const rect = item.getBoundingClientRect();
    // Solo las que están en pantalla o cerca: tocar todas en cada frame es
    // trabajo de sobra para algo que no se ve.
    if (rect.bottom < -100 || rect.top > vh + 100) continue;
    const p = (vh - rect.top) / (vh + rect.height); // 0..1
    const target = (p - 0.5) * 0.42 * rect.height;
    const current = parseFloat(item.style.getPropertyValue("--drift")) || 0;
    // Persigue el objetivo en pasos, sin pegarse de golpe al scroll.
    const next = current + (target - current) * SMOOTH;
    item.style.setProperty("--drift", `${next.toFixed(1)}px`);
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