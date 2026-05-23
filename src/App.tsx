/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  ArrowRight,
  Terminal,
  HelpCircle,
  Code,
  ShieldCheck,
  Award,
  FolderGit2,
  Cpu,
  Shuffle
} from 'lucide-react';

import { portfolioMeta, projectsData, experienceData, skillsData } from './data';
import AboutTab from './components/AboutTab';
import ProjectsTab from './components/ProjectsTab';
import ExperienceTab from './components/ExperienceTab';
import SkillsTab from './components/SkillsTab';
import ContactTab from './components/ContactTab';
import DarkParticleEffects from './components/DarkParticleEffects';
import jokerImage from './assets/images/joker_batman_1779433400114.png';
import darkAnimeImage from './assets/images/dark_anime_love_1779435344913.png';
import userPortraitImage from './assets/images/user_portrait_1779432560781.png';
import madaraImage from './assets/images/madara_susanoo_1779435610767.png';
import userImgImage from './assets/images/user-img.png';
import gambitImage from './assets/images/gambit_xmen_card_1779433658726.png';


type PlayingCardId = 'joker' | 'spade' | 'love' | 'king';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    }
  }
};

const leftCurtainVariants = {
  initial: { x: '0%', opacity: 1 },
  animate: {
    x: '-100%',
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.77, 0, 0.175, 1],
      delay: 0.1
    }
  },
  exit: {
    x: '0%',
    opacity: 0,
    transition: {
      x: { duration: 1.8, ease: [0.77, 0, 0.175, 1] },
      opacity: { duration: 1.8, ease: 'easeInOut' }
    }
  }
};

const rightCurtainVariants = {
  initial: { x: '0%', opacity: 1 },
  animate: {
    x: '100%',
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.77, 0, 0.175, 1],
      delay: 0.1
    }
  },
  exit: {
    x: '0%',
    opacity: 0,
    transition: {
      x: { duration: 1.8, ease: [0.77, 0, 0.175, 1] },
      opacity: { duration: 1.8, ease: 'easeInOut' }
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 180,
    scale: 0.5,
    rotate: 0,
  },
  visible: (custom: { baseRotation: number }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: custom.baseRotation,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 13,
      mass: 0.85
    }
  })
};

const INITIAL_PLAYING_CARDS = [
  {
    id: 'joker' as PlayingCardId,
    rank: '🃏',
    suit: 'JKR',
    title: 'The Joker',
    subtitle: 'Project Registry',
    description: 'Tactile real-time telemetry pipelines, interactive agent workspaces, & graphic WASM compilers.',
    colorTheme: 'from-emerald-500 via-teal-600 to-emerald-950',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    badge: 'PROJECTS',
    hoverHighlight: 'Joker • 3 registered projects active',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/5',
    borderColor: 'border-emerald-500/20'
  },
  {
    id: 'spade' as PlayingCardId,
    rank: 'A',
    suit: '♠',
    title: 'Ace of Spades',
    subtitle: 'Technical Skills',
    description: 'Advanced competence gauges, active language ecosystems, architecture patterns, and sandbox scripts.',
    colorTheme: 'from-indigo-500 via-blue-600 to-indigo-950',
    glowColor: 'rgba(99, 102, 241, 0.35)',
    badge: 'Skills',
    hoverHighlight: 'Spade • TypeScript • React • WebSockets • Rust',
    textColor: 'text-indigo-400',
    bgColor: 'bg-indigo-500/5',
    borderColor: 'border-indigo-500/20'
  },
  {
    id: 'love' as PlayingCardId,
    rank: 'L',
    suit: '♥',
    title: 'The Heart of Love',
    subtitle: 'Experience path',
    description: 'Chronological timeline benchmarks, team engineering leads, and beautiful visual core libraries.',
    colorTheme: 'from-rose-500 via-pink-600 to-red-950',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    badge: 'Milestones',
    hoverHighlight: 'Heart • Corporate Sprints & SAAS design systems',
    textColor: 'text-rose-400',
    bgColor: 'bg-rose-500/5',
    borderColor: 'border-rose-500/20'
  },
  {
    id: 'king' as PlayingCardId,
    rank: 'K',
    suit: '👑',
    title: 'The King',
    subtitle: 'User Portrait & About',
    description: 'The uploaded master portrait, biographical details, credentials, and inbound message gateways.',
    colorTheme: 'from-amber-400 via-yellow-600 to-amber-950',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    badge: 'King / Bio',
    hoverHighlight: 'King • Chukwuebuka Ifenna Okoye • Complete Portrait Artwork',
    textColor: 'text-amber-400',
    bgColor: 'bg-amber-500/5',
    borderColor: 'border-amber-500/20'
  }
];

const CARD_STATUS_STATES = {
  joker: {
    idle: 'Project Registry',
    active: '● LIVE • UI & WASM Systems Online'
  },
  spade: {
    idle: 'Technical Skills',
    active: '⚡ ACTIVE • 8 Tech Modules Mapped'
  },
  love: {
    idle: 'Experience Path',
    active: '❤ RECORD • 3+ Years Milestones'
  },
  king: {
    idle: 'User Biography',
    active: '👑 IDENTITY • Chukwuebuka Ifenna Okoye'
  }
};

