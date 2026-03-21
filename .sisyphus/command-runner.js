#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const commandsConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../.sisyphus/commands.json'), 'utf8'));

function parseValue(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (value === 'undefined') return undefined;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}

function parseArgs(args) {
  return args.reduce((acc, arg) => {
    const equalIndex = arg.indexOf('=');

    if (equalIndex === -1) {
      acc[arg.replace(/^--/, '')] = true;
      return acc;
    }

    const key = arg.slice(0, equalIndex).replace(/^--/, '');
    const value = arg.slice(equalIndex + 1);
    acc[key] = parseValue(value);
    return acc;
  }, {});
}

class CommandRunner {
  constructor(commandName, args = {}) {
    this.commandName = commandName;
    this.args = args;
    this.config = commandsConfig.commands[commandName];
  }

  async run() {
    if (!this.config) {
      throw new Error(`Command '${this.commandName}' not found`);
    }

    console.log(`🚀 Running command: ${this.commandName}`);
    
    if (this.config.script) {
      const scriptPath = path.join(__dirname, '..', this.config.script);
      require(scriptPath)(this.args);
    }

    console.log(`✅ Command '${this.commandName}' completed`);
  }

  renderTemplate(template, variables) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] || match;
    });
  }
}

if (require.main === module) {
  const [commandName, ...args] = process.argv.slice(2);
  
  if (!commandName) {
    console.log('Available commands:');
    Object.keys(commandsConfig.commands).forEach(cmd => {
      const config = commandsConfig.commands[cmd];
      console.log(`  ${cmd} - ${config.description}`);
    });
    process.exit(0);
  }

  const runner = new CommandRunner(commandName, parseArgs(args));
  runner.run().catch(console.error);
}

module.exports = CommandRunner;
