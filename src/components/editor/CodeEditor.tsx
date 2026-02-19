/**
 * Code Editor Component
 * @module components/editor/CodeEditor
 * 
 * Interactive code editor using CodeMirror with support for
 * HTML, CSS, and JavaScript with tab switching.
 */

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { useTheme } from '@/context/ThemeContext';
import type { EditorTab } from '@/types';
import { FileCode, Palette, Braces } from 'lucide-react';

/** Props for CodeEditor component */
interface CodeEditorProps {
  /** Current code for all languages */
  code: { html: string; css: string; js: string };
  /** Currently active tab */
  activeTab: EditorTab;
  /** Callback when code changes */
  onChange: (value: string) => void;
  /** Callback when tab switches */
  onTabChange: (tab: EditorTab) => void;
  /** Optional additional CSS classes */
  className?: string;
}

/** Tab configuration */
const tabs: { id: EditorTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'html', label: 'HTML', icon: FileCode },
  { id: 'css', label: 'CSS', icon: Palette },
  { id: 'js', label: 'JavaScript', icon: Braces },
];

/** Language extensions mapping */
const languageExtensions: Record<EditorTab, any> = {
  html: html(),
  css: css(),
  js: javascript({ jsx: false, typescript: false }),
};

/**
 * CodeEditor Component
 * 
 * Renders a tabbed code editor with:
 * - Three tabs: HTML, CSS, JavaScript
 * - Syntax highlighting via CodeMirror
 * - Dark/light theme support
 * - Line numbers and basic editing features
 * 
 * @example
 * ```tsx
 * <CodeEditor
 *   code={{ html, css, js }}
 *   activeTab="html"
 *   onChange={(v) => updateCode('html', v)}
 *   onTabChange={setActiveTab}
 * />
 * ```
 */
export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  activeTab,
  onChange,
  onTabChange,
  className = '',
}) => {
  const { isDark } = useTheme();

  // Get current code based on active tab
  const currentCode = code[activeTab];

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 px-2 pt-2 bg-[hsl(var(--editor-bg))] border-b border-[hsl(var(--editor-border))]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg
                transition-all duration-200
                ${isActive 
                  ? 'bg-background text-foreground border-t-2 border-[hsl(var(--ios-blue))]' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }
              `}
              aria-selected={isActive}
              role="tab"
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CodeMirror Editor */}
      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={currentCode}
          height="100%"
          theme={isDark ? oneDark : 'light'}
          extensions={[languageExtensions[activeTab]]}
          onChange={onChange}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            tabSize: 2,
          }}
          className="h-full text-sm"
          style={{
            fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Monaco, monospace',
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-muted/50 border-t border-[hsl(var(--editor-border))] text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>{activeTab.toUpperCase()}</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{currentCode.split('\n').length} lines</span>
          <span>{currentCode.length} chars</span>
        </div>
      </div>
    </div>
  );
};
