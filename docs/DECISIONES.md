# Decisiones de diseño técnico

Registro de las decisiones tomadas al construir el sitio, con su motivo.
El objetivo es que dentro de un año se pueda cambiar de opinión con
fundamento, no por inercia.

---

## D1 · Sitio estático, sin framework ni paso de compilación

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
estados iniciales de las animaciones se limitan a esa clase con `.js`.

**Por qué:** si el JavaScript falla en la carga, la clase nunca se agrega,
las reglas no se aplican y el contenido se ve normal. Es lo contrario de lo
habitual, donde un fallo de JS deja la página vacía porque el CSS oculta
todo para que no llegue a mostrarse ninguna animación.

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
visitante scrollea a mano, y actualiza la barra de direcciones al terminar
para que el enlace copiado apunte a la sección correcta.

El resaltado del enlace activo no lo hace este módulo sino `nav.js`, que lo
recalcula en cada scroll: si lo hiciera el scroll suave, el menú no se
actualizaría al scrollear con la rueda.

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

## D13 · Las copias de depuración no se versionan

**Qué:** durante el desarrollo se usaron dos copias temporales de
`index.html` en la raíz (`_probe.html` y `_shot.html`) para probar el
comportamiento de las animaciones y para tomar capturas de pantalla. No
están en el repositorio: están listadas en `.gitignore`, y los archivos
fueron borrados al terminar.

**Por qué:** duplicar el archivo principal en la raíz es una forma segura
de arruinar un commit: cualquier cambio aplicado a uno queda
desincronizado del otro sin avisar.

**Cuando hagan falta:** si alguna vez se necesitan, se regeneran desde
`index.html` y se vuelven a borrar. Está anotado en `.gitignore` justamente
para que no se cuelguen en un commit por descuido.

---

## D14 · Las fotos de fondo son `<img>`, no variables CSS

**Qué:** la imagen del hero y la de la sección de contacto están como
`<img class="hero__bg" src="…">`, y no como un `<div>` con
`background-image: var(--hero-img)`.

**Por qué:** una URL relativa dentro de una variable CSS se resuelve
contra la **hoja de estilos** donde se usa la variable, no contra el
documento. Como los estilos están repartidos en varias capas importadas,
la imagen se busca en `css/layout/assets/img/…` y simplemente no
aparece, sin ningún error en la consola.

Un `<img>` resuelve su `src` contra el documento, que es lo que se quiere.
Además tiene otras ventajas: se le puede poner `alt=""` y `aria-hidden`,
`fetchpriority` para la del hero, y `loading="lazy"` para el resto.

---

## D15 · Contenido dinámico tiene que volver a registrarse

**Qué:** `reveal.js` exporta `observeReveal(raíz)`, y `carta.js` la llama
después de generar las tarjetas.

**Por qué:** un `IntersectionObserver` solo observa los elementos que ya
existían cuando se creó. Las tarjetas de la carta se insertan después, así
que quedaban sin observar y, como su estado inicial es `opacity: 0`,
**no aparecían nunca**. Un bug que no da error en la consola y solo se ve
al mirar la página.

La función marca cada elemento con `data-reveal-observed`, así que
llamarla dos veces no rompe nada.

**Regla:** si se inserta HTML con `data-reveal` desde JavaScript, llamar a
`observeReveal` sobre el contenedor.
---

<!--
  D16 a D20 describen funcionalidades que se implementaron y después se
  revirtieron: no están en el código. Se conservan como registro.
-->

## D16 · (revertido) El tema arranca con la preferencia del sistema

**Qué:** el sitio se ve claro o oscuro según lo que tenga configurado el
sistema del visitante. Recién después de que se toque el botón queda fija la
elección, y esa elección se recuerda entre visitas.

**Por qué:** si el sitio se impusiera un tema, quien tiene el sistema en
claro igual lee mejor en claro. Y si se respetara solo al sistema, quien
prefiera lo contrario no podría cambiarlo nunca.

**Cómo se resuelve:** el atributo `data-tema` va en `<html>`.

| Estado | Atributo | Quién decide el color |
|---|---|---|
| Sin elección (lo normal) | ninguno | La consulta `prefers-color-scheme` del CSS |
| Elección a mano | `claro` u `oscuro` | El atributo, que gana sobre la consulta |

La paleta está escrita **dos veces** en `tokens.css`, una en cada caso. Se
repite a propósito: es lo que permite que funcione sin JavaScript.

**Cuidado con el parpadeo:** el tema guardado se aplica con un script en
línea dentro del `<head>`, no desde `main.js`. Si se hiciera más tarde, el
visitante vería un destello del tema equivocado antes de que se corrija.

---

## D17 · (revertido) El modo claro tiene su propia paleta, no es invertir el oscuro

**Qué:** `tokens.css` define valores propios para el tema claro.

**Por qué:** invertir los colores no funciona. El dorado de la marca
(`#d9b64a`) sobre un fondo claro queda en una relación de contraste de
2,1:1, cuando la norma pide 4,5:1 para texto normal. Con `#8a6a12` sube a
4,7:1. Lo mismo con el vino de marca: `#8c2039` sobre marfil queda en 4,3:1
y con `#6b1830` llega a 10,9:1.

Las sombras también bajan de opacidad: sobre fondo claro, una sombra fuerte
se ve como una mancha sucia en vez de dar profundidad.

---

## D18 · (revertido) La portada y el pie se mantienen oscuros en los dos temas

