/**
 * Exercises Data
 * @module data/exercises
 * 
 * Contains all exercises with validation rules and test cases.
 */

import type { Exercise } from '@/types';

/** Validation rule for exercises */
export interface ValidationRule {
  /** Type of validation */
  type: 'contains' | 'not-contains' | 'regex' | 'function';
  /** Value to check against */
  value?: string | RegExp;
  /** Custom validation function */
  validator?: (code: { html: string; css: string; js: string }) => boolean;
  /** Error message if validation fails */
  message: string;
}

/** Extended exercise with validation */
export interface ExerciseWithValidation extends Exercise {
  /** Validation rules for checking answer */
  validationRules: ValidationRule[];
  /** Success message when answer is correct */
  successMessage: string;
}

/** HTML Basics exercises */
export const htmlBasicsExercises: ExerciseWithValidation[] = [
  {
    id: 'html-01',
    title: 'Struktur HTML Pertama',
    moduleId: 'html-basics',
    order: 1,
    theory: `# Struktur Dasar HTML

HTML (HyperText Markup Language) adalah bahasa markup standar untuk dokumen yang dirancang untuk ditampilkan di browser web.

## Elemen Penting

- **\`<!DOCTYPE html>\`** - Deklarasi tipe dokumen
- **\`<html>\`** - Elemen root dari halaman HTML
- **\`<head>\`** - Berisi metadata tentang dokumen
- **\`<body>\`** - Berisi konten yang terlihat di halaman

## Tag yang Sering Digunakan

| Tag | Fungsi |
|-----|--------|
| \`<h1> - <h6>\` | Heading |
| \`<p>\` | Paragraf |
| \`<div>\` | Container |
| \`<span>\` | Inline container |`,
    instructions: `Buatlah struktur HTML dasar dengan ketentuan berikut:

1. Gunakan tag \`<h1>\` untuk membuat judul "Selamat Datang"
2. Gunakan tag \`<p>\` untuk membuat paragraf dengan teks "Ini adalah halaman web pertamaku!"
3. Tambahkan tag \`<button>\` dengan teks "Klik Saya"

**Tips:** Pastikan struktur HTML kamu lengkap dengan tag \`<html>\`, \`<head>\`, dan \`<body>\.`,
    hints: [
      'Ingat untuk menutup setiap tag yang dibuka',
      'Tag button membutuhkan tag penutup </button>',
      'Gunakan tag <h1> untuk judul utama',
    ],
    expectedOutput: 'Halaman dengan judul "Selamat Datang", paragraf, dan tombol',
    successMessage: '🎉 Kerja bagus! Kamu telah membuat struktur HTML pertama!',
    starterHTML: `<!DOCTYPE html>
<html>
<head>
  <title>Halaman Pertamaku</title>
</head>
<body>
  <!-- Tulis kode di sini -->
  
</body>
</html>`,
    starterCSS: `/* Styling akan dipelajari di modul CSS */
body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
}`,
    starterJS: `// JavaScript akan dipelajari di modul JS
console.log('Hello World!');`,
    validationRules: [
      {
        type: 'contains',
        value: '<h1>',
        message: 'Tambahkan tag <h1> untuk judul',
      },
      {
        type: 'contains',
        value: 'Selamat Datang',
        message: 'Judul harus berisi teks "Selamat Datang"',
      },
      {
        type: 'contains',
        value: '<p>',
        message: 'Tambahkan tag <p> untuk paragraf',
      },
      {
        type: 'contains',
        value: '<button>',
        message: 'Tambahkan tag <button>',
      },
      {
        type: 'contains',
        value: '</button>',
        message: 'Jangan lupa tutup tag button dengan </button>',
      },
    ],
  },
  {
    id: 'html-02',
    title: 'Heading dan Paragraf',
    moduleId: 'html-basics',
    order: 2,
    theory: `# Heading dan Paragraf

HTML menyediakan enam level heading, dari \`<h1>\` (terpenting) hingga \`<h6>\` (terkecil).

## Heading Hierarchy

- \`<h1>\` - Judul utama (hanya satu per halaman)
- \`<h2>\` - Subjudul
- \`<h3>\` - Sub-subjudul
- Dan seterusnya...

## Paragraf

Tag \`<p>\` digunakan untuk membuat paragraf teks.`,
    instructions: `Buat halaman profil sederhana:

1. Buat \`<h1>\` dengan nama kamu
2. Buat \`<h2>\` dengan teks "Tentang Saya"
3. Buat \`<p>\` dengan deskripsi singkat tentang diri kamu
4. Buat \`<h2>\` dengan teks "Hobi"
5. Buat \`<p>\` dengan daftar hobi kamu`,
    hints: [
      'Gunakan <h1> hanya sekali untuk judul utama',
      '<h2> digunakan untuk subjudul',
      'Setiap paragraf membutuhkan tag <p>',
    ],
    expectedOutput: 'Halaman profil dengan heading dan paragraf',
    successMessage: '🌟 Bagus! Kamu sudah bisa membuat struktur konten yang rapi!',
    starterHTML: `<!DOCTYPE html>
<html>
<head>
  <title>Profil Saya</title>
</head>
<body>
  <!-- Tulis kode di sini -->
  
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #007AFF;
}`,
    starterJS: `console.log('Profil dimuat!');`,
    validationRules: [
      {
        type: 'contains',
        value: '<h1>',
        message: 'Tambahkan <h1> untuk nama kamu',
      },
      {
        type: 'contains',
        value: '<h2>',
        message: 'Tambahkan <h2> untuk subjudul',
      },
      {
        type: 'regex',
        value: /<h2>.*Tentang.*<\/h2>/i,
        message: 'Tambahkan <h2>Tentang Saya</h2>',
      },
      {
        type: 'regex',
        value: /<p>.*<\/p>/,
        message: 'Tambahkan minimal satu paragraf',
      },
    ],
  },
  {
    id: 'html-03',
    title: 'Link dan Gambar',
    moduleId: 'html-basics',
    order: 3,
    theory: `# Link dan Gambar

## Link (Anchor)

Tag \`<a>\` digunakan untuk membuat hyperlink ke halaman lain.

\`\`\`html
<a href="https://example.com">Klik di sini</a>
\`\`\`

## Gambar

Tag \`<img>\` digunakan untuk menampilkan gambar. Ini adalah self-closing tag.

\`\`\`html
<img src="gambar.jpg" alt="Deskripsi gambar">
\`\`\`

Atribut penting:
- \`src\` - URL gambar
- \`alt\` - Teks alternatif (accessibility)`,
    instructions: `Buat halaman dengan link dan gambar:

1. Buat link ke Google dengan teks "Cari di Google"
2. Tambahkan gambar dengan src "https://via.placeholder.com/300x200"
3. Berikan alt text yang deskriptif untuk gambar

**Catatan:** Gunakan https://google.com untuk link.`,
    hints: [
      'Gunakan <a href="URL">teks</a> untuk link',
      '<img> tidak memerlukan tag penutup',
      'Jangan lupa atribut alt untuk gambar',
    ],
    expectedOutput: 'Halaman dengan link ke Google dan gambar placeholder',
    successMessage: '🔗 Mantap! Kamu sudah bisa membuat link dan menampilkan gambar!',
    starterHTML: `<!DOCTYPE html>
<html>
<head>
  <title>Link dan Gambar</title>
</head>
<body>
  <h1>Belajar Link dan Gambar</h1>
  
  <!-- Tambahkan link di sini -->
  
  <!-- Tambahkan gambar di sini -->
  
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
  text-align: center;
}

a {
  color: #007AFF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  border-radius: 8px;
  margin-top: 20px;
}`,
    starterJS: `console.log('Link dan gambar dimuat!');`,
    validationRules: [
      {
        type: 'contains',
        value: '<a',
        message: 'Tambahkan tag <a> untuk link',
      },
      {
        type: 'contains',
        value: 'href=',
        message: 'Link membutuhkan atribut href',
      },
      {
        type: 'contains',
        value: 'google.com',
        message: 'Link harus mengarah ke google.com',
      },
      {
        type: 'contains',
        value: '<img',
        message: 'Tambahkan tag <img> untuk gambar',
      },
      {
        type: 'contains',
        value: 'alt=',
        message: 'Gambar harus memiliki atribut alt',
      },
    ],
  },
];

