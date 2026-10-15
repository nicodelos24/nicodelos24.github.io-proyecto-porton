# Guía de trabajo con IA

Este documento es la bitácora del proyecto: registra **qué se pidió, qué se
hizo y qué falta**. Sirve para dos cosas:

- Que cualquier persona (o cualquier asistente) sepa en qué estado está el
  sitio sin tener que leer todo el código.
- Que no se pierda lo que quedó pendiente.

Se actualiza al terminar cada tanda de trabajo.

---

## Cómo leer las marcas

| Marca | Significa |
|---|---|
| ✅ | Hecho y verificado |
| 🔄 | En este momento, a medio camino |
| ⏳ | Pedido, todavía sin empezar |
| 🧪 | Hecho, pero **falta que lo pruebes vos** |
| ⚠️ | Problema conocido, todavía sin resolver |

Cuando algo queda en 🧪 o ⚠️, abajo se explica qué mirar.

---

# Peticiones registradas

## 1. Diseño estético del sitio

> *«Me gustaría comenzar por diseñar la parte estética de la página, de una
> forma en que el código sea escalable y modular en lo posible, todo
> documentado lo más que se pueda»*

**Estado: ✅**

Se construyó el sitio completo desde cero: portada, sobre nosotros, carta con
filtros, galería, contacto con formulario de reservas y pie de página.

El código quedó separado en cuatro capas de estilos (base, utilidades,
componentes, secciones) y nueve módulos de JavaScript independientes, cada
uno protegido para que un error en uno no rompa la página.

Documentación: `README.md` y la carpeta `docs/` (4 documentos, más de 700
líneas).

---

## 2. Reproducir la animación de la idea original

> *«En la carpeta prototipo-boceto tenía más o menos la idea de cómo quería que
> sea el tipo de animación pero no supe hacerlo bien manualmente»*

**Estado: ✅**

El boceto usaba una sola animación de la barra de navegación al hacer scroll.
Esa idea se conservó y se amplió:

| Animación | Dónde | Qué hace |
|---|---|---|
| Entrada escalonada | Portada | Los textos aparecen uno por uno al terminar la carga |
| Paralaje | Fondo de la portada | La foto se mueve más lento que el scroll |
| Zoom lento (Ken Burns) | Fondo de la portada | La foto respira en bucle infinito |
| Aparecer al hacer scroll | Todas las secciones | Los bloques entran al entrar en pantalla |
| Cinta de texto | Entre secciones | Frase que se desplaza en bucle |
| Ocultar / mostrar barra | Navegación | Se esconde al bajar, aparece al subir |

Se mejoraron dos cosas del boceto: ahora respeta la preferencia de "reducir
movimiento" del sistema, y funciona aunque el visitante tenga JavaScript
desactivado.

---

## 3. Revisar el trabajo del otro agente

> *«Usé otro agente para documentar y commitear mientras ibas haciendo el
> proyecto, podrías ver que haya quedado bien»*

**Estado: ✅**

Se revisaron los 6 commits y los 4 documentos de texto.

Errores encontrados y corregidos:

- **Palabras en inglés mezcladas** en la prosa: `forgotten`, `scopeados`,
  `commented`, `Links`, `inputs`, `link`, `build`, `Smoothly scroll`.
- **Un dato falso**: la guía decía que el teléfono estaba repetido en el
  contacto y en el pie de página. El pie no lo tiene. Lo que sí está
  duplicado son los horarios.
- **Un número falso**: la arquitectura decía "seis secciones" cuando hay
  cinco.
- **Una descripción desactualizada**: un documento hablaba de archivos de
  depuración que ya se habían borrado.

---

## 4. Corregir incongruencias de idioma y arreglar el push

> *«Corrige por favor esas incongruencias de idioma cada vez que las notes por
> favor, y haz los cambios para pushear correctamente con la clave también»*

**Estado: ✅**

Se corrigió el idioma en todo el repositorio (no solo en la documentación) y se
cambió el remoto de HTTPS a SSH, que es por donde está la clave
configurada. Los pushes posteriores funcionan sin hacer nada especial.

---

## 5. Modo claro

> *«Primero podríamos comenzar con la opción de un modo claro»*

**Estado: ✅**

Se agregó cambio de tema con botón en la barra de navegación.

Decisiones que se tomaron:

- **Arranca con la preferencia del sistema.** Si tu computadora o celular
  está en modo claro, el sitio aparece en claro sin que nadie toque nada. Si
  no se eligió nunca, hay un puntito dorado abajo en el botón que
  avisa que el sitio está siguiendo al sistema.
