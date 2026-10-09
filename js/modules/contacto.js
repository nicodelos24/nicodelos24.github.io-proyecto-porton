/* ==========================================================================
   modules/contacto.js
   --------------------------------------------------------------------------
   Formulario de reserva.

   CÓMO FUNCIONA
   --------------------------------------------------------------------------
   El visitante completa el formulario y, al enviar, se abre WhatsApp con el
   mensaje ya escrito: nombre, fecha, hora, personas, teléfono y notas. El
   restaurante recibe la reserva en su propio chat, sin que haga falta un
   servidor, una base de datos ni un servicio de pagos.

   POR QUÉ WHATSAPP Y NO UN BACKEND
   --------------------------------------------------------------------------
   Un restaurante chico recibe las reservas por teléfono igual. El WhatsApp es
   el canal que ya usan, no hay que aprender nada nuevo, y el sitio no queda
   depending de nada externo que después haya que pagar.

   El único costo: si el visitante no tiene WhatsApp instalado, el enlace
   abre la versión web de wa.me, que funciona igual en el navegador.

   El número sale de js/data/restaurante.js.
   ========================================================================== */

/* Los <option> del select con su etiqueta, para no mandar el value crudo
   ("cumpleanos") en un mensaje que va a leer una persona. */
const MOTIVOS = {
  cena: "Cena",
  almuerzo: "Almuerzo",
  cumpleanos: "Cumpleaños",
  evento: "Evento / grupo",
};

export function initContacto() {
  const form = document.querySelector(".form");
  const status = document.querySelector(".form__status");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    // --- Validación: sin nombre o sin fecha no hay nada que mandar ---
    const faltan = [];
    if (!data.nombre) faltan.push("el nombre");
    if (!data.fecha) faltan.push("la fecha");

    if (faltan.length) {
      showStatus(`Necesitamos ${faltan.join(" y ")} para confirmar la reserva.`);
      return;
    }

    const mensaje = armarMensaje(data);
    const numero = window.RESTAURANTE?.whatsapp;

    // Sin número cargado no hay a dónde mandarlo: mejor decirlo que abrir un
    // WhatsApp en falso y perder la reserva en el camino.
    if (!numero) {
      showStatus(
        "No pudimos abrir WhatsApp. Escribinos o llamanos directo al restaurante."
      );
      return;
    }

    // Se arma el enlace en wa.me: el número, sin nada más, y el mensaje
    // codificado para que los acentos y los signos no lo rompan.
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    showStatus(
      `¡Gracias ${data.nombre}! Te abrimos WhatsApp con tu reserva. ` +
        `Si no se abrió, revisá que tengas la app instalada.`
    );

    form.reset();

    // El cambio de ubicación y la apertura van juntos: si el navegador los
    // bloquea, showStatus ya le dijo al visitante qué hacer a mano.
    window.location.href = url;
  });

  /* Arma el texto de la reserva, en líneas cortas para que se lea bien en el
     chat del teléfono. */
  function armarMensaje(data) {
    const lineas = [
      `Hola, quiero reservar mesa.`,
      ``,
      `Nombre: ${data.nombre}`,
      `Fecha: ${formatearFecha(data.fecha)}`,
      `Hora: ${data.hora || "sin especificar"}`,
      `Personas: ${data.personas || "1"}`,
    ];

    if (data.ocasion) {
      lineas.push(`Motivo: ${MOTIVOS[data.ocasion] || data.ocasion}`);
    }

    if (data.contacto) {
      lineas.push(`Teléfono: ${data.contacto}`);
    }

    if (data.notas) {
      lineas.push(``, `Notas: ${data.notas}`);
    }

    return lineas.join("\n");
  }

  /* El <input type="date"> devuelve "2026-10-09". Ese formato el
     restaurant no lo entiende; "9 de octubre de 2026", sí. */
  function formatearFecha(iso) {
    const [anio, mes, dia] = iso.split("-").map(Number);
    if (!anio || !mes || !dia) return iso;

    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
    ];

    return `${dia} de ${meses[mes - 1]} de ${anio}`;
  }

  function showStatus(message) {
    if (!status) return;

    status.textContent = message;
    status.classList.add("is-visible");

    // Ahora tarda más en ocultarse que antes: el visitante tiene que ir a
    // WhatsApp y el mensaje lo tiene a la vista todo ese tiempo.
    window.clearTimeout(status.__timer);
    status.__timer = window.setTimeout(() => {
      status.classList.remove("is-visible");
    }, 12000);
  }
}