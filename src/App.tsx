/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Heart,
  RotateCcw,
  Sparkles,
  TreePine,
  Gamepad2,
  BookOpen,
  Music,
  CheckCircle2,
  ChevronRight,
  Shield,
  Zap,
} from 'lucide-react';
import { totoroSynth } from './audio/totoroSynth';
import {
  BusStopBackground,
  CamphorTreeBackground,
  MoonlightBackground,
  SunsetEndingBackground,
} from './components/StageBackgrounds';
import {
  BigTotoro,
  PlayerMediumTotoro,
  MeiCharacter,
  SootSprites,
  StormCloud,
  GoldenAcornsPile,
  TotoroAbility,
} from './components/CharacterSprites';
import { AudioControls } from './components/AudioControls';
import { MusicBoxModal } from './components/MusicBoxModal';
import { BestiaryModal } from './components/BestiaryModal';
import { AcornCatchMiniGame } from './components/AcornCatchMiniGame';

type AppTab = 'STORY' | 'MINIGAME';

export default function App() {
  // Navigation & Modals
  const [currentTab, setCurrentTab] = useState<AppTab>('STORY');
  const [isMusicBoxOpen, setIsMusicBoxOpen] = useState<boolean>(false);
  const [isBestiaryOpen, setIsBestiaryOpen] = useState<boolean>(false);

  // Game Engine State
  const [stage, setStage] = useState<number>(1);
  const [hp, setHp] = useState<number>(3);
  const [acorns, setAcorns] = useState<number>(0);
  const [ability, setAbility] = useState<TotoroAbility>('Normal');
  const [unlockedForms, setUnlockedForms] = useState<string[]>(['Normal']);

  // Animation & Visual Feedback
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isBigTotoroRoaring, setIsBigTotoroRoaring] = useState<boolean>(false);
  const [floatingNotice, setFloatingNotice] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Dialogue & Storyline
  const [dialogTitle, setDialogTitle] = useState<string>('🚌 第一關：公車站的邂逅');
  const [dialogText, setDialogText] = useState<React.ReactNode>(
    '天空下著大雨，你與大龍貓在鄉間公車站靜靜等待。此時小梅揉著眼睛走過來。雨滴嘩啦啦地下著，你決定怎麼做？'
  );

  // Position offsets for actor animations
  const [playerLeft, setPlayerLeft] = useState<number>(240);
  const [playerBottom, setPlayerBottom] = useState<number>(50);
  const [meiLeft, setMeiLeft] = useState<number>(50);
  const [bigTotoroLeft, setBigTotoroLeft] = useState<number>(450);

  // Unlock abilities tracking
  const grantAbility = (newAbility: TotoroAbility) => {
    setAbility(newAbility);
    setUnlockedForms((prev) => (prev.includes(newAbility) ? prev : [...prev, newAbility]));
  };

  const showNotice = (msg: string) => {
    setFloatingNotice(msg);
    setTimeout(() => {
      setFloatingNotice(null);
    }, 1200);
  };

  const takeDamage = (): boolean => {
    const nextHp = Math.max(0, hp - 1);
    setHp(nextHp);
    totoroSynth.playSfxHurt();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 420);
    showNotice('💔 生命 -1！');

    if (nextHp <= 0) {
      setTimeout(() => {
        handleGameOver();
      }, 700);
      return false;
    }
    return true;
  };

  // --- Stage Transition Handlers ---

  const loadStage1 = () => {
    setStage(1);
    setPlayerLeft(240);
    setPlayerBottom(50);
    setMeiLeft(50);
    setBigTotoroLeft(450);
    setDialogTitle('🚌 第一關：公車站的邂逅');
    setDialogText(
      '天空下著大雨，你與大龍貓在鄉間公車站靜靜等待。此時小梅揉著眼睛走過來。雨滴嘩啦啦地下著，你決定怎麼做？'
    );
    setIsProcessing(false);
  };

  const handleStage1Choice = (choice: 'A' | 'B' | 'C') => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (choice === 'A') {
      // Umbrella choice
      totoroSynth.playSfxRoar();
      setIsBigTotoroRoaring(true);
      grantAbility('Umbrella');
      setAcorns((prev) => prev + 40);
      showNotice('+40 橡實！');

      setDialogText(
        <span>
          <strong className="text-emerald-400">【大成功！】</strong>{' '}
          大龍貓興奮地大吼一聲，震落樹上滿滿的黃金橡實！獲得防禦道具
          <strong className="text-amber-300">【雨傘狀態】</strong>！
        </span>
      );

      setTimeout(() => {
        setIsBigTotoroRoaring(false);
        setIsProcessing(false);
        loadStage2();
      }, 2200);
    } else if (choice === 'B') {
      // Catbus choice
      totoroSynth.playSfxCatbus();
      grantAbility('Catbus');
      setAcorns((prev) => prev + 25);
      showNotice('貓巴士出動！+25 橡實');

      setDialogText(
        <span>
          <strong className="text-amber-300">【喵嗚——！】</strong>{' '}
          貓巴士雙眼放光疾駛而來，載上大家飛速前進！進入無敵
          <strong className="text-amber-300">【貓巴士狀態】</strong>！
        </span>
      );

      setTimeout(() => {
        setIsProcessing(false);
        loadStage2();
      }, 2200);
    } else if (choice === 'C') {
      // Splash puddle
      const alive = takeDamage();
      setDialogText(
        <span>
          <strong className="text-rose-400">【哎呀！】</strong>{' '}
          雨水把你淋成落湯雞，冷得直打哆嗦，扣 1 顆心！
        </span>
      );

      setTimeout(() => {
        setIsProcessing(false);
        if (alive) loadStage1();
      }, 1600);
    }
  };

  const loadStage2 = () => {
    setStage(2);
    setPlayerLeft(230);
    setPlayerBottom(50);
    setMeiLeft(40);
    setDialogTitle('🌳 第二關：樟樹巢穴的追逐');
    setDialogText(
      '來到樟樹巨大樹洞！小梅在後面追趕，前方地面佈滿了會讓人動彈不得的小黑炭（灰塵精靈）泥濘！'
    );
    setIsProcessing(false);
  };

  const handleStage2Choice = (action: 'CATBUS_DASH' | 'FLY_SPIN' | 'RUN_WALK') => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (action === 'CATBUS_DASH') {
      if (ability === 'Catbus') {
        totoroSynth.playSfxCatbus();
        totoroSynth.playSfxAcorn();
        setAcorns((prev) => prev + 50);
        showNotice('無敵衝撞！+50 橡實');
        setPlayerLeft(640);

        setDialogText(
          <span>
            <strong className="text-emerald-400">【無敵衝鋒！】</strong>{' '}
            貓巴士十二隻腳全開，直接將小黑炭群撞得化為煙霧散開，直達樹頂！
          </span>
        );

        setTimeout(() => {
          setIsProcessing(false);
          loadStage3();
        }, 2200);
      } else {
        const alive = takeDamage();
        setDialogText(
          <span>
            <strong className="text-rose-400">【狀態不足！】</strong>{' '}
            你現在不是貓巴士狀態，無法衝鋒！被小梅抓住了尾巴！扣 1 顆心！
          </span>
        );

        setTimeout(() => {
          setIsProcessing(false);
          if (alive) loadStage2();
        }, 1600);
      }
    } else if (action === 'FLY_SPIN') {
      grantAbility('Fly');
      totoroSynth.playSfxJump();
      setAcorns((prev) => prev + 35);
      showNotice('陀螺起飛！+35 橡實');
      setPlayerBottom(170);
      setPlayerLeft(500);

      setDialogText(
        <span>
          <strong className="text-emerald-400">【騰空起飛！】</strong>{' '}
          伴隨嗡嗡風聲，你踩著旋轉陀螺優雅躍過小黑炭陷阱！
        </span>
      );

      setTimeout(() => {
        setPlayerBottom(50);
        setIsProcessing(false);
        loadStage3();
      }, 2200);
    } else if (action === 'RUN_WALK') {
      const alive = takeDamage();
      setDialogText(
        <span>
          <strong className="text-rose-400">【陷進去了！】</strong>{' '}
          雙腳陷在灰塵精靈泥濘中動彈不得，扣 1 顆心！
        </span>
      );

      setTimeout(() => {
        setIsProcessing(false);
        if (alive) loadStage2();
      }, 1600);
    }
  };

  const loadStage3 = () => {
    setStage(3);
    setPlayerLeft(280);
    setPlayerBottom(50);
    setMeiLeft(110);
    setBigTotoroLeft(480);
    setDialogTitle('🌕 第三關：月光下的どんどこ舞');
    setDialogText(
      '登上樟樹巨木頂端！必須跳起 どんどこ 祈福舞讓巨木茁壯生長！然而天空中『暴風雨夜空魔王』正吹來猛烈強風！'
    );
    setIsProcessing(false);
  };

  const handleStage3Choice = (action: 'USE_UMBRELLA' | 'FLY_STORM' | 'DANCE_BARE') => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (action === 'USE_UMBRELLA') {
      grantAbility('Umbrella');
      totoroSynth.playSfxRoar();
      totoroSynth.playSfxAcorn();
      totoroSynth.playSfxVictory();
      setAcorns((prev) => prev + 100);
      showNotice('巨木通天長成！+100 橡實');

      setDialogText(
        <span>
          <strong className="text-emerald-400">【完美抵擋！】</strong>{' '}
          黑色雨傘穩穩防護住狂風！伴隨著 どんどこ 踏步聲，參天巨木衝破雲霄，開滿金色橡實！
        </span>
      );

      setTimeout(() => {
        setIsProcessing(false);
        showVictoryEnding();
      }, 2600);
    } else if (action === 'FLY_STORM') {
      const alive = takeDamage();
      setDialogText(
        <span>
          <strong className="text-rose-400">【被風吹翻！】</strong>{' '}
          陀螺被暴風氣流捲得打轉失去控制，扣 1 顆心！
        </span>
      );

      setTimeout(() => {
        setIsProcessing(false);
        if (alive) loadStage3();
      }, 1600);
    } else if (action === 'DANCE_BARE') {
      const alive = takeDamage();
      setDialogText(
        <span>
          <strong className="text-rose-400">【狂風大作！】</strong>{' '}
          缺少雨傘防禦，強風吹得大家站不穩腳步，祈福儀式受阻！扣 1 顆心！
        </span>
      );

      setTimeout(() => {
        setIsProcessing(false);
        if (alive) loadStage3();
      }, 1600);
    }
  };

  const showVictoryEnding = () => {
    setStage(4);
    setBigTotoroLeft(420);
    setPlayerLeft(220);
    setPlayerBottom(50);
    setDialogTitle('🌅 溫馨大結局：夕陽下的草壁家');
    setDialogText(
      <span>
        冒險圓滿完成！大樟樹的種子在月光與微風中破土萌發，你在這段奇幻旅程中共收穫了豐富的黃金橡實，守護了森林的和平！
      </span>
    );
  };

  const handleGameOver = () => {
    setStage(0); // 0 indicates Game Over
    setDialogTitle('🌧️ 體力耗盡');
    setDialogText(
      '微風吹拂著大樟樹的樹葉，雨滴落入土中。深呼吸一口氣，森林隨時歡迎你再次啟程探險！'
    );
  };

  const restartGame = () => {
    setHp(3);
    setAcorns(0);
    setAbility('Normal');
    setUnlockedForms(['Normal']);
    loadStage1();
  };

  // Add acorns from mini game
  const handleAddMiniGameAcorns = (earned: number) => {
    setAcorns((prev) => prev + earned);
    showNotice(`+${earned} 橡實已存入背包！`);
  };

  // Ability names for HUD
  const abilityLabelMap: Record<TotoroAbility, string> = {
    Normal: '普通中龍貓 🌰',
    Fly: '陀螺高空飛行 🌀',
    Catbus: '貓巴士疾馳 🐱🚌',
    Umbrella: '雨傘防護 ☂️',
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans select-none">
      {/* 1. Universal Top Bar Contract: Brand Title — Nav Links — Primary Action */}
      <header className="flex items-center justify-between px-6 py-3.5 bg-stone-900 border-b border-emerald-900/60 sticky top-0 z-40 shadow-md">
        {/* Zone 1: Single text element wordmark */}
        <h1 className="text-lg md:text-xl font-bold tracking-tight text-amber-300 flex items-center gap-2">
          <TreePine className="w-5 h-5 text-emerald-400" />
          <span>龍貓與大樟樹的橡實尋寶記</span>
        </h1>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-300">
          <button
            onClick={() => setCurrentTab('STORY')}
            className={`transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'STORY' ? 'text-amber-300 font-bold underline underline-offset-8' : 'hover:text-white'
            }`}
          >
            <span>劇情冒險</span>
          </button>
          <button
            onClick={() => setCurrentTab('MINIGAME')}
            className={`transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'MINIGAME' ? 'text-amber-300 font-bold underline underline-offset-8' : 'hover:text-white'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-emerald-400" />
            <span>採橡實挑戰</span>
          </button>
          <button
            onClick={() => setIsBestiaryOpen(true)}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>森林圖鑑</span>
          </button>
          <button
            onClick={() => setIsMusicBoxOpen(true)}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Music className="w-4 h-4 text-amber-300" />
            <span>8-bit 音樂盒</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={restartGame}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-200 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            title="重新開始冒險"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>重置冒險</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-4">
        {/* Web Audio API Player Ribbon */}
        <AudioControls onOpenSoundboard={() => setIsMusicBoxOpen(true)} />

        {/* Tab 1: Story Adventure Mode */}
        {currentTab === 'STORY' && (
          <div
            className={`relative flex flex-col bg-stone-900 border-2 border-emerald-800/80 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
              isShaking ? 'shake-effect' : ''
            }`}
          >
            {/* Top HUD Status Bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-stone-950/85 border-b border-emerald-800/60 z-20">
              {/* Hearts */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 font-medium">生命值:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((val) => (
                    <span key={val} className="text-base transition-transform">
                      {val <= hp ? '❤️' : '🖤'}
                    </span>
                  ))}
                </div>
              </div>

              {/* Acorns Counter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 font-medium">🌰 橡實數量:</span>
                <span className="text-base font-bold text-amber-300 font-mono tracking-wider">
                  {acorns}
                </span>
              </div>

              {/* Active Ability Badge */}
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-xs text-stone-400 font-medium">當前狀態:</span>
                <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-900/80 border border-emerald-700 text-amber-200 rounded-md shadow-sm">
                  {abilityLabelMap[ability]}
                </span>
              </div>
            </div>

            {/* Stage Visual Viewport (Height 380px) */}
            <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden bg-stone-950">
              {/* Backgrounds */}
              <BusStopBackground active={stage === 1} />
              <CamphorTreeBackground active={stage === 2} />
              <MoonlightBackground active={stage === 3} />
              <SunsetEndingBackground active={stage === 4 || stage === 0} />

              {/* Actor Layer */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {/* Big Totoro (visible in Stage 1, 3, 4) */}
                {(stage === 1 || stage === 3 || stage === 4) && (
                  <div
                    className="absolute transition-all duration-700"
                    style={{
                      bottom: '35px',
                      left: `${bigTotoroLeft}px`,
                      width: '180px',
                      height: '215px',
                    }}
                  >
                    <BigTotoro roaring={isBigTotoroRoaring} />
                  </div>
                )}

                {/* Player Medium Totoro */}
                {stage !== 0 && (
                  <div
                    className="absolute transition-all duration-700"
                    style={{
                      bottom: `${playerBottom}px`,
                      left: `${playerLeft}px`,
                      width: ability === 'Catbus' ? '150px' : '110px',
                      height: '135px',
                    }}
                  >
                    <PlayerMediumTotoro ability={ability} />
                  </div>
                )}

                {/* Mei (visible in Stage 1, 2, 3) */}
                {(stage === 1 || stage === 2 || stage === 3) && (
                  <div
                    className="absolute transition-all duration-700"
                    style={{
                      bottom: '35px',
                      left: `${meiLeft}px`,
                      width: '85px',
                      height: '115px',
                    }}
                  >
                    <MeiCharacter />
                  </div>
                )}

                {/* Soot Sprites (Stage 2) */}
                {stage === 2 && (
                  <div
                    className="absolute transition-all duration-700"
                    style={{
                      bottom: '35px',
                      left: '460px',
                      width: '145px',
                      height: '85px',
                    }}
                  >
                    <SootSprites />
                  </div>
                )}

                {/* Storm Cloud (Stage 3) */}
                {stage === 3 && (
                  <div
                    className="absolute transition-all duration-700"
                    style={{
                      top: '20px',
                      right: '60px',
                      width: '210px',
                      height: '130px',
                    }}
                  >
                    <StormCloud />
                  </div>
                )}

                {/* Golden Acorn Trove (Stage 4 Ending) */}
                {stage === 4 && (
                  <div
                    className="absolute transition-all duration-700"
                    style={{
                      bottom: '35px',
                      left: '180px',
                      width: '220px',
                      height: '160px',
                    }}
                  >
                    <GoldenAcornsPile />
                  </div>
                )}
              </div>

              {/* Floating Notice Popup */}
              {floatingNotice && (
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none floating-notice">
                  <div className="px-5 py-2 rounded-xl bg-black/80 border border-amber-400/80 shadow-2xl text-xl sm:text-2xl font-black text-amber-300 tracking-wide backdrop-blur-sm">
                    {floatingNotice}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Dialogue & Decision Console */}
            <div className="min-h-[190px] bg-stone-900 border-t-2 border-emerald-800/60 p-5 flex flex-col justify-between z-20">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{dialogTitle}</span>
                </h3>
                <div className="text-sm sm:text-base text-stone-200 leading-relaxed min-h-[48px]">
                  {dialogText}
                </div>
              </div>

              {/* Choices / Actions depending on stage */}
              <div className="mt-4">
                {stage === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      onClick={() => handleStage1Choice('A')}
                      disabled={isProcessing}
                      className="px-4 py-3 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/80 text-white rounded-xl font-semibold text-sm transition-all duration-150 active:scale-98 shadow hover:border-amber-400 cursor-pointer text-left flex items-center justify-between"
                    >
                      <span>☂️ 把雨傘借給大龍貓</span>
                      <ChevronRight className="w-4 h-4 text-emerald-300 shrink-0" />
                    </button>
                    <button
                      onClick={() => handleStage1Choice('B')}
                      disabled={isProcessing}
                      className="px-4 py-3 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/80 text-white rounded-xl font-semibold text-sm transition-all duration-150 active:scale-98 shadow hover:border-amber-400 cursor-pointer text-left flex items-center justify-between"
                    >
                      <span>🐱🚌 呼叫貓巴士！</span>
                      <ChevronRight className="w-4 h-4 text-amber-300 shrink-0" />
                    </button>
                    <button
                      onClick={() => handleStage1Choice('C')}
                      disabled={isProcessing}
                      className="px-4 py-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-98 shadow cursor-pointer text-left flex items-center justify-between"
                    >
                      <span>🦘 原地踩水坑跳躍</span>
                      <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                    </button>
                  </div>
                )}

                {stage === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      onClick={() => handleStage2Choice('CATBUS_DASH')}
                      disabled={isProcessing}
                      className="px-4 py-3 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/80 text-white rounded-xl font-semibold text-sm transition-all duration-150 active:scale-98 shadow hover:border-amber-400 cursor-pointer text-left flex items-center justify-between"
                    >
                      <span>💨 貓巴士極速無敵衝撞</span>
                      <ChevronRight className="w-4 h-4 text-amber-300 shrink-0" />
                    </button>
                    <button
                      onClick={() => handleStage2Choice('FLY_SPIN')}
                      disabled={isProcessing}
                      className="px-4 py-3 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/80 text-white rounded-xl font-semibold text-sm transition-all duration-150 active:scale-98 shadow hover:border-amber-400 cursor-pointer text-left flex items-center justify-between"
                    >
                      <span>🌀 踩旋轉陀螺高空飛越</span>
                      <ChevronRight className="w-4 h-4 text-emerald-300 shrink-0" />
                    </button>
                    <button
                      onClick={() => handleStage2Choice('RUN_WALK')}
                      disabled={isProcessing}
                      className="px-4 py-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-98 shadow cursor-pointer text-left flex items-center justify-between"
                    >
                      <span>🏃 用雙腳跑過去</span>
                      <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                    </button>
                  </div>
                )}

                {stage === 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      onClick={() => handleStage3Choice('USE_UMBRELLA')}
                      disabled={isProcessing}
                      className="px-4 py-3 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/80 text-white rounded-xl font-semibold text-sm transition-all duration-150 active:scale-98 shadow hover:border-amber-400 cursor-pointer text-left flex items-center justify-between"
                    >
                      <span>☂️ 撐開黑色雨傘抵擋風暴</span>
                      <ChevronRight className="w-4 h-4 text-emerald-300 shrink-0" />
                    </button>
                    <button
                      onClick={() => handleStage3Choice('FLY_STORM')}
                      disabled={isProcessing}
                      className="px-4 py-3 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/80 text-white rounded-xl font-semibold text-sm transition-all duration-150 active:scale-98 shadow hover:border-amber-400 cursor-pointer text-left flex items-center justify-between"
                    >
                      <span>🌀 踩陀螺衝進風暴對抗</span>
                      <ChevronRight className="w-4 h-4 text-amber-300 shrink-0" />
                    </button>
                    <button
                      onClick={() => handleStage3Choice('DANCE_BARE')}
                      disabled={isProcessing}
                      className="px-4 py-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-98 shadow cursor-pointer text-left flex items-center justify-between"
                    >
                      <span>💃 不防禦直接跳祈福舞</span>
                      <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                    </button>
                  </div>
                )}

                {stage === 4 && (
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex-1 min-w-[240px] p-3 bg-emerald-950/60 border border-emerald-700/70 rounded-xl">
                      <div className="text-xs text-stone-300">冒險榮譽稱號:</div>
                      <div className="text-lg font-black text-amber-300">
                        【森林特級龍貓巡林官】 🌰✨
                      </div>
                      <div className="text-xs text-emerald-300 mt-0.5">
                        最終累積橡實: <span className="font-bold text-white">{acorns}</span> 顆
                      </div>
                    </div>
                    <button
                      onClick={restartGame}
                      className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>再玩一次尋寶</span>
                    </button>
                    <button
                      onClick={() => setCurrentTab('MINIGAME')}
                      className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      <span>採橡實小遊戲挑戰</span>
                    </button>
                  </div>
                )}

                {stage === 0 && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={restartGame}
                      className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>🌱 重整旗鼓，再次挑戰</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Acorn Catch Mini-Game */}
        {currentTab === 'MINIGAME' && (
          <AcornCatchMiniGame
            onBackToStory={() => setCurrentTab('STORY')}
            onAddAcornsToStash={handleAddMiniGameAcorns}
          />
        )}
      </main>

      {/* Modals */}
      <MusicBoxModal isOpen={isMusicBoxOpen} onClose={() => setIsMusicBoxOpen(false)} />
      <BestiaryModal
        isOpen={isBestiaryOpen}
        onClose={() => setIsBestiaryOpen(false)}
        unlockedForms={unlockedForms}
        acorns={acorns}
      />

      {/* Footer */}
      <footer className="py-4 border-t border-stone-900 bg-stone-950/80 text-center text-xs text-stone-400">
        <p>
          吉卜力經典主題《となりのトトロ》純代碼 8-bit 電子樂冒險尋寶記 · 雙聲道音頻晶片合成
        </p>
      </footer>
    </div>
  );
}
