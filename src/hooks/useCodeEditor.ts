/**
 * Custom Hook for Code Editor State Management
 * @module hooks/useCodeEditor
 * 
 * Manages code state (HTML, CSS, JS) and provides utility functions
 * for the code editor component.
 */

import { useState, useCallback, useEffect } from 'react';
import type { CodeState, EditorTab } from '@/types';

/** Default starter code templates */
const defaultCode: CodeState = {
  html: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Welcome to my first web page.</p>
  <button id="myButton">Click Me!</button>
</body>
</html>`,
  css: `/* Styling for the page */
body {
  font-family: 'Inter', sans-serif;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  margin: 0;
}

h1 {
  color: white;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-size: 1.2rem;
}

button {
  display: block;
  margin: 20px auto;
  padding: 12px 24px;
  font-size: 1rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}`,
  js: `// JavaScript for interactivity
const button = document.getElementById('myButton');
let clickCount = 0;

button.addEventListener('click', () => {
  clickCount++;
  button.textContent = \`Clicked \${clickCount} time\${clickCount > 1 ? 's' : ''}!\`;
  
  // Add a fun animation
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 100);
});

console.log('Page loaded successfully!');`,
};

interface UseCodeEditorReturn {
  /** Current code state for all three languages */
  code: CodeState;
  /** Currently active editor tab */
  activeTab: EditorTab;
  /** Update code for a specific language */
  updateCode: (language: EditorTab, newCode: string) => void;
  /** Switch active tab */
  setActiveTab: (tab: EditorTab) => void;
  /** Reset code to starter templates */
  resetCode: () => void;
  /** Set all code at once (useful for loading exercises) */
  setAllCode: (newCode: CodeState) => void;
  /** Combined HTML output for iframe preview */
  combinedOutput: string;
  /** Check if code has been modified from default */
  isModified: boolean;
}

/**
 * Custom hook for managing code editor state
 * @param initialCode - Optional initial code to override defaults
 * @returns Code editor state and control functions
 */
export const useCodeEditor = (initialCode?: Partial<CodeState>): UseCodeEditorReturn => {
  // Merge default code with any provided initial code
  const [code, setCode] = useState<CodeState>({
    ...defaultCode,
    ...initialCode,
  });

  const [activeTab, setActiveTabState] = useState<EditorTab>('html');
  const [isModified, setIsModified] = useState(false);

  // Load saved code from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('codelearn-saved-code');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCode(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.warn('Failed to load saved code:', e);
      }
    }
  }, []);

  // Auto-save to localStorage when code changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('codelearn-saved-code', JSON.stringify(code));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [code]);

  /**
   * Update code for a specific language
   * @param language - Which language to update (html/css/js)
   * @param newCode - The new code content
   */
  const updateCode = useCallback((language: EditorTab, newCode: string) => {
    setCode(prev => ({ ...prev, [language]: newCode }));
    setIsModified(true);
  }, []);

  /**
   * Switch the active editor tab
   * @param tab - Tab to switch to
   */
  const setActiveTab = useCallback((tab: EditorTab) => {
    setActiveTabState(tab);
  }, []);

  /** Reset all code to default templates */
  const resetCode = useCallback(() => {
    setCode(defaultCode);
    setIsModified(false);
    localStorage.removeItem('codelearn-saved-code');
  }, []);

  /**
   * Set all code at once (useful for loading exercise templates)
   * @param newCode - Complete code state object
   */
  const setAllCode = useCallback((newCode: CodeState) => {
    setCode(newCode);
    setIsModified(false);
  }, []);

  /**
   * Combine HTML, CSS, and JS into a single HTML document for preview
   * This creates a complete standalone HTML page with inline styles and scripts
   */
  const combinedOutput = (() => {
    // Extract body content from HTML
    const bodyMatch = code.html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : code.html;
    
    // Extract head content from HTML
    const headMatch = code.html.match(/<head[^>]*>([\s\S]*)<\/head>/i);
    const headContent = headMatch ? headMatch[1] : '';

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${headContent}
  <style>
    ${code.css}
  </style>
</head>
<body>
  ${bodyContent}
  <script>
    ${code.js}
  <\/script>
</body>
</html>`;
  })();

  return {
    code,
    activeTab,
    updateCode,
    setActiveTab,
    resetCode,
    setAllCode,
    combinedOutput,
    isModified,
  };
};
