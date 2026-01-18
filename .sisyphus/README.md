# Sisyphus Command System

## Available Commands

### `/pr` - Create Pull Request
Automatically stages changes, creates commit, pushes to remote, and creates PR with template.

**Usage:**
```
/pr feature_name="Add dark mode toggle" description="Implemented theme switching functionality" changes="Updated theme provider and added toggle component" testing="Tested theme switching in browser"
```

### `/blog` - Create New Blog Post
Creates a new blog post with frontmatter and template content.

**Usage:**
```
/blog title="My New Post" tags="react,next.js,typescript" content="Initial draft content..."
```

### `/deploy` - Deploy to Production
Builds and deploys the application to production.

**Usage:**
```
/deploy
```

## Adding New Commands

1. Add command to `.sisyphus/commands.json`
2. Create script in `scripts/` directory
3. Update this README

## Template Variables

Available variables for templates:
- `{{feature_name}}` - Feature name for PR
- `{{title}}` - Blog post title
- `{{date}}` - Current date
- `{{tags}}` - Comma-separated tags
- `{{description}}` - Description text
- `{{changes}}` - Changes list
- `{{testing}}` - Testing notes