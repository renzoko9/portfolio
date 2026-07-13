# Handoff: Portfolio personal — Renzo Chipana

## Overview
Sitio de portfolio personal de una sola página (scroll), bilingüe ES/EN, con modo oscuro por defecto y claro opcional. Secciones: hero, sobre mí, experiencia, proyectos, stack, escritos y contacto (formulario que abre el cliente de correo). Estética "grid-frame" para desarrollador: líneas de rejilla que enmarcan una columna central, tipografía Space Grotesk + JetBrains Mono, esquinas casi rectas (2–4px).

## About the Design Files
El archivo de esta entrega (`Portfolio.dc.html`) es una **referencia de diseño creada en HTML** — un prototipo que muestra la apariencia y el comportamiento buscados, **no código de producción para copiar tal cual**. Está escrito como "Design Component" con un runtime propio (`support.js`) y un bundle de design system; eso es andamiaje del entorno de prototipado, no parte del diseño.

La tarea es **recrear este diseño en el entorno del codebase destino** (React, Vue, Astro, etc.) usando sus patrones y librerías establecidos. Si no hay entorno aún, se recomienda **React + Vite** o **Astro** (sitio estático simple). Toda la lógica real cabe en: un diccionario i18n ES/EN, un toggle de tema (atributo `data-theme` en `<html>`), y un handler de formulario que arma un `mailto:`.

## Fidelity
**Alta fidelidad (hifi).** Colores, tipografía, espaciado e interacciones son finales. Recréalo pixel-perfect con las librerías del codebase. Los tokens exactos están abajo.

## Screens / Views

Una sola vista (landing de scroll) con columna central de **max 1400px** centrada, enmarcada por líneas verticales de rejilla a toda la altura (borde izq/der de la columna) y líneas horizontales de borde a borde entre secciones.

### 1. Nav (sticky, arriba)
- **Layout:** barra sticky, `border-bottom` hairline. Fila flex `align-items: stretch; justify-content: space-between`, dentro de la columna de 1400px. Tres celdas con divisores verticales hairline:
  - Celda logo (izq): `RC` + cuadrito acento; `border-left` + `border-right`; padding `16px 24px`; mono 15px bold, letter-spacing amplio.
  - Celda enlaces (centro): `flex:1`, centrado, gap 24px. Enlaces: `sobre mí`, `experiencia`, `proyectos`, `contacto` (mono 13px, color terciario → primario en hover).
  - Celda controles (der): `border-left` + `border-right`; botón idioma `EN`/`ES` (mono 12px, borde hairline, radius 4px) + ThemeToggle (radius 4px).
- **Nota:** `stack` y `escritos` NO están en el nav (sus secciones sí existen en la página).

### 2. Hero
- **Layout:** flex columna, `justify-content:center`, `min-height:60vh`, padding vertical generoso.
- **Componentes:**
  - Eyebrow mono uppercase, color acento: `// frontend developer · angular & react native`.
  - H1: "Renzo Chipana" + cuadrito acento (ver Assets). `font-weight:700`, `font-size: clamp(2.5rem, 5vw, 4.5rem)`, `line-height:1.02`, tracking tight.
  - Párrafo descripción, color secundario, `max-width:900px`, tamaño md.

### 3. Sobre mí (`#about`)
- **Layout:** grid 2 col `0.85fr 1.4fr`, gap 48px, `border-top` hairline full-width.
- Izq: eyebrow `// sobre mí` + H2 (extrabold, 3xl). Der: dos párrafos + fila de tags.
- **Tags:** chips con `border-radius:2px` (ver componente Tag). Texto: `UX / UI`, `Producto`, `Ing. de Sistemas`, `UNMSM`.

### 4. Experiencia (`#experience`)
- **Layout:** lista tipo timeline. Cada fila: grid `200px 1fr`, gap 32px, padding vertical 24px, `border-top` hairline.
- Col izq: dot (9px círculo) + periodo (mono uppercase). Dot con `align-items:flex-start` y `margin-top:4px` para alinear con la primera línea del texto. Dot activo = acento; anterior = `--border-strong`.
- Col der: rol (sans bold xl) + empresa (mono, acento) + descripción (secundario).
- **Entradas:**
  - `abr 2026 — actualidad` · **Desarrollador freelance** — "Emprendiendo de manera independiente: diseño y desarrollo productos digitales para clientes."
  - `abr 2023 — mar 2026` · **Frontend Developer** — Quipucamayoc — UNMSM — "Desarrollo de interfaces frontend para los sistemas del centro de investigación Quipucamayoc de la UNMSM."

