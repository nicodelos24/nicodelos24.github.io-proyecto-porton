/* ==========================================================================
   modules/contacto.js
   --------------------------------------------------------------------------
   Formulario de reserva.

   IMPORTANTE: hoy no envía nada a ningún lado. Solo valida y muestra el
   mensaje de confirmación. Cuando conectes un backend (Formspree, Google
   Apps Script, un endpoint propio) reemplazá el preventDefault() por el
   fetch correspondiente. Abajo está comentado el ejemplo.
   ========================================================================== */

export function initContacto() {
  const form = document.querySelector(".form");
  const status = document.querySelector(".form__status");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    // Evita la recarga de la página
    event.preventDefault();

    // --- Validación mínima: que no falte nombre ni fecha ---
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.nombre || !data.fecha) {
      showStatus("Necesitamos tu nombre y la fecha para confirmar la reserva.");
      return;
    }

    // --- Conexión futura con el backend ---
    // fetch("/api/reservas", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // }).then((res) => { if (!res.ok) throw new Error("Error en la reserva"); });

    showStatus(
      `¡Gracias ${data.nombre}! Recibimos tu pedido de reserva para el ${data.fecha}. ` +
        `Te confirmamos por WhatsApp a la brevedad.`
    );

    form.reset();
  });

  function showStatus(message) {
    if (!status) return;

    status.textContent = message;
    status.classList.add("is-visible");

    // Oculta el aviso a los 6 segundos
    window.clearTimeout(status.__timer);
    status.__timer = window.setTimeout(() => {
      status.classList.remove("is-visible");
    }, 6000);
  }
}