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
  color?: string;
}> = ({ x, y, size, opacity, delay = 0, animated = true, color = '#dfc2a5' }) => {
  return (
    <motion.g
      initial={animated ? { scale: 0.7, opacity: opacity * 0.7 } : undefined}
      animate={
        animated
          ? {
              scale: [0.7, 1.25, 0.7],
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
      {/* Outer warm glow */}
      <circle cx={x} cy={y} r={size * 1.6} fill={color} opacity={opacity * 0.45} filter="blur(2.5px)" />

      {/* 4-point sharp star */}
      <path
        d={`M ${x} ${y - size} Q ${x} ${y} ${x + size} ${y} Q ${x} ${y} ${x} ${y + size} Q ${x} ${y} ${x - size} ${y} Q ${x} ${y} ${x} ${y - size} Z`}
        fill={color}
        opacity={opacity}
      />
      {/* Intense center dot */}
      <circle cx={x} cy={y} r={size * 0.35} fill="#fffbf5" opacity={1} />
    </motion.g>
  );
};

export const SilverGlitterLayer: React.FC<SilverGlitterLayerProps> = ({
  className = '',
  density = 'high',
  animated = true,
}) => {
  // Champagne (matching user image #dfc2a5 / #fcf8f2 / #c7a485) and dusty rose bokeh coordinates
  const bokehCircles = [
    { cx: '12%', cy: '15%', r: 46, opacity: 0.38, blur: 8, fill: '#f5d6dc' }, // dusty rose tint
    { cx: '88%', cy: '18%', r: 58, opacity: 0.45, blur: 12, fill: '#f5ebe0' }, // satin champagne highlight
    { cx: '45%', cy: '32%', r: 36, opacity: 0.35, blur: 6, fill: '#e6c8ce' }, // soft antique rose
    { cx: '25%', cy: '65%', r: 64, opacity: 0.42, blur: 10, fill: '#dfc2a5' }, // champagne silk
    { cx: '78%', cy: '72%', r: 50, opacity: 0.36, blur: 8, fill: '#eccad1' }, // dusty rose
    { cx: '60%', cy: '85%', r: 54, opacity: 0.4, blur: 9, fill: '#edd7c4' }, // champagne light
    { cx: '15%', cy: '90%', r: 40, opacity: 0.32, blur: 6, fill: '#dfb5bd' }, // dusty rose
    { cx: '92%', cy: '48%', r: 45, opacity: 0.38, blur: 8, fill: '#e8ceb7' }, // champagne
    { cx: '35%', cy: '8%', r: 32, opacity: 0.3, blur: 5, fill: '#edd1d7' }, // dusty rose
    { cx: '70%', cy: '38%', r: 42, opacity: 0.35, blur: 7, fill: '#dfc2a5' }, // champagne
  ];

  const sparkleStars = [
    { x: 45, y: 35, size: 14, opacity: 0.95, delay: 0, color: '#dfc2a5' },
    { x: 140, y: 70, size: 9, opacity: 0.85, delay: 0.6, color: '#d8a5ad' },
    { x: 310, y: 45, size: 16, opacity: 1, delay: 1.2, color: '#f5ebe0' },
    { x: 260, y: 110, size: 11, opacity: 0.9, delay: 1.8, color: '#dfc2a5' },
    { x: 80, y: 140, size: 13, opacity: 0.95, delay: 0.4, color: '#c28b93' },
    { x: 340, y: 150, size: 15, opacity: 0.9, delay: 0.9, color: '#edd7c4' },
    { x: 190, y: 180, size: 18, opacity: 1, delay: 1.5, color: '#dfc2a5' },
    { x: 50, y: 220, size: 10, opacity: 0.8, delay: 2.1, color: '#d8a5ad' },
    { x: 290, y: 240, size: 14, opacity: 0.95, delay: 0.3, color: '#f5ebe0' },
    { x: 120, y: 280, size: 12, opacity: 0.85, delay: 1.1, color: '#c28b93' },
    { x: 330, y: 310, size: 17, opacity: 1, delay: 0.7, color: '#dfc2a5' },
    { x: 70, y: 350, size: 15, opacity: 0.95, delay: 1.9, color: '#e8ceb7' },
    { x: 220, y: 360, size: 11, opacity: 0.85, delay: 0.2, color: '#d8a5ad' },
    { x: 160, y: 410, size: 16, opacity: 1, delay: 1.4, color: '#dfc2a5' },
    { x: 300, y: 430, size: 13, opacity: 0.9, delay: 0.8, color: '#edd7c4' },
    { x: 40, y: 460, size: 12, opacity: 0.85, delay: 1.7, color: '#c28b93' },
    { x: 250, y: 480, size: 15, opacity: 0.95, delay: 0.5, color: '#dfc2a5' },
  ];

  const microGlitter = [
    { cx: '8%', cy: '12%', r: 2.5, opacity: 0.9, fill: '#dfc2a5' },
    { cx: '18%', cy: '22%', r: 1.8, opacity: 0.8, fill: '#d8a5ad' },
    { cx: '28%', cy: '14%', r: 2.2, opacity: 0.95, fill: '#fcf8f2' },
    { cx: '38%', cy: '28%', r: 1.5, opacity: 0.75, fill: '#dfc2a5' },
    { cx: '48%', cy: '18%', r: 2.8, opacity: 0.9, fill: '#c28b93' },
    { cx: '58%', cy: '24%', r: 1.9, opacity: 0.85, fill: '#edd7c4' },
    { cx: '68%', cy: '15%', r: 2.4, opacity: 0.9, fill: '#d8a5ad' },
    { cx: '78%', cy: '26%', r: 1.7, opacity: 0.8, fill: '#dfc2a5' },
    { cx: '88%', cy: '12%', r: 2.6, opacity: 0.95, fill: '#fcf8f2' },
    { cx: '95%', cy: '28%', r: 1.8, opacity: 0.85, fill: '#c28b93' },

    { cx: '10%', cy: '42%', r: 2.2, opacity: 0.85, fill: '#dfc2a5' },
    { cx: '22%', cy: '48%', r: 1.6, opacity: 0.8, fill: '#d8a5ad' },
    { cx: '32%', cy: '38%', r: 2.5, opacity: 0.9, fill: '#fcf8f2' },
    { cx: '52%', cy: '44%', r: 2.1, opacity: 0.85, fill: '#c28b93' },
    { cx: '65%', cy: '52%', r: 1.8, opacity: 0.8, fill: '#dfc2a5' },
    { cx: '82%', cy: '40%', r: 2.7, opacity: 0.95, fill: '#edd7c4' },
    { cx: '92%', cy: '56%', r: 2.0, opacity: 0.85, fill: '#d8a5ad' },

    { cx: '6%', cy: '68%', r: 2.4, opacity: 0.9, fill: '#dfc2a5' },
    { cx: '16%', cy: '78%', r: 1.9, opacity: 0.85, fill: '#c28b93' },
    { cx: '36%', cy: '62%', r: 2.6, opacity: 0.95, fill: '#fcf8f2' },
    { cx: '46%', cy: '72%', r: 1.7, opacity: 0.8, fill: '#dfc2a5' },
    { cx: '62%', cy: '66%', r: 2.3, opacity: 0.9, fill: '#d8a5ad' },
    { cx: '74%', cy: '82%', r: 2.0, opacity: 0.85, fill: '#edd7c4' },
    { cx: '86%', cy: '64%', r: 2.8, opacity: 1, fill: '#dfc2a5' },
    { cx: '94%', cy: '78%', r: 1.6, opacity: 0.8, fill: '#c28b93' },

    { cx: '12%', cy: '88%', r: 2.5, opacity: 0.9, fill: '#dfc2a5' },
    { cx: '28%', cy: '94%', r: 1.8, opacity: 0.8, fill: '#d8a5ad' },
    { cx: '42%', cy: '86%', r: 2.3, opacity: 0.9, fill: '#fcf8f2' },
    { cx: '58%', cy: '92%', r: 1.9, opacity: 0.85, fill: '#dfc2a5' },
    { cx: '72%', cy: '88%', r: 2.6, opacity: 0.95, fill: '#c28b93' },
    { cx: '88%', cy: '95%', r: 2.2, opacity: 0.9, fill: '#edd7c4' },
  ];

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
    >
      {/* 1. Base Champagne Silk & Dusty Rose Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf5ef] via-[#f3e7da] to-[#ecd7ce]" />

      {/* 2. Sparkle Texture Noise Overlay with satin champagne tint */}
      <div
        className="absolute inset-0 opacity-45 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(#dfc2a5 1px, transparent 1px), radial-gradient(#ffffff 1.5px, transparent 1.5px), radial-gradient(#d8a5ad 1px, transparent 1px)`,
          backgroundSize: '16px 16px, 28px 28px, 20px 20px',
          backgroundPosition: '0 0, 8px 14px, 4px 6px',
        }}
      />

      {/* 3. Soft Radial Vignette Light with warm satin champagne core matching sample */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(252,248,242,0.95)_0%,rgba(245,235,224,0.6)_45%,rgba(223,194,165,0.35)_75%,rgba(235,210,216,0.25)_100%)]" />

      {/* 4. High-Resolution Bokeh Circles & Twinkling SVG Stars in Champagne & Rose */}
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
            fill={circle.fill}
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
            fill={point.fill}
            opacity={point.opacity}
            filter="drop-shadow(0 0 2px rgba(223,194,165,0.85))"
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
            color={star.color}
          />
        ))}
      </svg>

      {/* 5. Champagne Metallic Satin Light Sweep matching user's image gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fcf8f2]/30 to-transparent -translate-x-full animate-[shimmerEffect_6s_infinite_linear]" />
    </div>
  );
};
