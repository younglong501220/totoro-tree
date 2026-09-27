import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, FastForward, Music } from 'lucide-react';
import { totoroSynth, NoteEvent } from '../audio/totoroSynth';

interface AudioControlsProps {
  onOpenSoundboard?: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({ onOpenSoundboard }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [tempo, setTempo] = useState<number>(1.0);
  const [currentLyric, setCurrentLyric] = useState<string>('となりのトトロ 8-bit 雙聲道音效晶片');
  const [activeStep, setActiveStep] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    totoroSynth.setStepCallback((step: number, note: NoteEvent) => {
      setActiveStep(step);
      if (note.lyric) {
        setCurrentLyric(note.lyric);
      }
    });

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      totoroSynth.stopTheme();
    };
  }, []);

  // Visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = totoroSynth.getAnalyser();

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!analyser || !totoroSynth.isPlaying) {
        // Flat line idle state
        ctx.strokeStyle = '#3d6148';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      // Draw 8-bit stepped wave
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#90e090';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#5ee87a';

      ctx.beginPath();
      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Pixelated 8-bit stair-stepping
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    draw();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    const playing = totoroSynth.toggleTheme();
    setIsPlaying(playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    totoroSynth.setVolume(val);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      const prevVol = volume > 0 ? volume : 0.5;
      setVolume(prevVol);
      totoroSynth.setVolume(prevVol);
    } else {
      setIsMuted(true);
      totoroSynth.setVolume(0);
    }
  };

  const handleTempoChange = (newTempo: number) => {
    setTempo(newTempo);
    totoroSynth.setTempo(newTempo);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-emerald-950/80 border border-emerald-800/60 rounded-xl text-emerald-100 shadow-inner backdrop-blur-sm">
      {/* Left: Play button & Track Title */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <button
          onClick={handleTogglePlay}
          aria-label={isPlaying ? '暫停背景音樂' : '播放となりのトトロ主題曲'}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer ${
            isPlaying
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md shadow-amber-900/30'
              : 'bg-emerald-700 hover:bg-emerald-600 text-white'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isPlaying ? '暫停 BGM' : '播放主題曲'}</span>
        </button>

        <div className="flex flex-col">
          <span className="text-xs font-semibold text-amber-300 tracking-wide flex items-center gap-1.5">
            <span className={`inline-block w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            となりのトトロ (8-bit 雙聲道)
          </span>
          <span className="text-[11px] text-emerald-300/80 font-mono">
            {isPlaying ? `♪ [節拍 #${activeStep}] 唱詞: ${currentLyric}` : '點擊播放純代碼雙聲道方波伴奏'}
          </span>
        </div>
      </div>

      {/* Center: Mini Oscilloscope Waveform */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-black/40 rounded-lg border border-emerald-900/50">
        <canvas ref={canvasRef} width={130} height={26} className="w-[130px] h-[26px]" />
        <span className="text-[10px] font-mono text-emerald-400/90 whitespace-nowrap">CH1 方波 · CH2 三角波</span>
      </div>

      {/* Right Controls: Tempo, Volume, Soundboard trigger */}
      <div className="flex items-center gap-3">
        {/* Tempo Segmented Control */}
        <div className="flex items-center p-0.5 bg-emerald-900/60 rounded-md border border-emerald-800/70 text-xs">
          <button
            onClick={() => handleTempoChange(0.85)}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              tempo === 0.85 ? 'bg-emerald-700 text-amber-200 font-bold' : 'text-emerald-300 hover:text-white'
            }`}
            title="悠閒漫步速度 0.85x"
          >
            0.85x
          </button>
          <button
            onClick={() => handleTempoChange(1.0)}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              tempo === 1.0 ? 'bg-emerald-700 text-amber-200 font-bold' : 'text-emerald-300 hover:text-white'
            }`}
            title="原曲標準速度 1.0x"
          >
            1.0x
          </button>
          <button
            onClick={() => handleTempoChange(1.25)}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              tempo === 1.25 ? 'bg-emerald-700 text-amber-200 font-bold' : 'text-emerald-300 hover:text-white'
            }`}
            title="輕快奔跑速度 1.25x"
          >
            1.25x
          </button>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleToggleMute}
            className="p-1 text-emerald-300 hover:text-white rounded hover:bg-emerald-900/50 cursor-pointer"
            aria-label="靜音切換"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 h-1.5 bg-emerald-900 accent-amber-400 rounded-lg cursor-pointer"
            aria-label="音量大小"
          />
        </div>

        {onOpenSoundboard && (
          <button
            onClick={onOpenSoundboard}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 rounded-lg border border-emerald-700/60 transition-colors cursor-pointer"
            title="打開 8-bit 音樂盒與音效鍵盤"
          >
            <Music className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">8-bit 音樂盒</span>
          </button>
        )}
      </div>
    </div>
  );
};
