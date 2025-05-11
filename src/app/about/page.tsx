import Link from 'next/link';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About aibrief24</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg mb-4">
          Welcome to aibrief24, your source for 60-second AI news, bytes, and hacks.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="mb-4">
          We provide concise, easy-to-digest information about the rapidly evolving world of artificial intelligence. 
          Our goal is to keep you informed without overwhelming you with technical details.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Daily updates on the latest AI advancements</li>
          <li>Practical tips and tricks for using AI tools</li>
          <li>Insights into how AI is changing various industries</li>
          <li>Ethical considerations and responsible AI use</li>
        </ul>
        
        <p className="mt-8">
          <Link href="/" className="text-brand-accent hover:underline">
            Return to the homepage
          </Link> to see our latest posts.
        </p>
      </div>
    </div>
  );
} 