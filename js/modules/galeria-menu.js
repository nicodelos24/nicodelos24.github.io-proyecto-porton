/* ==========================================================================
   modules/galeria-menu.js
   --------------------------------------------------------------------------
   Llena los bloques de platos que hay a lo largo de la página.

   Los datos salen de window.MENU (js/data/menu.js), igual que la carta: acá no
   hay ni un plato escrito a mano. Cambiar el menú se hace en el archivo de
   datos y los bloques se actualizan solos.

   QUÉ SE PINTA EN CADA BLOQUE
     <ul data-platos="entradas">   → los platos de esa categoría
     <ul data-destacados>          → los platos con `destacado: true`

   Por eso agregar un bloque nuevo es agregar una sola línea en el HTML con la
   categoría que se quiera, sin tocar este archivo.

   La idea de la página es que cada categoría esté junto a la foto que la
   representa: la parrilla al lado de la parrilla, los postres al lado del
   postre. Un bloque queda vacío si la categoría no existe, y el CSS lo oculta
   entero para que no quede un título sin nada debajo.
   ========================================================================== */

import { observeReveal } from "./reveal.js";

/* Devuelve todos los platos del menú en una sola lista, con su categoría
   agregada. Es la misma idea que usaba carta.js. */
function flattenMenu(menu) {
  return Object.entries(menu).flatMap(([categoria, grupo]) =>
    grupo.items.map((plato) => ({ ...plato, categoria }))
  );
}

/* Una fila de plato: nombre, puntitos de guía, precio y la descripción debajo.
   Es el formato de carta clásica en papel: el precio nunca se separa del
   nombre, porque el puntito los ata. */
function platoHTML(plato) {
  return `
    <li class="galeria-plato" data-reveal="fade">
      <p class="galeria-plato__fila">
        <span class="galeria-plato__nombre">${plato.nombre}</span>
        <span class="galeria-plato__puntos" aria-hidden="true"></span>
        <span class="galeria-plato__precio">$${plato.precio}</span>
      </p>
      <p class="galeria-plato__desc">${plato.descripcion}</p>
    </li>
  `;
}

/* Vuelca una lista de platos en un <ul> y vuelve a poner los elementos en
   observación para la animación de entrada. Sin esto los platos quedan
   invisibles: no existían cuando arrancó el observador (ver reveal.js).

   Llevan data-reveal="fade" y no "left"/"right"/"scale" para que entren sin
   desplazarse. Acá no importa para el efecto de foto clavada (esas fotos están
   en otros elementos, no en un ancestro de estos), pero conviene no mezclar y
   que la animación sea siempre la misma en toda la galería. */
function render(contenedor, platos) {
  if (!contenedor || platos.length === 0) return;

  contenedor.innerHTML = platos.map(platoHTML).join("");
  observeReveal(contenedor);
}

export function initGaleriaMenu() {
  if (!window.MENU) return;

  const todos = flattenMenu(window.MENU);

  // Un bloque por categoría
  document.querySelectorAll("[data-platos]").forEach((lista) => {
    render(lista, todos.filter((plato) => plato.categoria === lista.dataset.platos));
  });

  // Los destacados, si algún bloque los pide
  document.querySelectorAll("[data-destacados]").forEach((lista) => {
    render(lista, todos.filter((plato) => plato.destacado));
  });
}