/** CSS Styling exercises */
export const cssStylingExercises: ExerciseWithValidation[] = [
  {
    id: 'css-01',
    title: 'Selector dan Properties',
    moduleId: 'css-styling',
    order: 1,
    theory: `# CSS Selector dan Properties

CSS (Cascading Style Sheets) digunakan untuk mengatur tampilan elemen HTML.

## Cara Menerapkan CSS

- **Inline**: \`style="color: red"\`
- **Internal**: \`<style>\` di \`<head>\`
- **External**: File .css terpisah

## Selector Umum

| Selector | Contoh | Fungsi |
|----------|--------|--------|
| Element | \`h1\` | Memilih semua \`<h1>\` |
| Class | \`.judul\` | Memilih elemen dengan class="judul" |
| ID | \`#utama\` | Memilih elemen dengan id="utama" |`,
    instructions: `Beri styling pada halaman:

1. Ubah warna teks \`<h1>\` menjadi biru (\`blue\`)
2. Beri \`font-size: 24px\` pada paragraf
3. Tambahkan \`background-color: #f0f0f0\` pada body
4. Gunakan class \`.highlight\` dengan warna kuning pada \`background-color\``,
    hints: [
      'Gunakan h1 { color: blue; } untuk mengubah warna heading',
      'Selector class menggunakan tanda titik: .highlight { }',
      'Background-color bisa pakai nama warna atau kode hex',
    ],
    expectedOutput: 'Heading biru, paragraf berukuran 24px, background abu-abu muda',
    successMessage: '🎨 Hebat! Kamu sudah menguasai selector dan properties CSS dasar!',
    starterHTML: `<!DOCTYPE html>
<html>
<head>
  <title>Belajar CSS</title>
</head>
<body>
  <h1>Judul Halaman</h1>
  <p>Ini adalah paragraf pertama.</p>
  <p class="highlight">Teks ini harus di-highlight.</p>
</body>
</html>`,
    starterCSS: `/* Tulis CSS di sini */
`,
    starterJS: `console.log('CSS loaded!');`,
    validationRules: [
      { type: 'contains', value: 'color:', message: 'Tambahkan property color pada CSS' },
      { type: 'contains', value: 'blue', message: 'Ubah warna h1 menjadi blue' },
      { type: 'contains', value: 'font-size', message: 'Tambahkan font-size pada paragraf' },
      { type: 'contains', value: 'background-color', message: 'Tambahkan background-color pada body' },
      { type: 'contains', value: '.highlight', message: 'Buat selector class .highlight' },
    ],
  },
  {
    id: 'css-02',
    title: 'Box Model',
    moduleId: 'css-styling',
    order: 2,
    theory: `# CSS Box Model

Setiap elemen HTML dianggap sebagai sebuah "kotak" (box) yang terdiri dari:

1. **Content** - Isi elemen
2. **Padding** - Ruang antara content dan border
3. **Border** - Garis tepi elemen
4. **Margin** - Ruang di luar border

## Properties

\`\`\`css
.box {
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}
\`\`\``,
    instructions: `Terapkan Box Model pada card:

1. Beri \`padding: 20px\` pada \`.card\`
2. Tambahkan \`border: 2px solid #007AFF\`
3. Beri \`margin: 16px\`
4. Tambahkan \`border-radius: 12px\` untuk sudut melengkung`,
    hints: [
      'Padding menambah ruang di dalam elemen',
      'Border membutuhkan 3 nilai: lebar, jenis, warna',
      'border-radius membuat sudut melengkung',
    ],
    expectedOutput: 'Card dengan padding, border biru, margin, dan sudut melengkung',
    successMessage: '📦 Bagus! Kamu sudah paham Box Model CSS!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>Box Model</title></head>
<body>
  <div class="card">
    <h2>Card Title</h2>
    <p>Ini adalah konten dalam card.</p>
  </div>
</body>
</html>`,
    starterCSS: `/* Styling card dengan Box Model */
body {
  font-family: 'Inter', sans-serif;
  background: #f5f5f7;
}

.card {
  background: white;
  /* Tambahkan padding, border, margin, dan border-radius */
  
}`,
    starterJS: `console.log('Box Model loaded!');`,
    validationRules: [
      { type: 'contains', value: 'padding', message: 'Tambahkan padding pada .card' },
      { type: 'contains', value: 'border:', message: 'Tambahkan border pada .card' },
      { type: 'contains', value: 'margin', message: 'Tambahkan margin pada .card' },
      { type: 'contains', value: 'border-radius', message: 'Tambahkan border-radius untuk sudut melengkung' },
    ],
  },
  {
    id: 'css-03',
    title: 'Flexbox Layout',
    moduleId: 'css-styling',
    order: 3,
    theory: `# Flexbox Layout

Flexbox adalah cara modern untuk mengatur layout di CSS.

## Container Properties

- \`display: flex\` — Aktifkan flexbox
- \`justify-content\` — Atur posisi horizontal
- \`align-items\` — Atur posisi vertikal
- \`gap\` — Jarak antar item

## Nilai justify-content

| Nilai | Efek |
|-------|------|
| \`center\` | Di tengah |
| \`space-between\` | Jarak merata |
| \`space-around\` | Jarak merata + padding |`,
    instructions: `Buat layout navigasi dengan Flexbox:

1. Beri \`display: flex\` pada \`.navbar\`
2. Gunakan \`justify-content: space-between\`
3. Gunakan \`align-items: center\`
4. Tambahkan \`gap: 16px\` pada \`.nav-links\``,
    hints: [
      'Aktifkan flexbox dengan display: flex',
      'justify-content mengatur posisi horizontal',
      'align-items: center untuk vertikal tengah',
    ],
    expectedOutput: 'Navbar dengan logo di kiri dan links di kanan, rata tengah vertikal',
    successMessage: '💪 Keren! Flexbox adalah skill CSS yang sangat penting!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>Flexbox</title></head>
<body>
  <nav class="navbar">
    <div class="logo">CodeLearn</div>
    <div class="nav-links">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </div>
  </nav>
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  margin: 0;
}

.navbar {
  background: #1a1a2e;
  color: white;
  padding: 16px 24px;
  /* Tambahkan flexbox di sini */
  
}

.nav-links {
  /* Tambahkan flex dan gap di sini */
  
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
}`,
    starterJS: `console.log('Flexbox loaded!');`,
    validationRules: [
      { type: 'contains', value: 'display: flex', message: 'Tambahkan display: flex pada .navbar' },
      { type: 'contains', value: 'justify-content', message: 'Tambahkan justify-content pada .navbar' },
      { type: 'contains', value: 'align-items', message: 'Tambahkan align-items pada .navbar' },
      { type: 'contains', value: 'gap', message: 'Tambahkan gap pada .nav-links' },
    ],
  },
];

/** JavaScript Fundamentals exercises */
export const jsFundamentalsExercises: ExerciseWithValidation[] = [
  {
    id: 'js-01',
    title: 'Variabel dan Tipe Data',
    moduleId: 'js-fundamentals',
    order: 1,
    theory: `# Variabel dan Tipe Data

JavaScript memiliki beberapa cara untuk mendeklarasikan variabel:

- **\`let\`** — Variabel yang bisa diubah
- **\`const\`** — Variabel tetap (tidak bisa diubah)
- **\`var\`** — Cara lama (hindari)

## Tipe Data

| Tipe | Contoh |
|------|--------|
| String | \`"Hello"\` |
| Number | \`42\`, \`3.14\` |
| Boolean | \`true\`, \`false\` |
| Array | \`[1, 2, 3]\` |
| Object | \`{ nama: "Ali" }\` |`,
    instructions: `Latihan variabel dan tipe data:

1. Buat variabel \`const nama\` berisi nama kamu (string)
2. Buat variabel \`let umur\` berisi umur kamu (number)
3. Buat variabel \`const isStudent\` bernilai \`true\`
4. Tampilkan semua variabel dengan \`console.log\``,
    hints: [
      'Gunakan const untuk nilai yang tidak berubah',
      'String harus diapit tanda kutip',
      'console.log() untuk menampilkan output',
    ],
    expectedOutput: 'Console menampilkan nama, umur, dan status siswa',
    successMessage: '🎯 Mantap! Kamu sudah paham variabel dan tipe data!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>Variabel JS</title></head>
<body>
  <h1>Variabel dan Tipe Data</h1>
  <p>Buka console untuk melihat output (F12)</p>
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
  text-align: center;
}`,
    starterJS: `// Tulis variabel di sini

