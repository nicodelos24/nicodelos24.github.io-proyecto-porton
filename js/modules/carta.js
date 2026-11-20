import { observeReveal } from "./reveal.js";

const microcopias = {
  parrilla: "Del fuego, directo al plato",
  bebidas: "El ritual empieza antes del primer brindis",
};

function nodo(tag, clase, texto) {
  const el = document.createElement(tag);
  el.className = clase;
  if (texto) el.textContent = texto;
  return el;
}

function platoHTML(plato, index) {
  const item = nodo("li", "dish-card");
  item.dataset.reveal = "";
  item.style.setProperty("--reveal-delay", `${index * 60}ms`);
  const fila = nodo("div", "dish-card__row");
  const guia = nodo("span", "dish-card__dots");
  guia.setAttribute("aria-hidden", "true");
  fila.append(
    nodo("h3", "dish-card__name", plato.nombre),
    guia,
    nodo("span", "dish-card__price", `$${plato.precio}`),
  );
  item.append(fila);
  if (plato.descripcion) item.append(nodo("p", "dish-card__desc", plato.descripcion));
  return item;
}

function grupoHTML(key, grupo, index) {
  const seccion = nodo("section", "carta__grupo");
  seccion.dataset.categoriaGrupo = key;
  seccion.setAttribute("aria-labelledby", `categoria-${key}`);
  const cabecera = nodo("header", "carta__grupo-head editorial-photo");
  cabecera.dataset.photoReveal = "";
  const foto = nodo("img", "carta__grupo-foto");
  foto.src = `assets/img/${grupo.fotoGrupo}`;
  foto.alt = "";
  foto.decoding = "async";
  if (index > 0) foto.loading = "lazy";
  const titulo = nodo("h2", "carta__categoria", grupo.label);
  titulo.id = `categoria-${key}`;
  cabecera.append(foto, titulo);
  if (microcopias[key]) cabecera.append(nodo("p", "carta__micro", microcopias[key]));
  const platos = nodo("ul", "carta__platos");
  platos.append(...grupo.items.map(platoHTML));
  seccion.append(cabecera, platos);
  return seccion;
}

export function initCarta() {
  const grid = document.querySelector(".carta__grid");
  const toolbar = document.querySelector(".carta__toolbar");
  if (!grid || !toolbar || !window.MENU) return;

  const grupos = Object.entries(window.MENU);
  const secciones = grupos.map(([key, grupo], index) => grupoHTML(key, grupo, index));
  grid.append(...secciones);
  observeReveal(grid);

  const filtros = toolbar.querySelector(".carta__filters");
  const live = toolbar.querySelector(".carta__live");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const botones = [["all", "Todo"], ...grupos.map(([key, { label }]) => [key, label])]
    .map(([key, label]) => {
      const boton = nodo("button", "filter-btn", label);
      boton.type = "button";
      boton.dataset.filter = key;
      boton.setAttribute("aria-pressed", String(key === "all"));
      boton.setAttribute("aria-controls", grid.id);
      return boton;
    });
  filtros.append(...botones);
  toolbar.hidden = false;

  filtros.addEventListener("click", (event) => {
    const boton = event.target.closest(".filter-btn");
    if (!boton || boton.getAttribute("aria-pressed") === "true") return;
    const filtro = boton.dataset.filter;
    const stickyTop = Number.parseFloat(getComputedStyle(toolbar).top);
    const inicio = window.scrollY + grid.getBoundingClientRect().top - toolbar.offsetHeight - stickyTop;
    const pasadoInicio = window.scrollY > inicio + 2;

    botones.forEach((chip) => chip.setAttribute("aria-pressed", String(chip === boton)));
    secciones.forEach((seccion) => {
      seccion.hidden = filtro !== "all" && seccion.dataset.categoriaGrupo !== filtro;
    });
    live.textContent = filtro === "all"
      ? `Mostrando todos los platos (${grupos.length} categorías).`
      : `Mostrando ${boton.textContent}.`;

    // Solo se mueve el carril horizontal; no arrastra la página con scrollIntoView.
    const carril = filtros.getBoundingClientRect();
    const chip = boton.getBoundingClientRect();
    filtros.scrollBy({
      left: chip.left + chip.width / 2 - carril.left - carril.width / 2,
      behavior: reduceMotion.matches ? "instant" : "smooth",
    });
    if (pasadoInicio) window.scrollTo({ top: Math.max(0, inicio), behavior: "instant" });
  });
}
