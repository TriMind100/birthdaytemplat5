import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export const HeartFormationAnimation = ({ onComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const centerX = width / 2;
    const centerY = height / 2 - 20;

    // Number of particles for parametric heart formation
    const totalParticles = 140;
    const particles = [];

    // Scale heart size responsively
    const heartScale = Math.min(width, height) / 42;

    // Parametric Heart Formula:
    // x = 16 * sin^3(t)
    // y = -(13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t))
    for (let i = 0; i < totalParticles; i++) {
      const t = (i / totalParticles) * Math.PI * 2;

      // Base target point on parametric heart outline
      const rawX = 16 * Math.pow(Math.sin(t), 3);
      const rawY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      // 30% of particles fill the heart interior
      const isInner = i % 3 === 0;
      const innerFactor = isInner ? Math.sqrt(Math.random()) * 0.85 : 1;

      const targetX = centerX + rawX * heartScale * innerFactor;
      const targetY = centerY + rawY * heartScale * innerFactor;

      // Start position (bursting out from envelope area at bottom center)
      const startX = centerX + (Math.random() - 0.5) * 120;
      const startY = centerY + 180 + (Math.random() - 0.5) * 60;

      // Vibrant, soft pastel romantic color palette
      const colors = ['#FF4D79', '#FF758F', '#FFB3C1', '#FFF0F3', '#FFD700', '#FF85A1', '#E63963', '#F3C5C5'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const types = ['heart', 'sparkle', 'orb', 'petal'];
      const type = types[Math.floor(Math.random() * types.length)];

      particles.push({
        x: startX,
        y: startY,
        startX,
        startY,
        targetX,
        targetY,
        size: Math.random() * 9 + 6,
        color,
        type,
        delay: Math.random() * 0.25, // staggered launch
        speed: Math.random() * 0.045 + 0.035, // interpolation speed
        progress: 0,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        alpha: 1,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const startTime = performance.now();

    const drawParticle = (ctx, p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));

      if (p.type === 'heart') {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s / 2, -s / 2, -s, s * 0.3, 0, s);
        ctx.bezierCurveTo(s, s * 0.3, s / 2, -s / 2, 0, s * 0.3);
        ctx.fill();
      } else if (p.type === 'sparkle') {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        const s = p.size;
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(Math.cos((i * Math.PI) / 2) * s, Math.sin((i * Math.PI) / 2) * s);
          ctx.lineTo(Math.cos(((i + 0.5) * Math.PI) / 2) * (s / 3.5), Math.sin(((i + 0.5) * Math.PI) / 2) * (s / 3.5));
        }
        ctx.closePath();
        ctx.fill();
      } else if (p.type === 'petal') {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size / 2, p.size, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Glowing Orb
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = (now) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Radial ambient heart bloom backdrop glow
      const pulse = Math.sin(elapsed * 5) * 0.12 + 1;
      const glowRadius = heartScale * 20 * pulse;
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, glowRadius);
      glowGrad.addColorStop(0, 'rgba(255, 77, 121, 0.38)');
      glowGrad.addColorStop(0.5, 'rgba(255, 179, 193, 0.18)');
      glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Particle lifecycle simulation
      particles.forEach((p) => {
        if (elapsed < p.delay) return;

        p.angle += p.rotationSpeed;

        if (elapsed < 1.2) {
          // Phase 1: Flying & Converging into Heart Shape
          p.progress = Math.min(1, p.progress + p.speed);
          const ease = 1 - Math.pow(1 - p.progress, 3);
          p.x = p.startX + (p.targetX - p.startX) * ease;
          p.y = p.startY + (p.targetY - p.startY) * ease;
        } else if (elapsed < 2.2) {
          // Phase 2: Formed Heart Beating & Pulsing
          const beat = Math.sin((elapsed - 1.2) * 7 + p.pulseOffset) * 0.07;
          p.x = centerX + (p.targetX - centerX) * (1 + beat);
          p.y = centerY + (p.targetY - centerY) * (1 + beat);
        } else {
          // Phase 3: Grand Explosion Burst Outward
          const explodeTime = elapsed - 2.2;
          const dirX = p.targetX - centerX;
          const dirY = p.targetY - centerY;
          const len = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
          p.x += (dirX / len) * (explodeTime * 450);
          p.y += (dirY / len) * (explodeTime * 450);
          p.alpha = Math.max(0, 1 - explodeTime / 0.65);
        }

        drawParticle(ctx, p);
      });

      if (elapsed < 2.85) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        if (onComplete) onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-black/20 backdrop-blur-[3px]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Floating Center Heart Icon with Glow Pulse */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1.25, 1.05, 1.15, 1.4], 
          opacity: [0, 1, 0.95, 1, 0] 
        }}
        transition={{ duration: 2.7, times: [0, 0.4, 0.6, 0.8, 1], ease: "easeInOut" }}
        className="relative z-10 flex flex-col items-center justify-center text-center select-none"
      >
        <div className="relative">
          <Heart className="w-24 h-24 sm:w-32 sm:h-32 text-[#FF4D79] fill-current filter drop-shadow-[0_0_25px_rgba(255,77,121,0.8)]" />
          <Sparkles className="w-8 h-8 text-[#FFD700] absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '4s' }} />
          <Sparkles className="w-6 h-6 text-[#FFF0F3] absolute -bottom-1 -left-1 animate-pulse" />
        </div>
      </motion.div>
    </motion.div>
  );
};