- **El tema elegido se recuerda** entre visitas al sitio.
- **El modo claro tiene su propia paleta**, no es el oscuro invertido. El
  dorado se oscurece porque el dorado claro sobre fondo marfil quedaba en
  2,1:1 de contraste, muy por debajo del 4,5:1 que se necesita para leer.
  Con el nuevo valor queda en 4,7:1.
- **La portada y el pie se mantienen oscuros** en los dos temas: van sobre
  fotos oscuras, y con texto claro es lo único que se lee bien.

Qué mirar vos: cambiar el tema con el botón, recargar para ver si lo recuerda,
y probar en el celular que la barra del navegador cambie de color.

---

## 6. Galería más compacta en el celular

> *«Quizá la parte de galería se ve mal solo en celular que ocupa mucho
> espacio, estaría bueno que en móvil también se vea como mozaico así no hay
> que hacer tanto scroll»*

**Estado: 🧪**

El problema era real y era más grave de lo que parecía. La galería ocupaba
**más** alto en el celular que en la computadora, porque las cinco fotos se
apilaban en una sola columna.

El alto de la sección antes y después del cambio:

| Tamaño | Antes | Ahora |
|---|---|---|
| Celular (390 px) | 1206 px | 814 px |
| Tablet (768 px) | 1180 px | 698 px |
| Escritorio (1440 px) | 866 px | 766 px |

También se hizo que los pies de las fotos se vean siempre en el celular (en
una pantalla táctil no existe el hover, así que antes era imposible
descubrirlos).

Se descartó la idea de mover la galería a una página aparte: con el mosaico
compacto la portada quedó lo bastante corta y las fotos siguen estando donde
la gente las ve.

Qué mirar vos: cómo queda el mosaico en tu celular, y si las cinco fotos te
alcanzan o convendría agregar más.

---

## 7. Este documento

> *«Me gustaría pedirte que hagas un documento llamado IA_GUIDE donde
> coloques mis prompts textuales en forma de lista de tareas»*

**Estado: ✅**

---

# Pendiente para probar a mano

Ninguno de estos se puede verificar solo: hace falta un dispositivo real, o
alguien mirando la pantalla.

### Lo más importante antes de publicar

- [ ] **Revisar el celular de verdad.** El emulador no reproduce bien el
      menú desplegable ni los campos de fecha y hora. Es el punto más
      frágil del sitio.
- [ ] **Poner los datos reales**: teléfono, WhatsApp, dirección, horarios,
      precios y enlaces de redes sociales. Hoy todos son de ejemplo. La
      lista completa está en `docs/PENDIENTES.md`.
- [ ] **Probar el formulario de reservas.** Ahora sí manda la reserva por
      WhatsApp, pero mientras el número sea de ejemplo se manda al número
      equivocado. Hay que probarlo con el número real puesto.

### Del modo claro

- [ ] Cambiar el tema con el botón y recargar: ¿lo recuerda?
- [ ] Mirar el puntito dorado del botón: ¿se entiende que el sitio está
      siguiendo al sistema?
- [ ] Cambiar el tema del sistema (en el celular, el modo claro/oscuro
      automático) sin haber elegido tema a mano: ¿el sitio lo sigue?
- [ ] Revisar la portada y el pie en modo claro: ¿se leen bien?

### De la galería

- [ ] Ver el mosaico en tu celular.
- [ ] Tocar una foto: hoy no hace nada, no hay galería ampliada. ¿Querés
      que se abra grande al tocarla?

### De la navegación

- [ ] Recorrer el sitio **solo con el teclado** (con la tecla Tab).
      Especialmente el menú del celular: tiene que abrir y cerrar con
      Escape.
- [ ] Probarlo con un lector de pantalla.
- [ ] Desactivar JavaScript y ver si el contenido sigue visible.

---

## 8. Reordenar: la galería antes de los platos

> *«Esa sección de galería se muestre antes de la de los platos»*

**Estado: ↩️ revertido**

El orden de las secciones **no se restauró**: quedó el original, con la carta antes que la galería.

El orden de la página pasó a ser: portada, nosotros, galería, carta,
contacto. El menú de arriba y el del pie siguen el mismo orden.

Los fondos se alternaron para que no queden dos secciones iguales
seguidas: nosotros en el color de la página, galería en el alterno y la
carta vuelve al color de la página.

---

## 9. Ver las fotos grandes al tocarlas

> *«Y que al tocar una foto esta se expanda y se puedan ver una a una»*

