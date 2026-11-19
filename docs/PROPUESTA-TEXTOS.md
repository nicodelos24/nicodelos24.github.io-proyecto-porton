# Propuesta de textos nuevos — El Otro Portón

**Estado:** propuesta para revisión de Nico. Nada está aplicado al sitio todavía. Zeno ejecuta después de que Nico decida lo que figura en §5.

**Fuente:** `docs/CORPUS-TEXTOS-REALES.md` (frases literales de @elotro.porton y del PDF oficial `otro_menu25.pdf`) y `docs/INVESTIGACION-EL-OTRO-PORTON.md`. Las frases entre comillas «…» son textuales del corpus; al lado, entre paréntesis, va la procedencia. El resto son frases puente mínimas, en voseo, para coser los textos reales —no datos nuevos.

**Regla aplicada:** cada idea fuerte aparece una sola vez. «Fuego» vive en la historia y en la parrilla; «1984» vive en el hero; «Cocina de fuegos» vive en la bajada de la carta; «Vení a cenar…» vive en el cierre; «cálido/acogedor/emblemático/internacional» no aparecen (son de directorio, el corpus lo advierte).

---

## 1. Mapa de redundancias

| Idea repetida | Dónde está hoy | Decisión |
|---|---|---|
| **«Ambiente cálido» / «buena compañía»** | Hero (`index.html:142-144`), marquee (`:179-182`, duplicado en dos tracks), about (`:221-223`) | **Quitar de los tres.** Reemplazar por frases del local. El marquee pasa a ser eslóganes propios (`#somosfuego`), no adjetivos. |
| **«Corazón de Colonia»** | Meta description (`:7`), about (`:221`), footer (`:608`), además del tagline del nav (`:62`) | **Conservar una sola**: el tagline del nav, que es identidad. Meta y about pasan a «Cocina de fuegos»; footer pasa a la dirección concreta. |
| **«Parrillada / a la parrilla»** | Hero, eyebrow del hero, marquee, h2 de about, banda, galería (dos veces), carta, meta, footer | **Descomprimir.** «A la parrilla» se usa en el título de la carta y en el h2 de about; el resto se muda a «fuego», «parrilla» o «cocina de fuegos». Bajar de 8 apariciones a 3-4. |
| **«Fuego» / «fuego, paciencia y ganas»** | About (`:217-220`), stats (`:232`), banda (`:253`) | **Unificar en una frase real** en about («Mantenemos la llama…», «el fuego como insignia»). Los stats dejan de repetir «Fuego» como valor suelto. |
| **«Cada plato… en su punto / no se sirve apurado»** vs **«la parrilla se adapta al pedido»** | Galería (`:302-304`) y carta (`:102-104`) | **Conservar la de galería** (es copia propia del sitio, no suena a agencia) y recortarla. La de carta se reemplaza por la frase real de la parrilla y criolla/chimichurri. |
| **Horarios** | Contacto (`index.html:531-534`) y footer de index (`:618-620`) y carta (`:169-171`) | **Unificar en una sola redacción** en los tres bloques con el formato del corpus: «Jueves a lunes · 12:00–15:30 y 20:00–23:30». Hoy dicen «Lunes y jueves a domingo», que se entiende mal. |
| **Dirección** | Contacto (`index.html:516`) y corpus | **Unificar** a la forma que usa el local: «Intendente Suárez esquina 18 de Julio · 18 de Julio 351». |
| **«Precios en pesos uruguayos»** | Carta (`:102`, `:122`) y galería (`:489`) | **Conservar una sola**, en la nota al pie de `carta.html`. Quitar del lead y del bloque de bebidas. |
| **Marquee duplicado en dos tracks** | `index.html:177-190` | Es necesario para el bucle: **no es error**, solo hay que cambiar el texto de los cuatro ítems en ambos tracks a la vez. |
| **«Hecho con cariño en Colonia del Sacramento»** | Footer de ambas páginas | **Quitar**: ya hay otra mención a Colonia en el tagline y en la dirección. Reemplazar por `#somosfuego`. |

---

## 2. Copia nueva, campo por campo

### `index.html` — cabecera y metadatos

