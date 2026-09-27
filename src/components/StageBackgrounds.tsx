import React from 'react';

interface StageProps {
  active: boolean;
}

export const BusStopBackground: React.FC<StageProps> = ({ active }) => (
  <div
    className={`absolute inset-0 w-full h-full transition-opacity duration-700 pointer-events-none ${
      active ? 'opacity-100 z-0' : 'opacity-0 -z-10'
    }`}
  >
    <svg width="100%" height="100%" viewBox="0 0 900 420" preserveAspectRatio="none">
      <defs>
        <linearGradient id="rainSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2732" />
          <stop offset="60%" stopColor="#2c3e45" />
          <stop offset="100%" stopColor="#3c524f" />
        </linearGradient>
        <linearGradient id="rainPuddle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#233b3d" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#41686c" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#233b3d" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Rainy Atmosphere Sky */}
      <rect width="900" height="420" fill="url(#rainSkyGrad)" />

      {/* Background Distant Forest & Rain */}
      <path d="M0,280 Q140,200 300,270 T600,260 T900,270 L900,420 L0,420 Z" fill="#13241b" opacity="0.9" />
      <path d="M0,310 Q160,240 380,300 T720,290 T900,310 L900,420 L0,420 Z" fill="#1c3327" opacity="0.95" />

      {/* Gentle rain streaks */}
      <g stroke="#7fb3be" strokeWidth="1.5" opacity="0.35" strokeDasharray="12,18">
        <line x1="80" y1="0" x2="50" y2="420" />
        <line x1="160" y1="0" x2="130" y2="420" />
        <line x1="250" y1="0" x2="220" y2="420" />
        <line x1="340" y1="0" x2="310" y2="420" />
        <line x1="430" y1="0" x2="400" y2="420" />
        <line x1="520" y1="0" x2="490" y2="420" />
        <line x1="610" y1="0" x2="580" y2="420" />
        <line x1="700" y1="0" x2="670" y2="420" />
        <line x1="790" y1="0" x2="760" y2="420" />
        <line x1="870" y1="0" x2="840" y2="420" />
      </g>

      {/* Bus Stop Ground & Puddles */}
      <rect x="0" y="350" width="900" height="70" fill="#141f17" />
      <ellipse cx="280" cy="385" rx="140" ry="16" fill="url(#rainPuddle)" />
      <ellipse cx="640" cy="390" rx="90" ry="12" fill="url(#rainPuddle)" />

      {/* Bus Stop Sign: 前沢行き 稲荷前 */}
      <g transform="translate(730, 160)">
        {/* Pole */}
        <rect x="18" y="25" width="8" height="200" fill="#752e25" rx="2" />
        {/* Circular Signboard */}
        <circle cx="22" cy="35" r="38" fill="#fdfbf7" stroke="#752e25" strokeWidth="6" />
        <circle cx="22" cy="35" r="32" fill="none" stroke="#ba4730" strokeWidth="2.5" />
        <text x="22" y="30" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#333" fontFamily="sans-serif">
          前沢行き
        </text>
        <text x="22" y="47" fontSize="15" textAnchor="middle" fontWeight="900" fill="#b02615" fontFamily="sans-serif">
          稲荷前
        </text>
        <circle cx="22" cy="78" r="4" fill="#5c2018" />
      </g>

      {/* Overhanging Camphor Tree Branch with Raindrops */}
      <path d="M-20,-10 Q220,100 480,20 Q650,-20 920,40 L920,-20 L-20,-20 Z" fill="#1b3d27" />
      <circle cx="280" cy="70" r="4" fill="#a4e4d5" opacity="0.6" />
      <circle cx="390" cy="55" r="3" fill="#a4e4d5" opacity="0.6" />
      <circle cx="510" cy="40" r="4.5" fill="#a4e4d5" opacity="0.6" />
    </svg>
  </div>
);

export const CamphorTreeBackground: React.FC<StageProps> = ({ active }) => (
  <div
    className={`absolute inset-0 w-full h-full transition-opacity duration-700 pointer-events-none ${
      active ? 'opacity-100 z-0' : 'opacity-0 -z-10'
    }`}
  >
    <svg width="100%" height="100%" viewBox="0 0 900 420" preserveAspectRatio="none">
      <defs>
        <radialGradient id="treeHollowGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#433423" />
          <stop offset="65%" stopColor="#251a11" />
          <stop offset="100%" stopColor="#120c08" />
        </radialGradient>
      </defs>

      {/* Deep Ancient Hollow Interior */}
      <rect width="900" height="420" fill="url(#treeHollowGlow)" />

      {/* Massive Tree Trunk Framing Pillars */}
      <path d="M-60,-20 Q120,200 40,440 L-60,440 Z" fill="#1c120b" />
      <path d="M960,-20 Q780,210 880,440 L960,440 Z" fill="#1c120b" />

      {/* Glowing Bioluminescent Forest Mushrooms & Moss */}
      <path d="M50,380 Q450,330 850,380 L850,420 L50,420 Z" fill="#2d3d22" />

      {/* Soft Green Glow Mushrooms */}
      <g transform="translate(130, 320)">
        <path d="M0,25 Q15,0 30,25 Z" fill="#5fe39a" opacity="0.85" filter="drop-shadow(0 0 8px #5fe39a)" />
        <rect x="12" y="22" width="6" height="18" fill="#fcfbe3" rx="2" />
      </g>
      <g transform="translate(740, 310)">
        <path d="M0,30 Q20,-5 40,30 Z" fill="#f8d153" opacity="0.8" filter="drop-shadow(0 0 10px #f8d153)" />
        <rect x="16" y="26" width="8" height="22" fill="#fcfbe3" rx="2" />
      </g>

      {/* Floating spores / glowing particles */}
      <circle cx="280" cy="220" r="3" fill="#a4f8c2" opacity="0.6" />
      <circle cx="350" cy="160" r="2.5" fill="#fbe495" opacity="0.5" />
      <circle cx="580" cy="190" r="3.5" fill="#a4f8c2" opacity="0.7" />
      <circle cx="650" cy="250" r="2" fill="#fbe495" opacity="0.6" />
    </svg>
  </div>
);

