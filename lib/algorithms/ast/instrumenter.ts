import * as acorn from 'acorn';
import * as walk from 'acorn-walk';
import { generate } from 'astring';

export interface InstrumentResult {
  instrumentedCode: string;
  variables: string[];
}

/**
 * 概念验证 (POC): AST 动态代码插桩工具
 * 目的: 将用户输入的纯逻辑 JS 代码，自动转化为能在每一行或每次幅值后 yield 状态的生成器函数。
 */
export class Instrumenter {
  static instrument(code: string): InstrumentResult {
    // 强制包装成 async generator/generator 结构用于演示
    const ast = acorn.parse(code, { ecmaVersion: 2020, sourceType: 'module', locations: true });
    
    const variables = new Set<string>();

    walk.simple(ast, {
      VariableDeclarator(node: any) {
        if (node.id.type === 'Identifier') {
          variables.add(node.id.name);
        }
      },
      AssignmentExpression(node: any) {
        if (node.left.type === 'Identifier') {
          variables.add(node.left.name);
        }
      }
    });

    // 真正的深度插桩需要修改 AST，这里是一个简单的机制演示
    // 为了不破坏源 AST，这里做浅层次的手动修改或利用 astring custom generator
    // 注意：这里的实现为了保持作为 POC 的简单性，采用替换+注入的策略，展示基于 yield 的追踪
    
    let modifiedAst = JSON.parse(JSON.stringify(ast)); // clone
    
    walk.replace(modifiedAst, {
        AssignmentExpression(node: any) {
            // 在产生赋值时，我们想要包裹它或者在后面追加 yield
            // 真实工程中通常会把语句包装在 block 里面，并在后方追加 yield __captureState__(...)
            // 简单起见，本 POC 返回拦截代码 (基于 astring 的特殊扩展或源码重写)
            return node;
        }
    });
    
    // 我们用字符串替换做最直观的演示 (POC级):
    // 比如用户代码： let a = 1; \n a = 2;
    // 注入追踪：
    const rawLines = code.split('\n');
    const outLines = [];
    outLines.push('function* __instrumented_algo__() {');
    outLines.push('  const __vars__ = {};');
    for(let i=0; i<rawLines.length; i++) {
        outLines.push(`  ${rawLines[i]}`);
        if (rawLines[i].includes('let ') || rawLines[i].includes('var ') || rawLines[i].includes('const ') || rawLines[i].includes('=')) {
            outLines.push(`  yield { line: ${i+1}, type: 'STEP' };`);
        }
    }
    outLines.push('}');
    
    return {
        instrumentedCode: outLines.join('\n'),
        variables: Array.from(variables)
    };
  }
}
