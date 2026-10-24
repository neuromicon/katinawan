import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

<<<<<<< HEAD
const WELCOME_VIDEO_ID = 'LiMpzfY2SH4';
const BGM_VIDEO_ID     = 'sei7b7p9doQ';

type Track = 'welcome' | 'bgm';

// Declarations for YouTube IFrame API
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId?: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
            onError?: (event: { data: number; target: YTPlayerInstance }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  getPlayerState: () => number;
  cueVideoById: (videoId: string) => void;
  loadVideoById: (videoId: string) => void;
  destroy: () => void;
}

let ytApiLoadingPromise: Promise<void> | null = null;

function loadYouTubeIframeApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  if (window.YT && window.YT.Player) {
    return Promise.resolve();
  }

  if (ytApiLoadingPromise) {
    return ytApiLoadingPromise;
  }

  ytApiLoadingPromise = new Promise<void>((resolve) => {
    const prevHandler = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevHandler === 'function') prevHandler();
      resolve();
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return ytApiLoadingPromise;
}

export default function AudioPlayer() {
  const welcomePlayerRef = useRef<YTPlayerInstance | null>(null);
  const bgmPlayerRef     = useRef<YTPlayerInstance | null>(null);

  const welcomeReadyRef = useRef(false);
  const bgmReadyRef     = useRef(false);

  const sequenceStartedRef = useRef(false);
  const currentTrackRef    = useRef<Track>('welcome');
  const isPlayingRef       = useRef(false);

  const [volumePercent, setVolumePercent] = useState(20);
  const [muted, setMuted]                 = useState(false);
  const [track, setTrack]                 = useState<Track>('welcome');
  const [playing, setPlaying]             = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  // Keep ref in sync for event listeners
  useEffect(() => {
    currentTrackRef.current = track;
  }, [track]);

  useEffect(() => {
    isPlayingRef.current = playing;
  }, [playing]);

  // Sync volume & mute to both players whenever state changes
  useEffect(() => {
    const applyAudioSettings = (player: YTPlayerInstance | null) => {
      if (!player) return;
      try {
        player.setVolume(volumePercent);
        if (muted || volumePercent === 0) {
          player.mute();
        } else {
          player.unMute();
        }
      } catch {
        // Player might not be ready yet
      }
    };

    applyAudioSettings(welcomePlayerRef.current);
    applyAudioSettings(bgmPlayerRef.current);
  }, [volumePercent, muted]);

  const primeBgmPlayer = useCallback(() => {
    // Briefly prime BGM player within user interaction context
    // so mobile / strict browser policy allows subsequent autoplay on track change
    const bgm = bgmPlayerRef.current;
    if (bgm && bgmReadyRef.current) {
      try {
        bgm.mute();
        bgm.playVideo();
        bgm.pauseVideo();
        if (!muted && volumePercent > 0) {
          bgm.unMute();
        }
      } catch {
        // Ignore priming failures
      }
    }
  }, [muted, volumePercent]);

  const startCurrentTrack = useCallback(() => {
    const activeTrack = currentTrackRef.current;
    const player = activeTrack === 'welcome' ? welcomePlayerRef.current : bgmPlayerRef.current;
    const isReady = activeTrack === 'welcome' ? welcomeReadyRef.current : bgmReadyRef.current;

    if (!player || !isReady) return;

    try {
      player.setVolume(volumePercent);
      if (muted || volumePercent === 0) {
        player.mute();
      } else {
        player.unMute();
      }

      player.playVideo();
      sequenceStartedRef.current = true;
      setPlaying(true);
      setPlaybackError(false);

      if (activeTrack === 'welcome') {
        primeBgmPlayer();
      }
    } catch {
      setPlaybackError(true);
    }
  }, [volumePercent, muted, primeBgmPlayer]);

  const handleWelcomeEnded = useCallback(() => {
    setTrack('bgm');
    currentTrackRef.current = 'bgm';

    const bgm = bgmPlayerRef.current;
    if (!bgm || !bgmReadyRef.current) {
      setPlaying(false);
      return;
    }

    try {
      bgm.setVolume(volumePercent);
      if (muted || volumePercent === 0) {
        bgm.mute();
      } else {
        bgm.unMute();
      }
      bgm.playVideo();
      setPlaying(true);
      setPlaybackError(false);
    } catch {
      // If browser blocked transition without recent gesture,
      // show clean Play state so one tap resumes BGM
      setPlaying(false);
      setPlaybackError(true);
    }
  }, [volumePercent, muted]);

  const handleBgmEnded = useCallback(() => {
    // Seamless BGM looping
    const bgm = bgmPlayerRef.current;
    if (bgm && bgmReadyRef.current) {
      try {
        bgm.seekTo(0, true);
        bgm.playVideo();
      } catch {
        // Fallback
      }
    }
  }, []);

  // Initialize YouTube IFrame API and players
  useEffect(() => {
    let unmounted = false;

    const setupPlayers = async () => {
      await loadYouTubeIframeApi();
      if (unmounted || !window.YT) return;

      // 1. Welcome Player
      welcomePlayerRef.current = new window.YT.Player('katinawan-yt-welcome', {
        videoId: WELCOME_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event) => {
            if (unmounted) return;
            welcomeReadyRef.current = true;
            try {
              event.target.setVolume(volumePercent);
              if (muted || volumePercent === 0) event.target.mute();
            } catch {}

            // Attempt silent/initial autoplay if policy allows
            const attemptInitialAutoplay = () => {
              if (sequenceStartedRef.current) return;
              try {
                event.target.playVideo();
              } catch {
                // Will be caught by gesture fallback
              }
            };

            attemptInitialAutoplay();
          },
          onStateChange: (event) => {
            if (unmounted) return;
            const state = event.data;

            if (state === window.YT.PlayerState.PLAYING) {
              if (currentTrackRef.current === 'welcome') {
                sequenceStartedRef.current = true;
                setPlaying(true);
                setPlaybackError(false);
                // Preload BGM player as early as possible after Welcome starts
                const bgm = bgmPlayerRef.current;
                if (bgm && bgmReadyRef.current) {
                  try {
                    bgm.cueVideoById(BGM_VIDEO_ID);
                  } catch {}
                }
              }
            } else if (state === window.YT.PlayerState.PAUSED) {
              if (currentTrackRef.current === 'welcome') {
                setPlaying(false);
              }
            } else if (state === window.YT.PlayerState.ENDED) {
              handleWelcomeEnded();
            }
          },
          onError: () => {
            if (!unmounted) setPlaybackError(true);
          },
        },
      });

      // 2. BGM Player (preloaded, looping)
      bgmPlayerRef.current = new window.YT.Player('katinawan-yt-bgm', {
        videoId: BGM_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: BGM_VIDEO_ID, // Required for loop in embedded player
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event) => {
            if (unmounted) return;
            bgmReadyRef.current = true;
            try {
              event.target.setVolume(volumePercent);
              if (muted || volumePercent === 0) event.target.mute();
              event.target.cueVideoById(BGM_VIDEO_ID);
            } catch {}
          },
          onStateChange: (event) => {
            if (unmounted) return;
            const state = event.data;

            if (state === window.YT.PlayerState.PLAYING) {
              if (currentTrackRef.current === 'bgm') {
                sequenceStartedRef.current = true;
                setPlaying(true);
                setPlaybackError(false);
              }
            } else if (state === window.YT.PlayerState.PAUSED) {
              if (currentTrackRef.current === 'bgm') {
                setPlaying(false);
              }
            } else if (state === window.YT.PlayerState.ENDED) {
              handleBgmEnded();
            }
          },
          onError: () => {
            if (!unmounted && currentTrackRef.current === 'bgm') {
              setPlaybackError(true);
            }
          },
        },
      });
    };

    void setupPlayers();

    // Fallback: start on first user interaction gesture if autoplay was prevented
    const handleFirstGesture = () => {
      if (!sequenceStartedRef.current) {
        startCurrentTrack();
      }
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('keydown',     handleFirstGesture, { once: true });
    window.addEventListener('touchstart',  handleFirstGesture, { once: true, passive: true });

    return () => {
      unmounted = true;
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown',     handleFirstGesture);
      window.removeEventListener('touchstart',  handleFirstGesture);

      try {
        welcomePlayerRef.current?.destroy();
        bgmPlayerRef.current?.destroy();
      } catch {}
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlayback = () => {
    if (playing) {
      try {
        if (track === 'welcome') {
          welcomePlayerRef.current?.pauseVideo();
        } else {
          bgmPlayerRef.current?.pauseVideo();
        }
      } catch {}
      setPlaying(false);
      return;
    }

    startCurrentTrack();
  };

  const handleMuteToggle = () => {
    setMuted((prev) => {
      const next = !prev;
      if (!next && volumePercent === 0) {
        setVolumePercent(20);
      }
      return next;
    });
  };

  return (
    <>
      {/* Hidden off-screen containers for YouTube IFrame players */}
      <div
        aria-hidden="true"
        className="fixed -left-[9999px] -top-[9999px] h-px w-px opacity-0 pointer-events-none"
        style={{ zIndex: -1 }}
      >
        <div id="katinawan-yt-welcome" />
        <div id="katinawan-yt-bgm" />
      </div>

      <div className="fixed bottom-4 left-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full bg-[#142A21]/95 px-3 py-2 text-white shadow-lg backdrop-blur">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={
            playing
              ? 'Pause audio'
              : sequenceStartedRef.current
              ? 'Resume audio'
              : 'Start audio'
          }
          title={playing ? 'Pause audio' : 'Start audio'}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        <button
          type="button"
          onClick={handleMuteToggle}
          aria-label={muted || volumePercent === 0 ? 'Unmute audio' : 'Mute audio'}
          title={muted || volumePercent === 0 ? 'Unmute audio' : 'Mute audio'}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          {muted || volumePercent === 0 ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </button>

        <label className="flex items-center gap-2 cursor-pointer">
          <span className="sr-only">Audio volume</span>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
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
          <span role="status" className="sr-only">
            Audio could not play. Use the play button to retry.
          </span>
        )}
      </div>
    </>
=======
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
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
  );
}