**Estado: ↩️ revertido**

El visor de fotos **no se restauró**. La galería vuelve a ser el mosaico de cinco fotos.

La galería pasó de 5 a 10 fotos, y cada una abre un visor grande con:

- Contador de posición (por ejemplo `3 / 10`).
- Flechas para pasar de una a otra, y botones abajo para saltar a una.
- Pie con el nombre de la foto.
- Cierre con la X, con clic en el fondo, o con la tecla Escape.
- Las flechas del teclado ‹ y › cambian de foto.

Al abrirlo, el foco se va al botón de cerrar; al cerrarlo, vuelve a la foto
desde la que se abrió. Mientras está abierto, el fondo no se puede scrollear
y el foco no puede salirse del visor.

Qué mirar vos: tocar una foto en el celular y deslizar entre fotos.

---

## 10. Carta resumida con el menú completo a un clic

> *«Que la carta en la página muestre solo algunos platos (los que sean más
> llamativos visualmente) y luego el menú completo se vea al seleccionarlo,
> así no hay que hacer tanto scroll, no se si esa es buena idea»*

**Estado: ↩️ revertido**

La carta resumida **no se restauró**: se muestran los once platos desde el principio, sin botón de desplegar.

Es buena idea, y quedó así:

- Al entrar, solo se ven los 5 platos marcados como destacados.
- Abajo hay un botón que dice cuántos más hay: "Ver el menú completo
  (7 platos más)". El número sale solo de los datos, así que no hay que
  actualizarlo a mano.
- Al tocarlo aparecen los 12 platos y, con ellos, los filtros por categoría.
- El botón cambia a "Ver menos" y se puede volver a plegar.

**Cómo cambiar qué platos son los destacados:** en `js/data/menu.js`, los
que tienen `destacado: true`. La cantidad del botón se arma sola, así que si
agregás un plato nuevo no hay que actualizar ningún texto.

Qué mirar vos: si los 5 destacados representarían bien al restaurante, o si
convendría que sean 6 o menos.

---

## 11. Arreglar el modo claro

> *«En el modo claro no se lee bien el botón reservar mesa y la parte del
> formulario no se ve afectada por el modo claro»*

**Estado: ✅**

Eran tres problemas, todos causados por colores oscuros escritos a mano en
lugar de tokens:

1. El botón con contorno de la portada quedaba blanco sobre blanco.
2. El formulario tenía el panel, los campos y el aviso con colores fijos.
3. La columna de contacto quedaba con texto oscuro sobre la foto oscura.

También apareció un problema más de fondo: cambiar una variable de color
dentro de un bloque no cambiaba el texto de sus hijos, porque el color se
hereda ya resuelto desde el body. Ahora esos bloques declaran también el
color.

Qué mirar vos: el formulario completo en modo claro, y el botón
"Reservar mesa" de la portada.

---

## 12. Trabajar sobre una branch

> *«Me gustaría que podamos generar esto en una branch así pruebo los
> cambios antes de mergear»*

**Estado: ✅**

Los cambios se hacen en una branch y se mergean a `main` solo cuando están
aprobados. `main` es la rama que publica GitHub Pages.

Rama usada hasta ahora: `feature/modo-claro-y-galeria`.

---

## 13. Probar cambios y dar marcha atrás

> *«Actualmente reverti los cambios de esa ultima branch»*

**Estado: ✅**

Se había creado `feature/retajes-visibles` para probar unos retoques
visuales. Al no gustar el resultado, se descartaron y la rama se borró.
`main` quedó como estaba, y el sitio publicado nunca llegó a ver esos
cambios.

**Qué conviene hacer y qué no, para la próxima:**

- Descartar trabajo experimental en una rama propia **sí** es buena
  práctica: es lo que las ramas existen para.
- Lo que hay que evitar es descartar trabajo **sin commitear**. Git no
  guarda esos cambios en ningún lado: no aparecen en el historial ni
  quedan como restos recuperables. Si el trabajo tomó más de unos
  minutos, conviene commitearlo en la rama (`git commit -m "WIP"`)
  antes de decidir tirarlo. La rama se borra después, no antes.

En este caso el trabajo se perdió de forma definitiva: la rama nunca
llegó a tener un commit propio ni se había subido, así que no quedó
registro de qué se había intentado.

---

## 14. Reparto de tareas

> *«Por ahora la documentación la voy haciendo con otro agente así podés
> centrarte más que nada en los cambios, las pruebas y que todo funcione
> bien y sea estético, moderno y modular»*

