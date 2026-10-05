/* ==========================================================================
   modules/tema.js
   --------------------------------------------------------------------------
   Modo claro y oscuro, con tres estados posibles:

     · "claro"  → el visitante lo elige así y queda guardado
     · "oscuro" → el visitante lo elige así y queda guardado
     · "sistema"→ arranca con lo que diga su sistema y sigue al sistema
                   si este cambia después (por ejemplo, de noche)

   El atributo `data-tema` va en <html>. Quien no eligió nada no lo tiene
   atributo puesto, y el CSS aplica el tema del sistema con una consulta
   de medios. Por eso el sitio arranca bien aunque este módulo nunca
   cargue.

   El primer tema lo aplica el script en línea del <head>, antes de que
   el navegador pinte nada: si se hiciera acá, el visitante vería un
   destello del tema equivocado.
   ========================================================================== */

const CLAVE = "tema"; // clave en localStorage

/** Lee la preferencia guardada. Devuelve "claro", "oscuro" o null. */
function leerPreferencia() {
  try {
    const valor = window.localStorage.getItem(CLAVE);
    return valor === "claro" || valor === "oscuro" ? valor : null;
  } catch {
    // Sin localStorage (modo privado en algunos navegadores) no hay
    // preferencia guardada, pero el sitio sigue funcionando.
    return null;
  }
}

/** Aplica el tema y deja el atributo listo. */
export function aplicarTema(tema) {
  const root = document.documentElement;

  // Sin atributo = "que decida el sistema". El CSS lo resuelve solo.
  if (tema === "claro" || tema === "oscuro") {
    root.dataset.tema = tema;
  } else {
    delete root.dataset.tema;
  }

  // El color de la barra del navegador en el celular sigue al tema.
  actualizarColorBarraMovil();

  // Avisa al resto del sitio (por ahora, solo el botón lo usa).
  window.dispatchEvent(
    new CustomEvent("tema:cambiado", { detail: { tema: temaActual() } })
  );
}

/** Devuelve el tema que se está viendo ahora mismo. */
export function temaActual() {
  const atributo = document.documentElement.dataset.tema;

  if (atributo === "claro" || atributo === "oscuro") return atributo;

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "claro"
    : "oscuro";
}

/**
 * El botón alterna entre claro y oscuro.
 * Si venía siguiendo al sistema, el primer clic fija el tema contrario
 * al que está viendo, que es lo que el visitante espera.
 */
export function initTema() {
  const botones = document.querySelectorAll("[data-tema-boton]");

  if (!botones.length) return;

  // Si el visitante no eligió nada, el botón manda al sistema.
  function pintarBotones() {
    const actual = temaActual();
    const hayEleccion = Boolean(leerPreferencia());

    // También actualiza el color de la barra del celular: hace falta al
    // arrancar, no solo al cambiar, porque el <meta> arranca siempre oscuro.
    actualizarColorBarraMovil();

    botones.forEach((boton) => {
      const siguiente = actual === "claro" ? "oscuro" : "claro";

      boton.setAttribute("aria-label", `Cambiar a modo ${siguiente}`);
      boton.setAttribute("title", `Cambiar a modo ${siguiente}`);
      boton.dataset.estado = actual;
      boton.setAttribute("aria-pressed", String(actual === "claro"));
      boton.dataset.elegido = String(hayEleccion);
    });
  }

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const siguiente = temaActual() === "claro" ? "oscuro" : "claro";

      try {
        window.localStorage.setItem(CLAVE, siguiente);
      } catch {
        // Sin almacenamiento igual funciona, solo que no se recuerda.
      }

      aplicarTema(siguiente);
      pintarBotones();
    });
  });

  // Si el visitante está en "sistema" y lo cambia (de día a noche),
  // el sitio se entera solo.
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
    if (!leerPreferencia()) {
      aplicarTema("sistema");
      pintarBotones();
    }
  });

  pintarBotones();
}

/**
 * El <meta name="theme-color"> cambia con el tema para que la barra del
 * navegador del celular no quede de un color que no combina.
 */
function actualizarColorBarraMovil() {
  const claro = temaActual() === "claro";

  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.content = claro ? "#faf7f2" : "#0a0a0a";
  });
}