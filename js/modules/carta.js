/* ==========================================================================
   modules/carta.js
   --------------------------------------------------------------------------
   Genera la grilla de platos a partir de window.MENU (js/data/menu.js)
   y maneja el filtrado por categoría.

   Idea: el HTML no tiene ni un <article class="dish-card"> escrito a mano.
   Todo se construye acá, así que agregar un plato es agregar un objeto
   al archivo de datos y ya está.

   Esquema híbrido (móvil): una foto de cabecera por categoría + debajo la
   lista de platos tipo carta de papel. En escritorio los grupos se muestran
   como antes, con la rejilla de tarjetas.
   ========================================================================== */

import { observeReveal } from "./reveal.js";

/* Escapa el texto que viene de datos para no inyectar HTML. */
function esc(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, (car) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[car]);
}

/* Foto de cabecera del grupo: la opcional fotoGrupo, o la del primer plato. */
function fotoDelGrupo(grupo) {
  return grupo.fotoGrupo || grupo.items[0]?.imagen || "";
}

/* Construye el HTML de una tarjeta. `categoria` sigue siendo la clave del
   grupo (data-categoria), que es la que usa el filtrado por plato en galería. */
function dishCardHTML(plato, categoria, index) {
  const tag = plato.destacado
    ? `<span class="dish-card__tag">Del chef</span>`
    : "";

  return `
    <article class="dish-card${plato.destacado ? " dish-card--destacado" : ""}" data-categoria="${esc(categoria)}" data-reveal data-reveal-delay="${(index % 6) + 1}">
      <div class="dish-card__media">
        <img
          src="assets/img/${esc(plato.imagen)}"
          alt="${esc(plato.nombre)}"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="dish-card__body">
        ${tag}
        <div class="dish-card__row">
          <h3 class="dish-card__name">${esc(plato.nombre)}</h3>
          <span class="dish-card__dots" aria-hidden="true"></span>
          <span class="dish-card__price">$${esc(plato.precio)}</span>
        </div>
        <p class="dish-card__desc">${esc(plato.descripcion)}</p>
      </div>
    </article>
  `;
}

/* Un grupo por categoría: cabecera con foto decorativa + título + platos. */
function grupoHTML(key, grupo, grupoIndex) {
  const foto = fotoDelGrupo(grupo);
  const lazy = grupoIndex === 0 ? "" : ' loading="lazy"';
  const platos = grupo.items
    .map((plato, index) => dishCardHTML(plato, key, index))
    .join("");

  return `
    <section class="carta__grupo" data-categoria-grupo="${esc(key)}">
      <header class="carta__grupo-head">
        <img
          class="carta__grupo-foto"
          src="assets/img/${esc(foto)}"
          alt=""
          aria-hidden="true"${lazy}
          decoding="async"
        />
        <h2 class="carta__categoria">${esc(grupo.label)}</h2>
      </header>
      ${platos}
    </section>
  `;
}

export function initCarta() {
  const grid = document.querySelector(".carta__grid");
  const filters = document.querySelector(".carta__filters");

  if (!grid || !window.MENU) return;

  const grupos = Object.entries(window.MENU);

  /* ---------- Render inicial ---------- */
  grid.innerHTML = grupos.map(([key, grupo], i) => grupoHTML(key, grupo, i)).join("");

  // Los elementos son nuevos: hay que ponerlos en observación para que
  // aparezcan al hacer scroll (ver modules/reveal.js).
  observeReveal(grid);

  /* ---------- Filtros ---------- */
  if (!filters) return;

  const live = document.querySelector(".carta__live");
  const botones = [
    `<button class="filter-btn is-active" data-filter="all" aria-pressed="true">Todo</button>`,
    ...grupos.map(
      ([key, group]) => `<button class="filter-btn" data-filter="${esc(key)}" aria-pressed="false">${esc(group.label)}</button>`
    ),
  ];

  filters.innerHTML = botones.join("");

  filters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;

    const filtro = button.dataset.filter;

    // Estado visual y semántico del botón
    filters.querySelectorAll(".filter-btn").forEach((btn) => {
      const activo = btn === button;
      btn.classList.toggle("is-active", activo);
      btn.setAttribute("aria-pressed", String(activo));
    });

    // Con "Todo" se muestran los cuatro grupos; con una categoría elegida,
    // ese grupo completo (foto + título + platos) es el único visible.
    let visible = 0;

    grid.querySelectorAll(".carta__grupo").forEach((grupo) => {
      const mostrar = filtro === "all" || grupo.dataset.categoriaGrupo === filtro;

      grupo.classList.toggle("is-hidden", !mostrar);
      if (mostrar) visible += 1;

      grupo.querySelectorAll(".dish-card").forEach((card, index) => {
        card.classList.remove("is-entering");
        void card.offsetWidth; // reflow forzado: reinicia la animación CSS
        card.style.animationDelay = `${index * 60}ms`;
        card.classList.add("is-entering");
      });
    });

    // Anuncia el cambio a lectores de pantalla.
    if (live) {
      const etiqueta = button.textContent.trim();
      live.textContent = filtro === "all"
        ? `Mostrando todos los platos (${visible} categorías).`
        : `Mostrando ${etiqueta}.`;
    }

    // El chip tocado se desplaza hasta quedar visible en la fila deslizable.
    button.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  });
}
