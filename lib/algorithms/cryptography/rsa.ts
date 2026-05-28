import { AlgorithmDefinition } from '../../types';

export const rsa: AlgorithmDefinition = {
  id: 'rsa',
  name: 'RSA 加密',
  category: 'Practical' as const,
  description: 'RSA是一种非对称加密算法，广泛用于安全数据传输。',
  theory: {
    introduction: 'RSA (Rivest-Shamir-Adleman) 是一种非对称加密算法。它的安全性基于大整数分解的困难性。',
    timeComplexity: '加密/解密 O(log^3 N)',
    spaceComplexity: 'O(log N)',
    applications: ['数字签名', '密钥交换', '安全通信'],
      core: "一种非对称加密算法，它的安全性源于寻找两个大素数乘积的真实质因数在计算上极其困难。",
      analogy: "像一个自带两把锁的保险箱：发件人用公钥（公开的挂锁）把箱子锁上，世界上只有收件人手里的私钥（唯一的钥匙）才能打开它。",
      scenarios: "适用场景：数字签名、安全密钥交换",
      practical: "支撑着整个现代互联网的 HTTPS 协议（TLS/SSL握手）、分布式微服务间的 JWT 私钥签名与公钥验签认证，以及 GitHub SSH 代码提交的安全验证。"
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
 * RSA 加密
 */
function rsaEncrypt(publicKey, m) {
  // Simple RSA encryption: c = m^e mod n
  let [e, n] = publicKey;
  // Note: For large numbers, BigInt should be used
  let base = BigInt(m);
  let exp = BigInt(e);
  let mod = BigInt(n);
  let result = 1n;
  
  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    base = (base * base) % mod;
    exp /= 2n;
  }
  return Number(result);
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const text = "HELLO";
    const chars = text.split('');
    let elements = chars.map((c, i) => ({ id: `c${i}`, value: c.charCodeAt(0), display: c, state: 'default' }));
    
    steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: '初始化 RSA 参数: 选择质数 p=61, q=53, n=3233, e=17', activeLines: [2] });
    
    for (let i = 0; i < chars.length; i++) {
       elements[i].state = 'highlight';
       steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: `准备加密字符 '${chars[i]}'`, activeLines: [8] });
       
       let charCode = chars[i].charCodeAt(0);
       let encrypted = 1n; // mock
       // c = m^e mod n
       let m = BigInt(charCode);
       let e = 17n;
       let n = 3233n;
       let base = m;
       let exp = e;
       while(exp > 0n) {
           if (exp % 2n === 1n) encrypted = (encrypted * base) % n;
           base = (base * base) % n;
           exp /= 2n;
       }
       
       elements[i].display = encrypted.toString();
       elements[i].state = 'sorted';
       steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: `字符 '${chars[i]}' (ASCII: ${charCode}) 经过 m^e mod n 加密后为 ` + encrypted, activeLines: [15] });
    }
    steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: 'RSA 加密完成', activeLines: [18] });
    return steps;
  }
};