`,
    validationRules: [
      { type: 'contains', value: 'const nama', message: 'Buat variabel const nama' },
      { type: 'contains', value: 'let umur', message: 'Buat variabel let umur' },
      { type: 'contains', value: 'const isStudent', message: 'Buat variabel const isStudent' },
      { type: 'contains', value: 'true', message: 'Set isStudent ke true' },
      { type: 'contains', value: 'console.log', message: 'Tampilkan variabel dengan console.log' },
    ],
  },
  {
    id: 'js-02',
    title: 'Fungsi (Function)',
    moduleId: 'js-fundamentals',
    order: 2,
    theory: `# Fungsi di JavaScript

Fungsi adalah blok kode yang bisa dipanggil berulang kali.

## Deklarasi Fungsi

\`\`\`javascript
function sapa(nama) {
  return "Halo, " + nama + "!";
}
\`\`\`

## Arrow Function

\`\`\`javascript
const sapa = (nama) => "Halo, " + nama + "!";
\`\`\`

## Template Literal

\`\`\`javascript
const sapa = (nama) => \`Halo, \${nama}!\`;
\`\`\``,
    instructions: `Buat fungsi-fungsi berikut:

1. Fungsi \`tambah(a, b)\` yang mengembalikan hasil penjumlahan
2. Fungsi \`spiSlicaa(nama)\` yang mengembalikan \`"Halo, [nama]!"\`
3. Panggil kedua fungsi dan tampilkan hasilnya dengan \`console.log\``,
    hints: [
      'Gunakan return untuk mengembalikan nilai',
      'Bisa pakai function biasa atau arrow function',
      'Template literal menggunakan backtick (`)',
    ],
    expectedOutput: 'Console menampilkan hasil penjumlahan dan sapaan',
    successMessage: '⚡ Luar biasa! Fungsi adalah dasar programming yang penting!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>Fungsi JS</title></head>
