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

/** Get exercises by module ID */
export const getExercisesByModule = (moduleId: string): ExerciseWithValidation[] => {
  const allExercises: Record<string, ExerciseWithValidation[]> = {
    'html-basics': htmlBasicsExercises,
  };
  return allExercises[moduleId] || [];
};

/** Get exercise by ID */
export const getExerciseById = (exerciseId: string): ExerciseWithValidation | undefined => {
  const allExercises = [...htmlBasicsExercises];
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