### 5. Proyectos (`#projects`)
- **Layout:** lista vertical. Cada item es un `<a>` grid `52px 1fr auto`, gap 24px, padding vertical 32px, `border-top` hairline; hover cambia fondo a `--bg-surface-raised`.
- Contenido por item: número (mono, terciario) · título (sans bold 2xl) + badge estado · descripción (md, secundario) · fila de tags (radius 2px) · icono flecha ↗ (arriba der).
- **Items (en orden):**
  1. **San Market** — badge "en producción". "Ecommerce para la Universidad Nacional Mayor de San Marcos, con arquitectura de microservicios." Tags: Angular, NestJS, PostgreSQL, Microservicios, Design System propio. Link → post UNMSM San Market (target _blank).
  2. **Medibyte** — badge "en producción". "Plataforma del sistema Quipucamayoc que digitaliza las historias clínicas de los más de 30 mil estudiantes atendidos en los servicios médicos de la UNMSM." Tags: Angular, NestJS, PostgreSQL, Microservicios, Design System propio. Link → post UNMSM Quipucamayoc (target _blank).
  3. **INOUT** — badge "en producción". "App móvil fintech con IA integrada: un chat asistido por OpenAI dentro de la experiencia." Tags: React Native, Expo, NestJS, PostgreSQL, OpenAI. Link `#`.
  4. **Cuéntape** — badge "en desarrollo" (warning). "App para llevar las cuentas de pequeños negocios e incluso trabajadores ambulantes." Tags: React Native, Expo. Link `#`.

### 6. Stack (`#skills`)
- **Layout:** filas minimalistas grid `160px 1fr`, gap 32px, padding vertical 24px, `border-top` hairline. Categoría a la izq (mono uppercase, terciario); tecnologías a la der como texto en fila (flex wrap, gap 20px, sans md, primario). Sin cards ni chips.
- **Categorías:**
  - frontend: Angular, React Native, Expo, TypeScript, JavaScript, HTML & CSS, UX / UI
  - backend: NestJS, PostgreSQL, Microservicios, REST APIs
  - herramientas: Git, GitHub, GitLab, Jira, Claude Code, Figma
  - ia & otros: OpenAI

### 7. Escritos (`#writing`)
- **Layout:** una fila grid `160px 1fr` (mismo patrón que stack). Etiqueta "próximamente" a la izq; texto a la der: "Pronto compartiré notas sobre frontend, arquitectura y producto. Por ahora, este espacio está en construcción."

### 8. Contacto (`#contact`)
- **Layout:** grid 2 col `0.9fr 1.1fr`, gap 64px, `border-top` hairline.
- Izq: eyebrow `// contacto` + H2 "Hablemos" (4xl) + descripción + fila de redes minimalistas (iconos + texto mono: LinkedIn, GitHub, X).
- Der: **formulario**. Campos (label mono uppercase 11px + input): nombre, tu correo (grid 2 col), asunto, mensaje (textarea 5 filas). Inputs `border:1px hairline; border-radius:2px; padding:12px 14px`, `focus` → borde acento. Botón "Enviar mensaje" (fondo acento, texto sobre acento, radius 2px, mono 14px, icono flecha) + nota hint debajo.
- **Comportamiento:** `onSubmit` previene default, lee los campos y hace `window.location.href = 'mailto:renzoch99@gmail.com?subject=...&body=...'` con subject/body URL-encoded. El body incluye "Nombre:", "Correo:" y el mensaje.

### 9. Footer
- **Layout:** flex space-between, `border-top` hairline, padding vertical. Izq: `RC.` + línea mono "Diseñado y construido por Renzo Chipana · 2026". Der: iconos solo (GitHub, LinkedIn, X) que pasan a color acento en hover.

