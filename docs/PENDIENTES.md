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
- [ ] **Enlaces de redes sociales.** Los tres botones del pie de página
      (Instagram, Facebook, WhatsApp) apuntan a `#`, o sea, no llevan a
      ningún lado.
- [ ] **Email de contacto**, si se quiere agregar.

> El teléfono aparece una sola vez visible en `index.html` (sección de
> contacto, línea con `tel:`), pero hay que cambiar **dos lugares**: ese
> enlace y el texto que se ve al lado (`+598 00 000 000`).

### Fotos del local para el pasaje

Las tres fotos que usa el pasaje de la galería son **provisionales**: se
bajaron de un directorio de opiniones ([Opina.com.uy](https://www.opina.com.uy/))
y por lo tanto:

- [ ] Tienen marca de agua de un tercero.
- [ ] Son recortes panorámicos de las fotos originales, no las fotos
      completas ni en buena resolución.
- [ ] El local se ve, pero no se ve bien: no alcanzan para una galería de
      verdad.

Sacá entre 4 y 6 fotos con el celular y reemplazá las de
`assets/img/local-*.webp`:

| Archivo | Qué mostrar |
|---|---|
| `local-bar.webp` | La barra de frente, con la cocina abierta detrás |
| `local-terraza.webp` | La terraza desde adentro, con los toldos |
| — (falta) | El salón con las mesas puestas y buena luz |
| — (falta) | La bodega o la carta de vino, un detalle de cerca |
| — (falta) | Alguien comiendo, o el sello del local |
| — (falta) | Un plato Servido en la mesa, no de cerca |

Conviene sacarlas con luz natural, en horizontal, y sin gente de espaldas
en el medio.

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
- [ ] **Implementar el envío** en `js/modules/contacto.js`, donde ya está
      comentado el `fetch` preparado.

### Horarios

- [ ] **Confirmar con el restaurante.** Jueves a sábado 20:00 a 00:00,
      domingo 12:00 a 17:00, lunes a miércoles cerrado. Están repetidos en
      dos lugares (`index.html`).

### Datos del negocio

- [ ] **"+15 años asando", "4 tipos de corte", "300+ mesas por semana"**
      (`index.html`, sección "Sobre nosotros"). Son números de ejemplo.
- [ ] **Texto de "Sobre nosotros"**, si hay una historia real para contar.

---

## Importante: modo claro

El tema claro está implementado pero **nunca se probó en un dispositivo
real**, solo en el emulador. Antes de dar por bueno el trabajo:

- [ ] **Cambiar el tema con el botón y recargar**: ¿lo recuerda?
- [ ] **Mirar el puntito dorado** del botón (aparece cuando el sitio sigue
      la preferencia del sistema): ¿se entiende qué significa?
- [ ] **Cambiar el tema del sistema** sin haber elegido tema a mano: el
      sitio debería seguir al sistema: verse claro de día u oscuro de
      noche, según eso.
- [ ] **Revisar la portada y el pie en modo claro**: los dos se mantienen
      oscuros a propósito, hay que confirmar que se leen bien.
- [ ] **Revisar los contrastes** con un verificador real, sobre todo el
      texto secundario (`--c-texto-suave`). Las cifras de la paleta están
      calculadas, pero conviene verlas con el texto renderizado.
- [ ] **Probar en el celular**: la barra del navegador debería cambiar de
      color junto con el tema.

### Faltaría agregar

- [ ] Un modo "automático" explícito en el botón, para volver al
      comportamiento de seguir al sistema después de haber elegido a mano.
      Hoy hay que borrar el dato del navegador a mano.

---

## Importante: galería y carta resumida

Las dos funcionalidades se escribieron y no se probaron en un dispositivo
real. Solo se verificaron en el emulador.

### Galería con fotos grandes

- [ ] **Tocar una foto en el celular** y deslizar de una a otra. El visor es
      un `dialog` modal: mientras está abierto, el fondo no se desplaza y el
      foco no puede salirse.
- [ ] **Probar el teclado**: `Escape` cierra, las flechas ← y → cambian de
      foto.
- [ ] **Revisar que el foco vuelve a la foto** desde la que se abrió al
      cerrar.
- [ ] **Decidir si hacen falta más fotos.** Hoy hay 10. La galería se agranda
      agregando botones en `index.html`, sin tocar `js/modules/galeria.js`.
- [ ] **Revisar los pies de foto.** En pantallas táctiles no existe el
      cursor sobre la foto, así que el pie se muestra siempre. Confirmar que
      no tapa la imagen ni queda cortado.

### Carta resumida

- [ ] **Confirmar que los 5 destacados representan bien al restaurante.**
      Si convendieran 6, o menos, se cambia en `js/data/menu.js` marcando
      `destacado: true` en los platos correspondientes.
- [ ] **Revisar que el botón de desplegar** diga bien la cantidad y que se
      pueda volver a plegar.
- [ ] **Ver que los filtros solo aparezcan al desplegar**, y que al plegar
      vuelva a quedar un filtro activo coherente.

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

## Trampas conocidas del código

### Imágenes de fondo: usar `<img>`, no `background-image` con variables

Las fotos de fondo del hero y de la sección de contacto están como `<img>`
y no como `background-image` con una variable CSS:

```html
<!-- Sí: la ruta se resuelve contra el HTML -->
<img class="hero__bg" src="assets/img/cabecera.jpg" alt="" aria-hidden="true">

<!-- No: la ruta se resuelve contra la hoja de estilos -->
<div class="hero__bg" style="--hero-img: url('assets/img/cabecera.jpg')"></div>
```

Con la segunda forma el navegador busca la imagen en `css/layout/assets/…`,
porque la URL relativa se resuelve contra la hoja donde está la regla, no
contra el documento. Como los estilos vienen de varias capas importadas, es
un error fácil de cometer y difícil de detectar: la imagen simplemente no
aparece y no hay ningún error en la consola.

### La galería usa `gallery__`, el resto del sitio usa español

Las clases de la galería van en inglés (`gallery__item`, `gallery__caption`,
`gallery__lupa`), mientras que el resto del sitio usa nombres en español
(`nav__link`, `dish-card`, `section-title`). Hasta el `id` de la sección es
`galeria`, sin `y`.

No rompe nada, pero es la clase de esos detalles que después cuesta
acordarse: si el sitio quedara en manos de otra persona, buscar
"galeria" no devolvería los estilos de la galería.

- [ ] **Decidir si se unifica.** Renombrar las clases a `galeria__` obliga a
      tocar `index.html`, `css/layout/galeria.css`, `css/components/lightbox.css`
      y `js/modules/galeria.js`. Conviene hacerlo antes de que la galería
      crezca más, mientras los selectores todavía son pocos.

---

## Mejoras de experiencia

- [ ] **Confirmación de la reserva por correo** al visitante, para que sepa
      que su reserva quedó registrada.
- [ ] **Aviso de "cerrado"** en el sitio los días que el restaurante no
      atiende, para no generar reservas imposibles.
- [ ] **Galería con más fotos** del local y de los platos.
- [ ] **Animación al cambiar de filtro** en la carta, que ya está preparada
      pero vale la pena revisarla.
- [ ] **Ver el comportamiento en un celular real**, no solo en el
      emulador: el menú de móvil y los campos de fecha y hora son los
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