/* ==========================================================================
   modules/carta.js
   --------------------------------------------------------------------------
   Genera la grilla de platos a partir de window.MENU (js/data/menu.js)
   y maneja el filtrado por categoría.

   Idea: el HTML no tiene ni un <article class="dish-card"> escrito a mano.
   Todo se construye acá, así que agregar un plato es agregar un objeto
   al archivo de datos y ya está.

   DOS ESTADOS
   --------------------------------------------------------------------------
   · Resumen (el primero): solo se ven los platos marcados con
     `destacado: true` en los datos, y un botón abre el menú entero.
     Evita que el visitante tenga que recorrer once tarjetas para
     hopefully encontrar lo que busca.
   · Completo: con el botón desplegado, se ven todos y aparecen los
     filtros por categoría.
   ========================================================================== */

import { observeReveal } from "./reveal.js";

/* ---------- Datos ---------- */

/** Devuelve todos los platos con su categoría agregada, en una sola lista */
function flattenMenu(menu) {
  return Object.entries(menu).flatMap(([categoria, grupo]) =>
    grupo.items.map((plato) => ({ ...plato, categoria, etiqueta: grupo.label }))
  );
}

/** Construye el HTML de una tarjeta */
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

/* ---------- Inicialización ---------- */

export function initCarta() {
  const grid = document.querySelector(".carta__grid");
  const filtros = document.querySelector(".carta__filters");
  const toolbar = document.querySelector(".carta__toolbar");
  const botonTodos = document.querySelector("[data-carta-todos]");

  if (!grid || !window.MENU) return;

  const platos = flattenMenu(window.MENU);
  const destacados = platos.filter((p) => p.destacado);
  const tapados = platos.length - destacados.length;

  let completo = false;
  let filtro = "all";

  /* ---------- Render ---------- */
  grid.innerHTML = platos.map(dishCardHTML).join("");

  // Las tarjetas son nuevas: hay que ponerlas en observación para que
  // aparezcan al hacer scroll (ver modules/reveal.js).
  observeReveal(grid);

  /* ---------- Filtros ---------- */
  if (filtros) {
    const categorias = Object.entries(window.MENU).map(([key, grupo]) => ({
      key,
      label: grupo.label,
    }));

    filtros.innerHTML = [
      `<button class="filter-btn is-active" data-filter="all" type="button">Todo</button>`,
      ...categorias.map(
        (cat) => `<button class="filter-btn" data-filter="${cat.key}" type="button">${cat.label}</button>`
      ),
    ].join("");

    filtros.addEventListener("click", (event) => {
      const button = event.target.closest(".filter-btn");
      if (!button) return;

      filtro = button.dataset.filter;

      filtros.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.classList.toggle("is-active", btn === button);
      });

      aplicar();
    });
  }

  /* ---------- Botón de menú completo ---------- */
  if (botonTodos) {
    botonTodos.querySelector("[data-cantidad]").textContent = tapados;
    botonTodos.addEventListener("click", () => {
      completo = !completo;
      aplicar();

      // Al desplegar, se anuncia cuántos platos aparecieron.
      if (completo) {
        grid.setAttribute("aria-label", `Menú completo, ${platos.length} platos`);
      }
    });
  }

  /* ---------- Mostrar u ocultar ---------- */
  function aplicar() {
    // En resumen solo se ven los destacados; al desplegar, todos.
    const soloDestacados = !completo;

    grid.querySelectorAll(".dish-card").forEach((card, index) => {
      const esDestacado = card.querySelector(".dish-card__tag") !== null;
      const pasaFiltro = filtro === "all" || card.dataset.categoria === filtro;

      const visible =
        (!soloDestacados || esDestacado) && pasaFiltro;

      card.classList.toggle("is-hidden", !visible);
      card.classList.remove("is-entering");

      if (visible) {
        // reflow forzado: permite reiniciar la animación CSS
        void card.offsetWidth;
        card.style.animationDelay = `${Math.min(index, 6) * 60}ms`;
        card.classList.add("is-entering");
      }
    });

    // Los filtros solo tienen sentido con el menú completo delante.
    filtros?.classList.toggle("is-oculto", soloDestacados);
    toolbar?.classList.toggle("is-oculto", soloDestacados);

    botonTodos?.classList.toggle("is-desplegado", completo);
    botonTodos?.setAttribute("aria-expanded", String(completo));

    const texto = botonTodos?.querySelector("[data-texto]");
    if (texto) {
      texto.textContent = completo
        ? "Ver menos"
        : `Ver el menú completo (${tapados} platos más)`;
    }
  }

  // Arranca en modo resumen.
  aplicar();
}