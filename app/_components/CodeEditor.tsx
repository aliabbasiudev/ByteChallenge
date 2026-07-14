import { useState } from "react";
import Editor from '@monaco-editor/react';
export default function CodeEditor({
  starterCode,
  onChange,
}: {
  starterCode: string;
  onChange: (val: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(starterCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
        <span className="text-xs font-mono text-muted-foreground">JavaScript</span>
        <button
          onClick={handleCopy}
          className="text-xs text-primary hover:text-primary/80 transition-colors"
        >
          {copied ? '✓ کپی شد' : 'کپی کد'}
        </button>
      </div>
      <Editor
        height="300px"
        defaultLanguage="javascript"
        value={starterCode}
        onChange={(val) => onChange(val || '')}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 16 },
        }}
      />
    </div>
  );
}