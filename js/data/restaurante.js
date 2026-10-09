/* ==========================================================================
   DATOS DEL RESTAURANTE — js/data/restaurante.js
   --------------------------------------------------------------------------
   Fuente única de verdad de los datos de contacto. Todo lo que hoy está
   escrito a mano en el HTML (el teléfono en el contacto, los botones de redes
   del pie) sale de acá.

   POR QUÉ ESTÁ EN UN ARCHIVO APARTE Y NO EN EL HTML
   --------------------------------------------------------------------------
   Porque este sitio se va a vender y va a cambiar de dueño. El día que el
   restaurante se llame de otra forma, o atienda al teléfono nuevo, se cambia
   TODO en este archivo y en ningún otro lado. Antes había que buscar el
   teléfono en el HTML, otro teléfono en el pie, y un tercero en el formulario:
   tres lugares, y con el apuro seguro que uno se olvida y queda el viejo.

   CÓMO USAR ESTOS DATOS
   --------------------------------------------------------------------------
   · El número va SOLO con dígitos, sin +, sin espacios y con el código del
     país. En wa.me no puede haber nada más: si se pone "099 514 133", el
     enlace se rompe.
   · `tel:` sí acepta el formato con espacios, que es el que se muestra.

   ⚠️  MIENTRAS ESTOS DATOS SIGAN SIENDO DE EJEMPLO, EL FORMULARIO DE
   RESERVAS ABRE UN WHATSAPP QUE NO ES DE NADIE. Antes de entregar el sitio
   al restaurante, cambiar los tres valores de abajo.
   ========================================================================== */

window.RESTAURANTE = {
  /* ---------- Teléfono ---------- */
  // Solo dígitos, con código de país. Este número va en el enlace de WhatsApp.
  whatsapp: "59800000000",

  // Como se muestra y como se copia. El `tel:` sí admite espacios.
  telefonoLegible: "+598 00 000 000",

  /* ---------- Negocio ---------- */
  nombre: "El Otro Portón",
  ciudad: "Colonia del Sacramento",

  /* ---------- Redes ----------
     El string vacío significa "no mostrar el botón". Si el restaurante no
     tiene Facebook, se deja "" y el botón no aparece, en vez de quedar uno
     apuntando a ningún lado. */
  instagram: "",
  facebook: "",
};