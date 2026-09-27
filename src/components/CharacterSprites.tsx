import React from 'react';

export type TotoroAbility = 'Normal' | 'Fly' | 'Catbus' | 'Umbrella';

interface BigTotoroProps {
  roaring?: boolean;
}

export const BigTotoro: React.FC<BigTotoroProps> = ({ roaring = false }) => (
  <div className="w-full h-full relative select-none">
    <svg viewBox="0 0 200 240" width="100%" height="100%">
      {/* Ears */}
      <ellipse cx="65" cy="40" rx="15" ry="38" fill="#6d797c" stroke="#485356" strokeWidth="2.5" />
      <ellipse cx="135" cy="40" rx="15" ry="38" fill="#6d797c" stroke="#485356" strokeWidth="2.5" />

      {/* Main Body */}
      <ellipse cx="100" cy="142" rx="78" ry="92" fill="#758285" stroke="#485356" strokeWidth="3" />

      {/* Belly */}
      <ellipse cx="100" cy="155" rx="58" ry="72" fill="#f6eedb" stroke="#e0d5be" strokeWidth="2" />

      {/* Chest Chevrons */}
      <path d="M80,122 L90,131 L100,122" stroke="#6d797c" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M105,122 L115,131 L125,122" stroke="#6d797c" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M68,142 L78,151 L88,142" stroke="#6d797c" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M112,142 L122,151 L132,142" stroke="#6d797c" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M90,142 L100,151 L110,142" stroke="#6d797c" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Eyes */}
      <circle cx="72" cy="92" r="10" fill="#ffffff" stroke="#485356" strokeWidth="1.5" />
      <circle cx={roaring ? 73 : 71} cy="92" r="5" fill="#151b1d" />
      <circle cx="70" cy="90" r="1.8" fill="#ffffff" />

      <circle cx="128" cy="92" r="10" fill="#ffffff" stroke="#485356" strokeWidth="1.5" />
      <circle cx={roaring ? 127 : 129} cy="92" r="5" fill="#151b1d" />
      <circle cx="127" cy="90" r="1.8" fill="#ffffff" />

      {/* Nose */}
      <polygon points="95,99 105,99 100,105" fill="#2d2b2c" />

      {/* Mouth */}
      {roaring ? (
        <g>
          {/* Wide open roaring mouth */}
          <path d="M72,108 Q100,138 128,108 Z" fill="#2a1215" stroke="#485356" strokeWidth="2.5" />
          {/* Teeth */}
          <path d="M76,109 L79,115 L82,109 L85,115 L88,109 L91,115 L94,109 L97,115 L100,109 L103,115 L106,109 L109,115 L112,109 L115,115 L118,109 L121,115 L124,109" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      ) : (
        <path d="M90,108 Q100,113 110,108" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}

      {/* Whiskers */}
      <line x1="28" y1="96" x2="62" y2="99" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="108" x2="62" y2="106" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="138" y1="99" x2="172" y2="96" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="138" y1="106" x2="172" y2="108" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />

      {/* Green Lotus / Camphor Leaf on Head */}
      <g transform="translate(100, 38)">
        <ellipse cx="0" cy="0" rx="26" ry="9" fill="#4fa756" stroke="#2c6932" strokeWidth="2" />
        <line x1="-20" y1="0" x2="20" y2="0" stroke="#2c6932" strokeWidth="1.5" />
        <path d="M0,0 Q-4,-12 -12,-16" stroke="#2c6932" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);

interface PlayerMediumTotoroProps {
  ability: TotoroAbility;
}

export const PlayerMediumTotoro: React.FC<PlayerMediumTotoroProps> = ({ ability }) => {
  if (ability === 'Normal') {
    return (
      <svg viewBox="0 0 120 140" width="100%" height="100%" className="drop-shadow-md">
        {/* Blue Medium Totoro Body */}
        <ellipse cx="40" cy="24" rx="8" ry="22" fill="#3b72a2" stroke="#224c70" strokeWidth="2.5" />
        <ellipse cx="76" cy="24" rx="8" ry="22" fill="#3b72a2" stroke="#224c70" strokeWidth="2.5" />
        <ellipse cx="58" cy="80" rx="44" ry="50" fill="#407cb0" stroke="#224c70" strokeWidth="2.5" />

        {/* White Belly */}
        <ellipse cx="58" cy="90" rx="30" ry="36" fill="#ffffff" />
        {/* Chest Chevrons */}
        <path d="M46,76 L52,82 L58,76 M60,76 L66,82 L72,76" stroke="#407cb0" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M53,92 L59,98 L65,92" stroke="#407cb0" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Eyes */}
        <circle cx="45" cy="54" r="7.5" fill="#ffffff" stroke="#224c70" strokeWidth="1.5" />
        <circle cx="46" cy="54" r="3.8" fill="#151d24" />
        <circle cx="44.5" cy="52.5" r="1.2" fill="#ffffff" />

        <circle cx="71" cy="54" r="7.5" fill="#ffffff" stroke="#224c70" strokeWidth="1.5" />
        <circle cx="70" cy="54" r="3.8" fill="#151d24" />
        <circle cx="68.5" cy="52.5" r="1.2" fill="#ffffff" />

        <circle cx="58" cy="58" r="3.5" fill="#1d303f" />

        {/* Sack of Acorns slung over shoulder */}
        <ellipse cx="90" cy="88" rx="16" ry="19" fill="#e8dcbf" stroke="#aa9369" strokeWidth="2.5" />
        <line x1="68" y1="70" x2="88" y2="82" stroke="#aa9369" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="94" cy="74" r="3" fill="#8c5826" />
      </svg>
    );
  }

  if (ability === 'Fly') {
    return (
      <svg viewBox="0 0 130 160" width="100%" height="100%" className="drop-shadow-lg">
        {/* Wind swirls */}
        <ellipse cx="65" cy="145" rx="55" ry="8" fill="none" stroke="#6cd6f0" strokeWidth="3" strokeDasharray="12,6" opacity="0.8" />
        <ellipse cx="65" cy="135" rx="40" ry="6" fill="none" stroke="#baeaf7" strokeWidth="2.5" opacity="0.9" />

        {/* Spinning Top (陀螺) */}
        <g transform="translate(15, 110)">
          <polygon points="50,0 20,20 80,20" fill="#d9412f" stroke="#78180c" strokeWidth="2" />
          <ellipse cx="50" cy="20" rx="32" ry="9" fill="#f5af28" stroke="#8a2012" strokeWidth="2" />
          <line x1="50" y1="20" x2="50" y2="34" stroke="#78180c" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* Totoro Riding On Top */}
        <g transform="translate(7, -8)">
          <ellipse cx="40" cy="26" rx="8" ry="20" fill="#3b72a2" />
          <ellipse cx="76" cy="26" rx="8" ry="20" fill="#3b72a2" />
          <ellipse cx="58" cy="76" rx="42" ry="46" fill="#407cb0" />
          <ellipse cx="58" cy="84" rx="28" ry="32" fill="#ffffff" />
          <circle cx="45" cy="52" r="7" fill="#fff" />
          <circle cx="45" cy="52" r="3.5" fill="#111" />
          <circle cx="71" cy="52" r="7" fill="#fff" />
          <circle cx="71" cy="52" r="3.5" fill="#111" />
          {/* Excited Open Mouth */}
          <ellipse cx="58" cy="64" rx="6.5" ry="5.5" fill="#a42828" stroke="#681616" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }

  if (ability === 'Catbus') {
    return (
      <svg viewBox="0 0 170 130" width="100%" height="100%" className="drop-shadow-xl">
        {/* Catbus Body */}
        <rect x="25" y="32" width="112" height="62" rx="26" fill="#e08e2f" stroke="#7d3e0c" strokeWidth="3.5" />
        {/* Windows with Totoro inside */}
        <rect x="42" y="42" width="24" height="24" rx="6" fill="#fff5b8" stroke="#7d3e0c" strokeWidth="2" />
        <circle cx="54" cy="55" r="9" fill="#407cb0" />
        <rect x="76" y="42" width="24" height="24" rx="6" fill="#fff5b8" stroke="#7d3e0c" strokeWidth="2" />

        {/* Glowing Head of Catbus */}
        <ellipse cx="140" cy="56" rx="22" ry="24" fill="#e89838" stroke="#7d3e0c" strokeWidth="3" />
        {/* Big Yellow Eyes */}
        <circle cx="134" cy="48" r="8" fill="#fff733" stroke="#874709" strokeWidth="1.5" />
        <circle cx="135" cy="48" r="3.5" fill="#000" />
        <circle cx="150" cy="48" r="8" fill="#fff733" stroke="#874709" strokeWidth="1.5" />
        <circle cx="149" cy="48" r="3.5" fill="#000" />

        {/* Grinning Teeth */}
        <path d="M126,62 Q142,78 158,62 Z" fill="#ffffff" stroke="#5c2b00" strokeWidth="2" />
        <line x1="134" y1="64" x2="134" y2="70" stroke="#5c2b00" strokeWidth="1.5" />
        <line x1="142" y1="65" x2="142" y2="73" stroke="#5c2b00" strokeWidth="1.5" />
        <line x1="150" y1="64" x2="150" y2="70" stroke="#5c2b00" strokeWidth="1.5" />

        {/* Destination Sign: 塚森 (Tsukamori) */}
        <rect x="85" y="24" width="28" height="12" rx="3" fill="#cf432b" stroke="#78180c" strokeWidth="1.5" />
        <text x="99" y="33" fontSize="8" fontWeight="900" fill="#fff" textAnchor="middle" fontFamily="sans-serif">
          塚森
        </text>

        {/* Running Paws (6 pairs / 12 legs vibe) */}
        <ellipse cx="36" cy="98" rx="8" ry="14" fill="#bf6a15" stroke="#7d3e0c" strokeWidth="2" transform="rotate(35 36 98)" />
        <ellipse cx="62" cy="98" rx="8" ry="14" fill="#bf6a15" stroke="#7d3e0c" strokeWidth="2" transform="rotate(-20 62 98)" />
        <ellipse cx="88" cy="98" rx="8" ry="14" fill="#bf6a15" stroke="#7d3e0c" strokeWidth="2" transform="rotate(35 88 98)" />
        <ellipse cx="114" cy="98" rx="8" ry="14" fill="#bf6a15" stroke="#7d3e0c" strokeWidth="2" transform="rotate(-25 114 98)" />
      </svg>
    );
  }

  // Umbrella State
  return (
    <svg viewBox="0 0 120 150" width="100%" height="100%" className="drop-shadow-lg">
      {/* Black Umbrella Overhead */}
      <g transform="translate(10, 2)">
        <path d="M12,42 Q56,-8 100,42 Q56,28 12,42 Z" fill="#242b32" stroke="#12161b" strokeWidth="3" />
        {/* Umbrella ribs */}
        <path d="M56,8 L56,42 M32,24 Q44,34 56,42 M80,24 Q68,34 56,42" stroke="#37414d" strokeWidth="1.5" fill="none" />
        {/* Pole and Curved Handle */}
        <line x1="56" y1="12" x2="56" y2="95" stroke="#5c3f25" strokeWidth="4.5" />
        <path d="M56,95 Q56,108 46,108 Q36,108 36,98" stroke="#5c3f25" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Water drops bouncing off */}
        <circle cx="20" cy="45" r="2.5" fill="#88d8ed" />
        <circle cx="92" cy="44" r="2.5" fill="#88d8ed" />
      </g>

      {/* Totoro Holding Umbrella */}
      <g transform="translate(5, 24)">
        <ellipse cx="56" cy="76" rx="40" ry="46" fill="#407cb0" stroke="#224c70" strokeWidth="2.5" />
        <ellipse cx="56" cy="85" rx="27" ry="32" fill="#ffffff" />
        <circle cx="44" cy="53" r="7" fill="#ffffff" />
        <circle cx="44" cy="53" r="3.5" fill="#111" />
        <circle cx="68" cy="53" r="7" fill="#ffffff" />
        <circle cx="68" cy="53" r="3.5" fill="#111" />
        <circle cx="56" cy="58" r="3.5" fill="#1d303f" />
      </g>
    </svg>
  );
};

