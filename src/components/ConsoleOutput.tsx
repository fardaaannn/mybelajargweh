/**
 * Console Output Component
 * @module components/ConsoleOutput
 * 
 * Captures and displays console output from the preview iframe.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Trash2, X, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Console message type */
interface ConsoleMessage {
  id: string;
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: Date;
}

interface ConsoleOutputProps {
  /** Whether console is visible */
  isOpen: boolean;
  /** Callback to toggle visibility */
  onToggle: () => void;
}

/**
 * ConsoleOutput Component
 * 
 * Captures console messages from iframe and displays them.
 */
export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
  isOpen,
  onToggle,
}) => {
  const [messages, setMessages] = useState<ConsoleMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll to bottom when new messages arrive
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Listen for messages from iframe
   */
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'console') {
        const newMessage: ConsoleMessage = {
          id: Math.random().toString(36).substr(2, 9),
          type: event.data.level,
          message: event.data.message,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, newMessage]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  /**
   * Clear all messages
   */
  const clearConsole = () => {
    setMessages([]);
  };

  /**
   * Get icon for message type
   */
  const getIcon = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'warn':
        return <AlertCircle className="w-4 h-4 text-[hsl(var(--ios-orange))]" />;
      case 'info':
        return <Info className="w-4 h-4 text-[hsl(var(--ios-blue))]" />;
      case 'log':
      default:
        return <CheckCircle2 className="w-4 h-4 text-[hsl(var(--ios-green))]" />;
    }
  };

  /**
   * Get color class for message type
   */
  const getColorClass = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error':
        return 'text-destructive';
      case 'warn':
        return 'text-[hsl(var(--ios-orange))]';
      case 'info':
        return 'text-[hsl(var(--ios-blue))]';
      case 'log':
      default:
        return 'text-foreground';
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="
          fixed bottom-20 left-6 z-40
          w-10 h-10 rounded-full
          bg-muted hover:bg-muted/80
          flex items-center justify-center
          transition-colors
        "
        title="Toggle console"
        aria-label="Tampilkan console"
      >
        <Terminal className="w-5 h-5" />
        {messages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[hsl(var(--ios-blue))] text-white text-xs rounded-full flex items-center justify-center">
            {messages.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 w-96 max-w-[calc(100vw-48px)]">
      <div className="ios-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span className="font-medium text-sm">Console</span>
            <span className="text-xs text-muted-foreground">
              ({messages.length})
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={clearConsole}
              className="h-8 w-8"
              title="Clear console"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
              title="Close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="max-h-60 overflow-auto p-2 space-y-1">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <Terminal className="w-8 h-8 mx-auto mb-2 opacity-50" />
              Console kosong
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 p-2 rounded-lg text-sm font-mono ${getColorClass(msg.type)}`}
              >
                {getIcon(msg.type)}
                <span className="flex-1 break-all">{msg.message}</span>
                <span className="text-xs text-muted-foreground opacity-50">
                  {msg.timestamp.toLocaleTimeString('id-ID', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};
