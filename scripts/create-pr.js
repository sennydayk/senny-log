#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function createPR(args) {
  const { feature_name, description, changes, testing } = args;
  
  if (!feature_name || !description) {
    console.error('❌ Missing required arguments: feature_name, description');
    process.exit(1);
  }

  try {
    // Git status check
    console.log('📋 Checking git status...');
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (!status.trim()) {
      console.log('⚠️  No changes to commit');
      process.exit(0);
    }

    // Add all changes
    console.log('📦 Staging changes...');
    execSync('git add .', { stdio: 'inherit' });

    // Create commit
    const commitMessage = `feat: ${feature_name}`;
    console.log(`📝 Creating commit: ${commitMessage}`);
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

    // Push to remote
    console.log('🚀 Pushing to remote...');
    execSync('git push -u origin $(git branch --show-current)', { stdio: 'inherit' });

    // Create PR using gh CLI
    const prTitle = `feat: ${feature_name}`;
    const prBody = `## Summary\n\n${description}\n\n## Changes\n\n- ${changes || 'Updated implementation'}\n\n## Testing\n\n- ${testing || 'Tested locally'}`;
    
    console.log('🔀 Creating Pull Request...');
    execSync(`gh pr create --title "${prTitle}" --body "${prBody}"`, { stdio: 'inherit' });

    console.log('✅ PR created successfully!');

  } catch (error) {
    console.error('❌ Error creating PR:', error.message);
    process.exit(1);
  }
}

module.exports = createPR;