export const MeiCharacter: React.FC = () => (
  <svg viewBox="0 0 100 130" width="100%" height="100%" className="drop-shadow-md">
    {/* Pigtails */}
    <circle cx="20" cy="48" r="12" fill="#6d391f" />
    <circle cx="80" cy="48" r="12" fill="#6d391f" />

    {/* Straw Hat with Red Ribbon */}
    <ellipse cx="50" cy="34" rx="38" ry="12" fill="#f8da59" stroke="#b08b1a" strokeWidth="1.5" />
    <circle cx="50" cy="25" r="20" fill="#fad755" stroke="#b08b1a" strokeWidth="1.5" />
    <path d="M30,34 Q50,40 70,34" stroke="#e83626" strokeWidth="4.5" fill="none" />

    {/* Face */}
    <circle cx="50" cy="52" r="22" fill="#fedcc2" />
    <circle cx="42" cy="50" r="3" fill="#2d221c" />
    <circle cx="58" cy="50" r="3" fill="#2d221c" />
    {/* Rosy Cheeks */}
    <ellipse cx="36" cy="58" rx="4.5" ry="3" fill="#f98075" opacity="0.85" />
    <ellipse cx="64" cy="58" rx="4.5" ry="3" fill="#f98075" opacity="0.85" />
    <path d="M47,60 Q50,64 53,60" stroke="#b34e3f" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* White Blouse and Pink Pinafore Dress */}
    <rect x="36" y="68" width="28" height="15" fill="#ffffff" rx="4" />
    <polygon points="28,80 72,80 80,106 20,106" fill="#e84568" stroke="#aa2340" strokeWidth="1.5" />

    {/* Running Legs */}
    <rect x="34" y="105" width="8" height="20" fill="#fedcc2" rx="4" transform="rotate(18 34 105)" />
    <rect x="56" y="105" width="8" height="20" fill="#fedcc2" rx="4" transform="rotate(-25 56 105)" />
    {/* Yellow Shoes */}
    <ellipse cx="32" cy="124" rx="7" ry="4" fill="#f7ca36" />
    <ellipse cx="68" cy="123" rx="7" ry="4" fill="#f7ca36" />
  </svg>
);

