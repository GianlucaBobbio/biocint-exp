# biocint — Sitio web (10 propuestas de diseño)

Landing + catálogo (marketplace) para **biocint**, fabricación y venta de cintas de embalaje y **cintas impresas** personalizadas para comercios y fábricas.

Sitio estático en **HTML + CSS + JavaScript** (sin frameworks, sin build). Todas las "compras" y consultas redirigen a **WhatsApp** — no hay carrito ni checkout.

El `index.html` es un **selector con 10 pestañas arriba de todo** para comparar 10 diseños distintos del mismo sitio. Cada diseño es una página independiente dentro de `designs/`.

## Estructura

```
.
├── index.html            # Selector con las 10 pestañas (carga cada diseño en un iframe)
├── designs/
│   ├── 01-emerald.html   # Emerald Clean
│   ├── 02-industrial.html# Industrial Dark
│   ├── 03-editorial.html # Minimal Editorial
│   ├── 04-kraft.html     # Kraft Packaging
│   ├── 05-corporate.html # Corporate Blue
│   ├── 06-brutalist.html # Brutalist Bold
│   ├── 07-glass.html     # Glass Gradient
│   ├── 08-swiss.html     # Swiss Grid
│   ├── 09-eco.html       # Eco Nature
│   └── 10-neon.html      # Tech Neon
├── js/
│   └── products.js       # Datos de productos + WhatsApp + helpers (compartido por todos)
├── assets/
│   └── favicon.svg
└── README.md
```

Los 10 diseños **comparten los mismos datos** (`js/products.js`): editás una sola vez y se actualizan todos.

## Configuración rápida

### Número de WhatsApp
En un solo lugar, arriba de `js/products.js`:

```js
const WHATSAPP_NUMBER = "5491161402766"; // +54 9 11 6140 2766
```

Formato internacional, sin `+`, sin espacios y **sin el 15**.

### Productos del catálogo
Editá el array `PRODUCTS` en `js/products.js`. Cada ítem:

```js
{
  name: "Cinta transparente acrílica",
  category: "embalaje",           // embalaje | impresa | tecnica | senializacion
  desc: "Texto corto.",
  specs: ["48 mm", "Base agua"],
  color: "#dfe7e2",               // color del rollo ilustrado
  tag: "Más vendida",             // opcional (badge)
  hot: true                       // opcional (resalta el badge)
}
```

## Elegir un diseño final

Cuando decidas cuál te gusta (ej. `05-corporate.html`), lo dejás como sitio principal. La forma más simple:

1. Copiá el contenido del diseño elegido a `index.html` (reemplazando el selector).
2. Ajustá la ruta del script de `../js/products.js` a `js/products.js`.
3. (Opcional) Borrá la carpeta `designs/` y los diseños que no uses.

> Avisame cuál elegís y lo dejo listo automáticamente.

## Ver en local

Abrí `index.html` en el navegador. Nota: como el selector usa `iframe`, en algunos navegadores conviene levantar un server simple para verlo:

```bash
python3 -m http.server 8080
# http://localhost:8080
```

Cada diseño individual (`designs/NN-*.html`) sí abre bien con doble clic directo.

## Publicar en GitHub Pages

1. Subí los archivos a un repo:

   ```bash
   git add .
   git commit -m "Sitio biocint — 10 diseños"
   git branch -M main
   git remote add origin https://github.com/USUARIO/REPO.git
   git push -u origin main
   ```

2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. Queda online en `https://USUARIO.github.io/REPO/`.