**Estado: ✅**

Reparto acordado: la documentación de texto la lleva otro agente. Acá van
las tareas de código, pruebas y verificación visual.

---

## 16. Marcha atrás de todo el trabajo del tema y la galería

> *«No me gustaron estos cambios, mejor vuelve a dejar todo como estaba en
> un principio, quiero que volvamos al punto donde todavía no habiamos
> puesto el modo oscuro, pero deja estos cambios registrados en los commits
> y documentación»*

**Estado: ↩️ revertido**

El sitio volvió al commit `d41cf2d`, que es el estado anterior a todo el
trabajo del tema claro y de la galería.

Lo importante: **nada se reescribió**. Los commits siguen todos en el
historial, así que se puede ver qué se intentó, cuándo y con qué resultado.
El código se deshizo con un commit nuevo.

### Qué se descartó

| Lo que se había hecho | Commit |
|---|---|
| Modo claro, botón de tema y su paleta propia | `656b931`, `ddad2c0`, `6dac6eb` |
| Galería con mosaico compacto en celular y tablet | `656b931`, `ddad2c0` |
| Cambio del orden de las secciones | `e95ade9` |
| Visor de fotos ampliado al tocar | `e95ade9` |
| Carta resumida con el menú completo desplegable | `e95ade9` |
| Galería como pasaje de fotos del local | `bb4277f`, `1062091` |

### Qué se conservó a propósito

- **Todo el historial**, sin reescribir. Ver los commits con `git log`.
- **La documentación técnica**, marcada como revertida, porque sirve para
  cualquier versión que se intente después.
- **Los datos reales del restaurante**, que se averiguaron en el camino y
  no tienen relación con los cambios visuales:
  - Dirección: **18 de Julio 351, esquina Intendente Suárez**
  - Teléfono y WhatsApp: **099 514 133**
  - Horarios: **lunes a viernes 12:00–15:30 y 20:00–23:30. Sábado y domingo
    cerrado.**

El sitio quedó **idéntico** a como estaba en `d41cf2d`, verificado
archivo por archivo.

### Lo que quedó sin ver

La última tanda (el fondo fijo con `position: sticky`) se descartó sin
llegar a verse en un dispositivo real. Queda documentada, pero su
resultado visual nunca se evaluó.

---

## 17. Reincorporar solo el modo claro

> *«Me gustaría poder reincorporar solamente el modo claro pero dejando el
> resto tal como ahora»*

**Estado: ✅**

Después de la marcha atrás, el modo claro volvió **solo**, sin el resto de
lo que se había hecho en la misma tanda.

### Qué entró

- El módulo de tema (`js/modules/tema.js`) y su botón en la barra.
- La paleta clara de `tokens.css`, con el dorado y el vino oscurecidos para
  mantener el contraste sobre fondo claro.
- Los tokens del panel del formulario, que antes tenía el color oscuro
  escrito a mano y por eso no cambiaban con el tema.
- El arreglo para que el botón del tema y las barras del menú se vean
  sobre la foto oscura de la portada.

### Qué NO entró

| Lo que quedó afuera | Por qué |
|---|---|
| Galería en mosaico compacto | No se pidió recuperarlo |
| Cambio del orden de las secciones | No se pidió |
| Visor de fotos al tocar | No se pidió |
| Carta resumida con menú desplegable | No se pidió |
| Galería con fotos del local | No se pidió |

### Un error que se repitió

Cuando se implementó por primera vez, el arreglo de los íconos de la barra
**nunca llegó a commitearse**: quedó en una rama que se borró sin commits,
así que se perdió del todo. Cuando se pidió recuperarlo, no estaba en
ningún commit y hubo que escribirlo de nuevo.

Por eso ahora el orden es: se commitea en la rama, y recién después se
decide si se aprueba o se descarta.

---

## 18. La página de la carta

> *«Agrega la página de la carta, que los enlaces del sitio iban a buscar»*
> (commit `9ac66a7`, 9 de octubre)

**Estado: ✅**

Desde el principio la carta fue el bloque más incompleto del sitio: el archivo
`carta.html` no existía y tres enlaces del sitio apuntaban a él, así que
devolvían un 404. Ahora la página está armada con su propio encabezado, sus
filtros por categoría y su pie.

Los platos salen del mismo `js/data/menu.js` que usa la portada, así que los
precios se cambian en un solo lugar.

## 19. El formulario manda las reservas por WhatsApp

> *«Manda las reservas por WhatsApp en vez de perderlas»*
> (commit `a71ece8`, 9 de octubre)

