import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, Mail, Github, Linkedin, MessageSquare, Terminal } from 'lucide-react';

export default function ContactTab() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [consoleLines, setConsoleLines] = useState<string[]>([]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setConsoleLines(['[SYS] Opening gateway secure connection...', '[DNS] Resolving target mail route IfennaWisdom@gmail.com...']);

    // Append logs sequentially
    setTimeout(() => {
      setConsoleLines(prev => [...prev, '[PROTO] Structuring SMTP body payload...', '[DNS] SMTP resolved. Sending request...']);
    }, 700);

    setTimeout(() => {
      setConsoleLines(prev => [...prev, '[MAIL] Message dispatched successfully!', '[SYS] Gateway closed safely.']);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header border banner */}
      <div className="pb-3 border-b border-gray-900 flex justify-between items-center">
        <div>
          <span className="text-xs font-mono text-blue-400">Secure Communication</span>
          <h3 className="text-xl font-semibold font-display text-white">Inbound Transmissions</h3>
        </div>
        <span className="text-xs font-mono text-gray-500">
          Direct Line: online
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Contact Form and Success View */}
        <div className="md:col-span-7 p-5 rounded-2xl bg-gray-950/60 border border-gray-900 flex flex-col justify-between">
          {status === 'sent' ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8 space-y-4 my-auto"
            >
              <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-semibold font-display text-white">Transmission Successful</h4>
              <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                Thank you! Your message has been routed directly to IfennaWisdom@gmail.com. I will read and review it shortly.
              </p>

              {/* Reset button inside success block */}
              <button
                onClick={() => setStatus('idle')}
                className="px-4 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-850 border border-gray-800 text-xs font-mono text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  disabled={status === 'sending'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-900 focus:border-blue-500/40 text-xs text-white placeholder-gray-600 outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@domain.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  disabled={status === 'sending'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-900 focus:border-blue-500/40 text-xs text-white placeholder-gray-600 outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  Message Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your system project, goals, or schedule..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  disabled={status === 'sending'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-900 focus:border-blue-500/40 text-xs text-white placeholder-gray-600 outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/20 disabled:text-blue-400/50 transition-colors flex items-center justify-center gap-2 text-xs font-semibold text-white tracking-wide cursor-all-scroll disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" />
                {status === 'sending' ? 'Sending via terminal Gateway...' : 'Send secure transmission'}
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Channels Detail & Console */}
        <div className="md:col-span-5 flex flex-col justify-between gap-5">
          {/* Card directory list linking to profiles */}
          <div className="p-5 rounded-2xl bg-gray-950 border border-gray-900 space-y-4">
            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest text-left">
              Secure Direct Handles
            </h4>

            <div className="space-y-2 text-left">
              <a
                href="mailto:IfennaWisdom@gmail.com"
                className="p-3 rounded-xl bg-gray-950 border border-gray-900 hover:border-gray-800 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 block leading-none">Email</span>
                    <span className="text-xs font-medium text-white">IfennaWisdom@gmail.com</span>
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/EbukaOkoye"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-gray-950 border border-gray-900 hover:border-gray-800 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 group-hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 block leading-none">Developer</span>
                    <span className="text-xs font-medium text-white">github.com/EbukaOkoye</span>
                  </div>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-gray-950 border border-gray-900 hover:border-gray-800 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 block leading-none">Professional</span>
                    <span className="text-xs font-medium text-white">Chukwuebuka Ifenna Okoye (LinkedIn)</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Console Debug Log for Email Pipeline */}
          <div className="space-y-1.5 text-left">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              Gateway Pipeline Logs
            </span>
            <div className="p-3 rounded-xl bg-gray-955 border border-gray-900/60 font-mono text-[9px] text-gray-400 space-y-1 h-24 overflow-y-auto select-none">
              {consoleLines.length > 0 ? (
                consoleLines.map((line, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-700">{`>`}</span>
                    <span className={line.startsWith('[MAIL]') ? 'text-emerald-400' : line.startsWith('[SYS]') ? 'text-blue-400' : 'text-gray-400'}>
                      {line}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-gray-600 italic">Console is idling. Send a message to stream socket actions.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
