/**
 * Feedback Button Component
 * @module components/FeedbackButton
 * 
 * Floating feedback button for users to report issues or suggestions.
 */

import React, { useState } from 'react';
import { MessageCircle, X, Send, Bug, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { trackEvent } from './Analytics';

/**
 * FeedbackButton Component
 * 
 * Floating action button that opens a feedback form.
 */
export const FeedbackButton: React.FC<{ floating?: boolean }> = ({ floating = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'bug' | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() || !feedbackType) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Track feedback submission
    trackEvent('Feedback Submitted', {
      type: feedbackType,
      message_length: message.length,
    });

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setMessage('');
      setFeedbackType(null);
    }, 2000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`
          ${floating ? 'fixed bottom-6 right-6 z-50' : ''}
          w-14 h-14 rounded-full
          bg-gradient-to-br from-[hsl(var(--ios-blue))] to-[hsl(var(--ios-purple))]
          text-white shadow-lg
          flex items-center justify-center
          hover:scale-110 active:scale-95
          transition-transform duration-200
        `}
        aria-label="Beri feedback"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`${floating ? 'fixed bottom-6 right-6' : ''} z-50 w-80`}>
      <div className="ios-card p-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Beri Feedback</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[hsl(var(--ios-green),0.15)] flex items-center justify-center">
              <Send className="w-6 h-6 text-[hsl(var(--ios-green))]" />
            </div>
            <p className="font-medium">Terima kasih!</p>
            <p className="text-sm text-muted-foreground">
              Feedback Anda sangat berarti.
            </p>
          </div>
        ) : (
          <>
            {/* Feedback Type */}
            {!feedbackType ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFeedbackType('suggestion')}
                  className="p-3 rounded-xl border border-border hover:border-[hsl(var(--ios-blue))] hover:bg-[hsl(var(--ios-blue),0.05)] transition-colors text-center"
                >
                  <Lightbulb className="w-6 h-6 mx-auto mb-2 text-[hsl(var(--ios-yellow))]" />
                  <span className="text-sm font-medium">Saran</span>
                </button>
                <button
                  onClick={() => setFeedbackType('bug')}
                  className="p-3 rounded-xl border border-border hover:border-[hsl(var(--ios-blue))] hover:bg-[hsl(var(--ios-blue),0.05)] transition-colors text-center"
                >
                  <Bug className="w-6 h-6 mx-auto mb-2 text-[hsl(var(--destructive))]" />
                  <span className="text-sm font-medium">Laporkan Bug</span>
                </button>
              </div>
            ) : (
              <>
                {/* Feedback Form */}
                <Textarea
                  placeholder={
                    feedbackType === 'suggestion'
                      ? 'Bagaimana kami bisa meningkatkan CodeLearn?'
                      : 'Jelaskan masalah yang Anda temui...'
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px] mb-3 resize-none"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setFeedbackType(null)}
                    className="flex-1 rounded-xl"
                  >
                    Kembali
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!message.trim() || isSubmitting}
                    className="flex-1 ios-button-primary"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Kirim
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
