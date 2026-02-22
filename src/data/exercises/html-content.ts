/**
 * HTML Content & Formatting Exercises
 * @module data/exercises/html-content
 * 
 * Modul 2: Konten & Formatting HTML — Formatting, Comments, Colors, Styles, Quotations
 */

import type { ExerciseWithValidation } from './types';

export const htmlContentExercises: ExerciseWithValidation[] = [
  {
    id: 'html-content-01',
    title: 'Formatting Teks',
    moduleId: 'html-content',
    order: 1,
    theory: `# Formatting Teks HTML

HTML menyediakan banyak tag untuk memformat teks:

## Tag Formatting Umum

| Tag | Fungsi | Contoh |
|-----|--------|--------|
| \`<b>\` | Teks tebal (visual) | <b>Tebal</b> |
| \`<strong>\` | Teks tebal (penting/semantik) | <strong>Penting</strong> |
| \`<i>\` | Teks miring (visual) | <i>Miring</i> |
| \`<em>\` | Teks miring (penekanan) | <em>Ditekankan</em> |
| \`<u>\` | Teks bergaris bawah | <u>Garis bawah</u> |
| \`<s>\` | Teks dicoret | <s>Dicoret</s> |
| \`<mark>\` | Teks disorot kuning | <mark>Disorot</mark> |
| \`<small>\` | Teks lebih kecil | <small>Kecil</small> |
| \`<sub>\` | Subscript (bawah) | H<sub>2</sub>O |
| \`<sup>\` | Superscript (atas) | x<sup>2</sup> |

## Perbedaan \`<b>\` vs \`<strong>\`
- \`<b>\` hanya mengubah tampilan (visual)
- \`<strong>\` menandakan teks **penting secara semantik** (direkomendasikan)`,
    instructions: `Buat halaman yang menunjukkan berbagai formatting teks:

1. Buat \`<h1>\` dengan teks "Formatting Teks HTML"
2. Buat paragraf dengan teks \`<strong>\` (tebal penting)
3. Buat paragraf dengan teks \`<em>\` (miring/penekanan)
4. Buat paragraf dengan teks \`<mark>\` (highlight)
5. Buat paragraf yang mengandung \`<sub>\` dan \`<sup>\`, contoh: "H2O" dan "x2"
6. Buat paragraf dengan teks \`<s>\` (dicoret)`,
    hints: [
      '<strong> digunakan di dalam teks, misal: <p>Ini <strong>penting</strong></p>',
      'Untuk H₂O gunakan: H<sub>2</sub>O',
      'Untuk x² gunakan: x<sup>2</sup>',
    ],
    expectedOutput: 'Halaman dengan berbagai format teks: tebal, miring, highlight, subscript, superscript, coret',
    starterHTML: `<!-- Praktekkan formatting teks di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<strong>', message: 'Gunakan tag <strong> untuk teks tebal penting' },
      { type: 'contains', value: '<em>', message: 'Gunakan tag <em> untuk penekanan' },
      { type: 'contains', value: '<mark>', message: 'Gunakan tag <mark> untuk highlight' },
      { type: 'contains', value: '<sub>', message: 'Gunakan tag <sub> untuk subscript' },
      { type: 'contains', value: '<sup>', message: 'Gunakan tag <sup> untuk superscript' },
      { type: 'contains', value: '<s>', message: 'Gunakan tag <s> untuk teks dicoret' },
    ],
    successMessage: '🎉 Kamu sudah menguasai formatting teks HTML!',
  },
  {
    id: 'html-content-02',
    title: 'Komentar HTML',
    moduleId: 'html-content',
    order: 2,
    theory: `# Komentar HTML

Komentar digunakan untuk **menambahkan catatan** dalam kode yang **tidak ditampilkan** di browser.

## Sintaks

\`\`\`html
<!-- Ini adalah komentar -->
\`\`\`

## Kegunaan Komentar

1. **Dokumentasi** — Menjelaskan bagian kode
2. **Debugging** — Menyembunyikan kode sementara
3. **Penanda** — Menandai bagian-bagian halaman

## Contoh

\`\`\`html
<!-- Header Section -->
<header>
  <h1>Website</h1>
</header>

<!-- Paragraf ini di-disable sementara
<p>Teks ini tidak akan muncul</p>
-->

<!-- TODO: Tambahkan navigasi -->
\`\`\`

## Tips
- Komentar bisa **satu baris** atau **multi-baris**
- Komentar **tidak bisa nested** (komentar di dalam komentar)
- Gunakan komentar secukupnya, jangan berlebihan`,
    instructions: `Buat halaman HTML yang menggunakan komentar dengan baik:

1. Tambahkan komentar \`<!-- Header -->\` sebelum bagian header
2. Buat \`<h1>\` dengan teks "Website Saya"
3. Tambahkan komentar \`<!-- Konten Utama -->\` sebelum konten
4. Buat \`<p>\` dengan teks apa saja
5. Buat komentar multi-baris yang menyembunyikan sebuah \`<p>\`
6. Tambahkan komentar \`<!-- Footer -->\` dan buat \`<footer>\` dengan teks`,
    hints: [
      'Komentar dimulai dengan <!-- dan diakhiri dengan -->',
      'Untuk menyembunyikan kode, bungkus dengan komentar: <!-- <p>tersembunyi</p> -->',
      'Komentar multi-baris bisa mencakup beberapa baris kode',
    ],
    expectedOutput: 'Halaman dengan komentar penanda section dan kode yang di-comment out',
    starterHTML: `<!-- Gunakan komentar HTML dengan baik -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<!-- Header -->', message: 'Tambahkan komentar <!-- Header -->' },
      { type: 'contains', value: '<h1>', message: 'Tambahkan tag <h1>' },
      { type: 'contains', value: '<!-- Konten Utama -->', message: 'Tambahkan komentar <!-- Konten Utama -->' },
      { type: 'contains', value: '<!-- Footer -->', message: 'Tambahkan komentar <!-- Footer -->' },
      { type: 'contains', value: '<footer>', message: 'Tambahkan tag <footer>' },
    ],
    successMessage: '🎉 Bagus! Kamu sudah tahu cara menggunakan komentar HTML!',
  },
  {
    id: 'html-content-03',
    title: 'Warna di HTML',
    moduleId: 'html-content',
    order: 3,
    theory: `# Warna di HTML

Ada 3 cara utama menentukan warna di HTML/CSS:

## 1. Nama Warna
HTML mendukung 140+ nama warna:
\`\`\`html
<p style="color: red;">Merah</p>
<p style="color: tomato;">Tomat</p>
\`\`\`

## 2. Kode HEX
Format: \`#RRGGBB\` (00-FF per komponen)
\`\`\`html
<p style="color: #FF0000;">Merah</p>
<p style="color: #00FF00;">Hijau</p>
<p style="color: #0000FF;">Biru</p>
\`\`\`

## 3. RGB
Format: \`rgb(red, green, blue)\` (0-255 per komponen)
\`\`\`html
<p style="color: rgb(255, 0, 0);">Merah</p>
<p style="background-color: rgb(0, 128, 255);">Biru</p>
\`\`\`

## 4. HSL
Format: \`hsl(hue, saturation%, lightness%)\`
- **Hue**: 0-360 (lingkaran warna)
- **Saturation**: 0%-100% (kejenuhan)
- **Lightness**: 0%-100% (kecerahan)`,
    instructions: `Buat halaman yang mendemonstrasikan berbagai format warna:

1. Buat \`<h1>\` dengan style warna menggunakan **nama warna** (misal: "tomato")
2. Buat \`<p>\` dengan style warna menggunakan **kode HEX** (misal: "#3498db")
3. Buat \`<p>\` dengan style **background-color** menggunakan **RGB**
4. Buat \`<p>\` dengan style warna menggunakan **HSL**
5. Buat \`<div>\` dengan background-color dan teks berwarna berbeda`,
    hints: [
      'Gunakan atribut style untuk menambahkan warna inline',
      'Format HEX: style="color: #FF5733;"',
      'Format RGB: style="color: rgb(52, 152, 219);"',
      'Format HSL: style="color: hsl(120, 100%, 50%);"',
    ],
    expectedOutput: 'Halaman dengan teks dan background berwarna menggunakan berbagai format warna',
    starterHTML: `<!-- Coba berbagai format warna di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'regex', value: 'style="[^"]*color[^"]*"', message: 'Gunakan atribut style dengan property color' },
      { type: 'contains', value: '#', message: 'Gunakan kode warna HEX (diawali #)' },
      { type: 'contains', value: 'rgb(', message: 'Gunakan format warna RGB' },
      { type: 'contains', value: 'hsl(', message: 'Gunakan format warna HSL' },
      { type: 'contains', value: 'background-color', message: 'Gunakan property background-color' },
    ],
    successMessage: '🎉 Kamu sudah mengerti semua format warna di HTML!',
  },
  {
    id: 'html-content-04',
    title: 'Inline Style HTML',
    moduleId: 'html-content',
    order: 4,
    theory: `# Inline Style HTML

Atribut \`style\` memungkinkan kita menambahkan CSS langsung pada elemen HTML.

## Sintaks

\`\`\`html
<tagname style="property: value;">
\`\`\`

## Property Umum

| Property | Fungsi | Contoh |
|----------|--------|--------|
| \`color\` | Warna teks | \`color: blue;\` |
| \`background-color\` | Warna latar | \`background-color: yellow;\` |
| \`font-size\` | Ukuran font | \`font-size: 20px;\` |
| \`font-family\` | Jenis font | \`font-family: Arial;\` |
| \`text-align\` | Rata teks | \`text-align: center;\` |
| \`border\` | Garis tepi | \`border: 1px solid black;\` |
| \`padding\` | Jarak dalam | \`padding: 10px;\` |
| \`margin\` | Jarak luar | \`margin: 20px;\` |

## Multiple Property

Gunakan titik koma \`;\` untuk memisahkan beberapa property:
\`\`\`html
<p style="color: white; background-color: black; padding: 10px;">
  Teks putih dengan latar hitam
</p>
\`\`\``,
    instructions: `Buat halaman yang menggunakan inline style secara kreatif:

1. Buat \`<h1>\` dengan style: \`text-align: center;\` dan \`color\` biru
2. Buat \`<p>\` dengan \`font-size: 20px;\` dan \`font-family: Arial;\`
3. Buat \`<div>\` dengan \`background-color\`, \`padding: 20px;\`, dan \`border\`
4. Di dalam div, buat \`<p>\` dengan \`text-align: center;\`
5. Buat \`<p>\` dengan margin dan warna background tertentu`,
    hints: [
      'Gabungkan beberapa property dengan titik koma, misal: style="color: blue; font-size: 20px;"',
      'border singkat: border: 2px solid #333;',
      'Padding dan margin menggunakan pixel (px)',
    ],
    expectedOutput: 'Halaman dengan berbagai elemen yang di-style secara inline',
    starterHTML: `<!-- Gunakan inline style di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: 'text-align: center', message: 'Gunakan text-align: center pada elemen' },
      { type: 'contains', value: 'font-size:', message: 'Gunakan property font-size' },
      { type: 'contains', value: 'font-family:', message: 'Gunakan property font-family' },
      { type: 'contains', value: 'background-color:', message: 'Gunakan property background-color' },
      { type: 'contains', value: 'padding:', message: 'Gunakan property padding' },
      { type: 'contains', value: 'border:', message: 'Gunakan property border' },
    ],
    successMessage: '🎉 Hebat! Kamu sudah bisa menggunakan inline style!',
  },
  {
    id: 'html-content-05',
    title: 'Quotation & Citation',
    moduleId: 'html-content',
    order: 5,
    theory: `# Quotation & Citation HTML

HTML memiliki tag khusus untuk kutipan dan referensi:

## \`<blockquote>\` — Kutipan Blok
Untuk kutipan panjang yang ditampilkan sebagai blok terpisah:
\`\`\`html
<blockquote cite="https://sumber.com">
  Pendidikan adalah senjata paling ampuh untuk mengubah dunia.
</blockquote>
\`\`\`

## \`<q>\` — Kutipan Inline
Untuk kutipan pendek di dalam teks (otomatis ditambahkan tanda kutip):
\`\`\`html
<p>Nelson Mandela berkata <q>Pendidikan adalah senjata paling ampuh</q></p>
\`\`\`

## \`<cite>\` — Judul Karya
Untuk mereferensikan judul buku, film, lagu, dll:
\`\`\`html
<p><cite>Harry Potter</cite> ditulis oleh J.K. Rowling.</p>
\`\`\`

## \`<abbr>\` — Singkatan
Menandai singkatan dengan tooltip penjelasan:
\`\`\`html
<p><abbr title="HyperText Markup Language">HTML</abbr> mudah dipelajari.</p>
\`\`\`

## \`<address>\` — Info Kontak
\`\`\`html
<address>
  Jl. Sudirman No. 1<br>
  Jakarta, Indonesia
</address>
\`\`\``,
    instructions: `Buat halaman yang menggunakan elemen kutipan dan citation:

1. Buat \`<h1>\` dengan teks "Kutipan Inspiratif"
2. Buat \`<blockquote>\` dengan kutipan panjang dan atribut \`cite\`
3. Buat \`<p>\` yang menggunakan \`<q>\` untuk kutipan inline
4. Buat \`<p>\` yang menggunakan \`<cite>\` untuk mereferensikan sebuah karya
5. Buat \`<p>\` yang menggunakan \`<abbr>\` dengan atribut \`title\`
6. Buat \`<address>\` dengan informasi kontak`,
    hints: [
      '<blockquote> biasanya diindentasi otomatis oleh browser',
      '<q> otomatis menambahkan tanda kutip',
      '<abbr title="penjelasan singkatan">SINGKATAN</abbr>',
    ],
    expectedOutput: 'Halaman dengan blockquote, kutipan inline, citation, singkatan, dan info kontak',
    starterHTML: `<!-- Gunakan tag kutipan dan citation di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<blockquote', message: 'Tambahkan tag <blockquote>' },
      { type: 'contains', value: 'cite=', message: 'Tambahkan atribut cite pada <blockquote>' },
      { type: 'contains', value: '<q>', message: 'Gunakan tag <q> untuk kutipan inline' },
      { type: 'contains', value: '<cite>', message: 'Gunakan tag <cite> untuk referensi karya' },
      { type: 'contains', value: '<abbr', message: 'Gunakan tag <abbr> untuk singkatan' },
      { type: 'contains', value: '<address>', message: 'Tambahkan tag <address> untuk info kontak' },
    ],
    successMessage: '🎉 Luar biasa! Kamu sudah menguasai tag kutipan dan citation HTML!',
  },
];
