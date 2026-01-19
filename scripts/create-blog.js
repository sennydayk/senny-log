#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function createBlogPost(args) {
  const { title, tags, content } = args;
  
  if (!title) {
    console.error('❌ Missing required argument: title');
    process.exit(1);
  }

  const date = new Date().toISOString().split('T')[0];
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const filename = `${date}-${slug}.md`;
  const filepath = path.join(__dirname, '../content/blog', filename);

  const frontmatter = `---
title: "${title}"
date: "${date}"
tags: [${tags || 'blog'}]
---

${content || '# ' + title + '\n\nWrite your content here...'}`;

  try {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, frontmatter);
    console.log(`✅ Blog post created: ${filename}`);
    console.log(`📁 Location: ${filepath}`);
  } catch (error) {
    console.error('❌ Error creating blog post:', error.message);
    process.exit(1);
  }
}

module.exports = createBlogPost;