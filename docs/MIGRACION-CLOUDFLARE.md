# Mudar la publicación a Cloudflare Pages

Plan para dejar de usar GitHub Pages y poder poner el repositorio en privado,
sin que el sitio quede sin publicar en ningún momento.

Se escribió en el orden en que hay que hacerlo. **Hacerlo al revés deja el sitio
caído.**

---

## Por qué hay que mudarse

GitHub Pages, en el plan gratuito, **solo publica repositorios públicos**. Para
publicar un repositorio privado hace falta GitHub Pro, que es de pago.

O sea: mientras GitHub Pages publique este sitio, el código tiene que ser
público. Y con el código público también quedan exposed los precios de la
carta, el número de teléfono y los horarios, que son datos del negocio.

Cloudflare Pages resuelve las dos cosas a la vez: publica el sitio desde un
repositorio **privado** y no cobra nada.

### Por qué no Netlify

Se evaluó y se descartó. El plan gratuito de Netlify da un presupuesto mensual
pequeño que se consume rápido: cuando se acaba, el sitio deja de actualizarse
hasta el mes siguiente. Para un sitio que seactualiza pocas veces puede
alcanzar, pero es depender de un servicio que ya cambió sus límites
varias veces. Cloudflare da 500 publicaciones por mes y ancho de banda sin
límite, que para este sitio es de sobra.

---

## El orden

| Paso | Qué pasa | ¿El sitio sigue en pie? |
|---|---|---|
| 1 | Crear el proyecto en Cloudflare conectado al repo | Sí: GitHub Pages sigue publicando |
| 2 | Verificar que el sitio nuevo funciona | Sí: hay dos copias vivas |
| 3. Apagar GitHub Pages | Recién acá deja de actualizar | Sí: Cloudflare ya publica |
| 4 | Poner el repositorio en privado | Sí: Cloudflare ya publica |

El paso 2 es el que importa. Cloudflare va a publicar el sitio aunque el
repositorio sea público, así que durante ese tramo hay **dos sitios vivos**. Eso
es lo que permite verificar todo antes de cortar nada.

---

## Antes de empezar: borrar lo que no se usa

Cloudflare publica **todo** lo que hay en el repositorio, no solo lo que el
sitio usa. Y ahora mismo hay dos carpetas que son copias viejas:

| Carpeta | Qué es | Tamaño |
|---|---|---|
| `images/` | Copia anterior de las fotos, ya reemplazada por `assets/img/` | ~2,9 MB |
| `prototipo-boceto/` | La primera versión del sitio, guardada como referencia | ~3 MB |

Las dos quedarían **públicas** en Cloudflare, porque el repositorio es el
material de la publicación. Si `prototipo-boceto/` ya no sirve para comparar,
lo razonable es borrarla antes de migrar.

Esto es opcional: la mudanza funciona igual con las carpetas ahí.

---

## Paso 1 · Crear el proyecto en Cloudflare

1. Entrar a <https://dash.cloudflare.com> y crear una cuenta (gratis).
2. Menú **Workers & Pages** → **Create application** → **Pages** →
   **Connect to Git**.
3. Autorizar a GitHub y elegir la cuenta `nicodelos24`.
4. Elegir el repositorio `nicodelos24.github.io-proyecto-porton`.

### La parte que hay que completar bien

Cloudflare va a preguntar tres cosas. Como el sitio **no tiene paso de
compilación**, las tres se dejan vacías o como van:

| Campo | Valor | Por qué |
|---|---|---|
| Production branch | `main` | La rama que hoy publica |
| Build command | **vacío** | No hay nada que compilar: el sitio ya está listo |
| Build output directory | `/` (la raíz) | Los archivos van desde la raíz: `index.html`, `css/`, `js/` |

Si se deja un build command como `npm run build`, la publicación falla: este
proyecto no tiene `package.json` (ver `docs/DECISIONES.md`, D1).

4. **Save and Deploy**. La primera publicación tarda uno o dos minutos.

---

## Paso 2 · Verificar que el sitio nuevo funciona

