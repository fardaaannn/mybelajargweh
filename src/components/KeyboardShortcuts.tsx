/**
 * Keyboard Shortcuts Component
 * @module components/KeyboardShortcuts
 * 
 * Displays keyboard shortcuts help and handles keyboard navigation.
 */

import React, { useEffect, useCallback, useState } from 'react';
import { Keyboard, X, CornerDownLeft, ArrowLeft, ArrowRight, Command } from 'lucide-react';

interface KeyboardShortcutsProps {
  /** Callback when user presses Ctrl/Cmd + Enter */
  onRunCode?: () => void;
  /** Callback when user presses Ctrl/Cmd + S */
  onSave?: () => void;
  /** Callback for next exercise */
  onNext?: () => void;
  /** Callback for previous exercise */
  onPrevious?: () => void;
  /** Callback to toggle theory panel */
  onToggleTheory?: () => void;
  /** Callback to toggle preview panel */
  onTogglePreview?: () => void;
  /** Callback to reset code */
  onReset?: () => void;
}

/**
 * KeyboardShortcuts Component
 * 
 * Handles keyboard shortcuts and displays help modal.
 */
export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  onRunCode,
  onSave,
  onNext,
  onPrevious,
  onToggleTheory,
  onTogglePreview,
  onReset,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  /**
   * Handle keyboard shortcuts
   */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdKey = isMac ? e.metaKey : e.ctrlKey;

    // Ctrl/Cmd + Enter - Run code / Check answer
    if (cmdKey && e.key === 'Enter' && onRunCode) {
      e.preventDefault();
      onRunCode();
    }

    // Ctrl/Cmd + S - Save
    if (cmdKey && e.key === 's' && onSave) {
      e.preventDefault();
      onSave();
    }

    // Ctrl/Cmd + B - Toggle theory panel
    if (cmdKey && e.key === 'b' && onToggleTheory) {
      e.preventDefault();
      onToggleTheory();
    }

    // Ctrl/Cmd + P - Toggle preview panel
    if (cmdKey && e.key === 'p' && onTogglePreview) {
      e.preventDefault();
      onTogglePreview();
    }

    // Ctrl/Cmd + R - Reset code
    if (cmdKey && e.key === 'r' && onReset) {
      e.preventDefault();
      onReset();
    }

    // Arrow keys for navigation
    if (e.key === 'ArrowRight' && e.altKey && onNext) {
      e.preventDefault();
      onNext();
    }
    if (e.key === 'ArrowLeft' && e.altKey && onPrevious) {
      e.preventDefault();
      onPrevious();
    }

    // ? - Show help
    if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      setShowHelp(true);
    }

    // Escape - Close help
    if (e.key === 'Escape' && showHelp) {
      setShowHelp(false);
    }
  }, [onRunCode, onSave, onNext, onPrevious, onToggleTheory, onTogglePreview, onReset, showHelp]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const shortcuts = [
    { key: 'Ctrl/Cmd + Enter', description: 'Jalankan / Cek jawaban', icon: CornerDownLeft },
    { key: 'Ctrl/Cmd + S', description: 'Simpan kode', icon: Command },
    { key: 'Ctrl/Cmd + B', description: 'Toggle panel teori', icon: Command },
    { key: 'Ctrl/Cmd + P', description: 'Toggle panel preview', icon: Command },
    { key: 'Ctrl/Cmd + R', description: 'Reset kode', icon: Command },
    { key: 'Alt + →', description: 'Latihan berikutnya', icon: ArrowRight },
    { key: 'Alt + ←', description: 'Latihan sebelumnya', icon: ArrowLeft },
    { key: '?', description: 'Tampilkan bantuan shortcut', icon: Keyboard },
  ];

  return (
    <>
      {/* Shortcut Help Button */}
      <button
        onClick={() => setShowHelp(true)}
        className="
          fixed bottom-6 left-6 z-40
          w-10 h-10 rounded-full
          bg-muted hover:bg-muted/80
          flex items-center justify-center
          transition-colors
        "
        title="Keyboard shortcuts (?)"
        aria-label="Tampilkan keyboard shortcuts"
      >
        <Keyboard className="w-5 h-5" />
      </button>

      {/* Help Modal */}
      {showHelp && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowHelp(false)}
        >
          <div 
            className="ios-card max-w-md w-full p-6"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Keyboard className="w-5 h-5" />
                Keyboard Shortcuts
              </h2>
              <button
                onClick={() => setShowHelp(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Shortcuts List */}
            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-muted-foreground">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-muted rounded-lg text-sm font-mono">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Tekan <kbd className="px-1 bg-muted rounded">Esc</kbd> untuk menutup
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
