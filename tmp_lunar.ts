import { getLunarDate } from './src/sharedCore';

const d = new Date(1983, 10, 13, 18, 30);
const lunar = getLunarDate(d);
console.log("Lunar Day:", lunar.day);
console.log("Lunar Month:", lunar.month);
console.log("Lunar Year (Solar-based?):", lunar.year);
