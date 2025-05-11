import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts, mdxComponents, compileMDXContent } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    year: post.year,
    month: post.month,
    day: post.day,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { year: string; month: string; day: string; slug: string } }) {
  const post = await getPostBySlug(params.year, params.month, params.day, params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }

  return {
    title: post.title,
    description: `${post.title} - aibrief24`,
  };
}

export default async function PostPage({ params }: { params: { year: string; month: string; day: string; slug: string } }) {
  const post = await getPostBySlug(params.year, params.month, params.day, params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        href="/"
        className="text-brand-accent hover:underline mb-6 inline-block"
      >
        ← Back to all posts
      </Link>

      <article>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="mb-8 text-sm text-white">
          {post.formattedDate}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
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
        </div>

        <div className="mt-8 prose prose-lg max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>
    </div>
  );
} 