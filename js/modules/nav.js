/* ==========================================================================
   modules/nav.js
   --------------------------------------------------------------------------
   Comportamiento de la barra de navegación:

     · Se oculta al bajar, aparece al subir (como el boceto original).
     · Gana fondo traslúcido cuando deja de estar sobre el hero.
     · Menú móvil a pantalla chica.
     · Marca el enlace de la sección que se está viendo.
   ========================================================================== */

const HIDE_THRESHOLD = 120; // px de scroll antes de empezar a ocultar
const SOLID_THRESHOLD = 80; // px de scroll para el fondo translúcido

export function initNav() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelectorAll(".nav__link");

  if (!nav) return;

  // Páginas sin hero (p. ej. la carta) no tienen foto oscura debajo: la barra
  // debe ser sólida desde el primer pixel, no solo después de 80 px de scroll.
  const tieneHero = Boolean(document.querySelector(".hero"));

  /* ---------- Comportamiento según la dirección del scroll ---------- */
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;

    // Fondo traslúcido: siempre en páginas sin hero.
    nav.classList.toggle("nav--solid", y > SOLID_THRESHOLD || !tieneHero);

    // Solo ocultamos si estamos claramente dentro o fuera del hero
    if (y > HIDE_THRESHOLD && y > lastY && !nav.classList.contains("nav--open")) {
      nav.classList.add("nav--hidden");
    } else {
      nav.classList.remove("nav--hidden");
    }

    lastY = y;
    updateActiveLink();
  };

  /* ---------- Menú móvil ---------- */
  const setMenuState = (isOpen) => {
    toggle?.setAttribute("aria-expanded", String(isOpen));
    toggle?.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  };

  const closeMenu = () => {
    nav.classList.remove("nav--open");
    setMenuState(false);
    document.body.style.overflow = "";
  };

  toggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");

    setMenuState(isOpen);
    // Bloquea el scroll de fondo con el menú abierto
    document.body.style.overflow = isOpen ? "hidden" : "";

    if (!isOpen) lastY = window.scrollY;
  });

  // Cierra el menú al hacer clic en un enlace o al presionar Escape
  links.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      // Si el foco estaba en un enlace del panel, al ocultarlo se perdería.
      toggle?.focus();
    }
  });

  /* ---------- Resalte de la sección activa ---------- */
  const sections = document.querySelectorAll("section[id]");

  function updateActiveLink() {
    // Referencia: mitad de la ventana
    const line = window.innerHeight / 2;
    let currentId = "";

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= line) {
        currentId = section.id;
      }
    });

    links.forEach((link) => {
      // La página actual lleva aria-current="page": su resalte es fijo,
      // no lo decide el scroll (en carta.html no hay secciones con id).
      if (link.getAttribute("aria-current") === "page") return;
      link.classList.toggle("is-active", link.hash === `#${currentId}`);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}