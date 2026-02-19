/**
 * Lesson Modules Data
 * @module data/modules
 * 
 * Contains all lesson modules and exercises for the CodeLearn platform.
 * This data can be easily extended or replaced with API calls in the future.
 */

import type { LessonModule, Exercise } from '@/types';

/** Array of lesson modules available in the curriculum */
export const lessonModules: LessonModule[] = [
  {
    id: 'html-basics',
    title: 'HTML Dasar',
    description: 'Pelajari fondasi pembangunan web dengan HTML. Memahami struktur dokumen, tag, elemen, dan atribut.',
    difficulty: 'beginner',
    progress: 75,
    totalExercises: 8,
    completedExercises: 6,
    icon: 'FileCode',
    color: 'hsl(var(--ios-orange))',
  },
  {
    id: 'css-styling',
    title: 'CSS Styling',
    description: 'Kuasai styling web dengan CSS. Pelajari selector, properties, layout, dan responsive design.',
    difficulty: 'beginner',
    progress: 40,
    totalExercises: 10,
    completedExercises: 4,
    icon: 'Palette',
    color: 'hsl(var(--ios-blue))',
  },
  {
    id: 'js-fundamentals',
    title: 'JavaScript Fundamental',
    description: 'Dasar-dasar pemrograman dengan JavaScript. Variabel, tipe data, function, dan control flow.',
    difficulty: 'intermediate',
    progress: 20,
    totalExercises: 12,
    completedExercises: 2,
    icon: 'Code2',
    color: 'hsl(var(--ios-yellow))',
  },
  {
    id: 'dom-manipulation',
    title: 'DOM Manipulation',
    description: 'Manipulasi elemen HTML dengan JavaScript. Event handling dan dynamic content.',
    difficulty: 'intermediate',
    progress: 0,
    totalExercises: 8,
    completedExercises: 0,
    icon: 'MousePointer',
    color: 'hsl(var(--ios-purple))',
  },
  {
    id: 'responsive-design',
    title: 'Responsive Design',
    description: 'Buat website yang adaptif di semua perangkat dengan media queries dan flexbox/grid.',
    difficulty: 'intermediate',
    progress: 0,
    totalExercises: 6,
    completedExercises: 0,
    icon: 'Smartphone',
    color: 'hsl(var(--ios-green))',
  },
  {
    id: 'js-advanced',
    title: 'JavaScript Lanjutan',
    description: 'Konsep advanced: async/await, promises, closures, dan ES6+ features.',
    difficulty: 'advanced',
    progress: 0,
    totalExercises: 10,
    completedExercises: 0,
    icon: 'Zap',
    color: 'hsl(var(--ios-pink))',
  },
];

/** Sample exercise for HTML Basics module */
export const sampleExercise: Exercise = {
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
4. Berikan warna latar belakang biru muda pada body menggunakan CSS

**Tips:** Pastikan struktur HTML kamu lengkap dengan tag \`<html>\`, \`<head>\`, dan \`<body>\`.`,
  hints: [
    'Ingat untuk menutup setiap tag yang dibuka',
    'Gunakan property background-color untuk mengubah warna latar',
    'Tag button membutuhkan tag penutup </button>',
  ],
  expectedOutput: 'Halaman dengan judul "Selamat Datang", paragraf, dan tombol berwarna biru muda',
  starterHTML: `<!DOCTYPE html>
<html>
<head>
  <title>Halaman Pertamaku</title>
</head>
<body>
  <!-- Tulis kode di sini -->
  
</body>
</html>`,
  starterCSS: `/* Ubah warna latar belakang body */
body {
  
}`,
  starterJS: `// Tambahkan interaktivitas jika diperlukan
console.log('Hello World!');`,
};

/** Get exercise by module ID */
export const getExercisesByModule = (moduleId: string): Exercise[] => {
  // In a real app, this would fetch from an API
  // For now, return sample exercise for html-basics
  if (moduleId === 'html-basics') {
    return [sampleExercise];
  }
  return [];
};

/** Get module by ID */
export const getModuleById = (id: string): LessonModule | undefined => {
  return lessonModules.find(m => m.id === id);
};
