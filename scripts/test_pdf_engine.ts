import { generateFullNarrative } from '../src/services/interpretation/synthesisEngine';
import type { TuViChartSummary } from '../src/services/interpretation/archetypeDetector';

const sampleChart: TuViChartSummary = {
    cucElement: 'Thủy Nhi Cục',
    cucMenhRelation: 'Cục sinh Mệnh',
    detectedPatterns: ['Sát Phá Tham'],
    palaces: [
        {
            name: 'Mệnh',
            majorStars: [
                { name: 'Thất_Sát', brightness: 'Miếu' },
                { name: 'Phá_Quân', brightness: 'Vượng' },
                { name: 'Tham_Lang', brightness: 'Vượng' },
            ],
            minorStars: ['Kình_Dương'],
            earthlyBranch: 'Dần',
        },
        {
            name: 'Quan Lộc',
            majorStars: [
                { name: 'Tử_Vi', brightness: 'Miếu' },
                { name: 'Thiên_Phủ', brightness: 'Miếu' },
            ],
            earthlyBranch: 'Ngọ',
        },
        {
            name: 'Tật Ách',
            majorStars: [
                { name: 'Liêm_Trinh', brightness: 'Hãm' },
            ],
            earthlyBranch: 'Tuất',
        },
        {
            name: 'Phu Thê',
            majorStars: [
                { name: 'Thiên_Tướng', brightness: 'Miếu' },
            ],
            earthlyBranch: 'Thân',
        }
    ]
};

const result = generateFullNarrative('tuvi', sampleChart);
import * as fs from 'fs';

let outputStr = "=========================================\n";
outputStr += "✨ PDF ENGINE SAMPLE OUTPUT ✨\n";
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

// No more simulated extra areas, as the backend now generates them all

outputStr += "4. YEARLY OUTLOOK\n";
outputStr += result.yearlyOutlook.title + "\n";
outputStr += result.yearlyOutlook.summary + "\n";
outputStr += result.yearlyOutlook.advice + "\n";
outputStr += "\n-----------------------------------------\n\n";

outputStr += "5. CLOSING MEDITATION\n";
outputStr += result.closingMeditation + "\n";

fs.writeFileSync('docs/sample_output.md', outputStr);
console.log('Sample output generated at docs/sample_output.md');