Cloudflare da una dirección de prueba con una cadena al final:

```
https://<nombre>.pages.dev
```

Recorrerla con esta lista. **Es la misma lista de pruebas manuales que ya está
en `IA_GUIDE.md`**, y vale la pena hacerla entera esta vez:

- [ ] Carga la portada y las cinco secciones
- [ ] La carta se arma sola y aparecen los platos con sus precios
- [ ] Los filtros por categoría funcionan
- [ ] El botón de tema claro/oscuro cambia los colores
- [ ] El botón "Reservar mesa" baja a la sección de contacto
- [ ] El formulario valida y muestra su mensaje
- [ ] El botón "volver arriba" aparece al scrollear
- [ ] Se ve bien en el celular
- [ ] Desactivando JavaScript, el contenido sigue visible

También conviene probarlo en una **ventana de incógnito**: así se ve el sitio
como lo vería alguien que nunca eligió un tema.

Si algo falla, la causa más probable es que falte la ruta en alguno de los tres
campos de configuración, o que Cloudflare esté tomando el directorio equivocado
como salida.

---

## Paso 3 · Apagar GitHub Pages

Recién con el paso 2 verificado:

**En GitHub:** el repositorio → **Settings** → **Pages** → **Source** →
seleccionar **None**.

Ahí GitHub deja de publicar. **Cloudflare sigue publicando**: a partir de
este momento el sitio se actualiza por Cloudflare y nunca más por GitHub.

### Opcional: cambiar el remoto

El remoto `origin` apunta a GitHub, y **eso hay que dejarlo así**. El
repositorio sigue siendo el lugar donde vive el código y donde se hacen los
commits; lo que cambia es quién lo publica. A GitHub le corresponde:

```
git@github.com:nicodelos24/nicodelos24.github.io-proyecto-porton.git
```

Cloudflare no necesita un remoto distinto: ya está leyendo del mismo
repositorio.

---

## Paso 4 · Poner el repositorio en privado

Ya se revisó el historial completo y **no hay ningún secreto en él**: ni `.env`,
ni claves, ni certificados. Así que esto se puede hacer directamente, sin
reescribir la historia.

En GitHub: el repositorio → **Settings** → **General** → **Danger Zone** →
**Change repository visibility** → **Change to private**.

La URL `nicodelos24.github.io` deja de funcionar, y es correcto: ese
direccionamiento era de GitHub Pages. El sitio pasa a vivir en
`pages.dev`.

---

## Dirección propia (opcional, más adelante)

Cloudflare permite usar un dominio propio **gratis**, sin pagar. Cuando el
resto esté andando:

1. Registrar el dominio (o comprar uno, ~10 USD al año).
2. En Cloudflare: **Pages** → el proyecto → **Custom domains** → **Set up a
   custom domain**.
3. Cloudflare da los servidores de nombres para poner en el registrador.

Ahí el sitio pasa a `www.tuporton.com.uy` y **el certificado HTTPS se emite
solo y se renueva solo**. Hoy GitHub Pages lo daba únicamente para
`usuario.github.io`, sin HTTPS.

---

## Si algo sale mal

**Volver atrás es barato.** Nada de esto rompe el código: son ajustes de
publicación. Si Cloudflare da problemas:

1. En Cloudflare, desconectar el repositorio o borrar el proyecto.
2. En GitHub, **Settings** → **Pages** → volver a poner **Deploy from a
   branch** → rama `main`.
3. El sitio vuelve a funcionar con la dirección `nicodelos24.github.io`, tal
   como estaba.

El repositorio, los commits y el código no se tocan en ninguno de los dos
sentidos.

---

## Lo que esto **no** resuelve

Cloudflare Pages sigue siendo **sitio estático**. Sigue sin poder ejecutar el
backend de las reservas: eso hay que resolverlo aparte, más adelante.

Cuando llegue ese momento, las opciones son un servicio de formularios externo
(Formspree y similares) o funciones propias. La decisión queda anotada en
`docs/PENDIENTES.md`, y las claves de ese servicio van en un `.env`, que ya
está protegido en `.gitignore`.