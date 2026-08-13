"use client";

import type { ReactNode } from "react";

type TransitionOverlayProps = {
  children: ReactNode;
  tone?: "warm" | "cold" | "light";
};

export default function TransitionOverlay({
  children,
  tone = "warm",
}: TransitionOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={"transition-overlay tone-" + tone}
    >
      <div className="transition-shadow" />

      <div className="wind-stream wind-stream-one" />
      <div className="wind-stream wind-stream-two" />

      <div className="transition-particles">
        {children}
      </div>

      <style jsx>{`
        .transition-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;
          pointer-events: none;
          perspective: 1200px;
        }

        .transition-shadow {
          position: absolute;
          inset: 0;
          animation: transition-dim 1.05s ease-in-out forwards;
        }

        .tone-warm .transition-shadow {
          background: rgba(24, 11, 4, 0);
        }

        .tone-cold .transition-shadow {
          background: rgba(4, 12, 22, 0);
        }

        .tone-light .transition-shadow {
          background: rgba(245, 240, 225, 0);
        }

        .wind-stream {
          position: absolute;
          left: -30%;
          width: 160%;
          height: 90px;
          border-radius: 999px;
          opacity: 0;
          filter: blur(22px);
        }

        .tone-warm .wind-stream {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 218, 155, 0.03),
            rgba(255, 218, 155, 0.12),
            rgba(255, 218, 155, 0.03),
            transparent
          );
        }

        .tone-cold .wind-stream {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(205, 232, 255, 0.03),
            rgba(205, 232, 255, 0.15),
            rgba(205, 232, 255, 0.03),
            transparent
          );
        }

        .tone-light .wind-stream {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 245, 225, 0.04),
            rgba(255, 245, 225, 0.16),
            rgba(255, 245, 225, 0.04),
            transparent
          );
        }

        .wind-stream-one {
          top: 33%;
          animation: wind-stream-one 1.05s ease-in-out forwards;
        }

        .wind-stream-two {
          top: 61%;
          animation: wind-stream-two 1.05s 0.08s ease-in-out forwards;
        }

        .transition-particles {
          position: absolute;
          inset: 0;
        }

        @keyframes wind-stream-one {
          0% {
            opacity: 0;
            transform: translateX(-22%) rotate(-8deg) scaleX(0.75);
          }

          35% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translateX(24%) rotate(4deg) scaleX(1.08);
          }
        }

        @keyframes wind-stream-two {
          0% {
            opacity: 0;
            transform: translateX(-25%) rotate(7deg) scaleX(0.8);
          }

          40% {
            opacity: 0.9;
          }

          100% {
            opacity: 0;
            transform: translateX(22%) rotate(-4deg) scaleX(1.05);
          }
        }

        @keyframes transition-dim {
          0% {
            opacity: 0;
          }

          45% {
            opacity: 1;
          }

          100% {
            opacity: 1;
          }
        }

        .tone-warm .transition-shadow {
          animation-name: warm-dim;
        }

        .tone-cold .transition-shadow {
          animation-name: cold-dim;
        }

        .tone-light .transition-shadow {
          animation-name: light-dim;
        }

        @keyframes warm-dim {
          0% {
            background: rgba(24, 11, 4, 0);
          }

          55% {
            background: rgba(24, 11, 4, 0.12);
          }

          100% {
            background: rgba(24, 11, 4, 0.28);
          }
        }
          @keyframes cold-dim {
          0% {
            background: rgba(4, 12, 22, 0);
          }

          55% {
            background: rgba(4, 12, 22, 0.14);
          }

          100% {
            background: rgba(4, 12, 22, 0.32);
          }
        }

        @keyframes light-dim {
          0% {
            background: rgba(245, 240, 225, 0);
          }

          55% {
            background: rgba(245, 240, 225, 0.05);
          }

          100% {
            background: rgba(245, 240, 225, 0.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wind-stream,
          .transition-shadow {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}