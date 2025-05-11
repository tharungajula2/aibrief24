'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import type { Post } from '@/lib/mdx';

interface SearchModalProps {
  initialPosts: Post[];
}

export default function SearchModal({ initialPosts }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const router = useRouter();

  // Memoize Fuse.js instance to prevent recreation on each render
  const fuse = useMemo(() => new Fuse(initialPosts, {
    keys: ['title', 'tags'],
    threshold: 0.3,
  }), [initialPosts]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      
      // Close with Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Perform search when query changes
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
    } else {
      const searchResults = fuse.search(query).map(({ item }) => item);
      setResults(searchResults);
    }
  }, [query, fuse]);

  // Navigate to post and close modal
  const handleSelect = (post: Post) => {
    router.push(`/post/${post.year}/${post.month}/${post.day}/${post.slug}`);
    setIsOpen(false);
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 backdrop-blur-sm bg-black/70">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full p-2 bg-transparent focus:outline-none text-gray-800 dark:text-white placeholder-gray-500"
              autoFocus
            />
            <button 
              onClick={() => setIsOpen(false)}
              className="ml-2 px-2 py-1 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              ESC
            </button>
          </div>
        </div>
        
        {results.length > 0 && (
          <ul className="max-h-96 overflow-y-auto">
            {results.map((post) => (
              <li key={post.slug}>
                <button
                  onClick={() => handleSelect(post)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-between items-center border-b border-gray-100 dark:border-gray-800"
                >
                  <span className="text-gray-800 dark:text-gray-200">{post.title}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.formattedDate}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        
        {query && results.length === 0 && (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No results found for "{query}"
          </div>
        )}
        
        {!query && (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            Type to search posts
          </div>
        )}
      </div>
    </div>
  );
} 