<body>
  <h1>Belajar Fungsi</h1>
  <p>Buka console untuk melihat output</p>
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
  text-align: center;
}`,
    starterJS: `// Buat fungsi tambah

// Buat fungsi sapa

// Panggil fungsi dan tampilkan hasilnya
`,
    validationRules: [
      { type: 'contains', value: 'function', message: 'Buat fungsi menggunakan keyword function' },
      { type: 'contains', value: 'return', message: 'Gunakan return untuk mengembalikan nilai' },
      { type: 'contains', value: 'tambah', message: 'Buat fungsi bernama tambah' },
      { type: 'contains', value: 'console.log', message: 'Tampilkan hasil dengan console.log' },
    ],
  },
  {
    id: 'js-03',
    title: 'Kondisional (If/Else)',
    moduleId: 'js-fundamentals',
    order: 3,
    theory: `# Kondisional

Kondisional digunakan untuk membuat keputusan dalam kode.

## If / Else

\`\`\`javascript
if (nilai >= 80) {
  console.log("Lulus!");
} else if (nilai >= 60) {
  console.log("Cukup");
} else {
  console.log("Belum lulus");
}
\`\`\`

## Operator Perbandingan

| Operator | Fungsi |
|----------|--------|
| \`===\` | Sama dengan |
| \`!==\` | Tidak sama |
| \`>\` \`<\` | Lebih/kurang dari |
| \`>=\` \`<=\` | Lebih/kurang sama dengan |`,
    instructions: `Buat sistem grading:

1. Buat variabel \`const nilai\` dengan angka antara 0-100
2. Gunakan \`if/else if/else\` untuk menentukan grade:
   - >= 90: "A"
   - >= 80: "B"  
   - >= 70: "C"
   - < 70: "D"
3. Tampilkan grade dengan \`console.log\``,
    hints: [
      'Mulai dari kondisi terbesar (>= 90) ke terkecil',
      'Gunakan else if untuk kondisi tambahan',
      'Jangan lupa else untuk kondisi terakhir',
    ],
    expectedOutput: 'Console menampilkan grade berdasarkan nilai',
    successMessage: '🧠 Pintar! Kondisional membuat programmu bisa mengambil keputusan!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>Kondisional</title></head>
<body>
  <h1>Sistem Grading</h1>
  <p>Buka console untuk melihat grade</p>
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
  text-align: center;
}`,
    starterJS: `// Buat variabel nilai

// Tentukan grade dengan if/else