**Qué:** `.hero` y `.footer` redefinen por su cuenta los colores de texto,
borde, marca y acento dentro de su propio bloque.

**Por qué:** los dos van sobre una foto oscura con un velo encima. Si
tomaran el color de texto del tema, en modo claro quedaría texto negro
sobre una foto oscura, ilegible.

**Truco:** las variables CSS se heredan, así que redefining unas pocas en el
bloque alcanza para que todo lo de adentro use esa paleta, sin tener que
duplicar las reglas de estilo.

---

## D19 · (revertido) La galería no usa `auto-fit`

**Qué:** el número de columnas está escrito en cada tramo de pantalla
(2 en móvil, 3 en tablet, 4 en escritorio) en vez de dejar que lo calcule
`auto-fit`.

**Por qué:** con `auto-fit` la cantidad de columnas depende del ancho
disponible *y* del mínimo declarado, así que la misma foto quedaba con
alturas distintas según la pantalla. En el celular, además, las cinco fotos
se apilaban en una sola columna y la sección quedaba **más alta** que en
escritorio (1206 px contra 866 px), al revés de lo esperado.

**Resultado:** la sección quedó parejo en los tres tamaños (814 / 698 /
766 px) y el celular dejó de pedir tanto scroll.

---

## D20 · (revertido) El botón de tema va fuera del panel de navegación

**Qué:** el botón no está dentro de `<nav>`, sino en un contenedor hermano
(`.nav__acciones`) al lado del botón de menú.

**Por qué:** el menú del celular se abre como una pantalla completa. Si el
botón de tema estuviera adentro, quedaría tapado y no se podría cambiar el
tema sin cerrar el menú primero.

---

## D21 · El trabajo experimental se committea en la rama, aunque no esté listo

**Qué:** los cambios que se están probando se commitean en la rama de trabajo
antes de decidir si se aprueban o se descartan.

**Por qué:** el historial de Git solo registra commits. Un cambio sin
commitear no queda en ningún lado: no aparece en el historial, no queda
como resto recuperable, y se pierde en cuanto se ejecuta `git checkout`
sobre el archivo. En este proyecto ya pasó una vez: una tanda de retoques
visuales se descartó sin commitear y no quedó forma de recuperarla ni de
saber qué se había probado.

**Lo que sí se descarta sin problema** es la rama entera una vez
confirmado que no se quiere. Borrar una rama ya mergeada o abandonada no
tiene riesgo.

**En la práctica:** si un cambio toma más de unos minutos, primero
`git commit -m "WIP"` en la rama, y después se sigue. Si al final se
descarta, la rama se borra y el commit va con ella.

---

# Lecciones de funcionalidades revertidas

Lo que sigue quedó escrito **aunque el código se haya revierte**. Son
errores y decisiones técnicas que costaron tiempo y que sirven para
cualquier versión que se intente después.

## L1 · `background-attachment: fixed` no sirve en el celular

**El error:** para hacer que una imagen de fondo quede fija mientras la
página baja por encima, la primera idea obvia es
`background-attachment: fixed`.

**Por qué no funciona:** la propiedad nunca se comportó bien en el
teléfono. En iOS directamente no se aplica, así que la imagen queda
pegada al elemento y se va con el scroll: el efecto no aparece y no hay
ningún aviso.

**Qué usar en su lugar:** `position: sticky` sobre un bloque de altura de
una pantalla. Es lo que hace el mismo trabajo y sí se comporta en todos
los navegadores.

---

## L2 · Un efecto de fotos a pantalla completa no va en pantallas chicas

**El error:** el efecto quedó bien en la computadora, así que se dejó
activado también en el teléfono.

**Por qué es mala idea:** en una pantalla chica, tres fotos a pantalla
completa son tres pantallas de scroll followed. En un teléfono eso se
siente eterno y marea, sobre todo en una página que ya tiene otras
secciones largas.

**Qué hacer:** el efecto se activa a partir de cierto ancho de pantalla
y por debajo se cae a fotos apiladas, sin nada pegado. La misma regla
aplica a cualquier efecto que dependa de que la persona vaya scrolleando
mucho: en el celular compensa menos.

---

## L3 · Ojo con las unidades: píxeles contra proporciones

**El error:** el avance del efecto se escribía una sola vez, en píxeles,
y las fotos lo usaban como si fuera una proporción del 0 al 1. El
resultado era un desfase de casi cien mil píxeles.

**Por qué duele:** el bug no tiraba error, no rompía nada visible, y
como la foto se movía "un poco", pasaba desapercibido en la computadora.
Solo se nota cuando el número es absurdo.

**Qué hacer:** cuando un mismo valor se lee en dos lugares, decidir de
una vez qué unidad es y no mezclarlas. Si un cálculo necesita ir del 0
al 1, que el cálculo lo produzca ya normalizado desde el principio.

---

## L4 · Una opacidad que se desvanece tiene su pico en el centro

**El error:** en la versión de fotos fijas, la opacidad estaba
calculada al revés. Cada foto brillaba cuando estaba a medio camino y se
apagaba justo cuando llenaba la pantalla. Justo al revés de lo que se
quería.

**Por qué es fácil que pase:** el número estaba bien y el cálculo también.
Lo que estaba mal era decidir que el "centro" de la foto era el punto en
el que empieza a verse, cuando en realidad es el punto en el que se ve
completa.

**Regla:** cuando algo tiene un máximo a mitad de camino, probar los dos
extremos primero y recién después el medio. Si el valor máximo coincide
con el momento en que se ve peor, el cálculo está invertido.

---
