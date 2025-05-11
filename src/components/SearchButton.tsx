'use client';

export default function SearchButton() {
  const handleClick = () => {
    // Create a keyboard event to trigger the search modal
    const e = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true
    });
    document.dispatchEvent(e);
  };

  return (
    <button 
      className="text-sm border border-white/20 rounded px-3 py-1.5 bg-brand-accent text-white hover:bg-opacity-80 transition-colors"
      onClick={handleClick}
    >
      Search (Ctrl+K)
    </button>
  );
} 