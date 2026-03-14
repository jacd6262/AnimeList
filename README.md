<div align="center">
  <img src="https://img.icons8.com/color/96/000000/anime.png" alt="AnimeList Logo" />
  <h1>📺 AnimeList - Gestión de Animes</h1>
  <p><em>Organiza, descubre y lleva el control de todos los animes que ves en cada temporada con un diseño moderno.</em></p>
</div>

---

## 📖 Sobre el Proyecto

**AnimeList** es una aplicación web full-stack diseñada para los verdaderos fanáticos del anime. Te permite explorar nuevas temporadas, buscar series específicas, gestionar tus favoritos y mantener un registro de tus estados (Viendo, Completado, Pendiente, etc.). 

Todo esto envuelto en una interfaz de usuario premium, construida para ser rápida, fluida y con una temática oscura acentuada con colores vibrantes.

### ✨ Características Principales
- 🔍 **Búsqueda Avanzada:** Encuentra cualquier anime en segundos con actualizaciones en tiempo real.
- 📅 **Por Temporada:** Descubre los estrenos de la temporada actual o los animes que están por venir.
- 🔐 **Autenticación Segura:** Sistema de usuarios protegido con JWT para guardar tus listas de manera privada.
- 💅 **Diseño Moderno:** UI completamente responsiva e interactiva basada en componentes de alta calidad.

---

## 🛠️ Tecnologías Usadas

El proyecto está dividido en dos partes y construido con las mejores herramientas del ecosistema JavaScript/TypeScript:

### 🎨 Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React.js** (empaquetado con Vite para máxima velocidad)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript** 
- ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS** (estilizado utilidad-primero)
- 🧩 **Shadcn UI & Heroicons** (componentes accesibles y biblioteca de iconos)
- 🔄 **Framer Motion** (para animaciones fluidas)

### ⚙️ Backend
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) **Node.js** & Express (API REST)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) **MongoDB & Mongoose** (Base de datos NoSQL flexible)
- 🔐 **JWT (JSON Web Tokens)** (Manejo de sesiones y autenticación stateless)

---

## 🔌 Rutas Jikan API utilizadas

Para obtener la información actualizada de los animes, consumimos la **[Jikan API](https://jikan.moe/)** (API no oficial de MyAnimeList).

| Consulta | Endpoint (URL) |
|----------|---------------|
| **Temporada específica** | `https://api.jikan.moe/v4/seasons/2012/spring?sfw` |
| **Próximos estrenos**    | `https://api.jikan.moe/v4/seasons/upcoming` |
| **Mejores OVAs**         | `https://api.jikan.moe/v4/top/anime?type=ova` |
| **Temporada Actual**     | `https://api.jikan.moe/v4/seasons/now?sfw` |
| **Animes General (Top)** | `https://api.jikan.moe/v4/top/anime?sfw` |
| **Búsqueda por nombre**  | `https://api.jikan.moe/v4/anime?q=one-piece&sfw` |

---

## 📜 Créditos y Atribuciones

Desarrollado con pasión por **Tengen**.

*Añadir: <a target="_blank" href="https://icons8.com/icon/dpUQB4dX6yQC/anime">Anime</a> icono de <a target="_blank" href="https://icons8.com">Icons8</a>*