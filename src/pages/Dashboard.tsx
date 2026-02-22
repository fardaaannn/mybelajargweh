/**
 * Dashboard Page
 * @module pages/Dashboard
 * 
 * Main dashboard with real progress tracking and module cards.
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Flame, 
  Target, 
  TrendingUp,
  Filter,
  Search,
  RotateCcw
} from 'lucide-react';
import { Header } from '@/components/ui-custom/Header';
import { ModuleCard } from '@/components/ui-custom/ModuleCard';
import { ProgressRing } from '@/components/ui-custom/ProgressRing';
import { SkeletonCard, SkeletonStats } from '@/components/ui-custom/LoadingSpinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/context/ProgressContext';
import { lessonModules } from '@/data/modules';
import type { LessonModule } from '@/types';

type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced' | 'expert';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    progress, 
    getModuleProgress, 
    getOverallProgress, 
    getModuleCompletedCount,
    resetProgress,
    updateStreak 
  } = useProgress();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Update streak on mount
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Modules with real progress
  const modulesWithProgress = useMemo(() => {
    return lessonModules.map(module => ({
      ...module,
      progress: getModuleProgress(module),
      completedExercises: getModuleCompletedCount(module.id),
    }));
  }, [getModuleProgress, getModuleCompletedCount]);

  // Stats
  const stats = useMemo(() => ({
    totalModules: lessonModules.length,
    completedModules: modulesWithProgress.filter(m => m.progress === 100).length,
    totalExercises: lessonModules.reduce((sum, m) => sum + m.totalExercises, 0),
    completedExercises: progress.completedExercises.length,
    overallProgress: getOverallProgress(),
    streak: progress.streak,
  }), [modulesWithProgress, progress, getOverallProgress]);

  // Filtered modules
  const filteredModules = useMemo(() => {
    return modulesWithProgress.filter(module => {
      const matchesSearch = 
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'all' || module.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [modulesWithProgress, searchQuery, difficultyFilter]);

  const handleModuleClick = (module: LessonModule) => {
    navigate(`/workspace/${module.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 animate-pulse">
            <div className="h-10 bg-muted rounded w-1/3 mb-2" />
            <div className="h-5 bg-muted rounded w-1/2" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => <SkeletonStats key={i} />)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Selamat Datang Kembali! 👋
          </h1>
          <p className="text-muted-foreground">
            {stats.streak > 1 
              ? `🔥 Streak ${stats.streak} hari! Pertahankan semangat belajarmu!`
              : 'Lanjutkan perjalanan belajar coding-mu hari ini.'}
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="ios-card p-4 flex items-center gap-4">
            <ProgressRing progress={stats.overallProgress} size={56} strokeWidth={4} />
            <div>
              <p className="text-sm text-muted-foreground">Progress Total</p>
              <p className="text-xl font-bold">{stats.overallProgress}%</p>
            </div>
          </div>

          <div className="ios-card p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[hsl(var(--ios-orange),0.15)] flex items-center justify-center">
              <Flame className="w-7 h-7 text-[hsl(var(--ios-orange))]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Streak Belajar</p>
              <p className="text-xl font-bold">{stats.streak} hari</p>
            </div>
          </div>

          <div className="ios-card p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[hsl(var(--ios-green),0.15)] flex items-center justify-center">
              <Trophy className="w-7 h-7 text-[hsl(var(--ios-green))]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Modul Selesai</p>
              <p className="text-xl font-bold">{stats.completedModules}/{stats.totalModules}</p>
            </div>
          </div>

          <div className="ios-card p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[hsl(var(--ios-purple),0.15)] flex items-center justify-center">
              <Target className="w-7 h-7 text-[hsl(var(--ios-purple))]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Latihan Selesai</p>
              <p className="text-xl font-bold">{stats.completedExercises}/{stats.totalExercises}</p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari modul pelajaran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['all', 'beginner', 'intermediate', 'advanced', 'expert'] as const).map((filter) => (
              <Button
                key={filter}
                variant={difficultyFilter === filter ? 'default' : 'outline'}
                onClick={() => setDifficultyFilter(filter)}
                className={`rounded-xl ${filter !== 'all' ? `ios-badge-${filter}` : ''}`}
              >
                {filter === 'all' ? 'Semua' : 
                 filter === 'beginner' ? '🟢 Pemula' : 
                 filter === 'intermediate' ? '🟡 Menengah' : 
                 filter === 'advanced' ? '🔴 Lanjutan' : '👑 Sepuh'}
              </Button>
            ))}
          </div>
        </section>

        {/* Reset Progress */}
        {progress.completedExercises.length > 0 && (
          <div className="mb-6 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetProgress}
              className="text-muted-foreground hover:text-destructive"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Progress
            </Button>
          </div>
        )}

        {/* Modules Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[hsl(var(--ios-blue))]" />
              Kurikulum Pembelajaran
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredModules.length} modul
            </span>
          </div>

          {filteredModules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onClick={handleModuleClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Tidak ada modul ditemukan</h3>
              <p className="text-muted-foreground mb-4">
                Coba ubah filter atau kata kunci pencarian
              </p>
              <Button 
                variant="outline" 
                onClick={() => {setSearchQuery(''); setDifficultyFilter('all');}}
              >
                Reset Filter
              </Button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 CodeLearn. Platform belajar coding interaktif.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Tentang Kami</a>
              <a href="#" className="hover:text-foreground">Kebijakan Privasi</a>
              <a href="#" className="hover:text-foreground">Hubungi Kami</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
