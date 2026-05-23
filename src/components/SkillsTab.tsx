import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Cpu, Code, ShieldCheck, Terminal, CircleDot, Trophy, Crown, Coins } from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsTabProps {
  categories: SkillCategory[];
}

export default function SkillsTab({ categories }: SkillsTabProps) {
  // Flatten categories into list of skills for easier selection if needed,
  // or default to the very first skill in the first category
  const initialSkill = categories[0]?.skills[0] || null;
  const [selectedSkillName, setSelectedSkillName] = useState<string>(initialSkill?.name || '');

  // Find active skill details
  let activeSkill = initialSkill;
  let activeCategoryTitle = categories[0]?.title || 'Systems';
  
  for (const cat of categories) {
    const found = cat.skills.find(s => s.name === selectedSkillName);
    if (found) {
      activeSkill = found;
      activeCategoryTitle = cat.title;
      break;
    }
  }

  // Get custom croupier telemetry lines based on selected skill
  const getCroupierLogs = (skillName: string) => {
    switch (skillName) {
      case 'TypeScript':
        return [
          '[DEALER] Dealing the TypeScript Spade card to table.',
          '[COMPILER] Strict structural type verification: safe.',
          '[SYS] Resolving ambient decls & namespaces.',
          '[OPTIMIZER] Transpilation telemetry online • 0 runtime errors.'
        ];
      case 'React (18/19)':
        return [
          '[DEALER] Drawing React Virtual DOM card.',
          '[FIBER] Reconciliation thread initiated on worker node.',
          '[MEMO] Stable dependency tracking verified.',
          '[FRAME] Paint loops synced at fluid 120 FPS frame caps.'
        ];
      case 'Tailwind CSS':
        return [
          '[DEALER] Dealing utility compiler style layouts.',
          '[POSTCSS] JIT compilation in process...',
          '[RESPONSIVE] Dynamic breakpoint matrices configured.',
          '[THEME] Inter Sans & JetBrains Mono font-faces active.'
        ];
      case 'Motion / Framer':
        return [
          '[DEALER] Drawing Framer physics card.',
          '[SPRING] Physics simulation thread active (stiffness 150, damping 15).',
          '[DOM] Multi-screen structural layouts rendering seamlessly.',
          '[ANIM] Micro-interaction frames active.'
        ];
      default:
        return [
          `[DEALER] Inspecting croupier card for ${skillName || 'Active Stack'}...`,
          '[DECK] Drawing from high fluency security hand.',
          '[SYS] System standard optimization loops active.',
          '[TELEMETRY] Live capability matrix streaming safely.'
        ];
    }
  };

  // Helper properties to give each skill category custom visual theme colors
  const getCategoryDetails = (catTitle: string) => {
    const lowerTitle = catTitle.toLowerCase();
    if (lowerTitle.includes('frontend') || lowerTitle.includes('ui')) {
      return {
        suit: '♠',
        suitName: 'Spades',
        colorClass: 'text-indigo-400 group-hover:text-indigo-300',
        borderColor: 'border-indigo-500/20',
        bgTheme: 'from-indigo-950/15 to-slate-900/10',
        chipTheme: 'from-indigo-600 via-indigo-700 to-indigo-900 border-indigo-400/50'
      };
    } else if (lowerTitle.includes('backend') || lowerTitle.includes('server')) {
      return {
        suit: '♦',
        suitName: 'Diamonds',
        colorClass: 'text-rose-400 group-hover:text-rose-300',
        borderColor: 'border-rose-500/20',
        bgTheme: 'from-rose-950/15 to-slate-900/10',
        chipTheme: 'from-red-600 via-red-700 to-red-900 border-red-400/50'
      };
    } else {
      return {
        suit: '♣',
        suitName: 'Clubs',
        colorClass: 'text-emerald-400 group-hover:text-emerald-300',
        borderColor: 'border-emerald-500/20',
        bgTheme: 'from-emerald-950/15 to-slate-900/10',
        chipTheme: 'from-emerald-600 via-emerald-700 to-emerald-900 border-emerald-400/50'
      };
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Code className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner / Tab Greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-gray-900">
        <div>
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">Interactive Arsenal</span>
          <h3 className="text-xl font-semibold font-display text-white">Technical Capability</h3>
        </div>
        <p className="text-xs font-mono text-gray-500">
          Dealt Hands: <span className="text-white">{categories.reduce((acc, c) => acc + c.skills.length, 0)}</span> Loaded Modules
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Hand: Category Stacks and Skills Lists */}
        <div className="lg:col-span-5 space-y-4 max-h-[620px] overflow-y-auto pr-1">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
            SKILL HANDS (SELECT TO INSPECT AT TABLE)
          </span>

          <div className="space-y-4">
            {categories.map((cat, catIdx) => {
              const catMeta = getCategoryDetails(cat.title);
              return (
                <div 
                  key={catIdx} 
                  className="p-3.5 rounded-xl bg-[#03050a]/30 border border-gray-900/50 space-y-2.5 backdrop-blur-[2px]"
                >
                  <div className="flex items-center justify-between border-b border-gray-900/40 pb-1.5">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(cat.icon)}
                      <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                        {cat.title}
                      </h4>
                    </div>
                    <span className="text-[10px] text-gray-600 font-serif leading-none">{catMeta.suit}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {cat.skills.map((skill, sIdx) => {
                      const isSelected = skill.name === selectedSkillName;
                      return (
                        <motion.div
                          key={sIdx}
                          onClick={() => setSelectedSkillName(skill.name)}
                          whileHover={{ scale: 1.01, x: 2 }}
                          className={`p-2.5 rounded-lg cursor-pointer border relative overflow-hidden transition-all text-left group flex items-center justify-between ${
                            isSelected
                              ? `bg-gradient-to-r ${catMeta.bgTheme} ${catMeta.borderColor} shadow shadow-indigo-500/5`
                              : 'bg-black/20 border-transparent hover:border-gray-900 hover:bg-[#060810]/40'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`text-[11px] font-serif ${isSelected ? catMeta.colorClass : 'text-gray-600'}`}>
                              {catMeta.suit}
                            </span>
                            <span className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors truncate">
                              {skill.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono text-gray-500 shrink-0">
                              {skill.years} Yrs
                            </span>
                            <div className="w-10 h-1 bg-gray-950 rounded-full overflow-hidden shrink-0">
                              <div 
                                className="h-full bg-amber-500/80 rounded-full" 
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Hand: Casino Display */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {activeSkill ? (
              <motion.div
                key={activeSkill.name}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border-4 border-amber-900/30 overflow-hidden relative shadow-2xl flex flex-col justify-between h-full bg-gradient-to-b from-[#06190e]/70 via-[#030c07]/80 to-[#010502]/90 backdrop-blur-[2px]"
              >
                {/* Green Felt Subtle Pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,115,59,0.15)_0%,transparent_75%)] pointer-events-none z-0" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 pointer-events-none z-0" />

                {/* Gold Plated Luxury Label bar representing high roller table */}
                <div className="bg-[#cc9543]/10 border-b border-[#cc9543]/20 px-4 py-2 flex items-center justify-between text-[10px] font-mono text-amber-500 uppercase tracking-widest z-10 relative">
                  <span className="flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-amber-400 rotate-12" /> Active Table Placement
                  </span>
                  <span className="text-[#cc9543] font-serif">
                    ♠ ♦ ♣ ♥
                  </span>
                </div>

                {/* Center Details Section - Felt Styled Card Info */}
                <div className="p-5 sm:p-6 space-y-5 z-10 relative flex-1">
                  {/* Main Heading Card */}
                  <div className="p-4 rounded-xl bg-black/40 border border-[#cc9543]/20 shadow-inner relative overflow-hidden backdrop-blur-sm">
                    {/* Subtle poker table border edge */}
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-amber-600/40 to-amber-500/10" />

                    <div className="flex flex-wrap justify-between items-start gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-amber-400 tracking-wider uppercase font-semibold">
                            {activeCategoryTitle}
                          </span>
                          <span className="text-[9px] text-amber-500/60 font-serif">
                            {getCategoryDetails(activeCategoryTitle).suit}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold font-display text-white mt-1">
                          {activeSkill.name}
                        </h3>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                        Fluency Register
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed font-sans pt-3">
                      {activeSkill.description}
                    </p>
                  </div>

                  {/* Bidding Chips - Custom metrics layout */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block font-medium">
                      🏆 Competence Stakes & Experience Valuation
                    </span>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Fluency level chip layout */}
                      <div className="flex items-center gap-4 p-3 rounded-xl bg-black/30 border border-white/5 backdrop-blur-sm">
                        {/* Interactive Spinning Casino Bidding Chip */}
                        <div className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg select-none hover:rotate-180 transition-transform duration-500 shrink-0">
                          {/* Outer stripes rim */}
                          <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/40 bg-gradient-to-br from-yellow-600 via-amber-700 to-amber-950 border-amber-400/50" />
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-full pointer-events-none" />
                          {/* Inner chip core */}
                          <div className="absolute inset-1.5 bg-neutral-950 rounded-full border border-[#cc9543]/20 flex flex-col items-center justify-center">
                            <span className="font-mono text-xs font-bold text-white leading-none">
                              {activeSkill.level}%
                            </span>
                          </div>
                        </div>

                        <div className="text-left">
                          <div className="text-[9px] font-mono text-gray-400 uppercase">Fluency Status</div>
                          <div className="text-xs font-semibold text-white mt-0.5">High stakes performance</div>
                        </div>
                      </div>

                      {/* Years stake chip layout */}
                      <div className="flex items-center gap-4 p-3 rounded-xl bg-black/30 border border-white/5 backdrop-blur-sm">
                        {/* Interactive Spinning Casino Bidding Chip (Red chip) */}
                        <div className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg select-none hover:rotate-180 transition-transform duration-500 shrink-0">
                          {/* Outer stripes rim */}
                          <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/40 bg-gradient-to-br from-red-600 via-red-700 to-red-950 border-red-400/50" />
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-full pointer-events-none" />
                          {/* Inner chip core */}
                          <div className="absolute inset-1.5 bg-neutral-950 rounded-full border border-[#cc9543]/20 flex flex-col items-center justify-center">
                            <span className="font-mono text-xs font-bold text-white leading-none">
                              {activeSkill.years}
                            </span>
                          </div>
                        </div>

                        <div className="text-left">
                          <div className="text-[9px] font-mono text-gray-400 uppercase">Years Experience</div>
                          <div className="text-xs font-semibold text-white mt-0.5">Production application hours</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sandboxed Code Snippet Container */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block font-medium">
                        ♣ Verified Blueprint Code Snippet
                      </span>
                    </div>

                    <div className="p-3 bg-black/45 hover:bg-black/55 border border-[#cc9543]/25 rounded-xl text-left font-mono relative group backdrop-blur-sm">
                      <pre className="text-[10px] text-gray-300 overflow-x-auto whitespace-pre-wrap max-h-[110px]">
                        {activeSkill.name === 'TypeScript' &&
                          `interface Config<T> {\n  id: string;\n  orchestrator: T;\n}\n\nexport function bootstrap<T>(\n  opts: Config<T>\n): T {\n  return opts.orchestrator;\n}`}
                        {activeSkill.name === 'React (18/19)' &&
                          `// Optimizing animation paint schedules\nconst canvasRef = useRef<HTMLCanvasElement>(null);\nuseLayoutEffect(() => {\n  const observer = new ResizeObserver(paint);\n  observer.observe(canvasRef.current);\n}, []);`}
                        {activeSkill.name === 'Tailwind CSS' &&
                          `/* Custom dynamic layout constraints */\n<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch bg-gray-950/20 backdrop-blur-md" />`}
                        {activeSkill.name === 'Motion / Framer' &&
                          `import { motion } from 'motion/react';\n\n<motion.div\n  layout\n  initial={{ opacity: 0 }}\n  animate={{ opacity: 1 }}\n  exit={{ opacity: 0 }}\n/>`}
                        {!['TypeScript', 'React (18/19)', 'Tailwind CSS', 'Motion / Framer'].includes(activeSkill.name) &&
                          `// Production stack module initialization\nconst coreRef = new SystemOrchestrator({\n  hotReload: false,\n  telemetrySync: true,\n  targetName: "${activeSkill.name}"\n});`}
                      </pre>
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
                      <span className="flex items-center gap-1 text-emerald-400">
                        <CircleDot className="w-2 h-2 animate-pulse" /> Live placement
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-black/70 border border-[#cc9543]/20 font-mono text-[10px] text-gray-400 space-y-1 select-none text-left h-[80px] overflow-hidden">
                      {getCroupierLogs(activeSkill.name).map((log, idx) => {
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
                <Trophy className="w-10 h-10 text-amber-500/60 mb-3 animate-pulse" />
                <p className="text-xs text-gray-400 font-mono">
                  Select a skill hand to check capabilities at the green felt.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
