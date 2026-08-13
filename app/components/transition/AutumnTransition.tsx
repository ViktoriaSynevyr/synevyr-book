"use client";

import TransitionOverlay from "./TransitionOverlay";

const autumnLeaves = [
  { top: "16%", delay: "0s", duration: "1.05s", size: 22, variant: "one" },
  { top: "26%", delay: "0.06s", duration: "1.12s", size: 30, variant: "two" },
  { top: "38%", delay: "0.14s", duration: "1.02s", size: 18, variant: "three" },
  { top: "48%", delay: "0.03s", duration: "1.18s", size: 26, variant: "four" },
  { top: "59%", delay: "0.18s", duration: "1.08s", size: 24, variant: "five" },
  { top: "70%", delay: "0.1s", duration: "1.14s", size: 20, variant: "six" },
  { top: "80%", delay: "0.22s", duration: "1.04s", size: 28, variant: "seven" },
  { top: "88%", delay: "0.08s", duration: "1.16s", size: 17, variant: "eight" },
];

export default function AutumnTransition() {
  return (
    <TransitionOverlay tone="warm">
      {autumnLeaves.map((leaf, index) => (
        <span
          key={index}
          className={"autumn-leaf leaf-" + leaf.variant}
          style={{
            top: leaf.top,
            width: leaf.size,
            height: leaf.size * 0.66,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
          }}
        >
          <span className="leaf-vein" />
        </span>
      ))}

      <style jsx>{`
        .autumn-leaf {
          position: absolute;
          left: -70px;
          display: block;
          opacity: 0;
          border-radius: 90% 15% 90% 15%;
          transform-origin: center;
          background: linear-gradient(
            135deg,
            #d98324 0%,
            #a84418 48%,
            #713015 100%
          );
          box-shadow:
            inset 2px 2px 4px rgba(255, 220, 150, 0.2),
            0 6px 10px rgba(0, 0, 0, 0.28);
          animation-name: leaf-swirl;
          animation-timing-function: cubic-bezier(0.4, 0, 0.25, 1);
          animation-fill-mode: forwards;
          will-change: transform, opacity;
        }

        .autumn-leaf::after {
          content: "";
          position: absolute;
          right: -7px;
          top: 45%;
          width: 10px;
          height: 2px;
          border-radius: 999px;
          background: #6d2d13;
          transform: rotate(16deg);
          transform-origin: left center;
        }

        .leaf-vein {
          position: absolute;
          left: 47%;
          top: 12%;
          width: 1px;
          height: 76%;
          background: rgba(92, 35, 14, 0.55);
          transform: rotate(-42deg);
        }

        .leaf-two,
        .leaf-five {
          background: linear-gradient(
            135deg,
            #e0a02e 0%,
            #b65d17 50%,
            #793114 100%
          );
          animation-name: leaf-swirl-high;
        }

        .leaf-three,
        .leaf-seven {
          background: linear-gradient(
            135deg,
            #c96f22 0%,
            #91371a 55%,
            #5c2715 100%
          );
          animation-name: leaf-swirl-low;
        }

        .leaf-four,
        .leaf-eight {
          transform: scaleX(-1);
        }

        @keyframes leaf-swirl {
          0% {
            opacity: 0;
            transform: translate3d(-8vw, 35px, 0) rotate(0deg) scale(0.65);
          }

          14% {
            opacity: 0.95;
          }

          34% {
            transform: translate3d(28vw, -110px, 0) rotate(230deg) scale(1);
          }

          58% {
            transform: translate3d(54vw, 75px, 0) rotate(490deg) scale(0.88);
          }

          79% {
            transform: translate3d(78vw, -65px, 0) rotate(720deg) scale(0.74);
          }

          100% {
            opacity: 0;
            transform: translate3d(114vw, 22px, 0) rotate(980deg) scale(0.52);
          }
        }

        @keyframes leaf-swirl-high {
          0% {
            opacity: 0;
            transform: translate3d(-10vw, 90px, 0) rotate(20deg) scale(0.6);
          }

          16% {
            opacity: 1;
          }

          38% {
            transform: translate3d(32vw, -190px, 0) rotate(-280deg)
              scale(1.08);
          }
              66% {
            transform: translate3d(65vw, 40px, 0) rotate(-610deg) scale(0.82);
          }

          100% {
            opacity: 0;
            transform: translate3d(116vw, -120px, 0) rotate(-980deg)
              scale(0.5);
          }
        }

        @keyframes leaf-swirl-low {
          0% {
            opacity: 0;
            transform: translate3d(-8vw, -50px, 0) rotate(-15deg) scale(0.7);
          }

          15% {
            opacity: 0.95;
          }

          42% {
            transform: translate3d(38vw, 145px, 0) rotate(320deg) scale(1);
          }

          70% {
            transform: translate3d(73vw, -55px, 0) rotate(660deg) scale(0.8);
          }

          100% {
            opacity: 0;
            transform: translate3d(115vw, 100px, 0) rotate(990deg) scale(0.48);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .autumn-leaf {
            display: none;
          }
        }
      `}</style>
    </TransitionOverlay>
  );
}