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

   ✅  Datos reales de El Otro Portón cargados el 19/11/2026 (ver
   docs/INVESTIGACION-EL-OTRO-PORTON.md): WhatsApp y dirección confirmados
   por múltiples fuentes, Instagram oficial. Si el local cambia de número
   o de dirección, alcanza con editar este archivo.
   ========================================================================== */

window.RESTAURANTE = {
  /* ---------- Teléfono ---------- */
  // Solo dígitos, con código de país. Este número va en el enlace de WhatsApp.
  whatsapp: "59899514133",

  // Como se muestra y como se copia. El `tel:` sí admite espacios.
  telefonoLegible: "+598 99 514 133",

  /* ---------- Negocio ---------- */
  nombre: "El Otro Portón",
  ciudad: "Colonia del Sacramento",
  direccion: "Intendente Suárez esquina 18 de Julio · 18 de Julio 351, Colonia del Sacramento",
  horario: "Jueves a lunes · 12:00–15:30 y 20:00–23:30",
  cierre: "Cerrado: martes y miércoles",

  // Contratapa del menú oficial: "fuego / DESDE 14 DE ENERO DE 1984".
  // La forma "Somos fuego desde 1984" aparece en prensa (Clarín, 2024).
  eslogan: "Somos fuego desde 1984",

  /* ---------- Redes ----------
     El string vacío significa "no mostrar el botón". Si el restaurante no
     tiene Facebook, se deja "" y el botón no aparece, en vez de quedar uno
     apuntando a ningún lado. */
  instagram: "https://www.instagram.com/elotro.porton/",
  facebook: "",
};