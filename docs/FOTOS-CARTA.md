# Fotos para la carta remodelada — El Otro Portón

**Fecha de consulta: 19/11/2026.** Prototipo: Nico acepta marcas de agua, pero "cuanto más acertado mejor".

**Regla usada:** priorizar fotos REALES del local que ya están en `assets/img/` → luego stock de Wikimedia Commons con URL directa `.jpg` → nada inventado.

## Resumen para Quin

- **De los 13 platos, 8 tienen foto real del local** en `assets/img/` (empanada, tortilla, ojo de bife, entraña, entrecot, asado de tira, mollejas, raviolones).
- **5 necesitan stock**: Fainá, Lengua a la vinagreta, Cheese-Burger, Limonada de la casa y Gin tonic. Las URLs directas están en la tabla y todas responden 200.
- **Las 2 "bebidas chicas" (`images.jpg` 225×225 y `images_1.jpg` 201×251) NO son bebidas**: son fotos de platos del local con marca de agua "EL OTRO PORTÓN GASTRONOMÍA". Se reemplazan con las URLs de limonada y gin tonic de abajo.
- Todas las URLs de Wikimedia fueron verificadas con `curl -I`: devuelven **200 `image/jpeg`**. No descargué nada; Zeno puede bajarlas con `curl -L -o ...`.

## Cómo reconocer las fotos del local

Las fotos profesionales del local comparten: vajilla de barro/piedra sobre fondo oscuro, delantal vaquero con la placa de cuero "EL OTRO", iluminación cálida de restaurante, y en las minaturas la marca de agua "EL OTRO PORTÓN GASTRONOMÍA". Coinciden con los captions de @elotro.porton documentados en `docs/CORPUS-TEXTOS-REALES.md` (por ejemplo `tortellinis-de-espinaca.jpg` muestra el plato con el delantal oficial).

---

## Tabla por plato

