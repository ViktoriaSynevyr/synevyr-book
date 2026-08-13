"use client";

import type {
  CSSProperties,
  MouseEvent,
  ReactNode,
} from "react";
import { useEffect, useState } from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";

export type Season =
  | "summer"
  | "autumn"
  | "winter"
  | "spring";

type SeasonLinkProps = {
  href: string;
  season: Season;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

type LeafParticle = {
  top: string;
  delay: string;
  size: number;
  path: "normal" | "high" | "low";
};

type LightParticle = {
  left: string;
  top: string;
  delay: string;
  size: number;
};

const TRANSITION_DURATION = 1100;

const summerLeaves: LeafParticle[] = [
  { top: "13%", delay: "0s", size: 28, path: "normal" },
  { top: "25%", delay: "0.05s", size: 22, path: "high" },
  { top: "38%", delay: "0.12s", size: 31, path: "low" },
  { top: "51%", delay: "0.03s", size: 25, path: "normal" },
  { top: "64%", delay: "0.16s", size: 30, path: "high" },
  { top: "77%", delay: "0.08s", size: 22, path: "low" },
  { top: "88%", delay: "0.2s", size: 27, path: "normal" },
];

const autumnLeaves: LeafParticle[] = [
  { top: "14%", delay: "0s", size: 23, path: "normal" },
  { top: "25%", delay: "0.06s", size: 30, path: "high" },
  { top: "37%", delay: "0.14s", size: 19, path: "low" },
  { top: "49%", delay: "0.03s", size: 27, path: "normal" },
  { top: "61%", delay: "0.18s", size: 24, path: "high" },
  { top: "72%", delay: "0.1s", size: 21, path: "normal" },
  { top: "82%", delay: "0.22s", size: 28, path: "low" },
  { top: "90%", delay: "0.08s", size: 18, path: "normal" },
];

const snowflakes: LeafParticle[] = [
  { top: "10%", delay: "0s", size: 9, path: "normal" },
  { top: "20%", delay: "0.04s", size: 14, path: "high" },
  { top: "30%", delay: "0.1s", size: 8, path: "low" },
  { top: "41%", delay: "0.02s", size: 12, path: "normal" },
  { top: "52%", delay: "0.14s", size: 10, path: "high" },
  { top: "63%", delay: "0.07s", size: 15, path: "normal" },
  { top: "74%", delay: "0.18s", size: 9, path: "low" },
  { top: "84%", delay: "0.11s", size: 13, path: "high" },
  { top: "92%", delay: "0.2s", size: 7, path: "normal" },
];

const springPetals: LeafParticle[] = [
  { top: "12%", delay: "0s", size: 22, path: "normal" },
  { top: "24%", delay: "0.05s", size: 17, path: "high" },
  { top: "36%", delay: "0.12s", size: 25, path: "low" },
  { top: "48%", delay: "0.02s", size: 19, path: "normal" },
  { top: "60%", delay: "0.16s", size: 23, path: "high" },
  { top: "71%", delay: "0.08s", size: 17, path: "normal" },
  { top: "82%", delay: "0.2s", size: 25, path: "low" },
  { top: "90%", delay: "0.1s", size: 15, path: "normal" },
];

const summerLights: LightParticle[] = [
  { left: "9%", top: "22%", delay: "0s", size: 6 },
  { left: "21%", top: "69%", delay: "0.1s", size: 5 },
  { left: "36%", top: "34%", delay: "0.04s", size: 7 },
  { left: "51%", top: "75%", delay: "0.15s", size: 5 },
  { left: "66%", top: "25%", delay: "0.08s", size: 7 },
  { left: "80%", top: "62%", delay: "0.13s", size: 6 },
  { left: "92%", top: "37%", delay: "0.03s", size: 5 },
];

const winterDust: LightParticle[] = [
  { left: "10%", top: "28%", delay: "0s", size: 4 },
  { left: "24%", top: "68%", delay: "0.08s", size: 5 },
  { left: "38%", top: "22%", delay: "0.15s", size: 4 },
  { left: "52%", top: "76%", delay: "0.04s", size: 5 },
  { left: "66%", top: "37%", delay: "0.12s", size: 4 },
  { left: "80%", top: "63%", delay: "0.18s", size: 5 },
  { left: "92%", top: "26%", delay: "0.07s", size: 4 },
];

const springLights: LightParticle[] = [
  { left: "10%", top: "27%", delay: "0s", size: 5 },
  { left: "25%", top: "68%", delay: "0.11s", size: 5 },
  { left: "40%", top: "31%", delay: "0.05s", size: 6 },
  { left: "56%", top: "75%", delay: "0.17s", size: 5 },
  { left: "72%", top: "25%", delay: "0.08s", size: 6 },
  { left: "87%", top: "60%", delay: "0.14s", size: 5 },
];

export default function SeasonLink({
  href,
  season,
  children,
  style,
  className,
}: SeasonLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTurning, setIsTurning] = useState(false);

  useEffect(() => {
    setIsTurning(false);
  }, [pathname]);

  function handleClick(
    event: MouseEvent<HTMLAnchorElement>
  ) {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (isTurning) {
      return;
    }

    setIsTurning(true);

    window.setTimeout(() => {
      router.push(href);
    }, TRANSITION_DURATION);
  }

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        style={style}
        className={className}
        aria-disabled={isTurning}
      >
        {children}
      </a>

      {isTurning && season === "summer" && (
        <div
          aria-hidden="true"
          className="season-overlay summer-overlay"
        >
          <div className="season-tint summer-tint" />
          <div className="season-glow summer-glow" />
          <div className="wind-stream wind-one" />
          <div className="wind-stream wind-two" />

          {summerLeaves.map((leaf, index) => (
            <span
              key={"summer-" + index}
              className={
                "season-particle summer-leaf path-" +
                leaf.path
              }
              style={{
                top: leaf.top,
                width: leaf.size,
                height: leaf.size * 0.64,
                animationDelay: leaf.delay,
              }}
            >
              <span className="summer-vein" />
            </span>
          ))}

          {summerLights.map((light, index) => (
            <span
              key={"summer-light-" + index}
              className="light-particle summer-light"
              style={{
                left: light.left,
                top: light.top,
                width: light.size,
                height: light.size,
                animationDelay: light.delay,
              }}
            />
          ))}
        </div>
      )}

      {isTurning && season === "autumn" && (
        <div
          aria-hidden="true"
          className="season-overlay autumn-overlay"
        >
          <div className="season-tint autumn-tint" />
          <div className="season-glow autumn-glow" />
          <div className="wind-stream wind-one" />
          <div className="wind-stream wind-two" />

          {autumnLeaves.map((leaf, index) => (
            <span
              key={"autumn-" + index}
              className={
                "season-particle autumn-leaf path-" +
                leaf.path
              }
              style={{
                top: leaf.top,
                width: leaf.size,
                height: leaf.size * 0.66,
                animationDelay: leaf.delay,
              }}
            >
              <span className="autumn-vein" />
            </span>
          ))}
        </div>
      )}

      {isTurning && season === "winter" && (
        <div
          aria-hidden="true"
          className="season-overlay winter-overlay"
        >
          <div className="season-tint winter-tint" />
          <div className="season-glow winter-glow" />
          <div className="wind-stream wind-one" />
          <div className="wind-stream wind-two" />

          {snowflakes.map((flake, index) => (
            <span
              key={"snow-" + index}
              className={
                "season-particle snowflake path-" +
                flake.path
              }
              style={{
                top: flake.top,
                width: flake.size,
                height: flake.size,
                animationDelay: flake.delay,
              }}
            />
          ))}

          {winterDust.map((dust, index) => (
            <span
              key={"winter-dust-" + index}
              className="light-particle winter-dust"
              style={{
                left: dust.left,
                top: dust.top,
                width: dust.size,
                height: dust.size,
                animationDelay: dust.delay,
              }}
              />
          ))}
        </div>
      )}

      {isTurning && season === "spring" && (
        <div
          aria-hidden="true"
          className="season-overlay spring-overlay"
        >
          <div className="season-tint spring-tint" />
          <div className="season-glow spring-glow" />
          <div className="wind-stream wind-one" />
          <div className="wind-stream wind-two" />

          {springPetals.map((petal, index) => (
            <span
              key={"petal-" + index}
              className={
                "season-particle spring-petal path-" +
                petal.path
              }
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

          {springLights.map((light, index) => (
            <span
              key={"spring-light-" + index}
              className="light-particle spring-light"
              style={{
                left: light.left,
                top: light.top,
                width: light.size,
                height: light.size,
                animationDelay: light.delay,
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .season-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;
          pointer-events: none;
        }

        .season-tint,
        .season-glow {
          position: absolute;
          inset: 0;
        }

        .season-glow {
          inset: -20%;
          opacity: 0;
          animation: glow-sweep 1.1s ease-in-out
            forwards;
        }

        .summer-tint {
          animation: summer-tint 1.1s ease-in-out
            forwards;
        }

        .autumn-tint {
          animation: autumn-tint 1.1s ease-in-out
            forwards;
        }

        .winter-tint {
          animation: winter-tint 1.1s ease-in-out
            forwards;
        }

        .spring-tint {
          animation: spring-tint 1.1s ease-in-out
            forwards;
        }

        .summer-glow {
          background: radial-gradient(
            circle at 43% 40%,
            rgba(255, 236, 155, 0.34),
            rgba(110, 190, 70, 0.14) 30%,
            transparent 62%
          );
        }

        .autumn-glow {
          background: radial-gradient(
            circle at 48% 44%,
            rgba(223, 139, 55, 0.2),
            transparent 60%
          );
        }

        .winter-glow {
          background: radial-gradient(
            circle at 52% 45%,
            rgba(210, 238, 255, 0.3),
            rgba(145, 195, 230, 0.09) 32%,
            transparent 64%
          );
          filter: blur(8px);
        }

        .spring-glow {
          background: radial-gradient(
            circle at 48% 42%,
            rgba(255, 225, 235, 0.28),
            rgba(255, 235, 220, 0.08) 32%,
            transparent 64%
          );
          filter: blur(6px);
        }

        .wind-stream {
          position: absolute;
          left: -30%;
          width: 160%;
          height: 100px;
          border-radius: 999px;
          opacity: 0;
          filter: blur(20px);
        }

        .summer-overlay .wind-stream {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(218, 255, 180, 0.08),
            rgba(255, 238, 155, 0.22),
            rgba(218, 255, 180, 0.08),
            transparent
          );
        }

        .autumn-overlay .wind-stream {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 220, 160, 0.05),
            rgba(255, 190, 100, 0.15),
            rgba(255, 220, 160, 0.05),
            transparent
          );
        }

        .winter-overlay .wind-stream {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(220, 242, 255, 0.06),
            rgba(205, 235, 255, 0.23),
            rgba(220, 242, 255, 0.06),
            transparent
          );
        }

        .spring-overlay .wind-stream {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 230, 238, 0.06),
            rgba(255, 214, 226, 0.2),
            rgba(255, 240, 220, 0.07),
            transparent
          );
        }

        .wind-one {
          top: 32%;
          animation: wind-sweep 1.1s ease-in-out
            forwards;
        }

        .wind-two {
          top: 63%;
          animation: wind-sweep 1.1s 0.08s
            ease-in-out forwards;
        }

        .season-particle {
          position: absolute;
          left: -75px;
          display: block;
          opacity: 0;
          transform-origin: center;
          animation-duration: 1.1s;
          animation-timing-function:
            cubic-bezier(0.4, 0, 0.25, 1);
          animation-fill-mode: forwards;
          will-change: transform, opacity;
        }

        .path-normal {
          animation-name: particle-normal;
        }

        .path-high {
          animation-name: particle-high;
        }

        .path-low {
          animation-name: particle-low;
        }

        .summer-leaf,
        .autumn-leaf {
          border-radius: 88% 18% 88% 18%;
        }

        .summer-leaf {
          background: linear-gradient(
            135deg,
            #b4df73 0%,
            #5e9d43 48%,
            #265d33 100%
          );
          box-shadow:
            inset 2px 2px 4px
              rgba(240, 255, 210, 0.38),
            0 7px 13px rgba(0, 0, 0, 0.32);
        }

        .autumn-leaf {
          background: linear-gradient(
            135deg,
            #e39a32 0%,
            #ae4f19 48%,
            #713015 100%
          );
          box-shadow:
            inset 2px 2px 4px
              rgba(255, 220, 150, 0.25),
            0 7px 12px rgba(0, 0, 0, 0.3);
        }

        .summer-leaf::after,
        .autumn-leaf::after {
          content: "";
          position: absolute;
          right: -8px;
          top: 45%;
          width: 11px;
          height: 2px;
          border-radius: 999px;
          transform: rotate(15deg);
          transform-origin: left center;
        }

        .summer-leaf::after {
          background: #315f2a;
        }

        .autumn-leaf::after {
          background: #6d2d13;
        }

        .summer-vein,
        .autumn-vein,
        .petal-vein {
          position: absolute;
          left: 47%;
          top: 12%;
          width: 1px;
          height: 76%;
          transform: rotate(-42deg);
        }

        .summer-vein {
          background: rgba(30, 80, 38, 0.65);
        }

        .autumn-vein {
          background: rgba(92, 35, 14, 0.58);
        }

        .snowflake {
          border-radius: 999px;
          background: rgba(242, 250, 255, 0.98);
          box-shadow:
            0 0 8px rgba(220, 242, 255, 0.95),
            0 0 20px rgba(180, 220, 255, 0.62);
        }

        .snowflake::before,
        .snowflake::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 180%;
          height: 1px;
          background: rgba(242, 250, 255, 0.85);
          transform-origin: center;
        }

        .snowflake::before {
          transform: translate(-50%, -50%)
            rotate(45deg);
        }

        .snowflake::after {
          transform: translate(-50%, -50%)
            rotate(-45deg);
        }

        .spring-petal {
          border-radius: 90% 30% 90% 30%;
          background: linear-gradient(
            135deg,
            #ffe1eb 0%,
            #f7abc1 52%,
            #d96b91 100%
          );
          box-shadow:
            inset 1px 1px 4px
              rgba(255, 255, 255, 0.5),
            0 5px 10px rgba(79, 24, 45, 0.22);
        }

        .petal-vein {
          background: rgba(175, 75, 110, 0.4);
          transform: rotate(-35deg);
          }

        .light-particle {
          position: absolute;
          border-radius: 999px;
          opacity: 0;
          animation: light-drift 1.1s ease-in-out
            forwards;
        }

        .summer-light {
          background: #fff2a8;
          box-shadow:
            0 0 10px rgba(255, 240, 155, 1),
            0 0 24px rgba(255, 220, 90, 0.75);
        }

        .winter-dust {
          background: rgba(230, 246, 255, 0.98);
          box-shadow:
            0 0 8px rgba(220, 242, 255, 0.95),
            0 0 18px rgba(180, 220, 255, 0.7);
        }

        .spring-light {
          background: rgba(255, 243, 220, 0.98);
          box-shadow:
            0 0 8px rgba(255, 228, 196, 0.95),
            0 0 18px rgba(255, 205, 180, 0.55);
        }

        @keyframes particle-normal {
          0% {
            opacity: 0;
            transform: translate3d(-8vw, 30px, 0)
              rotate(0deg) scale(0.65);
          }

          15% {
            opacity: 1;
          }

          36% {
            transform: translate3d(30vw, -105px, 0)
              rotate(225deg) scale(1.08);
          }

          62% {
            transform: translate3d(59vw, 78px, 0)
              rotate(500deg) scale(0.88);
          }

          100% {
            opacity: 0;
            transform: translate3d(116vw, -15px, 0)
              rotate(980deg) scale(0.48);
          }
        }

        @keyframes particle-high {
          0% {
            opacity: 0;
            transform: translate3d(-10vw, 88px, 0)
              rotate(15deg) scale(0.6);
          }

          17% {
            opacity: 1;
          }

          42% {
            transform: translate3d(36vw, -195px, 0)
              rotate(-295deg) scale(1.12);
          }

          70% {
            transform: translate3d(72vw, 38px, 0)
              rotate(-630deg) scale(0.8);
          }

          100% {
            opacity: 0;
            transform: translate3d(117vw, -105px, 0)
              rotate(-1000deg) scale(0.44);
          }
        }

        @keyframes particle-low {
          0% {
            opacity: 0;
            transform: translate3d(-8vw, -42px, 0)
              rotate(-10deg) scale(0.7);
          }

          15% {
            opacity: 1;
          }

          43% {
            transform: translate3d(40vw, 145px, 0)
              rotate(330deg) scale(1.04);
          }

          72% {
            transform: translate3d(77vw, -58px, 0)
              rotate(690deg) scale(0.76);
          }

          100% {
            opacity: 0;
            transform: translate3d(116vw, 98px, 0)
              rotate(1010deg) scale(0.42);
          }
        }

        @keyframes light-drift {
          0% {
            opacity: 0;
            transform: translate3d(-40px, 30px, 0)
              scale(0.5);
          }

          28% {
            opacity: 1;
          }

          70% {
            opacity: 0.95;
          }

          100% {
            opacity: 0;
            transform: translate3d(110px, -60px, 0)
              scale(1.4);
          }
        }

        @keyframes wind-sweep {
          0% {
            opacity: 0;
            transform: translateX(-26%)
              rotate(-8deg) scaleX(0.75);
          }

          35% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translateX(27%)
              rotate(5deg) scaleX(1.1);
          }
        }

        @keyframes glow-sweep {
          0% {
            opacity: 0;
            transform: translateX(-9%) scale(0.94);
          }

          40% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translateX(11%) scale(1.1);
          }
        }

        @keyframes summer-tint {
          0% {
            background: rgba(28, 90, 30, 0);
          }

          50% {
            background: rgba(50, 130, 45, 0.2);
          }

          100% {
            background: rgba(18, 70, 28, 0.34);
          }
        }

        @keyframes autumn-tint {
          0% {
          background: rgba(45, 18, 4, 0);
          }

          55% {
            background: rgba(90, 35, 8, 0.16);
          }

          100% {
            background: rgba(45, 18, 4, 0.32);
          }
        }

        @keyframes winter-tint {
          0% {
            background: rgba(20, 55, 85, 0);
          }

          52% {
            background: rgba(80, 145, 195, 0.2);
          }

          100% {
            background: rgba(18, 50, 85, 0.38);
          }
        }

        @keyframes spring-tint {
          0% {
            background: rgba(255, 220, 230, 0);
          }

          52% {
            background: rgba(255, 205, 220, 0.12);
          }

          100% {
            background: rgba(245, 190, 210, 0.2);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .season-particle,
          .light-particle,
          .wind-stream,
          .season-glow {
            display: none;
          }
        }
      `}</style>
    </>
  );
}