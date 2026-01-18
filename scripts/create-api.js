#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function createAPI(args) {
  const { endpoint, method = 'GET', description = '', auth = false, validation = false, middleware = '' } = args;
  
  if (!endpoint) {
    console.error('❌ Missing required argument: endpoint');
    process.exit(1);
  }

  const apiDir = path.join(__dirname, '../app/api', endpoint);
  const routePath = path.join(apiDir, 'route.ts');
  const handlerPath = path.join(apiDir, 'handler.ts');
  const typesPath = path.join(apiDir, 'types.ts');
  const testPath = path.join(apiDir, 'route.test.ts');

  // 타입 정의 생성
  const typesCode = `export interface ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}Request {
  // Add request properties here
}

export interface ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}Response {
  success: boolean;
  data?: any;
  error?: string;
}`;

  // 핸들러 생성
  const handlerCode = `import { ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}Request, ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}Response } from './types';

export async function handle${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}(request: ${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}Request): Promise<${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}Response> {
  try {
    // Add your business logic here
    return {
      success: true,
      data: { message: '${endpoint} endpoint working' }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}`;

  // 라우트 생성
  const routeCode = `import { NextRequest, NextResponse } from 'next/server';
${auth ? "import { verifyAuth } from '@/lib/auth';" : ""}
${validation ? "import { validateRequest } from '@/lib/validation';" : ""}
${middleware ? `import { ${middleware} } from '@/lib/middleware';` : ""}
import { handle${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} } from './handler';

export async function ${method.toLowerCase()}(request: NextRequest) {
  try {
${auth ? "    const authResult = await verifyAuth(request);\n    if (!authResult.success) {\n      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });\n    }\n" : ""}
${validation ? "    const validation = await validateRequest(request);\n    if (!validation.success) {\n      return NextResponse.json({ error: validation.error }, { status: 400 });\n    }\n" : ""}
${middleware ? `    const middlewareResult = await ${middleware}(request);\n    if (!middlewareResult.success) {\n      return NextResponse.json({ error: middlewareResult.error }, { status: middlewareResult.status || 500 });\n    }\n` : ""}

    const result = await handle${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}(await request.json());
    
    return NextResponse.json(result, { 
      status: result.success ? 200 : 500 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }, { status: 500 });
  }
}

${method !== 'GET' ? `export async function POST(request: NextRequest) {
  return ${method.toLowerCase()}(request);
}` : ""}`;

  // 테스트 코드 생성
  const testCode = `import { createMocks } from 'node-mocks-http';
import { ${method.toLowerCase()} } from './route';

describe('/api/${endpoint}', () => {
  it('should handle ${method.toLowerCase()} requests', async () => {
    const { req } = createMocks({
      method: '${method}',
      url: '/api/${endpoint}',
    });

    const response = await ${method.toLowerCase()}(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});`;

  try {
    fs.mkdirSync(apiDir, { recursive: true });
    
    fs.writeFileSync(typesPath, typesCode);
    console.log(`✅ Types created: ${typesPath}`);
    
    fs.writeFileSync(handlerPath, handlerCode);
    console.log(`✅ Handler created: ${handlerPath}`);
    
    fs.writeFileSync(routePath, routeCode);
    console.log(`✅ Route created: ${routePath}`);
    
    fs.writeFileSync(testPath, testCode);
    console.log(`✅ Test created: ${testPath}`);

  } catch (error) {
    console.error('❌ Error creating API:', error.message);
    process.exit(1);
  }
}

module.exports = createAPI;