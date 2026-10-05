/* ==========================================================================
   modules/carta.js
   --------------------------------------------------------------------------
   Genera la grilla de platos a partir de window.MENU (js/data/menu.js)
   y maneja el filtrado por categoría.

   Idea: el HTML no tiene ni un <article class="dish-card"> escrito a mano.
   Todo se construye acá, así que agregar un plato es agregar un objeto
   al archivo de datos y ya está.
   ========================================================================== */

import { observeReveal } from "./reveal.js";

/* Devuelve todos los platos con su categoría agregada, en una sola lista */
function flattenMenu(menu) {
  return Object.entries(menu).flatMap(([categoria, grupo]) =>
    grupo.items.map((plato) => ({ ...plato, categoria }))
  );
}

/* Construye el HTML de una tarjeta */
function dishCardHTML(plato, index) {
  const tag = plato.destacado
    ? `<span class="dish-card__tag">Del chef</span>`
    : "";

  return `
    <article class="dish-card" data-categoria="${plato.categoria}" data-reveal data-reveal-delay="${(index % 6) + 1}">
      <div class="dish-card__media">
        <img
          src="assets/img/${plato.imagen}"
          alt="${plato.nombre}"
          loading="lazy"
          decoding="async"
        />
        ${tag}
      </div>
      <div class="dish-card__body">
        <div class="dish-card__row">
          <h3 class="dish-card__name">${plato.nombre}</h3>
          <span class="dish-card__dots" aria-hidden="true"></span>
          <span class="dish-card__price">$${plato.precio}</span>
        </div>
        <p class="dish-card__desc">${plato.descripcion}</p>
      </div>
    </article>
  `;
}

export function initCarta() {
  const grid = document.querySelector(".carta__grid");
  const filters = document.querySelector(".carta__filters");

  if (!grid || !window.MENU) return;

  const platos = flattenMenu(window.MENU);

  /* ---------- Render inicial ---------- */
  grid.innerHTML = platos.map(dishCardHTML).join("");

  // Las tarjetas son nuevas: hay que ponerlas en observación para que
  // aparezcan al hacer scroll (ver modules/reveal.js).
  observeReveal(grid);

  /* ---------- Filtros ---------- */
  if (!filters) return;

  const categorias = Object.entries(window.MENU).map(([key, group]) => ({
    key,
    label: group.label,
  }));

  filters.innerHTML = [
    `<button class="filter-btn is-active" data-filter="all">Todo</button>`,
    ...categorias.map(
      (cat) => `<button class="filter-btn" data-filter="${cat.key}">${cat.label}</button>`
    ),
  ].join("");

  filters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;

    const filtro = button.dataset.filter;

    // Estado visual del botón
    filters.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn === button);
    });

    // Muestra / oculta y reinicia la animación de cada tarjeta
    grid.querySelectorAll(".dish-card").forEach((card, index) => {
      const coincide = filtro === "all" || card.dataset.categoria === filtro;

      card.classList.toggle("is-hidden", !coincide);
      card.classList.remove("is-entering");

      if (coincide) {
        // reflow forzado: permite reiniciar la animación CSS
        void card.offsetWidth;
        card.style.animationDelay = `${index * 60}ms`;
        card.classList.add("is-entering");
      }
    });
  });
}