| Ubicación | Texto propuesto (listo para pegar) |
|---|---|
| `<title>` `:6` | `El Otro Portón · Cocina de fuegos en Colonia del Sacramento` |
| `<meta name="description">` `:7` | `El Otro Portón, cocina de fuegos en Colonia del Sacramento. Parrillada con infiernillo, carnes, criolla y chimichurri de la casa. Jueves a lunes, reservá tu mesa.` |
| `og:title` `:10` | `El Otro Portón · Cocina de fuegos` |
| `og:description` `:11` | `«Somos tradicionales con un toque de innovación». Parrillada en Colonia del Sacramento. Reservá tu mesa.` (IG `DDkYp4nP8HI`) |
| `preloader__text` `:46` | `Encendiendo el fuego` (antes «Encendiendo la parrilla»; evita repetir «parrilla» y calza con `#somosfuego`) |

### `index.html` — hero

| Ubicación | Texto propuesto |
|---|---|
| `eyebrow` `:128` | `Cocina de fuegos · Colonia del Sacramento` (frase «Cocina de fuegos», IG `CyE5ImiLv56`) |
| `hero__subtitle` `:141-143` | `Somos tradicionales con un toque de innovación. Una parrilla con infiernillo, una cocina a la vista. Te esperamos.` (IG `DDkYp4nP8HI` + `C0t6dnQrgAe`) |
| CTA secundario `:150` | `Reservá tu mesa` (antes «Reservar mesa»; frase literal del IG del 19/11/2026: «Reservá tu mesa: 099 514 133») |
| `hero__facts` `:153-164` | **Fact 1:** label `Desde` / value `14 de enero de 1984` (contratapa del PDF oficial). **Fact 2:** label `Cocina` / value `Cocina de fuegos` (IG `CyE5ImiLv56`). **Fact 3:** label `Reservas` / value `099 514 133` (IG, múltiples posts). *Se cae el fact «Ubicación»: ya está en el eyebrow y en contacto.* |
| `scroll-hint` `:167` | `Bajá` (antes «Scroll») |

> Nota de cuerpo: la frase «Somos fuego desde 1984» es PRENSA + contratapa; si Nico quiere el eslogan exacto como H1 o subtítulo, ver §5 (decisión pendiente). Yo la dejé para el footer/about, no en el hero, para no adelantar dos frases fuertes seguidas.

### `index.html` — marquee

Cuatro ítems, **repetir idénticos en los dos tracks** (`:179-182` y `:186-189`):

1. `#somosfuego`
2. `Cocina de fuegos`
3. `Infiernillo`
4. `Sabores locales`

