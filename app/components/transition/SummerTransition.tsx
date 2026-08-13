"use client";

import TransitionOverlay from "./TransitionOverlay";

const leaves = [
  { top: "18%", delay: "0s", size: 24, variant: "one" },
  { top: "29%", delay: "0.06s", size: 18, variant: "two" },
  { top: "42%", delay: "0.12s", size: 28, variant: "three" },
  { top: "56%", delay: "0.03s", size: 21, variant: "four" },
  { top: "68%", delay: "0.17s", size: 25, variant: "five" },
  { top: "81%", delay: "0.09s", size: 19, variant: "six" },
];

const lightParticles = [
  { left: "12%", top: "24%", delay: "0s" },
  { left: "27%", top: "62%", delay: "0.12s" },
  { left: "43%", top: "34%", delay: "0.05s" },
  { left: "58%", top: "72%", delay: "0.18s" },
  { left: "74%", top: "28%", delay: "0.09s" },
  { left: "88%", top: "58%", delay: "0.15s" },
];

export default function SummerTransition() {
  return (
    <TransitionOverlay tone="light">
      <div className="summer-glow" />

      {leaves.map((leaf, index) => (
        <span
          key={index}
          className={"summer-leaf summer-leaf-" + leaf.variant}
          style={{
            top: leaf.top,
            width: leaf.size,
            height: leaf.size * 0.62,
            animationDelay: leaf.delay,
          }}
        >
          <span className="leaf-vein" />
        </span>
      ))}

      {lightParticles.map((particle, index) => (
        <span
          key={"light-" + index}
          className="sun-particle"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
          }}
        />
      ))}

      <style jsx>{`
        .summer-glow {
          position: absolute;
          inset: -20%;
          background: radial-gradient(
            circle at 45% 40%,
            rgba(255, 229, 153, 0.16),
            rgba(255, 229, 153, 0.04) 28%,
            transparent 58%
          );
          opacity: 0;
          animation: summer-glow 1.05s ease-in-out forwards;
        }

        .summer-leaf {
          position: absolute;
          left: -70px;
          display: block;
          opacity: 0;
          border-radius: 85% 18% 85% 18%;
          transform-origin: center;
          background: linear-gradient(
            135deg,
            #7fbf4d 0%,
            #3f7e32 48%,
            #1f4f28 100%
          );
          box-shadow:
            inset 2px 2px 4px rgba(224, 255, 188, 0.24),
            0 6px 10px rgba(0, 0, 0, 0.24);
          animation: summer-leaf-swirl 1.05s
            cubic-bezier(0.4, 0, 0.25, 1) forwards;
          will-change: transform, opacity;
        }

        .summer-leaf::after {
          content: "";
          position: absolute;
          right: -7px;
          top: 45%;
          width: 10px;
          height: 2px;
          border-radius: 999px;
          background: #315f2a;
          transform: rotate(14deg);
          transform-origin: left center;
        }

        .leaf-vein {
          position: absolute;
          left: 47%;
          top: 12%;
          width: 1px;
          height: 76%;
          background: rgba(31, 79, 40, 0.55);
          transform: rotate(-42deg);
        }

        .summer-leaf-two,
        .summer-leaf-five {
          background: linear-gradient(
            135deg,
            #9fd26b 0%,
            #548f3d 52%,
            #28582f 100%
          );
          animation-name: summer-leaf-high;
        }

        .summer-leaf-three,
        .summer-leaf-six {
          animation-name: summer-leaf-low;
        }

        .sun-particle {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: rgba(255, 238, 173, 0.95);
          box-shadow:
            0 0 8px rgba(255, 230, 145, 0.9),
            0 0 18px rgba(255, 221, 112, 0.45);
          opacity: 0;
          animation: sun-drift 1.05s ease-in-out forwards;
        }

        @keyframes summer-leaf-swirl {
          0% {
            opacity: 0;
            transform: translate3d(-8vw, 30px, 0)
              rotate(0deg)
              scale(0.65);
          }

          15% {
          opacity: 0.95;
          }

          36% {
            transform: translate3d(30vw, -95px, 0)
              rotate(210deg)
              scale(1);
          }

          62% {
            transform: translate3d(58vw, 70px, 0)
              rotate(470deg)
              scale(0.86);
          }

          100% {
            opacity: 0;
            transform: translate3d(114vw, -15px, 0)
              rotate(880deg)
              scale(0.52);
          }
        }

        @keyframes summer-leaf-high {
          0% {
            opacity: 0;
            transform: translate3d(-10vw, 80px, 0)
              rotate(15deg)
              scale(0.6);
          }

          17% {
            opacity: 1;
          }

          42% {
            transform: translate3d(36vw, -175px, 0)
              rotate(-270deg)
              scale(1.08);
          }

          70% {
            transform: translate3d(72vw, 35px, 0)
              rotate(-590deg)
              scale(0.8);
          }

          100% {
            opacity: 0;
            transform: translate3d(116vw, -90px, 0)
              rotate(-930deg)
              scale(0.5);
          }
        }

        @keyframes summer-leaf-low {
          0% {
            opacity: 0;
            transform: translate3d(-8vw, -40px, 0)
              rotate(-10deg)
              scale(0.7);
          }

          15% {
            opacity: 0.95;
          }

          43% {
            transform: translate3d(40vw, 125px, 0)
              rotate(300deg)
              scale(1);
          }

          72% {
            transform: translate3d(76vw, -45px, 0)
              rotate(640deg)
              scale(0.78);
          }

          100% {
            opacity: 0;
            transform: translate3d(115vw, 85px, 0)
              rotate(950deg)
              scale(0.48);
          }
        }

        @keyframes sun-drift {
          0% {
            opacity: 0;
            transform: translate3d(-35px, 25px, 0) scale(0.5);
          }

          30% {
            opacity: 1;
          }

          70% {
            opacity: 0.85;
          }

          100% {
            opacity: 0;
            transform: translate3d(90px, -45px, 0) scale(1.25);
          }
        }

        @keyframes summer-glow {
          0% {
            opacity: 0;
            transform: translateX(-8%) scale(0.95);
          }

          40% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translateX(10%) scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .summer-leaf,
          .sun-particle,
          .summer-glow {
            display: none;
          }
        }
      `}</style>
    </TransitionOverlay>
  );
}