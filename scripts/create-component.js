#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function createComponent(args) {
  const { name, type = 'component', props = '', imports = '', story = false, test = false } = args;
  
  if (!name) {
    console.error('❌ Missing required argument: name');
    process.exit(1);
  }

  const componentDir = path.join(__dirname, '../components', type === 'page' ? 'pages' : 'ui');
  const componentPath = path.join(componentDir, `${name}.tsx`);
  const testPath = path.join(componentDir, `${name}.test.tsx`);
  const storyPath = path.join(componentDir, `${name}.stories.tsx`);

  const propsList = props.split(',').map(prop => {
    const [propName, propType] = prop.trim().split(':');
    return { name: propName.trim(), type: propType?.trim() || 'any' };
  });

  const propsInterface = propsList.length > 0 ? 
    `interface ${name}Props {\n  ${propsList.map(p => `${p.name}: ${p.type};`).join('\n  ')}\n}` : '';

  const componentCode = `${imports ? `${imports}\n` : ''}import React from 'react';\n${propsInterface ? `\n${propsInterface}\n` : ''}
export default function ${name}${propsInterface ? `({ ${propsList.map(p => p.name).join(', ')} }: ${name}Props)` : ''}() {
  return (
    <div className="${name.toLowerCase()}">
      <h1>${name} Component</h1>
      ${propsList.map(p => `<p>${p.name}: {${p.name}}</p>`).join('\n      ')}
    </div>
  );
}`;

  const testCode = test ? `import { render, screen } from '@testing-library/react';
import ${name} from './${name}';

describe('${name}', () => {
  it('renders correctly', () => {
    render(<${name} ${propsList.length > 0 ? `${propsList.map(p => `${p.name}={${p.type === 'string' ? `'test'` : p.type === 'number' ? '1' : '{}'}`}`).join(' ')}` : ''} />);
    expect(screen.getByText('${name} Component')).toBeInTheDocument();
  });
});` : '';

  const storyCode = story ? `import type { Meta, StoryObj } from '@storybook/react';
import ${name} from './${name}';

const meta: Meta<typeof ${name}> = {
  title: '${type}/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ${propsList.map(p => `${p.name}: ${p.type === 'string' ? `'Hello'` : p.type === 'number' ? '42' : '{}'}`).join(',\n    ')}
  },
};` : '';

  try {
    fs.mkdirSync(componentDir, { recursive: true });
    
    fs.writeFileSync(componentPath, componentCode);
    console.log(`✅ Component created: ${componentPath}`);
    
    if (test) {
      fs.writeFileSync(testPath, testCode);
      console.log(`✅ Test created: ${testPath}`);
    }
    
    if (story) {
      fs.writeFileSync(storyPath, storyCode);
      console.log(`✅ Story created: ${storyPath}`);
    }

    const indexPath = path.join(componentDir, 'index.ts');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      const exportLine = `export { default as ${name} } from './${name}';`;
      
      if (!indexContent.includes(exportLine)) {
        fs.writeFileSync(indexPath, indexContent + '\n' + exportLine);
        console.log(`✅ Export added to index.ts`);
      }
    }

  } catch (error) {
    console.error('❌ Error creating component:', error.message);
    process.exit(1);
  }
}

module.exports = createComponent;