/**
 * CSS Intro Exercises
 * @module data/exercises/css-intro
 * 
 * Modul 5: Pengenalan CSS — Syntax, Selectors, How to Add CSS, Colors, Comments
 */

import type { ExerciseWithValidation } from './types';

export const cssIntroExercises: ExerciseWithValidation[] = [
  {
    id: 'css-intro-01',
    title: 'Sintaks CSS',
    moduleId: 'css-intro',
    order: 1,
    theory: `# Sintaks CSS

CSS (Cascading Style Sheets) digunakan untuk mengatur tampilan elemen HTML.

## Struktur CSS

\`\`\`css
selector {
  property: value;
  property: value;
}
\`\`\`

- **Selector** — Memilih elemen HTML yang akan di-style
- **Property** — Aspek yang ingin diubah (warna, ukuran, dll)
- **Value** — Nilai yang diberikan
- **Declaration** — Pasangan property:value, diakhiri titik koma

## Contoh

\`\`\`css
h1 {
  color: blue;
  font-size: 24px;
  text-align: center;
}

p {
  color: #333;
  line-height: 1.6;
}
\`\`\`

## Komentar CSS
\`\`\`css
/* Ini komentar satu baris */

/*
  Ini komentar
  multi baris
*/
\`\`\``,
    instructions: `Tulis CSS untuk mengubah tampilan elemen HTML:

1. Style \`body\` dengan \`font-family: Arial, sans-serif;\` dan \`margin: 0;\`
2. Style \`h1\` dengan warna biru, ukuran 32px, dan center align
3. Style \`p\` dengan warna abu-abu (#666), line-height 1.6
4. Style \`div\` dengan padding 20px dan background-color
5. Tambahkan komentar CSS di atas setiap rule`,
    hints: [
      'Setiap declaration diakhiri titik koma ;',
      'Komentar CSS: /* teks komentar */',
      'font-family bisa berisi beberapa font sebagai fallback',
    ],
    expectedOutput: 'Halaman dengan heading biru center, paragraf abu-abu, dan div dengan background',
    starterHTML: `<h1>Belajar CSS</h1>
<p>CSS membuat halaman web menjadi indah.</p>
<div>
  <p>Konten di dalam div</p>
</div>`,
    starterCSS: `/* Tulis CSS di sini */
`,
    starterJS: '',
    validationRules: [
      { type: 'function', validator: (code) => code.css.includes('font-family'), message: 'Tambahkan property font-family pada body' },
      { type: 'function', validator: (code) => code.css.includes('color') && code.css.includes('blue'), message: 'Tambahkan warna biru pada h1' },
      { type: 'function', validator: (code) => code.css.includes('text-align') && code.css.includes('center'), message: 'Tambahkan text-align: center pada h1' },
      { type: 'function', validator: (code) => code.css.includes('line-height'), message: 'Tambahkan line-height pada p' },
      { type: 'function', validator: (code) => code.css.includes('padding'), message: 'Tambahkan padding pada div' },
      { type: 'function', validator: (code) => code.css.includes('/*'), message: 'Tambahkan komentar CSS' },
    ],
    successMessage: '🎉 Kamu sudah mengerti sintaks dasar CSS!',
  },
  {
    id: 'css-intro-02',
    title: 'CSS Selectors',
    moduleId: 'css-intro',
    order: 2,
    theory: `# CSS Selectors

Selector menentukan elemen mana yang akan di-style.

## Selector Dasar

| Selector | Contoh | Memilih |
|----------|--------|---------|
| Element | \`p { }\` | Semua \`<p>\` |
| Class | \`.info { }\` | Semua elemen class="info" |
| ID | \`#header { }\` | Elemen id="header" |
| Universal | \`* { }\` | Semua elemen |
| Grouping | \`h1, h2, p { }\` | Semua h1, h2, dan p |

## Selector Lanjutan

| Selector | Contoh | Memilih |
|----------|--------|---------|
| Descendant | \`div p { }\` | \`<p>\` di dalam \`<div>\` |
| Child | \`div > p { }\` | \`<p>\` yang langsung anak dari \`<div>\` |
| Adjacent | \`h1 + p { }\` | \`<p>\` tepat setelah \`<h1>\` |
| Attribute | \`input[type="text"] { }\` | input dengan type text |

## Contoh Class vs ID

\`\`\`css
/* Class — bisa digunakan berkali-kali */
.highlight { background: yellow; }

/* ID — hanya untuk satu elemen */
#main-title { font-size: 36px; }
\`\`\``,
    instructions: `Gunakan berbagai CSS selector:

1. Gunakan **element selector** untuk style semua \`h2\`
2. Gunakan **class selector** \`.card\` untuk style div dengan class card
3. Gunakan **id selector** \`#hero\` untuk style elemen dengan id hero
4. Gunakan **grouping selector** untuk style \`h1, h2, h3\` sekaligus
5. Gunakan **descendant selector** \`.card p\` untuk style p di dalam card`,
    hints: [
      'Element selector: langsung tulis nama tag, misal: p { color: red; }',
      'Class selector diawali titik: .card { ... }',
      'ID selector diawali pagar: #hero { ... }',
      'Grouping: pisahkan dengan koma: h1, h2 { ... }',
    ],
    expectedOutput: 'Halaman dengan elemen yang di-style menggunakan berbagai selector',
    starterHTML: `<div id="hero">
  <h1>Welcome to CodeLearn</h1>
  <p>Belajar coding dengan mudah</p>
</div>

<div class="card">
  <h2>Modul HTML</h2>
  <p>Pelajari dasar-dasar HTML</p>
</div>

<div class="card">
  <h2>Modul CSS</h2>
  <p>Pelajari styling dengan CSS</p>
</div>

<h3>Judul Kecil</h3>`,
    starterCSS: `/* Gunakan berbagai selector di sini */
`,
    starterJS: '',
    validationRules: [
      { type: 'function', validator: (code) => /h2\s*\{/.test(code.css), message: 'Gunakan element selector untuk h2' },
      { type: 'function', validator: (code) => /\.card\s*\{/.test(code.css), message: 'Gunakan class selector .card' },
      { type: 'function', validator: (code) => /#hero\s*\{/.test(code.css), message: 'Gunakan id selector #hero' },
      { type: 'function', validator: (code) => /h1\s*,\s*h2/.test(code.css) || /h2\s*,\s*h3/.test(code.css) || /h1\s*,\s*h2\s*,\s*h3/.test(code.css), message: 'Gunakan grouping selector (h1, h2, h3)' },
      { type: 'function', validator: (code) => /\.card\s+p\s*\{/.test(code.css), message: 'Gunakan descendant selector .card p' },
    ],
    successMessage: '🎉 Kamu sudah menguasai berbagai CSS selector!',
  },
  {
    id: 'css-intro-03',
    title: 'Cara Menambahkan CSS',
    moduleId: 'css-intro',
    order: 3,
    theory: `# 3 Cara Menambahkan CSS

## 1. Inline CSS
Langsung di atribut \`style\` elemen:
\`\`\`html
<p style="color: red; font-size: 18px;">Teks merah</p>
\`\`\`
- ✅ Cepat untuk satu elemen
- ❌ Sulit di-maintain, tidak reusable

## 2. Internal CSS
Di dalam tag \`<style>\` di \`<head>\`:
\`\`\`html
<head>
  <style>
    p { color: blue; }
    .card { padding: 16px; }
  </style>
</head>
\`\`\`
- ✅ Berlaku untuk satu halaman
- ❌ Tidak bisa dipakai di halaman lain

## 3. External CSS (Direkomendasikan ✅)
File CSS terpisah, dihubungkan dengan \`<link>\`:
\`\`\`html
<head>
  <link rel="stylesheet" href="style.css">
</head>
\`\`\`
- ✅ Reusable di banyak halaman
- ✅ Setting terpusat, mudah di-maintain
- ✅ Browser bisa cache file CSS

## Prioritas (Specificity)
Inline > Internal/External (yang terakhir menang) > Browser default`,
    instructions: `Demonstrasikan 3 cara menambahkan CSS:

1. Tambahkan **inline style** pada \`<h1>\` dengan warna dan ukuran font
2. Pada panel CSS (external), buat style untuk class \`.info\`
3. Pada HTML, tambahkan **internal CSS** di dalam tag \`<style>\` untuk elemen \`body\`
4. Buktikan prioritas: buat inline style yang meng-override external CSS pada satu elemen`,
    hints: [
      'Inline: style="property: value;" langsung di tag',
      'Internal: <style>selector { property: value; }</style> di HTML',
      'External: tulis CSS di panel CSS (ini simulasi file .css terpisah)',
    ],
    expectedOutput: 'Halaman yang menunjukkan 3 cara CSS bekerja, dengan inline meng-override external',
    starterHTML: `<!-- Tambahkan internal CSS dan inline style di sini -->

<h1>Judul Halaman</h1>
<p class="info">Informasi penting</p>
<p class="info">Informasi lainnya</p>`,
    starterCSS: `/* External CSS - tulis style di sini */
`,
    starterJS: '',
    validationRules: [
      { type: 'contains', value: 'style="', message: 'Tambahkan inline style pada elemen' },
      { type: 'contains', value: '<style>', message: 'Tambahkan tag <style> untuk internal CSS' },
      { type: 'function', validator: (code) => /\.info\s*\{/.test(code.css), message: 'Buat style .info di external CSS' },
    ],
    successMessage: '🎉 Kamu sudah memahami 3 cara menambahkan CSS!',
  },
  {
    id: 'css-intro-04',
    title: 'Warna CSS',
    moduleId: 'css-intro',
    order: 4,
    theory: `# Warna di CSS

CSS mendukung berbagai cara mendefinisikan warna:

## 1. Nama Warna
\`\`\`css
color: red;
color: tomato;
color: dodgerblue;
\`\`\`

## 2. HEX
\`#RRGGBB\` — setiap komponen 00-FF
\`\`\`css
color: #FF6347;  /* Tomato */
color: #333;     /* Shorthand: #333333 */
\`\`\`

## 3. RGB / RGBA
\`\`\`css
color: rgb(255, 99, 71);       /* Tomato */
color: rgba(255, 99, 71, 0.5); /* 50% transparan */
\`\`\`

## 4. HSL / HSLA
\`\`\`css
color: hsl(9, 100%, 64%);        /* Tomato */
color: hsla(9, 100%, 64%, 0.5);  /* 50% transparan */
\`\`\`

## Property Warna
- \`color\` — Warna teks
- \`background-color\` — Warna latar belakang
- \`border-color\` — Warna border
- \`opacity: 0.5\` — Transparansi seluruh elemen (0=transparan, 1=opaque)`,
    instructions: `Buat halaman yang mendemonstrasikan berbagai format warna CSS:

1. Buat heading dengan \`color\` menggunakan nama warna
2. Buat div dengan \`background-color\` menggunakan HEX
3. Buat div lain dengan background menggunakan \`rgba()\` (semi-transparan)
4. Buat teks dengan warna \`hsl()\`
5. Buat elemen dengan \`opacity: 0.7\`
6. Buat sebuah div dengan \`border-color\` yang berbeda dari background`,
    hints: [
      'RGBA: rgba(red, green, blue, alpha) — alpha antara 0 dan 1',
      'HSL: hsl(hue, saturation%, lightness%)',
      'Opacity mempengaruhi seluruh elemen termasuk anak-anaknya',
    ],
    expectedOutput: 'Halaman dengan berbagai warna: nama, HEX, RGBA, HSL, dan opacity',
    starterHTML: `<h1>Warna CSS</h1>
<div class="box hex">Warna HEX</div>
<div class="box rgba">Warna RGBA</div>
<div class="box hsl">Warna HSL</div>
<div class="box opacity">Opacity</div>`,
    starterCSS: `/* Demonstrasikan berbagai format warna */
.box {
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
  color: white;
  font-weight: bold;
}
`,
    starterJS: '',
    validationRules: [
      { type: 'function', validator: (code) => code.css.includes('#'), message: 'Gunakan kode warna HEX (diawali #)' },
      { type: 'function', validator: (code) => code.css.includes('rgba('), message: 'Gunakan format rgba()' },
      { type: 'function', validator: (code) => code.css.includes('hsl('), message: 'Gunakan format hsl()' },
      { type: 'function', validator: (code) => code.css.includes('opacity'), message: 'Gunakan property opacity' },
      { type: 'function', validator: (code) => code.css.includes('border-color') || code.css.includes('border:'), message: 'Tambahkan border-color pada elemen' },
    ],
    successMessage: '🎉 Kamu sudah menguasai semua format warna CSS!',
  },
  {
    id: 'css-intro-05',
    title: 'Background CSS',
    moduleId: 'css-intro',
    order: 5,
    theory: `# Background CSS

CSS menyediakan banyak property untuk mengatur background:

## Property Background

| Property | Fungsi |
|----------|--------|
| \`background-color\` | Warna latar belakang |
| \`background-image\` | Gambar latar belakang |
| \`background-repeat\` | Pengulangan gambar |
| \`background-position\` | Posisi gambar |
| \`background-size\` | Ukuran gambar |
| \`background-attachment\` | Fixed/scroll |

## Contoh

\`\`\`css
/* Warna */
div { background-color: lightblue; }

/* Gambar */
div {
  background-image: url("bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/* Gradient */
div {
  background: linear-gradient(to right, #ff7e5f, #feb47b);
}

/* Shorthand */
div {
  background: #333 url("bg.jpg") no-repeat center/cover;
}
\`\`\`

## Gradient
- **Linear**: \`linear-gradient(direction, color1, color2)\`
- **Radial**: \`radial-gradient(circle, color1, color2)\``,
    instructions: `Buat halaman dengan berbagai efek background:

1. Style \`body\` dengan \`background-color\` berwarna
2. Buat div \`.hero\` dengan \`background: linear-gradient(...)\`
3. Buat div \`.pattern\` dengan \`background-image\` dan \`background-repeat\`
4. Buat div \`.radial\` dengan \`background: radial-gradient(...)\`
5. Gunakan \`background-size\` pada salah satu elemen`,
    hints: [
      'Linear gradient: background: linear-gradient(to right, #667eea, #764ba2);',
      'Radial gradient: background: radial-gradient(circle, #fff, #333);',
      'background-size: cover membuat gambar menutupi seluruh elemen',
    ],
    expectedOutput: 'Halaman dengan background warna, linear gradient, dan radial gradient',
    starterHTML: `<div class="hero">
  <h1>Hero Section</h1>
  <p>Dengan gradient background</p>
</div>
<div class="pattern">
  <p>Pattern Background</p>
</div>
<div class="radial">
  <p>Radial Gradient</p>
</div>`,
    starterCSS: `/* Buat berbagai background di sini */
div { padding: 40px; margin: 10px 0; border-radius: 12px; text-align: center; }
`,
    starterJS: '',
    validationRules: [
      { type: 'function', validator: (code) => code.css.includes('background-color') || code.css.includes('background:'), message: 'Gunakan background-color atau background' },
      { type: 'function', validator: (code) => code.css.includes('linear-gradient'), message: 'Gunakan linear-gradient untuk gradient' },
      { type: 'function', validator: (code) => code.css.includes('radial-gradient'), message: 'Gunakan radial-gradient' },
      { type: 'function', validator: (code) => code.css.includes('background-size') || code.css.includes('background-repeat'), message: 'Gunakan background-size atau background-repeat' },
    ],
    successMessage: '🎉 Kamu sudah menguasai CSS background!',
  },
];
