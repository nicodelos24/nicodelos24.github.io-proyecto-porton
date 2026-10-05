/* ==========================================================================
   modules/galeria.js
   --------------------------------------------------------------------------
   Visor de fotos: al tocar una foto del mosaico se abre grande y se puede
   pasar de una a otra.

   CÓMO FUNCIONA
   No hay una lista de fotos en el código: se lee del propio HTML. Cada
   botón `[data-galeria]` trae la foto en su `<img>` y el pie en `data-pie`.
   Agregar una foto a la galería es agregar un botón más en index.html, sin
   tocar este archivo.

   TECLADO
   · Escape cierra
   · Las flechas ← y → cambian de foto
   · While esté abierto, el foco no sale del visor (es un `dialog` modal:
     si se saliera, el teclado podría mover cosas que hay detrás).

   CUERPO DE LA PÁGINA
   Se bloquea el scroll al abrir, porque si no el fondo seguiría
   desplazándose por detrás de la foto.
   ========================================================================== */

/** Toma las fotos de la galería del DOM. */
function leerFotos() {
  return [...document.querySelectorAll("[data-galeria]")].map((boton) => {
    const imagen = boton.querySelector("img");

    return {
      boton,
      src: imagen.currentSrc || imagen.src,
      alt: imagen.alt,
      pie: boton.dataset.pie || "",
    };
  });
}

export function initGaleria() {
  const lightbox = document.querySelector("[data-lightbox]");

  if (!lightbox) return;

  const fotos = leerFotos();

  if (fotos.length === 0) return;

  const imagen = lightbox.querySelector("[data-lightbox-imagen]");
  const pie = lightbox.querySelector("[data-lightbox-pie]");
  const contador = lightbox.querySelector("[data-lightbox-contador]");
  const puntos = lightbox.querySelector("[data-lightbox-puntos]");
  const btnAnterior = lightbox.querySelector("[data-lightbox-anterior]");
  const btnSiguiente = lightbox.querySelector("[data-lightbox-siguiente]");

  let actual = 0;
  let fotoAnterior = null; // para devolverle el foco al cerrar

  /* ---------- Dibujar una foto ---------- */
  function mostrar(indice) {
    // Da la vuelta: de la última a la primera y al revés.
    actual = (indice + fotos.length) % fotos.length;

    const foto = fotos[actual];

    imagen.src = foto.src;
    imagen.alt = foto.alt;
    pie.textContent = foto.pie;
    contador.textContent = `${actual + 1} / ${fotos.length}`;

    [...puntos.children].forEach((punto, i) => {
      punto.classList.toggle("is-activo", i === actual);
    });
  }

  /* ---------- Abrir y cerrar ---------- */
  function abrir(indice, botonOrigen) {
    fotoAnterior = botonOrigen;
    mostrar(indice);

    lightbox.hidden = false;

    // Un frame de margen, para que la transición se vea: si se quita
    // `hidden` y se aplica el estado final en el mismo instante, el
    // navegador no llega a dibujar el estado inicial.
    window.requestAnimationFrame(() => {
      // Si en este frame ya se cerró (un clic muy rápido, o un cierre por
      // teclado), no hay que volver a marcarlo como abierto.
      if (!lightbox.hidden) lightbox.classList.add("is-abierto");
    });

    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox__cerrar").focus();
  }

  function cerrar() {
    lightbox.classList.remove("is-abierto");

    // Se espera a que termine la transición de salida antes de esconderlo.
    window.setTimeout(() => {
      lightbox.hidden = true;
      document.body.style.overflow = "";
    }, 300);

    // El foco vuelve a la foto desde la que se abrió.
    fotoAnterior?.focus();
  }

  /* ---------- Clic en las fotos ---------- */
  fotos.forEach((foto, indice) => {
    foto.boton.addEventListener("click", () => abrir(indice, foto.boton));
  });

  /* ---------- Botones ---------- */
  btnAnterior.addEventListener("click", () => mostrar(actual - 1));
  btnSiguiente.addEventListener("click", () => mostrar(actual + 1));

  lightbox.querySelectorAll("[data-lightbox-cerrar]").forEach((nodo) => {
    nodo.addEventListener("click", cerrar);
  });

  /* ---------- Teclado ---------- */
  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    switch (event.key) {
      case "Escape":
        cerrar();
        break;

      case "ArrowLeft":
        mostrar(actual - 1);
        break;

      case "ArrowRight":
        mostrar(actual + 1);
        break;

      // El visor es modal: el foco no puede quedar detrás.
      case "Tab":
        trampaFoco(event);
        break;
    }
  });

  /** Mantiene el foco dando vueltas entre los controles del visor. */
  function trampaFoco(event) {
    const focusables = [...lightbox.querySelectorAll("button:not([disabled])")];

    if (focusables.length === 0) return;

    const primero = focusables[0];
    const ultimo = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === primero) {
      event.preventDefault();
      ultimo.focus();
    } else if (!event.shiftKey && document.activeElement === ultimo) {
      event.preventDefault();
      primero.focus();
    }
  }

  /* ---------- Paginación ---------- */
  puntos.innerHTML = fotos
    .map(
      (_, i) =>
        `<button class="lightbox__punto${i === actual ? " is-activo" : ""}" type="button" aria-label="Ir a la foto ${i + 1}"></button>`
    )
    .join("");

  [...puntos.children].forEach((punto, i) => {
    punto.addEventListener("click", () => mostrar(i));
  });
}