/* ==========================================================================
   modules/smooth-scroll.js
   --------------------------------------------------------------------------
   Desplazamiento suave dentro de la página.

   que queremos conservar el offset
   del nav fijo. Esta versión:
     · intercepta los clics en enlaces con href="#...",
     · smoothly scrollea hasta el destino con easing propio,
     · cancela la animación si el usuario vuelve a scrollear a mano.

   Si en el futuro necesitás scroll hijacking (bloquear el scroll hasta
   pasar el hero), acá es donde se agrega, no en otra parte.
   ========================================================================== */

const DURATION = 1100; // ms que dura el recorrido

export function initSmoothScroll() {
  const nav = document.querySelector(".nav");

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    // Alto real del nav visible
    const navHeight = nav && !nav.classList.contains("nav--hidden") ? nav.offsetHeight : 0;
    const destino = target.getBoundingClientRect().top + window.scrollY - navHeight;

    animateScroll(destino, targetId);
  });

  // Si el usuario scrollea a mano, se abandona la animación
  window.addEventListener("wheel", cancelAnimation, { passive: true });
  window.addEventListener("touchstart", cancelAnimation, { passive: true });

  function animateScroll(destino, targetId) {
    cancelAnimation();

    const inicio = window.scrollY;
    const distancia = destino - inicio;
    if (Math.abs(distancia) < 2) return;

    // Se inicializa en el PRIMER frame, no con `rafId`: cancelAnimation()
    // deja rafId en null antes del requestAnimationFrame, así que cuando
    // corre step rafId ya tiene valor y `if (!rafId)` nunca se cumplía.
    // Con `tiempo === null` el primer frame fija el origen y el easing
    // arranca desde progreso 0 en vez de saltar directo al destino.
    let tiempo = null;

    const step = (now) => {
      if (tiempo === null) tiempo = now;

      const progreso = Math.min((now - tiempo) / DURATION, 1);
      window.scrollTo(0, inicio + distancia * easeInOutExpo(progreso));

      if (progreso < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        rafId = null;
        // Actualiza el ancla para que el menú resalte la sección correcta
        if (window.history.replaceState) {
          window.history.replaceState(null, "", targetId);
        }
      }
    };

    rafId = window.requestAnimationFrame(step);
  }

  function cancelAnimation() {
    if (!rafId) return;
    window.cancelAnimationFrame(rafId);
    rafId = null;
  }
}

let rafId = null;

/* Easing exponencial: arranque rápido, frenado largo (se siente premium) */
function easeInOutExpo(t) {
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * 2.094) + 1;
}