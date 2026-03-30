import * as Lunar from 'lunar-javascript';
import { generateFlyingStarChart } from '../src/utils/flyingStarEngine';

// Examine lunar-javascript classes
console.log('Available Lunar objects related to EightChar/NineStar:');
const baziKeys = Object.keys(Lunar).filter(k => k.includes('Star') || k.includes('Nine') || k.includes('Eight'));
console.log(baziKeys);

// Wait, does lunar-javascript have Xuan Kong Flying Star?
// Let's create a Solar date and see what methods it has for Xuan Kong.
const solar = Lunar.Solar.fromYmd(2024, 5, 5);
const lunar = solar.getLunar();
const yearNineStar = lunar.getYearNineStar();
console.log('Year Nine Star:', yearNineStar?.getNumber(), yearNineStar?.getNameInXuanKong());
const monthNineStar = lunar.getMonthNineStar();
console.log('Month Nine Star:', monthNineStar?.getNumber(), monthNineStar?.getNameInXuanKong());

// Actually, NineStar in Lunar JS gives us the Annual/Monthly stars.
// But does it calculate the full Xuan Kong Flying Star grid for a HOUSE (Mountain/Facing)?
// "Xuan Kong Fei Xing" is a system for houses (Trạch Vận).
// Let's check if Lunar JS has a DaGua or XuanKong class.
const xkKeys = Object.keys(Lunar).filter(k => k.toLowerCase().includes('xuan') || k.toLowerCase().includes('eight') || k.toLowerCase().includes('gua'));
console.log('\nXuan Kong related classes in lunar-javascript:', xkKeys);

// If it has EightChar, EightChar has no house feng shui.
// Let's check documentation or inspect Lunar JS directly.
// The library provides NineStar (Cửu Tinh), but House (Trạch Vận) Flying Star might not be natively supported
// or it might be called 'XuanKong' or 'Yun'.

if (Lunar.EightChar) console.log('EightChar exists.');
if ((Lunar as any).Yun) console.log('Yun exists.');
if ((Lunar as any).DaGua) console.log('DaGua exists.');
if ((Lunar as any).XuanKong) console.log('XuanKong exists.');
