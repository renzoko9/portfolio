# Portfolio — Renzo Chipana

Sitio de portfolio personal construido en Astro. Bilingüe (ES/EN), tema oscuro/claro, design system propio con clases utilitarias tipo Tailwind, y tipografía autoalojada (Space Grotesk + JetBrains Mono en `.woff`).

## Estructura

```text
public/fonts/           archivos .woff autoalojados
src/
  styles/
    tokens/              variables CSS: colores, tipografía, espaciado, radios, sombras, motion, bordes
    base.css             reset
    utilities.css        clases utilitarias propias (flex, grid, spacing, texto, color...)
    components.css       patrones compuestos: nav, tarjetas de proyecto, tags, badges, formulario...
  i18n/                  diccionarios es/en + helper de traducción
  data/                  contenido estructurado (experiencia, proyectos, skills, redes)
  components/
    ui/                  piezas pequeñas reutilizables (Tag, Badge, Icon, ThemeToggle, LangToggle)
    layout/              Nav, Footer
    sections/             Hero, About, Experience, Projects, Skills, Writing, Contact
    PortfolioPage.astro  composición de la página, parametrizada por idioma
  layouts/
    BaseLayout.astro     head, fuentes, script anti-flash de tema
  pages/
    index.astro          ruta es (default, sin prefijo)
    en/index.astro        ruta en
```

El idioma se resuelve por ruta (`/` = es, `/en/` = en) usando el enrutamiento i18n nativo de Astro, sin JS de swapping de texto en cliente. El tema oscuro/claro persiste en `localStorage` y se aplica antes del primer pintado para evitar parpadeo.

## Comandos

| Comando           | Acción                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Instala dependencias                          |
| `npm run dev`       | Servidor local en `localhost:4321`            |
| `npm run build`     | Build de producción a `./dist/`               |
| `npm run preview`   | Previsualiza el build                         |
| `npm run astro check` | Chequeo de tipos                             |
