import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export const InteractiveHeartTree = () => {
  const canvasRef = useRef(null);
  const [bloomCount, setBloomCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set high-DPI resolution
    const width = 600;
    const height = 480;
    canvas.width = width * 2;
    canvas.height = height * 2;

    const colors = ['#FF4D79', '#FF85A1', '#FFB3C1', '#FFC72C', '#E63963', '#FF758F', '#C9184A'];

    // Generate heart shape math points for tree canopy
    const heartLeaves = [];
    const fallingLeaves = [];

    // Create canopy heart leaves using heart parametric curve
    for (let i = 0; i < 450; i++) {
      const t = Math.random() * Math.PI * 2;
      // Heart parametric equation
      const scale = 9.5;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      // Add random scatter inside heart bounds
      const r = Math.random();
      const px = width / 2 + hx * scale * r;
      const py = height / 2.3 + hy * scale * r;

      heartLeaves.push({
        x: px,
        y: py,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.03 + 0.01,
        scale: Math.random() * 0.4 + 0.8,
        opacity: Math.random() * 0.4 + 0.6,
      });
    }

    // Helper: draw single heart on canvas
    const drawHeart = (ctx, x, y, size, color, angle, opacity = 1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;

      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // Top left curve
      ctx.bezierCurveTo(
        -size / 2, -topCurveHeight,
        -size, size / 3,
        0, size
      );
      // Top right curve
      ctx.bezierCurveTo(
        size, size / 3,
        size / 2, -topCurveHeight,
        0, topCurveHeight
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Draw tree trunk and branches
    const drawTrunk = (ctx) => {
      ctx.save();
      ctx.strokeStyle = '#6B4226';
      ctx.fillStyle = '#6B4226';
      ctx.lineCap = 'round';

      // Main trunk
      ctx.beginPath();
      ctx.moveTo(width / 2 - 12, height);
      ctx.quadraticCurveTo(width / 2 - 4, height - 100, width / 2 - 8, height - 160);
      ctx.lineTo(width / 2 + 8, height - 160);
      ctx.quadraticCurveTo(width / 2 + 4, height - 100, width / 2 + 12, height);
      ctx.closePath();
      ctx.fill();

      // Main Left Branch
      ctx.beginPath();
      ctx.lineWidth = 10;
      ctx.moveTo(width / 2 - 6, height - 150);
      ctx.quadraticCurveTo(width / 2 - 60, height - 200, width / 2 - 110, height - 240);
      ctx.stroke();

      // Main Right Branch
      ctx.beginPath();
      ctx.lineWidth = 10;
      ctx.moveTo(width / 2 + 6, height - 150);
      ctx.quadraticCurveTo(width / 2 + 60, height - 200, width / 2 + 110, height - 240);
      ctx.stroke();

      // Sub branches
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 50, height - 195);
      ctx.quadraticCurveTo(width / 2 - 80, height - 260, width / 2 - 70, height - 290);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width / 2 + 50, height - 195);
      ctx.quadraticCurveTo(width / 2 + 80, height - 260, width / 2 + 70, height - 290);
      ctx.stroke();

      ctx.restore();
    };

    let tick = 0;

    // Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width * 2, height * 2);
      ctx.save();
      ctx.scale(2, 2);

      // Draw Tree Structure
      drawTrunk(ctx);

      // Render Heart Leaves Canopy
      tick += 0.02;
      heartLeaves.forEach((leaf) => {
        const offset = Math.sin(tick * leaf.swaySpeed * 2) * 2;
        const currentAngle = leaf.angle + Math.sin(tick + leaf.x) * 0.1;
        drawHeart(ctx, leaf.x + offset, leaf.y, leaf.size * leaf.scale, leaf.color, currentAngle, leaf.opacity);

        // Randomly detach falling leaves
        if (Math.random() < 0.0015 && fallingLeaves.length < 40) {
          fallingLeaves.push({
            x: leaf.x,
            y: leaf.y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * 1.2 + 0.8,
            size: leaf.size,
            color: leaf.color,
            angle: leaf.angle,
            rotationSpeed: (Math.random() - 0.5) * 0.05,
            opacity: 1,
          });
        }
      });

      // Update & Draw Falling Heart Leaves
      for (let i = fallingLeaves.length - 1; i >= 0; i--) {
        const f = fallingLeaves[i];
        f.x += f.vx + Math.sin(tick * 2) * 0.8;
        f.y += f.vy;
        f.angle += f.rotationSpeed;
        f.opacity -= 0.003;

        drawHeart(ctx, f.x, f.y, f.size, f.color, f.angle, Math.max(0, f.opacity));

        if (f.y > height || f.opacity <= 0) {
          fallingLeaves.splice(i, 1);
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Canvas Click Interaction: Burst extra blooming leaves!
    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * width;
      const clickY = ((e.clientY - rect.top) / rect.height) * height;

      setBloomCount((prev) => prev + 1);

      // Spawn 15 fresh falling leaves from click position
      for (let k = 0; k < 15; k++) {
        fallingLeaves.push({
          x: clickX + (Math.random() * 40 - 20),
          y: clickY + (Math.random() * 40 - 20),
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * -2 - 1, // upward initial pop
          size: Math.random() * 10 + 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1,
          opacity: 1,
        });
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-14 px-3 sm:px-6 text-center select-none">
      
      {/* Container Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-[#FFFDF9] rounded-3xl p-4 sm:p-8 border-4 border-white shadow-2xl overflow-hidden ring-4 ring-[#FFD1DC]/50"
      >
        {/* Header Title */}
        <div className="mb-4">
          <p className="font-marker text-base sm:text-lg text-[#8C7A6B] mt-1">
            Tap or click on the tree canopy to bloom falling heart petals! ✦
          </p>
        </div>

        {/* Canvas Render Area */}
        <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border-2 border-[#FFE5EC] shadow-inner bg-gradient-to-b from-[#FFF5F7] via-[#FFFDF9] to-[#F7ECE1]">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-pointer touch-none"
          />

        </div>

      </motion.div>

    </div>
  );
};
