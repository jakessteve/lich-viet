const fs = require('fs');
const path = require('path');

const curPath = process.cwd();
const file = fs.readFileSync(path.join(curPath, 'src/services/tuvi/engine/starCatalog.ts'), 'utf8');
const match = file.match(/export const STAR_NAMES = \{([\s\S]*?)\};/);
let names = match[1].split(',').map(line => {
    let parts = line.split(':');
    if (parts.length < 2) return null;
    return parts[0].replace(/['"\s]/g, '');
}).filter(n => n);

const engineFiles = [
  'src/services/tuvi/engine/BaseTuViEngine.ts',
  'src/services/tuvi/engine/VietnameseTuViEngine.ts',
  'src/services/tuvi/engine/ChineseTuViEngine.ts',
  'src/services/tuvi/engine/TaiwaneseTuViEngine.ts',
  'src/services/tuvi/engine/temporalEngine.ts'
];

const allSource = engineFiles.map(f => fs.readFileSync(path.join(curPath, f), 'utf8')).join('\n');

const unused = names.filter(n => {
   // Skip Tuần Không, Triệt Không, Lưu Niên
   if (n === 'xunkong' || n === 'jiekong') return false; 
   if (n.startsWith('yun') || n.startsWith('liu') || n.startsWith('yue') || n.startsWith('ri') || n.startsWith('shi')) return false; 
   
   // Vong Trang Sinh
   if (['changsheng', 'muyu', 'guandai', 'linguan', 'diwang', 'shuai', 'bing', 'si', 'mu', 'jue', 'tai', 'yang'].includes(n)) return false; 
   
   // Vong Bac Si
   if (['boshi', 'lishi', 'qinglong', 'xiaohao', 'jiangjun', 'zhoushu', 'faylian', 'xishen', 'bingfu', 'dahao', 'fubing', 'guanfu'].includes(n)) return false; 
   
   // Vong Thai Tue
   if (['suijian', 'huiqi', 'sangmen', 'guansuo', 'gwanfu', 'longde', 'baihu', 'tiande', 'diaoke', 'suipo'].includes(n)) return false; 
   
   // Vong Tuong Tinh (Jiangxing ring)
   if (['jiangxing', 'panan', 'suiyi', 'xiishen', 'zhaisha', 'tiansha', 'zhibei', 'yuesha', 'wangshen'].includes(n)) return false; 

   return !allSource.includes(`'${n}'`) && !allSource.includes(`"${n}"`);
});

console.log('Unused keys:', unused);
