/* ==========================================================================
   biocint — datos y helpers COMPARTIDOS por los 10 diseños
   Sitio 100% estático: todo va a WhatsApp (sin carrito ni checkout).
   ========================================================================== */
(function (global) {
  // +54 9 11 6140 2766  (formato internacional, sin + ni el 15)
  const WHATSAPP_NUMBER = "5491161402766";

  function waLink(message) {
    const base = "https://wa.me/" + WHATSAPP_NUMBER;
    return message ? base + "?text=" + encodeURIComponent(message) : base;
  }

  const CATEGORIES = [
    { id: "all", label: "Todos" },
    { id: "embalaje", label: "Embalaje" },
    { id: "personalizada", label: "Personalizadas" },
    { id: "color", label: "De color" },
    { id: "servicios", label: "Servicios" },
  ];

  // Catálogo real de biocint (fábrica de cintas autoadhesivas — Villa Maipú, San Martín).
  const PRODUCTS = [
    { name: "Cinta de embalaje cristal", category: "embalaje", desc: "Cinta autoadhesiva transparente con excelente agarre y resistencia para el cierre seguro de cajas.", specs: ["24/48/72 mm", "40 mic", "40–100 mts"], color: "#dfe7e2", tag: "Más vendida", img: "../assets/tapes/cristal.jpg" },
    { name: "Cinta de embalaje marrón", category: "embalaje", desc: "La misma adhesión y resistencia en color marrón, ideal para despacho y cajas de cartón.", specs: ["24/48/72 mm", "40 mic", "40–100 mts"], color: "#c99d63", img: "../assets/tapes/marron.jpg" },
    { name: 'Cinta de embalaje "Frágil"', category: "embalaje", desc: "Presentación pre-impresa: cinta blanca con leyenda “Frágil” en rojo de alta visibilidad para el cuidado de mercadería delicada.", specs: ["24/48/72 mm", "Blanco / rojo", "Stock"], color: "#f4f5f7", band: "FRÁGIL", bandColor: "#ffffff", bandInk: "#e01f1f", img: "../assets/tapes/fragil.jpg" },
    { name: "Cinta de embalaje personalizada", category: "personalizada", desc: "Impresión flexográfica pre-impresa: hasta 4 colores sobre fondo blanco o marrón. Sello de seguridad y publicidad de tu marca en cada envío.", specs: ["Hasta 4 colores", "24/48/72 mm", "40–100 mts"], color: "#e7e0cf", tag: "Personalizada", hot: true, band: "TU MARCA", bandColor: "#312866", bandInk: "#ffffff", img: "../assets/tapes/biocint.jpg" },
    { name: "Cinta perimetral personalizada", category: "personalizada", desc: "Cinta perimetral en base polietileno, impresa hasta 4 colores sobre fondo de color. Consultá medidas y colores.", specs: ["Base polietileno", "Hasta 4 colores", "A medida"], color: "#e8eef0", bands: [{ text: "PRECAUCIÓN", color: "#f2c200", ink: "#1a1a1a" }, { text: "PRECAUCIÓN", color: "#ffffff", ink: "#e01f1f" }], img: "../assets/tapes/precaucion.jpg" },
    { name: "Cinta de embalaje de color", category: "color", desc: "Cintas de color fabricadas a pedido (demora mínima 10 días). Rojo, negro y blanco; consultá por otros colores.", specs: ["Rojo / Negro / Blanco", "24/48/72 mm", "A pedido"], color: "#b23b3b", img: "../assets/tapes/roja.jpg" },
    { name: "Servicio de impresión", category: "servicios", desc: "Imprimimos sobre polietileno de baja y alta densidad, papel kraft y polipropileno. Ancho hasta 800 mm. Pedí la lista de precios por WhatsApp.", specs: ["Kraft / PE / PP", "Ancho máx. 800 mm", "A pedido"], color: "#e8eef0", tag: "Servicio", art: "bag", img: "../assets/tapes/bolsita.jpg" },
  ];

  // Foto del hero (rollo real biocint) para los diseños con hero de rollo.
  const HERO_IMG = "../assets/tapes/biocint.jpg";

  // Aclara (p>0) u oscurece (p<0) un color hex. Devuelve el input si no es hex.
  function shade(hex, p) {
    if (typeof hex !== "string" || hex[0] !== "#") return hex;
    let h = hex.slice(1);
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = parseInt(h, 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const adj = (v) => (p < 0 ? Math.round(v * (1 + p)) : Math.round(v + (255 - v) * p));
    const hx = (v) => Math.max(0, Math.min(255, adj(v))).toString(16).padStart(2, "0");
    return "#" + hx(r) + hx(g) + hx(b);
  }

  // Ilustración SVG de un rollo de cinta (diseño "donut + banda biocint").
  // color = cuerpo del rollo; band = color de la banda (default indigo de marca).
  // Port EXACTO de la "variante 11" (svg-lab v11). Por defecto (sin color) rinde
  // idéntico al diseño elegido: rollo dorado escalonado, banda indigo con "biocint".
  // Si se pasa `color`, se deriva la misma rampa para ese tono (catálogo por producto).
  let _rid = 0;
  function rollSvg(color, opts) {
    opts = opts || {};
    if (opts.art === "bag") return bagSvg(color, opts);
    const word = opts.text; // sin texto => cinta sin impresión (no lleva banda)
    const band = opts.band || "#312866";
    const bandText = opts.bandText || "#ffffff";
    const hub = opts.hub || "#f4f6f2";
    const core = opts.core || "#f4f6f2";
    const coreStroke = opts.coreStroke || "#dfe4dc";
    const uid = "r" + _rid++ + ((color || "") + (opts.uid || "")).replace(/[^a-z0-9]/gi, "");
    const cx = 200, cy = 150, R = 100;

    // Cuerpo del rollo:
    //  - sin color (hero/marca) => escala de grises (paleta secundaria).
    //  - con color (catálogo)   => color real del producto (marrón, rojo, etc.).
    const hasColor = typeof color === "string" && color[0] === "#";
    const s1 = hasColor ? shade(color, 0.30) : "#e8e9ed";
    const s2 = hasColor ? color : "#d2d5dc";
    const s3 = hasColor ? shade(color, -0.14) : "#b6bac3";
    const s4 = hasColor ? shade(color, -0.28) : "#9aa0ac";
    const aoCol = hasColor ? shade(color, -0.58) : "#565b64";

    // Texto repetido con separación pareja, ajustado para no salirse de la banda.
    const repeatWord = (w, fs, maxW) => {
      const sep = "   ", chW = fs * 0.6 + 1.5, spW = fs * 0.3 + 1.5;
      const unit = w.length * chW + sep.length * spW;
      const reps = Math.max(1, Math.min(4, Math.floor(maxW / unit)));
      return Array(reps).fill(w).join(sep);
    };

    let bandGroup = "";
    if (opts.logo) {
      const lh = 26, lw = lh * (3072 / 880);
      const xs = [cx - 62, cx + 62];
      const imgs = xs.map((x) => `<image href="${opts.logo}" x="${(x - lw / 2).toFixed(1)}" y="${(96 - lh / 2).toFixed(1)}" width="${lw.toFixed(1)}" height="${lh}" preserveAspectRatio="xMidYMid meet"/>`).join("");
      bandGroup = `<g clip-path="url(#clip-${uid})"><g transform="rotate(24 ${cx} ${cy})"><rect x="70" y="76" width="260" height="40" fill="${band}" opacity=".95"/>${imgs}</g></g>`;
    } else if (opts.bands && opts.bands.length) {
      // Varias tiras paralelas (p.ej. cinta perimetral con doble muestra).
      const arr = opts.bands, n = arr.length, bh = 30, gap = 3;
      const y0 = 96 - (n * bh + (n - 1) * gap) / 2;
      const strips = arr.map((b, i) => {
        const y = y0 + i * (bh + gap);
        const content = repeatWord(b.text || "", 13, 244);
        return `<rect x="70" y="${y.toFixed(1)}" width="260" height="${bh}" fill="${b.color || "#312866"}"/><text x="${cx}" y="${(y + bh / 2).toFixed(1)}" text-anchor="middle" dominant-baseline="central" xml:space="preserve" font-family="'Sora','Inter',sans-serif" font-weight="800" font-size="13" letter-spacing="1.2" fill="${b.ink || "#ffffff"}">${content}</text>`;
      }).join("");
      bandGroup = `<g clip-path="url(#clip-${uid})"><g transform="rotate(24 ${cx} ${cy})">${strips}</g></g>`;
    } else if (word) {
      const L = word.length;
      const sep = "   "; // separación real entre repeticiones
      const fs = L <= 8 ? 18 : (L <= 13 ? 15 : 13);
      const chW = fs * 0.6 + 1.5;                 // ancho aprox por caracter (con letter-spacing)
      const spW = fs * 0.3 + 1.5;                 // ancho aprox de un espacio
      let reps = Math.round(300 / ((L + 2) * chW));
      reps = Math.max(2, Math.min(4, reps));
      const content = Array(reps).fill(word).join(sep);
      const contentW = reps * L * chW + (reps - 1) * sep.length * spW;
      const W = Math.max(260, contentW + 34);
      const x = (cx - W / 2).toFixed(1);
      bandGroup = `<g clip-path="url(#clip-${uid})"><g transform="rotate(24 ${cx} ${cy})"><rect x="${x}" y="76" width="${W.toFixed(1)}" height="40" fill="${band}" opacity=".95"/><text x="${cx}" y="96" text-anchor="middle" dominant-baseline="central" xml:space="preserve" font-family="'Sora','Inter',sans-serif" font-weight="800" font-size="${fs}" letter-spacing="1.5" fill="${bandText}">${content}</text></g></g>`;
    }

    const bg = opts.bgTop
      ? `<defs><linearGradient id="bg-${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${opts.bgTop}"/><stop offset="1" stop-color="${opts.bgBottom || opts.bgTop}"/></linearGradient></defs><rect width="400" height="300" fill="url(#bg-${uid})"/>`
      : "";

    return `
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <defs>
        <radialGradient id="body-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="${hub}"/><stop offset=".26" stop-color="${hub}"/>
          <stop offset=".26" stop-color="${s1}"/><stop offset=".27" stop-color="${s1}"/>
          <stop offset=".27" stop-color="${s2}"/><stop offset=".62" stop-color="${s2}"/>
          <stop offset=".62" stop-color="${s3}"/><stop offset=".63" stop-color="${s3}"/>
          <stop offset=".63" stop-color="${s4}"/><stop offset="1" stop-color="${s4}"/>
        </radialGradient>
        <radialGradient id="ao-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="${aoCol}" stop-opacity="0"/>
          <stop offset=".78" stop-color="${aoCol}" stop-opacity="0"/>
          <stop offset="1" stop-color="${aoCol}" stop-opacity=".30"/>
        </radialGradient>
        <clipPath id="clip-${uid}"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath>
      </defs>
      ${bg}
      <ellipse cx="${cx}" cy="264" rx="94" ry="12" fill="rgba(0,0,0,.16)"/>
      <g transform="rotate(-8 ${cx} ${cy})">
        <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#body-${uid})"/>
        <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#ao-${uid})"/>
        ${bandGroup}
        <circle cx="${cx}" cy="${cy}" r="27" fill="${core}"/>
        <circle cx="${cx}" cy="${cy}" r="27" fill="none" stroke="${coreStroke}" stroke-width="2"/>
      </g>
    </svg>`;
  }

  // Ilustración de una bolsita impresa (servicio de impresión sobre bolsas/films).
  function bagSvg(color, opts) {
    opts = opts || {};
    const uid = "b" + _rid++;
    const logo = opts.logoColor || "../assets/logo-biocint.svg";
    const light = "#edeef1", mid = "#d4d7dd", rim = "#c3c7d0", handle = "#9aa0ac";
    const bg = opts.bgTop
      ? `<linearGradient id="bg-${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${opts.bgTop}"/><stop offset="1" stop-color="${opts.bgBottom || opts.bgTop}"/></linearGradient>`
      : "";
    const bgRect = opts.bgTop ? `<rect width="400" height="300" fill="url(#bg-${uid})"/>` : "";
    const lw = 118, lh = lw * (978 / 3072);
    return `
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <defs>
        ${bg}
        <linearGradient id="bag-${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${mid}"/></linearGradient>
      </defs>
      ${bgRect}
      <ellipse cx="200" cy="272" rx="86" ry="12" fill="rgba(0,0,0,.15)"/>
      <path d="M164 116 C164 84 196 84 196 116" fill="none" stroke="${handle}" stroke-width="6" stroke-linecap="round"/>
      <path d="M204 116 C204 84 236 84 236 116" fill="none" stroke="${handle}" stroke-width="6" stroke-linecap="round"/>
      <path d="M122 116 L278 116 L270 250 Q269 258 261 258 L139 258 Q131 258 130 250 Z" fill="url(#bag-${uid})" stroke="rgba(0,0,0,.08)" stroke-width="1.5"/>
      <rect x="120" y="110" width="160" height="12" rx="3" fill="${rim}" stroke="rgba(0,0,0,.08)" stroke-width="1"/>
      <line x1="174" y1="122" x2="176" y2="256" stroke="rgba(0,0,0,.05)" stroke-width="1.5"/>
      <line x1="226" y1="122" x2="224" y2="256" stroke="rgba(0,0,0,.05)" stroke-width="1.5"/>
      <image href="${logo}" x="${(200 - lw / 2).toFixed(1)}" y="${(182 - lh / 2).toFixed(1)}" width="${lw}" height="${lh.toFixed(1)}" preserveAspectRatio="xMidYMid meet"/>
    </svg>`;
  }

  // Arte de la card: foto real del producto si existe, si no la ilustración SVG.
  function cardArt(p, color, opts) {
    if (p && p.img) {
      return `<img src="${p.img}" alt="${p.name}" loading="lazy" style="display:block;width:100%;height:100%;object-fit:cover">`;
    }
    return rollSvg(color, opts);
  }

  function filtered(cat) {
    return cat && cat !== "all" ? PRODUCTS.filter((p) => p.category === cat) : PRODUCTS.slice();
  }

  function productMessage(p) {
    return `Hola biocint 👋 Me interesa: ${p.name}. Necesito precio por cantidad y disponibilidad.`;
  }

  // Monta un diseño: renderiza catálogo, cablea filtros, links WhatsApp y año.
  // opts = { grid, chipsContainer, cardFn(product) -> htmlString }
  function mount(opts) {
    const grid = typeof opts.grid === "string" ? document.querySelector(opts.grid) : opts.grid;
    const chips = opts.chipsContainer
      ? (typeof opts.chipsContainer === "string" ? document.querySelector(opts.chipsContainer) : opts.chipsContainer)
      : null;

    function render(cat) {
      if (!grid) return;
      grid.innerHTML = filtered(cat).map(opts.cardFn).join("");
    }
    render("all");

    if (chips) {
      chips.querySelectorAll("[data-filter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          chips.querySelectorAll("[data-filter]").forEach((b) => {
            b.classList.remove("is-active", "active");
            b.setAttribute("aria-selected", "false");
          });
          btn.classList.add("is-active", "active");
          btn.setAttribute("aria-selected", "true");
          render(btn.getAttribute("data-filter"));
        });
      });
    }

    // Hero: foto real del rollo biocint (reemplaza la ilustración SVG).
    // Uso: <div data-hero-roll></div>  (opcional data-roll-img / data-roll-bg)
    // Va con object-fit:contain para no recortar el rollo; el letterbox se
    // rellena con el color de fondo del hero (data-roll-bg) de cada diseño.
    document.querySelectorAll("[data-hero-roll]").forEach((el) => {
      const src = el.dataset.rollImg || HERO_IMG;
      const bg = el.dataset.rollBg ? `background:${el.dataset.rollBg};` : "";
      el.innerHTML = `<img src="${src}" alt="Rollo de cinta de embalaje biocint" loading="lazy" style="display:block;width:100%;height:100%;object-fit:contain;${bg}">`;
    });

    // Links de WhatsApp declarativos: [data-wa="mensaje"]
    document.querySelectorAll("[data-wa]").forEach((el) => {
      el.setAttribute("href", waLink(el.getAttribute("data-wa")));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });

    const yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();
  }

  global.BIOCINT = {
    WHATSAPP_NUMBER,
    waLink,
    rollSvg,
    cardArt,
    filtered,
    productMessage,
    mount,
    PRODUCTS,
    CATEGORIES,
  };
})(window);
