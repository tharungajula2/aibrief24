"use client";

export default function Copy({ text }: { text: string }) {
  return (
    <button
      className="inline-flex items-center px-2 py-1 ml-2 text-xs font-medium rounded border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
      onClick={() => navigator.clipboard.writeText(text)}
    >
      <svg 
        className="w-3 h-3 mr-1" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copy
    </button>
  );
} 