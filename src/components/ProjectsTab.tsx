import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Terminal, Sparkles, AlertCircle, CircleDot, Trophy, Crown, Coins } from 'lucide-react';
import { Project } from '../types';

interface ProjectsTabProps {
  projects: Project[];
}

export default function ProjectsTab({ projects }: ProjectsTabProps) {
  const [selectedId, setSelectedId] = useState<string>(projects[0]?.id || '');
  const activeProj = projects.find(p => p.id === selectedId) || projects[0];

  const getTelemetryLogs = (id: string) => {
    switch (id) {
      case 'innovate-to-impact':
        return [
          '[DEALER] Shuffling Innovate project cards...',
          '[GATE] Resolving https://www.innovatetoimpact.org/ DNS target.',
          '[NET] Handshaking secure digital pathway nodes.',
          '[SYS] Loaded 1,200+ young active developer entities.',
          '[CASHIER] Community payout telemetry active.'
        ];
      case 'credence-website':
        return [
          '[DEALER] Drawing Credence Agro portfolio hand...',
          '[AGRO] Fetching supply matrix values from local farm nodes.',
          '[CROP] Querying agricultural grain, livestock, and trade buffers.',
          '[NET] Secure escrow transaction interface loaded successfully.',
          '[SYS] Trade telemetry calculated in real-time.'
        ];
      default:
        return [
          '[DEALER] Awaiting smart contract or player deck placement...',
          '[SYS] Connected to high stakes network.'
        ];
    }
  };

  // Helper properties to give each project unique casino card visual branding
  const getCardDetails = (id: string) => {
    switch (id) {
      case 'innovate-to-impact':
        return {
          rank: 'A',
          suit: '♠',
          suitName: 'Spades',
          color: 'text-indigo-400 group-hover:text-indigo-300',
          borderColor: 'border-indigo-500/30',
          glowColor: 'shadow-indigo-500/10',
          bgTheme: 'from-indigo-950/25 to-slate-900/40',
          badgeTheme: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
        };
      case 'credence-website':
        return {
          rank: 'Q',
          suit: '♣',
          suitName: 'Clubs',
          color: 'text-emerald-400 group-hover:text-emerald-300',
          borderColor: 'border-emerald-500/30',
          glowColor: 'shadow-emerald-500/10',
          bgTheme: 'from-emerald-950/20 to-slate-900/40',
          badgeTheme: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
        };
      default:
        return {
          rank: '10',
          suit: '♦',
          suitName: 'Diamonds',
          color: 'text-amber-400 group-hover:text-amber-300',
          borderColor: 'border-amber-500/30',
          glowColor: 'shadow-amber-500/10',
          bgTheme: 'from-amber-950/20 to-slate-900/40',
          badgeTheme: 'bg-amber-500/10 border-amber-500/20 text-amber-400'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner / Tab Greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-gray-900">
        <div>
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">Selected Systems & Libraries</span>
          <h3 className="text-xl font-semibold font-display text-white">Project Blueprint Registry</h3>
        </div>
        <p className="text-xs font-mono text-gray-500">
          Dealt Hands: <span className="text-white">{projects.length}</span> Active Suites
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Hand: Project Playing Cards / Dealt Hands */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
            PROJECT DEEP HAND (SELECT TO SHOW AT TABLE)
          </span>
          <div className="space-y-3.5">
            {projects.map((proj) => {
              const isSelected = proj.id === selectedId;
              const cardMeta = getCardDetails(proj.id);
              return (
                <motion.div
                  key={proj.id}
                  onClick={() => setSelectedId(proj.id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`p-4 rounded-xl cursor-pointer border relative overflow-hidden transition-all text-left group flex gap-3.5 ${
                    isSelected
                      ? `bg-gradient-to-r ${cardMeta.bgTheme} ${cardMeta.borderColor} shadow-lg ${cardMeta.glowColor}`
                      : 'bg-[#03050a]/60 border-gray-900/60 hover:border-gray-800 hover:bg-[#060810]/90'
                  }`}
                >
                  {/* Playing Card Corner / Mini Insignia style */}
                  <div className="flex flex-col items-center justify-between font-serif text-sm select-none border border-gray-800/40 rounded-lg p-1 px-2 bg-black/45 min-w-[32px] text-center self-stretch">
                    <span className={`font-bold leading-none ${cardMeta.color}`}>{cardMeta.rank}</span>
                    <span className={`text-base leading-none mt-1 ${cardMeta.color}`}>{cardMeta.suit}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">
                          Card Suit - {cardMeta.suitName}
                        </span>
                        <h4 className="text-sm font-semibold font-display text-white group-hover:text-amber-400 transition-colors truncate">
                          {proj.title}
                        </h4>
                      </div>
                      {proj.featured && (
                        <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase tracking-widest ${cardMeta.badgeTheme}`}>
                          DECK STAKE
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-400 font-sans mt-2 line-clamp-1">
                      {proj.description}
                    </p>

                    {/* Micro tech tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {proj.tech.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="text-[9px] font-mono text-gray-500 bg-black/30 px-1.5 py-0.5 rounded border border-gray-900/40">
                          {t}
                        </span>
                      ))}
                      {proj.tech.length > 3 && (
                        <span className="text-[8px] font-mono text-gray-600 self-center">
                          +{proj.tech.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Watermarked card suit background decoration */}
                  <div className="absolute right-3 bottom-0 text-7xl opacity-[0.03] text-white select-none pointer-events-none font-serif leading-none">
                    {cardMeta.suit}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Hand: Casino Display */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProj.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border-4 border-amber-900/30 overflow-hidden relative shadow-2xl flex flex-col justify-between h-full bg-gradient-to-b from-[#06190e] via-[#030c07] to-[#010502]"
            >
              {/* Green Felt Subtle Pattern overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,115,59,0.12)_0%,transparent_75%)] pointer-events-none z-0" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 pointer-events-none z-0" />

              {/* Gold Plated Luxury Label bar representing high roller table */}
              <div className="bg-[#cc9543]/10 border-b border-[#cc9543]/20 px-4 py-2 flex items-center justify-between text-[10px] font-mono text-amber-500 uppercase tracking-widest z-10 relative">
                <span className="flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400 rotate-12" /> Active Table Placement
                </span>
                <span className="flex items-center gap-1">
                  High-Stakes Registry
                </span>
              </div>

              {/* Center Details Section - Felt Styled Card Info */}
              <div className="p-5 sm:p-6 space-y-6 z-10 relative flex-1">
                {/* Main Heading Card */}
                <div className="p-4 rounded-xl bg-black/45 border border-[#cc9543]/20 shadow-inner relative overflow-hidden backdrop-blur-sm">
                  {/* Subtle poker table borders */}
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-amber-600/40 to-amber-500/10" />
                  
                  <div className="flex flex-wrap justify-between items-start gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-amber-400 tracking-wider uppercase font-semibold">
                          {activeProj.category}
                        </span>
                        <span className="text-[9px] text-[#cc9543] font-serif">♦♠♥♣</span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-white mt-1 group-hover:text-amber-300">
                        {activeProj.title}
                      </h3>
                    </div>

                    <div className="flex gap-2">
                      {activeProj.githubUrl && (
                        <a
                          href={activeProj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-gray-900/80 hover:bg-gray-850 border border-gray-800 text-gray-300 hover:text-white transition-colors cursor-pointer"
                          title="View Source on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {activeProj.liveUrl && (
                        <a
                          href={activeProj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {(activeProj.id === 'innovate-to-impact' || activeProj.id === 'credence-website') ? 'Visit Live Project' : 'Live Demo'}
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans pt-3">
                    {activeProj.longDescription}
                  </p>

                  {(activeProj.id === 'innovate-to-impact' || activeProj.id === 'credence-website') && (
                    <div className="pt-3 border-t border-white/5 mt-3">
                      <a
                        href={activeProj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 underline transition-colors"
                      >
                        Visit the live project here
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Bidding Chips - Custom metrics layout */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block font-medium">
                    🏆 System Milestones & Valuation
                  </span>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {activeProj.stats?.map((stat, idx) => {
                      // Alternate chip colors: Red, Gold, Green
                      let chipGradient = "from-red-600 via-red-700 to-red-900 border-red-400/50";
                      if (idx === 1) {
                        chipGradient = "from-yellow-600 via-amber-700 to-amber-900 border-amber-400/50";
                      } else if (idx === 2) {
                        chipGradient = "from-[#0d592a] via-[#09411d] to-[#04200d] border-[#22c55e]/50";
                      }

                      return (
                        <div key={idx} className="flex flex-col items-center group/chip">
                          {/* Beautiful Interactive Spinning Casino Bidding Chip */}
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-xl select-none transition-transform duration-500 group-hover/chip:rotate-180">
                            {/* Outer stripes rim */}
                            <div className={`absolute inset-0 rounded-full border-4 border-dashed border-white/40 bg-gradient-to-br ${chipGradient}`} />
                            
                            {/* Glossy sheen overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-full pointer-events-none" />

                            {/* Inner chip core */}
                            <div className="absolute inset-2 sm:inset-2.5 bg-neutral-950 rounded-full border border-[#cc9543]/20 flex flex-col items-center justify-center">
                              <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-tight leading-none">
                                {stat.value}
                              </span>
                            </div>
                          </div>
                          
                          <span className="text-[9px] font-mono text-gray-400 mt-2 text-center max-w-[90px] leading-tight">
                            {stat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Technologies - Presented as Winning Hand Tags */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block font-medium">
                    ♣ Winning Stack (Tech Specs)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProj.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded text-xs font-mono text-gray-300 bg-neutral-950 border border-[#cc9543]/25 flex items-center gap-1"
                      >
                        <span className="text-amber-500 font-serif">♦</span>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table Croupier Shell Console Preview */}
              <div className="px-5 pb-5 z-10 relative">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <Terminal className="w-3 h-3 text-amber-400" /> Croupier Telemetry logs
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CircleDot className="w-2 h-2 animate-pulse" /> Live placement
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-black/75 border border-[#cc9543]/20 font-mono text-[10px] text-gray-400 space-y-1 select-none text-left h-[82px] overflow-hidden">
                    {getTelemetryLogs(activeProj.id).map((log, idx) => {
                      const isSys = log.startsWith('[DEALER]');
                      const isError = log.includes('[ERR]') || log.includes('error');
                      return (
                        <div
                          key={idx}
                          className={isSys ? 'text-amber-400' : isError ? 'text-red-400' : 'text-gray-400'}
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
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
