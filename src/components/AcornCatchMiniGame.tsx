import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowLeft, Play, RotateCcw, Volume2, Trophy, Heart } from 'lucide-react';
import { totoroSynth } from '../audio/totoroSynth';

interface Item {
  x: number;
  y: number;
  speed: number;
  type: 'acorn' | 'golden_acorn' | 'soot' | 'leaf';
  size: number;
}

interface AcornCatchMiniGameProps {
  onBackToStory: () => void;
  onAddAcornsToStash: (count: number) => void;
}

export const AcornCatchMiniGame: React.FC<AcornCatchMiniGameProps> = ({
  onBackToStory,
  onAddAcornsToStash,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(0);

  // Player position state (0 to 100 percentage)
  const playerPosRef = useRef<number>(50);
  const itemsRef = useRef<Item[]>([]);
  const animIdRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const livesRef = useRef<number>(3);
  const scoreRef = useRef<number>(0);

  const startGame = useCallback(() => {
    setIsPlaying(true);
    isPlayingRef.current = true;
    setGameOver(false);
    setScore(0);
    scoreRef.current = 0;
    setLives(3);
    livesRef.current = 3;
    playerPosRef.current = 50;
    itemsRef.current = [];
    lastSpawnRef.current = Date.now();

    if (!totoroSynth.isPlaying) {
      totoroSynth.startTheme();
    }
  }, []);

  const handleGameOver = useCallback(() => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setGameOver(true);
    totoroSynth.playSfxHurt();
    const finalScore = scoreRef.current;
    if (finalScore > 0) {
      onAddAcornsToStash(finalScore);
    }
  }, [onAddAcornsToStash]);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localAnimId: number;

    const gameLoop = () => {
      localAnimId = requestAnimationFrame(gameLoop);
      animIdRef.current = localAnimId;

      const width = canvas.width;
      const height = canvas.height;

      // Draw background
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#1c3426');
      grad.addColorStop(0.6, '#284835');
      grad.addColorStop(1, '#15251c');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Distant tree trunks
      ctx.fillStyle = '#17271e';
      ctx.fillRect(40, 0, 30, height);
      ctx.fillRect(width - 70, 0, 35, height);

      // Ground
      ctx.fillStyle = '#101d16';
      ctx.fillRect(0, height - 35, width, 35);
      ctx.fillStyle = '#2c593b';
      ctx.fillRect(0, height - 35, width, 5);

      if (!isPlayingRef.current) {
        return;
      }

      const now = Date.now();

      // Spawn falling items
      if (now - lastSpawnRef.current > 650) {
        lastSpawnRef.current = now;
        const rand = Math.random();
        let itemType: Item['type'] = 'acorn';
        if (rand < 0.15) {
          itemType = 'golden_acorn';
        } else if (rand < 0.38) {
          itemType = 'soot';
        } else if (rand < 0.5) {
          itemType = 'leaf';
        }

        itemsRef.current.push({
          x: Math.random() * (width - 60) + 30,
          y: -20,
          speed: Math.random() * 2 + 2.5,
          type: itemType,
          size: itemType === 'golden_acorn' ? 24 : itemType === 'soot' ? 22 : 18,
        });
      }

      // Player coordinates
      const playerX = (playerPosRef.current / 100) * width;
      const playerY = height - 45;
      const playerWidth = 54;
      const playerHeight = 60;

      // Update & Render items
      for (let i = itemsRef.current.length - 1; i >= 0; i--) {
        const item = itemsRef.current[i];
        item.y += item.speed;

        // Collision check with player
        const distX = Math.abs(item.x - playerX);
        const distY = Math.abs(item.y - (playerY - 10));

        if (distX < playerWidth / 2 + 10 && distY < playerHeight / 2) {
          // Collected item
          if (item.type === 'acorn') {
            totoroSynth.playSfxAcorn();
            scoreRef.current += 10;
            setScore(scoreRef.current);
          } else if (item.type === 'golden_acorn') {
            totoroSynth.playSfxRoar();
            totoroSynth.playSfxAcorn();
            scoreRef.current += 50;
            setScore(scoreRef.current);
          } else if (item.type === 'leaf') {
            scoreRef.current += 5;
            setScore(scoreRef.current);
          } else if (item.type === 'soot') {
            // Hurt!
            totoroSynth.playSfxHurt();
            livesRef.current -= 1;
            setLives(livesRef.current);
            if (livesRef.current <= 0) {
              handleGameOver();
            }
          }
          itemsRef.current.splice(i, 1);
          continue;
        }

        // Out of screen bottom
        if (item.y > height) {
          itemsRef.current.splice(i, 1);
          continue;
        }

        // Draw item
        ctx.save();
        ctx.translate(item.x, item.y);

        if (item.type === 'acorn') {
          // Standard Acorn
          ctx.fillStyle = '#b86d26';
          ctx.beginPath();
          ctx.ellipse(0, 4, 8, 11, 0, 0, Math.PI * 2);
          ctx.fill();
          // Cap
          ctx.fillStyle = '#5c330f';
          ctx.beginPath();
          ctx.arc(0, -3, 8.5, Math.PI, 0);
          ctx.fill();
        } else if (item.type === 'golden_acorn') {
          // Glowing Golden Acorn
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#ffe259';
          ctx.fillStyle = '#f5c038';
          ctx.beginPath();
          ctx.ellipse(0, 4, 10, 14, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#8a520d';
          ctx.beginPath();
          ctx.arc(0, -5, 10.5, Math.PI, 0);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (item.type === 'soot') {
          // Soot sprite (obstacle)
          ctx.fillStyle = '#0f1114';
          ctx.beginPath();
          ctx.arc(0, 0, 11, 0, Math.PI * 2);
          ctx.fill();
          // Eyes
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(-3, -2, 3.5, 0, Math.PI * 2);
          ctx.arc(3, -2, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(-3, -2, 1.5, 0, Math.PI * 2);
          ctx.arc(3, -2, 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (item.type === 'leaf') {
          // Green Camphor Leaf
          ctx.fillStyle = '#4ade80';
          ctx.beginPath();
          ctx.ellipse(0, 0, 12, 6, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Draw Totoro Player
      ctx.save();
      ctx.translate(playerX, playerY);

      // Medium Blue Totoro
      ctx.fillStyle = '#3b72a2';
      ctx.beginPath();
      ctx.ellipse(0, -10, 22, 26, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.beginPath();
      ctx.ellipse(-10, -36, 4, 11, -0.15, 0, Math.PI * 2);
      ctx.ellipse(10, -36, 4, 11, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Belly
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.ellipse(0, -6, 14, 17, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(-6, -20, 4, 0, Math.PI * 2);
      ctx.arc(6, -20, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.arc(-6, -20, 2, 0, Math.PI * 2);
      ctx.arc(6, -20, 2, 0, Math.PI * 2);
      ctx.fill();

      // Acorn collection basket / umbrella overhead
      ctx.fillStyle = '#8b5a2b';
      ctx.beginPath();
      ctx.arc(0, 4, 18, 0, Math.PI);
      ctx.fill();

      ctx.restore();
    };

    gameLoop();

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [handleGameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlayingRef.current) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        playerPosRef.current = Math.max(8, playerPosRef.current - 6);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        playerPosRef.current = Math.min(92, playerPosRef.current + 6);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  // Mouse / Touch drag controls on canvas
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(8, Math.min(92, (x / rect.width) * 100));
    playerPosRef.current = pct;
  };

  const moveLeft = () => {
    playerPosRef.current = Math.max(8, playerPosRef.current - 8);
  };

  const moveRight = () => {
    playerPosRef.current = Math.min(92, playerPosRef.current + 8);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 animate-fadeIn">
      {/* Top Bar for Mini-game */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={onBackToStory}
          className="flex items-center gap-2 px-3 py-1.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 rounded-xl text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回劇情冒險</span>
        </button>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-rose-400 font-bold text-sm">
            <Heart className="w-4 h-4 fill-rose-500" />
            <span>{lives} 點生命</span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-300 font-bold text-sm">
            <span>🌰 獲得橡實: {score}</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-300 text-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>最高紀錄: {highScore}</span>
          </div>
        </div>
      </div>

      {/* Canvas Area with Overlays */}
      <div className="relative w-full aspect-[16/9] max-h-[480px] rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-700/70 bg-stone-950">
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          onPointerMove={handlePointerMove}
          className="w-full h-full cursor-ew-resize touch-none"
        />

        {/* Start / Game Over Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            {gameOver ? (
              <div className="flex flex-col items-center gap-3">
                <span className="text-4xl">🌰✨</span>
                <h3 className="text-2xl font-bold text-amber-300">本輪採橡實挑戰結束！</h3>
                <p className="text-stone-300 text-sm max-w-md">
                  你總共接住了 <strong className="text-amber-400 text-lg">{score}</strong> 顆橡實！已全數匯入你的主線尋寶總資產中！
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={startGame}
                    className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>再玩一次</span>
                  </button>
                  <button
                    onClick={onBackToStory}
                    className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors cursor-pointer"
                  >
                    返回主線尋寶
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <span className="text-5xl">🌰🌳</span>
                <div>
                  <h3 className="text-2xl font-bold text-amber-300">樟樹落雨接橡實挑戰</h3>
                  <p className="text-stone-300 text-sm mt-1 max-w-md">
                    移動中龍貓接住掉落的黃金橡實 (+50) 與普通橡實 (+10)，避開黑色灰塵精靈！左右滑動或鍵盤 A/D 控制。
                  </p>
                </div>
                <button
                  onClick={startGame}
                  className="flex items-center gap-2.5 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>開始採橡實</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Touch Navigation Buttons */}
      <div className="flex items-center justify-between w-full max-w-sm mt-4 gap-4 md:hidden">
        <button
          onClick={moveLeft}
          className="flex-1 py-3 bg-emerald-800 text-white rounded-xl font-bold active:bg-emerald-700 cursor-pointer shadow"
        >
          ⬅️ 往左移動
        </button>
        <button
          onClick={moveRight}
          className="flex-1 py-3 bg-emerald-800 text-white rounded-xl font-bold active:bg-emerald-700 cursor-pointer shadow"
        >
          往右移動 ➡️
        </button>
      </div>
    </div>
  );
};
