import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';

export const InteractiveHeartTreeCard = ({ onExplore, recipient }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const W = 600;
    const H = 700;
    canvas.width = W * 2;
    canvas.height = H * 2;

    // Tree geometry
    const trunkBaseX = W * 0.50;
    const trunkBaseY = H * 0.82;   // bottom of trunk
    const trunkTopY = H * 0.48;    // where trunk meets canopy
    const canopyCX = W * 0.50;     // canopy center X
    const canopyCY = H * 0.32;     // canopy center Y

    // ───── Color palette (pure pinks/reds/magentas – NO green, NO gold) ─────
    const pinks = [
      '#FFB6C1', '#FFC0CB', '#FFD1DC', '#F8BBD0', '#FFCDD2',  // Light / Pastel pink
      '#FF69B4', '#FF85A1', '#FF6B9D', '#F06292', '#EC407A',  // Hot pink / Medium
      '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#FF4081',  // Deep magenta-pink
      '#DC143C', '#E53935', '#C62828', '#FF1744', '#D50000',  // Crimson red
      '#9C27B0', '#AB47BC', '#8E24AA', '#BA68C8',             // Purple-magenta
    ];

    // ───── BRANCH DATA (visible dark branches radiating from trunk) ─────
    const branches = [
      // Main left branches
      { x1: 0, y1: 0, cx: -60, cy: -80, x2: -130, y2: -160, w: 5 },
      { x1: -5, y1: -20, cx: -90, cy: -60, x2: -170, y2: -100, w: 4 },
      { x1: -10, y1: -40, cx: -40, cy: -100, x2: -100, y2: -200, w: 3.5 },
      { x1: 5, y1: -10, cx: -30, cy: -120, x2: -60, y2: -230, w: 3 },
      // Main right branches
      { x1: 0, y1: 0, cx: 60, cy: -80, x2: 130, y2: -160, w: 5 },
      { x1: 5, y1: -20, cx: 90, cy: -60, x2: 170, y2: -100, w: 4 },
      { x1: 10, y1: -40, cx: 40, cy: -100, x2: 100, y2: -200, w: 3.5 },
      { x1: -5, y1: -10, cx: 30, cy: -120, x2: 60, y2: -230, w: 3 },
      // Upward central
      { x1: 0, y1: -10, cx: -10, cy: -130, x2: -20, y2: -250, w: 3 },
      { x1: 0, y1: -10, cx: 10, cy: -130, x2: 20, y2: -250, w: 3 },
      // Extra twigs
      { x1: -130, y1: -160, cx: -150, cy: -200, x2: -160, y2: -220, w: 2 },
      { x1: -170, y1: -100, cx: -190, cy: -130, x2: -180, y2: -160, w: 2 },
      { x1: 130, y1: -160, cx: 150, cy: -200, x2: 160, y2: -220, w: 2 },
      { x1: 170, y1: -100, cx: 190, cy: -130, x2: 180, y2: -160, w: 2 },
      { x1: -100, y1: -200, cx: -120, cy: -240, x2: -90, y2: -260, w: 2 },
      { x1: 100, y1: -200, cx: 120, cy: -240, x2: 90, y2: -260, w: 2 },
    ];

    // ───── HEART CANOPY: 1500+ hearts placed in a HEART-SHAPE outline ─────
    // Parametric heart: x = 16sin³(t), y = -(13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t))
    const canopyHearts = [];

    for (let i = 0; i < 1500; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.55); // fills interior uniformly

      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      const scale = 12.5; // overall canopy size
      const jitter = 18;  // fuzzy edge
      const jAngle = Math.random() * Math.PI * 2;

      const x = canopyCX + hx * scale * r + Math.cos(jAngle) * jitter * Math.random();
      const y = canopyCY + hy * scale * r + Math.sin(jAngle) * jitter * Math.random();

      // Depth-dependent size: bigger near center, smaller at edges
      const heartSize = r < 0.3
        ? Math.random() * 18 + 18  // core: 18-36px (BIG)
        : r < 0.7
          ? Math.random() * 14 + 10 // mid: 10-24px
          : Math.random() * 10 + 6; // edge: 6-16px (small)

      // Color: deeper reds/magentas near core, lighter pinks at edge
      let colorIdx;
      if (r < 0.35) {
        colorIdx = Math.floor(Math.random() * 9) + 10; // deep reds & magentas
      } else if (r < 0.65) {
        colorIdx = Math.floor(Math.random() * 10) + 5; // hot pinks
      } else {
        colorIdx = Math.floor(Math.random() * 10);      // light pinks
      }

      canopyHearts.push({
        x, y,
        size: heartSize,
        color: pinks[Math.min(colorIdx, pinks.length - 1)],
        rotation: (Math.random() - 0.5) * 1.2,
        swaySpeed: Math.random() * 0.012 + 0.004,
        swayAmp: Math.random() * 2 + 0.5,
        opacity: 0.7 + Math.random() * 0.3,
        growDelay: 0.3 + r * 1.6 + Math.random() * 0.3,
      });
    }

    // Outlier floating hearts (drifting away from canopy)
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 200 + Math.random() * 80;
      canopyHearts.push({
        x: canopyCX + Math.cos(angle) * dist,
        y: canopyCY + Math.sin(angle) * dist * 0.75,
        size: Math.random() * 8 + 5,
        color: pinks[Math.floor(Math.random() * pinks.length)],
        rotation: Math.random() * Math.PI,
        swaySpeed: Math.random() * 0.02 + 0.008,
        swayAmp: Math.random() * 3 + 2,
        opacity: 0.4 + Math.random() * 0.4,
        growDelay: 1.8 + Math.random() * 0.8,
      });
    }

    const fallingHearts = [];

    // ───── DRAW HELPERS ─────

    // Draw a single heart shape
    const drawHeart = (x, y, size, color, rot, alpha, sc) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(sc, sc);
      ctx.globalAlpha = alpha;

      const s = size;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.35);
      ctx.bezierCurveTo(-s * 0.5, -s * 0.4, -s, s * 0.25, 0, s);
      ctx.bezierCurveTo(s, s * 0.25, s * 0.5, -s * 0.4, 0, s * 0.35);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();

      ctx.restore();
    };

    // Draw the trunk
    const drawTrunk = (progress) => {
      ctx.save();
      const p = Math.min(1, progress);

      // ── Ground: simple beige/olive arc ──
      ctx.fillStyle = '#D4CDAE';
      ctx.beginPath();
      ctx.ellipse(W * 0.5, H - 15, W * 0.55, 55, 0, Math.PI, 0);
      ctx.fill();

      // Grassy tint
      ctx.fillStyle = '#B8C4A0';
      ctx.beginPath();
      ctx.ellipse(W * 0.5, H - 20, W * 0.48, 35, 0, Math.PI, 0);
      ctx.fill();

      // ── Trunk body (slim, tapered) ──
      const topY = trunkBaseY - (trunkBaseY - trunkTopY) * p;

      ctx.fillStyle = '#8B6F47';
      ctx.beginPath();
      // Left side
      ctx.moveTo(trunkBaseX - 40, trunkBaseY);
      ctx.quadraticCurveTo(trunkBaseX - 18, trunkBaseY - 60, trunkBaseX - 12, topY);
      // Right side
      ctx.lineTo(trunkBaseX + 12, topY);
      ctx.quadraticCurveTo(trunkBaseX + 18, trunkBaseY - 60, trunkBaseX + 40, trunkBaseY);
      ctx.closePath();
      ctx.fill();

      // Bark highlight
      ctx.fillStyle = '#A68B5B';
      ctx.beginPath();
      ctx.moveTo(trunkBaseX - 8, trunkBaseY - 20);
      ctx.quadraticCurveTo(trunkBaseX - 4, trunkBaseY - 80, trunkBaseX - 5, topY + 10);
      ctx.lineTo(trunkBaseX + 5, topY + 10);
      ctx.quadraticCurveTo(trunkBaseX + 4, trunkBaseY - 80, trunkBaseX + 8, trunkBaseY - 20);
      ctx.closePath();
      ctx.fill();

      // Small rocks at base
      ctx.fillStyle = '#9E9E9E';
      ctx.beginPath(); ctx.ellipse(trunkBaseX - 55, trunkBaseY + 2, 8, 5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(trunkBaseX + 50, trunkBaseY + 5, 6, 3, 0, 0, Math.PI * 2); ctx.fill();

      // ── Branches (dark, visible through canopy) ──
      if (p > 0.3) {
        const bP = Math.min(1, (p - 0.3) / 0.7);
        ctx.strokeStyle = '#4A3228';
        ctx.lineCap = 'round';

        branches.forEach((b) => {
          ctx.lineWidth = b.w * bP;
          ctx.beginPath();
          const ox = trunkBaseX;
          const oy = trunkTopY;
          ctx.moveTo(ox + b.x1, oy + b.y1);
          ctx.quadraticCurveTo(
            ox + b.x1 + (b.cx - b.x1) * bP,
            oy + b.y1 + (b.cy - b.y1) * bP,
            ox + b.x1 + (b.x2 - b.x1) * bP,
            oy + b.y1 + (b.y2 - b.y1) * bP,
          );
          ctx.stroke();
        });
      }

      // Heart on a stick (right side)
      if (p > 0.8) {
        const hP = Math.min(1, (p - 0.8) / 0.2);
        ctx.globalAlpha = hP;
        ctx.strokeStyle = '#4A3228';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(trunkBaseX + 120, trunkBaseY - 5);
        ctx.lineTo(trunkBaseX + 120, trunkBaseY - 55);
        ctx.stroke();
        drawHeart(trunkBaseX + 120, trunkBaseY - 68, 14, '#DC143C', 0, 1, 1);
      }

      // Small fallen hearts on ground
      if (p > 0.9) {
        ctx.globalAlpha = Math.min(1, (p - 0.9) / 0.1);
        drawHeart(trunkBaseX - 75, trunkBaseY + 5, 6, '#FF69B4', 0.3, 0.9, 1);
        drawHeart(trunkBaseX + 85, trunkBaseY + 10, 5, '#E91E63', -0.2, 0.8, 1);
        drawHeart(trunkBaseX + 140, trunkBaseY, 7, '#FF85A1', 0.5, 0.7, 1);
      }

      ctx.restore();
    };

    // ───── ANIMATION LOOP ─────
    const t0 = performance.now();
    let tick = 0;

    const render = (now) => {
      const elapsed = (now - t0) / 1000;
      tick += 0.016;

      ctx.clearRect(0, 0, W * 2, H * 2);
      ctx.save();
      ctx.scale(2, 2);

      // 1. Trunk + branches + ground
      const trunkP = Math.min(1, elapsed / 1.2);
      drawTrunk(trunkP);

      // 2. Canopy hearts
      canopyHearts.forEach((h) => {
        if (elapsed < h.growDelay) return;
        const gp = Math.min(1, (elapsed - h.growDelay) * 2.2);
        const ease = 1 - Math.pow(1 - gp, 3);
        const sway = Math.sin(tick * h.swaySpeed * 60 + h.x * 0.03) * h.swayAmp;

        drawHeart(
          h.x + sway,
          h.y,
          h.size,
          h.color,
          h.rotation + Math.sin(tick * 0.8 + h.y * 0.02) * 0.08,
          h.opacity,
          ease,
        );

        // Spawn falling hearts
        if (elapsed > 2.5 && Math.random() < 0.001 && fallingHearts.length < 25) {
          fallingHearts.push({
            x: h.x, y: h.y,
            vx: (Math.random() - 0.5) * 1.2,
            vy: Math.random() * 0.8 + 0.4,
            size: h.size * 0.65,
            color: h.color,
            rot: h.rotation,
            rotV: (Math.random() - 0.5) * 0.04,
            alpha: 1,
          });
        }
      });

      // 3. Falling hearts
      for (let i = fallingHearts.length - 1; i >= 0; i--) {
        const f = fallingHearts[i];
        f.x += f.vx + Math.sin(tick * 1.5 + f.x) * 0.5;
        f.y += f.vy;
        f.rot += f.rotV;
        f.alpha -= 0.002;
        drawHeart(f.x, f.y, f.size, f.color, f.rot, Math.max(0, f.alpha), 1);
        if (f.y > trunkBaseY + 10 || f.alpha <= 0) fallingHearts.splice(i, 1);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Tap interaction
    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const cy = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      if (!cx && !cy) return;
      const mx = ((cx - rect.left) / rect.width) * W;
      const my = ((cy - rect.top) / rect.height) * H;

      for (let k = 0; k < 18; k++) {
        fallingHearts.push({
          x: mx + (Math.random() - 0.5) * 50,
          y: my + (Math.random() - 0.5) * 50,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * -2.5 - 0.5,
          size: Math.random() * 14 + 8,
          color: pinks[Math.floor(Math.random() * pinks.length)],
          rot: Math.random() * Math.PI * 2,
          rotV: (Math.random() - 0.5) * 0.12,
          alpha: 1,
        });
      }
    };

    canvas.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div className="min-h-[88vh] flex flex-col items-center justify-center p-3 sm:p-6 z-10 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative w-full max-w-4xl bg-[#FFFDF9] rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl border-[6px] sm:border-[10px] border-white ring-4 ring-[#FAD4D4]/50 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[380px]">
          {/* Left Side: Calligraphic Birthday Wish with Butterfly */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center pl-1 sm:pl-3 z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative select-none py-2"
            >
              {/* Line 1: Happy + Swash + Butterfly */}
              <div className="flex items-center gap-1">
                <span className="font-calligraphy text-6xl xs:text-7xl sm:text-8xl md:text-[5.2rem] text-[#2B1A1D] tracking-normal leading-none font-medium">
                  Happy
                </span>
                {/* Swash line leading to butterfly matching reference */}
                <div className="flex-1 flex items-center -ml-2 sm:-ml-3 overflow-visible">
                  <svg className="w-16 h-10 sm:w-24 sm:h-14 text-[#2B1A1D] overflow-visible" viewBox="0 0 100 40" fill="none">
                    {/* Calligraphy tail swash line */}
                    <path d="M 0 28 Q 35 34, 70 16" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    {/* Butterfly Silhouette */}
                    <g transform="translate(66, 0) scale(0.72)" fill="currentColor">
                      {/* Upper Wing */}
                      <path d="M 12 18 C 18 6, 30 2, 32 14 C 34 24, 20 28, 12 20 Z" />
                      {/* Lower Wing */}
                      <path d="M 12 20 C 20 25, 26 34, 21 39 C 16 43, 9 34, 12 20 Z" />
                      {/* Wing pattern dots */}
                      <circle cx="24" cy="12" r="1.5" fill="#FFFDF9" />
                      <circle cx="28" cy="17" r="1.2" fill="#FFFDF9" />
                      {/* Body & Antennae */}
                      <ellipse cx="11" cy="20" rx="1.8" ry="9" transform="rotate(-15 11 20)" />
                      <path d="M 12 12 Q 17 5, 22 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                      <path d="M 11 12 Q 13 4, 16 3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Line 2: Birthday (Offset to the right with calligraphic loop) */}
              <div className="pl-6 sm:pl-10 -mt-2 sm:-mt-4">
                <span className="font-calligraphy text-6xl xs:text-7xl sm:text-8xl md:text-[5.2rem] text-[#2B1A1D] tracking-normal leading-none font-medium">
                  Birthday
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Heart Tree Canvas */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-center cursor-pointer" style={{ aspectRatio: '6/7' }}>
            <canvas
              ref={canvasRef}
              className="w-full h-full touch-none"
            />
          </div>
        </div>

        {/* Small Cute Next Sign Button in Bottom Right Corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 15 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="absolute bottom-4 right-4 sm:bottom-5 sm:right-6 z-30"
        >
          <motion.button
            onClick={onExplore}
            whileHover={{ scale: 1.15, rotate: 6 }}
            whileTap={{ scale: 0.88 }}
            title="Next"
            className="group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-[#FF4D79] hover:bg-[#E63963] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 sm:border-3 border-white cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};
