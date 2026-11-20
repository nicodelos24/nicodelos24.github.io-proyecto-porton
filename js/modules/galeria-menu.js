export function initGaleriaMenu() {
  document.querySelectorAll("[data-platos]").forEach((lista) => {
    const platos = window.MENU?.[lista.dataset.platos]?.items ?? [];
    lista.append(...platos.map(({ nombre }) => {
      const plato = document.createElement("li");
      plato.textContent = nombre;
      return plato;
    }));
  });

  const mosaico = document.querySelector(".mosaico");
  if (!mosaico) return;
  const carril = mosaico.querySelector(".mosaico__fotos");
  const controles = mosaico.querySelector(".mosaico__controles");
  const estado = mosaico.querySelector("[data-mosaico-estado]");
  const movimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
  const fotos = Array.from(carril.children);
  const max = () => carril.scrollWidth - carril.clientWidth;

  function ajustarControles() {
    controles.hidden = max() < 2;
  }

  ajustarControles();
  window.addEventListener("resize", ajustarControles, { passive: true });
  controles.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-avance]");
    if (!boton) return;
    const adelante = Number(boton.dataset.avance) > 0;
    const actual = carril.scrollLeft;
    const limite = max();
    const puntos = fotos.map((foto) => foto.offsetLeft - fotos[0].offsetLeft);
    const destino = adelante
      ? (actual >= limite - 2 ? 0 : Math.min(limite, puntos.find((x) => x > actual + 2) ?? limite))
      : (actual <= 2 ? limite : [...puntos].reverse().find((x) => x < actual - 2) ?? 0);

    const foto = destino >= limite - 2
      ? fotos.at(-1)
      : fotos[puntos.findIndex((x) => Math.abs(x - destino) < 2)] ?? fotos[0];
    estado.textContent = foto.querySelector("span").firstChild.textContent.trim();
    carril.scrollTo({ left: destino, behavior: movimiento.matches ? "instant" : "smooth" });
  });
}