export const MoonlightBackground: React.FC<StageProps> = ({ active }) => (
  <div
    className={`absolute inset-0 w-full h-full transition-opacity duration-700 pointer-events-none ${
      active ? 'opacity-100 z-0' : 'opacity-0 -z-10'
    }`}
  >
    <svg width="100%" height="100%" viewBox="0 0 900 420" preserveAspectRatio="none">
      <defs>
        <linearGradient id="moonSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#08111e" />
          <stop offset="50%" stopColor="#112238" />
          <stop offset="100%" stopColor="#1e3a4a" />
        </linearGradient>
      </defs>

      <rect width="900" height="420" fill="url(#moonSky)" />

      {/* Sparkling Stars */}
      <circle cx="120" cy="80" r="2" fill="#fff" opacity="0.8" />
      <circle cx="210" cy="40" r="1.5" fill="#fff" opacity="0.7" />
      <circle cx="310" cy="110" r="2" fill="#fff" opacity="0.9" />
      <circle cx="620" cy="60" r="2.5" fill="#fff" opacity="0.8" />
      <circle cx="780" cy="95" r="1.5" fill="#fff" opacity="0.7" />
      <circle cx="840" cy="45" r="2" fill="#fff" opacity="0.85" />

      {/* Giant Luminous Full Moon */}
      <circle cx="450" cy="120" r="82" fill="#fffbe0" filter="drop-shadow(0 0 45px #ffe685)" />
      <ellipse cx="430" cy="140" rx="40" ry="25" fill="#f2eaae" opacity="0.3" />
      <ellipse cx="475" cy="105" rx="30" ry="18" fill="#f2eaae" opacity="0.3" />

      {/* Night clouds passing */}
      <path d="M300,140 Q400,120 500,145 T700,135" stroke="#2a455e" strokeWidth="18" strokeLinecap="round" opacity="0.4" fill="none" />

      {/* Giant Tree Top Bough */}
      <path d="M-30,370 Q240,260 480,290 T930,370 L930,420 L-30,420 Z" fill="#12301e" />
      <ellipse cx="450" cy="385" rx="320" ry="25" fill="#1a4029" />
    </svg>
  </div>
);

export const SunsetEndingBackground: React.FC<StageProps> = ({ active }) => (
  <div
    className={`absolute inset-0 w-full h-full transition-opacity duration-700 pointer-events-none ${
      active ? 'opacity-100 z-0' : 'opacity-0 -z-10'
    }`}
  >
    <svg width="100%" height="100%" viewBox="0 0 900 420" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sunsetSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d95338" />
          <stop offset="45%" stopColor="#f29a43" />
          <stop offset="80%" stopColor="#fed067" />
          <stop offset="100%" stopColor="#ffe999" />
        </linearGradient>
      </defs>

      <rect width="900" height="420" fill="url(#sunsetSky)" />

      {/* Setting Sun */}
      <circle cx="450" cy="240" r="60" fill="#fff6cc" filter="drop-shadow(0 0 35px #ffa245)" />

      {/* Layered Rural Hills */}
      <polygon points="0,290 180,240 380,280 620,230 900,280 900,420 0,420" fill="#4d6432" />
      <polygon points="0,330 260,300 520,340 760,295 900,325 900,420 0,420" fill="#2d4220" />

      {/* Kusakabe Family Rural House (草壁家) */}
      <g transform="translate(180, 270)">
        <rect x="10" y="25" width="75" height="45" fill="#281a13" />
        <polygon points="0,25 48,-15 95,25" fill="#753023" />
        {/* Western-style white turret annex (父親的研究室白洋房) */}
        <rect x="85" y="0" width="38" height="70" fill="#fdfbf5" />
        <polygon points="80,0 104,-25 128,0" fill="#c24432" />
        {/* Windows */}
        <rect x="94" y="15" width="18" height="18" fill="#ffe9a0" stroke="#7d3b25" strokeWidth="2" />
        <line x1="103" y1="15" x2="103" y2="33" stroke="#7d3b25" strokeWidth="1.5" />
        <line x1="94" y1="24" x2="112" y2="24" stroke="#7d3b25" strokeWidth="1.5" />
      </g>
    </svg>
  </div>
);