| # | Plato | (a) Imagen local candidata en `assets/img/` | (b) URL directa si no hay / alternativa | (c) Grado de acierto | (d) Marca de agua |
|---|---|---|---|---|---|
| 1 | **Empanada de carne a cuchillo** | ✅ **`empanada-de-carne-a-cuchillo.jpg`** (o `empanada-de-carne-a-cuchillo_1.jpg`, idéntico) — empanada frita sobre cuenco de barro con piedras y salsa de tomate/pimiento. Estilo exacto del local. `cabecera.jpg` es otra empanada real con salsa criolla (mejor para la descripción "con salsa criolla") y `caption_14.jpg` muestra empanadas con salsa ponzu. | — | **10/10** — es la foto del propio plato del menú. | No (las fotos grandes del local no llevan marca; sí la llevan las miniaturas). |
| 2 | **Fainá con cebolla al tannat y queso Colonia** | ⚠️ No hay foto de este plato. `chorizo-morcilla-queso.jpg` tiene queso pero es embutidos, no fainá. | `https://upload.wikimedia.org/wikipedia/commons/2/25/Fain%C3%A1_argentina.jpg` | **7/10** — fainá argentina real, pero sin cebolla al tannat ni queso Colonia. Mejor que un genérico. | No (CC BY-SA; atribución en `docs`). |
| 3 | **Tortilla de papa con alioli** | ✅ **`tortilla-con-alioli.jpg`** — tortilla de papa con alioli, foto profesional del local. | — | **10/10** — foto del plato exacto. | No. |
| 4 | **Lengua a la vinagreta** | ❌ No hay foto local. | `https://upload.wikimedia.org/wikipedia/commons/9/93/Lengua_a_la_vinagreta.jpg` (alternativa recortada: `https://upload.wikimedia.org/wikipedia/commons/8/8e/Lengua_a_la_vinagreta_%28cropped%29.jpg`; otra: `https://upload.wikimedia.org/wikipedia/commons/f/fb/Ensaladas_de_Argentina_%28Lengua_a_la_vinagreta%29.jpg`) | **9/10** — archivo argentino con el nombre exacto del plato. | No (CC BY-SA / revisar licencia en la página del archivo). |
| 5 | **Ojo de bife** | ✅ **`caption_11.jpg`** — ojo de bife real del local saliendo a la mesa (foto de cliente/Ig). Alternativa: `asad.jpg` (corte a la parrilla). | Alternativa stock si se quiere foto de estudio: `https://upload.wikimedia.org/wikipedia/commons/a/af/Ribeye_steak%2C_hot_off_the_grill.jpg` | **10/10** con la del local; 8/10 con el stock. | Sí en la del local (marca de agua "EL OTRO PORTÓN GASTRONOMÍA"). No en el stock. |
| 6 | **Entraña fina** | ✅ **`7.jpg`** — corte a la parrilla sj (foto de cliente del local, con parrilla al fondo). | Alternativa: `https://upload.wikimedia.org/wikipedia/commons/6/62/Skirt_steak_grilled_arrachera_style.jpg` | **8/10** — corte de parrilla real del local; no 100% discernible entraña vs. entrecot. Stock: 9/10 (entraña "arrachera" a la parrilla). | No. |
| 7 | **Entrecot** | ✅ **`2.jpg`** — entrecot/asado de tira a la parrilla sobre tabla, foto de cliente del local. | Alternativa: `https://upload.wikimedia.org/wikipedia/commons/a/af/Ribeye_steak%2C_hot_off_the_grill.jpg` | **8/10** — corte real de la parrilla del local, algo genérico. | No. |
| 8 | **Asado de tira** | ✅ **`2.jpg`** — es claramente asado de tira (tiras con hueso a la parrilla). Mejor que usarla para entrecot. | — | **9/10** — plato real del local. | No. |
| 9 | **Mollejas** | ✅ **`mollejas-con-cremoso.jpg`** — mollejas con cremoso, plato del menú. Eligible también `caption_10.jpg` (guarnición de puré/salsas). | Alternativa: `https://upload.wikimedia.org/wikipedia/commons/f/f3/Kalbsbries_Weisses_Br%C3%A4uhaus.jpg` (mollejas de ternera, foto de cocina) | **10/10** con la del local; 7/10 con el stock (estilo cocina alemana, no parrilla). | No en la del local. |
| 10 | **Raviolones de ossobuco braseado** | ✅ **`caption_4.jpg`** — raviolones con salsa pomodoro, olivas y parmesano; coincide con el caption literal del local "Raviolones de osobuco braseados al tannat con salsa pomodoro, olivas y parmesano". | — | **10/10** — foto del plato exacto. | Sí (marca de agua del local, aceptable en prototipo). |
| 11 | **Cheese-Burger** | ❌ **No hay foto de burger en `assets/img/`** (`caption_5.jpg` es un plato, no una burger). | `https://upload.wikimedia.org/wikipedia/commons/4/4d/Cheeseburger.jpg` (burger con queso, dominio público, 2700×1800) | **8/10** — cheese-burger genérico; el local hace "triple cheddar + pepinos encurtidos + pan casero", que el stock no muestra. Si se quiere 100% real, pedir a Zeno que baje el frame del reel de Burger Night (`https://www.instagram.com/reel/DeNVUlupYbn/`), pero requiere login o guardar el video. | No (Public Domain, NCI/NIH). |
| 12 | **Limonada de la casa** | ❌ `images.jpg` (225×225) **no es limonada**: es un plato con salsa roja y marca de agua. Reemplazo urgente. | `https://upload.wikimedia.org/wikipedia/commons/d/da/Fresh_lemonade_and_lemons.jpg` (jarra de limonada con limones, 1883×2507). Alternativa más pequeña: `https://upload.wikimedia.org/wikipedia/commons/2/28/LemonadeJuly2006.JPG` (vaso con hielo, 332×356). | **8/10** — limonada casera real; no es la del local. | No (CC BY-SA 4.0). |
| 13 | **Gin tonic** | ❌ `images_1.jpg` (201×251) **no es gin tonic**: es un plato con copa de vino al fondo y marca de agua. Reemplazo urgente. | `https://upload.wikimedia.org/wikipedia/commons/c/c2/Gin-tonic.jpg` (vaso corto con hielo y tónica, 1100×841). Alternativas: `https://upload.wikimedia.org/wikipedia/commons/d/d4/Gin_and_Tonic_with_ingredients.jpg` (highball con lima, 2215×1896) y `https://upload.wikimedia.org/wikipedia/commons/3/33/Gin_and_tonic_with_lemon.jpg` (2671×2448). | **8/10** — gin tonic real; el local lo sirve con SUR 34 y decoración propia (post `DbT_BaeiWAR`), no reproducible con stock. | No (CC BY-SA 4.0 / 3.0 / 2.0 según archivo). |