**Estado: ✅**

Este era el defecto más grave que tenía el sitio: el formulario de reservas
decía "recibimos tu pedido" y después **descartaba los datos**. El visitante
creía que había reservado y el restaurante no se enteraba de nada.

Ahora, al enviar, se abre WhatsApp con la reserva ya escrita: nombre, fecha en
español, hora, personas, motivo, teléfono y notas. Si la persona no tiene la
aplicación instalada, el enlace abre la versión web de `wa.me`.

No hace falta servidor, base de datos ni ningún servicio que después haya que
pagar.

De paso, los datos de contacto se mudaron a `js/data/restaurante.js`, que está
separado del resto. El teléfono estaba escrito en el HTML **y** además llegaba
al formulario: con el número real había que cambiar dos lugares y con el apuro
se olvidaba uno. Los botones de redes sociales que no tengan una URL ahora
desaparecen en vez de quedar apuntando a la nada.

> ⚠️ Mientras el número de WhatsApp siga siendo de ejemplo, el formulario
> manda las reservas a un número equivocado. Está anotado en
> `docs/PENDIENTES.md` como bloqueante antes de publicar.

## 20. El texto de los platos, montado sobre la foto

> *«Monta el texto de la carta sobre la foto, como una carta de menú»*
> (commits `401aef5` a `b05fc70`, 9 de octubre)

**Estado: ✅**

Los bloques de platos ("La parrilla", "Para compartir", "Postres",
"Bebidas") dejaron de ser una lista al lado de una foto. Ahora el texto va en un
**panel de vidrio montado sobre la foto**, apoyado contra el borde de la
pantalla e invadiendo una parte de la imagen.

Detalles que se resolvieron sobre la marcha, y que conviene no perder de vista
si se toca el archivo:

- El panel tiene **dos zonas planas** y un corte seco entre ellas: la del texto,
  opaca, y la franja que pisa la foto, translúcida. A propósito **no** hay
  degradado: un degradado de verdad mezclaría las dos zonas y el corte se vería
  como un resplandor.
- El panel **no lleva borde, sombra ni desenfoque**. Los tres se probaron y los
  tres pintaban una banda clara cruzando la comida.
- El ancho del texto se acota en los hijos y no en el panel, para que el vidrio
  siga siendo una banda ancha y lo único angosto sea lo que hay que leer.
- Las fotos crecieron y llegaron de borde a borde: la foto manda, el texto se
  apoya contra el borde contrario.

## 21. Reordenar la página

> *«Reordena la página: una sola banda arriba y "La cocina" abre la galería»*
> (commit `5ea4d2b`, 10 de octubre)

**Estado: ✅**

El orden de arriba abajo quedó así:

1. Portada
2. Una sola banda con foto ("La carta"), que anticipa lo que viene
3. Nosotros, con su foto
4. Galería, que abre "La cocina" y de ahí sigue con los bloques de platos

Antes había dos bandas pegadas una arriba de otra, lo que hacía que la página
se sintiera más pesada de lo que es.

Dentro de la galería, el **mosaico** (las fotos chicas sin efecto de scroll) se
puso entre "Para empezar" y "Para terminar": es el contraste con las fotos
grandes, y ahí la vista se para un momento.

## 22. Movimiento en la galería: cuatro intentos y cuatro marcha atrás

**Estado: ↩️ revertido**

> No fue un pedido explícito, fue una búsqueda: se intentó varias veces que las
> fotos de la galería se movieran al scrollear, en vez de quedarse quietas con
> `background-attachment: fixed`.

| Lo que se probó | Commit | Por qué se volvió atrás |
|---|---|---|
| Que la foto recorra su excedente al pasar el bloque | `81762fd` | Se veía tensa |
| Más recorrido, del 40% al 52% | `8cbb46f` | Demasiado |
| Que persiga la posición en vez de pegarse al scroll | `9998cb9` | Con la rueda del mouse avanzaba a saltos |
| Que la franja se ancle más y se suavice | `9998cb9` | No llegó a probarse en un dispositivo real |

Los cuatro quedaron registrados en el historial y los cuatro se revirtieron con
un commit nuevo, sin reescribir nada.

**Lo que quedó:** `background-attachment: fixed`, como estaba. Continúa sin
funcionar en iOS ni en celular, y eso ya está anotado en
`docs/ARQUITECTURA.md`.

**Para la próxima:** si se vuelve a intentar, hay que probarlo en un teléfono de
verdad antes de darlo por bueno. El emulador no sirve para juzgar el
movimiento.

