/* ==========================================================================
   modules/datos-negocio.js
   --------------------------------------------------------------------------
   Pasa los datos de js/data/restaurante.js a los lugares del HTML que los
   necesitan: el teléfono del contacto y los botones de redes del pie.

   POR QUÉ NO ESCRIBE EL NÚMERO EN EL HTML
   --------------------------------------------------------------------------
   El teléfono estaba escrito en el HTML y además iba a aparecer en el
   formulario de reservas. Con el número real hay que cambiar los dos, y con
   el apuro uno se olvida y queda el viejo. Acá está en un archivo solo: se
   cambia una vez y los dos lugares quedan bien.

   Y si un negocio no tiene Facebook, el botón no aparece, en vez de quedar
   uno apuntando a "#" (que al tocarse no lleva a ningún lado y parece un
   error).
   ========================================================================== */

export function initDatosNegocio() {
  const datos = window.RESTAURANTE;

  // Sin datos cargados se deja el HTML como está: mejor ver el número
  // escrito a mano que un hueco.
  if (!datos) return;

  pintarTelefono(datos);
  pintarRedes(datos);
}

/* El teléfono de la sección de contacto. Busca el enlace `tel:`: si está, se
   le cambian el destino y el texto, así el número que ve el visitante es el
   mismo que va al formulario de reservas. */
function pintarTelefono(datos) {
  const enlace = document.querySelector('a[href^="tel:"]');

  if (!enlace || !datos.telefonoLegible) return;

  enlace.href = `tel:${datos.telefonoLegible.replace(/\s/g, "")}`;
  enlace.textContent = datos.telefonoLegible;
}

/* Los botones de redes del pie.

   El HTML los trae marcados con `data-red` para saber cuál es cuál. El que
   no tenga URL en el archivo de datos se borra. */
function pintarRedes(datos) {
  document.querySelectorAll("[data-red]").forEach((boton) => {
    const red = boton.dataset.red;

    // El enlace de WhatsApp se arma con el número, no con una URL suelta.
    if (red === "whatsapp") {
      if (!datos.whatsapp) return boton.remove();

      boton.href = `https://wa.me/${datos.whatsapp}`;
      boton.target = "_blank";
      boton.rel = "noopener noreferrer";
      return;
    }

    if (!datos[red]) return boton.remove();

    boton.href = datos[red];
    boton.target = "_blank";
    boton.rel = "noopener noreferrer";
  });
}