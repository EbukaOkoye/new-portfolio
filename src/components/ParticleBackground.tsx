import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseDirection: number;
    }[] = [];

    // Particle Configuration
    const PARTICLE_COUNT = 32;
    const colors = [
      'rgba(59, 130, 246, 0.12)',   // Blue glow
      'rgba(16, 185, 129, 0.12)',   // Emerald glow
      'rgba(99, 102, 241, 0.12)',   // Indigo glow
      'rgba(244, 63, 94, 0.12)',    // Rose/Pink glow
      'rgba(245, 158, 11, 0.10)'     // Amber glow
    ];

    const initParticles = (width: number, height: number) => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.5 + 1.2,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.5 + 0.2,
          pulseDirection: Math.random() > 0.5 ? 1 : -1
        });
      }
    };

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        initParticles(width, height);
      }
    };

    // Use ResizeObserver for responsive and performant canvas sizing
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Initial setup with bounds
    const initialRect = container.getBoundingClientRect();
    canvas.width = initialRect.width || window.innerWidth;
    canvas.height = initialRect.height || window.innerHeight;
    initParticles(canvas.width, canvas.height);

    // Paint loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        // Move particle
        p.x += p.x < 0 ? canvas.width : p.x > canvas.width ? -canvas.width : p.speedX;
        p.y += p.y < 0 ? canvas.height : p.y > canvas.height ? -canvas.height : p.speedY;

        // Subtle opacity pulsing effect
        p.opacity += p.pulseDirection * 0.003;
        if (p.opacity > 0.8) {
          p.pulseDirection = -1;
        } else if (p.opacity < 0.2) {
          p.pulseDirection = 1;
        }

        // Select color dynamically based on index to distribute evenly
        const baseColor = colors[idx % colors.length];

        // Draw particle gradient glow
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6);
        grad.addColorStop(0, baseColor.replace('0.12', (p.opacity * 0.45).toString()));
        grad.addColorStop(0.2, baseColor.replace('0.12', (p.opacity * 0.15).toString()));
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.radius * 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw solid center core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.25})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-15"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-80"
      />
    </div>
  );
}
