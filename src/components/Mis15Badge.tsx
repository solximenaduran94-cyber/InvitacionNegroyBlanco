import React from 'react';
import { motion } from 'motion/react';

interface Mis15BadgeProps {
  size?: number;
  text?: string;
  className?: string;
  theme?: 'dark' | 'light';
}

export const Mis15Badge: React.FC<Mis15BadgeProps> = ({
  size = 110,
  text = 'MIS 15',
  className = '',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#4b5563';
  const heartColor = isDark ? '#ffffff' : '#374151';

  // Repeated text for circular path
  const repeatingText = `• ${text} • ${text} • ${text} • ${text} `;

  return (
    <div
      id="mis-15-badge"
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Central Heart */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width={size * 0.32}
          height={size * 0.32}
          fill={heartColor}
          className="transition-transform duration-300 hover:scale-110"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Rotating Circular Text SVG */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="w-full h-full"
      >
        <defs>
          <path
            id="textcircle"
            d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
            fill="none"
          />
        </defs>
        <text
          fill={textColor}
          fontSize="16.5"
          letterSpacing="2.8"
          fontWeight="500"
          className="font-sans uppercase"
        >
          <textPath href="#textcircle" startOffset="0%">
            {repeatingText}
          </textPath>
        </text>
      </motion.svg>
    </div>
  );
};
