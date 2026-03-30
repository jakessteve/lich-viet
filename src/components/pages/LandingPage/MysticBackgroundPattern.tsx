import React from 'react';

type MysticBackgroundVariant = 'bagua' | 'compass' | 'constellation';

interface MysticBackgroundPatternProps {
  variant: MysticBackgroundVariant;
  className?: string;
}

export default function MysticBackgroundPattern({ variant, className = '' }: MysticBackgroundPatternProps) {
  // Common gradients and styles to match the Hero section but applied more subtly
  const defs = (
    <defs>
      <linearGradient id="mysticGold" x1="0" y1="0" x2="800" y2="800" gradientUnits="userSpaceOnUse">
        <stop stopColor="#d4a843" stopOpacity="0.8"/>
        <stop offset="0.5" stopColor="#8c6a1d" stopOpacity="0.3"/>
        <stop offset="1" stopColor="#d4a843" stopOpacity="0.8"/>
      </linearGradient>
      
      {/* Individual Yao (Line) Definitions for the Trigrams */}
      <g id="mysticSolidYao">
        <rect x="-60" y="-4" width="120" height="8" fill="url(#mysticGold)" rx="2" />
      </g>
      <g id="mysticBrokenYao">
        <rect x="-60" y="-4" width="50" height="8" fill="url(#mysticGold)" rx="2" />
        <rect x="10" y="-4" width="50" height="8" fill="url(#mysticGold)" rx="2" />
      </g>
    </defs>
  );

  const renderBagua = () => {
    // Tiên Thiên Bát Quái
    const trigrams = [0b111, 0b011, 0b010, 0b001, 0b000, 0b100, 0b101, 0b110];
    
    return (
      <svg className="w-full h-full" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        {defs}
        {/* Outer Ring */}
        <circle cx="400" cy="400" r="350" stroke="url(#mysticGold)" strokeWidth="1" strokeDasharray="4 12" />
        <circle cx="400" cy="400" r="340" stroke="url(#mysticGold)" strokeWidth="0.5" />
        
        {/* Trigrams Ring */}
        <g>
          {trigrams.map((val, i) => {
            const isInnerSolid = (val & 1) !== 0;
            const isMidSolid = (val & 2) !== 0;
            const isOuterSolid = (val & 4) !== 0;
            const angle = i * 45;
            return (
              <g key={`trigram-${i}`} transform={`rotate(${angle} 400 400)`}>
                <g transform="translate(400, 120)">
                  {isInnerSolid ? <use href="#mysticSolidYao" /> : <use href="#mysticBrokenYao" />}
                </g>
                <g transform="translate(400, 100)">
                  {isMidSolid ? <use href="#mysticSolidYao" /> : <use href="#mysticBrokenYao" />}
                </g>
                <g transform="translate(400, 80)">
                  {isOuterSolid ? <use href="#mysticSolidYao" /> : <use href="#mysticBrokenYao" />}
                </g>
              </g>
            );
          })}
        </g>
        
        {/* Inner Tai Chi Border */}
        <circle cx="400" cy="400" r="220" stroke="url(#mysticGold)" strokeWidth="1" />
        <circle cx="400" cy="400" r="210" stroke="url(#mysticGold)" strokeWidth="2" strokeDasharray="3 6" />
        
        {/* Centerpiece Outline */}
        <path d="M 400,280 A 60,60 0 0,0 400,400 A 60,60 0 0,1 400,520 A 120,120 0 0,1 400,280 Z" fill="url(#mysticGold)" fillOpacity="0.2" />
        <circle cx="400" cy="400" r="120" stroke="url(#mysticGold)" strokeWidth="1" />
      </svg>
    );
  };

  const renderCompass = () => {
    // La Bàn Design
    return (
      <svg className="w-full h-full" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        {defs}
        {/* Main Base Rings */}
        {[380, 360, 320, 270, 210, 160, 100, 60].map((r, i) => (
          <circle key={r} cx="400" cy="400" r={r} stroke="url(#mysticGold)" strokeWidth={i % 2 === 0 ? "1" : "0.5"} strokeDasharray={i === 2 ? "2 8" : i === 4 ? "5 5" : "none"} />
        ))}
        
        {/* Radial Lines for 24 Mountains / 64 Hexagrams */}
        <g opacity="0.6">
          {[...Array(24)].map((_, i) => (
            <line key={`radial-${i}`} x1="400" y1="40" x2="400" y2="340" stroke="url(#mysticGold)" strokeWidth="0.5" transform={`rotate(${i * 15} 400 400)`} />
          ))}
          {[...Array(64)].map((_, i) => (
            <line key={`sub-radial-${i}`} x1="400" y1="80" x2="400" y2="130" stroke="url(#mysticGold)" strokeWidth="0.5" transform={`rotate(${i * (360/64)} 400 400)`} />
          ))}
        </g>
        
        {/* Center Anchor */}
        <circle cx="400" cy="400" r="15" fill="none" stroke="url(#mysticGold)" strokeWidth="2" />
      </svg>
    );
  };

  const renderConstellation = () => {
    // Star Map / Nhị Thập Bát Tú vibe
    return (
      <svg className="w-full h-full" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        {defs}
        {/* Ambient Nebula effect mapping */}
        <circle cx="400" cy="400" r="350" fill="url(#mysticGold)" fillOpacity="0.05" />
        
        {/* Network of Constellations */}
        <g stroke="url(#mysticGold)" strokeWidth="1" strokeDasharray="3 4" opacity="0.6">
          <path d="M 200,200 L 250,150 L 320,180 L 400,100 L 450,160 L 580,120 M 320,180 L 350,280 L 480,240 L 450,160 M 350,280 L 280,380 L 390,480 L 480,410 L 480,240 M 390,480 L 340,580 L 450,680 L 520,550 L 480,410" />
          <path d="M 150,450 L 220,520 L 260,480 L 340,580 M 650,350 L 580,450 L 600,560 L 520,550" />
        </g>
        
        {/* Star Nodes */}
        {[
          [200, 200, 3], [250, 150, 2], [320, 180, 4], [400, 100, 2], [450, 160, 3], [580, 120, 4],
          [350, 280, 5], [480, 240, 3], [280, 380, 3], [390, 480, 5], [480, 410, 4], [340, 580, 3],
          [450, 680, 4], [520, 550, 2], [150, 450, 2], [220, 520, 3], [260, 480, 2], [650, 350, 3],
          [580, 450, 2], [600, 560, 4]
        ].map(([x, y, r], i) => (
          <g key={`star-${i}`}>
            <circle cx={x} cy={y} r={r} fill="url(#mysticGold)" />
            <circle cx={x} cy={y} r={r! * 3} fill="url(#mysticGold)" fillOpacity="0.2" />
          </g>
        ))}
        
        {/* Star field background */}
        {[...Array(60)].map((_, i) => (
          <circle 
            key={`bg-star-${i}`} 
            cx={Math.random() * 800} 
            cy={Math.random() * 800} 
            r={Math.random() * 1.5 + 0.5} 
            fill="#d4a843" 
            opacity={Math.random() * 0.5 + 0.1} 
          />
        ))}
        
        {/* Geometric Overlays */}
        <circle cx="400" cy="400" r="300" stroke="url(#mysticGold)" strokeWidth="0.5" strokeDasharray="1 10" />
      </svg>
    );
  };

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      {variant === 'bagua' && renderBagua()}
      {variant === 'compass' && renderCompass()}
      {variant === 'constellation' && renderConstellation()}
    </div>
  );
}
