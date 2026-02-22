/**
 * HTML Structure Exercises
 * @module data/exercises/html-structure
 * 
 * Modul 4: Struktur & Layout HTML — Tables, Lists, Div, Block/Inline, Semantic
 */

import type { ExerciseWithValidation } from './types';

export const htmlStructureExercises: ExerciseWithValidation[] = [
  {
    id: 'html-structure-01',
    title: 'Tabel HTML',
    moduleId: 'html-structure',
    order: 1,
    theory: `# Tabel HTML

Tabel digunakan untuk menampilkan data dalam format baris dan kolom.

## Tag Tabel

| Tag | Fungsi |
|-----|--------|
| \`<table>\` | Container tabel |
| \`<tr>\` | Table Row (baris) |
| \`<th>\` | Table Header (judul kolom, tebal & center) |
| \`<td>\` | Table Data (data biasa) |
| \`<thead>\` | Grup header tabel |
| \`<tbody>\` | Grup body tabel |
| \`<caption>\` | Judul tabel |

## Contoh
\`\`\`html
<table>
  <caption>Data Siswa</caption>
  <thead>
    <tr>
      <th>Nama</th>
      <th>Umur</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Budi</td>
      <td>20</td>
    </tr>
  </tbody>
</table>
\`\`\`

## Colspan & Rowspan
- \`colspan="2"\` — Sel mencakup 2 kolom
- \`rowspan="2"\` — Sel mencakup 2 baris`,
    instructions: `Buat tabel data siswa:

1. Buat \`<h1>\` dengan teks "Data Siswa"
2. Buat \`<table>\` dengan \`<caption>\` "Daftar Siswa Kelas A"
3. Buat \`<thead>\` dengan header: Nama, Umur, Kota
4. Buat \`<tbody>\` dengan minimal 3 baris data siswa
5. Gunakan \`colspan\` pada salah satu sel di baris terakhir
6. Tambahkan atribut \`border="1"\` pada table (atau style border)`,
    hints: [
      '<th> untuk header (tebal otomatis), <td> untuk data biasa',
      'colspan="2" artinya sel tersebut menggabungkan 2 kolom',
      'Setiap <tr> harus memiliki jumlah kolom/sel yang konsisten',
    ],
    expectedOutput: 'Tabel data siswa dengan header, body, caption, dan colspan',
    starterHTML: `<!-- Buat tabel di sini -->

`,
    starterCSS: `table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background-color: #4CAF50; color: white; }
tr:nth-child(even) { background-color: #f2f2f2; }`,
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<table', message: 'Tambahkan tag <table>' },
      { type: 'contains', value: '<caption>', message: 'Tambahkan <caption> untuk judul tabel' },
      { type: 'contains', value: '<thead>', message: 'Tambahkan <thead> untuk header tabel' },
      { type: 'contains', value: '<th>', message: 'Gunakan <th> untuk header kolom' },
      { type: 'contains', value: '<tbody>', message: 'Tambahkan <tbody> untuk body tabel' },
      { type: 'contains', value: 'colspan', message: 'Gunakan colspan pada salah satu sel' },
    ],
    successMessage: '🎉 Kamu sudah bisa membuat tabel HTML yang rapi!',
  },
  {
    id: 'html-structure-02',
    title: 'List HTML',
    moduleId: 'html-structure',
    order: 2,
    theory: `# List HTML

HTML menyediakan 3 jenis list:

## 1. Unordered List (\`<ul>\`)
Daftar dengan bullet point:
\`\`\`html
<ul>
  <li>Item pertama</li>
  <li>Item kedua</li>
  <li>Item ketiga</li>
</ul>
\`\`\`

## 2. Ordered List (\`<ol>\`)
Daftar dengan nomor urut:
\`\`\`html
<ol>
  <li>Langkah 1</li>
  <li>Langkah 2</li>
  <li>Langkah 3</li>
</ol>
\`\`\`

### Atribut \`<ol>\`
- \`type="A"\` — Huruf besar (A, B, C)
- \`type="a"\` — Huruf kecil (a, b, c)
- \`type="I"\` — Romawi besar (I, II, III)
- \`start="5"\` — Mulai dari nomor 5

## 3. Description List (\`<dl>\`)
Daftar dengan istilah dan definisi:
\`\`\`html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>
\`\`\`

## Nested List (List Bersarang)
\`\`\`html
<ul>
  <li>Buah
    <ul>
      <li>Apel</li>
      <li>Jeruk</li>
    </ul>
  </li>
</ul>
\`\`\``,
    instructions: `Buat halaman dengan berbagai jenis list:

1. Buat \`<h2>\` "Hobi Saya" lalu \`<ul>\` dengan minimal 3 item
2. Buat \`<h2>\` "Langkah Membuat Kopi" lalu \`<ol>\` dengan minimal 4 langkah
3. Buat ordered list dengan \`type="A"\`
4. Buat nested list (list di dalam list)
5. Buat \`<dl>\` (description list) dengan minimal 2 istilah dan definisi`,
    hints: [
      'Setiap item list menggunakan tag <li>',
      'Nested list: taruh <ul> atau <ol> di dalam <li>',
      'Description list: <dt> untuk istilah, <dd> untuk definisi',
    ],
    expectedOutput: 'Halaman dengan unordered list, ordered list, nested list, dan description list',
    starterHTML: `<!-- Buat berbagai list di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<ul>', message: 'Tambahkan unordered list <ul>' },
      { type: 'contains', value: '<ol>', message: 'Tambahkan ordered list <ol>' },
      { type: 'contains', value: '<li>', message: 'Tambahkan item list <li>' },
      { type: 'contains', value: 'type="A"', message: 'Buat ordered list dengan type="A"' },
      { type: 'contains', value: '<dl>', message: 'Tambahkan description list <dl>' },
      { type: 'contains', value: '<dt>', message: 'Tambahkan <dt> untuk istilah di description list' },
      { type: 'contains', value: '<dd>', message: 'Tambahkan <dd> untuk definisi di description list' },
    ],
    successMessage: '🎉 Kamu sudah menguasai semua jenis list HTML!',
  },
  {
    id: 'html-structure-03',
    title: 'Div & Span',
    moduleId: 'html-structure',
    order: 3,
    theory: `# Div & Span

## \`<div>\` — Block Container
\`<div>\` adalah container block-level yang sering digunakan untuk **mengelompokkan elemen** dan menerapkan styling.

\`\`\`html
<div style="background-color: lightblue; padding: 20px;">
  <h2>Section 1</h2>
  <p>Konten di section 1</p>
</div>
\`\`\`

Karakteristik \`<div>\`:
- Memulai baris baru
- Mengambil lebar penuh (100%)
- Bisa berisi elemen apapun

## \`<span>\` — Inline Container
\`<span>\` adalah container inline yang digunakan untuk **menandai sebagian teks** dalam paragraph.

\`\`\`html
<p>Kucing saya berwarna <span style="color: orange;">oranye</span> dan sangat <span style="font-weight: bold;">lucu</span>.</p>
\`\`\`

Karakteristik \`<span>\`:
- Tidak memulai baris baru
- Hanya selebar kontennya
- Biasanya untuk styling teks inline

## Block vs Inline
- **Block**: \`<div>\`, \`<p>\`, \`<h1>\`, \`<ul>\`, \`<table>\`
- **Inline**: \`<span>\`, \`<a>\`, \`<strong>\`, \`<img>\`, \`<input>\``,
    instructions: `Buat halaman yang menggunakan div dan span:

1. Buat \`<div>\` sebagai "card" dengan background color, padding, dan border-radius
2. Di dalam card, buat \`<h2>\` dan \`<p>\`
3. Buat \`<div>\` kedua dengan class dan style yang berbeda
4. Di dalam paragraf, gunakan \`<span>\` untuk memberi warna pada kata tertentu
5. Buat 3 div bersebelahan menggunakan inline style \`display: inline-block\``,
    hints: [
      'Untuk card: style="background-color: #f0f0f0; padding: 20px; border-radius: 10px;"',
      '<span> digunakan di dalam teks: <p>Teks <span style="...">berwarna</span> ini</p>',
      'display: inline-block membuat div berjejer horizontal',
    ],
    expectedOutput: 'Halaman dengan card, teks berwarna via span, dan div inline-block',
    starterHTML: `<!-- Gunakan div dan span di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<div', message: 'Tambahkan tag <div>' },
      { type: 'contains', value: '<span', message: 'Tambahkan tag <span>' },
      { type: 'contains', value: 'padding', message: 'Gunakan padding pada div' },
      { type: 'contains', value: 'background-color', message: 'Gunakan background-color pada div' },
      { type: 'contains', value: 'border-radius', message: 'Gunakan border-radius untuk rounded corners' },
      { type: 'contains', value: 'inline-block', message: 'Gunakan display: inline-block pada div' },
    ],
    successMessage: '🎉 Hebat! Kamu sudah paham div, span, dan block vs inline!',
  },
  {
    id: 'html-structure-04',
    title: 'Class & ID',
    moduleId: 'html-structure',
    order: 4,
    theory: `# Class dan ID

## Atribut \`class\`
Digunakan untuk mengelompokkan elemen agar bisa di-style bersama.

\`\`\`html
<div class="card">Card 1</div>
<div class="card">Card 2</div>

<style>
.card { background: #f0f0f0; padding: 16px; border-radius: 8px; }
</style>
\`\`\`

### Aturan Class:
- Satu elemen bisa punya **beberapa class**: \`class="card highlight"\`
- Beberapa elemen bisa punya **class yang sama**
- Di CSS, pilih dengan titik: \`.card { ... }\`

## Atribut \`id\`
Digunakan untuk mengidentifikasi satu elemen secara **unik**.

\`\`\`html
<div id="header">Header</div>

<style>
#header { background: navy; color: white; }
</style>
\`\`\`

### Aturan ID:
- Setiap ID harus **unik** dalam satu halaman
- Di CSS, pilih dengan pagar: \`#header { ... }\`
- Bisa digunakan sebagai target bookmark: \`<a href="#header">\`

## Perbedaan

| | class | id |
|--|-------|-----|
| Unik? | Tidak (bisa berulang) | Ya (harus unik) |
| CSS Selector | \`.nama-class\` | \`#nama-id\` |
| Multiple per elemen? | Ya | Tidak (1 id saja) |`,
    instructions: `Buat halaman yang menggunakan class dan id dengan benar:

1. Di CSS, buat class \`.card\` dengan background, padding, margin, dan border-radius
2. Buat class \`.highlight\` dengan border berwarna
3. Buat ID \`#judul-utama\` dengan style khusus
4. Di HTML, buat \`<h1 id="judul-utama">\` dengan teks "Belajar Class & ID"
5. Buat 3 \`<div class="card">\` dengan konten berbeda
6. Pada salah satu card, tambahkan class tambahan \`highlight\``,
    hints: [
      'Definisikan style class di CSS dengan .namaClass { ... }',
      'Definisikan style id di CSS dengan #namaId { ... }',
      'Untuk 2 class: class="card highlight"',
    ],
    expectedOutput: 'Halaman dengan 3 card (salah satu highlighted) dan heading dengan id unik',
    starterHTML: `<h1>Belajar Class & ID</h1>

<!-- Buat card dengan class dan id di sini -->
`,
    starterCSS: `/* Definisikan class dan id di sini */
`,
    starterJS: '',
    validationRules: [
      { type: 'contains', value: 'class="card"', message: 'Gunakan class="card" pada div' },
      { type: 'contains', value: 'highlight', message: 'Tambahkan class highlight pada salah satu card' },
      { type: 'contains', value: 'id="judul-utama"', message: 'Tambahkan id="judul-utama" pada h1' },
      { type: 'contains', value: '.card', message: 'Definisikan .card di CSS' },
      { type: 'contains', value: '#judul-utama', message: 'Definisikan #judul-utama di CSS' },
    ],
    successMessage: '🎉 Kamu sudah menguasai class dan id di HTML/CSS!',
  },
  {
    id: 'html-structure-05',
    title: 'Elemen Semantik HTML',
    moduleId: 'html-structure',
    order: 5,
    theory: `# Elemen Semantik HTML

Elemen semantik memberikan **makna** pada konten, bukan hanya tampilan. Ini membantu:
- **Mesin pencari** memahami struktur halaman
- **Pembaca layar** (screen reader) untuk aksesibilitas
- **Developer** memahami kode lebih mudah

## Elemen Semantik Utama

| Tag | Fungsi |
|-----|--------|
| \`<header>\` | Bagian atas halaman atau section |
| \`<nav>\` | Navigasi/menu |
| \`<main>\` | Konten utama (hanya 1 per halaman) |
| \`<article>\` | Konten independen (blog post, berita) |
| \`<section>\` | Bagian/seksi dari konten |
| \`<aside>\` | Konten samping (sidebar) |
| \`<footer>\` | Bagian bawah halaman atau section |
| \`<figure>\` | Gambar/diagram dengan caption |
| \`<figcaption>\` | Caption untuk figure |

## Struktur Halaman Semantik
\`\`\`html
<header>
  <nav>Menu</nav>
</header>
<main>
  <article>
    <section>Konten</section>
  </article>
  <aside>Sidebar</aside>
</main>
<footer>Copyright</footer>
\`\`\``,
    instructions: `Buat halaman web dengan struktur semantik yang benar:

1. Buat \`<header>\` yang berisi \`<nav>\` dengan beberapa link navigasi
2. Buat \`<main>\` sebagai konten utama
3. Di dalam main, buat \`<article>\` dengan judul dan paragraf
4. Di dalam article, buat \`<section>\` untuk sub-bagian
5. Buat \`<aside>\` untuk sidebar
6. Buat \`<footer>\` dengan informasi copyright
7. Buat \`<figure>\` dengan \`<figcaption>\` di dalam article`,
    hints: [
      'Hanya gunakan satu <main> per halaman',
      '<nav> biasanya berisi <ul> dengan <li><a href="..."> link',
      '<figure> dan <figcaption> untuk gambar dengan keterangan',
    ],
    expectedOutput: 'Halaman web dengan struktur semantik: header, nav, main, article, section, aside, footer, figure',
    starterHTML: `<!-- Buat struktur semantik di sini -->

`,
    starterCSS: `header { background: #333; color: white; padding: 16px; }
nav a { color: white; margin-right: 16px; text-decoration: none; }
main { display: flex; gap: 20px; padding: 20px; }
article { flex: 3; }
aside { flex: 1; background: #f0f0f0; padding: 16px; border-radius: 8px; }
footer { background: #333; color: white; padding: 16px; text-align: center; }`,
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<header>', message: 'Tambahkan tag <header>' },
      { type: 'contains', value: '<nav>', message: 'Tambahkan tag <nav>' },
      { type: 'contains', value: '<main>', message: 'Tambahkan tag <main>' },
      { type: 'contains', value: '<article>', message: 'Tambahkan tag <article>' },
      { type: 'contains', value: '<section>', message: 'Tambahkan tag <section>' },
      { type: 'contains', value: '<aside>', message: 'Tambahkan tag <aside>' },
      { type: 'contains', value: '<footer>', message: 'Tambahkan tag <footer>' },
      { type: 'contains', value: '<figure>', message: 'Tambahkan tag <figure>' },
      { type: 'contains', value: '<figcaption>', message: 'Tambahkan tag <figcaption>' },
    ],
    successMessage: '🎉 Luar biasa! Kamu sudah memahami HTML semantik!',
  },
];
