import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface IndustrialVideoProps {
  src?: string;
  posterUrl?: string;
  className?: string;
  overlayOpacity?: number;
  label?: string;
  showStatusBadge?: boolean;
}

export const IndustrialVideo: React.FC<IndustrialVideoProps> = ({
  src,
  posterUrl,
  className = '',
  overlayOpacity = 0.65,
  label = 'FEED 01 // ASU CRYOGENICS',
  showStatusBadge = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls: Hls | null = null;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay policy prevented playback, graceful fallback to poster & canvas
          });
      }
    };

    if (src.includes('.m3u8')) {
      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          playVideo();
        });
        hls.on(Hls.Events.ERROR, () => {
          setHasError(true);
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          playVideo();
        });
      }
    } else {
      video.src = src;
      playVideo();
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  // Ambient cryogenic particle and flow simulation on canvas for dramatic industrial atmosphere
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      phase: number;
    }

    const count = 45;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.3 - Math.random() * 0.5, // Slow upward cryogenic vapor drift
      size: Math.random() * 2.5 + 0.8,
      alpha: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Subtle atmospheric scanlines & cryogenic vapor trails
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time + p.phase) * 0.2;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.35})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      {/* Real industrial video with grayscale contrast filter */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={posterUrl}
        onError={() => setHasError(true)}
        className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75 scale-[1.02] pointer-events-none transition-opacity duration-1000"
        style={{ opacity: hasError ? 0.3 : 0.85 }}
      />

      {/* Cryogenic mist/vapor canvas layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-60"
      />

      {/* Subtle technical grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Subtle film grain texture effect */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Dynamic black overlay to guarantee readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />

      {/* Optional technical badge */}
      {showStatusBadge && (
        <div className="absolute top-6 left-6 z-10 flex items-center space-x-2 text-[10px] tracking-widest uppercase font-mono text-white/50 border border-white/10 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>{label}</span>
          <span className="text-white/30">•</span>
          <span>99.9% MONITOR</span>
        </div>
      )}
    </div>
  );
};
