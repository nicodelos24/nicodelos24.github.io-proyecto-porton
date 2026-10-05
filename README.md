# El Otro Portón

Sitio web de la parrillada **El Otro Portón**, en Colonia del Sacramento
(Departamento de Colonia, Uruguay).

Es un sitio estático: HTML, CSS y JavaScript sin frameworks, sin paso de
build y sin dependencias que instalar. Se publica directamente desde este
repositorio con GitHub Pages.

---

## Qué hay que saber antes de tocar nada

- **El menú no está escrito en el HTML.** Las tarjetas de la carta se
  generan en el navegador a partir de `js/data/menu.js`. Para agregar,
  quitar o cambiar un plato se edita ese archivo y nada más.
- **Los colores, las fuentes y el espaciado no están escritos en los
  estilos de cada sección.** Salen todos de las variables de
  `css/base/tokens.css`. Cambiar la identidad visual del sitio es editar
  ese único archivo.
- **Los estilos están ordenados en capas**, y el orden importa. Está
  explicado en `docs/ARQUITECTURA.md`.
- **Cada módulo de JavaScript se inicializa por separado y a prueba de
  errores.** Si uno falla, el resto del sitio sigue funcionando.
- **Los datos de contacto y los precios son de ejemplo.** Hay que
  reemplazarlos por los reales antes de publicar. Está detallado en
  `docs/PENDIENTES.md`.

---

## Ver el sitio en local

No hace falta instalar nada. Cualquier servidor estático sirve, porque el
sitio usa módulos de JavaScript y necesitan servirse por HTTP (abrir el
archivo directamente con doble clic no funciona).

```sh
# Con Python, que ya viene en la mayoría de los sistemas
python3 -m http.server 8000

# O con Node
npx serve .
```

Después abrir <http://localhost:8000>.

Para probar en el celular, en la misma red Wi-Fi, reemplazar `localhost`
por la IP de la computadora.

---

## Estructura del proyecto

```
.
├── index.html            Página única: todas las secciones
├── css/
│   ├── main.css          Importa las capas, en orden
│   ├── base/             Variables, reset, tipografía
│   ├── utils/            Clases reusables sin significado propio
│   ├── components/       Piezas reutilizables (botón, tarjeta, menú)
│   └── layout/           Estilos de cada sección concreta
├── js/
│   ├── main.js           Arranca los módulos
│   ├── data/menu.js      Los platos de la carta
│   └── modules/          Un archivo por funcionalidad
├── assets/img/           Fotos y logos
├── docs/                 Documentación
└── prototipo-boceto/     Primera versión, guardada como referencia
```

---

## Documentación

| Documento | Qué contiene |
|---|---|
| [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md) | Cómo está construido el sitio y por qué así |
| [`docs/GUIA-DE-CONTRIBUCION.md`](docs/GUIA-DE-CONTRIBUCION.md) | Cómo cambiar la carta, los colores y agregar una sección |
| [`docs/DECISIONES.md`](docs/DECISIONES.md) | Decisiones de diseño técnico y sus motivos |
| [`docs/PENDIENTES.md`](docs/PENDIENTES.md) | Lo que falta antes de publicar |

---

## Despliegue

El sitio se publica con GitHub Pages desde la rama `main`. Cada vez que se
sube un cambio a esa rama, el sitio se actualiza solo.

Antes de subir cambios, revisar `docs/PENDIENTES.md`: todavía hay datos de
ejemplo (teléfono, precios, horarios) que no deberían quedar visibles en
un sitio publicado.