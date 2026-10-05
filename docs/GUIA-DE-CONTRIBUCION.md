# Guía de contribución

Instrucciones para las tareas que más probablemente haya que hacer. Cada una
dice exactamente qué archivo tocar.

---

## Agregar, quitar o cambiar un plato

**Único archivo a tocar: `js/data/menu.js`.**

Las tarjetas de la carta no están escritas en el HTML: se generan en el
navegador a partir de ese archivo.

```js
{
  nombre: "Nombre del plato",        // obligatorio
  descripcion: "Texto corto",         // opcional
  precio: 890,                        // número, pesos uruguayos
  imagen: "asad.jpg",                 // archivo dentro de assets/img/
  destacado: true,                    // opcional, muestra la etiqueta "Del chef"
}
```

### Agregar un plato a una categoría existente

Dentro del `items` del grupo correspondiente:

```js
bebidas: {
  label: "Bebidas",
  items: [
    { nombre: "Agua mineral", descripcion: "Sin gas, 500 ml.", precio: 90, imagen: "images.jpg" },
    // el plato nuevo va acá
  ],
},
```

El botón de filtro con su etiqueta aparece solo, sin tocar nada más.

### Agregar una categoría nueva

Un grupo más arriba del objeto `window.MENU`. La categoría se toma
automáticamente de la clave del grupo, así que no se escribe dentro de cada
plato:

```js
postres: {
  label: "Postres",          // esto es lo que ve el visitante en el filtro
  items: [
    { nombre: "Flan casero", precio: 350, imagen: "port.jpg" },
  ],
},
```

### La imagen del plato

Va dentro de `assets/img/`, y en `menu.js` solo se escribe el nombre del
archivo. Conviene descriptive: `calabaza-asada-con-queso.jpg` y no
`IMG_4021.jpg`.

### Ojo

Los precios son **de ejemplo**. Reemplazarlos por los reales antes de
publicar.

---

## Cambiar los colores, las fuentes o el espaciado

**Único archivo a tocar: `css/base/tokens.css`.**

Ahí están todos los valores de la identidad visual. Para un cambio puntual:

| Quiero cambiar | Variable |
|---|---|
| Color principal de la marca | `--c-marca` |
| Color de acento (dorado) | `--c-acento` |
| Fondo del sitio | `--c-bg` |
| Fondo de las secciones alternas | `--c-bg-alt` |
| Color del texto | `--c-texto` |
| Texto secundario | `--c-texto-suave` |
| Tipografía de títulos | `--font-display` |
| Tipografía de textos | `--font-body` |
| Ancho máximo del contenido | `--contenedor-max` |
| Separación vertical de las secciones | `--seccion-pad-y` |
| Velocidad de las animaciones | `--dur-fast` / `--dur-base` / `--dur-slow` |

### Cambiar la paleta entera

Arriba del archivo están los colores base (`--c-vino-*`, `--c-oro-*`,
neutros). Abajo, los **alias semánticos**. Cambiar la marca de vino a otro
color se hace en los alias, no en los estilos:

```css
--c-marca: var(--c-oro-400);   /* en vez de --c-vino-500 */
```

Los estilos de las secciones **siempre** usan los alias. Si aparece un
`--c-vino-600` dentro de un archivo de sección, eso es una señal de que algo
se puede simplificar.

### Tipografía

Se carga desde Google Fonts en `css/base/typography.css`. Para cambiar las
fuentes hay que actualizar dos lugares:

1. El `@import` de Google Fonts, con la familia nueva.
2. Las variables `--font-display` y `--font-body` en `tokens.css`.

Conviene elegir siempre una alternativa de sistema (`Georgia`,
`system-ui`) como respaldo, para que se vea bien aunque Google Fonts no
llegue a cargar.

---

## Cambiar los textos del sitio

Todo el texto visible está en `index.html`, salvo el de los platos, que
está en `js/data/menu.js`.

Para cambiar el teléfono o la dirección: buscar en `index.html` dentro de
la sección de contacto.

Ojo con los datos que están **repetidos**:

| Dato | Dónde aparece | Cómo cambiarlo |
|---|---|---|
| Teléfono | Enlace `tel:` **y** el texto al lado, en la misma línea | Cambiar los dos de una vez |
| Horarios | Sección de contacto **y** pie de página | Cambiar las dos listas |
| Año del copyright | Lo inyecta JavaScript | No hay que tocarlo |

