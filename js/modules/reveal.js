/* ==========================================================================
   modules/reveal.js
   --------------------------------------------------------------------------
   Animaciones de entrada al hacer scroll, sin GSAP ni jQuery.

   Usa IntersectionObserver: el navegador notifica cuando un elemento
   entra en pantalla y ahí se le agrega .is-visible. El movimiento en sí
   lo hace CSS (ver components/animations.css), así que el JS queda chico.

   Cada elemento puede pedir una dirección y un retraso:
     data-reveal="left|right|scale"
     data-reveal-delay="1..6"
   ========================================================================== */

let observer = null;

/** Crea el observer una sola vez y lo reutiliza. */
function getObserver() {
  if (observer) return observer;

  // Sin IntersectionObserver no hay animación: mostramos todo y listo.
  if (!("IntersectionObserver" in window)) return null;

  observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        // Solo se anima una vez: al salir del viewport no se repite
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      // Empieza a animarse un poco antes de entrar del todo
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  return observer;
}

/**
 * Pone en observación los elementos con [data-reveal] dentro de `root`.
 *
 * Importante: hay que volver a llamar después de inyectar HTML nuevo en la
 * página (por ejemplo las tarjetas de la carta), porque los elementos
 * que no existían cuando arrancó el observer nunca se observarían y
 * quedarían invisibles.
 */
export function observeReveal(root = document) {
  const targets = root.querySelectorAll("[data-reveal]");

  const obs = getObserver();

  if (!obs) {
    // Sin soporte: mostramos todo directamente
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  targets.forEach((el) => {
    // No observar dos veces el mismo elemento
    if (el.dataset.revealObserved) return;
    el.dataset.revealObserved = "true";
    obs.observe(el);
  });
}

/** Inicializa el observer sobre el documento entero. */
export function initReveal() {
  observeReveal(document);
}