`,
    validationRules: [
      { type: 'contains', value: 'const nilai', message: 'Buat variabel const nilai' },
      { type: 'contains', value: 'if', message: 'Gunakan statement if' },
      { type: 'contains', value: 'else', message: 'Tambahkan else untuk kondisi lain' },
      { type: 'contains', value: 'console.log', message: 'Tampilkan grade dengan console.log' },
    ],
  },
];

/** DOM Manipulation exercises */
export const domManipulationExercises: ExerciseWithValidation[] = [
  {
    id: 'dom-01',
    title: 'Memilih Elemen (querySelector)',
    moduleId: 'dom-manipulation',
    order: 1,
    theory: `# Memilih Elemen DOM

DOM (Document Object Model) memungkinkan JavaScript mengakses dan mengubah elemen HTML.

## Metode Seleksi

\`\`\`javascript
// Satu elemen
const el = document.querySelector('.class');
const el2 = document.getElementById('id');

// Banyak elemen
const els = document.querySelectorAll('p');
\`\`\`

## Mengubah Konten

\`\`\`javascript
el.textContent = 'Teks baru';
el.innerHTML = '<b>HTML baru</b>';
el.style.color = 'red';
\`\`\``,
    instructions: `Manipulasi elemen HTML:

1. Gunakan \`document.querySelector\` untuk memilih elemen \`#judul\`
2. Ubah \`textContent\`-nya menjadi "DOM Manipulation Berhasil!"
3. Ubah \`style.color\` menjadi \`"#007AFF"\`
4. Pilih elemen \`.deskripsi\` dan ubah teksnya`,
    hints: [
      'querySelector menggunakan CSS selector',
      'textContent mengubah teks elemen',
      'style.color mengubah warna teks',
    ],
    expectedOutput: 'Judul berubah teks dan warna, deskripsi berubah',
    successMessage: '🔮 Keren! Kamu bisa mengontrol halaman web dengan JavaScript!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>DOM</title></head>
<body>
  <h1 id="judul">Judul Awal</h1>
  <p class="deskripsi">Deskripsi awal.</p>
  <button id="btn">Klik</button>
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
  text-align: center;
}`,
    starterJS: `// Pilih dan manipulasi elemen di sini

`,
    validationRules: [
      { type: 'contains', value: 'document.querySelector', message: 'Gunakan document.querySelector untuk memilih elemen' },
      { type: 'contains', value: 'textContent', message: 'Ubah textContent elemen' },
      { type: 'contains', value: 'style.color', message: 'Ubah style.color elemen' },
      { type: 'contains', value: '.deskripsi', message: 'Pilih elemen .deskripsi' },
    ],
  },
  {
    id: 'dom-02',
    title: 'Event Listener',
    moduleId: 'dom-manipulation',
    order: 2,
    theory: `# Event Listener

Event listener mendeteksi aksi user seperti klik, hover, input, dll.

## addEventListener

\`\`\`javascript
const button = document.querySelector('#btn');
button.addEventListener('click', () => {
  alert('Button diklik!');
});
\`\`\`

## Event Umum

| Event | Trigger |
|-------|-------|
| \`click\` | Elemen diklik |
| \`mouseover\` | Mouse hover |
| \`keydown\` | Tombol ditekan |
| \`input\` | Input berubah |`,
    instructions: `Tambahkan interaktivitas:

1. Pilih button dengan id \`"tombol"\`
2. Tambahkan \`addEventListener\` untuk event \`'click'\`
3. Saat diklik, ubah teks \`#output\` menjadi "Tombol berhasil diklik!"
4. Ubah juga warna background \`#output\` menjadi hijau (\`"#34C759"\`)`,
    hints: [
      'addEventListener menerima 2 argumen: nama event dan callback',
      'Gunakan arrow function untuk callback',
      'style.backgroundColor untuk mengubah background',
    ],
    expectedOutput: 'Saat button diklik, teks dan warna output berubah',
    successMessage: '🖱️ Mantap! Event listener membuat web-mu interaktif!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>Event Listener</title></head>
<body>
  <h1>Event Listener</h1>
  <button id="tombol">Klik Saya!</button>
  <div id="output" style="padding: 20px; margin-top: 16px; border-radius: 8px; background: #f0f0f0;">
    Menunggu klik...
  </div>
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
  text-align: center;
}
button {
  padding: 12px 24px;
  font-size: 16px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}`,
    starterJS: `// Tambahkan event listener di sini

`,
    validationRules: [
      { type: 'contains', value: 'addEventListener', message: 'Gunakan addEventListener' },
      { type: 'contains', value: "'click'", message: "Dengarkan event 'click'" },
      { type: 'contains', value: 'textContent', message: 'Ubah textContent saat diklik' },
      { type: 'contains', value: '#34C759', message: 'Ubah background menjadi hijau (#34C759)' },
    ],
  },
  {
    id: 'dom-03',
    title: 'Membuat Elemen Baru',
    moduleId: 'dom-manipulation',
    order: 3,
    theory: `# Membuat dan Menambah Elemen

JavaScript bisa membuat elemen HTML baru secara dinamis.

## createElement & appendChild

\`\`\`javascript
const newP = document.createElement('p');
newP.textContent = 'Paragraf baru';
newP.className = 'highlight';
document.body.appendChild(newP);
\`\`\`

## innerHTML

\`\`\`javascript
container.innerHTML += '<p>Paragraf baru</p>';
\`\`\``,
    instructions: `Buat elemen baru secara dinamis:

1. Gunakan \`document.createElement\` untuk membuat elemen \`li\`
2. Set \`textContent\` menjadi "Item dari JavaScript"
3. Tambahkan \`className\` \"new-item\"
4. Gunakan \`appendChild\` untuk menambahkan ke \`#daftar\``,
    hints: [
      'createElement membuat elemen baru di memori',
      'appendChild menambahkan elemen ke dalam parent',
      'className menambah class CSS pada elemen',
    ],
    expectedOutput: 'List bertambah satu item baru dari JavaScript',
    successMessage: '🏗️ Luar biasa! Kamu bisa membuat halaman web yang dinamis!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>Membuat Elemen</title></head>
