# Pendientes

Lo que falta para que el sitio esté listo para publicar, y cosas que conviene
revisar más adelante.

---

## Bloqueante: enlaces rotos

### [ ] La página `carta.html` no existe

Tres enlaces del sitio apuntan a ella y **devuelven 404** hasta que se arme:

| Dónde | Texto |
|---|---|
| Menú de navegación | Carta |
| Botón de la portada | Ver la carta |
| Pie de página | Carta |

La idea es que la página principal quede visual, con los platos repartidos
junto a las fotos, y que esta sea la carta sobria para consultar precios y,
más adelante, para hacer pedidos.

**Lo que ya está listo para usar:**

- `js/modules/carta.js` renderiza la grilla con los 11 platos y los filtros
  por categoría. No se rompió, simplemente no encuentra su contenedor.
- `css/layout/carta.css` tiene todos los estilos de esa grilla.
- `js/data/menu.js` es la fuente de los platos.

Con copiar el `index.html` como base, cambiar el `<main>` y la ruta del CSS
(`css/main.css` pasa a `../css/main.css`) debería alcanzar. **Falta probarlo.**

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

### Fotos de las bebidas

La rejilla del medio de la galería está pensada para las fotos de tragos, pero hoy
ocupan dos platos del menú: el costillar y una mesa servida.

- [ ] **Bajar las fotos de los tragos del Instagram**
      (<https://www.instagram.com/elotro.porton/>) y dejarlas en la carpeta
      `images/` para probar la composición antes de publicarlas.
- [ ] **Usar los archivos originales**, no los que baja Instagram: al guardar
      desde ahí llegan comprimidas a unos 1080 px y se ven borrosas.
- [ ] **Revisar los nombres.** No pasar links de Instagram: expiran a las pocas
      horas y dejan la foto rota.
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

## Importante: la galería

La galería se rediseñó varias veces: pasó de mosaico parejo a una secuencia
alternada, y los platos se repartieron entre las fotos. Nunca se probó en un
dispositivo real.

### Probar en un celular de verdad

- [ ] **Revisar el ritmo de la página.** Con dos bandas pegadas, fotos a todo
      el ancho y una rejilla en el medio, el paso es rápido. En pantalla
      chica puede marear.
- [ ] **El bloque central de la galería** se apila y muestra una sola foto. La
      otra se oculta a propósito: revisar que no quede un hueco raro.
- [ ] **Los pies de foto.** Salen al pasar el mouse. En el celular no hay
      hover, así que **no se ven nunca**. Son tres líneas de CSS
      (`@media (hover: none)`) y conviene hacerlo.
- [ ] **La sangría.** Las fotos a todo el ancho usan `100vw`, que incluye la
      barra de desplazamiento. Hay que confirmar que **no aparece barra
      horizontal** en distintos navegadores.

### Las fotos, cuando lleguen las definitivas

- [ ] **Las fotos de los tragos**, para la rejilla. Ver más arriba.
- [ ] **Fotos verticales para la galería.** Las fotos actuales son horizontales
      (1000×562) y los marcos angostos las recortan bastante. Una foto
      vertical se vería mejor en los bloques chicos.
- [ ] **Comprimir los pesos.** Varias fotos pasan los 100 KB.

### El efecto clavado, y sus límites

Las fotos con efecto usan `background-attachment: fixed`, que funciona en
escritorio pero **no en iOS ni en celular**. Está anotado en
`ARQUITECTURA.md`.

- [ ] **Decidir si vale el costo.** Si en algún momento el efecto tiene que
      verse en el celular, hay que cambiar de técnica (JavaScript), no ajustar
      valores. Súmanos unas 20 líneas y hay que revisar el encuadre de cada
      foto.
- [ ] **Mirar la caída de imágenes.** Al ser fondos, las siete se piden al
      abrir la página (~700 KB de golpe) en vez de al llegar a la galería.

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

- [ ] **Pasar la publicación a Cloudflare Pages** para poder dejar el
      repositorio en privado. GitHub Pages, en el plan gratuito, solo publica
      repositorios públicos. El paso a paso, con el orden y la lista de
      verificaciones, está en
      [`MIGRACION-CLOUDFLARE.md`](MIGRACION-CLOUDFLARE.md).

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

### Rutas de imágenes de fondo: siempre con barra inicial

Las fotos que van como fondo en CSS usan ruta **completa**, no relativa:

```css
/* Sí */
background-image: url("/assets/img/mollejas-con-cremoso.jpg");

/* No: se resuelve contra la hoja de estilos, no contra el documento */
background-image: url("assets/img/mollejas-con-cremoso.jpg");
```

Con la segunda forma el navegador busca la imagen en `css/layout/assets/…`.
Como los estilos vienen de varias capas importadas, es un error fácil de
cometer y difícil de detectar: la imagen simplemente no aparece y no hay ningún
error en la consola.

### Un `transform` rompe la foto clavada

Las fotos de la galería y de las bandas usan `background-attachment: fixed`.
**Cualquier elemento con `transform` o con `will-change: transform` deja de
anclar su imagen de fondo a la pantalla**, y el efecto desaparece sin avisar.

Por eso todo bloque con foto de fondo usa `data-reveal="fade"`, que solo aparece
sin desplazarse. Si se cambia por `left`, `right` o `scale`, el efecto deja de
verse y no hay ningún error que lo indique.

Ojo con el `will-change`: **no se va nunca**. Aunque después `.is-visible` ponga
`transform: none`, el `will-change` sigue declarado.

### Una clase mal escrita no da ningún error

Si el nombre de una clase del HTML no coincide con el del CSS, el estilo no se
aplica y **no pasa absolutamente nada**: ni error en la consola, ni aviso. Pasó
con `transicion--tortellinis` contra `.transicion--tortelinis`, y la foto
desaparecía sin explicación.

Después de tocar markup o estilos, conviene comprobar que **cada clase del HTML
tiene su regla en el CSS, y al revés**. Ver `ARQUITECTURA.md`.

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