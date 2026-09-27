import React, { useState } from 'react';
import { X, Sparkles, Volume2, Music4 } from 'lucide-react';
import { totoroSynth } from '../audio/totoroSynth';

interface MusicBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PIANO_KEYS = [
  { note: 'C4 (Do)', freq: 261.63, key: 'A', isBlack: false },
  { note: 'C#4', freq: 277.18, key: 'W', isBlack: true },
  { note: 'D4 (Re)', freq: 293.66, key: 'S', isBlack: false },
  { note: 'D#4', freq: 311.13, key: 'E', isBlack: true },
  { note: 'E4 (Mi)', freq: 329.63, key: 'D', isBlack: false },
  { note: 'F4 (Fa)', freq: 349.23, key: 'F', isBlack: false },
  { note: 'F#4', freq: 369.99, key: 'T', isBlack: true },
  { note: 'G4 (Sol)', freq: 392.00, key: 'G', isBlack: false },
  { note: 'G#4', freq: 415.30, key: 'Y', isBlack: true },
  { note: 'A4 (La)', freq: 440.00, key: 'H', isBlack: false },
  { note: 'A#4', freq: 466.16, key: 'U', isBlack: true },
  { note: 'B4 (Si)', freq: 493.88, key: 'J', isBlack: false },
  { note: 'C5 (高Do)', freq: 523.25, key: 'K', isBlack: false },
  { note: 'D5 (高Re)', freq: 587.33, key: 'O', isBlack: false },
  { note: 'E5 (高Mi)', freq: 659.25, key: 'L', isBlack: false },
  { note: 'G5 (高Sol)', freq: 783.99, key: ';', isBlack: false },
];