<body>
  <h1>Daftar Belanja</h1>
  <ul id="daftar">
    <li>Susu</li>
    <li>Roti</li>
    <li>Telur</li>
  </ul>
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}
li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.new-item {
  color: #007AFF;
  font-weight: bold;
}`,
    starterJS: `// Buat elemen baru di sini

`,
    validationRules: [
      { type: 'contains', value: 'document.createElement', message: 'Gunakan document.createElement' },
      { type: 'contains', value: 'textContent', message: 'Set textContent pada elemen baru' },
      { type: 'contains', value: 'className', message: 'Tambahkan className pada elemen' },
      { type: 'contains', value: 'appendChild', message: 'Gunakan appendChild untuk menambahkan elemen' },
    ],
  },
];

/** Responsive Design exercises */
export const responsiveDesignExercises: ExerciseWithValidation[] = [
  {
    id: 'resp-01',
    title: 'Media Queries',
    moduleId: 'responsive-design',
    order: 1,
    theory: `# Media Queries

Media queries memungkinkan CSS berubah berdasarkan ukuran layar.

## Sintaks

\`\`\`css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
\`\`\`

## Breakpoint Umum

| Breakpoint | Perangkat |
|-----------|----------|
| 480px | Mobile |
| 768px | Tablet |
| 1024px | Desktop kecil |
| 1280px | Desktop besar |`,
    instructions: `Buat layout responsif:

1. Buat \`@media\` query untuk \`max-width: 768px\`
2. Ubah \`font-size\` heading menjadi \`24px\` pada mobile
3. Ubah \`.container\` menjadi \`flex-direction: column\`
4. Gunakan \`padding: 16px\` pada body untuk mobile`,
    hints: [
      '@media harus diletakkan di luar selector biasa',
      'max-width berarti "jika layar lebih kecil dari"',
      'flex-direction: column menumpuk elemen vertikal',
    ],
    expectedOutput: 'Layout berubah menjadi vertikal pada layar kecil',
    successMessage: '📱 Hebat! Website-mu sekarang responsif di semua perangkat!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>Responsive</title></head>
<body>
  <h1>Responsive Design</h1>
  <div class="container">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
  </div>
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  padding: 40px;
}

h1 {
  font-size: 36px;
  text-align: center;
}

.container {
  display: flex;
  gap: 16px;
}

.card {
  flex: 1;
  padding: 20px;
  background: #f0f0f5;
  border-radius: 12px;
  text-align: center;
}

/* Tambahkan media query di bawah ini */
`,
    starterJS: `console.log('Responsive loaded!');`,
    validationRules: [
      { type: 'contains', value: '@media', message: 'Tambahkan @media query' },
      { type: 'contains', value: 'max-width', message: 'Gunakan max-width dalam media query' },
      { type: 'contains', value: 'flex-direction', message: 'Ubah flex-direction di media query' },
      { type: 'contains', value: 'column', message: 'Gunakan flex-direction: column untuk mobile' },
    ],
  },
  {
    id: 'resp-02',
    title: 'Responsive Grid',
    moduleId: 'responsive-design',
    order: 2,
    theory: `# CSS Grid untuk Responsive Layout

CSS Grid membuat layout grid yang kuat dan fleksibel.

## Grid Dasar

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
\`\`\`

## Auto-fit & minmax

\`\`\`css
.grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
\`\`\`

Ini membuat kolom otomatis menyesuaikan layar — tanpa media query!`,
    instructions: `Buat gallery responsif dengan Grid:

1. Beri \`display: grid\` pada \`.gallery\`
2. Gunakan \`grid-template-columns\` dengan \`repeat\` dan \`auto-fit\`
3. Gunakan \`minmax(200px, 1fr)\` agar responsif
4. Tambahkan \`gap: 16px\``,
    hints: [
      'display: grid mengaktifkan CSS Grid',
      'auto-fit otomatis menyesuaikan jumlah kolom',
      'minmax(200px, 1fr) membuat kolom minimal 200px',
    ],
    expectedOutput: 'Gallery dengan grid responsif yang otomatis menyesuaikan layar',
    successMessage: '🎯 Grid CSS membuat layout responsif jadi sangat mudah!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>Grid</title></head>
<body>
  <h1>Photo Gallery</h1>
  <div class="gallery">
    <div class="item" style="background: #FF6B6B;">1</div>
    <div class="item" style="background: #4ECDC4;">2</div>
    <div class="item" style="background: #45B7D1;">3</div>
    <div class="item" style="background: #96CEB4;">4</div>
    <div class="item" style="background: #FFEAA7;">5</div>
    <div class="item" style="background: #DDA0DD;">6</div>
  </div>
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
}

h1 { text-align: center; }

.gallery {
  /* Tambahkan grid di sini */
  
}

