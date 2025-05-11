#!/usr/bin/env node

/**
 * Post creation scaffold script
 * Usage: npm run new-post "My New Post Title"
 */

const fs = require('fs');
const path = require('path');

// Get post title from command line args
const postTitle = process.argv[2];

if (!postTitle) {
  console.error('Error: Post title is required');
  console.log('Usage: npm run new-post "My New Post Title"');
  process.exit(1);
}

// Create slug from title
const slug = postTitle
  .toLowerCase()
  .replace(/[^\w\s]/g, '')
  .replace(/\s+/g, '-');

// Get current date
const now = new Date();
const year = now.getFullYear().toString();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');

// Create directory path
const dirPath = path.join('content', year, month, day);

// Create directories if they don't exist
fs.mkdirSync(dirPath, { recursive: true });

// Create MDX file path
const filePath = path.join(dirPath, `${slug}.mdx`);

// Create MDX frontmatter and initial content
const content = `---
title: "${postTitle}"
date: ${year}-${month}-${day}
tags: [ai]
---

# ${postTitle}

Write your content here...

## Section One

- Point one
- Point two
- Point three

## Section Two

More content here...
`;

// Write file
fs.writeFileSync(filePath, content);

console.log(`✅ Created new post: ${filePath}`);
console.log(`You can now edit this file to add your content.`); 