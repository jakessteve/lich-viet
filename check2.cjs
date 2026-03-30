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
  'src/services/tuvi/engine/temporalEngine.ts',
  'src/components/TuVi/PalaceCell.tsx'
];

const allSource = engineFiles.map(f => fs.readFileSync(path.join(curPath, f), 'utf8')).join('\n');

const unused = names.filter(n => {
   return !allSource.includes(`'${n}'`) && !allSource.includes(`"${n}"`) && !allSource.includes(`.${n}`);
});

console.log('Unused keys:', unused);
