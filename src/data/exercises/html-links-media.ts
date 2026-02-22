/**
 * HTML Links & Media Exercises
 * @module data/exercises/html-links-media
 * 
 * Modul 3: Link, Gambar & Media — Links, Images, Favicon, Video, Audio
 */

import type { ExerciseWithValidation } from './types';

export const htmlLinksMediaExercises: ExerciseWithValidation[] = [
  {
    id: 'html-links-media-01',
    title: 'Link (Hyperlink)',
    moduleId: 'html-links-media',
    order: 1,
    theory: `# Link HTML

Tag \`<a>\` (anchor) digunakan untuk membuat hyperlink ke halaman lain, file, atau lokasi di halaman yang sama.

## Sintaks Dasar
\`\`\`html
<a href="url">Teks Link</a>
\`\`\`

## Atribut Penting

| Atribut | Fungsi |
|---------|--------|
| \`href\` | URL tujuan link |
| \`target\` | Cara membuka link |
| \`title\` | Tooltip saat hover |

## Nilai target
- \`_self\` — Buka di tab yang sama (default)
- \`_blank\` — Buka di tab baru
- \`_parent\` — Buka di parent frame
- \`_top\` — Buka di window penuh

## Jenis Link
\`\`\`html
<!-- Link eksternal -->
<a href="https://google.com" target="_blank">Google</a>

<!-- Link ke email -->
<a href="mailto:email@contoh.com">Kirim Email</a>

<!-- Link ke telepon -->
<a href="tel:+628123456789">Hubungi Kami</a>

<!-- Link ke bagian di halaman yang sama (bookmark) -->
<a href="#section2">Ke Section 2</a>
\`\`\``,
    instructions: `Buat halaman dengan berbagai jenis link:

1. Buat \`<h1>\` dengan teks "Halaman Link"
2. Buat link ke "https://www.google.com" yang terbuka di **tab baru** (\`target="_blank"\`)
3. Buat link ke email menggunakan \`mailto:\`
4. Buat link bookmark ke bagian bawah halaman menggunakan \`#\` dan elemen dengan \`id\`
5. Buat link dengan atribut \`title\` untuk tooltip`,
    hints: [
      'Untuk tab baru gunakan: target="_blank"',
      'Untuk email: href="mailto:email@contoh.com"',
      'Bookmark: buat <a href="#bawah"> lalu <div id="bawah"> di bawah',
    ],
    expectedOutput: 'Halaman dengan link eksternal, email, bookmark, dan tooltip',
    starterHTML: `<!-- Buat berbagai link di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<a ', message: 'Tambahkan tag <a> untuk link' },
      { type: 'contains', value: 'href=', message: 'Tambahkan atribut href pada link' },
      { type: 'contains', value: 'target="_blank"', message: 'Gunakan target="_blank" untuk buka di tab baru' },
      { type: 'contains', value: 'mailto:', message: 'Buat link email dengan mailto:' },
      { type: 'contains', value: 'href="#', message: 'Buat bookmark link dengan href="#..."' },
      { type: 'contains', value: 'title=', message: 'Tambahkan atribut title pada link' },
    ],
    successMessage: '🎉 Hebat! Kamu sudah menguasai berbagai jenis link HTML!',
  },
  {
    id: 'html-links-media-02',
    title: 'Gambar HTML',
    moduleId: 'html-links-media',
    order: 2,
    theory: `# Gambar HTML

Tag \`<img>\` digunakan untuk menampilkan gambar. Ini adalah **empty element** (tidak punya tag penutup).

## Sintaks
\`\`\`html
<img src="url-gambar.jpg" alt="deskripsi gambar">
\`\`\`

## Atribut Penting

| Atribut | Fungsi | Wajib? |
|---------|--------|--------|
| \`src\` | URL/path gambar | ✅ Ya |
| \`alt\` | Teks alternatif (jika gambar gagal load) | ✅ Ya |
| \`width\` | Lebar gambar (px atau %) | Opsional |
| \`height\` | Tinggi gambar (px atau %) | Opsional |
| \`title\` | Tooltip saat hover | Opsional |

## Contoh
\`\`\`html
<!-- Gambar dengan ukuran -->
<img src="foto.jpg" alt="Foto pemandangan" width="400" height="300">

<!-- Gambar sebagai link -->
<a href="https://google.com">
  <img src="logo.png" alt="Logo Google">
</a>
\`\`\`

## Tips SEO & Accessibility
- **Selalu** tambahkan \`alt\` — penting untuk pembaca layar dan SEO
- Gunakan \`width\` dan \`height\` untuk mencegah layout shift`,
    instructions: `Buat halaman yang menampilkan gambar:

1. Buat \`<h1>\` dengan teks "Galeri Gambar"
2. Tampilkan gambar menggunakan \`<img>\` dengan \`src\` URL gambar (gunakan placeholder: https://via.placeholder.com/400x300)
3. Tambahkan atribut \`alt\` yang deskriptif
4. Atur \`width\` menjadi "400"
5. Buat gambar kedua yang menjadi **link** (bungkus \`<img>\` dengan \`<a>\`)
6. Tambahkan atribut \`title\` pada salah satu gambar`,
    hints: [
      '<img> adalah self-closing tag, tidak perlu penutup',
      'Alt text harus mendeskripsikan isi gambar',
      'Bungkus <img> di dalam <a> untuk membuat gambar jadi link',
    ],
    expectedOutput: 'Halaman dengan gambar yang memiliki alt text, ukuran, dan gambar sebagai link',
    starterHTML: `<!-- Tampilkan gambar di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<img', message: 'Tambahkan tag <img>' },
      { type: 'contains', value: 'src=', message: 'Tambahkan atribut src pada gambar' },
      { type: 'contains', value: 'alt=', message: 'Tambahkan atribut alt pada gambar' },
      { type: 'contains', value: 'width=', message: 'Atur width gambar' },
      { type: 'regex', value: '<a[^>]*>\\s*<img', message: 'Bungkus <img> dengan <a> untuk gambar sebagai link' },
      { type: 'contains', value: 'title=', message: 'Tambahkan title pada gambar' },
    ],
    successMessage: '🎉 Kamu sudah bisa menampilkan gambar dengan benar di HTML!',
  },
  {
    id: 'html-links-media-03',
    title: 'Favicon & Page Title',
    moduleId: 'html-links-media',
    order: 3,
    theory: `# Favicon dan Page Title

## Favicon
Favicon adalah ikon kecil yang muncul di **tab browser** di sebelah judul halaman.

\`\`\`html
<head>
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <!-- atau format PNG -->
  <link rel="icon" type="image/png" href="favicon.png">
</head>
\`\`\`

## Page Title
Tag \`<title>\` menentukan judul yang muncul di:
- Tab browser
- Hasil pencarian Google
- Bookmark

\`\`\`html
<head>
  <title>Judul Halaman - Nama Website</title>
</head>
\`\`\`

## Meta Tags Penting
\`\`\`html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Deskripsi halaman untuk SEO">
  <meta name="keywords" content="html, css, belajar">
  <meta name="author" content="Nama Kamu">
  <title>Judul Halaman</title>
</head>
\`\`\``,
    instructions: `Buat halaman HTML lengkap dengan head yang proper:

1. Buat struktur HTML lengkap (\`<!DOCTYPE html>\`, \`<html>\`, \`<head>\`, \`<body>\`)
2. Tambahkan \`<meta charset="UTF-8">\`
3. Tambahkan \`<meta name="viewport">\` untuk responsive
4. Tambahkan \`<title>\` dengan judul "Belajar HTML - CodeLearn"
5. Tambahkan \`<meta name="description">\` dengan deskripsi halaman
6. Di body, buat konten sederhana dengan \`<h1>\` dan \`<p>\``,
    hints: [
      'Meta charset memastikan karakter khusus ditampilkan dengan benar',
      'Meta viewport penting untuk tampilan di mobile: content="width=device-width, initial-scale=1.0"',
      'Meta description membantu SEO dan muncul di hasil pencarian Google',
    ],
    expectedOutput: 'Halaman HTML dengan head lengkap: meta charset, viewport, title, dan description',
    starterHTML: `<!-- Buat halaman dengan head lengkap -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<!DOCTYPE html>', message: 'Tambahkan <!DOCTYPE html>' },
      { type: 'contains', value: 'charset="UTF-8"', message: 'Tambahkan meta charset="UTF-8"' },
      { type: 'contains', value: 'viewport', message: 'Tambahkan meta viewport' },
      { type: 'contains', value: '<title>', message: 'Tambahkan tag <title>' },
      { type: 'contains', value: 'description', message: 'Tambahkan meta description' },
    ],
    successMessage: '🎉 Bagus! Kamu sudah tahu cara membuat head HTML yang lengkap!',
  },
  {
    id: 'html-links-media-04',
    title: 'Video HTML',
    moduleId: 'html-links-media',
    order: 4,
    theory: `# Video HTML

Tag \`<video>\` digunakan untuk menyematkan video di halaman web.

## Sintaks Dasar
\`\`\`html
<video width="400" controls>
  <source src="video.mp4" type="video/mp4">
  Browser tidak mendukung video.
</video>
\`\`\`

## Atribut Video

| Atribut | Fungsi |
|---------|--------|
| \`controls\` | Tampilkan tombol play/pause/volume |
| \`autoplay\` | Putar otomatis saat halaman dibuka |
| \`muted\` | Mulai tanpa suara |
| \`loop\` | Putar ulang terus-menerus |
| \`poster\` | Gambar thumbnail sebelum video diputar |
| \`width\` / \`height\` | Ukuran video |

## YouTube Embed
Gunakan \`<iframe>\` untuk menyematkan video YouTube:
\`\`\`html
<iframe width="560" height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  allowfullscreen>
</iframe>
\`\`\`

## Tips
- Selalu tambahkan \`controls\` agar pengguna bisa mengontrol video
- \`autoplay\` biasanya memerlukan \`muted\` agar bisa berjalan di browser modern
- Sertakan teks cadangan untuk browser yang tidak mendukung`,
    instructions: `Buat halaman dengan elemen video:

1. Buat \`<h1>\` dengan teks "Video Player"
2. Tambahkan \`<video>\` dengan atribut \`controls\` dan \`width="400"\`
3. Di dalam video, tambahkan \`<source>\` dengan src (boleh URL apapun, misal "video.mp4")
4. Tambahkan teks cadangan "Browser tidak mendukung video"
5. Buat video kedua dengan atribut \`muted\` dan \`loop\`
6. Tambahkan sebuah YouTube embed menggunakan \`<iframe>\``,
    hints: [
      'Atribut controls, muted, loop tidak perlu nilai, cukup tulis namanya saja',
      '<source> ada di dalam <video>, bukan di luar',
      'YouTube embed menggunakan <iframe> dengan URL embed (bukan URL biasa)',
    ],
    expectedOutput: 'Halaman dengan video player HTML5 dan YouTube embed',
    starterHTML: `<!-- Embed video di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<video', message: 'Tambahkan tag <video>' },
      { type: 'contains', value: 'controls', message: 'Tambahkan atribut controls pada video' },
      { type: 'contains', value: '<source', message: 'Tambahkan tag <source> di dalam video' },
      { type: 'contains', value: 'muted', message: 'Tambahkan atribut muted pada video kedua' },
      { type: 'contains', value: 'loop', message: 'Tambahkan atribut loop pada video kedua' },
      { type: 'contains', value: '<iframe', message: 'Tambahkan <iframe> untuk YouTube embed' },
    ],
    successMessage: '🎉 Luar biasa! Kamu sudah bisa menyematkan video di HTML!',
  },
  {
    id: 'html-links-media-05',
    title: 'Audio HTML',
    moduleId: 'html-links-media',
    order: 5,
    theory: `# Audio HTML

Tag \`<audio>\` digunakan untuk menyematkan audio/musik di halaman web.

## Sintaks Dasar
\`\`\`html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  Browser tidak mendukung audio.
</audio>
\`\`\`

## Atribut Audio

| Atribut | Fungsi |
|---------|--------|
| \`controls\` | Tampilkan kontrol audio |
| \`autoplay\` | Putar otomatis |
| \`muted\` | Mulai tanpa suara |
| \`loop\` | Putar ulang |
| \`preload\` | Cara memuat audio (auto/metadata/none) |

## Format Audio yang Didukung

| Format | MIME Type | Dukungan |
|--------|-----------|----------|
| MP3 | audio/mpeg | Semua browser modern |
| WAV | audio/wav | Sebagian besar browser |
| OGG | audio/ogg | Firefox, Chrome, Opera |

## Multiple Source
Pasang beberapa format untuk kompatibilitas:
\`\`\`html
<audio controls>
  <source src="lagu.mp3" type="audio/mpeg">
  <source src="lagu.ogg" type="audio/ogg">
  Format tidak didukung.
</audio>
\`\`\``,
    instructions: `Buat halaman audio player:

1. Buat \`<h1>\` dengan teks "Audio Player"
2. Buat \`<audio>\` dengan atribut \`controls\`
3. Tambahkan \`<source>\` dengan format MP3 (\`type="audio/mpeg"\`)
4. Tambahkan \`<source>\` kedua dengan format OGG (\`type="audio/ogg"\`)
5. Tambahkan teks cadangan untuk browser yang tidak mendukung
6. Buat audio kedua dengan atribut \`loop\` dan \`preload="auto"\``,
    hints: [
      'Tag <audio> mirip dengan <video>, menggunakan <source> di dalamnya',
      'Tambahkan beberapa <source> untuk kompatibilitas browser',
      'preload="auto" membuat browser memuat audio saat halaman dimuat',
    ],
    expectedOutput: 'Halaman dengan dua audio player: satu biasa dan satu looping',
    starterHTML: `<!-- Buat audio player di sini -->

`,
    starterCSS: '',
    starterJS: '',
    validationRules: [
      { type: 'contains', value: '<audio', message: 'Tambahkan tag <audio>' },
      { type: 'contains', value: 'controls', message: 'Tambahkan atribut controls pada audio' },
      { type: 'contains', value: 'audio/mpeg', message: 'Tambahkan source MP3 dengan type="audio/mpeg"' },
      { type: 'contains', value: 'audio/ogg', message: 'Tambahkan source OGG dengan type="audio/ogg"' },
      { type: 'contains', value: 'loop', message: 'Tambahkan atribut loop pada audio kedua' },
      { type: 'contains', value: 'preload', message: 'Tambahkan atribut preload' },
    ],
    successMessage: '🎉 Kamu sudah bisa membuat audio player di HTML!',
  },
];