.item {
  height: 150px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}`,
    starterJS: `console.log('Grid loaded!');`,
    validationRules: [
      { type: 'contains', value: 'display: grid', message: 'Tambahkan display: grid' },
      { type: 'contains', value: 'grid-template-columns', message: 'Tambahkan grid-template-columns' },
      { type: 'contains', value: 'auto-fit', message: 'Gunakan auto-fit untuk responsif' },
      { type: 'contains', value: 'gap', message: 'Tambahkan gap antar item' },
    ],
  },
  {
    id: 'resp-03',
    title: 'Responsive Units',
    moduleId: 'responsive-design',
    order: 3,
    theory: `# Unit Responsif

Gunakan unit relatif agar elemen menyesuaikan ukuran layar.

## Unit Relatif

| Unit | Relasi |
|------|--------|
| \`%\` | Relatif terhadap parent |
| \`em\` | Relatif terhadap font-size parent |
| \`rem\` | Relatif terhadap font-size root |
| \`vw\` | 1% dari lebar viewport |
| \`vh\` | 1% dari tinggi viewport |

## Contoh

\`\`\`css
.hero {
  height: 100vh;
  font-size: 4vw;
  padding: 2rem;
  width: 90%;
}
\`\`\``,
    instructions: `Gunakan unit responsif:

1. Beri \`.hero\` tinggi \`100vh\` (full viewport)
2. Gunakan \`font-size\` dalam \`rem\` (misalnya \`2rem\`)
3. Beri \`max-width: 90%\` pada \`.content\`
4. Gunakan \`padding\` dalam \`rem\``,
    hints: [
      '100vh = full tinggi layar',
      'rem lebih konsisten daripada em',
      'max-width: 90% mencegah konten terlalu lebar',
    ],
    expectedOutput: 'Hero section full viewport, teks responsif',
    successMessage: '📐 Sempurna! Unit responsif membuat layout fleksibel!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>Responsive Units</title></head>
<body>
  <section class="hero">
    <div class="content">
      <h1>Welcome</h1>
      <p>Belajar menggunakan unit responsif untuk layout yang sempurna.</p>
    </div>
  </section>
</body>
</html>`,
    starterCSS: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', sans-serif;
}

.hero {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Tambahkan height, font-size, padding dalam unit responsif */
  
}

.content {
  text-align: center;
  /* Tambahkan max-width */
  
}`,
    starterJS: `console.log('Responsive units loaded!');`,
    validationRules: [
      { type: 'contains', value: 'vh', message: 'Gunakan unit vh untuk tinggi viewport' },
      { type: 'contains', value: 'rem', message: 'Gunakan unit rem untuk ukuran responsif' },
      { type: 'contains', value: 'max-width', message: 'Tambahkan max-width pada .content' },
      { type: 'contains', value: '%', message: 'Gunakan persentase (%) untuk max-width' },
    ],
  },
];

/** JavaScript Advanced exercises */
export const jsAdvancedExercises: ExerciseWithValidation[] = [
  {
    id: 'jsadv-01',
    title: 'Array Methods',
    moduleId: 'js-advanced',
    order: 1,
    theory: `# Array Methods Modern

JavaScript menyediakan method yang powerful untuk memanipulasi array.

## Method Utama

\`\`\`javascript
const angka = [1, 2, 3, 4, 5];

// map — transformasi setiap elemen
const ganda = angka.map(n => n * 2);

// filter — saring elemen
const genap = angka.filter(n => n % 2 === 0);

// reduce — akumulasi nilai
const total = angka.reduce((sum, n) => sum + n, 0);

// find — cari satu elemen
const found = angka.find(n => n > 3);
\`\`\``,
    instructions: `Latihan array methods:

1. Buat array \`const nilai\` berisi angka \`[85, 92, 78, 96, 88, 72, 95]\`
2. Gunakan \`.filter()\` untuk menyaring nilai >= 80
3. Gunakan \`.map()\` untuk membuat array grade (A/B/C)
4. Gunakan \`.reduce()\` untuk menghitung rata-rata
5. Tampilkan semua hasil dengan \`console.log\``,
    hints: [
      'filter menerima function yang mengembalikan true/false',
      'map menerima function yang mengembalikan nilai baru',
      'reduce menerima accumulator dan current value',
    ],
    expectedOutput: 'Console menampilkan array filter, map, dan reduce',
    successMessage: '🚀 Array methods adalah senjata utama developer JavaScript!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>Array Methods</title></head>
<body>
  <h1>Array Methods</h1>
  <p>Buka console untuk melihat hasil</p>
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
  text-align: center;
}`,
    starterJS: `// Buat array dan gunakan array methods

`,
    validationRules: [
      { type: 'contains', value: 'const nilai', message: 'Buat array const nilai' },
      { type: 'contains', value: '.filter(', message: 'Gunakan .filter() untuk menyaring' },
      { type: 'contains', value: '.map(', message: 'Gunakan .map() untuk transformasi' },
      { type: 'contains', value: '.reduce(', message: 'Gunakan .reduce() untuk akumulasi' },
      { type: 'contains', value: 'console.log', message: 'Tampilkan hasil dengan console.log' },
    ],
  },
  {
    id: 'jsadv-02',
    title: 'Destructuring & Spread',
    moduleId: 'js-advanced',
    order: 2,
    theory: `# Destructuring & Spread Operator

## Object Destructuring

\`\`\`javascript
const user = { nama: 'Ali', umur: 25, kota: 'Jakarta' };
const { nama, umur } = user;
\`\`\`

## Array Destructuring

\`\`\`javascript
const [pertama, kedua, ...sisanya] = [1, 2, 3, 4, 5];
\`\`\`

## Spread Operator

\`\`\`javascript
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }
\`\`\``,
    instructions: `Latihan destructuring dan spread:

1. Buat object \`const siswa\` dengan \`nama\`, \`kelas\`, dan \`nilai\`
2. Destructure object: \`const { nama, kelas, nilai } = siswa\`
3. Buat array baru dengan spread: \`const semuaNilai = [...nilaiLama, ...nilaiBaru]\`
4. Buat object baru dengan spread yang menambah property \`lulus: true\`
5. Tampilkan semua dengan \`console.log\``,
    hints: [
      'Destructuring menggunakan { } untuk object dan [ ] untuk array',
      'Spread operator menggunakan tiga titik (...)',
      'Spread bisa dipakai untuk menggabung array atau object',
    ],
    expectedOutput: 'Console menampilkan hasil destructuring dan spread',
    successMessage: '✨ Destructuring dan spread membuat kode jadi bersih dan elegan!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>Destructuring</title></head>
<body>
  <h1>Destructuring & Spread</h1>
  <p>Buka console untuk melihat hasil</p>
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
  text-align: center;
}`,
    starterJS: `// Latihan destructuring dan spread

