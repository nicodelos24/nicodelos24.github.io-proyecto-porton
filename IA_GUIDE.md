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

## 1. Diseño aesthetico del sitio

> *«Me gustaría comenzar por diseñar la parte estética de la página, de una
> forma en que el código sea escalable y modular en lo posible, todo
> documentado lo más que se pueda»*

**Estado: ✅**

Se construyó el sitio completo desde cero: portada, sobre nosotros, carta con
filtros, galería, contacto con formulario de reservas y pie de página.

El código quedó separado en cuatro capas de estilos (base, utilidades,
componentes, secciones) y ocho módulos de JavaScript independientes, cada uno
protegido para que un error en uno no rompa la página.

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
cambiando el remoto de HTTPS a SSH, que es por donde está la clave
configurada. Los pushes posteriores funcionan sin hacer nada especial.

---

## 5. Modo claro

> *«Primero podríamos comenzar con la opción de un modo claro»*

**Estado: 🧪**

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

El alto de la sección antes y después de el cambio:

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
- [ ] **Poner los datos reales**: teléfono, dirección, horarios, precios y
      enlaces de redes sociales. Hoy todos son de ejemplo. La lista
      completa está en `docs/PENDIENTES.md`.
- [ ] **Probar el formulario de reservas.** Ahora no envía nada a ningún
      lado: valida y muestra un mensaje, pero los datos se descartan.

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

**Estado: ✅**

El orden de la página pasó a ser: portada, nosotros, galería, carta,
contacto. El menú de arriba y el del pie siguen el mismo orden.

Los fondos se alternaron para que no queden dos secciones iguales
seguidas: nosotros en el color de la página, galería en el alterno y la
carta vuelven al color de la página.

---

## 9. Ver las fotos grandes al tocarlas

> *«Y que al tocar una foto esta se expanda y se puedan ver una a una»*

**Estado: 🧪**

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

**Estado: 🧪**

Es buena idea, y quedó así:

- Al entrar, solo se ven los 5 platos marcados como destacados.
- Abajo hay un botón que dice cuántos más hay (por ejemplo, "Ver el menú
  completo (6 platos más)").
- Al tocarlo aparecen los 11 platos y, con ellos, los filtros por categoría.
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

**Estado: 🧪**

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

## 13. Reparto de tareas

> *«Por ahora la documentación la voy haciendo con otro agente así podés
> centrarte más que nada en los cambios, las pruebas y que todo funcione
> bien y sea estético, moderno y modular»*

**Estado: ✅**

Reparto acordado: la documentación de texto la lleva otro agente. Acá van
las tareas de código, pruebas y verificación visual.

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
      - [ ] Qué se hace con los datos del formulario de reservas, que
            hoy no se envían a ningún lado y se descartan en el navegador.

## Pendientes de esta tanda (para probar a mano)

- [ ] Tocar una foto de la galería en el celular y deslizar entre fotos.
- [ ] Mirar la portada, la carta y el formulario en modo claro.
- [ ] Ver si los 5 platos destacados representan bien al restaurante.
- [ ] Recorrer la galería y la carta con el teclado.

## Pendientes de antes (siguen abiertos)

- [ ] Poner los datos reales: teléfono, dirección, horarios, precios.
- [ ] Implementar el envío del formulario de reservas.
- [ ] Revisar el contraste real de los textos.
- [ ] Probar el sitio en un celular de verdad.

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