(«#somosfuego», «Cocina de fuegos», «infiernillo» y «sabores locales» salen del corpus. Antes: «Carnes a la parrilla / Ambiente cálido / Colonia del Sacramento / Buena compañía».)

### `index.html` — sobre nosotros

| Ubicación | Texto propuesto |
|---|---|
| `eyebrow` `:207` | `Nuestra historia` |
| `<h2>` `:208-209` | `Mantenemos la llama de la historia y la familia,` + `<span class="hl">con una mirada innovadora</span>` (IG `Ctl85JpAITF`, con el espacio corregido después de la coma) |
| `<p class="about__intro">` `:210-213` | `Somos la otra casa de la familia de El Portón. Acá seguimos con las mismas ganas de siempre, pero con nuevas ideas y el fuego como insignia 🔥.` (IG `Ctl85JpAITF`; la primera frase sintetiza los posts Cyt60GvLygL y CyiydHeAfPH del corpus §3 —si Nico prefiere no afirmar el vínculo familiar, ver §5) |
| `<p>` `:214-216` | `Buscamos que cada plato sea protagonista, con productos locales y de estación. La parrilla es a la vista y el infiernillo está siempre prendido.` (frase SNIPPET confirmada también en LocalUruguay/TripAdvisor + IG `C0t6dnQrgAe`) |
| `about__stats` `:218-230` | **1:** value `1984` / label `Fuego desde entonces` (PDF). **2:** value `Live Art` / label `Artistas en vivo` (Coloniaya). **3:** value `Infiernillo` / label `Parrilla a la vista` (IG `C0t6dnQrgAe`). *Se cae «Colonia / Nuestra ciudad»: ya está en el eyebrow del hero y en el tagline del nav.* |

> Se cae el párrafo «Nuestro local está en el corazón de Colonia… a pasos de la plaza de armas»: «corazón de Colonia» estaba en tres lugares y «plaza de armas» no está confirmado como dato del local. La dirección exacta va en contacto.

### `index.html` — banda de transición

| Ubicación | Texto propuesto |
|---|---|
| `eyebrow` `:252` | `La carta` *(se conserva)* |
| `<h2>` `:253-254` | `Una Cocina de Fuegos con <em>sabores locales</em>` (IG `DDw9iT9xeD_`) |
| botón `:255-256` | `Ver la carta →` (antes «Ver los platos»; para no duplicar «Galería» con el menú) |

### `index.html` — galería

| Ubicación | Texto propuesto |
|---|---|
| `<h2 class="section-title">` `:267` | `El local y <span class="hl">lo que sale del fuego</span>` |
| `eyebrow` de la cocina `:299` | `Cocina de fuegos` *(antes «La cocina»)* |
| texto central `:300-304` | `Cada plato sale de la parrilla cuando está en su punto. Las empanadas se amasan a mano. Nada se sirve apurado.` (versión recortada de la copia actual; se conserva una sola vez y se quita «las tortillas llevan su tiempo», que no está en el corpus y sí en la carta real como «tortilla de papa con alioli») |
| `eyebrow` bloque parrilla `:325` | `EL FUEGO NOS INSPIRA` (IG `C0t6dnQrgAe`) |
| `h3` bloque parrilla `:326` | `Nuestra parrilla` (antes «La parrilla») |
| `eyebrow` bloque entradas `:365` | `Para empezar` *(se conserva)* |
| `h3` bloque entradas `:366` | `Para compartir` *(se conserva)* |
| `eyebrow` bloque postres `:438` | `El toque final` (IG `DbeSIivpfS8`) |
| `h3` bloque postres `:439` | `Postres` *(se conserva)* |
| `eyebrow` bloque bebidas `:485` | `El ritual` (IG `DbT_BaeiWAR`) |
| `h3` bloque bebidas `:486` | `Para beber` (antes «Bebidas») |
| nota `:488-490` | `La carta cambia con la estación. Consultanos por los platos del día.` (antes «Precios en pesos uruguayos. Menú de ejemplo…»: el sitio ya no es ejemplo y «precios en pesos uruguayos» va en `carta.html`)

**Figcaption / alt que conviene ajustar** (son texto visible para lectores de pantalla; no inventan datos, solo describen lo que ya se ve):
- `:288` alt `Empanadas de carne a cuchillo, recién hechas` → `Empanadas de carne a cuchillo con salsa criolla` (nombre del PDF).
- `:296` figcaption `Tortilla con alioli` → `Tortilla de papa con alioli` (nombre del PDF).
- `:344` aria-label `Costillar de carnes asándose sobre la parrilla` → `Carnes asándose en la parrilla con infiernillo` (el costillar no figura en el PDF).
- `:449` aria-label `El Negro, postre frío de cacao con chocolate amargo` → `El Negro, postre en homenaje a Rubén «El Negro» Martínez` (fragmentos del IG `CyYg027raTs`; descripción de cacao/chocolate no está en el corpus).

### `index.html` — contacto

| Ubicación | Texto propuesto |
|---|---|
| `eyebrow` `:509` | `Reservas` |
| `<h2>` `:510` | `Reservá <span class="hl">tu mesa</span>` *(se conserva)* |
| `<p class="lead">` `:511-513` | `Vení a cenar con nosotros. Siempre tenemos algo para sorprenderte. Para grupos grandes, coordiná con antelación.` (IG `C-v4Z_GPoul`) |
| label dirección `:517` | `Dónde estamos` |
| valor dirección `:518` | `Intendente Suárez esquina 18 de Julio · 18 de Julio 351, Colonia del Sacramento` (el local escribe «Intendente Suárez esquina 18 de Julio»; el número 351 está en la ficha confirmada) |
| valor teléfono `:528` | `+598 99 514 133` *(se conserva; el `href="tel:+59899514133"` queda igual)* |
| valor horarios `:535-537` | `Jueves a lunes · 12:00–15:30 y 20:00–23:30`<br>`Cerrado: martes y miércoles` (bio oficial de IG y corpus §3) |
| placeholder `contacto` `:558` | `+598 99 ...` (antes mostraba el número del local como ejemplo, que puede confundir: parece que ya está cargado) |
| botón `form__submit` `:580-581` | `Enviar reserva →` *(se conserva)* |

### `index.html` — footer

| Ubicación | Texto propuesto |
|---|---|
| `card-text` `:608-609` | `«Somos fuego desde 1984». Parrillada en Colonia del Sacramento.` (PRENSA + contratapa del PDF; ver §5) |
| horarios `:618-620` | Igual que en contacto: `Jueves a lunes · 12:00–15:30 y 20:00–23:30` / `Cerrado: martes y miércoles` |
| copyright `:624` | `© <span id="year">2026</span> El Otro Portón` (se cae «Todos los derechos reservados», que no aporta) |
| `footer__made` `:625` | `#somosfuego · #elotroporton` (hashtags propios del corpus) |

### `carta.html`

| Ubicación | Texto propuesto |
|---|---|
| `<title>` `:6` | `La carta · El Otro Portón · Cocina de fuegos en Colonia` |
| `meta description` `:7` | `Carnes de nuestra parrilla con infiernillo, criolla y chimichurri de la casa. Platos de estación en El Otro Portón, Colonia del Sacramento.` |
| `og:title` `:10` | `La carta · El Otro Portón` *(se conserva)* |
| `og:description` `:11` | `«Nuestra parrilla destaca por las carnes, acompañadas de criolla y chimichurri especiales de la casa».` (IG `DDkZLnUvKbV`) |
| `eyebrow` `:94` | `Cocina de fuegos` |
| `<h1>` `:95-96` | `Todo lo que sale de <span class="hl">nuestra parrilla</span>` |
| `<p class="lead">` `:97-99` | `«Una parrilla con infiernillo, una cocina a la vista. Disfrutamos de crear tu experiencia 🔥».` (IG `C0t6dnQrgAe`; se conserva el emoji porque es literal del local) |
| `carta__note` `:122-124` | `Precios en pesos uruguayos. Pueden cambiar según la estación; consultanos por las opciones sin gluten.` (se cae «Todos nuestros platos tienen gluten», que no está confirmado y espanta al celíaco sin aportar) |
| `card-text` del footer `:145-146` | Igual que en index: `«Somos fuego desde 1984». Parrillada en Colonia del Sacramento.` |
| horarios footer `:169-171` | Igual que en index: `Jueves a lunes · 12:00–15:30 y 20:00–23:30` / `Cerrado: martes y miércoles` |
| copyright / `footer__made` `:177-178` | Igual que en index |

### `js/data/restaurante.js`

El objeto ya tiene datos reales correctos. **Propuesta:** agregar un campo `eslogan` con la frase confirmada por el PDF, para que Zeno lo use si quiere centralizar el texto del pie en los dos HTML:

```js
eslogan: "Somos fuego desde 1984",
```

Junto a `nombre` y `ciudad`, con el comentario: `// Contratapa del menú oficial: "fuego / DESDE 14 DE ENERO DE 1984". La forma "Somos fuego desde 1984" aparece en prensa (Clarín, 2024).` No tocar `whatsapp`, `telefonoLegible`, `instagram` (ya verificados).

---

## 3. Propuesta para `js/data/menu.js` (platos reales del PDF)

**Regla aplicada:** solo platos del PDF oficial `otro_menu25.pdf` **que tengan foto existente en `assets/img/`**. Precios tomados del PDF; **sujetos a confirmación de vigencia (§5)**. Se conserva la forma del objeto: `{ nombre, descripcion, precio, imagen, destacado }`.

### `entradas` (label: `Entradas`)

```js
{
  nombre: "Empanada de carne a cuchillo",
  descripcion: "Con salsa criolla.",
  precio: 160,
  imagen: "empanada-de-carne-a-cuchillo.jpg",
  destacado: true,
},
{
  nombre: "Fainá con cebolla al tannat y queso Colonia",
  descripcion: "",
  precio: 220,
  imagen: "2.jpg", // ver nota: foto a confirmar
},
{
  nombre: "Tortilla de papa con alioli",
  descripcion: "",
  precio: 370,
  imagen: "tortilla-con-alioli.jpg",
},
{
  nombre: "Lengua a la vinagreta",
  descripcion: "Fresca, tierna, con el sabor casero que nos caracteriza.",
  precio: 370,
  imagen: "8.jpg", // ver nota: foto a confirmar
  destacado: true,
},
```

> Descripción de la lengua: frase literal del IG `DRqhFG_CS0k`. El PDF la nombra «lengua a la vinagreta $370»; el corpus advierte que la web antes decía «Length a la vinagreta» (typo corregido).

### `parrilla` (label: `Parrillada`)

```js
{
  nombre: "Ojo de bife",
  descripcion: "400 g. Como lo preferís, jugoso o a punto.",
  precio: 890,
  imagen: "6.jpg",
  destacado: true,
},
{
  nombre: "Entraña fina",
  descripcion: "400 g.",
  precio: 790,
  imagen: "7.jpg",
},
{
  nombre: "Entrecot",
  descripcion: "400 g.",
  precio: 890,
  imagen: "asad.jpg",
},
{
  nombre: "Asado de tira",
  descripcion: "500 g.",
  precio: 640,
  imagen: "asad.jpg", // misma foto que entrecot: usar solo si no hay otra
},
{
  nombre: "Mollejas",
  descripcion: "400 g, a la parrilla.",
  precio: 590,
  imagen: "mollejas-con-cremoso.jpg", // ojo: la foto es "molleja cremosa" ($430), no la de parrilla
},
```

> «Como lo preferís, jugoso o a punto» es del IG `DDkYw1EPKAF`. Se cae la falsa «Parrillada El Otro Portón $1450» (no existe en el PDF). El plato «chorizo $260» también es real pero no tiene foto propia verificable; queda en la lista de afuera.

### `especiales` (label: `Especiales`)

```js
{
  nombre: "Raviolones de ossobuco braseado",
  descripcion: "Con salsa pomodoro, olivas y parmesano.",
  precio: 790,
  imagen: "tortellinis-de-espinaca.jpg", // foto de pasta ajena; usar solo si Nico la acepta
},
{
  nombre: "Cheese-Burger",
  descripcion: "Pan casero, triple cheddar y pepinos encurtidos.",
  precio: 790,
  imagen: "port.jpg", // ver nota: foto a confirmar
  destacado: true,
},
```

> Descripción de la cheese-burger del IG `DQctI1zDNSD`; la de raviolones del IG `Cyb8liKrjxW`. **«El Negro» y «Calabaza asada» NO figuran en el PDF**: «El Negro» está confirmado por IG como postre-homenaje (`CyYg027raTs`) pero sin precio conocido; «Calabaza asada con queso y frutos secos» es invención del menú de ejemplo y debe salir. Si Nico quiere conservar «El Negro» en la carta, hace falta el precio real (§5).

### `bebidas` (label: `Bebidas`)

```js
{
  nombre: "Limonada de la casa",
  descripcion: "Clásica, de menta y jengibre o maracuyada.",
  precio: 250,
  imagen: "images.jpg", // 225×225: reemplazar por foto real antes de publicar
},
{
  nombre: "Gin tonic",
  descripcion: "El ritual empieza antes del primer brindis.",
  precio: 350,
  imagen: "images_1.jpg", // 201×251: reemplazar por foto real
  destacado: true,
},
```

> Precio de limonada $250–280 según variedad (PDF); puse $250, el de la clásica. «El ritual empieza antes del primer brindis» es del IG `DbT_BaeiWAR`.

### Platos reales del PDF **sin foto** → quedan FUERA de la propuesta

Si Zeno los deja fuera, la carta no mostrará una imagen genérica en su lugar:

- Platitos: morcilla al hierro $390 · croquetas de bondiola y provolone $390 · molleja cremosa $430 · provolone clásico $420 / relleno $520 · carpaccio de zucchinis $420.
- Parrilla: chorizo $260 · morcilla $260 · salchicha parrillera $370 · pata muslo deshuesada $820 · secreto ibérico $820 · salmón $1.200.
- Guarniciones $340; cocina: ensalada de estación $690, ensalada de peras asadas $690, milanesas $650–770, tortellini de ricota y espinaca $770, entraña cremosa $820, menú infantil $460.
- Postres: alfajor de chocolate blanco y vermouth rosso $230, flan de café mixto $320, panqueque de dulce de leche $370, pavlova cítrica $390, volcán de chocolate $390, bocha helado artesanal $130.
- Bebidas: maracuyada, jugo de naranja, cervezas, Aperol Spritz $390, Negroni $420, sidra bruta $350, copa de vino $300/$450, descorche $500.

**Advertencia sobre fotos reutilizadas:** `2.jpg`, `8.jpg`, `port.jpg`, `6.jpg`, `7.jpg` y `asad.jpg` son archivos sin nombre descriptivo; varios pueden no corresponder al plato que se les asigna. La propuesta los usa donde la foto existente es **verosímil**, pero Nico debe confirmar cada una antes de publicar. `images.jpg` e `images_1.jpg` son 225×225 y 201×251: **no publicar**, pedir originales.

---

## 4. Cautelas: qué está confirmado y qué no

**Confirmado (se puede publicar tal cual):**
- Teléfono/WhatsApp `+598 99 514 133`, dirección `18 de Julio 351 esq. Intendente Suárez`, Instagram `@elotro.porton`.
- Horario «Jueves a lunes de 12 a 15:30 y de 20 a 23:30» (bio oficial de Instagram y corpus §3; coincide con PENDIENTES.md confirmado por Nico).
- Todas las frases marcadas arriba con procedencia IG (caption leído completo en Chrome) o PDF.
- La fecha `14 de enero de 1984` (contratapa del menú oficial).
- Los precios **tal como figuran en el PDF `otro_menu25.pdf`**.

**Depende de que Nico / el local confirmen:**
1. **Vigencia de los precios del PDF.** Es un menú 2025; pueden haber cambiado en 2026. **Bloqueante para publicar la carta.**
2. **La frase «Somos fuego desde 1984»** es PRENSA (Clarín/Bodegas de Colonia, vía snippet) + contratapa del PDF. El PDF dice «fuego / DESDE 14 DE ENERO DE 1984», no la frase completa. Si se usa en el footer conviene ponerla entre comillas y con la fecha, tal como propuse; ver §5.
3. **El vínculo familiar con Parrillada El Portón** en el primer párrafo del about. Está en posts de @elotro.porton de 2023 y en el corpus §3, pero Nico puede preferir no mencionarlo (Parrillada El Portón es otro local). Si se cae, reemplazar el párrafo por: `Mantenemos las mismas ganas de siempre, pero con nuevas ideas y el fuego como insignia 🔥.` (IG `Ctl85JpAITF`).
4. **«Buscamos que cada plato sea protagonista…»** es SNIPPET (no se pudo abrir el post completo), aunque aparece también en dos fichas públicas. Si Nico quiere evitarla, reemplazar por «Combinamos productos locales en nuestra cocina de fuegos» (IG `DDkYp4nP8HI`, CONFIRMADA).
5. **«El Negro» sin precio**: no se publica en la carta hasta que el local dé el precio.
6. **Fotos con nombre genérico** (`2.jpg`, `6.jpg`, `7.jpg`, `8.jpg`, `port.jpg`, `asad.jpg`, `images.jpg`, `images_1.jpg`): verificar que correspondan al plato o cambiarlas.

**No usar** (son de directorios, no del local): «emblemático», «acogedor y cálido», «cocina internacional», «cocina tradicional uruguaya», «lugar emblemático en Colonia», «descubre nuevos sabores…».

---

## 5. Decisiones que Nico debe tomar antes de que Zeno aplique

1. **¿Publicar los precios del PDF 2025?** Sin el OK del local, la carta queda con datos viejos (pero reales, no inventados). Alternativa: dejar la carta sin precios hasta confirmar.
2. **¿Eslogan principal?** Propuse `«Somos tradicionales con un toque de innovación»` en el hero y `«Somos fuego desde 1984»` en el pie. Si quiere el de 1984 de titular, hay que mover el otro (no van juntos).
3. **¿Mencionar a Parrillada El Portón y a Rubén «El Negro» Martínez en la historia?** Está documentado, pero es información de la familia, no del local nuevo.
4. **¿Mostrar el emoji 🔥 en la copia de la web?** Es literal del local; lo dejé en dos lugares (hero/about y lead de carta). Si quiere una web más sobria, se quitan sin cambiar el sentido.
5. **¿Fotos genéricas se cambian ahora o en una etapa aparte?** Esta propuesta no toca imágenes; solo advierte cuáles no sirven.
