/**
 * HTML Intro Exercises
 * @module data/exercises/html-intro
 * 
 * Modul 1: Pengenalan HTML — Struktur, Elements, Attributes, Headings, Paragraphs
 */

import type { ExerciseWithValidation } from './types';

export const htmlIntroExercises: ExerciseWithValidation[] = [
  {
    id: 'html-intro-01',
    title: 'Struktur Dasar HTML',
    moduleId: 'html-intro',
    order: 1,
    theory: `# Struktur Dasar HTML

HTML (HyperText Markup Language) adalah bahasa markup untuk membuat halaman web.

Setiap dokumen HTML memiliki struktur dasar:

- **\`<!DOCTYPE html>\`** — Memberitahu browser bahwa ini dokumen HTML5
- **\`<html>\`** — Elemen root (akar) dari halaman
- **\`<head>\`** — Berisi informasi tentang halaman (judul, meta, dll)
- **\`<title>\`** — Judul yang muncul di tab browser
- **\`<body>\`** — Berisi semua konten yang terlihat di halaman

## Contoh Struktur

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Judul Halaman</title>
  </head>
  <body>
    <p>Konten di sini</p>
  </body>
</html>
\`\`\``,
    instructions: `Buat struktur dasar HTML yang lengkap:

1. Tulis deklarasi \`<!DOCTYPE html>\`
2. Buat tag \`<html>\` sebagai pembungkus
3. Tambahkan \`<head>\` dengan \`<title>\` bertuliskan "Halaman Pertamaku"
4. Tambahkan \`<body>\` dengan sebuah paragraf \`<p>\` bertuliskan "Halo Dunia!"`,
    hints: [
      'Mulai dengan <!DOCTYPE html> di baris pertama',
      'Semua konten harus ada di dalam tag <html>',
      'Tag <title> ada di dalam <head>, bukan di <body>',
    ],
    expectedOutput: 'Halaman web dengan judul tab "Halaman Pertamaku" dan teks "Halo Dunia!"',
    starterHTML: `<!-- Tulis struktur HTML dasar di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<!DOCTYPE html>', message: 'Tambahkan deklarasi <!DOCTYPE html>' },
      { type: 'contains', value: '<html>', message: 'Tambahkan tag <html>' },
      { type: 'contains', value: '<head>', message: 'Tambahkan tag <head>' },
      { type: 'contains', value: '<title>', message: 'Tambahkan tag <title>' },
      { type: 'contains', value: 'Halaman Pertamaku', message: 'Tulis "Halaman Pertamaku" di dalam <title>' },
      { type: 'contains', value: '<body>', message: 'Tambahkan tag <body>' },
      { type: 'contains', value: '<p>', message: 'Tambahkan tag <p>' },
      { type: 'contains', value: 'Halo Dunia!', message: 'Tulis "Halo Dunia!" di dalam <p>' },
    ],
    successMessage: '🎉 Selamat! Kamu berhasil membuat struktur HTML pertamamu!',
  },
  {
    id: 'html-intro-02',
    title: 'Mengenal Elemen HTML',
    moduleId: 'html-intro',
    order: 2,
    theory: `# Elemen HTML

Elemen HTML terdiri dari **tag pembuka**, **konten**, dan **tag penutup**.

\`\`\`
<tagname>Konten di sini...</tagname>
\`\`\`

## Jenis Elemen

- **Block elements** — Memulai baris baru: \`<h1>\`, \`<p>\`, \`<div>\`
- **Inline elements** — Tidak memulai baris baru: \`<span>\`, \`<a>\`, \`<strong>\`
- **Empty elements** — Tidak punya konten: \`<br>\`, \`<hr>\`, \`<img>\`

## Nested Elements (Elemen Bersarang)

Elemen bisa mengandung elemen lain:
\`\`\`html
<div>
  <h1>Judul</h1>
  <p>Paragraf di dalam div</p>
</div>
\`\`\`

## Penting!
- Selalu tutup tag yang memiliki penutup
- Penulisan tag bersifat **case-insensitive**, tapi disarankan **huruf kecil**`,
    instructions: `Buat halaman dengan berbagai elemen HTML:

1. Buat sebuah \`<div>\` sebagai container utama
2. Di dalamnya, tambahkan \`<h1>\` dengan teks "Belajar HTML"
3. Tambahkan \`<p>\` dengan teks "HTML itu mudah dan menyenangkan"
4. Tambahkan garis pemisah \`<hr>\`
5. Tambahkan \`<p>\` lain dengan teks yang mengandung \`<strong>\` untuk teks tebal`,
    hints: [
      'Tag <div> adalah container, tutup dengan </div>',
      '<hr> adalah empty element, tidak perlu tag penutup',
      '<strong> digunakan di dalam teks paragraf, contoh: <p>Ini <strong>tebal</strong></p>',
    ],
    expectedOutput: 'Halaman dengan judul, paragraf, garis pemisah, dan teks tebal',
    starterHTML: `<!-- Buat elemen HTML di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<div>', message: 'Tambahkan tag <div>' },
      { type: 'contains', value: '<h1>', message: 'Tambahkan tag <h1>' },
      { type: 'contains', value: 'Belajar HTML', message: 'Tulis "Belajar HTML" di <h1>' },
      { type: 'contains', value: '<p>', message: 'Tambahkan tag <p>' },
      { type: 'contains', value: '<hr>', message: 'Tambahkan tag <hr>' },
      { type: 'contains', value: '<strong>', message: 'Gunakan tag <strong> untuk teks tebal' },
    ],
    successMessage: '🎉 Hebat! Kamu sudah menguasai berbagai elemen HTML!',
  },
  {
    id: 'html-intro-03',
    title: 'Atribut HTML',
    moduleId: 'html-intro',
    order: 3,
    theory: `# Atribut HTML

Atribut memberikan **informasi tambahan** tentang elemen HTML. Atribut ditulis di dalam tag pembuka.

## Format Atribut

\`\`\`html
<tag atribut="nilai">Konten</tag>
\`\`\`

## Atribut Umum

| Atribut | Fungsi | Contoh |
|---------|--------|--------|
| \`id\` | Identitas unik elemen | \`<div id="header">\` |
| \`class\` | Kelas untuk styling | \`<p class="info">\` |
| \`style\` | Inline CSS | \`<p style="color:red">\` |
| \`title\` | Tooltip saat hover | \`<p title="Tips">\` |
| \`lang\` | Bahasa dokumen | \`<html lang="id">\` |

## Atribut Khusus

- \`<a href="url">\` — Link
- \`<img src="gambar.jpg" alt="deskripsi">\` — Gambar
- \`<input type="text" placeholder="...">\` — Input`,
    instructions: `Buat halaman yang menggunakan berbagai atribut HTML:

1. Buat \`<html>\` dengan atribut \`lang="id"\`
2. Di dalam body, buat \`<h1>\` dengan atribut \`id="judul"\` dan teks "Atribut HTML"
3. Buat \`<p>\` dengan atribut \`class="deskripsi"\` dan atribut \`title="Ini tooltip"\`
4. Buat \`<p>\` dengan atribut \`style="color: blue;"\` dan teks "Teks biru"
5. Buat \`<a>\` dengan atribut \`href="https://www.google.com"\` dan teks "Kunjungi Google"`,
    hints: [
      'Atribut ditulis di dalam tag pembuka, misal: <html lang="id">',
      'Setiap elemen bisa punya beberapa atribut sekaligus',
      'Tag <a> memerlukan href untuk menentukan tujuan link',
    ],
    expectedOutput: 'Halaman dengan elemen yang memiliki id, class, style, title, dan link',
    starterHTML: `<!-- Gunakan atribut HTML di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: 'lang="id"', message: 'Tambahkan atribut lang="id" pada tag <html>' },
      { type: 'contains', value: 'id="judul"', message: 'Tambahkan atribut id="judul" pada <h1>' },
      { type: 'contains', value: 'class="deskripsi"', message: 'Tambahkan atribut class="deskripsi"' },
      { type: 'contains', value: 'title=', message: 'Tambahkan atribut title pada elemen' },
      { type: 'contains', value: 'style="color: blue;"', message: 'Tambahkan style="color: blue;" pada <p>' },
      { type: 'contains', value: 'href="https://www.google.com"', message: 'Tambahkan href ke Google pada <a>' },
    ],
    successMessage: '🎉 Kamu sudah paham cara menggunakan atribut HTML!',
  },
  {
    id: 'html-intro-04',
    title: 'Heading HTML (H1-H6)',
    moduleId: 'html-intro',
    order: 4,
    theory: `# Heading HTML

Heading digunakan untuk membuat **judul** dan **sub-judul** di halaman web.

HTML menyediakan 6 level heading:

- **\`<h1>\`** — Heading terbesar, paling penting (1 per halaman)
- **\`<h2>\`** — Sub-heading utama
- **\`<h3>\`** — Sub-sub heading
- **\`<h4>\`** sampai **\`<h6>\`** — Heading lebih kecil

## Contoh

\`\`\`html
<h1>Judul Utama</h1>
<h2>Sub Judul</h2>
<h3>Sub Sub Judul</h3>
\`\`\`

## Tips Penting

- Gunakan hanya **satu \`<h1>\`** per halaman (untuk SEO)
- Jangan loncat level, misal dari \`<h1>\` langsung ke \`<h4>\`
- Heading bukan untuk membuat teks besar — gunakan CSS untuk itu
- Search engine menggunakan heading untuk memahami struktur halaman`,
    instructions: `Buat halaman dengan hierarki heading yang benar:

1. Buat \`<h1>\` dengan teks "Belajar Web Development"
2. Buat \`<h2>\` dengan teks "HTML"
3. Buat \`<h3>\` dengan teks "Pengenalan"
4. Buat \`<p>\` dengan teks penjelasan singkat
5. Buat \`<h3>\` lagi dengan teks "Elemen Dasar"
6. Buat \`<h2>\` dengan teks "CSS"
7. Buat \`<h3>\` dengan teks "Pengenalan CSS"`,
    hints: [
      'Hanya gunakan satu <h1> di halaman',
      'H2 adalah sub-judul dari H1, H3 adalah sub-judul dari H2',
      'Tambahkan <p> di bawah heading untuk penjelasan',
    ],
    expectedOutput: 'Halaman dengan hierarki heading H1 → H2 → H3 yang terstruktur',
    starterHTML: `<!-- Buat hierarki heading di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<h1>', message: 'Tambahkan tag <h1>' },
      { type: 'contains', value: 'Belajar Web Development', message: 'Tulis "Belajar Web Development" di <h1>' },
      { type: 'contains', value: '<h2>', message: 'Tambahkan tag <h2>' },
      { type: 'contains', value: '<h3>', message: 'Tambahkan tag <h3>' },
      { type: 'contains', value: '<p>', message: 'Tambahkan paragraf penjelasan' },
      { type: 'regex', value: '<h2>.*CSS', message: 'Buat <h2> dengan teks "CSS"' },
    ],
    successMessage: '🎉 Sempurna! Kamu sudah menguasai hierarki heading HTML!',
  },
  {
    id: 'html-intro-05',
    title: 'Paragraf & Line Break',
    moduleId: 'html-intro',
    order: 5,
    theory: `# Paragraf dan Line Break

## Tag \`<p>\` — Paragraf

Tag \`<p>\` membuat paragraf teks. Browser otomatis menambahkan spasi di atas dan bawah paragraf.

\`\`\`html
<p>Ini paragraf pertama.</p>
<p>Ini paragraf kedua.</p>
\`\`\`

## Tag \`<br>\` — Line Break

\`<br>\` memaksa teks pindah ke baris baru **tanpa** membuat paragraf baru.

\`\`\`html
<p>Baris pertama<br>Baris kedua<br>Baris ketiga</p>
\`\`\`

## Tag \`<pre>\` — Preformatted Text

\`<pre>\` menampilkan teks persis seperti yang ditulis, termasuk spasi dan baris baru.

\`\`\`html
<pre>
  Teks ini
    ditampilkan
      apa adanya
</pre>
\`\`\`

## Perbedaan Penting
- \`<p>\` membuat **blok paragraf** dengan jarak otomatis
- \`<br>\` hanya **pindah baris** tanpa jarak tambahan
- Spasi berlebih di HTML akan **diringkas** menjadi satu spasi (kecuali dalam \`<pre>\`)`,
    instructions: `Buat halaman dengan paragraf dan line break:

1. Buat \`<h1>\` dengan teks "Puisi Alam"
2. Buat \`<p>\` pertama dengan teks pendek tentang alam
3. Buat \`<p>\` kedua yang mengandung \`<br>\` untuk membuat baris baru di tengah paragraf
4. Buat \`<pre>\` yang menampilkan teks terformat (seperti puisi dengan indentasi)
5. Buat \`<hr>\` untuk pemisah, lalu tambahkan \`<p>\` terakhir`,
    hints: [
      '<br> tidak perlu tag penutup, cukup tulis <br> saja',
      '<pre> menjaga semua spasi dan enter yang kamu tulis',
      'Gunakan <hr> untuk membuat garis horizontal',
    ],
    expectedOutput: 'Halaman dengan paragraf, line break, teks preformatted, dan garis pemisah',
    starterHTML: `<!-- Buat paragraf dan line break di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<h1>', message: 'Tambahkan tag <h1>' },
      { type: 'contains', value: 'Puisi Alam', message: 'Tulis "Puisi Alam" di <h1>' },
      { type: 'contains', value: '<p>', message: 'Tambahkan tag <p>' },
      { type: 'contains', value: '<br>', message: 'Gunakan tag <br> untuk line break' },
      { type: 'contains', value: '<pre>', message: 'Tambahkan tag <pre> untuk teks terformat' },
      { type: 'contains', value: '<hr>', message: 'Tambahkan tag <hr> sebagai pemisah' },
    ],
    successMessage: '🎉 Luar biasa! Kamu sudah paham paragraf, br, dan pre di HTML!',
  },
];
