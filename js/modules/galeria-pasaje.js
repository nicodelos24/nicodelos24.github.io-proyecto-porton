/* ==========================================================================
   modules/galeria-pasaje.js
   --------------------------------------------------------------------------
   Da vida al bloque de fotos fijas: decide cuánto se ve cada una y cuánto
   se acerca, según por dónde va el scroll.

   QUÉ ESCRIBE, EN CADA FOTO
   · `--opacidad` → del 0 al 1. Se usa para el desvanecido entre fotos.
   · `--escala`   → de 1 a 1.08. Es el acercamiento lento de la imagen.

   CÓMO SE CALCULA
   Cada foto ocupa una franja de pantalla dentro del bloque. La foto `i`
   está "en su centro" cuando el bloque ha subido justo `i` pantallas.
   Se mide cuánto se pasó de ese momento y se normaliza de 0 a 1:

     la foto recién entra por abajo  → 0
     la foto llena la pantalla      → 0,5
     la foto ya salió por arriba     → 1

   La opacidad es el seno de ese número: vale 1 en el medio y 0 en los dos
   extremos. Así la foto aparece justo cuando entra, se ve entera en el
   centro, y se va cuando sale.

   El exponente suaviza los extremos, que es donde la foto aparecería o
   desaparecería de golpe.

   POR QUÉ NO SE USA `background-attachment: fixed`
   Porque en los navegadores de celular nunca se implementó bien: en iOS
   directamente no funciona. Con `position: sticky` se consigue lo mismo
   en todas partes.

   ACCESIBILIDAD Y RENDIMIENTO
   · Con "reducir movimiento" no se mueve nada: las fotos se ven fijas,
     una debajo de otra.
   · En pantalla chica tampoco hay efecto; lo resuelve el CSS con su
     breakpoint.
   · El cálculo se pide con `requestAnimationFrame`: aunque el scroll
     dispare cien eventos por segundo, la cuenta se hace una vez por
     dibujo de pantalla.
   ========================================================================== */

export function initGaleriaPasaje() {
  const bloque = document.querySelector("[data-fondo]");

  if (!bloque) return;

  const fotos = [...bloque.querySelectorAll(".fondo__foto")];

  if (fotos.length === 0) return;

  const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
  const conEfecto = window.matchMedia("(min-width: 48rem)");

  let pendiente = false;

  function actualizar() {
    pendiente = false;

    // Sin efecto: se limpian las variables y cada foto se ve normal.
    if (menosMovimiento.matches || !conEfecto.matches) {
      fotos.forEach((foto) => {
        foto.style.removeProperty("--opacidad");
        foto.style.removeProperty("--escala");
      });
      return;
    }

    const caja = bloque.getBoundingClientRect();
    const altoPantalla = window.innerHeight;

    // Cuánto ha subido el bloque, medido en pantallas completas.
    const recorrido = -caja.top / altoPantalla;

    fotos.forEach((foto, indice) => {
      // Qué tan pasada está esta foto de su momento central: 0 cuando
      // entra, 0,5 cuando llena la pantalla, 1 cuando sale.
      const avance = Math.min(1, Math.max(0, recorrido - indice));

      const opacidad = Math.pow(Math.sin(avance * Math.PI), 0.7);

      // El acercamiento va de 1 a 1,08 a lo largo de toda la franja.
      const escala = 1 + avance * 0.08;

      foto.style.setProperty("--opacidad", opacidad.toFixed(3));
      foto.style.setProperty("--escala", escala.toFixed(3));
    });
  }

  function pedir() {
    if (pendiente) return; // ya hay un frame en cola

    pendiente = true;
    window.requestAnimationFrame(actualizar);
  }

  window.addEventListener("scroll", pedir, { passive: true });
  window.addEventListener("resize", pedir, { passive: true });

  menosMovimiento.addEventListener("change", pedir);
  conEfecto.addEventListener("change", pedir);

  actualizar();
}
