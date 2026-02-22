/**
 * Workspace Page
 * @module pages/Workspace
 * 
 * Full-featured learning workspace with exercise navigation,
 * code validation, keyboard shortcuts, and more.
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  PanelLeft, 
  PanelRight, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Menu,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Header } from '@/components/ui-custom/Header';
import { LoadingSpinner } from '@/components/ui-custom/LoadingSpinner';
import { TheoryPanel } from '@/components/editor/TheoryPanel';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { LivePreview } from '@/components/editor/LivePreview';
import { SuccessCelebration } from '@/components/SuccessCelebration';
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts';

import { CodeActions } from '@/components/CodeActions';
import { FeedbackButton } from '@/components/FeedbackButton';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCodeEditor } from '@/hooks/useCodeEditor';
import { useProgress } from '@/context/ProgressContext';
import { getModuleById } from '@/data/modules';
import { getExercisesByModule, getNextExercise, getPreviousExercise } from '@/data/exercises';
import { validateCode } from '@/utils/codeValidator';
import type { EditorTab, CodeState } from '@/types';
import type { ExerciseWithValidation } from '@/data/exercises';

interface PanelState {
  theory: boolean;
  preview: boolean;
}

export const Workspace: React.FC = () => {
  const { moduleId, exerciseId } = useParams<{ moduleId: string; exerciseId: string }>();
  const navigate = useNavigate();
  const { completeExercise, isExerciseCompleted, setCurrentExercise } = useProgress();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const module = moduleId ? getModuleById(moduleId) : undefined;
  const exercises = moduleId ? getExercisesByModule(moduleId) : [];
  
  // Get current exercise
  const currentExercise: ExerciseWithValidation | undefined = exerciseId 
    ? exercises.find(e => e.id === exerciseId)
    : exercises[0];
  
  const nextExercise = currentExercise ? getNextExercise(currentExercise.id, currentExercise.moduleId) : null;
  const previousExercise = currentExercise ? getPreviousExercise(currentExercise.id, currentExercise.moduleId) : null;
  
  const isCompleted = currentExercise ? isExerciseCompleted(currentExercise.id) : false;

  const { 
    code, 
    activeTab, 
    updateCode, 
    setActiveTab, 
    resetCode, 
    setAllCode,
    combinedOutput,
    isModified 
  } = useCodeEditor(currentExercise ? {
    html: currentExercise.starterHTML,
    css: currentExercise.starterCSS,
    js: currentExercise.starterJS,
  } : undefined);

  const [panels, setPanels] = useState<PanelState>({
    theory: true,
    preview: true,
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; errors: string[] } | null>(null);
  const [isChecking, setIsChecking] = useState(false);



  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!module) {
        setError('Modul tidak ditemukan');
      } else if (exercises.length === 0) {
        setError('Belum ada latihan untuk modul ini');
      }
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [module, exercises.length]);

  // Save current exercise to progress
  useEffect(() => {
    if (moduleId && currentExercise) {
      setCurrentExercise(moduleId, currentExercise.id);
    }
  }, [moduleId, currentExercise, setCurrentExercise]);

  const togglePanel = useCallback((panel: keyof PanelState) => {
    setPanels(prev => ({ ...prev, [panel]: !prev[panel] }));
  }, []);

  const handleCodeChange = useCallback((value: string) => {
    updateCode(activeTab, value);
    setValidationResult(null);
  }, [activeTab, updateCode]);

  const handleTabChange = useCallback((tab: EditorTab) => {
    setActiveTab(tab);
  }, [setActiveTab]);

  /**
   * Validate and check answer
   */
  const handleCheckAnswer = useCallback(() => {
    if (!currentExercise) return;
    
    setIsChecking(true);
    setValidationResult(null);
    
    // Simulate API delay
    setTimeout(() => {
      const result = validateCode(code, currentExercise.validationRules);
      setValidationResult(result);
      
      if (result.isValid) {
        completeExercise(currentExercise.id);
        setShowSuccess(true);
      }
      
      setIsChecking(false);
    }, 800);
  }, [code, currentExercise, completeExercise]);

  /**
   * Navigate to next exercise
   */
  const handleNextExercise = useCallback(() => {
    if (nextExercise && moduleId) {
      navigate(`/workspace/${moduleId}/${nextExercise.id}`);
      setShowSuccess(false);
      setValidationResult(null);
    }
  }, [nextExercise, moduleId, navigate]);

  /**
   * Navigate to previous exercise
   */
  const handlePreviousExercise = useCallback(() => {
    if (previousExercise && moduleId) {
      navigate(`/workspace/${moduleId}/${previousExercise.id}`);
      setValidationResult(null);
    }
  }, [previousExercise, moduleId, navigate]);

  /**
   * Handle set code from import
   */
  const handleSetCode = useCallback((newCode: CodeState) => {
    setAllCode(newCode);
  }, [setAllCode]);

  /**
   * Toggle fullscreen
   */
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header showBack onBack={() => navigate('/')} />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" message="Memuat workspace..." />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !module || !currentExercise) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header showBack onBack={() => navigate('/')} />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error || 'Terjadi kesalahan'}</AlertDescription>
            </Alert>
            <Button onClick={() => navigate('/')} className="ios-button-primary">
              Kembali ke Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background flex flex-col ${isFullscreen ? 'fullscreen' : ''}`}>
      <Header title={module.title} showBack onBack={() => navigate('/')} />

      {/* Toolbar */}
      <div className="border-b border-border bg-muted/30 px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left: Panel Toggles */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => togglePanel('theory')}
              className={`rounded-lg ${panels.theory ? 'bg-muted' : ''}`}
            >
              <PanelLeft className="w-4 h-4 mr-2" />
              Teori
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => togglePanel('preview')}
              className={`rounded-lg ${panels.preview ? 'bg-muted' : ''}`}
            >
              <PanelRight className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>

          {/* Center: Exercise Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={handlePreviousExercise}
              disabled={!previousExercise}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium px-3 py-1 bg-muted rounded-full">
              {currentExercise.order} / {exercises.length}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={handleNextExercise}
              disabled={!nextExercise}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            {isCompleted && (
              <CheckCircle2 className="w-5 h-5 text-[hsl(var(--ios-green))] ml-2" />
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <CodeActions
              code={code}
              onSetCode={handleSetCode}
              isFullscreen={isFullscreen}
              onToggleFullscreen={toggleFullscreen}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={resetCode}
              disabled={!isModified}
              className="rounded-lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden rounded-lg"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden mt-2 pt-2 border-t border-border flex items-center justify-center gap-4">
            <Button variant="ghost" size="icon" onClick={handlePreviousExercise} disabled={!previousExercise}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium">
              {currentExercise.order} / {exercises.length}
            </span>
            <Button variant="ghost" size="icon" onClick={handleNextExercise} disabled={!nextExercise}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Validation Alert */}
      {validationResult && !validationResult.isValid && (
        <div className="px-4 py-2 bg-destructive/10 border-b border-destructive/20">
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Periksa kembali kode Anda:</span>
          </div>
          <ul className="mt-1 ml-6 text-sm text-destructive/80 list-disc">
            {validationResult.errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Workspace */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Theory Panel */}
          {panels.theory && (
            <div className={`${panels.preview ? 'md:col-span-3' : 'md:col-span-4'} h-[40vh] md:h-full border-r border-border`}>
              <TheoryPanel
                exercise={currentExercise}
                onCheckAnswer={handleCheckAnswer}
                isChecking={isChecking}
                checkResult={validationResult?.isValid ? 'correct' : validationResult ? 'incorrect' : null}
              />
            </div>
          )}

          {/* Code Editor */}
          <div className={`
            ${!panels.theory && !panels.preview ? 'md:col-span-12' : ''}
            ${panels.theory && panels.preview ? 'md:col-span-5' : ''}
            ${panels.theory && !panels.preview ? 'md:col-span-8' : ''}
            ${!panels.theory && panels.preview ? 'md:col-span-7' : ''}
            h-[30vh] md:h-full border-r border-border
          `}>
            <CodeEditor
              code={code}
              activeTab={activeTab}
              onChange={handleCodeChange}
              onTabChange={handleTabChange}
            />
          </div>

          {/* Live Preview */}
          {panels.preview && (
            <div className={`${panels.theory ? 'md:col-span-4' : 'md:col-span-5'} h-[30vh] md:h-full`}>
              <LivePreview htmlContent={combinedOutput} />
            </div>
          )}
        </div>
      </main>

      {/* Status Bar */}
      <footer className="border-t border-border bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>CodeLearn v1.0</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{currentExercise.title}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              {isModified ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3 text-[hsl(var(--ios-green))]" />
                  Tersimpan
                </>
              )}
            </span>
          </div>
        </div>
      </footer>

      {/* Success Celebration */}
      {showSuccess && (
        <SuccessCelebration
          message={currentExercise.successMessage}
          onContinue={() => setShowSuccess(false)}
          hasNextExercise={!!nextExercise}
          onNextExercise={handleNextExercise}
        />
      )}



      {/* Floating Buttons (right side) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        <KeyboardShortcuts
          onRunCode={handleCheckAnswer}
          onSave={() => {}}
          onNext={handleNextExercise}
          onPrevious={handlePreviousExercise}
          onToggleTheory={() => togglePanel('theory')}
          onTogglePreview={() => togglePanel('preview')}
          onReset={resetCode}
          floating={false}
        />
        <FeedbackButton floating={false} />
      </div>
    </div>
  );
};