const LABEL_COLOR_CLASSES = {
  joker: 'text-emerald-400 border-emerald-500/30 shadow-emerald-950/20 bg-emerald-950/20',
  spade: 'text-indigo-400 border-indigo-500/30 shadow-indigo-950/20 bg-indigo-950/20',
  love: 'text-rose-400 border-rose-500/30 shadow-rose-950/20 bg-rose-950/20',
  king: 'text-amber-400 border-amber-500/30 shadow-amber-950/20 bg-amber-950/20'
};

export default function App() {
  const [activeCard, setActiveCard] = useState<PlayingCardId | null>(null);
  const [hoveredCard, setHoveredCard] = useState<PlayingCardId | null>(null);
  
  // Track which card is currently active in the detail preview dashboard below
  const [selectedPreviewCard, setSelectedPreviewCard] = useState<PlayingCardId | null>(null);

  // Track which card under deck composition is hovered when the casino dashboard is shown
  const [casinoHoveredCard, setCasinoHoveredCard] = useState<PlayingCardId | null>(null);

  // Compute active preview card (hovered card takes precedence over clicked selection)
  const activePreview = hoveredCard || selectedPreviewCard;

  // Order array for cycling content with swipe gestures
  const cardOrder: PlayingCardId[] = ['joker', 'spade', 'love', 'king'];

  // Swipe gesture tracking state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Long-press gesture tracking state
  const [longPressTimeout, setLongPressTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isLongPressingActive, setIsLongPressingActive] = useState<PlayingCardId | null>(null);
  const [touchStartedX, setTouchStartedX] = useState<number | null>(null);
  const [touchStartedY, setTouchStartedY] = useState<number | null>(null);
  const [didTriggerLongPress, setDidTriggerLongPress] = useState<boolean>(false);

  // Close modal on 'Escape'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCard(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch & Gesture Interaction Event Handlers
  const startLongPress = (cardId: PlayingCardId, e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartedX(touch.clientX);
    setTouchStartedY(touch.clientY);
    setDidTriggerLongPress(false);
    
    setIsLongPressingActive(cardId);
    const timer = setTimeout(() => {
      if (navigator.vibrate) {
        try {
          navigator.vibrate(60);
        } catch (err) {
          // Ignored if blocked by client security/iframe sandbox policies
        }
      }
      setActiveCard(cardId);
      setDidTriggerLongPress(true);
      setIsLongPressingActive(null);
    }, 500); // Super responsive 500ms trigger time
    setLongPressTimeout(timer);
  };

  const cancelLongPress = () => {
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
    setIsLongPressingActive(null);
  };

  const handleCardTouchMove = (e: React.TouchEvent) => {
    if (touchStartedX !== null && touchStartedY !== null) {
      const touch = e.touches[0];
      const diffX = Math.abs(touch.clientX - touchStartedX);
      const diffY = Math.abs(touch.clientY - touchStartedY);
      // Cancel long press timer if finger moves/swipes/scrolls past a tolerance zone
      if (diffX > 10 || diffY > 10) {
        cancelLongPress();
      }
    }
  };

  const handleCardTouchEnd = () => {
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
    setIsLongPressingActive(null);
  };

  const handleCardClick = (cardId: PlayingCardId) => {
    if (didTriggerLongPress) {
      setDidTriggerLongPress(false);
      return;
    }
    // Normal Tap/Click updates the live preview selection
    setSelectedPreviewCard(cardId);
    
    // On desktops (devices with a precise mouse/pointer click), clicking immediately opens details modal as well
    if (window.matchMedia('(pointer: fine)').matches) {
      setActiveCard(cardId);
    }
  };

  // Swipe Gestures for Dynamic Category Navigation
  const handleSwipeStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
  };

  const handleSwipeEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touch = e.changedTouches[0];
    const diffX = touch.clientX - touchStartX;
    const diffY = touch.clientY - touchStartY;

    const swipeThreshold = 50; // Required displacement in horizontal pixels
    if (Math.abs(diffX) > swipeThreshold && Math.abs(diffY) < 70) {
      const currentId = selectedPreviewCard || 'king';
      const currentIndex = cardOrder.indexOf(currentId);
      if (diffX < 0) {
        // Swipe Left -> Cycles Forward
        const nextIdx = (currentIndex + 1) % cardOrder.length;
        setSelectedPreviewCard(cardOrder[nextIdx]);
      } else {
        // Swipe Right -> Cycles Backward
        const prevIdx = (currentIndex - 1 + cardOrder.length) % cardOrder.length;
        setSelectedPreviewCard(cardOrder[prevIdx]);
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  // Playing cards reactive state, initialized from standard arrangement
  const [playingCards, setPlayingCards] = useState<typeof INITIAL_PLAYING_CARDS>(INITIAL_PLAYING_CARDS);

  const shuffleCards = () => {
    setPlayingCards(prev => {
      const arr = [...prev];
      // Randomize card arrangement with Fisher-Yates protocol
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
  };

  // Renders correct tabular content for active cards or hover panels
  const renderCardDetails = (id: PlayingCardId) => {
    switch (id) {
      case 'joker':
        return <ProjectsTab projects={projectsData} />;
      case 'spade':
        return <SkillsTab categories={skillsData} />;
      case 'love':
        return <ExperienceTab experience={experienceData} />;
      case 'king':
        return <AboutTab meta={portfolioMeta} />;
      default:
        return (
          <div className="text-center py-10">
            <HelpCircle className="w-10 h-10 mx-auto text-gray-700 mb-2" />
            <p className="text-sm font-mono text-gray-500">No active system config found.</p>
          </div>
        );
    }
  };

  const renderCasinoPlaceholder = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left py-2">
        {/* Holographic Casino Visual Box - 6 Columns */}
        <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-gray-900 shadow-2xl aspect-video lg:aspect-[4/3] bg-gray-950 flex items-center justify-center group" id="casino-visual-box">
          {/* Subtle frame flare */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-20 pointer-events-none" />
          
          {/* Base Casino Image */}
          <img
            src=""
            alt="The Prestige Lounge Casino"
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover brightness-75 contrast-110 saturate-[0.85] transition-all duration-1000 ease-in-out ${
              casinoHoveredCard ? 'opacity-20 scale-105 blur-[2px]' : 'opacity-100 scale-100'
            }`}
          />

          {/* Joker Card Image */}
          <img
            src={jokerImage}
            alt="Joker Card Illustration"
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover brightness-95 saturate-100 transition-all duration-1000 ease-in-out ${
              casinoHoveredCard === 'joker' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-sm'
            }`}
          />

          {/* Spade Card Image */}
          <img
            src={gambitImage}
            alt="Gambit Ace of Spades"
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover brightness-95 saturate-100 transition-all duration-1000 ease-in-out ${
              casinoHoveredCard === 'spade' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-sm'
            }`}
          />

          {/* Heart Card Image */}
          <img
            src={darkAnimeImage }
            alt="Dark Theme Love Character"
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover brightness-95 saturate-100 transition-all duration-1000 ease-in-out ${
              casinoHoveredCard === 'love' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-sm'
            }`}
          />

          {/* King Card Image */}
          <img
            src={userImgImage}
            alt="King Chukwuebuka"
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover brightness-95 contrast-105 transition-all duration-1000 ease-in-out ${
              casinoHoveredCard === 'king' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-sm'
            }`}
          />

          {/* Scanning lines decorative effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_98%,_rgba(59,130,246,0.06)_100%)] bg-[size:100%_4px] pointer-events-none z-30 animate-[pulse_4s_infinite]" />

          {/* Transparent elegant text overlay of the representing label */}
          {casinoHoveredCard && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/35 backdrop-blur-[1px] pointer-events-none select-none">
              <div className="text-center px-6 py-4 rounded-xl border border-white/5 bg-black/60 backdrop-blur-md shadow-2xl transition-all duration-700 max-w-[85%] border-t-amber-500/20 border-b-amber-500/10 scale-100">
                <span className="text-[9px] font-mono tracking-[0.25em] text-amber-400/85 uppercase block mb-1">
                  Active Specimen
                </span>
                <h4 className="text-lg sm:text-xl font-bold tracking-widest font-display text-white uppercase">
                  {casinoHoveredCard === 'joker' && 'Joker Card'}
                  {casinoHoveredCard === 'spade' && 'Ace of Spades'}
                  {casinoHoveredCard === 'love' && 'The Heart Card'}
                  {casinoHoveredCard === 'king' && 'The King Card'}
                </h4>
                <div className="mt-2 h-[1px] w-12 bg-amber-500/40 mx-auto" />
                <span className="text-[9px] font-mono tracking-wider text-gray-400 mt-2 block uppercase">
                  {casinoHoveredCard === 'joker' && 'Project Blueprints & Blue Team'}
                  {casinoHoveredCard === 'spade' && 'Core Skills & Stack'}
                  {casinoHoveredCard === 'love' && 'Chronicles & Journey'}
                  {casinoHoveredCard === 'king' && 'Biography & Contact'}
                </span>
              </div>
            </div>
          )}

          {/* Overlay Tag over the image showing current card */}
          {casinoHoveredCard && (
            <div className="absolute bottom-4 left-4 z-30 px-3 py-1 bg-black/85 backdrop-blur-md border border-gray-800 rounded-lg text-[10px] font-mono tracking-widest text-amber-400 capitalize flex items-center gap-1.5 animate-pulse shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Viewing {casinoHoveredCard === 'love' ? 'Heart' : casinoHoveredCard === 'spade' ? 'Spade' : casinoHoveredCard} Card
            </div>
          )}
        </div>

        {/* Instructive Vibe description card - 6 Columns */}
        <div className="lg:col-span-6 space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 uppercase tracking-widest inline-block">
              Prestige Hand Activated
            </span>
            <h3 className="text-xl font-bold text-white tracking-normal font-display">
              Welcome to the Executive Lounge
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              You are viewing the professional portfolio of <strong className="text-white">Chukwuebuka Ifenna Okoye</strong>. Instead of static tabs, his expertise is dealt as an interactive custom playing card deck.
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs font-mono">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
              Deck Composition
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div 
                onMouseEnter={() => setCasinoHoveredCard('joker')}
                onMouseLeave={() => setCasinoHoveredCard(null)}
                onClick={() => setSelectedPreviewCard('joker')}
                className={`p-3 rounded-lg border flex items-start gap-2.5 transition-all duration-300 cursor-pointer ${
                  casinoHoveredCard === 'joker' 
                    ? 'bg-emerald-950/40 border-emerald-500/40 shadow-lg shadow-emerald-500/5 scale-[1.02]' 
                    : 'bg-black/20 border-gray-900/40 hover:bg-gray-900/10 hover:border-gray-800'
                }`}
              >
                <span className="text-emerald-400 font-bold">🃏</span>
                <div>
                  <span className="text-white block text-[11px] font-semibold leading-none mb-1">JOKER CARD</span>
                  <span className="text-gray-500 text-[10px]">Project blueprints and live systems.</span>
                </div>
              </div>

              <div 
                onMouseEnter={() => setCasinoHoveredCard('spade')}
                onMouseLeave={() => setCasinoHoveredCard(null)}
                onClick={() => setSelectedPreviewCard('spade')}
                className={`p-3 rounded-lg border flex items-start gap-2.5 transition-all duration-300 cursor-pointer ${
                  casinoHoveredCard === 'spade' 
                    ? 'bg-indigo-950/40 border-indigo-500/40 shadow-lg shadow-indigo-500/5 scale-[1.02]' 
                    : 'bg-black/20 border-gray-900/40 hover:bg-gray-900/10 hover:border-gray-800'
                }`}
              >
                <span className="text-indigo-400 font-bold">♠</span>
                <div>
                  <span className="text-white block text-[11px] font-semibold leading-none mb-1">ACE OF SPADES</span>
                  <span className="text-gray-500 text-[10px]">Technical expertise and modules.</span>
                </div>
              </div>

              <div 
                onMouseEnter={() => setCasinoHoveredCard('love')}
                onMouseLeave={() => setCasinoHoveredCard(null)}
                onClick={() => setSelectedPreviewCard('love')}
                className={`p-3 rounded-lg border flex items-start gap-2.5 transition-all duration-300 cursor-pointer ${
                  casinoHoveredCard === 'love' 
                    ? 'bg-rose-950/40 border-rose-500/40 shadow-lg shadow-rose-500/5 scale-[1.02]' 
                    : 'bg-black/20 border-gray-900/40 hover:bg-gray-900/10 hover:border-gray-800'
                }`}
              >
                <span className="text-rose-400 font-bold">♥</span>
                <div>
                  <span className="text-white block text-[11px] font-semibold leading-none mb-1">THE HEART CARD</span>
                  <span className="text-gray-500 text-[10px]">Professional journey and milestones.</span>
                </div>
              </div>

              <div 
                onMouseEnter={() => setCasinoHoveredCard('king')}
                onMouseLeave={() => setCasinoHoveredCard(null)}
                onClick={() => setSelectedPreviewCard('king')}
                className={`p-3 rounded-lg border flex items-start gap-2.5 transition-all duration-300 cursor-pointer ${
                  casinoHoveredCard === 'king' 
                    ? 'bg-amber-950/40 border-amber-500/40 shadow-lg shadow-amber-500/5 scale-[1.02]' 
                    : 'bg-black/20 border-gray-900/40 hover:bg-gray-900/10 hover:border-gray-800'
                }`}
              >
                <span className="text-amber-400 font-bold">👑</span>
                <div>
                  <span className="text-white block text-[11px] font-semibold leading-none mb-1">THE KING CARD</span>
                  <span className="text-gray-500 text-[10px]">Biography and secure communications.</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-gray-500 font-sans italic">
            Hover or click on any playing card above to dissolve this view and showcase detailed specifications.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent font-sans antialiased text-gray-200">
      
      {/* Dynamic ambient particles & luxury backdrops */}
      <DarkParticleEffects activeHovered={hoveredCard || casinoHoveredCard} />
      <div className="absolute top-[-15%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/10 glow-blur floating-element pointer-events-none -z-20" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-rose-500/10 glow-blur floating-element pointer-events-none -z-20" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-amber-500/5 glow-blur floating-element pointer-events-none -z-20" style={{ animationDelay: '-6s' }} />

      {/* Decorative felt grid pattern in the background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.005)_1px,_transparent_1px)] bg-[size:32px_32px] opacity-30 pointer-events-none -z-30" />

      {/* Structured Portfolio Header Area */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 flex flex-col justify-between min-h-[calc(100vh-4rem)]">
        
        {/* Subtle executive header banner */}
        <header className="mb-8 text-left border-b border-gray-900 pb-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="space-y-3.5 max-w-2xl">
            {/* Royal Dealer token & Shuffle Action Row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full py-1 pl-1.5 pr-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 flex items-center justify-center font-mono text-[9px] text-[#02050c] font-bold">
                  WI
                </div>
                <span className="text-[10px] font-mono text-amber-400 tracking-wider">
                  DECK INTERFACE ONLINE • SECTIONS MAP ACTIVE
                </span>
              </div>

              {/* Shuffle Action Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shuffleCards}
                className="inline-flex items-center gap-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 hover:border-indigo-500/45 rounded-full py-1 px-3 text-[10px] font-mono text-indigo-300 hover:text-indigo-200 transition-all cursor-pointer shadow-sm shadow-indigo-950/20"
                title="Shuffle Cards Layout"
              >
                <Shuffle className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>SHUFFLE DECK</span>
              </motion.button>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white uppercase">
                {portfolioMeta.fullName}
              </h1>
              <h2 className="text-xs sm:text-sm font-medium text-gray-400 font-mono tracking-widest uppercase">
                {portfolioMeta.title}
              </h2>
            </div>
            

          </div>

          {/* Quick numbers widget */}
          <div className="flex gap-3 shrink-0 w-full md:w-auto overflow-x-auto py-1">
            {portfolioMeta.stats.slice(0, 3).map((stat, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-gray-950/80 border border-gray-900 text-left min-w-[110px] shrink-0">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{stat.label}</span>
                <span className="text-lg font-bold font-display text-white block mt-1">
                  {stat.value}
                  {stat.suffix && <span className="text-blue-400 text-xs ml-0.5">{stat.suffix}</span>}
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* -------------------- PLAYING CARDS DECK AREA -------------------- */}
        <section className="mb-10 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              The Interactive Hand (Hover & Navigate)
            </span>
            <span className="text-[9px] font-mono text-gray-400 hidden sm:inline">
              [Click card to lock detailed Focus]
            </span>
            <span className="text-[9px] font-mono text-amber-500 inline sm:hidden animate-pulse">
              [Long-press cards for details]
            </span>
          </div>

          {/* Interactive Playing Cards Deck Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
          >
            {playingCards.map((card, idx) => {
              const isHovered = hoveredCard === card.id;
              const isSelectedPreview = activePreview === card.id;
              const isKing = card.id === 'king';

              const baseRotation = idx === 0 ? -2 : idx === 1 ? -1 : idx === 2 ? 1 : 2;

              return (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  custom={{ baseRotation }}
                  className="flex flex-col items-center gap-3.5 w-full max-w-[240px]"
                >
                  <motion.div
                    layout
                    transition={{
                      layout: {
                        type: 'spring',
                        stiffness: 140,
                        damping: 18,
                        mass: 0.95
                      }
                    }}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onTouchStart={(e) => startLongPress(card.id, e)}
                    onTouchEnd={handleCardTouchEnd}
                    onTouchCancel={cancelLongPress}
                    onTouchMove={handleCardTouchMove}
                    onClick={() => handleCardClick(card.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setActiveCard(card.id); }}
                    whileHover={{
                      y: -14,
                      scale: 1.04,
                      rotate: 0,
                      zIndex: 30,
                      transition: { type: 'spring', stiffness: 185, damping: 14 }
                    }}
                    className={`relative w-full aspect-[2/3] rounded-2xl bg-[#05060b] border-2 cursor-pointer transition-colors duration-300 select-none flex flex-col justify-between overflow-hidden p-4 ${
                      isLongPressingActive === card.id 
                        ? 'border-amber-400 scale-[0.97]' 
                        : isSelectedPreview 
                        ? 'border-amber-500/30 shadow-[0_0_15px_-3px_rgba(245,158,11,0.12)]' 
                        : isHovered 
                        ? 'border-gray-500/80 shadow-2xl' 
                        : 'border-gray-900'
                    }`}
                    style={{
                      boxShadow: isHovered ? `0 15px 35px -12px ${card.glowColor}` : 'none',
                      zIndex: isHovered || isLongPressingActive === card.id ? 20 : 10
                    }}
                  >
                    {/* Long press active charging/vibrancy glow ring */}
                    {isLongPressingActive === card.id && (
                      <motion.div
                        initial={{ opacity: 0.3, scale: 0.95 }}
                        animate={{ opacity: [0.3, 0.85, 0.3], scale: [0.97, 1.02, 0.97] }}
                        transition={{ duration: 0.35, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent border-2 border-amber-400 rounded-2xl pointer-events-none z-30"
                      />
                    )}

                    {/* Glowing center suit background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.colorTheme} transition-opacity duration-500 pointer-events-none opacity-[0.03]`} />

                    {/* Top corner suit/index label */}
                    <div className="flex justify-between items-start">
                      <div className={`flex flex-col items-center leading-none ${card.textColor}`}>
                        <span className="text-lg font-bold font-display">{card.rank}</span>
                        <span className="text-xs font-mono mt-0.5 tracking-tighter uppercase">{card.suit}</span>
                      </div>
                    </div>

                    {/* Card Centerpiece Illustration */}
                    <div className="flex flex-col items-center justify-center py-4 relative flex-1">
                      
                      {/* Unique layout for KING / Portrait image */}
                      {isKing ? (
                        <div className="relative w-20 h-28 flex items-center justify-center">
                          {/* Madara Susanoo Frame */}
                          <motion.div
                            animate={{ 
                              opacity: isHovered ? 0 : 1,
                              scale: isHovered ? 0.75 : 1,
                              rotateY: isHovered ? 90 : 0
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-xl overflow-hidden border border-amber-500/30 shadow-lg shadow-amber-500/5 bg-gray-950 flex flex-col justify-between"
                          >
                            <img
                              src={madaraImage}
                              alt="Madara Susanoo Illustration"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover brightness-95 saturate-100"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-black/60 py-0.5 text-center">
                              <span className="text-[7px] font-mono text-amber-400 tracking-wider font-semibold block leading-none">MADARA</span>
                            </div>
                          </motion.div>

                          {/* User Portrait Frame appearing on hover */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.75, rotateY: -90 }}
                            animate={{ 
                              opacity: isHovered ? 1 : 0,
                              scale: isHovered ? 1.05 : 0.75,
                              rotateY: isHovered ? 0 : -90
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-xl overflow-hidden border border-amber-500/40 shadow-xl shadow-amber-500/10 bg-gray-950 flex flex-col justify-between"
                          >
                            <img
                              src={userImgImage}
                              alt="King Chukwuebuka"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover brightness-100 contrast-105"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-black/70 py-0.5 text-center">
                              <span className="text-[7px] font-mono text-amber-400 tracking-wider font-semibold block leading-none">CHUKWUEBUKA</span>
                            </div>
                          </motion.div>
                        </div>
                      ) : (
                        <div className="text-center relative flex justify-center items-center h-full w-full">
                          {/* Suit symbol background decoration */}
                          {card.id !== 'joker' && (
                            <div className={`text-6xl select-none opacity-10 absolute inset-0 flex items-center justify-center ${card.textColor}`}>
                              {card.suit}
                            </div>
                          )}

                          {/* Distinct Icon Elements for suit styles */}
                          {card.id === 'joker' && (
                            <div className="relative w-20 h-28 flex items-center justify-center">
                              {/* Joker Image of the Card */}
                              <motion.div
                                animate={{ 
                                  opacity: isHovered ? 0 : 1,
                                  scale: isHovered ? 0.75 : 1,
                                  rotateY: isHovered ? 90 : 0
                                }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-xl overflow-hidden border border-emerald-500/30 shadow-lg shadow-emerald-500/5 bg-gray-950 flex flex-col justify-between"
                              >
                                <img
                                  src={jokerImage}
                                  alt="Joker Card Illustration"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover brightness-95 saturate-80"
                               />
                                <div className="absolute inset-x-0 bottom-0 bg-black/60 py-0.5 text-center">
                                  <span className="text-[7px] font-mono text-emerald-400 tracking-wider font-semibold">JOKER</span>
                                </div>
                              </motion.div>

                              {/* Project Icon appearing in place on hover */}
                              <motion.div
                                initial={{ opacity: 0, scale: 0.75, rotateY: -90 }}
                                animate={{ 
                                  opacity: isHovered ? 1 : 0,
                                  scale: isHovered ? 1.05 : 0.75,
                                  rotateY: isHovered ? 0 : -90
                                }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-gray-950 border-2 border-emerald-500/40 p-2 font-mono text-emerald-400 text-center gap-1.5 shadow-md shadow-emerald-500/5"
                              >
                                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                  <FolderGit2 className="w-5 h-5 animate-pulse" />
                                </div>
                                <span className="text-[8px] font-bold uppercase tracking-wider leading-none">BLUEPRINT</span>
                                <span className="text-[6px] text-gray-500 uppercase font-medium leading-none">Projects</span>
                              </motion.div>
                            </div>
                          )}
                          {card.id === 'spade' && (
                            <div className="relative w-20 h-28 flex items-center justify-center">
                              {/* Gambit Image of the Card */}
                              <motion.div
                                animate={{ 
                                  opacity: isHovered ? 0 : 1,
                                  scale: isHovered ? 0.75 : 1,
                                  rotateY: isHovered ? 90 : 0
                                }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-xl overflow-hidden border border-indigo-500/30 shadow-lg shadow-indigo-500/5 bg-gray-950 flex flex-col justify-between"
                              >
                                <img
                                  src={gambitImage}
                                  alt="Gambit Ace of Spades"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover brightness-95 saturate-100"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-black/60 py-0.5 text-center">
                                  <span className="text-[7px] font-mono text-indigo-400 tracking-wider font-semibold">GAMBIT</span>
                                </div>
                              </motion.div>

                              {/* Skills Icon appearing in place on hover */}
                              <motion.div
                                initial={{ opacity: 0, scale: 0.75, rotateY: -90 }}
                                animate={{ 
                                  opacity: isHovered ? 1 : 0,
                                  scale: isHovered ? 1.05 : 0.75,
                                  rotateY: isHovered ? 0 : -90
                                }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-gray-950 border-2 border-indigo-500/40 p-2 font-mono text-indigo-400 text-center gap-1.5 shadow-md shadow-indigo-500/5"
                              >
                                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                  <Code className="w-5 h-5 text-indigo-400" />
                                </div>
                                <span className="text-[8px] font-bold uppercase tracking-wider leading-none">SKILLS</span>
                                <span className="text-[6px] text-gray-500 uppercase font-medium leading-none">Skills</span>
                              </motion.div>
                            </div>
                          )}
                          {card.id === 'love' && (
                            <div className="relative w-20 h-28 flex items-center justify-center">
                              {/* Anime Character Image of the Card */}
                              <motion.div
                                animate={{ 
                                  opacity: isHovered ? 0 : 1,
                                  scale: isHovered ? 0.75 : 1,
                                  rotateY: isHovered ? 90 : 0
                                }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-xl overflow-hidden border border-rose-500/30 shadow-lg shadow-rose-500/5 bg-gray-950 flex flex-col justify-between"
                              >
                                <img
                                  src={darkAnimeImage}
                                  alt="Dark Theme Love Character"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover brightness-95 saturate-100"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-black/60 py-0.5 text-center">
                                  <span className="text-[7px] font-mono text-rose-400 tracking-wider font-semibold">HEART</span>
                                </div>
                              </motion.div>

                              {/* Experience/Award/Milestones Icon appearing in place on hover */}
                              <motion.div
                                initial={{ opacity: 0, scale: 0.75, rotateY: -90 }}
                                animate={{ 
                                  opacity: isHovered ? 1 : 0,
                                  scale: isHovered ? 1.05 : 0.75,
                                  rotateY: isHovered ? 0 : -90
                                }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-gray-950 border-2 border-rose-500/40 p-2 font-mono text-rose-400 text-center gap-1.5 shadow-md shadow-rose-500/5"
                              >
                                <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                                  <Award className="w-5 h-5 text-rose-400" />
                                </div>
                                <span className="text-[8px] font-bold uppercase tracking-wider leading-none">MILESTONES</span>
                                <span className="text-[6px] text-gray-500 uppercase font-medium leading-none">Experience</span>
                              </motion.div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card footer description/summary */}
                    <div className="space-y-1.5 text-left border-t border-gray-900/60 pt-2 pb-0.5">
                      <h3 className="text-xs font-bold font-display text-white tracking-widest uppercase flex items-center justify-between select-none">
                        {card.title}
                        <ArrowRight className={`w-3 h-3 text-gray-600 transition-transform ${isHovered ? 'translate-x-1 text-white' : ''}`} />
                      </h3>
                      <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed font-sans h-8 select-none">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom inverted corner suit/index label (Rotated 180deg) */}
                    <div className="flex justify-between items-end mt-2 rotate-180">
                      <div className={`flex flex-col items-center leading-none ${card.textColor}`}>
                        <span className="text-lg font-bold font-display">{card.rank}</span>
                        <span className="text-xs font-mono mt-0.5 tracking-tighter uppercase">{card.suit}</span>
                      </div>
                      <span className="text-[7px] font-mono text-gray-700 uppercase tracking-widest mb-0.5">
                        {card.id}
                      </span>
                    </div>
                  </motion.div>

                  {/* Floating text label below each card that dynamically updates when hovered */}
                  <motion.div
                    initial={{ opacity: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: isHovered ? 1.05 : 1,
                      y: isHovered ? -4 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className={`font-mono text-[9px] py-1.5 px-3.5 rounded-full border transition-all duration-300 text-center flex items-center gap-1.5 shadow-md ${
                      isHovered
                        ? `${LABEL_COLOR_CLASSES[card.id]} border-opacity-70 bg-[#060810]/95 shadow-[0_4px_12px_rgba(0,0,0,0.6)]`
                        : 'text-gray-500 border-gray-900/40 bg-[#030408]/60'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                      isHovered 
                        ? (card.id === 'king' ? 'bg-amber-400 animate-pulse' : card.id === 'joker' ? 'bg-emerald-400 animate-pulse' : card.id === 'spade' ? 'bg-indigo-400 animate-pulse' : 'bg-rose-400 animate-pulse') 
                        : 'bg-gray-700'
                    }`} />
                    <span className="tracking-widest uppercase text-[8px] font-semibold">
                      {isHovered ? CARD_STATUS_STATES[card.id].active : CARD_STATUS_STATES[card.id].idle}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* -------------------- DYNAMIC PREVIEW DASHBOARD -------------------- */}
        <section className="flex-grow mb-12">
          <div 
            onTouchStart={handleSwipeStart}
            onTouchEnd={handleSwipeEnd}
            className="relative p-6 sm:p-8 rounded-2xl bg-black/10 border border-gray-900/50 shadow-2xl overflow-hidden min-h-[400px] touch-pan-y backdrop-blur-[0.5px]"
          >
            {/* Visual aesthetic highlight header on preview panel */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 opacity-60" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 mb-6 border-b border-gray-900 text-left">
              <div className="space-y-1 w-full sm:w-auto">
                {activePreview ? (
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest flex items-center justify-between sm:justify-start gap-2">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping inline-block" />
                      Live Preview Stream
                    </span>
                    <span className="text-[10px] text-gray-500 lowercase font-light sm:hidden animate-pulse">
                      (swipe left/right to browse)
                    </span>
                  </span>
                ) : (
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center justify-between sm:justify-start gap-2">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500/60 animate-pulse inline-block" />
                      DEEP INTERFACE IDLE
                    </span>
                  </span>
                )}
                
                <h2 className="text-xl font-bold font-display text-white tracking-wide uppercase flex items-center gap-2">
                  {activePreview 
                    ? `${playingCards.find(c => c.id === activePreview)?.title} Details`
                    : "The Grand Casino Lounge"
                  }
                </h2>
              </div>

              {/* Toggle handle for full immersive view */}
              {activePreview && (
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setSelectedPreviewCard(null)}
                    className="px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-mono text-gray-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                    title="Close details and return to Grande Casino list"
                  >
                    <span>← Return to Casino</span>
                  </button>
                  <button
                    onClick={() => setActiveCard(activePreview)}
                    className="px-4 py-1.5 rounded-lg bg-[#cc9543]/20 hover:bg-[#cc9543]/30 border border-[#cc9543]/40 text-[#f59e0b] hover:text-[#fbbf24] text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                  >
                    Launch Fully Expanded Focus
                  </button>
                </div>
              )}
            </div>

            {activePreview && (
              <div className="mb-4 px-2 py-1.5 rounded bg-gray-950/20 border border-gray-900/40 text-[10px] font-mono text-gray-500 text-left flex items-center gap-2 select-none animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Tip: Click on any empty space or background of the details to instantly return to the Grand Casino Lounge.</span>
              </div>
            )}

            <div className="transition-all duration-300">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePreview || 'casino'}
                  initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.99 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                  exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.99 }}
                  transition={{ duration: 0.55, ease: 'easeInOut' }}
                >
                  {activePreview ? (
                    <div 
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], img, iframe');
                        if (!isInteractive) {
                          setSelectedPreviewCard(null);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      {renderCardDetails(activePreview)}
                    </div>
                  ) : (
                    renderCasinoPlaceholder()
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* -------------------- FULLSCREEN INTERACTIVE FOCUS MODAL -------------------- */}
        <AnimatePresence>
          {activeCard !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
              {/* Opacity black backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                onClick={() => setActiveCard(null)}
                className="absolute inset-0 bg-gray-950/85 backdrop-blur-md cursor-zoom-out"
              />

              {/* Theater Curtain Left Panel */}
              <motion.div
                variants={leftCurtainVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed top-0 left-0 bottom-0 w-1/2 bg-[#02050c] z-[60] border-r border-amber-500/20 shadow-[8px_0_30px_rgba(0,0,0,0.8)] flex items-center justify-end overflow-hidden select-none pointer-events-none"
              >
                {/* Gold glowing trimming path */}
                <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-gradient-to-b from-amber-600/10 via-amber-400/50 to-amber-600/10" />
                <div className="mr-12 opacity-[0.04] transform -translate-y-8">
                  <span className="text-[200px] font-serif text-amber-400">♠</span>
                </div>
              </motion.div>

              {/* Theater Curtain Right Panel */}
              <motion.div
                variants={rightCurtainVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed top-0 right-0 bottom-0 w-1/2 bg-[#02050c] z-[60] border-l border-amber-500/20 shadow-[-8px_0_30px_rgba(0,0,0,0.8)] flex items-center justify-start overflow-hidden select-none pointer-events-none"
              >
                {/* Gold glowing trimming path */}
                <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-amber-600/10 via-amber-400/50 to-amber-600/10" />
                <div className="ml-12 opacity-[0.04] transform -translate-y-8">
                  <span className="text-[200px] font-serif text-amber-400">♥</span>
                </div>
              </motion.div>

              {/* Main Expanded Overlay Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{
                  duration: 1.2,
                  ease: 'easeInOut'
                }}
                className="relative w-full max-w-5xl bg-[#060810] border border-gray-900 shadow-2xl rounded-2xl overflow-hidden max-h-[92vh] flex flex-col text-left z-50"
              >
                {/* Visual Header with Card Suit details */}
                <div className="p-5 sm:p-6 border-b border-gray-900/80 flex justify-between items-center bg-gray-950/40">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-gray-900 border border-gray-850 flex items-center justify-center font-mono text-lg font-bold select-none text-white">
                      {playingCards.find(c => c.id === activeCard)?.rank}
                      <span className="text-xs ml-1 font-normal opacity-70">
                        {playingCards.find(c => c.id === activeCard)?.suit}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-wide uppercase">
                        {playingCards.find(c => c.id === activeCard)?.title} Focus
                      </h2>
                      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none mt-0.5">
                        {playingCards.find(c => c.id === activeCard)?.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Close Handler */}
                  <button
                    onClick={() => setActiveCard(null)}
                    className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-850 border border-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title="Close Overlay (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Main Scrollable detail panel */}
                <div className="p-5 sm:p-8 overflow-y-auto max-h-[calc(92vh-140px)] bg-gray-950/20">
                  {renderCardDetails(activeCard)}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Footer Area */}
        <footer className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>Card Engine v1.4 • Chukwuebuka Ifenna Okoye Production</span>
          </div>

          <div className="flex gap-4">
            <span>Built 2026</span>
            <span>•</span>
            <span>All System Credentials Verified</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