## 23. La carta como lista en pantalla angosta

> *«Adapta la carta a pantallas angostas como una lista»*
> (commit `f50738e`, 10 de octubre)

**Estado: 🧪**

En el celular la carta era una rejilla de tarjetas grandes: los filtros
ocupaban tres filas y cada plato era una caja con foto que llenaba media
pantalla, así que se veían tres o cuatro platos por vez.

Ahora, como la carta de El Fogon y como la de papel, en pantalla angosta cada
plato es una fila: miniatura chica a la izquierda, nombre, descripción y precio
a la derecha. Se ven de a diez y la carta se lee de un tirón. El filtro pasa a
una sola fila deslizable.

El distintivo "Del chef" salió de la foto (donde tapaba la miniatura) y se puso
en el cuerpo: en pantalla ancha sigue flotando sobre la foto, y en angosta se
convierte en un distintivo dorado discreto.

Qué mirar vos: cómo queda la carta en tu celular, y si la fila deslizable de los
filtros se entiende al primer uso.

---

# Tareas pendientes

## Pendientes por pedido

Nada de lo pedido quedó a medias.

## La próxima tanda

- [ ] **Seguridad y mantenimiento.** Es lo que sigue, y es la parte más
      importante que falta. Nunca se revisó.
      - [ ] Revisar dependencias y versiones de las librerías externas
            que se cargan (tipografías y el resto).
      - [ ] Decidir si se deja `innerHTML` o se pasa a construir el DOM
            sin interpolar datos.
      - [ ] Headers de seguridad que se pueden agregar en GitHub Pages.

## Pendientes de esta tanda (para probar a mano)

- [ ] Ver la carta en tu celular: si la fila deslizable de los filtros se
      entiende al primer uso, y si los platos se leen de a diez.
- [ ] Mirar la portada, la carta y el formulario en modo claro.
- [ ] Abrir la carta completa (`carta.html`) y recorrerla con el teclado.
- [ ] Recorrer la galería y la carta con el teclado.

## Pendientes de antes (siguen abiertos)

- [ ] Poner los datos reales: teléfono, dirección, horarios, precios.
- [ ] Revisar el contraste real de los textos.
- [ ] Probar el sitio en un celular de verdad.

## Bugs de diseño encontrados el 13 de octubre

Salieron de una revisión de la página completa con capturas de pantalla, en
escritorio (1440 px) y en celular (390 px). Ninguno se arregló todavía.

| Qué pasa | Dónde | Por qué |
|---|---|---|
| Los números de "Sobre nosotros" salen rotos: `+15` se ve como un `+` enorme con el `15` chico al lado, y `300+` como un `3` enorme con `00+` chico | `css/layout/about.css`, regla de la primera letra | El selector `.about__text p:first-of-type::first-letter` también toma los `<p>` de las cifras: cada uno es el único `<p>` de su `<div>`, así que es "el primero" y recibe la letra capitular |
| En el celular, el "PARA EMPEZAR" se monta sobre el título "Para compartir" | `css/layout/galeria.css` | La regla que sube el "eyebrow" a la derecha tiene más especificidad que la del celular que lo devuelve a su lugar |
| La barra de navegación de `carta.html` es invisible: logo, enlaces, botón de reservar y botón de tema | `carta.html` | La barra es transparente y de color claro, pensado para ir sobre la foto oscura de la portada. En la carta la página es clara: el texto claro queda sobre fondo claro |
| El logo del pie de página casi no se ve | `css/layout/footer.css` | El logo es oscuro y se mezcla con `screen` sobre el fondo vino del pie |

---

# Ideas anotadas, sin compromiso

Ninguna es necesaria para publicar. Quedan anotadas por si aparece tiempo.

- Menú del día que se actualice sin tocar código.
- Datos estructurados de Google (para que el restaurante salga con horarios
  y ubicación en los resultados de búsqueda).
- Mapa con la ubicación del local.
- Versión en inglés.

---

# Cómo se trabaja este documento

Al terminar cada tanda de trabajo:

1. Se agrega la petición nueva al final, con el texto original.
2. Se actualiza el estado de las peticiones anteriores si algo cambió.
3. Se corrigen las marcas de 🧪 que hayas verificado.
4. Si se encontró un problema sin resolver, se anota en ⚠️ con la explicación.

El texto de las peticiones se deja lo más fiel posible a como se escribió,
para que quede claro qué se pidió originalmente y no solo lo que terminó
saliendo.