# Investigación: El Otro Portón (Colonia del Sacramento, Uruguay)

**Fecha de consulta de todas las fuentes: 19 de noviembre de 2026.**
**Método:** `web_search` + `web_read` y peticiones HTTP directas (`curl`) para verificar enlaces e imágenes. **No se usó el Chrome real** (estaba en turno de otro agente).
**Objetivo:** reemplazar datos de ejemplo del sitio por datos reales y verificables.

> Regla aplicada: todo lo que abajo dice "CONFIRMADO" tiene al menos una fuente consultada con su URL. Lo que dice "DUDOSO" tiene fuente pero es contradictorio o es inferencia. Lo que no se pudo verificar va al final.

---

## 1. Nombre real y frases textuales para microcopia

### CONFIRMADO

- **Nombre oficial:** `El Otro Portón` (también escrito `EL OTRO PORTON` en mayúsculas en Google Maps y directorios). Fuente: [Coloniaya, 26/10/2024](https://www.coloniaya.com/noticia.php?id=75879), [RestaurantGuru](https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento), [Top-Rated.Online](https://www.top-rated.online/cities/Colonia+del+Sacramento/place/p/15892608/El+Otro+Port%C3%B3n).
- **Frases textuales extraídas de fuentes públicas** (útiles para microcopia, copiadas literalmente):
  - "**Una noche diferente para disfrutar.**" — título de un reel público de Instagram vinculado a @elotro.porton ([Instagram reel DeNVUlupYbn](https://www.instagram.com/reel/DeNVUlupYbn/), encontrado por búsqueda; ver nota abajo sobre accceso a Instagram).
  - "**Mantenemos la llama de la historia y la ...**" — texto de un post público de @elotro.porton (truncado en el snippet del buscador; **no se pudo completar** porque Instagram exige JavaScript y el Chrome real no estaba disponible). Fuente: [Instagram post Ctl85JpAITF](https://www.instagram.com/p/Ctl85JpAITF/).
  - "**Descubre nuevos sabores de la cocina internacional cómodamente en El Otro Portón**" y "**cocina internacional**" — descripción de la ficha de RestaurantGuru ([ficha](https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento)).
  - "**Un lugar emblemático en la ciudad de Colonia del Sacramento**", "**cocina tradicional uruguaya**", "**ambiente acogedor y cálido**" — descripciones del directorio [RestaurantesUruguay](https://restaurantesuruguay.com/colonia/florencio-sanchez/el-otro-porton/). Ojo: este directorio parece texto generado/editorial, no una cita del local; usar como inspiración, **no como frase oficial del negocio**.
  - "**El restaurante que ya cumplió su primer año**" — [Coloniaya, 26/10/2024](https://www.coloniaya.com/noticia.php?id=75879).
- **Categoría según fichas:** Internacional / Asado (Barbacoa) / Contemporánea. Fuente: [RestaurantGuru EN](https://restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento).
- **Propuesta experiencial documentada:** "Live Art": artistas plásticos locales pintan en vivo mientras se cena, con música de DJ Cuervo. Comenzó con el tatuador "Tortu" y siguió con Tefi Franco. Fuente: [Coloniaya, 26/10/2024](https://www.coloniaya.com/noticia.php?id=75879) y [Coloniaya, 29/10/2024](https://www.coloniaya.com/noticia.php?id=75895).
- **Detalles de cortesía mencionados en reseñas (no confirmados por el local):** copa de bienvenida, fainá con cebolla al tannat y queso Colonia, panera con pan casero, grisines y alioli. Fuente: [RestaurantesUruguay](https://restaurantesuruguay.com/colonia/florencio-sanchez/el-otro-porton/).

### DUDOSO / NO USAR COMO ESLOGAN OFICIAL
- No se logró leer el texto completo del perfil de Instagram (biography) ni de los posts: las páginas devuelven HTML sin texto útil sin JavaScript. Los eslóganes de arriba son **títulos/snippets indexados por buscadores**, no una transcripción verificada del perfil. Para usar "Mantenemos la llama de la historia…" como frase textual oficial hace falta completar esa lectura con el Chrome del proyecto.

---

## 2. Menú real, platos y precios

### CONFIRMADO (con matices)

- **Existe un menú público subido por usuarios** a RestaurantGuru, alojado en Google Drive, con fecha **"hace 10 meses"** (~enero 2026). Fuente: [RestaurantGuru – Carta](https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento/menu).
- **El enlace al menú está caído:** el link de RestaurantGuru (`https://es.restaurantguru.com/link/m115529086`) redirige a `https://drive.google.com/file/d/11YKWCD4pHxlxeZmvNrAdTfkwlRelOlDa/view?usp=drive_link` y **devuelve HTTP 404** (verificado con la vista de archivo y con `uc?export=download`). **No se pudo leer ni un plato ni un precio de ese menú.**
- **Rango de precios por persona publicado:** **UYU 800 – UYU 1,400** (ficha de [RestaurantGuru ES](https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento)). Es un rango agregado de la ficha, **no una carta de platos**.
- **Platos mencionados por clientes/fuentes** (nombres reales que aparecen, sin precios):
  - Entrada: **fainá con cebolla al tannat y queso Colonia** ([Wanderlog](https://wanderlog.com/place/details/8405129/el-otro-port%C3%B3n), [RestaurantesUruguay](https://restaurantesuruguay.com/colonia/florencio-sanchez/el-otro-porton/)).
  - Carnes: **ojo de bife / chuletón**, **entraña**, **asado**, **matambrito**, **mollejas cremosas**, **costillar**, **milanesa fugazzeta** ([Wanderlog](https://wanderlog.com/place/details/8405129/el-otro-port%C3%B3n), [RestaurantGuru reseñas](https://restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento), [RestaurantesUruguay](https://restaurantesuruguay.com/colonia/florencio-sanchez/el-otro-porton/), [PENDIENTES.md del repo](docs/PENDIENTES.md)).
  - Guarniciones: **papa al roquefort**, **puré con toque ahumado y queso azul**, **papas fritas** ([Wanderlog](https://wanderlog.com/place/details/8405129/el-otro-port%C3%B3n), [RestaurantGuru](https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento)).
  - Otros: **risotto**, **pescado**, **ensalada de pera grillada**, **limonada de menta**, **tortellinis**, **salmón**, **postre "volcán"**, **panqueque de dulce de leche con helado**, **mousse de chocolate** ([RestaurantGuru](https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento), [Wanderlog](https://wanderlog.com/place/details/8405129/el-otro-port%C3%B3n), [RestaurantesUruguay](https://restaurantesuruguay.com/colonia/florencio-sanchez/el-otro-porton/)).
  - Bebidas: **gin de elaboración propia** y cócteles ([Wanderlog](https://wanderlog.com/place/details/8405129/el-otro-port%C3%B3n)).
- **Precios concretos POR PERSONA citados en reseñas de Google** (no son precios de plato, pero son datos reales de ticket):
  - "$1,600–1,800" ([Yamila Melgarejo, hace un mes, vía RestaurantGuru](https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento)).
  - "$2,000+" ([Gia B, hace 7 días, vía RestaurantGuru](https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento)).
  - "$1,000–1,200" ([Demet Turkay, 6 meses, vía RestaurantGuru EN](https://restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento)).
  - "$800–1,000" ([Becca Marsh, 7 meses, vía RestaurantGuru EN](https://restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento)).

### CONCLUSIÓN IMPORTANTE
**No hay precios públicos de platos verificables hoy.** La única carta pública está en un Drive que da 404. Los datos de ejemplo del sitio (**$210 empanadas, $1450 parrillada**) **no deben reemplazarse por otros inventados**: lo correcto es publicar el **rango por persona UYU 800–1.400** (con fuente) y pedirle al local la carta actualizada en PDF/imagen. Los precios por persona de reseñas son contradictorios entre sí (de $800 a $2.000+) y corresponden a fechas distintas.

---

## 3. Datos de contacto confirmados

| Dato | Valor | Estado | Fuente |
|---|---|---|---|
| Teléfono / WhatsApp | `099 514 133` / `+598 99 514 133` | CONFIRMADO (múltiples fuentes) | [Coloniaya 26/10/2024](https://www.coloniaya.com/noticia.php?id=75879), [RestaurantGuru](https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento), [Top-Rated.Online](https://www.top-rated.online/cities/Colonia+del+Sacramento/place/p/15892608/El+Otro+Port%C3%B3n), [RestaurantesUruguay](https://restaurantesuruguay.com/colonia/florencio-sanchez/el-otro-porton/) |
| Link WhatsApp | `https://wa.me/59899514133` | CONFIRMADO (HTTP 200; redirige a `api.whatsapp.com/send/?phone=59899514133`) | verificación directa por curl, 19/11/2026 |
| Instagram oficial | `https://www.instagram.com/elotro.porton/` (`@elotro.porton`) | CONFIRMADO (HTTP 200; llamado "instagram oficial" por Coloniaya; es el "website" en las fichas) | [Coloniaya](https://www.coloniaya.com/noticia.php?id=75895), [RestaurantesUruguay](https://restaurantesuruguay.com/colonia/florencio-sanchez/el-otro-porton/), [Top-Rated.Online](https://www.top-rated.online/cities/Colonia+del+Sacramento/place/p/15892608/El+Otro+Port%C3%B3n), [Wanderlog](https://wanderlog.com/place/details/8405129/el-otro-port%C3%B3n) |
| Dirección | 18 de Julio 351, esq. Intendente Suárez, 70000 Colonia del Sacramento | CONFIRMADO | [Coloniaya](https://www.coloniaya.com/noticia.php?id=75879) (esquina), [RestaurantGuru](https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento), [Top-Rated.Online](https://www.top-rated.online/cities/Colonia+del+Sacramento/place/p/15892608/El+Otro+Port%C3%B3n) |
| Google Maps (place_id) | `ChIJe-4vSecTo5UR3kzsPv9uNfU` → `https://www.google.com/maps/place/?q=place_id:ChIJe-4vSecTo5UR3kzsPv9uNfU` | CONFIRMADO (HTTP 200) | [Wanderlog](https://wanderlog.com/place/details/8405129/el-otro-port%C3%B3n), [RestaurantesUruguay](https://restaurantesuruguay.com/colonia/florencio-sanchez/el-otro-porton/) y verificación directa |
| Rating Google | 4.6/5 | CONFIRMADO (cantidad de reseñas varía por fecha: 376 en Top-Rated actualizado 04/10/2025; 562 en RestaurantGuru; 568 en Wanderlog) | [Top-Rated.Online](https://www.top-rated.online/cities/Colonia+del+Sacramento/place/p/15892608/El+Otro+Port%C3%B3n), [RestaurantGuru](https://restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento), [Wanderlog](https://wanderlog.com/place/details/8405129/el-otro-port%C3%B3n) |
| Facebook | **NO CONFIRMADO** | `facebook.com/elotro.porton` devuelve HTTP 400. El único Facebook encontrado es de **otro local** ("Parrillada El Portón", [post que recomienda ir a El Otro Portón](https://www.facebook.com/parrilladaelporton/photos/estamos-cerrados-por-reformaste-recomendamos-ir-a-el-otro-port%C3%B3na-1-cuadra-en-in/827080132759581/)). No usar como link del sitio. | búsqueda + verificación directa |
| Email | **NO CONFIRMADO** | Ninguna fuente pública consultada publica un email del local. | — |

### Horarios — ⚠️ CONTRADICCIÓN CON EL DATO QUE TENÍAMOS
Cuatro fuentes independientes coinciden en que **abre sábado y domingo**:
- Lunes, jueves, viernes, sábado y domingo: **12:00–15:30 y 20:00–23:30**.
- **Martes y miércoles: cerrado.**

Fuentes: [RestaurantGuru ES](https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento), [Top-Rated.Online](https://www.top-rated.online/cities/Colonia+del+Sacramento/place/p/15892608/El+Otro+Port%C3%B3n), [Wanderlog](https://wanderlog.com/place/details/8405129/el-otro-port%C3%B3n), [RestaurantesUruguay](https://restaurantesuruguay.com/colonia/florencio-sanchez/el-otro-porton/).

El dato de `docs/PENDIENTES.md` ("lun-vie, sáb-dom cerrado") **no coincide con ninguna fuente actual**. Recomendación: antes de publicar horarios, confirmar con el local por WhatsApp; el consenso de las fichas es fuerte pero pueden estar desactualizadas.

---

## 4. Fotos reales del local, parrilla y platos

### URLs públicas verificadas (HTTP 200, `image/jpeg`, descargables)
Todas de [RestaurantGuru – El Otro Portón](https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento) (la ficha indica **32 fotos**). Verificadas una por una el 19/11/2026:

| Contenido (según el nombre de archivo de la fuente) | URL | Estado |
|---|---|---|
| Carne / steak | `https://img02.restaurantguru.com/c127-Restaurant-El-Otro-Porton-steak.jpg` | 200, 82 KB |
| Interior | `https://img02.restaurantguru.com/c222-El-Otro-Porton-Colonia-Del-Sacramento-interior.jpg` | 200, 68 KB |
| Diseño / ambiente | `https://img02.restaurantguru.com/c377-Restaurant-El-Otro-Porton-design.jpg` | presente en la ficha (no verificada individualmente) |
| Comida | `https://img02.restaurantguru.com/c394-El-Otro-Porton-Colonia-Del-Sacramento-food.jpg` | 200, 76 KB |
| Platos | `https://img02.restaurantguru.com/c73e-Restaurant-El-Otro-Porton-food.jpg` | presente en la ficha |
| Platos | `https://img02.restaurantguru.com/c8bc-Restaurant-El-Otro-Porton-dishes.jpg` | presente en la ficha |
| Comidas | `https://img02.restaurantguru.com/c9c1-Restaurant-El-Otro-Porton-meals.jpg` | presente en la ficha |
| Mousse de chocolate | `https://img02.restaurantguru.com/ce13-Restaurant-El-Otro-Porton-chocolate-mousse.jpg` | 200, 63 KB |
| Interior | `https://img02.restaurantguru.com/ceed-Restaurant-El-Otro-Porton-interior.jpg` | 200, 73 KB |

**No hay una foto identificada específicamente como "parrilla" en los nombres de archivo.** La ficha de RestaurantesUruguay describe "la cocina y la parrilla a la vista", pero no da una URL de imagen. Fuente: [RestaurantesUruguay](https://restaurantesuruguay.com/colonia/florencio-sanchez/el-otro-porton/).

### Cómo conseguir la original (importante: NO pasar links directos de Instagram)
Los links de Instagram (`instagram.com/p/...`) **expiran y no sirven como `src` de una web**. Procedimiento correcto:
1. Abrir el perfil oficial `https://www.instagram.com/elotro.porton/` en el Chrome real del proyecto (cuando Quin lo habilite) o en el celular logueado.
2. Elegir la foto → "…" → **Descargar** (Instagram guarda una copia comprimida ~1080 px, aceptable para maquetar).
3. Para la **original sin comprimir**: pedirla al local por WhatsApp (`https://wa.me/59899514133`), ya que son ellos quienes tienen el archivo original. Es lo que recomienda `docs/PENDIENTES.md`.
4. Guardar las imágenes en `images/` del repo con nombres propios. **No referenciar la URL de Instagram ni de RestaurantGuru en el HTML**: bajarlas y servirlas localmente (las URLs de RestaurantGuru pueden tener copyright; la ficha misma avisa "Las imágenes pueden estar sujetas a derechos de autor"). Para uso comercial, pedir autorización al local.

---

## 5. Año de fundación / antigüedad real

### CONFIRMADO (con inferencia acotada)
- Tres artículos de [Coloniaya](https://coloniaya.com/) ([26/10/2024, id 75879](https://www.coloniaya.com/noticia.php?id=75879), [29/10/2024, id 75895](https://www.coloniaya.com/noticia.php?id=75895), [29/10/2024, id 75941](https://www.coloniaya.com/noticia.php?id=75941)) dicen literalmente: **"El restaurante El Otro Portón, que ya cumplió su primer año..."**.
- **Inferencia:** la apertura fue **aprox. octubre de 2023** (o antes). Al 19/11/2026 eso implica **~3 años de antigüedad**, no "+15 años".
- **Dato a favor:** el local es presentado como "otro" respecto de **Parrillada El Portón** (otro establecimiento, [TripAdvisor de Parrillada El Portón](https://www.tripadvisor.com/Restaurant_Review-g298066-d1908296-Reviews-Parrillada_El_Porton-Colonia_del_Sacramento_Colonia_Department.html), [Facebook que recomienda ir a El Otro Portón a una cuadra](https://www.facebook.com/parrilladaelporton/photos/estamos-cerrados-por-reformaste-recomendamos-ir-a-el-otro-port%C3%B3na-1-cuadra-en-in/827080132759581/)). La historia de "la llama" puede referirse a esa relación, pero **no está confirmado**.

### RECOMENDACIÓN PARA LA MICROCOPIA
- Reemplazar **"+15 años asando"** por algo verificable, p. ej.: **"Desde 2023"** o **"Una noche diferente para disfrutar"**.
- Reemplazar **"4 tipos de corte"** y **"300+ mesas por semana"** (números de ejemplo según `docs/PENDIENTES.md`) por texto sin cifras, o pedir los números reales al local.

---

## Datos que NO se pudieron confirmar

1. **Precios de platos individuales.** La única carta pública (Drive subido ~enero 2026) da 404. No hay manera de obtener empanadas/parrillada u otros precios reales con las fuentes consultadas.
2. **Eslogan oficial completo.** Los posts de Instagram no son legibles sin JavaScript/Chrome; solo se obtuvieron snippets de buscador. Falta la biography del perfil y el texto completo de "Mantenemos la llama de la historia y la ...".
3. **Facebook oficial.** No se encontró; el `facebook.com/elotro.porton` probado devuelve 400 y el Facebook hallado pertenece a otro local.
4. **Email de contacto.** Ninguna fuente pública lo publica.
5. **Fecha exacta de fundación.** Solo se infiere "~octubre 2023" de la frase "ya cumplió su primer año" en prensa local (oct/2024). No hay fecha de inauguración publicada.
6. **Foto identificada de la parrilla.** Hay fotos de platos, carnes e interior, pero ninguna etiquetada explícitamente como parrilla. Tampoco se verificó la propiedad/licencia de las fotos de RestaurantGuru para uso comercial.
7. **Horarios "oficiales" al día de hoy.** Las fichas coinciden (incluye sábado y domingo), pero contradicen el dato previo del repo; sin confirmación directa del local queda como "consenso de fichas, probablemente correcto".
8. **Instagram: biografía, cantidad de seguidores y originales de fotos.** La página carga pero el texto útil no está en el HTML sin JS.

---

## Fuentes consultadas (URL + fecha)

| # | Fuente | URL | Consultada |
|---|---|---|---|
| 1 | Coloniaya — "El Otro Portón viene con una propuesta…" (26/10/2024) | https://www.coloniaya.com/noticia.php?id=75879 | 19/11/2026 |
| 2 | Coloniaya — "Live Art…" (29/10/2024) | https://www.coloniaya.com/noticia.php?id=75895 | 19/11/2026 |
| 3 | Coloniaya — "Live Art…" (29/10/2024) | https://www.coloniaya.com/noticia.php?id=75941 | 19/11/2026 |
| 4 | RestaurantGuru ES — ficha y reseñas | https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento | 19/11/2026 |
| 5 | RestaurantGuru EN — ficha y reseñas | https://restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento | 19/11/2026 |
| 6 | RestaurantGuru — carta (Drive caído) | https://es.restaurantguru.com/EL-OTRO-PORTON-Colonia-Del-Sacramento/menu | 19/11/2026 |
| 7 | Google Drive del menú (404) | https://drive.google.com/file/d/11YKWCD4pHxlxeZmvNrAdTfkwlRelOlDa/view | 19/11/2026 |
| 8 | RestaurantesUruguay — ficha | https://restaurantesuruguay.com/colonia/florencio-sanchez/el-otro-porton/ | 19/11/2026 |
| 9 | Top-Rated.Online — ficha (actualizada 04/10/2025) | https://www.top-rated.online/cities/Colonia+del+Sacramento/place/p/15892608/El+Otro+Port%C3%B3n | 19/11/2026 |
| 10 | Wanderlog — ficha y reseñas | https://wanderlog.com/place/details/8405129/el-otro-port%C3%B3n | 19/11/2026 |
| 11 | Instagram @elotro.porton (perfil; sin texto útil sin JS) | https://www.instagram.com/elotro.porton/ | 19/11/2026 |
| 12 | Instagram post "Mantenemos la llama…" (snippet) | https://www.instagram.com/p/Ctl85JpAITF/ | 19/11/2026 |
| 13 | Instagram reel "Una noche diferente para disfrutar" (snippet) | https://www.instagram.com/reel/DeNVUlupYbn/ | 19/11/2026 |
| 14 | Google Maps place_id ChIJe-4vSecTo5UR3kzsPv9uNfU | https://www.google.com/maps/place/?q=place_id:ChIJe-4vSecTo5UR3kzsPv9uNfU | 19/11/2026 |
| 15 | WhatsApp verificado | https://wa.me/59899514133 | 19/11/2026 |
| 16 | TripAdvisor — Parrillada El Portón (local distinto) | https://www.tripadvisor.com/Restaurant_Review-g298066-d1908296-Reviews-Parrillada_El_Porton-Colonia_del_Sacramento_Colonia_Department.html | 19/11/2026 |
| 17 | Facebook — Parrillada El Portón (recomienda El Otro Portón) | https://www.facebook.com/parrilladaelporton/photos/estamos-cerrados-por-reformaste-recomendamos-ir-a-el-otro-port%C3%B3na-1-cuadra-en-in/827080132759581/ | 19/11/2026 |
| 18 | RestaurantGuru — fotos (verificación HTTP de cada URL) | https://img02.restaurantguru.com/c127-Restaurant-El-Otro-Porton-steak.jpg (y resto de la tabla) | 19/11/2026 |
| 19 | repo — docs/PENDIENTES.md (datos de ejemplo a reemplazar) | docs/PENDIENTES.md | 19/11/2026 |
