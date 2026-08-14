import React, { useEffect, useRef } from 'react';

export const BloomingHeartGarden = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = 300);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = 300;
    };
    window.addEventListener('resize', handleResize);

    // Heart flower colors matching reference image (Crimson Red, Burgundy Velvet, Rose Pink, Deep Wine)
    const flowerColors = [
      { fill: '#D90429', vein: 'rgba(50, 5, 10, 0.45)' },
      { fill: '#E63946', vein: 'rgba(60, 10, 15, 0.45)' },
      { fill: '#5E0B20', vein: 'rgba(255, 200, 210, 0.35)' },
      { fill: '#FF758F', vein: 'rgba(80, 15, 30, 0.4)' },
      { fill: '#FF85A1', vein: 'rgba(80, 15, 30, 0.4)' },
      { fill: '#4A0515', vein: 'rgba(255, 180, 195, 0.35)' },
      { fill: '#FFB3C1', vein: 'rgba(90, 20, 35, 0.4)' },
    ];

    // Generate 36 tall slender stems across full screen width
    const stemsCount = Math.max(28, Math.floor(width / 38));
    const stems = [];

    for (let i = 0; i < stemsCount; i++) {
      const baseX = (i / stemsCount) * width + (Math.random() * 24 - 12);
      const stemHeight = Math.random() * 140 + 110; // 110px to 250px tall
      const flowerSize = Math.random() * 14 + 18; // 18px to 32px heart blooms
      const colorObj = flowerColors[Math.floor(Math.random() * flowerColors.length)];

      stems.push({
        x: baseX,
        targetHeight: stemHeight,
        flowerSize,
        color: colorObj.fill,
        veinColor: colorObj.vein,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAmount: Math.random() * 8 + 4,
        growthDuration: Math.random() * 0.8 + 0.6, // Staggered stem growth
        delay: Math.random() * 0.8,
        berries: Array.from({ length: Math.floor(Math.random() * 4) + 2 }).map(() => ({
          heightRatio: Math.random() * 0.7 + 0.2,
          side: Math.random() < 0.5 ? -1 : 1,
          size: Math.random() * 3.5 + 2.5,
          color: ['#D90429', '#5E0B20', '#FF758F', '#4A0515'][Math.floor(Math.random() * 4)],
        })),
      });
    }

    // Helper: Draw veined heart flower (matching reference image style)
    const drawVeinedHeart = (ctx, x, y, size, color, veinColor, angle, scale = 1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Heart Body Fill
      ctx.fillStyle = color;
      ctx.beginPath();
      const s = size;
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s / 2, -s / 2, -s, s * 0.3, 0, s);
      ctx.bezierCurveTo(s, s * 0.3, s / 2, -s / 2, 0, s * 0.3);
      ctx.closePath();
      ctx.fill();

      // Ink Border Line
      ctx.strokeStyle = 'rgba(40, 15, 20, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Fine Line Veins radiating outward from stem base to heart top (Image style)
      ctx.strokeStyle = veinColor;
      ctx.lineWidth = 0.9;
      
      // Center vein
      ctx.beginPath();
      ctx.moveTo(0, s * 0.25);
      ctx.quadraticCurveTo(0, s * 0.6, 0, s * 0.95);
      ctx.stroke();

      // Left curved veins
      ctx.beginPath();
      ctx.moveTo(0, s * 0.8);
      ctx.quadraticCurveTo(-s * 0.35, s * 0.4, -s * 0.45, -s * 0.1);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, s * 0.65);
      ctx.quadraticCurveTo(-s * 0.55, s * 0.2, -s * 0.7, s * 0.1);
      ctx.stroke();

      // Right curved veins
      ctx.beginPath();
      ctx.moveTo(0, s * 0.8);
      ctx.quadraticCurveTo(s * 0.35, s * 0.4, s * 0.45, -s * 0.1);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, s * 0.65);
      ctx.quadraticCurveTo(s * 0.55, s * 0.2, s * 0.7, s * 0.1);
      ctx.stroke();

      ctx.restore();
    };

    const startTime = performance.now();
    let tick = 0;

    const render = (now) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      tick += 0.02;

      stems.forEach((stem) => {
        if (elapsed < stem.delay) return;

        // Stem Growth Progress (0 to 1)
        const stemProgress = Math.min(1, (elapsed - stem.delay) / stem.growthDuration);
        const currentStemHeight = stem.targetHeight * stemProgress;

        // Ambient Breeze Sway Physics
        const sway = Math.sin(tick * stem.swaySpeed * 2.5 + stem.x) * stem.swayAmount * stemProgress;
        const topX = stem.x + sway;
        const topY = height - currentStemHeight;

        // Draw Slender Dark Ink Stem
        ctx.save();
        ctx.strokeStyle = '#2B1A1D';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(stem.x, height);
        ctx.quadraticCurveTo(stem.x + sway * 0.4, height - currentStemHeight * 0.5, topX, topY);
        ctx.stroke();

        // Draw Wild Berries & Side Buds branching off stem
        stem.berries.forEach((b) => {
          if (stemProgress < b.heightRatio) return;
          const berryY = height - currentStemHeight * b.heightRatio;
          const berryX = stem.x + (sway * b.heightRatio) + (b.side * 12);

          // Berry Branch Line
          ctx.strokeStyle = '#3D2529';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(stem.x + (sway * b.heightRatio), berryY);
          ctx.lineTo(berryX, berryY - 4);
          ctx.stroke();

          // Berry Seed Dot
          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.arc(berryX, berryY - 4, b.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Bloom Heart Flower at Stem Tip
        if (stemProgress >= 0.85) {
          const bloomProgress = Math.min(1, (elapsed - stem.delay - stem.growthDuration * 0.85) * 2.2);
          const easeBloom = 1 - Math.pow(1 - bloomProgress, 3);
          const swayAngle = (sway / stem.targetHeight) * 0.5;

          drawVeinedHeart(ctx, topX, topY - stem.flowerSize * 0.6, stem.flowerSize, stem.color, stem.veinColor, swayAngle, easeBloom);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-[220px] sm:h-[300px] pointer-events-none z-10 overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
