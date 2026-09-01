import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { musicPlayer } from '../utils/audioSynth';

interface MusicPlayerProps {
  trackName?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  trackName = 'Canción de los 15 - XXXX',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(12);
  const [secondsRemaining, setSecondsRemaining] = useState(281); // ~4:41

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
        setSecondsRemaining((prev) => (prev <= 0 ? 281 : prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      musicPlayer.pause();
      setIsPlaying(false);
    } else {
      musicPlayer.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      musicPlayer.setVolume(1);
      setIsMuted(false);
    } else {
      musicPlayer.setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `-${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`;
  };

  return (
    <div id="music-player-section" className="w-full bg-white text-neutral-800 py-6 px-4 shadow-sm border-b border-neutral-200">
      <div className="max-w-md mx-auto">
        {/* Controls Bar */}
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            id="play-music-button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
            className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors focus:outline-none"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Progress / Scrubber Bar */}
          <div className="relative flex-1 flex items-center">
            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-400 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Scrubber Knob */}
            <div
              className="absolute w-3.5 h-3.5 bg-sky-500 rounded-full border-2 border-white shadow -translate-x-1/2 cursor-pointer transition-all duration-300"
              style={{ left: `${progress}%` }}
            />
          </div>

          {/* Time Display */}
          <span className="text-xs font-mono font-medium text-neutral-600 min-w-[42px] text-right">
            {formatTime(secondsRemaining)}
          </span>

          {/* Volume Button */}
          <button
            id="mute-music-button"
            onClick={toggleMute}
            aria-label="Silenciar o activar volumen"
            className="p-1.5 text-neutral-600 hover:text-black transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-neutral-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-sky-500" />
            )}
          </button>
        </div>

        {/* Call to action prompt text */}
        <div className="mt-4 text-center">
          <button
            onClick={togglePlay}
            className="inline-flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
            <p className="text-xs tracking-[0.2em] font-medium text-neutral-700 group-hover:text-neutral-950 uppercase transition-colors">
              {isPlaying ? 'MÚSICA EN REPRODUCCIÓN' : 'DALE PLAY PARA QUE COMIENCE LA FIESTA'}
            </p>
            <Sparkles className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
          </button>
          <p className="text-[10px] text-neutral-400 tracking-wider mt-0.5 uppercase">
            {trackName}
          </p>
        </div>
      </div>
    </div>
  );
};