`,
    validationRules: [
      { type: 'contains', value: 'const siswa', message: 'Buat object const siswa' },
      { type: 'regex', value: /const\s*\{.*\}\s*=/, message: 'Gunakan object destructuring' },
      { type: 'contains', value: '...', message: 'Gunakan spread operator (...)' },
      { type: 'contains', value: 'console.log', message: 'Tampilkan hasil dengan console.log' },
    ],
  },
  {
    id: 'jsadv-03',
    title: 'Async/Await & Promises',
    moduleId: 'js-advanced',
    order: 3,
    theory: `# Async/Await & Promises

Kode asynchronous memungkinkan JavaScript menjalankan tugas tanpa memblok eksekusi.

## Promise

\`\`\`javascript
const janji = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Selesai!'), 1000);
});
\`\`\`

## Async/Await

\`\`\`javascript
async function ambilData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}
\`\`\`

## Try/Catch

\`\`\`javascript
async function aman() {
  try {
    const data = await ambilData();
  } catch (error) {
    console.error('Gagal:', error);
  }
}
\`\`\``,
    instructions: `Latihan async programming:

1. Buat fungsi \`async function ambilPesan()\`
2. Di dalamnya, buat \`new Promise\` yang resolve setelah 1 detik
3. Gunakan \`await\` untuk menunggu Promise selesai
4. Gunakan \`try/catch\` untuk error handling
5. Panggil fungsi dan tampilkan hasilnya`,
    hints: [
      'async ditaruh sebelum function',
      'await hanya bisa digunakan di dalam fungsi async',
      'try/catch untuk menangkap error',
    ],
    expectedOutput: 'Pesan muncul setelah 1 detik delay',
    successMessage: '⚡ Async/await adalah fitur paling powerful di JavaScript modern!',
    starterHTML: `<!DOCTYPE html>
<html>
<head><title>Async Await</title></head>
<body>
  <h1>Async / Await</h1>
  <p id="output">Memuat...</p>
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
  text-align: center;
}
#output {
  padding: 20px;
  background: #f0f0f5;
  border-radius: 12px;
  margin-top: 16px;
}`,
    starterJS: `// Buat fungsi async di sini

`,
    validationRules: [
      { type: 'contains', value: 'async', message: 'Gunakan keyword async' },
      { type: 'contains', value: 'await', message: 'Gunakan keyword await' },
      { type: 'contains', value: 'Promise', message: 'Buat new Promise' },
      { type: 'contains', value: 'try', message: 'Gunakan try/catch untuk error handling' },
      { type: 'contains', value: 'catch', message: 'Tambahkan catch untuk menangkap error' },
    ],
  },
];

/** Get exercises by module ID */
export const getExercisesByModule = (moduleId: string): ExerciseWithValidation[] => {
  const allExercises: Record<string, ExerciseWithValidation[]> = {
    'html-basics': htmlBasicsExercises,
    'css-styling': cssStylingExercises,
    'js-fundamentals': jsFundamentalsExercises,
    'dom-manipulation': domManipulationExercises,
    'responsive-design': responsiveDesignExercises,
    'js-advanced': jsAdvancedExercises,
  };
  return allExercises[moduleId] || [];
};

/** Get exercise by ID */
export const getExerciseById = (exerciseId: string): ExerciseWithValidation | undefined => {
  const allExercises = [
    ...htmlBasicsExercises,
    ...cssStylingExercises,
    ...jsFundamentalsExercises,
    ...domManipulationExercises,
    ...responsiveDesignExercises,
    ...jsAdvancedExercises,
  ];
  return allExercises.find(e => e.id === exerciseId);
};

/** Get next exercise */
export const getNextExercise = (currentId: string, moduleId: string): ExerciseWithValidation | null => {
  const exercises = getExercisesByModule(moduleId);
  const currentIndex = exercises.findIndex(e => e.id === currentId);
  return exercises[currentIndex + 1] || null;
};

/** Get previous exercise */
export const getPreviousExercise = (currentId: string, moduleId: string): ExerciseWithValidation | null => {
  const exercises = getExercisesByModule(moduleId);
  const currentIndex = exercises.findIndex(e => e.id === currentId);
  return exercises[currentIndex - 1] || null;
};
