import React from 'react';
import { X, BookOpen, Award, CheckCircle2, Circle } from 'lucide-react';
import { BigTotoro, PlayerMediumTotoro, MeiCharacter, SootSprites } from './CharacterSprites';

interface BestiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedForms: string[];
  acorns: number;
}

export const BestiaryModal: React.FC<BestiaryModalProps> = ({
  isOpen,
  onClose,
  unlockedForms,
  acorns,
}) => {
  if (!isOpen) return null;

  const characters = [
    {
      id: 'Normal',
      name: '中龍貓 (普通形態)',
      desc: '一身藍色毛皮，背著沉甸甸的橡實布袋，生性害羞又好奇。',
      render: <PlayerMediumTotoro ability="Normal" />,
      unlocked: true,
    },
    {
      id: 'Umbrella',
      name: '撐傘龍貓 (雨傘形態)',
      desc: '借給大龍貓雨傘後獲得的特別裝備，能抵擋傾盆暴雨與魔王強風！',
      render: <PlayerMediumTotoro ability="Umbrella" />,
      unlocked: unlockedForms.includes('Umbrella'),
    },
    {
      id: 'Fly',
      name: '陀螺飛行龍貓 (飛行形態)',
      desc: '踩著高速旋轉的紅黃木陀螺，御風而行，能輕鬆越過灰塵精靈陷阱。',
      render: <PlayerMediumTotoro ability="Fly" />,
      unlocked: unlockedForms.includes('Fly'),
    },
    {
      id: 'Catbus',
      name: '貓巴士奔馳 (無敵形態)',
      desc: '十二隻腳的大型貓咪公車，眼射強光，目的地牌轉動為「塚森」，所向披靡！',
      render: <PlayerMediumTotoro ability="Catbus" />,
      unlocked: unlockedForms.includes('Catbus'),
    },
    {
      id: 'BigTotoro',
      name: '大龍貓 (トトロ)',
      desc: '生活在大樟樹深處的千年森林守護神，最喜歡雨滴落在傘面清脆的啪嗒聲與大吼。',
      render: <BigTotoro roaring={false} />,
      unlocked: true,
    },
    {
      id: 'Mei',
      name: '草壁小梅 (Mei)',
      desc: '充滿活力與勇氣的四歲小女孩，一路追著小龍貓滾入大樟樹洞穴中。',
      render: <MeiCharacter />,
      unlocked: true,
    },
    {
      id: 'SootSprites',
      name: '小黑炭 (灰塵精靈 / ススワタリ)',
      desc: '躲在無人老屋與樹洞暗處的黑色毛球精靈，受到陽光驚嚇就會迅速逃跑。',
      render: <SootSprites />,
      unlocked: true,
    },
  ];

  const achievements = [
    {
      id: 'rain_favor',
      title: '雨夜善意',
      desc: '在稲荷前公車站將雨傘分享給大龍貓',
      done: unlockedForms.includes('Umbrella'),
    },
    {
      id: 'catbus_dash',
      title: '貓巴士疾行',
      desc: '呼叫並搭乘貓巴士衝刺前進',
      done: unlockedForms.includes('Catbus'),
    },
    {
      id: 'top_flight',
      title: '踏風而行',
      desc: '解鎖陀螺高空飛行形態',
      done: unlockedForms.includes('Fly'),
    },
    {
      id: 'acorn_master',
      title: '黃金橡實大亨',
      desc: '冒險中累計收集 100 顆以上橡實',
      done: acorns >= 100,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-stone-900 border-2 border-emerald-700/80 rounded-2xl p-6 shadow-2xl text-stone-100 flex flex-col gap-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-900/60 rounded-xl border border-emerald-700/50">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-300">森林圖鑑與探險成就</h2>
              <p className="text-xs text-stone-400">大樟樹的神秘精靈與變身形態收錄</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="關閉圖鑑"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6">
          {/* Character Gallery */}
          <div>
            <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-1.5">
              <span>🍃 角色與變身形態</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {characters.map((char) => (
                <div
                  key={char.id}
                  className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all ${
                    char.unlocked
                      ? 'bg-stone-800/80 border-emerald-800/60'
                      : 'bg-stone-900/50 border-stone-800 opacity-50'
                  }`}
                >
                  <div className="w-16 h-16 shrink-0 flex items-center justify-center p-1 bg-stone-950/40 rounded-lg">
                    {char.unlocked ? char.render : <span className="text-2xl text-stone-600">❓</span>}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-amber-200 truncate">{char.name}</h4>
                    <p className="text-xs text-stone-400 mt-0.5 line-clamp-2">
                      {char.unlocked ? char.desc : '通關冒險特定章節後解鎖此變身形態！'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>🏆 森林探險榮譽成就</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border ${
                    ach.done
                      ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-100'
                      : 'bg-stone-800/40 border-stone-800 text-stone-400'
                  }`}
                >
                  {ach.done ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className={`text-xs font-bold ${ach.done ? 'text-amber-300' : 'text-stone-300'}`}>
                      {ach.title}
                    </h4>
                    <p className="text-[11px] text-stone-400 mt-0.5">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
