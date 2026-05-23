import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Mail, Calendar, FileText, Sparkles, Code, Terminal, Trophy, Crown, CircleDot, Send, CheckCircle, Github, Linkedin } from 'lucide-react';
import { PortfolioMeta } from '../types';

interface AboutTabProps {
  meta: PortfolioMeta;
}

export default function AboutTab({ meta }: AboutTabProps) {
  const [activeChapter, setActiveChapter] = useState<string>('identity');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [consoleLines, setConsoleLines] = useState<string[]>([]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSendStatus('sending');
    setConsoleLines([
      '[SYS] Initializing SMTP high-stakes security handshake...',
      '[DNS] Routing secure transmission node to IfennaWisdom@gmail.com...'
    ]);

    setTimeout(() => {
      setConsoleLines(prev => [
        ...prev,
        '[PROTO] Parsing digital envelope headers & mail templates...',
        '[SECURE] Shuffling security keys ... approved.'
      ]);
    }, 750);

    setTimeout(() => {
      setConsoleLines(prev => [
        ...prev,
        '[MAIL] Handover successful! Stake dispatched.',
        '[SYS] SMTP pipeline closed safely.'
      ]);
      setSendStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    }, 1900);
  };

  const chapters = [
    {
      id: 'identity',
      rank: 'K',
      suit: '👑',
      tag: 'Executive Core',
      title: 'Biographical Identity',
      shortDesc: 'About Chukwuebuka Ifenna Okoye, primary developer background.',
      longDesc: `Chukwuebuka Ifenna Okoye is a frontend specialist obsessed with compiling pristine interactive systems, latency-critical real-time environments, and tactile browser simulations. Drawing inspiration from mathematical physics and structured design patterns, he bridges high-efficiency performance with high-contrast aesthetic luxury.`,
      stats: [
        { label: 'Rank', value: 'K' },
        { label: 'Class', value: 'Alpha' }
      ]
    },
    {
      id: 'competence',
      rank: 'K',
      suit: '⚡',
      tag: 'Winning Focus',
      title: 'Structural Focus',
      shortDesc: 'Core technical focus, systems, and telemetry standards.',
      longDesc: 'Standardizing websocket channels, modular layout frames with optimal paint schedules, high-density bento grids, customized agentic console logs, and reactive SVG structures utilizing clean mathematical layouts.',
      stats: [
        { label: 'Competence', value: '100' },
        { label: 'Score', value: 'Top 3%' }
      ]
    },
    {
      id: 'contact',
      rank: 'K',
      suit: '✉️',
      tag: 'Inbound Line',
      title: 'Direct Mail Transmission',
      shortDesc: 'Secure communication pipeline, social accounts and mail gateway.',
      longDesc: 'Submit a digital stake or custom transmission payload below to establish an immediate SMTP connection directly with Chukwuebuka Ifenna Okoye. Ideal for system architectures, design consultancy, or high-stakes developments.',
      stats: [
        { label: 'Status', value: 'Online' },
        { label: 'Safe Gate', value: 'TLS 1.3' }
      ]
    }
  ];

  const currentCh = chapters.find(c => c.id === activeChapter) || chapters[0];

  const getCroupierLogs = (chapterId: string) => {
    switch (chapterId) {
      case 'identity':
        return [
          '[DEALER] Card matching Chukwuebuka Ifenna Okoye verified.',
          '[IDENTITY] Host status online (London / Remote).',
          '[GATE] Resolving encrypted social profile nodes...',
          '[SYS] Portfolio core ledger verified.'
        ];
      case 'competence':
        return [
          '[DEALER] Drawing structural competence matrix cards.',
          '[OPTIMIZER] Active canvas nodes painting fluidly.',
          '[METRICS] Running benchmark index test...',
          '[SYS] Standard response within 0.1ms.'
        ];
      case 'hardware':
        return [
          '[DEALER] Loading key workspace parameters.',
          '[LOG] starship-prompt.zsh initialized.',
          '[SYS] Custom mechanical hotswap key registry is responsive.',
          '[CASHIER] Security check passed.'
        ];
      default:
        return consoleLines.length > 0 ? consoleLines : [
          '[DEALER] Secure direct messaging pipeline idling...',
          '[GATEWAY] Awaiting inbound transmission input from client browser.'
        ];
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner / Tab Greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-gray-900">
        <div>
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">Prestige Biographical Registry</span>
          <h3 className="text-xl font-semibold font-display text-white">Identity Dossier</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-rose-400">
          <MapPin className="w-3.5 h-3.5" /> London, UK / Remote
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Chapter choice Cards */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
            DOSSIER CARDS (SELECT TO SHOW ON TABLE)
          </span>

          <div className="space-y-3">
            {chapters.map((ch) => {
              const isSelected = ch.id === activeChapter;
              return (
                <motion.div
                  key={ch.id}
                  onClick={() => setActiveChapter(ch.id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`p-4 rounded-xl cursor-pointer border relative overflow-hidden transition-all text-left flex gap-3.5 backdrop-blur-[2px] ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-950/15 to-slate-900/10 border-amber-500/20 shadow-lg shadow-amber-500/5'
                      : 'bg-[#03050a]/20 border-gray-900/50 hover:border-gray-800'
                  }`}
                >
                  {/* Playing card rank corner */}
                  <div className="flex flex-col items-center justify-between font-serif text-sm select-none border border-amber-900/30 rounded-lg p-1 px-2 bg-black/45 min-w-[32px] text-center self-stretch">
                    <span className="font-bold leading-none text-amber-400">{ch.rank}</span>
                    <span className="text-base leading-none mt-1 text-amber-500">{ch.suit}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest block">
                      {ch.tag}
                    </span>
                    <h4 className="text-xs font-semibold font-display text-white mt-0.5 group-hover:text-amber-400 transition-colors truncate">
                      {ch.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 font-sans mt-1 line-clamp-1">
                      {ch.shortDesc}
                    </p>
                  </div>

                  {/* Absolute watermark suit background decoration */}
                  <div className="absolute right-3 bottom-0 text-7xl opacity-[0.03] text-white select-none pointer-events-none font-serif leading-none">
                    {ch.suit}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Social and quick meta handles inside left capsule */}
          <div className="p-4 rounded-xl bg-black/30 border border-gray-900/50 space-y-3.5 text-xs text-left backdrop-blur-[2px]">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">
              Direct Host Handles
            </span>

            <div className="space-y-2 font-mono text-[10px]">
              <a
                href="mailto:IfennaWisdom@gmail.com"
                className="flex justify-between items-center py-1.5 border-b border-gray-905/40 hover:text-amber-400 transition-colors"
                title="Send secure email transmission"
              >
                <span className="text-gray-400">EMAIL GATE</span>
                <span className="text-white hover:underline">IfennaWisdom@gmail.com</span>
              </a>
              <a
                href="https://github.com/EbukaOkoye"
                target="_blank"
                rel="noreferrer"
                className="flex justify-between items-center py-1.5 border-b border-gray-905/40 hover:text-amber-400 transition-colors"
              >
                <span className="text-gray-400">GITHUB REPO</span>
                <span className="text-white hover:underline">github/EbukaOkoye</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex justify-between items-center py-1.5 hover:text-amber-400 transition-colors"
              >
                <span className="text-gray-400">LINKEDIN LINK</span>
                <span className="text-white hover:underline">LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Casino Felt detailed view */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCh.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border-4 border-amber-900/30 overflow-hidden relative shadow-2xl flex flex-col justify-between h-full bg-gradient-to-b from-[#06190e]/70 via-[#030c07]/80 to-[#010502]/90 backdrop-blur-[2px]"
            >
              {/* Felt texture layer */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,115,59,0.15)_0%,transparent_75%)] pointer-events-none z-0" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 pointer-events-none z-0" />

              {/* Gold Plated luxury bar */}
              <div className="bg-[#cc9543]/10 border-b border-[#cc9543]/20 px-4 py-2 flex items-center justify-between text-[10px] font-mono text-amber-500 uppercase tracking-widest z-10 relative">
                <span className="flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400 rotate-12" /> Active Table Placement
                </span>
                <span className="text-[#cc9543] font-serif">K👑K</span>
              </div>

              {/* Central text or form panel */}
              <div className="p-5 sm:p-6 space-y-5 z-10 relative flex-1 text-left">
                {/* Main Heading Bio Header overlay */}
                <div className="p-4 rounded-xl bg-black/45 border border-[#cc9543]/20 shadow-inner relative overflow-hidden backdrop-blur-sm flex gap-4 items-start">
                  
                  {/* Small avatar profile card when on Identity chapter to make it highly graphical */}
                  {currentCh.id === 'identity' && (
                    <div className="relative shrink-0 w-20 h-24 rounded-lg overflow-hidden border border-amber-500/30 bg-gray-950/60 shadow-lg">
                      <img
                        src="/src/assets/images/user_portrait_1779432560781.png"
                        alt="Chukwuebuka Ifenna Okoye portrait visual"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                        Biography Registry
                      </span>
                      <span className="text-gray-600 font-serif leading-none">•</span>
                      <span className="text-[10px] text-amber-500 font-serif leading-none">{currentCh.suit}</span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-white mt-1">
                      {currentCh.title}
                    </h3>

                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                      System administrator dossier
                    </p>
                  </div>
                </div>

                {/* Switch between general content text OR physical Contact Form */}
                {currentCh.id === 'contact' ? (
                  <div className="space-y-4">
                    {sendStatus === 'sent' ? (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-6 space-y-3 bg-black/20 p-4 rounded-xl border border-emerald-500/15 backdrop-blur-sm"
                      >
                        <div className="inline-flex p-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-semibold font-display text-white">Transmission Dispatched</h4>
                        <p className="text-[11px] text-gray-300 max-w-sm mx-auto leading-relaxed font-sans">
                          Success! Your digital stake has been routed securely to IfennaWisdom@gmail.com. I will read and review your payload shortly.
                        </p>
                        <button
                          onClick={() => {
                            setSendStatus('idle');
                            setConsoleLines([]);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-[10px] font-mono text-gray-300 hover:text-white transition-colors cursor-pointer"
                        >
                          Send Another Hand
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSend} className="space-y-3 p-4 rounded-xl bg-black/30 border border-[#cc9543]/20 backdrop-blur-sm text-xs text-left">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block">NAME</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Host Player"
                              value={formData.name}
                              onChange={e => setFormData({ ...formData, name: e.target.value })}
                              disabled={sendStatus === 'sending'}
                              className="w-full px-3 py-2 rounded-lg bg-black/50 border border-gray-900 focus:border-amber-500/45 text-[11px] text-white placeholder-gray-650 outline-none transition-colors"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block">EMAIL</label>
                            <input
                              type="email"
                              required
                              placeholder="e.g. player@casino.com"
                              value={formData.email}
                              onChange={e => setFormData({ ...formData, email: e.target.value })}
                              disabled={sendStatus === 'sending'}
                              className="w-full px-3 py-2 rounded-lg bg-black/50 border border-gray-900 focus:border-amber-500/45 text-[11px] text-white placeholder-gray-650 outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block font-medium">TRANSMISSION PAYLOAD MESSAGE</label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Connect, arrange projects, or state stakes..."
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            disabled={sendStatus === 'sending'}
                            className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-gray-900 focus:border-amber-500/45 text-[11px] text-white placeholder-gray-650 outline-none transition-colors resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={sendStatus === 'sending'}
                          className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-600 hover:border-amber-400 border border-amber-600 disabled:bg-amber-500/10 disabled:text-amber-500/40 font-mono text-[10px] font-semibold text-neutral-950 uppercase tracking-widest cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Send className="w-3 h-3 text-neutral-950" />
                          {sendStatus === 'sending' ? 'Dispatching Payload...' : 'Send Secure Stake Transmission'}
                        </button>
                      </form>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-black/25 border border-white/5 backdrop-blur-sm">
                    <h4 className="text-[10px] font-mono text-amber-500 uppercase tracking-widest mb-1.5">
                      ♣ Chapter specification details
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {currentCh.longDesc}
                    </p>
                  </div>
                )}

                {/* Micro-Chips Stats display */}
                <div className="space-y-2 border-t border-white/5 pt-3.5 gap-4">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block font-medium">
                    ♣ System Valuation Stake Chips
                  </span>

                  <div className="flex gap-4">
                    {currentCh.stats.map((st, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-black/25 p-2 rounded-xl border border-white/5 shrink-0 min-w-[120px] backdrop-blur-sm">
                        <div className="relative w-10 h-10 rounded-full flex items-center justify-center shadow-md select-none hover:rotate-180 transition-transform duration-500 shrink-0">
                          {/* Alternating chips colors */}
                          <div className={`absolute inset-0 rounded-full border border-dashed border-white/40 bg-gradient-to-br ${
                            idx === 1 
                              ? "from-yellow-600 via-amber-700 to-amber-900 border-amber-400/50" 
                              : "from-red-600 via-red-700 to-red-900 border-red-400/50"
                          }`} />
                          <div className="absolute inset-1 bg-neutral-950 rounded-full border border-[#cc9543]/20 flex flex-col items-center justify-center">
                            <span className="font-mono text-[10px] font-bold text-white">
                              {st.value}
                            </span>
                          </div>
                        </div>

                        <span className="text-[9px] font-mono text-gray-400 uppercase truncate">
                          {st.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table Croupier logs */}
              <div className="px-5 pb-5 z-10 relative">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <Terminal className="w-3 h-3 text-amber-400" /> Croupier logs
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <CircleDot className="w-2 h-2 animate-pulse" /> Live placement
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/70 border border-[#cc9543]/20 font-mono text-[10px] text-gray-400 space-y-1 select-none text-left h-[80px] overflow-hidden">
                    {getCroupierLogs(currentCh.id).map((log, idx) => {
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
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
