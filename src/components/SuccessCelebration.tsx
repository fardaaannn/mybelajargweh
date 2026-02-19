/**
 * Success Celebration Component
 * @module components/SuccessCelebration
 * 
 * Displays confetti animation and success message when user completes an exercise.
 */

import React, { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ArrowRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessCelebrationProps {
  /** Success message to display */
  message: string;
  /** Callback when user clicks continue */
  onContinue: () => void;
  /** Whether to show next exercise button */
  hasNextExercise?: boolean;
  /** Callback when user clicks next exercise */
  onNextExercise?: () => void;
}

/**
 * SuccessCelebration Component
 * 
 * Renders confetti animation and success message.
 */
export const SuccessCelebration: React.FC<SuccessCelebrationProps> = ({
  message,
  onContinue,
  hasNextExercise = false,
  onNextExercise,
}) => {
  /**
   * Trigger confetti animation
   */
  const triggerConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Left cannon
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF2D55'],
      });
      
      // Right cannon
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF2D55'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    triggerConfetti();
  }, [triggerConfetti]);

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center animate-fade-in">
        {/* Success Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[hsl(var(--ios-green))] to-[hsl(var(--ios-blue))] flex items-center justify-center animate-bounce">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[hsl(var(--ios-yellow))] flex items-center justify-center">
            <span className="text-lg">⭐</span>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold mb-2">
          Jawaban Benar!
        </h2>
        <p className="text-muted-foreground mb-8">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {hasNextExercise && onNextExercise && (
            <Button
              onClick={onNextExercise}
              className="ios-button-primary"
            >
              Latihan Berikutnya
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          <Button
            variant="outline"
            onClick={onContinue}
            className="rounded-xl"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Lanjutkan Belajar
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span>Streak +1</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💎</span>
              <span>XP +50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
