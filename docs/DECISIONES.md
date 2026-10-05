# Decisiones de diseño técnico

Registro de las decisiones tomadas al construir el sitio, con su motivo.
El objetivo es que dentro de un año se pueda cambiar de opinión con fundamento,
no por forgotten.

---

## D1 · Sitio estático, sin framework ni paso de build

**Qué:** HTML, CSS y JavaScript nativos. Sin React, sin Vite, sin
`node_modules`.

**Por qué:** el contenido no cambia seguido y no hay lógica de negocio que
justifique un framework. Además, el sitio tiene que seguir siendo
mantenible por su autor sin recordar por qué se eligió cierta herramienta.
Un sitio estático se despliega con GitHub Pages sin configuración.

**Cuándo revisarlo:** si la carta pasara a tener precios que cambian por
temporada con frecuencia, o si se sumara un panel de administración para
editarla sin tocar código.

---

## D2 · JavaScript con módulos ES nativos

**Qué:** `js/modules/*.js` con `import` / `export`, cargados con
`<script type="module">`.

**Por qué:** los módulos son estándar del navegador, funcionan sin
herramienta de compilación y obligan a que cada pieza declare sus
dependencias explícitamente.

**Consecuencia:** el sitio **no funciona abriendo `index.html` con doble
clic**, porque los módulos exigen servirse por HTTP. Hay que levantar un
servidor local (está explicado en el README). Es un costo aceptado.

---

## D3 · Un módulo roto no debe romper el sitio

**Qué:** cada módulo se ejecuta dentro de `safe()`, que atrapa los errores
y los anota en la consola.

**Por qué:** para un sitio de un restaurante, que falte una animación es un
inconveniente menor; que el visitante vea una página en blanco es perder la
reserva de esa noche. El costo de esta decisión es que un error puede
quedar más enterrado en la consola que si el error fuera visible de
inmediato.

---

## D4 · Colores en dos niveles: paleta y alias semánticos

**Qué:** en `css/base/tokens.css`, primero los colores concretos
(`--c-vino-600`) y después alias con significado (`--c-marca`, `--c-bg`).
Los estilos de las secciones usan **solo** los alias.

**Por qué:** permite cambiar la identidad visual del sitio entero editando
unas pocas líneas, y evita que un color literal se disperse por todos los
archivos. También hace explícito para qué se usa cada color.

---

## D5 · Estilos en cuatro capas con orden explícito

**Qué:** `main.css` solo importa capas en orden: base → utils → components →
layout. Ninguna capa puede usar una capa posterior.

**Por qué:** con estilos en un solo archivo, dos reglas que compiten se
resuelven por el orden en que se escribieron, y nadie recuerda cuál fue. Con
capas, la precedencia está escrita y es predecible.

**Consecuencia:** el CSS no se puede compilar en un solo archivo para
producción. Se asume que los imports de CSS son lo bastante baratos como
para no hacerlo (el navegador los cachea).

---

## D6 · La carta se genera desde datos, no desde el HTML

**Qué:** `index.html` tiene el contenedor `.carta__grid` vacío;
`js/modules/carta.js` lo completa desde `js/data/menu.js`.

**Por qué:** agregar un plato es agregar un objeto a un archivo de datos, en
lugar de copiar y pegar HTML. También hace imposible que las tarjetas y los
filtros se desincronicen.

**Consecuencia:** con JavaScript deshabilitado, la carta queda vacía. Se
acepta: es el único punto del sitio que depende de JS para mostrar
contenido, y el resto (textos, contacto, imágenes) sí está en el HTML.

**Consecuencia secundaria:** `js/data/menu.js` se carga como script clásico,
sin `defer`, antes que el módulo principal. Los módulos son diferidos por
defecto, así que un script clásico sin `defer` se ejecuta antes y
`window.MENU` ya está disponible cuando arranca la carta.

---

## D7 · El sitio tiene que verse bien sin JavaScript

**Qué:** un script en el `<head>` agrega la clase `js` al `<html>`, y los
estados iniciales de las animaciones están scopeados con `.js`.

**Por qué:** si el JavaScript falla en la carga, la clase nunca se agrega,
las reglas no se aplican y el contenido se ve normal. Es lo contrario de lo
habitual, donde un fallo de JS deja la página vacía porque el CSS oculta
todo sinaminesación que llegue a mostrarse.

---

## D8 · Animaciones con IntersectionObserver, movimiento en CSS

**Qué:** JavaScript solo detecta cuándo un elemento entra en pantalla y le
agrega `.is-visible`. El movimiento en sí lo hace CSS.

**Por qué:** `IntersectionObserver` no dispara un evento por cada pixel de
scroll, a diferencia de `scroll`. Y separar las dos responsabilidades deja
el JS chico y las animaciones ajustables sin tocar JavaScript.

---

## D9 · `data-reveal` en vez de una clase

**Qué:** la animación de entrada se pide con un atributo en el HTML
(`data-reveal`), no con una clase.

**Por qué:** un atributo declara intención ("esto se anima al aparecer") y no
apariencia. Se puede cambiar el estilo de la animación entera sin tocar el
HTML.

---

## D10 · Desplazamiento suave propio en vez de `scroll-behavior`

**Qué:** `js/modules/smooth-scroll.js` anima el scroll con
`requestAnimationFrame`, en vez de usar `scroll-behavior: smooth`.

**Por qué:** `scroll-behavior: smooth` no permite compensar por la altura
del menú fijo, y el salto a un ancla quedaría con el título tapado. El módulo
propio además compensa la altura del menú, cancela la animación si el
visitante scrollea a mano, y actualiza el enlace activo del menú durante el
recorrido.

**Costo:** son 2,7 KB de JavaScript para reemplazar dos palabras de CSS. Se
considera aceptable porque el desplazamiento entre secciones es la
interacción principal del sitio.

---

## D11 · Menú en un archivo de datos, no incrustado en el HTML

**Qué:** el menú se carga desde `js/data/menu.js` en lugar de estar escrito
en el marcado.

**Por qué:** ver D6. La carta se renderiza desde datos.

---

## D12 · El preloader tiene duración mínima y máxima

**Qué:** `preloader.js` espera al menos 1,8 s antes de ocultarse, y tiene una
red de seguridad a los 4 s.

**Por qué:** sin mínimo, en una conexión rápida el preloader parpadea y
desaparece, lo que se percibe como un error de carga. Sin máximo, si una
imagen nunca termina de cargar, el visitante queda mirando una pantalla
vacía. El mínimo es una decisión de percepción; el máximo, de seguridad.

---

## D13 · `_probe.html` y `_shot.html` no se versionan

**Qué:** esos dos archivos aparecen en la raíz del repositorio. Son copias
temporales de `index.html` usadas para depurar animaciones y tomar capturas
(una inyecta estilos que congelan el hero, la otra imprime medidas de las
capas por consola).

**Cómo evitarlo:** esos dos archivos están listados en `.gitignore`.
Duplicar el archivo principal en la raíz es una forma segura de arruinar un
commit: cualquier cambio aplicado a uno queda desincronizado del otro sin
avisar.

**Cuando hagan falta:** si alguna vez se necesitan, se regeneran desde
`index.html` y vuelven a borrarse.