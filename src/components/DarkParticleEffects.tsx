import { useEffect, useRef } from 'react';

type PlayingCardId = 'joker' | 'spade' | 'love' | 'king';
type ParticleType = 'orb' | 'suit' | 'spark';

interface Particle {
  id: number;
  type: ParticleType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  alpha: number;
  baseAlpha: number;
  wobble: number;
  wobbleSpeed: number;
  rotation: number;
  rotationSpeed: number;
  suitChar: string; // '♠' | '♥' | '♦' | '♣'
  
  // Dynamic color interpolation
  currentR: number;
  currentG: number;
  currentB: number;
  
  // Native/original baseline colors
  orgR: number;
  orgG: number;
  orgB: number;
  
  // Adaptive glow and scale multipliers
  hoverGlowFactor: number;
  hoverScaleFactor: number;
}

interface DarkParticleEffectsProps {
  activeHovered: PlayingCardId | null;
}

// Custom theme colors matching the distinct high-contrast shadows of each card
const THEME_COLORS = {
  joker: { r: 16, g: 185, b: 129 },   // Emerald Green
  spade: { r: 99, g: 102, b: 241 },   // Indigo Blue
  love: { r: 244, g: 63, b: 94 },     // Rose Red
  king: { r: 245, g: 158, b: 11 },    // Amber Gold
};

const COLOR_KEYS: PlayingCardId[] = ['joker', 'spade', 'love', 'king'];
const CARD_SUITS = ['♠', '♥', '♦', '♣'];

