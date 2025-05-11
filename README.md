# aibrief24 - AI News Knowledge Base

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/tharung/aibrief24)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Deploy](https://img.shields.io/badge/deployment-ready-success)](https://aibrief24.vercel.app)

A modern, static MDX knowledge base for aibrief24, built with Next.js 14 App Router. This platform delivers 60-second AI news bites in a clean, accessible format.

## 📚 Features

- **MDX Content Management**: Store and render content from `/content/YYYY/MM/DD/*.mdx`
- **Responsive Design**: Fully responsive with Tailwind CSS
- **[Keyboard-Driven Search](#-search-functionality)**: Client-side search with Cmd/Ctrl+K shortcut ([see demo](/public/readme/search-demo.gif))
- **Brand Identity**: Consistent branding with colors (black #000000, white #FFFFFF, accent #02958c)
- **Static Generation**: Fast page loads with static site generation
- **Chronological Posts**: Automatically sorted newest-first

## 🏗️ Project Structure

<details>
<summary>Click to expand complete directory structure</summary>

```
aibrief24/
├── content/              # Content files (MDX)
│   └── YYYY/MM/DD/       # Organized by date
│       └── post-slug.mdx # Individual posts
├── public/               # Static assets
│   └── logo.svg          # Site logo
├── src/                  # Source code
│   ├── app/              # Next.js App Router
│   │   ├── (site)/       # Route group (optional)
│   │   ├── about/        # About page
│   │   ├── post/         # Dynamic post routes
│   │   ├── layout.tsx    # Root layout
│   │   ├── globals.css   # Global styles
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable components
│   │   ├── SearchButton.tsx  # Search trigger button
│   │   ├── SearchModal.tsx   # Search interface
│   │   └── SearchProvider.tsx # Search context
│   ├── lib/              # Utility functions
│   │   └── mdx.ts        # MDX processing logic
│   └── types/            # TypeScript type definitions
├── package.json          # Dependencies
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```
</details>

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aibrief24.git
   cd aibrief24
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to see your site.

## 📝 Content Management Guide

### Adding a New Post

1. **Create the Directory Structure**:
   First, create directories for the date if they don't exist. For example, for a post on May 15, 2024:
   ```
   content/2024/05/15/
   ```
   
   > **Pro Tip**: Use the included CLI scaffold script to quickly create new posts with proper structure:
   > ```bash
   > npm run new-post "My Post Title"
   > ```

2. **Create an MDX File**:
   Create a new `.mdx` file in the directory with a slug-friendly name:
   ```
   content/2024/05/15/new-ai-research.mdx
   ```

3. **Add Frontmatter**:
   Every post needs metadata at the top between triple dashes:
   ```mdx
   ---
   title: "New AI Research Breakthrough"
   date: 2024-05-15
   tags: [research, AI, machine-learning]
   ---

   # New AI Research Breakthrough

   Researchers announced a significant advancement in natural language processing today...
   ```

4. **Write Content in Markdown**:
   Below the frontmatter, write your content using Markdown formatting.

### Example Post (AI Ethics Guidelines)

Here's a complete example of a post file located at `content/2024/05/17/ai-ethics-guidelines.mdx`:

```mdx
---
title: "New AI Ethics Guidelines Released by Industry Consortium"
date: 2024-05-17
tags: [ethics, guidelines, industry, AI]
---

# New AI Ethics Guidelines Released

The Global AI Consortium has published a comprehensive set of ethics guidelines today aimed at standardizing responsible AI development.

## Key Points

- Transparency requirements for AI decision-making
- Bias testing frameworks for all consumer-facing applications
- Data privacy standards that exceed current regulations
- Accountability mechanisms for AI-related incidents

## Industry Response

Initial reactions from tech leaders have been positive, with several major companies already pledging to implement these guidelines by year-end.

"This represents a significant step forward for responsible AI development," said Jane Smith, CTO of TechCorp.

## What's Next

The guidelines will be reviewed quarterly to accommodate the rapid pace of AI advancement.
```

### Post Format Specifications

- **Title**: Should be clear and concise (50-70 characters recommended)
- **Date**: Use YYYY-MM-DD format
- **Tags**: Use 3-5 relevant tags in [square, brackets]
- **Content**: Use Markdown headings, lists, and formatting for readability
- **Images**: Store in `/public/images/` and reference as `/images/filename.jpg`

## 🎨 Customization Guide

### Changing the Logo

1. Replace the logo file in the `/public` directory:
   - Save your logo as `logo.svg` (preferred) or `logo.png`
   - Recommended size: 40x40 pixels
   - For best results: use a square logo with even padding

2. If your logo has different dimensions:
   - Edit `src/app/layout.tsx`
   - Find the `<Image>` component with `src="/logo.svg"`
   - Adjust the `width`, `height`, or `className` properties

### Changing Brand Colors

1. Edit the Tailwind configuration in `tailwind.config.ts`:
   ```typescript
   theme: {
     extend: {
       colors: {
         brand: {
           black: '#000000', // Change this
           white: '#FFFFFF', // Change this
           accent: '#02958c', // Change this
         },
       },
     },
   }
   ```

2. After changing colors, restart the development server.

## 🔍 Search Functionality

The site includes a powerful client-side search:

- **Keyboard Shortcut**: Press `Ctrl+K` (Windows/Linux) or `Cmd+K` (Mac) to open
- **Search Engine**: Uses Fuse.js for fuzzy matching
- **Search Scope**: Searches both post titles and tags
- **Real-time Results**: Updates as you type

## 📱 Responsive Design

The site is fully responsive:
- **Mobile**: Clean single-column layout with hidden navigation
- **Tablet**: Expanded layout with visible navigation
- **Desktop**: Full layout with additional spacing and features

## 🛠️ Technical Details

### Key Technologies

- **Next.js 14**: App Router, Server Components, Static Generation
- **TypeScript**: Type safety throughout the codebase
- **Tailwind CSS**: Utility-first styling
- **MDX**: Extended Markdown for content
- **next-mdx-remote**: MDX rendering
- **Fuse.js**: Fast fuzzy search
- **date-fns**: Date formatting and manipulation

### File Processing Pipeline

1. **Content Discovery**: The system scans the `/content` directory
2. **Frontmatter Parsing**: Extracts metadata from each MDX file
3. **Date Processing**: Parses and formats dates for display and sorting
4. **Content Transformation**: Converts MDX to React components
5. **Static Generation**: Pre-renders pages at build time for performance

## 📚 Advanced Usage

### Adding Custom React Components to MDX

You can enhance your MDX content with custom React components:

1. Create a component in `src/components/`:
   ```tsx
   // src/components/InfoBox.tsx
   export default function InfoBox({ children }) {
     return <div className="bg-blue-50 p-4 border-l-4 border-blue-500">{children}</div>;
   }
   ```

2. Configure the component in `src/lib/mdx.ts`

3. Use it in your MDX files:
   ```mdx
   <InfoBox>
     This is important information in a custom component.
   </InfoBox>
   ```

### Deployment

Deploy to Vercel for the simplest experience:

1. Push your code to GitHub/GitLab
2. Import to [Vercel](https://vercel.com/new)
3. Select the repository and deploy

Alternatively, build for any static hosting:

```bash
npm run build
# Output in .next/static directory
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

Copyright (c) 2025 Tharun G

## 🙏 Acknowledgments

- Next.js team for the fantastic framework
- Vercel for hosting and infrastructure
- All contributors to the open-source packages used


Below is an **add‑on section** you can paste **after** the current README (no deletions needed).
It covers everything we built since the last edit—written so even a total beginner can follow.

---

````markdown
---

## ✨ New in v1.1 (2025‑05‑17)

### What Was Added?

| Feature | Why it Matters | Where it Lives |
|---------|----------------|----------------|
| **Copy Button component** | Lets readers copy prompts or code in one click. | `src/components/Copy.tsx` |
| **Custom MDX components map** | Enables special tags (`<Copy />`, future `<InfoBox />`). | exported as `mdxComponents` in `src/lib/mdx.ts` |
| **Ordered‑list styling** | All Markdown `1.` `2.` lists show nice numbers automatically. | `src/app/globals.css` |
| **Logo & Brand colours** | Swapped in `logo.svg`, accent `#02958c`. | `/public` + Tailwind config |
| **PDF / external link pattern** | Keep big files off Vercel; link instead. | Example inside *Google White‑Paper* post |
| **Keyboard Search Hot‑key** | Press **Ctrl + K** / **⌘ + K** on any page to open instant search. | `src/components/Search*` |

---

## 👶 Absolute Beginner Workflow

1. **Start the site locally**  
   ```bash
   npm run dev
````

Keep this tab open—changes auto‑reload.

2. **Add a new post (fast way)**

   ```bash
   mkdir -p content/2025/05/18
   touch content/2025/05/18/my-first-hack.mdx
   ```

   Copy this template inside:

   ```mdx
   ---
   title: "Title Goes Here"
   date: 2025-05-18
   tags: [ai, hack]
   ---

   # Big Heading

   Main text here.

   <Copy text={`Put something here people will want to copy`} />
   ```

3. **Refresh the browser** → the new post appears on the homepage, search index updates, and the **Copy** pill shows up.

4. **Need a download?**
   Drop any small file in `/public/files/` then link:

   ```mdx
   [Download PDF](/files/google-whitepaper.pdf)
   ```

5. **Push to Git → Vercel**

   ```bash
   git add .
   git commit -m "add 2025-05-18 first hack"
   git push origin main
   ```

   Vercel auto‑deploys; share the URL in your IG bio.

---

## 🔧 Copy Button – How It Works

| Step | What You Do                                          | What Users See                    |
| ---- | ---------------------------------------------------- | --------------------------------- |
| 1    | Write: `<Copy text={`your text`} />` anywhere in MDX | Grey “Copy” pill appears          |
| 2    | User clicks button                                   | Prompt is silently copied         |
| 3    | User pastes (Ctrl + V)                               | Full text appears in their editor |

> **Tip:** use `\n` for new lines **inside** the back‑ticked string.

---

## 🗂️ Storage & Limits

| Resource | Typical Size             | Free‑tier Cushion                      |
| -------- | ------------------------ | -------------------------------------- |
| MDX file | 2–5 KB                   | \~200 000 posts before 1 GB repo limit |
| Image    | <1 MB                    | OK—served from Vercel CDN              |
| PDF      | Link externally if >5 MB | Avoids eating monthly 100 GB bandwidth |

---

## 🩺 Quick‑Fix Checklist

| Issue                             | Try This                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| Copy button renders as plain text | Ensure `components: mdxComponents` is passed to `compileMDX` **and** the MDX tag uses back‑ticks |
| New post not found in search      | Hard‑refresh browser (Ctrl + Shift + R) while dev server runs                                    |
| Numbers disappear on lists        | Keep one blank line before the list or wrap items in `<ol>`                                      |
| Dev server errors about date      | Make sure front‑matter `date:` is `YYYY-MM-DD`                                                   |

---

## 🚦 Next Tiny Upgrades (optional)

1. **Copy icon tooltip** (“Copied ✓”) with React state.
2. **OG‑image generation** per post (`@vercel/og`) for prettier social shares.
3. **CLI scaffold script** (`npm run new-post "Title"`) to automate step #2 above.

Happy shipping! If you ever get stuck, open an Issue or DM @aibrief24.

```

Copy that block beneath your existing README content and commit.  
Everything you’ve achieved together is now documented in plain‑speak for any newcomer—or future you!
```
