import { generateBaziChart } from '../src/utils/baziEngine';
import { generateBaziPrintableHtml } from '../src/services/pdf/baziPdfGenerator';
import * as fs from 'fs';

// Sample data: 1990-05-15, 08:30 AM, Male
const dateObj = new Date(1990, 4, 15); // Month is 0-indexed
const birthHour = 8;
const isMale = true;
const longitude = 105;

console.log('Generating Bazi Chart...');
const chart = generateBaziChart(dateObj, birthHour, isMale, longitude);

console.log('Generating PDF HTML output...');
const htmlOutput = generateBaziPrintableHtml(chart, 'Khách hàng mẫu');

const outputPath = 'docs/sample_bazi_output.html';
fs.writeFileSync(outputPath, htmlOutput);

console.log(`Bazi sample output generated at ${outputPath}`);
