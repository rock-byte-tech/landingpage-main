# Rock Byte Tech – Landing Page

> **Stack:** Astro + Tailwind CSS · AOS (scroll animations) · Typed.js (máquina de escribir) · Vanilla‑Tilt (parallax 3D) · Hero video background · Deployed on any static host

---

## ✨ Características Clave

| Módulo              | Descripción                                                                            |
| ------------------- | -------------------------------------------------------------------------------------- |
| **Hero**            | Video a pantalla completa, texto dinámico con Typed.js, efecto 3D Tilt y CTA destacado |
| **Header flotante** | Transparente/blur, enlaces ancla y botón primario (CTA)                                |
| **Secciones**       | Servicios, Por qué elegirnos, Testimonios, Contacto – todas con animaciones AOS        |
| **Responsive**      | Mobile‑first, Tailwind utility classes                                                 |
| **Constantes**      | `src/const/constants.js` para URLs, textos y colores reutilizables                     |

---

## 🗂 Estructura del Proyecto

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── logo/
│   │   │   └── logo-principal-blanco.webp
│   │   └── video/
│   │       └── background-video-v2.mp4
│   ├── const/
│   │   └── constants.js
│   ├── layouts/
│   │   └── Layout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   └── HeroAnimated.astro
│   └── pages/
│   │   └── index.astro
└── package.json
```

\* Puede usar **CDN** o instalar por `npm`. Ejemplo CDN en `index.astro`:

```html
<link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet" />
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vanilla-tilt@1.8.0/dist/vanilla-tilt.min.js"></script>
```

---

## 🚀 Instalación & Scripts

```bash
pnpm install           # instala dependencias
pnpm dev               # servidor local en http://localhost:4321
pnpm build             # genera `dist/` para producción
pnpm preview           # previsualiza la build
```

### Dependencias principales

```json
{
  "dependencies": {
    "astro": "^5",
    "tailwindcss": "^4",
  },
  "devDependencies": {
    "aos": "^2",
    "typed.js": "^2",
    "vanilla-tilt": "^1"
  }
}
```

*Para prototipos se recomienda CDN; para producción crítica instala con **``** y haga importación ESM.*

---

## 🛠 Configuración Rápida

1. **Constantes globales**
   ```js
   // src/const/constants.js
   ```
2. **Tailwind**: Config extendido en `tailwind.config.js` para estilos personalizadas.
3. **Animaciones AOS**: agrega `data-aos="fade-up"` (u otro) a cualquier elemento. Para animaciones más vanzadas y con detención de viewport.
4. **Typed.js**: en `HeroAnimated.astro` se inicializa sobre `#hero-text`.
5. **Vanilla‑Tilt**: basta con `data-tilt` sobre el contenedor; opciones extra vía atributos `data-tilt-*`. Efectos avanzados.

---

## 🌐 Deploy

El resultado de `pnpm build` es 100 % estático ⇒ **compatible con**: Netlify, Vercel, GitHub Pages, Cloudflare Pages, Hostinger, etc.

```bash
pnpm build
netlify deploy --prod dist/   # ejemplo Netlify CLI
```

---

## 📚 Fuentes & Recursos

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [AOS – Animate On Scroll](https://michalsnik.github.io/aos/)
- [Typed.js](https://mattboldt.github.io/typed.js/)
- [Vanilla‑Tilt.js](https://micku7zu.github.io/vanilla-tilt.js/)
- Video comprimido con [HandBrake](https://handbrake.fr/)

---

## 📄 Licencia

MIT © 2025 Rock Byte Tech

