# tufisioterapeuta.net — Web estática para GitHub Pages

Reconstrucción 100% estática (HTML + CSS + JS puros) de **tufisioterapeuta.net** (Consulta de Fisioterapia y Osteopatía Germán Peláez Racaj), sin WordPress, sin cookies de seguimiento y sin elementos del Kit Digital.

## Estructura del proyecto

- `index.html` — Inicio (`/`)
- `la-consulta/index.html` — La consulta y tarifas (`/la-consulta/`)
- `german-pelaez-racaj/index.html` — Sobre mí (`/german-pelaez-racaj/`)
- `tratamientos/index.html` — Tratamientos (`/tratamientos/`)
- `fisioterapia/index.html` — Fisioterapia (`/fisioterapia/`)
- `osteopatia/index.html` — Osteopatía (`/osteopatia/`)
- `terapia-craneosacral/index.html` — Terapia craneosacral (`/terapia-craneosacral/`)
- `osteopatia-pediatrica/index.html` — Osteopatía pediátrica (`/osteopatia-pediatrica/`)
- `pide-tu-cita/index.html` — Pide tu cita (`/pide-tu-cita/`)
- `politica-de-privacidad/index.html` — Política de privacidad (`/politica-de-privacidad/`)
- `aviso-legal/index.html` — Aviso legal (`/aviso-legal/`)
- `declaracion-accesibilidad/index.html` — Declaración de accesibilidad (`/declaracion-accesibilidad/`)
- `404.html` — Página de error 404 personalizada
- `assets/css/styles.css` — Hoja de estilos única compartida
- `assets/js/main.js` — Menú móvil, tarjetas giratorias, carrusel de reseñas, acordeón, galería lightbox, mapa bajo clic y envío del formulario
- `assets/img/` — Todas las imágenes originales y favicons en local
- `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml` — Configuración de GitHub Pages y SEO

## Publicación en GitHub Pages

1. Sube esta carpeta a un repositorio de GitHub (rama `main`).
2. En el repositorio, entra en **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**, rama `main` y carpeta `/ (root)`, y guarda.
4. Como el archivo `CNAME` ya contiene `tufisioterapeuta.net`, GitHub detectará el dominio personalizado automáticamente.

## Configuración DNS para `tufisioterapeuta.net`

En el panel DNS de tu registrador de dominio, configura:

- **4 registros `A`** para `@` (`tufisioterapeuta.net`) apuntando a las IPs oficiales de GitHub Pages:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- **1 registro `CNAME`** para `www` apuntando a `<tu-usuario>.github.io`.
- Una vez propagado el DNS, activa **Enforce HTTPS** en **Settings → Pages**.

## Activación del formulario de "Pide tu cita" (FormSubmit.co)

1. Una vez publicada la web en `https://tufisioterapeuta.net/pide-tu-cita/`, haz **un primer envío de prueba** del formulario.
2. Recibirás un único correo de confirmación de **FormSubmit** en `tufisioterapeuta@gmail.com`.
3. Haz clic en **Activate Form** en ese correo. A partir de ese momento todos los mensajes de pacientes llegarán directamente a tu Gmail.

## Analítica sin cookies (opcional)

La web no instala cookies de terceros (incluso Google Maps solo se carga si el visitante pulsa el botón del mapa). Si deseas ver visitas, horas pico y procedencia sin banner de cookies, puedes añadir tu etiqueta de **Cloudflare Web Analytics** o **GoatCounter** en el comentario `<!-- Analítica sin cookies (opcional) -->` dentro del `<head>`.
