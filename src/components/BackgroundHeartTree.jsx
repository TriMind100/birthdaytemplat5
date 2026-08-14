import React, { useEffect, useRef } from 'react';

export const BackgroundHeartTree = () => {
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

    const colors = ['#FF4D79', '#FF85A1', '#FFB3C1', '#FFC72C', '#E63963', '#FF758F', '#F3C5C5'];

    // Generate heart shape math points for background tree canopy
    const heartLeaves = [];
    const fallingLeaves = [];

    const treeCenterX = width / 2;
    const treeCenterY = height * 0.55;
    const treeScale = Math.min(width, height) / 52;

    // Create canopy heart leaves using parametric heart equation
    for (let i = 0; i < 380; i++) {
      const t = Math.random() * Math.PI * 2;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      const r = Math.random();
      const px = treeCenterX + hx * treeScale * r;
      const py = treeCenterY + hy * treeScale * r;

      heartLeaves.push({
        x: px,
        y: py,
        size: Math.random() * 7 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        scale: Math.random() * 0.4 + 0.7,
        opacity: Math.random() * 0.35 + 0.45,
      });
    }

    const drawHeart = (ctx, x, y, size, color, angle, opacity = 1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;

      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, size / 3, 0, size);
      ctx.bezierCurveTo(size, size / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawTrunk = (ctx) => {
      ctx.save();
      ctx.strokeStyle = '#6B4226';
      ctx.fillStyle = '#6B4226';
      ctx.globalAlpha = 0.5;

      const baseX = treeCenterX;
      const baseY = height;

      ctx.beginPath();
      ctx.moveTo(baseX - 14, baseY);
      ctx.quadraticCurveTo(baseX - 6, baseY - 100, baseX - 8, treeCenterY + 40);
      ctx.lineTo(baseX + 8, treeCenterY + 40);
      ctx.quadraticCurveTo(baseX + 6, baseY - 100, baseX + 14, baseY);
      ctx.closePath();
      ctx.fill();

      // Branches
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(baseX - 6, treeCenterY + 50);
      ctx.quadraticCurveTo(baseX - 50, treeCenterY - 10, baseX - 90, treeCenterY - 40);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(baseX + 6, treeCenterY + 50);
      ctx.quadraticCurveTo(baseX + 50, treeCenterY - 10, baseX + 90, treeCenterY - 40);
      ctx.stroke();

      ctx.restore();
    };

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Tree Trunk & Branches
      drawTrunk(ctx);

      // Render Heart Canopy Leaves
      tick += 0.015;
      heartLeaves.forEach((leaf) => {
        const offset = Math.sin(tick * leaf.swaySpeed * 2) * 2.5;
        const currentAngle = leaf.angle + Math.sin(tick + leaf.x) * 0.08;
        drawHeart(ctx, leaf.x + offset, leaf.y, leaf.size * leaf.scale, leaf.color, currentAngle, leaf.opacity);

        // Ambient detachment of falling heart petals
        if (Math.random() < 0.0025 && fallingLeaves.length < 35) {
          fallingLeaves.push({
            x: leaf.x,
            y: leaf.y,
            vx: (Math.random() - 0.5) * 1.2,
            vy: Math.random() * 1.1 + 0.6,
            size: leaf.size,
            color: leaf.color,
            angle: leaf.angle,
            rotationSpeed: (Math.random() - 0.5) * 0.04,
            opacity: 0.8,
          });
        }
      });

      // Render Falling Heart Petals drifting across screen
      for (let i = fallingLeaves.length - 1; i >= 0; i--) {
        const f = fallingLeaves[i];
        f.x += f.vx + Math.sin(tick * 1.5) * 0.7;
        f.y += f.vy;
        f.angle += f.rotationSpeed;
        f.opacity -= 0.0025;

        drawHeart(ctx, f.x, f.y, f.size, f.color, f.angle, Math.max(0, f.opacity));

        if (f.y > height || f.opacity <= 0) {
          fallingLeaves.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-45 select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
