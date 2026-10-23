import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

const WELCOME = `${import.meta.env.BASE_URL}audio/Welcome.mp3`;
const BGM     = `${import.meta.env.BASE_URL}audio/BGM.mp3`;

type Track = 'welcome' | 'bgm';

export default function AudioPlayer() {
  const welcome        = useRef<HTMLAudioElement>(null);
  const bgm            = useRef<HTMLAudioElement>(null);
  const sequenceStarted = useRef(false);
  const startPending    = useRef(false);

  const [volumePercent, setVolumePercent] = useState(20);
  const [muted, setMuted]   = useState(false);
  const [track, setTrack]   = useState<Track>('welcome');
  const [playing, setPlaying]         = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  const playCurrentTrack = useCallback(async () => {
    const audio = track === 'welcome' ? welcome.current : bgm.current;
    if (!audio || startPending.current) return;
    startPending.current = true;
    try {
      await audio.play();
      sequenceStarted.current = true;
      setPlaying(true);
      setPlaybackError(false);
    } catch {
      setPlaybackError(true);
    } finally {
      startPending.current = false;
    }
  }, [track]);

  // Attempt silent autoplay on mount; fall back to first-interaction trigger
  useEffect(() => {
    let cancelled = false;
    const tryAutoplay = async () => {
      const audio = welcome.current;
      if (!audio || sequenceStarted.current) return;
      try {
        await audio.play();
        if (!cancelled) {
          sequenceStarted.current = true;
          setPlaying(true);
          setPlaybackError(false);
        }
      } catch {
        // Blocked by browser — wait for first user gesture
        const startAfterGesture = () => {
          if (!sequenceStarted.current) void playCurrentTrack();
        };
        window.addEventListener('pointerdown', startAfterGesture, { once: true, passive: true });
        window.addEventListener('keydown',     startAfterGesture, { once: true });
      }
    };
    void tryAutoplay();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync volume & mute to both audio elements
  useEffect(() => {
    for (const audio of [welcome.current, bgm.current]) {
      if (!audio) continue;
      audio.volume = volumePercent / 100;
      audio.muted  = muted;
    }
  }, [volumePercent, muted]);

  const handleWelcomeEnded = async () => {
    setTrack('bgm');
    const bg = bgm.current;
    if (!bg) return;
    try {
      await bg.play();
      sequenceStarted.current = true;
      setPlaying(true);
      setPlaybackError(false);
    } catch {
      setPlaying(false);
      setPlaybackError(true);
      sequenceStarted.current = false;
    }
  };

  const togglePlayback = () => {
    if (playing) {
      welcome.current?.pause();
      bgm.current?.pause();
      setPlaying(false);
      return;
    }
    void playCurrentTrack();
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full bg-[#142A21]/95 px-3 py-2 text-white shadow-lg backdrop-blur">
      <audio ref={welcome} src={WELCOME} preload="none" onEnded={handleWelcomeEnded} onError={() => setPlaybackError(true)} />
      <audio ref={bgm}     src={BGM}     preload="none" loop               onError={() => setPlaybackError(true)} />

      <button
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? 'Pause audio' : sequenceStarted.current ? 'Resume audio' : 'Start audio'}
        title={playing ? 'Pause audio' : 'Start audio'}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>

      <button
        type="button"
        onClick={() => setMuted((v) => !v)}
        aria-label={muted ? 'Unmute audio' : 'Mute audio'}
        title={muted ? 'Unmute audio' : 'Mute audio'}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
      >
        {muted || volumePercent === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      <label className="flex items-center gap-2">
        <span className="sr-only">Audio volume</span>
        <input
          type="range"
          min="0" max="100" step="1"
          value={volumePercent}
          onChange={(e) => {
            const v = Number(e.target.value);
            setVolumePercent(v);
            if (v > 0) setMuted(false);
          }}
          aria-label="Audio volume"
          className="w-20 accent-[#C4A46A]"
        />
        <span className="w-8 text-xs tabular-nums">{volumePercent}%</span>
      </label>

      <span className="hidden sm:inline text-xs text-[#B8C7AE]">
        {track === 'welcome' ? 'Welcome' : 'Background'}
      </span>

      {playbackError && (
        <span role="status" className="sr-only">Audio could not play. Use the play button to retry.</span>
      )}
    </div>
  );
}
