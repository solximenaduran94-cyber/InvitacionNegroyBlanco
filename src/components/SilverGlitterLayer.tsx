import React from 'react';
import { motion } from 'motion/react';

interface SilverGlitterLayerProps {
  className?: string;
  density?: 'normal' | 'high';
  animated?: boolean;
}

// 4-Pointed Star Sparkle Icon Component
const SparkleStar: React.FC<{
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay?: number;
  animated?: boolean;
}> = ({ x, y, size, opacity, delay = 0, animated = true }) => {
  return (
    <motion.g
      initial={animated ? { scale: 0.7, opacity: opacity * 0.7 } : undefined}
      animate={
        animated
          ? {
              scale: [0.7, 1.2, 0.7],
              opacity: [opacity * 0.6, opacity, opacity * 0.6],
            }
          : undefined
      }
      transition={
        animated
          ? {
              duration: 2.5 + (size % 3),
              repeat: Infinity,
              delay: delay,
              ease: 'easeInOut',
            }
          : undefined
      }
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {/* Outer soft glow */}
      <circle cx={x} cy={y} r={size * 1.5} fill="#ffffff" opacity={opacity * 0.4} filter="blur(2px)" />

      {/* 4-point sharp star */}
      <path
        d={`M ${x} ${y - size} Q ${x} ${y} ${x + size} ${y} Q ${x} ${y} ${x} ${y + size} Q ${x} ${y} ${x - size} ${y} Q ${x} ${y} ${x} ${y - size} Z`}
        fill="#ffffff"
        opacity={opacity}
      />
      {/* Intense center dot */}
      <circle cx={x} cy={y} r={size * 0.3} fill="#ffffff" opacity={1} />
    </motion.g>
  );
};