export const SootSprites: React.FC = () => (
  <svg viewBox="0 0 170 100" width="100%" height="100%" className="drop-shadow-lg">
    {/* Left Soot Sprite */}
    <g>
      <circle cx="45" cy="55" r="30" fill="#16181b" />
      <circle cx="37" cy="50" r="9" fill="#ffffff" />
      <circle cx="38" cy="50" r="4" fill="#000000" />
      <circle cx="53" cy="50" r="9" fill="#ffffff" />
      <circle cx="52" cy="50" r="4" fill="#000000" />
      {/* Fluffy spikes */}
      <circle cx="20" cy="50" r="4" fill="#16181b" />
      <circle cx="70" cy="52" r="4" fill="#16181b" />
      <circle cx="46" cy="24" r="4" fill="#16181b" />
      <circle cx="48" cy="85" r="4" fill="#16181b" />
    </g>

    {/* Right Little Soot Sprite */}
    <g transform="translate(65, -12)">
      <circle cx="50" cy="60" r="25" fill="#16181b" />
      <circle cx="44" cy="56" r="7.5" fill="#ffffff" />
      <circle cx="45" cy="56" r="3.5" fill="#000000" />
      <circle cx="58" cy="56" r="7.5" fill="#ffffff" />
      <circle cx="57" cy="56" r="3.5" fill="#000000" />
    </g>

    {/* Tiny Soot Sprite */}
    <g transform="translate(115, 20)">
      <circle cx="20" cy="30" r="16" fill="#16181b" />
      <circle cx="16" cy="27" r="5" fill="#fff" />
      <circle cx="16" cy="27" r="2.5" fill="#000" />
      <circle cx="24" cy="27" r="5" fill="#fff" />
      <circle cx="24" cy="27" r="2.5" fill="#000" />
    </g>
  </svg>
);