## Interactions & Behavior
- **Idioma ES/EN:** botón en el nav alterna. Implementación de referencia: recorre nodos con `data-i18n` y reemplaza `textContent` según diccionario. En un codebase real, usar i18n del framework (react-i18next, vue-i18n, etc.). El diccionario completo está en el `<script>` de `Portfolio.dc.html` (objetos `dict.es` y `dict.en`).
- **Tema oscuro/claro:** setea `document.documentElement.dataset.theme = 'dark'|'light'`. Los tokens de color responden a `[data-theme="light"]`.
- **Hover:** enlaces terciario→primario; tarjetas de proyecto cambian fondo; iconos del footer → acento. Transiciones ~120ms, easing estándar `cubic-bezier(0.4,0,0.2,1)`.
- **Scroll:** `scroll-behavior:smooth`; secciones con `scroll-margin-top:88px` para el nav sticky.
- **Formulario:** abre cliente de correo vía `mailto:` (sitio estático). Si se quiere envío sin abrir el correo del visitante, integrar un servicio (Formspree, Resend, endpoint propio).
- **Responsive:** los grids de 2 columnas deben colapsar a 1 columna en móvil; el hero usa `clamp()` para el título; el nav debe plegarse (menú) en pantallas pequeñas — no implementado en el prototipo, decidir patrón en el codebase.

## State Management
- `theme: 'dark' | 'light'`
- `lang: 'es' | 'en'`
- Campos del formulario (nombre, email, asunto, mensaje) — locales al form.

## Design Tokens
Vienen del design system (dark por defecto; `[data-theme="light"]` para claro). Valores clave:
- **Colores (dark):** canvas near-black `--gray-0: #0b0b0d`; ramp de grises neutros hasta off-white; acento indigo/periwinkle `#7c93ff` (dark) / `#4a5ed1` (light). Semánticos desaturados: mint (success), amber (warning), coral (danger). Sin gradientes.
- **Texto:** primario (off-white), secundario, terciario (para meta/labels).
- **Bordes:** `--border-hairline` (líneas de rejilla, inputs), `--border-strong` (hover), `--border-dashed` (motivo dashed opcional).
- **Tipografía:** display/cuerpo = **Space Grotesk** (400/500/600/700); mono/labels/tags = **JetBrains Mono**. Labels meta en UPPERCASE con tracking amplio, prefijo `//` estilo comentario de código.
- **Escala de espaciado:** base 4px (`--space-1`=4 … `--space-32`=128).
- **Radios:** 2px (tags, inputs, botón), 4px (botón idioma, ThemeToggle). Deliberadamente casi recto — evitar píldoras.
- **Sombras:** ambientales muy sutiles (`--shadow-sm/md`), sin glows.
- **Contenedor:** columna central `max-width:1400px`, con padding lateral que además separa el contenido de las líneas verticales de rejilla.
- **Motion:** 120ms hover/press, 200ms toggles, easing estándar; respetar `prefers-reduced-motion`.

## Assets
- **Iconos:** SVG inline estilo Lucide (stroke 1.6, joins redondeados): GitHub, LinkedIn, X (twitter/x glyph con fill), correo (sobre), flecha diagonal ↗, íconos de proyecto. Reemplazables 1:1 por la librería de iconos del codebase (Lucide recomendado).
- **Cuadrito de acento** tras "Renzo Chipana": `<span>` inline-block ~0.28em, fondo acento, `border-radius:4px` (sustituye al punto).
- **Foto:** no incluida (el hero no usa retrato en la versión final).
- **Sin logo provisto.** El wordmark es `RC` + cuadrito acento.
- **Enlaces sociales** están en `#` — reemplazar por los reales (LinkedIn, GitHub, X). Correo de contacto real: `renzoch99@gmail.com`.

## Files
- `Portfolio.dc.html` — prototipo de referencia (incluye el diccionario i18n completo ES/EN y toda la copia final). Ignorar `support.js`, `_ds_bundle.js`, `image-slot.js` y la envoltura `<x-dc>` / `<script data-dc-script>`: son andamiaje del entorno de prototipado, no parte del diseño.
