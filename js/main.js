/* ==========================================================================
   main.js — punto de entrada
   --------------------------------------------------------------------------
   Acá se importan y se inician los módulos. Cada módulo es independiente:
   si uno falla, el resto del sitio sigue funcionando (initScroll de abajo).

   Para sumar una funcionalidad nueva:
     1. creá js/modules/nuevaCosa.js y exportá initNuevaCosa()
     2. importala acá
     3. llamala con initNuevaCosa()
   ========================================================================== */

import { initPreloader } from "./modules/preloader.js";
import { initNav } from "./modules/nav.js";
import { initReveal } from "./modules/reveal.js";
import { initParallax } from "./modules/parallax.js";
import { initCarta } from "./modules/carta.js";
import { initContacto } from "./modules/contacto.js";
import { initSmoothScroll } from "./modules/smooth-scroll.js";
import { initTema } from "./modules/tema.js";
import { initGaleria } from "./modules/galeria.js";
import { initGaleriaPasaje } from "./modules/galeria-pasaje.js";

/**
 * Corre una función de inicialización a prueba de errores.
 * Un módulo roto no debe dejar la página en blanco.
 */
function safe(name, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`[${name}] No se pudo inicializar:`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  safe("preloader", initPreloader);
  safe("nav", initNav);
  safe("tema", initTema);
  safe("reveal", initReveal);
  safe("parallax", initParallax);
  safe("smooth-scroll", initSmoothScroll);
  safe("galeria", initGaleria);
  safe("galeria-pasaje", initGaleriaPasaje);
  safe("carta", initCarta);
  safe("contacto", initContacto);
});