import { generateFullNarrative } from '../src/services/interpretation/synthesisEngine';
import type { ChiemTinhChartSummary } from '../src/services/interpretation/archetypeDetector';
import * as fs from 'fs';

const sampleChart: ChiemTinhChartSummary = {
    dominantElement: 'Fire',
    dominantModality: 'Cardinal',
    detectedPatterns: ['Grand Trine'], // Just testing
    placements: [
        { planet: 'Sun', sign: 'Aries', house: 1 },
        { planet: 'Moon', sign: 'Leo', house: 5 },
        { planet: 'Mercury', sign: 'Taurus', house: 2 },
        { planet: 'Venus', sign: 'Taurus', house: 2 },
        { planet: 'Mars', sign: 'Scorpio', house: 8 },
        { planet: 'Jupiter', sign: 'Sagittarius', house: 9 },
        { planet: 'Saturn', sign: 'Capricorn', house: 10 }
    ]
};

const result = generateFullNarrative('chiemtinh', sampleChart);

let outputStr = "=========================================\n";
outputStr += "✨ CHIÊM TINH PDF ENGINE SAMPLE OUTPUT ✨\n";
outputStr += "=========================================\n\n";

outputStr += "1. INTRODUCTION\n";
outputStr += JSON.stringify(result.introduction, null, 2) + "\n";
outputStr += "\n-----------------------------------------\n\n";

outputStr += "2. EXECUTIVE SUMMARY\n";
outputStr += result.executiveSummary.title + "\n";
outputStr += "CORE ARCHETYPE: " + result.executiveSummary.coreArchetype + "\n";
outputStr += "CAREER DIRECTION: " + result.executiveSummary.careerDirection + "\n";
outputStr += "SUMMARY: " + result.executiveSummary.summaryParagraph + "\n";
outputStr += "CORE ADVICE: " + result.executiveSummary.coreAdvice + "\n";
outputStr += "\n-----------------------------------------\n\n";

outputStr += "3. LIFE AREAS\n";
for (const area of result.lifeAreas) {
    outputStr += `\n>>> AREA: ${area.area.toUpperCase()}\n`;
    for (const p of area.paragraphs) {
        let paraText = p.hook ? p.hook + " " : "";
        if (p.effectParagraphs) paraText += p.effectParagraphs.join(" ") + " ";
        if (p.nuance) paraText += p.nuance + " ";
        if (p.cause) paraText += p.cause + " ";
        if (p.tip) paraText += p.tip;
        
        outputStr += paraText.trim() + "\n\n";
    }
}

outputStr += "4. YEARLY OUTLOOK\n";
outputStr += result.yearlyOutlook.title + "\n";
outputStr += result.yearlyOutlook.summary + "\n";
outputStr += result.yearlyOutlook.advice + "\n";
outputStr += "\n-----------------------------------------\n\n";

outputStr += "5. CLOSING MEDITATION\n";
outputStr += result.closingMeditation + "\n";

fs.writeFileSync('docs/sample_chiemtinh_output.md', outputStr);
console.log('Sample output generated at docs/sample_chiemtinh_output.md');