export const SilverGlitterLayer: React.FC<SilverGlitterLayerProps> = ({
  className = '',
  density = 'high',
  animated = true,
}) => {
  // Pre-calculated deterministic glitter and bokeh coordinates to avoid hydration mismatch
  const bokehCircles = [
    { cx: '12%', cy: '15%', r: 42, opacity: 0.45, blur: 8 },
    { cx: '88%', cy: '18%', r: 56, opacity: 0.5, blur: 12 },
    { cx: '45%', cy: '32%', r: 35, opacity: 0.4, blur: 6 },
    { cx: '25%', cy: '65%', r: 60, opacity: 0.48, blur: 10 },
    { cx: '78%', cy: '72%', r: 48, opacity: 0.42, blur: 8 },
    { cx: '60%', cy: '85%', r: 52, opacity: 0.46, blur: 9 },
    { cx: '15%', cy: '90%', r: 38, opacity: 0.38, blur: 6 },
    { cx: '92%', cy: '48%', r: 44, opacity: 0.45, blur: 8 },
    { cx: '35%', cy: '8%', r: 30, opacity: 0.35, blur: 5 },
    { cx: '70%', cy: '38%', r: 40, opacity: 0.4, blur: 7 },
  ];

  const sparkleStars = [
    { x: 45, y: 35, size: 14, opacity: 0.95, delay: 0 },
    { x: 140, y: 70, size: 9, opacity: 0.85, delay: 0.6 },
    { x: 310, y: 45, size: 16, opacity: 1, delay: 1.2 },
    { x: 260, y: 110, size: 11, opacity: 0.9, delay: 1.8 },
    { x: 80, y: 140, size: 13, opacity: 0.95, delay: 0.4 },
    { x: 340, y: 150, size: 15, opacity: 0.9, delay: 0.9 },
    { x: 190, y: 180, size: 18, opacity: 1, delay: 1.5 },
    { x: 50, y: 220, size: 10, opacity: 0.8, delay: 2.1 },
    { x: 290, y: 240, size: 14, opacity: 0.95, delay: 0.3 },
    { x: 120, y: 280, size: 12, opacity: 0.85, delay: 1.1 },
    { x: 330, y: 310, size: 17, opacity: 1, delay: 0.7 },
    { x: 70, y: 350, size: 15, opacity: 0.95, delay: 1.9 },
    { x: 220, y: 360, size: 11, opacity: 0.85, delay: 0.2 },
    { x: 160, y: 410, size: 16, opacity: 1, delay: 1.4 },
    { x: 300, y: 430, size: 13, opacity: 0.9, delay: 0.8 },
    { x: 40, y: 460, size: 12, opacity: 0.85, delay: 1.7 },
    { x: 250, y: 480, size: 15, opacity: 0.95, delay: 0.5 },
  ];

  const microGlitter = [
    { cx: '8%', cy: '12%', r: 2.5, opacity: 0.9 },
    { cx: '18%', cy: '22%', r: 1.8, opacity: 0.8 },
    { cx: '28%', cy: '14%', r: 2.2, opacity: 0.95 },
    { cx: '38%', cy: '28%', r: 1.5, opacity: 0.75 },
    { cx: '48%', cy: '18%', r: 2.8, opacity: 0.9 },
    { cx: '58%', cy: '24%', r: 1.9, opacity: 0.85 },
    { cx: '68%', cy: '15%', r: 2.4, opacity: 0.9 },
    { cx: '78%', cy: '26%', r: 1.7, opacity: 0.8 },
    { cx: '88%', cy: '12%', r: 2.6, opacity: 0.95 },
    { cx: '95%', cy: '28%', r: 1.8, opacity: 0.85 },

    { cx: '10%', cy: '42%', r: 2.2, opacity: 0.85 },
    { cx: '22%', cy: '48%', r: 1.6, opacity: 0.8 },
    { cx: '32%', cy: '38%', r: 2.5, opacity: 0.9 },
    { cx: '52%', cy: '44%', r: 2.1, opacity: 0.85 },
    { cx: '65%', cy: '52%', r: 1.8, opacity: 0.8 },
    { cx: '82%', cy: '40%', r: 2.7, opacity: 0.95 },
    { cx: '92%', cy: '56%', r: 2.0, opacity: 0.85 },

    { cx: '6%', cy: '68%', r: 2.4, opacity: 0.9 },
    { cx: '16%', cy: '78%', r: 1.9, opacity: 0.85 },
    { cx: '36%', cy: '62%', r: 2.6, opacity: 0.95 },
    { cx: '46%', cy: '72%', r: 1.7, opacity: 0.8 },
    { cx: '62%', cy: '66%', r: 2.3, opacity: 0.9 },
    { cx: '74%', cy: '82%', r: 2.0, opacity: 0.85 },
    { cx: '86%', cy: '64%', r: 2.8, opacity: 1 },
    { cx: '94%', cy: '78%', r: 1.6, opacity: 0.8 },

    { cx: '12%', cy: '88%', r: 2.5, opacity: 0.9 },
    { cx: '28%', cy: '94%', r: 1.8, opacity: 0.8 },
    { cx: '42%', cy: '86%', r: 2.3, opacity: 0.9 },
    { cx: '58%', cy: '92%', r: 1.9, opacity: 0.85 },
    { cx: '72%', cy: '88%', r: 2.6, opacity: 0.95 },
    { cx: '88%', cy: '95%', r: 2.2, opacity: 0.9 },
  ];

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
    >
      {/* 1. Base Silver Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8]" />

      {/* 2. Silver Sparkle Texture Noise Overlay */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1.5px, transparent 1.5px)`,
          backgroundSize: '16px 16px, 28px 28px',
          backgroundPosition: '0 0, 8px 14px',
        }}
      />

      {/* 3. Soft Radial Vignette Light in Center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.4)_45%,rgba(203,213,225,0.1)_80%)]" />

      {/* 4. High-Resolution Bokeh Circles & Twinkling SVG Stars */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 380 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Bokeh Glow Orbs */}
        {bokehCircles.map((circle, index) => (
          <circle
            key={`bokeh-${index}`}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill="#ffffff"
            opacity={circle.opacity}
            style={{ filter: `blur(${circle.blur}px)` }}
          />
        ))}

        {/* Micro Glitter Points */}
        {microGlitter.map((point, index) => (
          <circle
            key={`point-${index}`}
            cx={point.cx}
            cy={point.cy}
            r={point.r}
            fill="#ffffff"
            opacity={point.opacity}
            filter="drop-shadow(0 0 2px #ffffff)"
          />
        ))}

        {/* Crisp 4-Point Star Sparkles */}
        {sparkleStars.map((star, index) => (
          <SparkleStar
            key={`star-${index}`}
            x={star.x}
            y={star.y}
            size={star.size}
            opacity={star.opacity}
            delay={star.delay}
            animated={animated}
          />
        ))}
      </svg>

      {/* 5. Shimmer Light Sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmerEffect_6s_infinite_linear]" />
    </div>
  );
};