---

## Agregar una sección nueva

1. **El HTML**: escribir la sección dentro de `<main>` en `index.html`,
   con un `id` (el `id` es el ancla del menú).

   ```html
   <section class="section" id="mi-seccion">
     <div class="container">
       <span class="eyebrow" data-reveal>Mi eyebrow</span>
       <h2 class="section-title" data-reveal>Título</h2>
     </div>
   </section>
   ```

   Agregar `data-reveal` es opcional: hace que el elemento entre con una
   animación al aparecer.

2. **Los estilos**: crear `css/layout/mi-seccion.css` y sumar el
   `@import` en `css/main.css`, dentro de la capa LAYOUT.

3. **El enlace**: agregar una línea en `.nav__links` (menú de arriba) y en
   la lista del pie de página.

Si el estilo se va a repetir en otra sección, conviene subirlo a
`css/components/` en lugar de duplicarlo.

---

## Agregar una funcionalidad nueva (JavaScript)

1. Crear `js/modules/nueva-cosa.js`:

   ```js
   export function initNuevaCosa() {
     // ...
   }
   ```

2. Importarlo en `js/main.js`.
3. Llamarlo dentro de `safe(...)`:

   ```js
   safe("nueva-cosa", initNuevaCosa);
   ```

El `safe` no es opcional: es lo que garantiza que un error en el módulo nuevo
no deje la página en blanco.

---

## Agregar una animación de entrada

En el HTML, agregar `data-reveal` al elemento. Opcionalmente:

```html
<div data-reveal="right" data-reveal-delay="2">
```

- `data-reveal` sin valor: entra desde abajo (lo normal).
- `data-reveal="right"` / `"left"` / `"scale"`: otras direcciones.
- `data-reveal-delay="1..6"`: escalona la entrada respecto de las demás.

**Importante:** si se agrega HTML nuevo desde JavaScript, hay que llamar a
`observeReveal(raíz)` después de insertarlo. Si no, esos elementos nunca se
observan y quedan invisibles. Es lo que hace `carta.js` después de generar
las tarjetas.

---

## Antes de subir un cambio

- [ ] ¿Quedó algún teléfono, precio, horario o dirección de ejemplo?
      (ver `PENDIENTES.md`)
- [ ] ¿Las imágenes nuevas están en `assets/img/`?
- [ ] ¿Los textos alternativos de las imágenes dicen qué se ve?
- [ ] ¿El sitio se ve bien en el celular? La navegación cambia bastante.
- [ ] ¿Sigue funcionando si se desactiva JavaScript? El contenido tiene que
      quedar visible.
---

## Cambiar los colores de un tema

**Único archivo a tocar: `css/base/tokens.css`.**

La paleta del tema claro está escrita **dos veces** en ese archivo, y hay que
tocarla las dos:

| Bloque | Cuándo se aplica |
|---|---|
| `:root[data-tema="claro"]` | Cuando el visitante elige el tema a mano |
| `:root:not([data-tema])` dentro de `prefers-color-scheme: light` | Cuando nadie eligió nada: manda el sistema |

Se repiten a propósito para que el sitio funcione también sin JavaScript.
Si tocás uno y no el otro, el tema va a verse bien en la mitad de las
situaciones y mal en la otra, sin ningún error que lo indique.

### Partes del sitio que no cambian con el tema

La portada y el pie se quedan oscuros siempre, porque van sobre fotos
oscuras. Definen sus propios colores dentro del bloque:

```css
.hero {
  --c-texto: #f4efe6;
  --c-acento: #d9b64a;
  /* ... */
}
```

Si agregás un elemento nuevo dentro de esas secciones y necesitás ajustar un
color, definilo en ese mismo bloque, no en la paleta global.

### Comprobar un cambio

Con el botón de tema de la barra de navegación se ven los dos temas sin
tocar código. Para probar cómo lo ve alguien que nunca eligió nada, en las
herramientas de desarrollo se puede cambiar la preferencia del sistema:

```js
// En la consola del navegador
window.__forzarTema = (t) => {
  localStorage.setItem("tema", t);
  location.reload();
};
__forzarTema("claro");
```

Recordá borrar la preferencia después de probar, con
`localStorage.removeItem("tema")` y recargando.
