/**
 * Live Preview Component
 * @module components/editor/LivePreview
 * 
 * Renders live preview of HTML/CSS/JS code in an iframe with console capture.
 */

import React, { useRef, useEffect, useState } from 'react';
import { RefreshCw, Maximize2, Smartphone, Monitor, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LivePreviewProps {
  htmlContent: string;
  className?: string;
}

type ViewportMode = 'desktop' | 'mobile';

export const LivePreview: React.FC<LivePreviewProps> = ({
  htmlContent,
  className = '',
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [key, setKey] = useState(0);
  const [showConsole, setShowConsole] = useState(false);

  const handleRefresh = () => setKey(prev => prev + 1);
  const toggleViewport = () => setViewport(prev => prev === 'desktop' ? 'mobile' : 'desktop');

  // Auto-refresh on content change
  useEffect(() => {
    const timeout = setTimeout(() => setKey(prev => prev + 1), 500);
    return () => clearTimeout(timeout);
  }, [htmlContent]);

  // Inject console capture script
  const enhancedHTML = htmlContent.replace(
    '<script>',
    `<script>
      // Capture console output
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      const originalInfo = console.info;
      
      function sendToParent(level, message) {
        window.parent.postMessage({
          type: 'console',
          level: level,
          message: String(message)
        }, '*');
      }
      
      console.log = function(...args) {
        sendToParent('log', args.join(' '));
        originalLog.apply(console, args);
      };
      
      console.error = function(...args) {
        sendToParent('error', args.join(' '));
        originalError.apply(console, args);
      };
      
      console.warn = function(...args) {
        sendToParent('warn', args.join(' '));
        originalWarn.apply(console, args);
      };
      
      console.info = function(...args) {
        sendToParent('info', args.join(' '));
        originalInfo.apply(console, args);
      };
      
      // Capture errors
      window.onerror = function(msg, url, line) {
        sendToParent('error', msg + ' (line ' + line + ')');
        return false;
      };
    `
  );

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Live Preview</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--ios-green),0.15)] text-[hsl(var(--ios-green))]">
            Auto
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowConsole(!showConsole)}
            className={`h-8 w-8 rounded-lg ${showConsole ? 'bg-muted' : ''}`}
            title="Toggle console"
          >
            <Terminal className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleViewport}
            className="h-8 w-8 rounded-lg"
            title={viewport === 'desktop' ? 'Mobile view' : 'Desktop view'}
          >
            {viewport === 'desktop' ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className="h-8 w-8 rounded-lg"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const newWindow = window.open();
              if (newWindow) {
                newWindow.document.write(enhancedHTML);
                newWindow.document.close();
              }
            }}
            className="h-8 w-8 rounded-lg"
            title="Open in new tab"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] overflow-auto p-4">
        <div className={`mx-auto transition-all duration-300 ${viewport === 'mobile' ? 'max-w-[375px]' : 'w-full max-w-full'}`}>
          <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${viewport === 'mobile' ? 'min-h-[667px]' : 'min-h-[400px]'}`}>
            <iframe
              key={key}
              ref={iframeRef}
              srcDoc={enhancedHTML}
              title="Live Preview"
              className="w-full h-full"
              style={{ 
                minHeight: viewport === 'mobile' ? '667px' : '500px',
                border: 'none',
              }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>

      {/* Viewport Indicator */}
      <div className="px-3 py-1.5 bg-muted/30 border-t border-border text-xs text-muted-foreground text-center">
        {viewport === 'desktop' ? 'Desktop View' : 'Mobile View (375px)'}
      </div>
    </div>
  );
};
