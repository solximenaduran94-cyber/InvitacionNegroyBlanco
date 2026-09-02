import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { musicPlayer } from '../utils/audioSynth';

interface MusicPlayerProps {
  trackName?: string;
  audioUrl?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  trackName = 'Photograph - Ed Sheeran',
  audioUrl = '/photograph.mp3',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(258); // default ~4:18
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Initialize or update HTMLAudioElement
  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setSecondsRemaining(Math.floor(audio.duration));
      }
    };

    const handleTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const current = audio.currentTime;
        const total = audio.duration;
        setProgress((current / total) * 100);
        setSecondsRemaining(Math.max(0, Math.floor(total - current)));
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      if (audio.duration) {
        setSecondsRemaining(Math.floor(audio.duration));
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audioRef.current = null;
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => {
          // If browser blocks audio or network issue, fallback to synthesized audio
          musicPlayer.play();
          setIsPlaying(true);
        });
      }
    } else {
      // Fallback
      if (isPlaying) {
        musicPlayer.pause();
        setIsPlaying(false);
      } else {
        musicPlayer.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    } else {
      if (isMuted) {
        musicPlayer.setVolume(1);
        setIsMuted(false);
      } else {
        musicPlayer.setVolume(0);
        setIsMuted(true);
      }
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressBarRef.current;
    if (!audio || !bar || !audio.duration) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio * 100);
    setSecondsRemaining(Math.max(0, Math.floor(audio.duration - audio.currentTime)));
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `-${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`;
  };

  return (
    <div id="music-player-section" className="w-full bg-[#faf6f0] text-neutral-800 py-6 px-4 shadow-sm border-b border-[#e9dcce]">
      <div className="max-w-md mx-auto">
        {/* Controls Bar */}
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            id="play-music-button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
            className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-800 hover:text-[#9e5d68] hover:bg-[#f2e6d9] transition-colors focus:outline-none cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Progress / Scrubber Bar */}
          <div
            ref={progressBarRef}
            onClick={handleProgressBarClick}
            className="relative flex-1 flex items-center py-2 cursor-pointer group"
          >
            <div className="w-full h-1.5 bg-[#ecdacb] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#caa684] via-[#dfc2a5] to-[#9e5d68] rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Scrubber Knob */}
            <div
              className="absolute w-3.5 h-3.5 bg-[#caa684] group-hover:scale-125 rounded-full border-2 border-white shadow -translate-x-1/2 cursor-pointer transition-all duration-150"
              style={{ left: `${progress}%` }}
            />
          </div>

          {/* Time Display */}
          <span className="text-xs font-mono font-medium text-neutral-600 min-w-[44px] text-right">
            {formatTime(secondsRemaining)}
          </span>

          {/* Volume Button */}
          <button
            id="mute-music-button"
            onClick={toggleMute}
            aria-label="Silenciar o activar volumen"
            className="p-1.5 text-neutral-600 hover:text-[#9e5d68] transition-colors cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-neutral-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#caa684]" />
            )}
          </button>
        </div>

        {/* Call to action prompt text */}
        <div className="mt-4 text-center">
          <button
            onClick={togglePlay}
            className="inline-flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#dfc2a5] group-hover:text-[#a36770] transition-colors" />
            <p className="text-xs tracking-[0.2em] font-medium text-neutral-800 group-hover:text-[#8c4f5a] uppercase transition-colors">
              {isPlaying ? 'MÚSICA EN REPRODUCCIÓN' : 'DALE PLAY PARA QUE COMIENCE LA FIESTA'}
            </p>
            <Sparkles className="w-3.5 h-3.5 text-[#dfc2a5] group-hover:text-[#a36770] transition-colors" />
          </button>
          <p className="text-[10px] text-[#9e5d68] font-medium tracking-wider mt-0.5 uppercase">
            {trackName}
          </p>
        </div>
      </div>
    </div>
  );
};
