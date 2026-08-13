"use client";

import TransitionOverlay from "./TransitionOverlay";

const snowflakes = [
  { top: "12%", delay: "0s", size: 8, variant: "one" },
  { top: "21%", delay: "0.04s", size: 13, variant: "two" },
  { top: "31%", delay: "0.1s", size: 7, variant: "three" },
  { top: "42%", delay: "0.02s", size: 11, variant: "four" },
  { top: "53%", delay: "0.14s", size: 9, variant: "five" },
  { top: "64%", delay: "0.07s", size: 14, variant: "six" },
  { top: "74%", delay: "0.18s", size: 8, variant: "seven" },
  { top: "84%", delay: "0.11s", size: 12, variant: "eight" },
  { top: "90%", delay: "0.2s", size: 6, variant: "nine" },
];

const iceDust = [
  { left: "11%", top: "30%", delay: "0s" },
  { left: "24%", top: "68%", delay: "0.08s" },
  { left: "38%", top: "22%", delay: "0.15s" },
  { left: "51%", top: "76%", delay: "0.04s" },
  { left: "66%", top: "37%", delay: "0.12s" },
  { left: "79%", top: "63%", delay: "0.18s" },
  { left: "91%", top: "26%", delay: "0.07s" },
];

export default function WinterTransition() {
  return (
    <TransitionOverlay tone="cold">
      <div className="winter-haze" />

      {snowflakes.map((flake, index) => (
        <span
          key={index}
          className={"snowflake snowflake-" + flake.variant}
          style={{
            top: flake.top,
            width: flake.size,
            height: flake.size,
            animationDelay: flake.delay,
          }}
        />
      ))}

      {iceDust.map((particle, index) => (
        <span
          key={"dust-" + index}
          className="ice-dust"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
          }}
        />
      ))}

      <style jsx>{`
        .winter-haze {
          position: absolute;
          inset: -20%;
          background:
            radial-gradient(
              circle at 52% 45%,
              rgba(210, 235, 255, 0.16),
              rgba(210, 235, 255, 0.04) 30%,
              transparent 62%
            );
          opacity: 0;
          filter: blur(8px);
          animation: winter-haze 1.05s ease-in-out forwards;
        }

        .snowflake {
          position: absolute;
          left: -50px;
          display: block;
          border-radius: 999px;
          background: rgba(238, 248, 255, 0.95);
          box-shadow:
            0 0 8px rgba(215, 239, 255, 0.9),
            0 0 18px rgba(194, 226, 255, 0.45);
          opacity: 0;
          animation: snow-whirl 1.05s
            cubic-bezier(0.35, 0, 0.25, 1) forwards;
          will-change: transform, opacity;
        }

        .snowflake::before,
        .snowflake::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 170%;
          height: 1px;
          background: rgba(238, 248, 255, 0.8);
          transform-origin: center;
        }

        .snowflake::before {
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .snowflake::after {
          transform: translate(-50%, -50%) rotate(-45deg);
        }

        .snowflake-two,
        .snowflake-six,
        .snowflake-nine {
          animation-name: snow-whirl-high;
        }

        .snowflake-three,
        .snowflake-seven {
          animation-name: snow-whirl-low;
        }

        .ice-dust {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(224, 243, 255, 0.9);
          box-shadow:
            0 0 7px rgba(218, 239, 255, 0.9),
            0 0 15px rgba(197, 226, 255, 0.55);
          opacity: 0;
          animation: ice-drift 1.05s ease-in-out forwards;
        }

        @keyframes snow-whirl {
          0% {
            opacity: 0;
            transform: translate3d(-8vw, 25px, 0)
              rotate(0deg)
              scale(0.55);
          }

          14% {
            opacity: 1;
          }

          33% {
            transform: translate3d(27vw, -120px, 0)
              rotate(220deg)
              scale(1);
          }
              58% {
            transform: translate3d(55vw, 85px, 0)
              rotate(500deg)
              scale(0.82);
          }

          79% {
            transform: translate3d(80vw, -70px, 0)
              rotate(760deg)
              scale(0.7);
          }

          100% {
            opacity: 0;
            transform: translate3d(116vw, 15px, 0)
              rotate(1040deg)
              scale(0.45);
          }
        }

        @keyframes snow-whirl-high {
          0% {
            opacity: 0;
            transform: translate3d(-10vw, 95px, 0)
              rotate(15deg)
              scale(0.5);
          }

          16% {
            opacity: 1;
          }

          39% {
            transform: translate3d(34vw, -205px, 0)
              rotate(-300deg)
              scale(1.08);
          }

          68% {
            transform: translate3d(69vw, 38px, 0)
              rotate(-640deg)
              scale(0.78);
          }

          100% {
            opacity: 0;
            transform: translate3d(117vw, -125px, 0)
              rotate(-1000deg)
              scale(0.42);
          }
        }

        @keyframes snow-whirl-low {
          0% {
            opacity: 0;
            transform: translate3d(-8vw, -45px, 0)
              rotate(-20deg)
              scale(0.6);
          }

          15% {
            opacity: 0.95;
          }

          43% {
            transform: translate3d(40vw, 145px, 0)
              rotate(340deg)
              scale(0.98);
          }

          72% {
            transform: translate3d(76vw, -55px, 0)
              rotate(690deg)
              scale(0.72);
          }

          100% {
            opacity: 0;
            transform: translate3d(116vw, 95px, 0)
              rotate(990deg)
              scale(0.4);
          }
        }

        @keyframes ice-drift {
          0% {
            opacity: 0;
            transform: translate3d(-45px, 30px, 0) scale(0.5);
          }

          28% {
            opacity: 1;
          }

          72% {
            opacity: 0.9;
          }

          100% {
            opacity: 0;
            transform: translate3d(110px, -65px, 0) scale(1.35);
          }
        }

        @keyframes winter-haze {
          0% {
            opacity: 0;
            transform: translateX(-10%) scale(0.94);
          }

          42% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translateX(12%) scale(1.1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .snowflake,
          .ice-dust,
          .winter-haze {
            display: none;
          }
        }
      `}</style>
    </TransitionOverlay>
  );
}