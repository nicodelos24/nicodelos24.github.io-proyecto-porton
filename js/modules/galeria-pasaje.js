/* ==========================================================================
   modules/galeria-pasaje.js
   --------------------------------------------------------------------------
   Mueve la cinta de la galería según cuánto se ha recorrido la sección.

   QUÉ ESCRIBE
   Dos variables distintas, porque el CSS las necesita con unidades
   distintas:

   · `--avance`     → un número del 0 al 1 (cuánto se recorrido).
                       La usa cada foto para moverse en vertical según su
                       profundidad. No lleva unidad: es una proporción.
   · `--avance-px`  → cuántos píxeles tiene que viajar la cinta. La usa el
                       `translate3d` de la tira, que sí necesita px.

   POR QUÉ LA DISTANCIA EN PÍXELES
   Pedirle al CSS que calcule el desplazamiento con porcentajes del ancho
   de la tira no es fiable, porque ese ancho depende de cuántas fotos haya
   y de cómo se acomoden en cada pantalla.

   CÓMO SE MIDE
   La sección tiene una altura propia (más alta que la pantalla). Cuando
   su borde superior llega arriba de la ventana empieza el recorrido, y
   termina cuando su borde inferior pasa por abajo.

   ACCESIBILIDAD Y RENDIMIENTO
   · Si el visitante pidió menos movimiento, la cinta se dibuja entera.
   · El cálculo se pide con `requestAnimationFrame`: aunque el scroll
     dispare cien eventos por segundo, la cuenta se hace una vez por
     dibujo de pantalla.
   ========================================================================== */

export function initGaleriaPasaje() {
  const pasaje = document.querySelector("[data-pasaje]");

  if (!pasaje) return;

  const tira = pasaje.querySelector(".pasaje__tira");

  if (!tira) return;

  const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
  const movible = window.matchMedia("(min-width: 48rem)");

  let pendiente = false;

  /** Recalcula el avance y lo escribe en la tira. */
  function actualizar() {
    pendiente = false;

    // Sin movimiento, o en pantalla chica donde la cinta no se mueve:
    // se saca la variable y el CSS la deja donde está.
    if (menosMovimiento.matches || !movible.matches) {
      tira.style.removeProperty("--avance");
      tira.style.removeProperty("--avance-px");
      return;
    }

    const caja = pasaje.getBoundingClientRect();
    const alto = caja.height;
    const ventana = window.innerHeight;

    // 0 cuando la sección entra por abajo, 1 cuando sale por arriba.
    const recorrido = (alto - caja.top) / (alto + ventana);
    const avance = Math.min(1, Math.max(0, recorrido));

    // Cuánto tiene que viajar la cinta para que la última foto llegue al
    // borde derecho de la ventana.
    const distancia = Math.max(0, tira.scrollWidth - ventana);

    // Una es proporción (sin unidad) y la otra es distancia (con px).
    // Si se mezclan, el cálculo del desfase vertical se multiplica por
    // los píxeles y las fotos se van volando fuera de la pantalla.
    tira.style.setProperty("--avance", avance.toFixed(4));
    tira.style.setProperty("--avance-px", `${(avance * distancia).toFixed(1)}px`);
  }

  function pedir() {
    if (pendiente) return; // ya hay un frame en cola

    pendiente = true;
    window.requestAnimationFrame(actualizar);
  }

  window.addEventListener("scroll", pedir, { passive: true });
  window.addEventListener("resize", pedir, { passive: true });

  menosMovimiento.addEventListener("change", pedir);
  movible.addEventListener("change", pedir);

  actualizar();
}