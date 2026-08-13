"use client";

import TransitionOverlay from "./TransitionOverlay";

const petals = [
  { top: "14%", delay: "0s", size: 20, variant: "one" },
  { top: "24%", delay: "0.05s", size: 15, variant: "two" },
  { top: "35%", delay: "0.12s", size: 23, variant: "three" },
  { top: "47%", delay: "0.02s", size: 18, variant: "four" },
  { top: "58%", delay: "0.16s", size: 21, variant: "five" },
  { top: "69%", delay: "0.08s", size: 16, variant: "six" },
  { top: "79%", delay: "0.2s", size: 24, variant: "seven" },
  { top: "88%", delay: "0.1s", size: 14, variant: "eight" },
];

const springLights = [
  { left: "10%", top: "28%", delay: "0s" },
  { left: "25%", top: "68%", delay: "0.11s" },
  { left: "40%", top: "31%", delay: "0.05s" },
  { left: "56%", top: "75%", delay: "0.17s" },
  { left: "72%", top: "25%", delay: "0.08s" },
  { left: "87%", top: "60%", delay: "0.14s" },
];

export default function SpringTransition() {
  return (
    <TransitionOverlay tone="light">
      <div className="spring-haze" />

      {petals.map((petal, index) => (
        <span
          key={index}
          className={"spring-petal spring-petal-" + petal.variant}
          style={{
            top: petal.top,
            width: petal.size,
            height: petal.size * 0.7,
            animationDelay: petal.delay,
          }}
        >
          <span className="petal-vein" />
        </span>
      ))}

      {springLights.map((particle, index) => (
        <span
          key={"spring-light-" + index}
          className="spring-light"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
          }}
        />
      ))}

      <style jsx>{`
        .spring-haze {
          position: absolute;
          inset: -20%;
          background: radial-gradient(
            circle at 48% 42%,
            rgba(255, 225, 235, 0.18),
            rgba(255, 235, 220, 0.06) 30%,
            transparent 62%
          );
          opacity: 0;
          filter: blur(7px);
          animation: spring-haze 1.05s ease-in-out forwards;
        }

        .spring-petal {
          position: absolute;
          left: -60px;
          display: block;
          opacity: 0;
          border-radius: 90% 30% 90% 30%;
          transform-origin: center;
          background: linear-gradient(
            135deg,
            #ffd6e4 0%,
            #f7a9c0 52%,
            #d96b91 100%
          );
          box-shadow:
            inset 1px 1px 4px rgba(255, 255, 255, 0.45),
            0 5px 9px rgba(79, 24, 45, 0.18);
          animation: petal-swirl 1.05s
            cubic-bezier(0.4, 0, 0.25, 1) forwards;
          will-change: transform, opacity;
        }

        .petal-vein {
          position: absolute;
          left: 49%;
          top: 10%;
          width: 1px;
          height: 78%;
          background: rgba(175, 75, 110, 0.38);
          transform: rotate(-35deg);
        }

        .spring-petal-two,
        .spring-petal-five {
          background: linear-gradient(
            135deg,
            #ffe2eb 0%,
            #f8b6cb 52%,
            #dd789c 100%
          );
          animation-name: petal-swirl-high;
        }

        .spring-petal-three,
        .spring-petal-seven {
          animation-name: petal-swirl-low;
        }

        .spring-petal-four,
        .spring-petal-eight {
          transform: scaleX(-1);
        }

        .spring-light {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: rgba(255, 241, 218, 0.95);
          box-shadow:
            0 0 8px rgba(255, 228, 196, 0.9),
            0 0 18px rgba(255, 205, 180, 0.45);
          opacity: 0;
          animation: spring-light-drift 1.05s ease-in-out forwards;
        }

        @keyframes petal-swirl {
          0% {
            opacity: 0;
            transform: translate3d(-8vw, 20px, 0)
              rotate(0deg)
              scale(0.65);
          }

          16% {
            opacity: 0.95;
          }

          36% {
          transform: translate3d(30vw, -85px, 0)
              rotate(190deg)
              scale(1);
          }

          62% {
            transform: translate3d(58vw, 65px, 0)
              rotate(430deg)
              scale(0.88);
          }

          100% {
            opacity: 0;
            transform: translate3d(114vw, -10px, 0)
              rotate(820deg)
              scale(0.52);
          }
        }

        @keyframes petal-swirl-high {
          0% {
            opacity: 0;
            transform: translate3d(-10vw, 75px, 0)
              rotate(12deg)
              scale(0.6);
          }

          17% {
            opacity: 1;
          }

          42% {
            transform: translate3d(35vw, -165px, 0)
              rotate(-250deg)
              scale(1.05);
          }

          70% {
            transform: translate3d(71vw, 30px, 0)
              rotate(-560deg)
              scale(0.8);
          }

          100% {
            opacity: 0;
            transform: translate3d(116vw, -85px, 0)
              rotate(-900deg)
              scale(0.48);
          }
        }

        @keyframes petal-swirl-low {
          0% {
            opacity: 0;
            transform: translate3d(-8vw, -35px, 0)
              rotate(-10deg)
              scale(0.7);
          }

          15% {
            opacity: 0.95;
          }

          43% {
            transform: translate3d(40vw, 115px, 0)
              rotate(280deg)
              scale(1);
          }

          72% {
            transform: translate3d(76vw, -40px, 0)
              rotate(610deg)
              scale(0.78);
          }

          100% {
            opacity: 0;
            transform: translate3d(115vw, 78px, 0)
              rotate(920deg)
              scale(0.46);
          }
        }

        @keyframes spring-light-drift {
          0% {
            opacity: 0;
            transform: translate3d(-30px, 20px, 0) scale(0.5);
          }

          30% {
            opacity: 1;
          }

          70% {
            opacity: 0.85;
          }

          100% {
            opacity: 0;
            transform: translate3d(85px, -40px, 0) scale(1.2);
          }
        }

        @keyframes spring-haze {
          0% {
            opacity: 0;
            transform: translateX(-8%) scale(0.95);
          }

          42% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translateX(10%) scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .spring-petal,
          .spring-light,
          .spring-haze {
            display: none;
          }
        }
      `}</style>
    </TransitionOverlay>
  );
}