### Detalle del conteo (para evitar dudas)
- **8 platos con foto real del local en `assets/img/`**: empanada (`empanada-de-carne-a-cuchillo.jpg`), tortilla (`tortilla-con-alioli.jpg`), ojo de bife (`caption_11.jpg`), entraña (`7.jpg`), entrecot (`2.jpg`), asado de tira (`2.jpg` — misma foto, es claramente tira con hueso), mollejas (`mollejas-con-cremoso.jpg`), raviolones (`caption_4.jpg`).
- **5 platos con stock**: fainá, lengua, cheese-burger, limonada, gin tonic.

Si querés **no repetir `2.jpg`**, usá la URL de ribeye de Wikimedia para entrecot y dejá `2.jpg` solo para asado de tira (entonces quedan 7 locales + 6 stock).

Para el prototipo, la combinación recomendada es: **fotos del local para 8 platos + 5 stock**, con `2.jpg` asignada a asado de tira y `7.jpg` a entraña/entrecot.

---

## Fotos locales adicionales útiles (no en la lista de 13)

- `port.jpg` y `caption_3.jpg`: plato de autor (dup.
- `ensalada-de-estacion.jpg`: ensalada de estación (foto profesional del local).
- `tortellinis-de-espinaca.jpg`: tortellinis con el delantal "EL OTRO" (foto profesional).
- `chorizo-morcilla-queso.jpg`, `calabaza-asada-con-queso.jpg`, `el-negro-inspirado-en.jpg`, `caption_5.jpg`, `caption_12.jpg`, `caption_13.jpg`: otros platos/postres del local.
- `6.jpg`, `8.jpg`: fotos de cliente (ambiente/carta), no aptas para plato individual.
- `cabecera.jpg`: empanada con salsa criolla (buena alternativa para el #1).
- `caption_10.jpg`: guarniciones (puré, criolla/salsas), compatible con el #9.
- `el_otro_porton_sin_fondo.png`, `PORTON_logo.png`, `log.jpg`, `log.svg`: logo, no foto.

## Notas para Zeno (descarga)

```bash
# Ejemplo de una URL; las demás están en la tabla
curl -L --fail -o assets/img/limonada-casa.jpg \
  "https://upload.wikimedia.org/wikipedia/commons/d/da/Fresh_lemonade_and_lemons.jpg"
```

- Las URLs con `%C3%A1`, `%2C`, `%28` van **codificadas** tal cual; `curl` las respeta.
- Para reducir peso se puede pedir un thumbnail cambiando el prefijo: `https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Fresh_lemonade_and_lemons.jpg/960px-Fresh_lemonade_and_lemons.jpg` (mismo patrón para las demás, con `upload.wikimedia.org/wikipedia/commons/thumb/<a>/<ab>/<nombre>/<ancho>px-<nombre>`).
- Licencias: las de Wikimedia requieren atribución (CC BY-SA) salvo `Cheeseburger.jpg` (dominio público). En un prototipo interno no es bloqueante, pero si se publica, agregar crédito en el pie.
- No descargué ninguna imagen ni modifiqué `assets/img/`. No hice commit ni push.

## Fuentes consultadas (19/11/2026)

- Fotos locales: `assets/img/` del repo (inspección visual con `file_read` de 24 imágenes).
- Contexto del local: `docs/INVESTIGACION-EL-OTRO-PORTON.md`, `docs/CORPUS-TEXTOS-REALES.md` y carta oficial `https://drive.google.com/file/d/1cA-Y7F3xWwrOzCwAnPLiXSdXkpsZqOn6/view`.
- Wikimedia Commons: páginas de archivo y API `https://commons.wikimedia.org/w/api.php?action=query&generator=search&...` para: `Ribeye steak grilled`, `Skirt steak grilled`, `sweetbreads dish`, `lengua vinagreta`, `fainá`, `Natural lemonade`, `Gin tonic`, `Cheeseburger`.
- Verificación de URLs: `curl -I` sobre las 8 URLs principales → todas `200 image/jpeg`.