export const StormCloud: React.FC = () => (
  <svg viewBox="0 0 220 140" width="100%" height="100%" className="drop-shadow-2xl">
    {/* Dark thunderous cloud puff */}
    <path
      d="M40,80 Q15,80 15,55 Q15,30 45,30 Q55,6 90,12 Q125,2 145,25 Q175,12 190,35 Q210,40 205,70 Q215,90 185,90 Z"
      fill="#232d3d"
      stroke="#121822"
      strokeWidth="3"
    />
    {/* Golden Lightning Bolt */}
    <polygon points="105,75 88,105 104,105 92,135 125,95 110,95" fill="#ffd147" stroke="#e09e19" strokeWidth="2" filter="drop-shadow(0 0 8px #ffd147)" />
    {/* Rain and Gust */}
    <line x1="40" y1="95" x2="25" y2="125" stroke="#7ec8e3" strokeWidth="3" strokeDasharray="6,4" />
    <line x1="70" y1="98" x2="55" y2="128" stroke="#7ec8e3" strokeWidth="3" strokeDasharray="6,4" />
    <line x1="140" y1="95" x2="125" y2="125" stroke="#7ec8e3" strokeWidth="3" strokeDasharray="6,4" />
    <line x1="170" y1="98" x2="155" y2="128" stroke="#7ec8e3" strokeWidth="3" strokeDasharray="6,4" />
  </svg>
);

