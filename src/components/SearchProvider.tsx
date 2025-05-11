'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { Post } from '@/lib/mdx';
import SearchModal from './SearchModal';

interface SearchContextType {
  posts: Post[];
}

const SearchContext = createContext<SearchContextType>({ posts: [] });

export function useSearch() {
  return useContext(SearchContext);
}

export default function SearchProvider({ 
  children, 
  posts 
}: { 
  children: ReactNode;
  posts: Post[];
}) {
  return (
    <SearchContext.Provider value={{ posts }}>
      <SearchModal initialPosts={posts} />
      {children}
    </SearchContext.Provider>
  );
} 