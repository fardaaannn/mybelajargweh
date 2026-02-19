/**
 * 404 Not Found Page
 * @module pages/NotFound
 * 
 * Displayed when user navigates to a non-existent route.
 * Provides helpful navigation options.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion, Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui-custom/Header';

/**
 * NotFound Page Component
 * 
 * Renders a user-friendly 404 error page with:
 * - Clear error message
 * - Navigation options
 * - Search suggestion
 * 
 * @example
 * ```tsx
 * <Route path="*" element={<NotFound />} />
 * ```
 */
export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <div className="max-w-lg w-full text-center">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[hsl(var(--ios-blue))] to-[hsl(var(--ios-purple))] flex items-center justify-center">
              <FileQuestion className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background px-4">
              <span className="text-6xl font-bold text-muted-foreground/20">
                404
              </span>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold mb-3">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. 
            Mungkin telah dipindahkan, dihapus, atau URL yang dimasukkan salah.
          </p>

          {/* Suggested Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="ios-card p-4 text-left cursor-pointer hover:shadow-md transition-shadow"
                 onClick={() => navigate('/')}
                 role="button"
                 tabIndex={0}
                 onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
            >
              <Home className="w-6 h-6 text-[hsl(var(--ios-blue))] mb-2" />
              <h3 className="font-semibold mb-1">Kembali ke Beranda</h3>
              <p className="text-sm text-muted-foreground">
                Lihat semua modul pembelajaran
              </p>
            </div>

            <div className="ios-card p-4 text-left cursor-pointer hover:shadow-md transition-shadow"
                 onClick={() => navigate('/workspace/html-basics')}
                 role="button"
                 tabIndex={0}
                 onKeyDown={(e) => e.key === 'Enter' && navigate('/workspace/html-basics')}
            >
              <Search className="w-6 h-6 text-[hsl(var(--ios-green))] mb-2" />
              <h3 className="font-semibold mb-1">Mulai Belajar</h3>
              <p className="text-sm text-muted-foreground">
                Mulai dari modul HTML Dasar
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <Button
              onClick={() => navigate('/')}
              className="ios-button-primary"
            >
              <Home className="w-4 h-4 mr-2" />
              Ke Beranda
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Masih butuh bantuan?{' '}
              <a
                href="mailto:support@codelearn.id"
                className="text-[hsl(var(--ios-blue))] hover:underline font-medium"
              >
                Hubungi kami
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
