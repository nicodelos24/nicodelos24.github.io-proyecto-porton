const selector = "[data-reveal], [data-photo-reveal]";
let observer;

export function observeReveal(root = document) {
  const targets = root.querySelectorAll(selector);
  if (!observer) return;
  targets.forEach((el) => {
    if (!el.classList.contains("is-visible")) observer.observe(el);
  });
}

export function initReveal() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;
  observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add("is-visible");
      observer.unobserve(target);
    });
  }, { threshold: 0.1 });
  document.documentElement.classList.add("reveal-ready");
  observeReveal();
}
