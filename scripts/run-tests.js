#!/usr/bin/env node

const { execSync } = require('child_process');

async function runTests(args) {
  const { component = '', coverage = false, type = 'all', watch = false, verbose = false } = args;
  
  try {
    let command = 'npm test';
    
    if (component) {
      command += ` -- ${component}`;
    }
    
    if (coverage) {
      command += ' --coverage';
    }
    
    if (type !== 'all') {
      command += ` --testPathPattern=${type}`;
    }
    
    if (watch) {
      command += ' --watch';
    }
    
    if (verbose) {
      command += ' --verbose';
    }

    console.log(`🧪 Running tests: ${command}`);
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    
    console.log('✅ Tests completed successfully');
    
  } catch (error) {
    console.error('❌ Tests failed:', error.message);
    process.exit(1);
  }
}

module.exports = runTests;