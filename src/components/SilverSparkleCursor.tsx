import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: 'star' | 'circle' | 'sparkle';
}

export const SilverSparkleCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);
  const lastTime = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const champagneRoseColors = [
      '#ffffff',
      '#fcf8f2',
      '#f5ebe0',
      '#dfc2a5',
      '#d8ba9c',
      '#c7a485',
      '#edd7c4',
      '#eecfd4',
      '#d8a5ad',
      '#c28b93',
    ];

    const addParticles = (x: number, y: number, count = 2, isClick = false) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = isClick ? Math.random() * 4 + 1.5 : Math.random() * 1.8 + 0.3;
        const color = champagneRoseColors[Math.floor(Math.random() * champagneRoseColors.length)];
        const shapes: ('star' | 'circle' | 'sparkle')[] = ['star', 'sparkle', 'circle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + (isClick ? (Math.random() - 0.5) * 2 : 0.2), // slight gravity
          size: isClick ? Math.random() * 5 + 3 : Math.random() * 3.5 + 1.5,
          alpha: 1,
          decay: isClick ? Math.random() * 0.02 + 0.015 : Math.random() * 0.03 + 0.025,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          color,
          shape,
        });
      }

      // Cap maximum active particles to preserve 60fps performance
      if (particlesRef.current.length > 160) {
        particlesRef.current.splice(0, particlesRef.current.length - 160);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime.current > 16) { // throttle ~60fps
        addParticles(e.clientX, e.clientY, 3, false);
        lastTime.current = now;
      }
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        addParticles(touch.clientX, touch.clientY, 3, false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      addParticles(e.clientX, e.clientY, 18, true);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        addParticles(touch.clientX, touch.clientY, 15, true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Draw 4-point star sparkle on canvas
    const drawSparkle = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number,
      rotation: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.shadowColor = '#dfba73';
      c.shadowBlur = 5;

      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(0, 0, size, 0);
      c.quadraticCurveTo(0, 0, 0, size);
      c.quadraticCurveTo(0, 0, -size, 0);
      c.quadraticCurveTo(0, 0, 0, -size);
      c.closePath();
      c.fill();

      // Bright center core
      c.fillStyle = '#ffffff';
      c.beginPath();
      c.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      c.fill();

      c.restore();
    };

    const drawCircle = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      c.save();
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.shadowColor = '#ffffff';
      c.shadowBlur = 3;
      c.beginPath();
      c.arc(x, y, size * 0.6, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        if (p.shape === 'circle') {
          drawCircle(ctx, p.x, p.y, p.size, p.color, p.alpha);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="silver-sparkle-cursor-canvas"
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
};
