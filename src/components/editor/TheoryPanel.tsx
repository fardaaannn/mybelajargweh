/**
 * Theory Panel Component
 * @module components/editor/TheoryPanel
 * 
 * Displays lesson theory, instructions, hints, and check answer button.
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  Lightbulb, 
  ListChecks, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Exercise } from '@/types';

interface TheoryPanelProps {
  exercise: Exercise;
  onCheckAnswer?: () => void;
  isChecking?: boolean;
  checkResult?: 'correct' | 'incorrect' | null;
  className?: string;
}

export const TheoryPanel: React.FC<TheoryPanelProps> = ({
  exercise,
  onCheckAnswer,
  isChecking = false,
  checkResult = null,
  className = '',
}) => {
  const [showHints, setShowHints] = useState(false);
  const [expandedHint, setExpandedHint] = useState<number | null>(null);

  /**
   * Parse markdown-like content
   */
  const parseMarkdown = (content: string): React.ReactNode[] => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('# ')) {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc pl-5 space-y-1 my-3">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(
          <h1 key={index} className="text-xl font-bold mt-4 mb-2">{trimmed.replace('# ', '')}</h1>
        );
      }
      else if (trimmed.startsWith('## ')) {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc pl-5 space-y-1 my-3">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(
          <h2 key={index} className="text-lg font-semibold mt-4 mb-2">{trimmed.replace('## ', '')}</h2>
        );
      }
      else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        inList = true;
        listItems.push(<li key={index} className="text-sm">{parseInlineFormatting(trimmed.substring(2))}</li>);
      }
      else if (/^\d+\.\s/.test(trimmed)) {
        inList = true;
        const text = trimmed.replace(/^\d+\.\s/, '');
        listItems.push(<li key={index} className="text-sm">{parseInlineFormatting(text)}</li>);
      }
      else if (trimmed) {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc pl-5 space-y-1 my-3">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(
          <p key={index} className="text-sm leading-relaxed mb-2">{parseInlineFormatting(trimmed)}</p>
        );
      }
    });

    if (inList && listItems.length > 0) {
      elements.push(<ul key="final-list" className="list-disc pl-5 space-y-1 my-3">{listItems}</ul>);
    }

    return elements;
  };

  const parseInlineFormatting = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining) {
      const codeMatch = remaining.match(/`([^`]+)`/);
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
      const italicMatch = remaining.match(/\*([^*]+)\*/);

      const matches = [
        codeMatch && { type: 'code', match: codeMatch, index: codeMatch.index },
        boldMatch && { type: 'bold', match: boldMatch, index: boldMatch.index },
        italicMatch && { type: 'italic', match: italicMatch, index: italicMatch.index },
      ].filter(Boolean).sort((a, b) => (a?.index || 0) - (b?.index || 0));

      if (matches.length === 0) {
        parts.push(remaining);
        break;
      }

      const first = matches[0]!;
      
      if (first.index! > 0) {
        parts.push(remaining.substring(0, first.index));
      }

      if (first.type === 'code') {
        parts.push(<code key={key++} className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">{first.match[1]}</code>);
      } else if (first.type === 'bold') {
        parts.push(<strong key={key++}>{first.match[1]}</strong>);
      } else if (first.type === 'italic') {
        parts.push(<em key={key++}>{first.match[1]}</em>);
      }

      remaining = remaining.substring(first.index! + first.match[0].length);
    }

    return <>{parts}</>;
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
        <BookOpen className="w-5 h-5 text-[hsl(var(--ios-blue))]" />
        <h2 className="font-semibold">Materi & Instruksi</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Theory */}
        <section>
          <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">Teori</h3>
          <div className="prose prose-sm max-w-none">
            {parseMarkdown(exercise.theory)}
          </div>
        </section>

        {/* Instructions */}
        <section className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <ListChecks className="w-4 h-4 text-[hsl(var(--ios-orange))]" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Instruksi</h3>
          </div>
          <div className="bg-[hsl(var(--ios-blue),0.05)] rounded-xl p-4 border border-[hsl(var(--ios-blue),0.15)]">
            {parseMarkdown(exercise.instructions)}
          </div>
        </section>

        {/* Expected Output */}
        <section className="pt-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">Output yang Diharapkan</h3>
          <p className="text-sm text-muted-foreground">{exercise.expectedOutput}</p>
        </section>

        {/* Hints */}
        <section className="pt-4 border-t border-border">
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[hsl(var(--ios-yellow))]" />
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Petunjuk ({exercise.hints.length})
              </h3>
            </div>
            {showHints ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>

          {showHints && (
            <div className="mt-3 space-y-2">
              {exercise.hints.map((hint, index) => (
                <div key={index} className="bg-muted/50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedHint(expandedHint === index ? null : index)}
                    className="flex items-center justify-between w-full px-3 py-2 text-left"
                  >
                    <span className="text-sm font-medium">Petunjuk {index + 1}</span>
                    {expandedHint === index ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>
                  {expandedHint === index && (
                    <div className="px-3 pb-3 text-sm text-muted-foreground">{hint}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Action Button */}
      <div className="p-4 border-t border-border bg-muted/30">
        <Button
          onClick={onCheckAnswer}
          disabled={isChecking}
          className={`w-full ios-button h-12 text-base font-semibold ${
            checkResult === 'correct'
              ? 'bg-[hsl(var(--ios-green))] hover:bg-[hsl(var(--ios-green))]'
              : checkResult === 'incorrect'
              ? 'bg-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))]'
              : 'ios-button-primary'
          }`}
        >
          {isChecking ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Memeriksa...
            </span>
          ) : checkResult === 'correct' ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Jawaban Benar!
            </span>
          ) : checkResult === 'incorrect' ? (
            <span className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Coba Lagi
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Cek Jawaban
              <kbd className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">Ctrl+Enter</kbd>
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};