export const MusicBoxModal: React.FC<MusicBoxModalProps> = ({ isOpen, onClose }) => {
  const [waveType, setWaveType] = useState<OscillatorType>('square');
  const [activeNote, setActiveNote] = useState<string | null>(null);

  if (!isOpen) return null;

  const playNote = (freq: number, name: string) => {
    setActiveNote(name);
    totoroSynth.playTone(freq, waveType, 0.35, 0.22);
    setTimeout(() => setActiveNote(null), 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-stone-900 border-2 border-emerald-700/80 rounded-2xl p-6 shadow-2xl text-stone-100 flex flex-col gap-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-900/60 rounded-xl border border-emerald-700/50">
              <Music4 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-300">8-bit 音效實驗室與音樂盒</h2>
              <p className="text-xs text-stone-400">Web Audio API 純代碼合成雙音軌音效晶片</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="關閉音樂盒"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SFX Soundboard Buttons */}
        <div>
          <h3 className="text-xs font-semibold text-emerald-400 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            遊戲動作音效試聽 (SFX Trigger Pad)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => totoroSynth.playSfxJump()}
              className="flex items-center gap-2 px-3 py-2.5 bg-stone-800 hover:bg-emerald-900/80 border border-emerald-800/60 rounded-xl text-xs font-medium text-stone-200 hover:text-amber-200 transition-all cursor-pointer shadow"
            >
              <span className="text-base">🦘</span>
              <div className="text-left">
                <div className="font-semibold">陀螺彈跳騰空</div>
                <div className="text-[10px] text-stone-400 font-mono">Triangle Sweep</div>
              </div>
            </button>

            <button
              onClick={() => totoroSynth.playSfxAcorn()}
              className="flex items-center gap-2 px-3 py-2.5 bg-stone-800 hover:bg-emerald-900/80 border border-emerald-800/60 rounded-xl text-xs font-medium text-stone-200 hover:text-amber-200 transition-all cursor-pointer shadow"
            >
              <span className="text-base">🌰</span>
              <div className="text-left">
                <div className="font-semibold">收集金色橡實</div>
                <div className="text-[10px] text-stone-400 font-mono">Sine Chime Arpeggio</div>
              </div>
            </button>

            <button
              onClick={() => totoroSynth.playSfxRoar()}
              className="flex items-center gap-2 px-3 py-2.5 bg-stone-800 hover:bg-emerald-900/80 border border-emerald-800/60 rounded-xl text-xs font-medium text-stone-200 hover:text-amber-200 transition-all cursor-pointer shadow"
            >
              <span className="text-base">📢</span>
              <div className="text-left">
                <div className="font-semibold">大龍貓震撼咆哮</div>
                <div className="text-[10px] text-stone-400 font-mono">Sawtooth Pitch Drop</div>
              </div>
            </button>

            <button
              onClick={() => totoroSynth.playSfxCatbus()}
              className="flex items-center gap-2 px-3 py-2.5 bg-stone-800 hover:bg-emerald-900/80 border border-emerald-800/60 rounded-xl text-xs font-medium text-stone-200 hover:text-amber-200 transition-all cursor-pointer shadow"
            >
              <span className="text-base">🐱🚌</span>
              <div className="text-left">
                <div className="font-semibold">貓巴士雙眼放光鳴笛</div>
                <div className="text-[10px] text-stone-400 font-mono">Sawtooth Meow Horn</div>
              </div>
            </button>

            <button
              onClick={() => totoroSynth.playSfxHurt()}
              className="flex items-center gap-2 px-3 py-2.5 bg-stone-800 hover:bg-rose-950/60 border border-rose-800/50 rounded-xl text-xs font-medium text-stone-200 hover:text-rose-200 transition-all cursor-pointer shadow"
            >
              <span className="text-base">💔</span>
              <div className="text-left">
                <div className="font-semibold">受傷碰壁鈍響</div>
                <div className="text-[10px] text-stone-400 font-mono">Low-freq Saw Thud</div>
              </div>
            </button>

            <button
              onClick={() => totoroSynth.playSfxVictory()}
              className="flex items-center gap-2 px-3 py-2.5 bg-stone-800 hover:bg-amber-950/60 border border-amber-700/60 rounded-xl text-xs font-medium text-stone-200 hover:text-amber-200 transition-all cursor-pointer shadow"
            >
              <span className="text-base">🏆</span>
              <div className="text-left">
                <div className="font-semibold">勝利大結局號角</div>
                <div className="text-[10px] text-stone-400 font-mono">8-bit Fanfare</div>
              </div>
            </button>
          </div>
        </div>

        {/* Waveform Selector & Piano Keyboard */}
        <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-800">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-emerald-300 flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5" />
              <span>8-bit 即時音效合成鍵盤</span>
              {activeNote && <span className="text-amber-300 font-mono">♪ 正在發聲: {activeNote}</span>}
            </div>

            {/* Waveform selection */}
            <div className="flex items-center gap-1 text-[11px] bg-stone-900 p-0.5 rounded-lg border border-stone-800">
              {(['square', 'triangle', 'sawtooth', 'sine'] as OscillatorType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setWaveType(type)}
                  className={`px-2 py-0.5 rounded capitalize transition-colors cursor-pointer ${
                    waveType === type ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {type === 'square' ? '方波 (Lead)' : type === 'triangle' ? '三角波 (Bass)' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Keyboard row */}
          <div className="flex justify-center items-start gap-1 overflow-x-auto py-2">
            {PIANO_KEYS.map((k) => (
              <button
                key={k.note}
                onClick={() => playNote(k.freq, k.note)}
                className={`relative flex flex-col justify-end items-center rounded-b-md transition-all active:translate-y-1 select-none cursor-pointer ${
                  k.isBlack
                    ? 'w-7 h-20 -mx-3.5 z-10 bg-stone-950 border border-stone-700 text-[9px] text-stone-400 hover:bg-stone-800'
                    : 'w-9 h-28 bg-stone-100 hover:bg-amber-100 text-stone-900 border border-stone-300 text-[10px] font-semibold pb-1.5'
                }`}
              >
                <span className="font-mono">{k.key}</span>
                <span className="text-[9px] opacity-75">{k.note.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          <p className="text-[11px] text-stone-500 text-center mt-2">
            提示：可點擊按鍵彈奏出「となりのトトロ」的主題旋律：G4 - C5 - D5 - E5 ...
          </p>
        </div>
      </div>
    </div>
  );
};
