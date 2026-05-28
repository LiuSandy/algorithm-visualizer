import { AlgorithmDefinition } from '../../types';

export const hashTable: AlgorithmDefinition = {
  id: 'hash-table',
  name: '散列表碰撞模拟 (Hash Tables)',
  category: 'Practical' as const,
  description: '哈希表利用哈希函数高效存储和查找键值对。',
  theory: {
    introduction: '哈希表 (Hash Table) 通过哈希函数将键映射到数组中的特定位置，实现最快速的数据查找和插入。当发生冲突时，通过链地址法或开放寻址法解决。',
    timeComplexity: '平均 O(1)',
    spaceComplexity: 'O(N)',
    applications: ['缓存系统', '数据库索引', '对象属性存储'],
      core: "通过哈希函数将关键字键映射转换为数组下标来存储内容。解决碰撞时常采用拉链法或开放寻址法，达成近乎O(1)的理论随机读写复杂度。",
      analogy: "像是去火车站寄存行李：根据你的名字和特殊密码算出一个固定的柜子号码，如果是空着就直接放进去。如果有人放了，就顺着在柜子里放一张指路条（拉链表）去另一个地方找你的包。",
      scenarios: "适用场景：高频字典键值查询、缓存数据加速",
      practical: "不胜枚举！是整个计算机科学领域的“基建”，从 Node.js / Java 里的底层数据对象映射到底层内存缓存机制，是超高吞吐微服务中存放热点关联关系不可替代的铁托架构。"
},
  coreSteps: ['初始化', '执行核心逻辑', '返回结果'],
  timeComplexity: {
    best: 'O(1)',
    average: 'O(N)',
    worst: 'O(N^2)'
  },
  spaceComplexity: 'O(N)',
  code: `
/**
 * 散列表碰撞模拟 (Hash Tables)
 */
class HashTableOpenAddressing {
  constructor(size = 10) {
    this.table = new Array(size);
    this.size = size;
  }
  
  hash(key) {
    let hash = 0;
    for (let char of key) {
      hash += char.charCodeAt(0);
    }
    return hash % this.size;
  }
  
  set(key, value) {
    let index = this.hash(key);
    let i = 0;
    while (this.table[(index + i) % this.size] !== undefined && 
           this.table[(index + i) % this.size].key !== key) {
      // Linear probing for collision resolution
      i++;
      if (i === this.size) throw new Error("Table is full");
    }
    this.table[(index + i) % this.size] = { key, value };
  }
  
  get(key) {
    let index = this.hash(key);
    let i = 0;
    while (this.table[(index + i) % this.size] !== undefined) {
      if (this.table[(index + i) % this.size].key === key) {
        return this.table[(index + i) % this.size].value;
      }
      i++;
      if (i === this.size) return undefined;
    }
    return undefined;
  }
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const elements = new Array(10).fill(0).map((_,i) => ({ id: `b${i}`, value: 0, display: `Slot ${i}: [空]`, state: 'default' }));
    
    steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: '初始化 Hash Table，大小为 10，使用 Open Addressing - Linear Probing 解决冲突。', activeLines: [3] });
    
    elements[4].display = 'Slot 4: "Dog"'; elements[4].state = 'visited';
    steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: '插入 "Dog": Hash("Dog") % 10 = 4，槽位为空，直接存入。', activeLines: [15] });
    
    elements[4].state = 'comparing';
    steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: '插入 "Cat": Hash("Cat") % 10 = 4，发生冲突 (Collision)！', activeLines: [18] });
    
    elements[4].state = 'visited'; elements[5].display = 'Slot 5: "Cat"'; elements[5].state = 'sorted';
    steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: '线性探测 (Linear Probing): 向后查找，发现 Slot 5 为空，存入。', activeLines: [22] });
    
    return steps;
  }
};
