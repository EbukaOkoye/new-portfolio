import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Code, Server, Database, Globe, Calendar, Terminal, CircleDot, Crown, Award, CheckCircle } from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceTabProps {
  experience: ExperienceItem[];
}

export default function ExperienceTab({ experience }: ExperienceTabProps) {
  const [selectedId, setSelectedId] = useState<string>(experience[0]?.id || '');
  const activeExp = experience.find(e => e.id === selectedId) || experience[0];

  const getIcon = (type: ExperienceItem['logoType']) => {
    switch (type) {
      case 'code':
        return <Code className="w-3.5 h-3.5 text-emerald-400" />;
      case 'server':
        return <Server className="w-3.5 h-3.5 text-blue-400" />;
      case 'database':
        return <Database className="w-3.5 h-3.5 text-pink-400" />;
      case 'globe':
        return <Globe className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Briefcase className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  // Croupier telemetry logs per corporate milestone
  const getCroupierLogs = (company: string) => {
    return [
      `[DEALER] Loading corporate ledger for ${company}...`,
      '[ALUMNI] Checking career security protocol & verification lines.',
      '[METRIC] Fetching high efficiency deliverable stats from sandbox.',
      '[SYS] Systems and architectures successfully standardizing.'
    ];
  };

  // Giving experiences custom visual rankings (like Q, J, 10, 9 on hearts deck)
  const getCardDetails = (idx: number) => {
    const ranks = ['A', 'K', 'Q', 'J', '10', '9'];
    const rank = ranks[idx % ranks.length];
    return {
      rank,
      suit: '♥',
      suitName: 'Hearts',
      colorClass: 'text-rose-400 group-hover:text-rose-300',
      borderColor: 'border-rose-500/20',
      bgTheme: 'from-rose-950/15 to-slate-900/10',
      chipTheme: 'from-rose-600 via-rose-700 to-rose-950 border-rose-400/50'
    };
  };

  return (
    <div className="space-y-6">
      {/* Banner / Tab Greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-gray-900">
        <div>
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">Chronological Evolution</span>
          <h3 className="text-xl font-semibold font-display text-white">Career Milestones</h3>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
          3+ Years Active
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Hand: Career Milestones cards */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
            CAREER HANDS (SELECT TO FLIP DETAIL)
          </span>

          <div className="space-y-3">
            {experience.map((item, idx) => {
              const isSelected = item.id === selectedId;
              const cardMeta = getCardDetails(idx);
              return (
                <motion.div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`p-4 rounded-xl cursor-pointer border relative overflow-hidden transition-all text-left group flex gap-3.5 backdrop-blur-[2px] ${
                    isSelected
                      ? `bg-gradient-to-r ${cardMeta.bgTheme} ${cardMeta.borderColor} shadow-lg shadow-rose-500/5`
                      : 'bg-[#03050a]/30 border-gray-900/50 hover:border-gray-800'
                  }`}
                >
                  {/* Playing card rank side */}
                  <div className="flex flex-col items-center justify-between font-serif text-sm select-none border border-rose-950/40 rounded-lg p-1 px-2 bg-black/45 min-w-[32px] text-center self-stretch">
                    <span className={`font-bold leading-none ${cardMeta.colorClass}`}>{cardMeta.rank}</span>
                    <span className={`text-base leading-none mt-1 ${cardMeta.colorClass}`}>{cardMeta.suit}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">
                          {item.duration}
                        </span>
                        <h4 className="text-sm font-semibold font-display text-white group-hover:text-amber-400 transition-colors truncate">
                          {item.role}
                        </h4>
                        <p className="text-xs text-rose-400 font-mono mt-0.5">
                          {item.company}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {item.tech.slice(0, 3).map((t, tIdx) => (
                        <span key={tIdx} className="text-[9.5px] font-mono text-gray-500 bg-black/30 px-1.5 py-0.5 rounded border border-gray-900/40">
                          {t}
                        </span>
                      ))}
                      {item.tech.length > 3 && (
                        <span className="text-[8px] font-mono text-gray-600 self-center">
                          +{item.tech.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Watermark background icon */}
                  <div className="absolute right-3 bottom-0 text-7xl opacity-[0.03] text-white select-none pointer-events-none font-serif leading-none">
                    {cardMeta.suit}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Hand: Deep Dive Casino Felt display board */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {activeExp ? (
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border-4 border-amber-900/30 overflow-hidden relative shadow-2xl flex flex-col justify-between h-full bg-gradient-to-b from-[#06190e]/70 via-[#030c07]/80 to-[#010502]/90 backdrop-blur-[2px]"
              >
                {/* Felt glow background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,115,59,0.15)_0%,transparent_75%)] pointer-events-none z-0" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 pointer-events-none z-0" />

                {/* Golden High-roller tag */}
                <div className="bg-[#cc9543]/10 border-b border-[#cc9543]/20 px-4 py-2 flex items-center justify-between text-[10px] font-mono text-amber-500 uppercase tracking-widest z-10 relative">
                  <span className="flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-amber-400 rotate-12" /> Active Table Placement
                  </span>
                  <span className="flex items-center gap-1.5">
                    Professional Timeline Hub
                  </span>
                </div>

                {/* General Board Details */}
                <div className="p-5 sm:p-6 space-y-5 z-10 relative flex-1 text-left">
                  {/* Heading Box */}
                  <div className="p-4 rounded-xl bg-black/40 border border-[#cc9543]/20 shadow-inner relative overflow-hidden backdrop-blur-sm">
                    {/* Poker border ribbon */}
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-amber-600/40 to-amber-500/10" />

                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                            {activeExp.duration}
                          </span>
                          <span className="text-gray-600">•</span>
                          <span className="text-[9px] font-serif text-rose-500">♥ Hearts Deck</span>
                        </div>
                        <h3 className="text-xl font-bold font-display text-white mt-1">
                          {activeExp.role}
                        </h3>
                        <p className="text-xs font-mono text-amber-500 font-medium">
                          {activeExp.company}
                        </p>
                      </div>

                      <div className="p-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400">
                        {getIcon(activeExp.logoType)}
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet List (Winning achievements Hand) */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block font-medium">
                      🏆 Winning Hand (Key Deliverables & Streaks)
                    </span>

                    <ul className="space-y-2 text-xs text-gray-300">
                      {activeExp.description.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 bg-black/25 p-2.5 rounded-lg border border-white/5 backdrop-blur-sm">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span className="leading-relaxed font-sans">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dynamic Betting Chips layout for metrics */}
                  <div className="space-y-2 col-span-1 border-t border-white/5 pt-3.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block font-medium">
                        ♣ System Stake Chips
                      </span>
                    </div>

                    <div className="flex gap-4">
                      {/* Achievements chip */}
                      <div className="flex items-center gap-3 bg-black/30 p-2.5 rounded-xl border border-white/5 shrink-0 min-w-[130px]">
                        <div className="relative w-11 h-11 rounded-full flex items-center justify-center shadow-md select-none hover:rotate-180 transition-transform duration-500 shrink-0">
                          <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/40 bg-gradient-to-br from-[#0d592a] via-[#09411d] to-[#04200d] border-emerald-400/50" />
                          <div className="absolute inset-1 bg-neutral-950 rounded-full border border-[#cc9543]/20 flex flex-col items-center justify-center">
                            <span className="font-mono text-xs font-bold text-white">
                              {activeExp.description.length}
                            </span>
                          </div>
                        </div>
                        <div className="text-left font-mono text-[9px] leading-tight text-gray-400">
                          CORE<br />RELEASES
                        </div>
                      </div>

                      {/* Stack scope chip */}
                      <div className="flex items-center gap-3 bg-black/30 p-2.5 rounded-xl border border-white/5 shrink-0 min-w-[130px]">
                        <div className="relative w-11 h-11 rounded-full flex items-center justify-center shadow-md select-none hover:rotate-180 transition-transform duration-500 shrink-0">
                          <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/40 bg-gradient-to-br from-[#1e3a8a] via-[#1e1b4b] to-[#0f172a] border-indigo-400/50" />
                          <div className="absolute inset-1 bg-neutral-950 rounded-full border border-[#cc9543]/20 flex flex-col items-center justify-center">
                            <span className="font-mono text-xs font-bold text-white">
                              {activeExp.tech.length}
                            </span>
                          </div>
                        </div>
                        <div className="text-left font-mono text-[9px] leading-tight text-gray-400">
                          INTEGRATED<br />FRAMEWORKS
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills tags field */}
                  <div className="space-y-1.5 mt-3">
                    <span className="text-[10.5px] font-mono text-amber-500 uppercase tracking-widest block font-medium">
                      ♣ Targeted Stack Specs
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeExp.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded text-xs font-mono text-gray-300 bg-neutral-950 border border-[#cc9543]/20 flex items-center gap-1 backdrop-blur-sm"
                        >
                          <span className="text-rose-500 font-serif">♥</span>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Table Croupier Shell Console Preview */}
                <div className="px-5 pb-5 z-10 relative">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5 text-gray-400">
                        <Terminal className="w-3 h-3 text-amber-400" /> Croupier logs
                      </span>
                      <span className="flex items-center gap-1 text-rose-400">
                        <CircleDot className="w-2 h-2 animate-pulse" /> Live placement
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-black/70 border border-[#cc9543]/20 font-mono text-[10px] text-gray-400 space-y-1 select-none text-left h-[80px] overflow-hidden">
                      {getCroupierLogs(activeExp.company).map((log, idx) => {
                        const isDealer = log.startsWith('[DEALER]');
                        const isError = log.includes('[ERR]') || log.includes('error');
                        return (
                          <div
                            key={idx}
                            className={isDealer ? 'text-amber-400' : isError ? 'text-red-400' : 'text-gray-400'}
                          >
                            <span className="text-gray-600 block sm:inline mr-2">{`>`}</span>
                            {log}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="rounded-2xl border-4 border-amber-900/30 overflow-hidden bg-gradient-to-b from-[#06190e]/70 via-[#030c07]/80 to-[#010502]/90 p-8 h-full flex flex-col items-center justify-center text-center">
                <Briefcase className="w-10 h-10 text-amber-500/60 mb-3 animate-pulse" />
                <p className="text-xs text-gray-400 font-mono">
                  No experience node detected on table. Select list card.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