export default function DarkParticleEffects({ activeHovered }: DarkParticleEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 45; // Well-balanced density for premium, crisp visual depth

    // Interactive mouse state tracking with interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const getRandomColorNode = () => {
      const key = COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)];
      return THEME_COLORS[key];
    };

    const initParticle = (width: number, height: number, disperseY = false): Particle => {
      const rand = Math.random();
      let type: ParticleType = 'orb';
      let baseSize = Math.random() * 16 + 10; // Orbs: 10px to 26px
      
      if (rand < 0.35) {
        type = 'suit';
        baseSize = Math.random() * 12 + 12; // Suits: 12px to 24px
      } else if (rand < 0.6) {
        type = 'spark';
        baseSize = Math.random() * 6 + 4; // Sparkles: 4px to 10px
      }

      const baseAlpha = type === 'spark' 
        ? Math.random() * 0.4 + 0.3  // Shimmers are bright (30% - 70%)
        : Math.random() * 0.2 + 0.15; // Orbs & Suits are elegant background highlights (15% - 35%)

      const orgColors = getRandomColorNode();
      const suitChar = CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];

      return {
        id: Math.random(),
        type,
        x: Math.random() * width,
        y: disperseY ? Math.random() * height : height + baseSize * 3,
        vx: (Math.random() - 0.5) * 0.3, // Gentle horizontal draft
        vy: type === 'spark' 
          ? -(Math.random() * 0.3 + 0.2) // Sparks hover slower and dreamier
          : -(Math.random() * 0.45 + 0.3), // Orbs & Suits drift slowly upwards
        size: baseSize,
        baseSize,
        alpha: baseAlpha,
        baseAlpha,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.008 + 0.003,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        suitChar,
        currentR: orgColors.r,
        currentG: orgColors.g,
        currentB: orgColors.b,
        orgR: orgColors.r,
        orgG: orgColors.g,
        orgB: orgColors.b,
        hoverGlowFactor: 1.0,
        hoverScaleFactor: 1.0,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const initialWidth = container.clientWidth || window.innerWidth || 1200;
    const initialHeight = container.clientHeight || window.innerHeight || 900;
    canvas.width = initialWidth;
    canvas.height = initialHeight;

    if (particles.length === 0) {
      for (let i = 0; i < maxParticles; i++) {
        particles.push(initParticle(initialWidth, initialHeight, true));
      }
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        let width = entry.contentRect.width;
        let height = entry.contentRect.height;

        if (!width) width = window.innerWidth || 1200;
        if (!height) height = window.innerHeight || 900;

        canvas.width = width;
        canvas.height = height;

        if (particles.length === 0) {
          particles = [];
          for (let i = 0; i < maxParticles; i++) {
            particles.push(initParticle(width, height, true));
          }
        }
      }
    });

    resizeObserver.observe(container);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Smooth cursor interpolation
      if (mouse.active) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.12;
          mouse.y += (mouse.targetY - mouse.y) * 0.12;
        }
      }

      const targetColors = activeHovered ? THEME_COLORS[activeHovered] : null;

      particles.forEach((p) => {
        let influence = 0;
        let pushX = 0;
        let pushY = 0;

        if (mouse.active && mouse.x !== -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influenceRadius = 240;

          if (distance < influenceRadius) {
            const norm = 1 - distance / influenceRadius;
            influence = norm * norm;

            const angle = Math.atan2(dy, dx);
            const repelStrength = p.type === 'spark' ? influence * 1.5 : influence * 1.0;
            pushX = Math.cos(angle) * repelStrength;
            pushY = Math.sin(angle) * repelStrength - influence * 0.2;
          }
        }

        // Smoothly morph colors to active selection (or revert to native elegant suits color)
        let targetR = p.orgR;
        let targetG = p.orgG;
        let targetB = p.orgB;

        if (targetColors) {
          targetR = targetColors.r;
          targetG = targetColors.g;
          targetB = targetColors.b;
        }

        p.currentR += (targetR - p.currentR) * 0.08;
        p.currentG += (targetG - p.currentG) * 0.08;
        p.currentB += (targetB - p.currentB) * 0.08;

        // Elegant sin-wave horizontal wobble
        p.wobble += p.wobbleSpeed;
        const driftX = Math.sin(p.wobble) * 0.2;

        p.x += p.vx + driftX + pushX;
        p.y += p.vy + pushY;

        // Recycle particle when it exits viewport
        if (p.y < -p.baseSize * 3) {
          const fresh = initParticle(w, h, false);
          Object.assign(p, fresh);
        }

        if (p.x < -p.size * 2) p.x = w + p.size;
        if (p.x > w + p.size * 2) p.x = -p.size;

        // Interactive expansion of size & opacity near cursor
        const targetGlow = 1.0 + (influence * 1.2);
        const targetScale = 1.0 + (influence * 0.4);

        p.hoverGlowFactor += (targetGlow - p.hoverGlowFactor) * 0.1;
        p.hoverScaleFactor += (targetScale - p.hoverScaleFactor) * 0.1;

        p.rotation += p.rotationSpeed;
        p.size = p.baseSize * p.hoverScaleFactor;

        // Micro atmospheric breathing effect
        const pulseAlpha = p.baseAlpha + Math.sin(p.wobble * 0.7) * 0.05;
        const finalAlpha = Math.max(0.08, Math.min(pulseAlpha * p.hoverGlowFactor, 0.9));

        const colorStr = `${Math.floor(p.currentR)}, ${Math.floor(p.currentG)}, ${Math.floor(p.currentB)}`;

        // RENDERING EACH SPECIFIC THEMATIC PARTICLE TYPE
        if (p.type === 'orb') {
          // --- PRESTIGE GLOWING GLASS BUBBLE ---
          ctx.save();
          ctx.globalCompositeOperation = 'screen';

          // Outer luxury radial aura
          const auraRad = p.size * 2.5;
          const auraGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, auraRad);
          auraGlow.addColorStop(0, `rgba(${colorStr}, ${finalAlpha * 0.45})`);
          auraGlow.addColorStop(0.4, `rgba(${colorStr}, ${finalAlpha * 0.15})`);
          auraGlow.addColorStop(1, 'rgba(0,0,0,0)');
          
          ctx.beginPath();
          ctx.fillStyle = auraGlow;
          ctx.arc(p.x, p.y, auraRad, 0, Math.PI * 2);
          ctx.fill();

          // Bubble Glass Body
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          const bodyGrad = ctx.createRadialGradient(
            p.x - p.size * 0.3,
            p.y - p.size * 0.3,
            p.size * 0.1,
            p.x,
            p.y,
            p.size
          );
          bodyGrad.addColorStop(0, `rgba(${colorStr}, ${finalAlpha * 0.08})`);
          bodyGrad.addColorStop(0.85, `rgba(${colorStr}, ${finalAlpha * 0.22})`);
          bodyGrad.addColorStop(1, `rgba(${colorStr}, ${finalAlpha * 0.72})`);
          ctx.fillStyle = bodyGrad;
          ctx.fill();

          // Golden/Colored thin outer crisp rim ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colorStr}, ${finalAlpha * 0.85})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();

          // Glass Specular Crescent highlight (top-left)
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.32, p.y - p.size * 0.32, p.size * 0.16, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha * 0.65})`;
          ctx.fill();

          ctx.restore();

        } else if (p.type === 'suit') {
          // --- FLOATING SUITS (♠, ♥, ♦, ♣) ---
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);

          // Render subtle back shadow for suits to pop gracefully listlessly
          ctx.font = `${Math.floor(p.size * 1.05)}px "Inter", ui-sans-serif, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Render glowing backdrop under high-end suits
          ctx.fillStyle = `rgba(${colorStr}, ${finalAlpha * 0.4})`;
          ctx.fillText(p.suitChar, 2, 2);

          // Rich vector suit fill using gradient (Gold and suit theme blend)
          const suitGrad = ctx.createRadialGradient(0, -p.size * 0.25, 0, 0, 0, p.size * 0.7);
          suitGrad.addColorStop(0, '#ffffff'); // bright shiny heart/core
          suitGrad.addColorStop(0.35, `rgba(${Math.min(255, Math.floor(p.currentR + 40))}, ${Math.min(255, Math.floor(p.currentG + 40))}, ${Math.min(255, Math.floor(p.currentB + 40))}, ${finalAlpha})`);
          suitGrad.addColorStop(1, `rgba(${colorStr}, ${finalAlpha * 0.85})`);
          
          ctx.font = `bold ${Math.floor(p.size)}px "Inter", ui-sans-serif, sans-serif`;
          ctx.fillStyle = suitGrad;
          ctx.fillText(p.suitChar, 0, 0);

          ctx.restore();

        } else if (p.type === 'spark') {
          // --- LUXURY CHROME STARDUST SPARKLES ---
          ctx.save();
          ctx.globalCompositeOperation = 'screen';

          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);

          // Draw custom 4-pointed shimmering star
          ctx.beginPath();
          const innerRad = p.size * 0.22;
          const outerRad = p.size;
          
          for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const r = i % 2 === 0 ? outerRad : innerRad;
            const sx = Math.cos(angle) * r;
            const sy = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.closePath();

          // Dual gradient core
          const sparkRadGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          sparkRadGlow.addColorStop(0, '#ffffff'); // blindingly shiny starlight center
          sparkRadGlow.addColorStop(0.3, `rgba(255, 230, 160, ${finalAlpha * 1.0})`); // high-end golden tint
          sparkRadGlow.addColorStop(0.7, `rgba(${colorStr}, ${finalAlpha * 0.6})`);
          sparkRadGlow.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.fillStyle = sparkRadGlow;
          ctx.fill();

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeHovered]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden -z-10 bg-transparent"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-100"
      />
    </div>
  );
}
