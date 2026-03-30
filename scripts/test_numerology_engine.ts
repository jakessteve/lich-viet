/**
 * Test script to generate sample Numerology PDF output
 * Run with: npx tsx scripts/test_numerology_engine.ts
 */

import { generateNumerologyProfile } from '../src/utils/numerologyEngine';
import { generateNumerologyPrintableHtml } from '../src/services/pdf/numerologyPdfGenerator';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
    console.log('Generating sample Numerology profile...');
    
    // Sample details
    const fullName = 'Nguyễn Văn A';
    const birthDate = new Date(1990, 0, 1); // 1 Jan 1990

    // Full profile object
    const profile = generateNumerologyProfile(fullName, birthDate);
    
    console.log(`Generated profile: LP ${profile.lifePath.value}, EXP ${profile.expression.value}, SOUL ${profile.soulUrge.value}`);
    
    // Generate HTML
    console.log('Generating PDF HTML...');
    const html = generateNumerologyPrintableHtml(profile, fullName);
    
    // Output path
    const outputPath = path.resolve(__dirname, '../docs/sample_numerology_output.html');
    
    // Ensure dir exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write file
    fs.writeFileSync(outputPath, html);
    
    console.log(`\n✅ Success! Sample output written to:`);
    console.log(outputPath);
    console.log('\nOpen this file in your browser to view the generated format.');
}

run().catch(console.error);