export const GoldenAcornsPile: React.FC = () => (
  <svg viewBox="0 0 240 180" width="100%" height="100%" className="drop-shadow-2xl">
    <defs>
      <radialGradient id="goldAcornShine" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fff3a8" />
        <stop offset="50%" stopColor="#f5b838" />
        <stop offset="100%" stopColor="#b36e14" />
      </radialGradient>
      <linearGradient id="acornCapGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6e3f16" />
        <stop offset="100%" stopColor="#422207" />
      </linearGradient>
    </defs>

    {/* Sparkle Glints */}
    <polygon points="120,20 125,32 137,37 125,42 120,54 115,42 103,37 115,32" fill="#ffffff" filter="drop-shadow(0 0 6px #fff)" />
    <polygon points="50,60 53,68 61,71 53,74 50,82 47,74 39,71 47,68" fill="#ffd54f" />
    <polygon points="190,40 193,48 201,51 193,54 190,62 187,54 179,51 187,48" fill="#ffd54f" />

    {/* Acorn 1 (Left) */}
    <g transform="translate(35, 80) rotate(-22)">
      <ellipse cx="25" cy="36" rx="20" ry="26" fill="url(#goldAcornShine)" stroke="#8c4e09" strokeWidth="2.5" />
      <path d="M4,22 Q25,5 46,22 Z" fill="url(#acornCapGrad)" stroke="#381c04" strokeWidth="2" />
      <line x1="25" y1="7" x2="25" y2="0" stroke="#381c04" strokeWidth="3.5" strokeLinecap="round" />
    </g>

    {/* Acorn 2 (Right) */}
    <g transform="translate(130, 75) rotate(20)">
      <ellipse cx="25" cy="36" rx="20" ry="26" fill="url(#goldAcornShine)" stroke="#8c4e09" strokeWidth="2.5" />
      <path d="M4,22 Q25,5 46,22 Z" fill="url(#acornCapGrad)" stroke="#381c04" strokeWidth="2" />
      <line x1="25" y1="7" x2="25" y2="0" stroke="#381c04" strokeWidth="3.5" strokeLinecap="round" />
    </g>

    {/* Acorn 3 (Center Golden Masterpiece) */}
    <g transform="translate(85, 60)">
      <ellipse cx="30" cy="42" rx="25" ry="32" fill="url(#goldAcornShine)" stroke="#8c4e09" strokeWidth="3" />
      <path d="M5,26 Q30,6 55,26 Z" fill="url(#acornCapGrad)" stroke="#381c04" strokeWidth="2.5" />
      <line x1="30" y1="9" x2="30" y2="0" stroke="#381c04" strokeWidth="4" strokeLinecap="round" />
      {/* Acorn cap scales */}
      <circle cx="22" cy="18" r="3" fill="#542e0e" />
      <circle cx="32" cy="17" r="3" fill="#542e0e" />
      <circle cx="39" cy="20" r="3" fill="#542e0e" />
    </g>
  </svg>
);
