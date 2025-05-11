import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format, parseISO } from 'date-fns';
import Copy from '@/components/Copy';

// MDX components map for custom components in MDX
export const mdxComponents = {
  Copy,
  // Add any other custom components here
};

export interface Post {
  title: string;
  date: string;
  formattedDate: string;
  content: string;
  slug: string;
  tags: string[];
  year: string;
  month: string;
  day: string;
}

const POSTS_PATH = path.join(process.cwd(), 'content');

export async function getAllPostPaths() {
  let paths: string[] = [];

  // Function to recursively scan directories
  const scanDir = (dir: string) => {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const itemPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        scanDir(itemPath);
      } else if (item.name.endsWith('.mdx')) {
        paths.push(itemPath);
      }
    }
  };

  // Start scanning from the content directory
  if (fs.existsSync(POSTS_PATH)) {
    scanDir(POSTS_PATH);
  }

  return paths;
}

// Helper function to safely format dates
function formatDate(dateValue: string | Date): { dateStr: string; formattedDate: string; dateObj: Date } {
  let dateObj: Date;
  let dateStr: string;
  let formattedDate: string;
  
  try {
    // Handle Date objects
    if (dateValue instanceof Date) {
      dateObj = dateValue;
      dateStr = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD format
      formattedDate = format(dateObj, 'MMMM d, yyyy');
      return { dateStr, formattedDate, dateObj };
    }
    
    // Handle ISO strings directly
    if (typeof dateValue === 'string' && dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
      dateObj = parseISO(dateValue);
      dateStr = dateValue;
      formattedDate = format(dateObj, 'MMMM d, yyyy');
      return { dateStr, formattedDate, dateObj };
    }
    
    // Handle other string formats by creating a Date object first
    dateObj = new Date(dateValue);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    
    dateStr = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD format
    formattedDate = format(dateObj, 'MMMM d, yyyy');
    return { dateStr, formattedDate, dateObj };
  } catch (error) {
    // Default to the original string if parsing fails
    console.error(`Error formatting date: ${dateValue}`);
    return { 
      dateStr: typeof dateValue === 'string' ? dateValue : String(dateValue),
      formattedDate: typeof dateValue === 'string' ? dateValue : String(dateValue),
      dateObj: new Date()
    };
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const postPaths = await getAllPostPaths();
  
  const posts = await Promise.all(
    postPaths.map(async (filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: markdownContent } = matter(content);
      
      // Extract date components from the file path
      // Expected format: content/YYYY/MM/DD/slug.mdx
      const pathSegments = filePath.split(path.sep);
      const yearIndex = pathSegments.findIndex(segment => segment === 'content') + 1;
      
      const year = pathSegments[yearIndex] || '';
      const month = pathSegments[yearIndex + 1] || '';
      const day = pathSegments[yearIndex + 2] || '';
      const fileNameWithExt = pathSegments[pathSegments.length - 1];
      const slug = fileNameWithExt.replace(/\.mdx$/, '');
      
      // Get date from frontmatter or construct from path
      const dateValue = data.date || `${year}-${month}-${day}`;
      const { dateStr, formattedDate } = formatDate(dateValue);
      
      return {
        title: data.title || 'Untitled',
        date: dateStr,
        formattedDate,
        content: markdownContent,
        slug,
        tags: data.tags || [],
        year,
        month,
        day,
      };
    })
  );
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    try {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } catch (error) {
      return 0;
    }
  });
}

export async function getPostBySlug(year: string, month: string, day: string, slug: string): Promise<Post | null> {
  const postPath = path.join(POSTS_PATH, year, month, day, `${slug}.mdx`);
  
  if (!fs.existsSync(postPath)) {
    return null;
  }
  
  const content = fs.readFileSync(postPath, 'utf8');
  const { data, content: markdownContent } = matter(content);
  
  // Get date from frontmatter or construct from path
  const dateValue = data.date || `${year}-${month}-${day}`;
  const { dateStr, formattedDate } = formatDate(dateValue);
  
  return {
    title: data.title || 'Untitled',
    date: dateStr,
    formattedDate,
    content: markdownContent,
    slug,
    tags: data.tags || [],
    year,
    month, 
    day,
  };
}

export async function compileMDXContent(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
    },
  });
  
  return content;
} 