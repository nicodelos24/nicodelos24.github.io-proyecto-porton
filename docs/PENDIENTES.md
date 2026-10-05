# Pendientes

Lo que falta para que el sitio esté listo para publicar, y cosas que conviene
revisar más adelante.

---

## Bloqueante: antes de publicar

Estos datos son **de ejemplo** y no deberían quedar visibles en un sitio
público.

### Contacto

- [ ] **Teléfono y WhatsApp.** Hoy aparece `+598 00 000 000`
      (`index.html`, sección de contacto).
- [ ] **Dirección exacta y forma de llegar.** Solo dice "Colonia del
      Sacramento, Departamento de Colonia". Faltaría calle, número y
      referencia.
- [ ] **Links de redes sociales.** Los tres botones del pie de página
      (Instagram, Facebook, WhatsApp) apuntan a `#`, o sea, no llevan a
      ningún lado.
- [ ] **Email de contacto**, si se quiere agregar.

> El teléfono está escrito **dos veces** en `index.html` (sección de
> contacto y pie de página). Hay que cambiar ambos.

### Carta

- [ ] **Precios reales.** Todos los de `js/data/menu.js` son inventados.
- [ ] **Nombres y descripciones reales.** Conviene revisarlos con el
      restaurante: puede haber platos que ya no se sirvan.
- [ ] **Confirmar las fotos** de cada plato: varias imágenes son
      genéricas (`images.jpg`, `images_1.jpg`, `6.jpg`, `7.jpg`).

### Formulario de reservas

Hoy **el formulario no envía nada**. Valida en el navegador y muestra un
mensaje de confirmación, pero los datos se descartan.

- [ ] **Elegir a dónde se envían las reservas.** Las alternativas más
      simples para un sitio estático:
      - Un formulario de un servicio externo (Formspree, Google Forms).
      - Un enlace de WhatsApp con los datos ya cargados (lo más probable
        para un restaurante: `https://wa.me/598XXXXXXXX?text=...`).
      - Un backend propio, si más adelante hace falta.
- [ ] **Implementar el envío** en `js/modules/contacto.js`, donde ya hay
      commenting el `fetch` preparado.

### Horarios

- [ ] **Confirmar con el restaurante.** Jueves a sábado 20:00 a 00:00,
      domingo 12:00 a 17:00, lunes a miércoles cerrado. Están repetidos en
      dos lugares (`index.html`).

### Datos del negocio

- [ ] **"+15 años asando", "4 tipos de corte", "300+ mesas por semana"**
      (`index.html`, sección "Sobre nosotros"). Son números de ejemplo.
- [ ] **Texto de "Sobre nosotros"**, si hay una historia real para contar.

---

## Importante: accesibilidad y SEO

- [ ] **Probar la navegación completa con teclado.** Specialmente el menú
      de móvil, que abre y cierra con `Escape`.
- [ ] **Probar con lector de pantalla** al menos la carta y el formulario.
- [ ] **Revisar el contraste** de los textos grises sobre el fondo oscuro
      (los tokens `--c-texto-suave` y `--c-ceniza` son los sospechosos).
- [ ] **Datos estructurados** de Google (schema.org `Restaurant`), que
      habilita el resultado enriquecido con horarios y ubicación en Google.
- [ ] **Mapa de Google** en la sección de contacto, una vez teniendo la
      dirección exacta.

---

## Técnico: mejora del sitio

- [ ] **Quitar la carpeta `images/` de la raíz.** Es la copia vieja de las
      fotos, ya reemplazada por `assets/img/`. Ocupa unos 2,9 MB que no
      sirven para nada. Se puede borrar junto con `prototipo-boceto/` una
      vez que el sitio esté publicado y no haga falta más.
- [ ] **Comprimir las fotos.** Algunas pesan bastante y son JPG que podrían
      estar en WebP con una calidad visualmente idéntica. Afectaría
      directamente a cuánto tarda en cargar en el celular, que es donde se
      mira el sitio.
- [ ] **Revisar el peso real de `assets/img/`**: hay fotos que no
      referencia ningún plato ni ninguna sección (`caption_3.jpg` a
      `caption_14.jpg`, entre otras). Se pueden borrar.
- [ ] **Agregar `sitemap.xml` y `robots.txt`**, si se quiere posicionar
      mejor.

---

## Mejoras de experiencia

- [ ] **Confirmación de la reserva por email** al visitante, para que sepa
      que su pedido quedó registrado.
- [ ] **Aviso de "cerrado"** en el sitio los días que el restaurante no
      atiende, para no generar reservas imposibles.
- [ ] **Galería con más fotos** del local y de los platos.
- [ ] **Animación al cambiar de filtro** en la carta, que ya está preparada
      pero vale la pena revisarla.
- [ ] **Ver el comportamiento en un celular real**, no solo en el
      emulador: el menú de móvil y los inputs de fecha y hora son los
      puntos delicados.

---

## Ideas para más adelante

Nada de esto es necesario para publicar; queda anotado por si aparece tiempo.

- Menú del día, actualizado sin tocar código.
- Comando para reservar mesa directamente desde la web.
- Versión en inglés o selector de idioma.
- Mapa con la ubicación del local.

---

## Cómo usar esta lista

Marcar las casillas a medida que se resuelvan. Los bloques están ordenados
por urgencia: primero lo que **no puede quedar visible** en un sitio
público, después lo que mejora el sitio, y al final lo que es opcional.

Cada tarea dice en qué archivo trabajar. Para el detalle de cada cambio,
ver [`GUIA-DE-CONTRIBUCION.md`](GUIA-DE-CONTRIBUCION.md).