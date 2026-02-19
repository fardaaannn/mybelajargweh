/**
 * Code Actions Component
 * @module components/CodeActions
 * 
 * Provides code export, import, and fullscreen functionality.
 */

import React, { useState, useRef } from 'react';
import { 
  Download, 
  Upload, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check,
  FileCode,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { CodeState } from '@/types';

interface CodeActionsProps {
  /** Current code state */
  code: CodeState;
  /** Callback to set code */
  onSetCode: (code: CodeState) => void;
  /** Whether fullscreen is active */
  isFullscreen: boolean;
  /** Callback to toggle fullscreen */
  onToggleFullscreen: () => void;
}

/**
 * CodeActions Component
 * 
 * Provides export, import, copy, and fullscreen functionality for code.
 */
export const CodeActions: React.FC<CodeActionsProps> = ({
  code,
  onSetCode,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Export code as HTML file
   */
  const handleExport = () => {
    const fullHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeLearn Export</title>
  <style>
${code.css}
  </style>
</head>
<body>
${code.html.replace(/<html[^>]*>|<\/html>|<head[^>]*>[\s\S]*?<\/head>|<!DOCTYPE[^>]*>/gi, '')}
<script>
${code.js}
<\/script>
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codelearn-project.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * Import code from file
   */
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        // Simple parsing - extract content from body
        const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        const styleMatch = content.match(/<style[^>]*>([\s\S]*)<\/style>/i);
        const scriptMatch = content.match(/<script[^>]*>([\s\S]*)<\/script>/i);

        onSetCode({
          html: bodyMatch ? bodyMatch[1].trim() : content,
          css: styleMatch ? styleMatch[1].trim() : '',
          js: scriptMatch ? scriptMatch[1].trim() : '',
        });
      }
    };
    reader.readAsText(file);
  };

  /**
   * Import code from text
   */
  const handleTextImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (parsed.html !== undefined && parsed.css !== undefined && parsed.js !== undefined) {
        onSetCode(parsed);
        setShowImport(false);
        setImportText('');
      } else {
        alert('Format JSON tidak valid. Harus memiliki html, css, dan js.');
      }
    } catch (e) {
      alert('JSON tidak valid. Periksa formatnya.');
    }
  };

  /**
   * Copy code to clipboard
   */
  const handleCopy = async () => {
    const codeString = JSON.stringify(code, null, 2);
    await navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Share code (copy shareable link)
   */
  const handleShare = async () => {
    const codeString = btoa(JSON.stringify(code));
    const shareUrl = `${window.location.origin}${window.location.pathname}?code=${codeString}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        {/* Export */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleExport}
          className="h-8 w-8 rounded-lg"
          title="Export sebagai HTML"
        >
          <Download className="w-4 h-4" />
        </Button>

        {/* Import */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowImport(true)}
          className="h-8 w-8 rounded-lg"
          title="Import kode"
        >
          <Upload className="w-4 h-4" />
        </Button>

        {/* Copy */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-8 w-8 rounded-lg"
          title="Copy kode"
        >
          {copied ? <Check className="w-4 h-4 text-[hsl(var(--ios-green))]" /> : <Copy className="w-4 h-4" />}
        </Button>

        {/* Share */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
          className="h-8 w-8 rounded-lg"
          title="Bagikan kode"
        >
          <FileCode className="w-4 h-4" />
        </Button>

        {/* Fullscreen */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleFullscreen}
          className="h-8 w-8 rounded-lg"
          title={isFullscreen ? 'Keluar fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".html,.txt,.json"
        onChange={handleFileImport}
        className="hidden"
      />

      {/* Import Dialog */}
      <Dialog open={showImport} onOpenChange={setShowImport}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Import Kode</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* File Import */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Import dari File
              </label>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Pilih File (.html, .txt, .json)
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Atau
                </span>
              </div>
            </div>

            {/* Text Import */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Paste JSON Kode
              </label>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder={`{"html": "...", "css": "...", "js": "..."}`}
                className="w-full h-32 p-3 rounded-lg border border-input bg-background font-mono text-sm resize-none"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowImport(false)}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Batal
              </Button>
              <Button
                onClick={handleTextImport}
                className="flex-1 ios-button-primary"
                disabled={!importText.trim()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
