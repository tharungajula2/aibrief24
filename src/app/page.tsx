import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div 
            key={post.slug} 
            className="border border-gray-200 p-6 rounded-lg hover:border-brand-accent transition-colors"
          >
            <Link 
              href={`/post/${post.year}/${post.month}/${post.day}/${post.slug}`}
              className="block"
            >
              <h2 className="text-xl font-semibold mb-2 hover:text-brand-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-white">
                {post.formattedDate}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 