/* ==========================================================================
   modules/preloader.js
   --------------------------------------------------------------------------
   Oculta la pantalla de carga y le da la señal al hero para que empiece
   su animación de entrada.

   La barra dura MIN_DURATION; la pantalla espera además a que la página
   termine de cargar, con un tope de MAX_DURATION para no bloquear nunca.
   ========================================================================== */

const MIN_DURATION = 1800; // ms: se ve la barra completa
const MAX_DURATION = 4000; // ms: espera máxima total

export function initPreloader() {
  const preloader = document.querySelector(".preloader");

  if (!preloader) return;

  const inicio = performance.now();
  let hidden = false;

  function hide() {
    if (hidden) return;
    hidden = true;

    preloader.classList.add("is-hidden");

    // Dispara las animaciones de entrada del hero (ver layout/hero.css)
    document.documentElement.classList.add("nav-ready");

    // Borra el nodo del DOM cuando termina la transición
    window.setTimeout(() => preloader.remove(), 800);
  }

  function hideWhenReady() {
    const restante = MIN_DURATION - (performance.now() - inicio);
    window.setTimeout(hide, Math.max(0, restante));
  }

  // Red de seguridad: pase lo que pase, a los MAX_DURATION se oculta.
  window.setTimeout(hide, MAX_DURATION);

  if (document.readyState === "complete") {
    hideWhenReady();
  } else {
    window.addEventListener("load", hideWhenReady, { once: true });
  }
}