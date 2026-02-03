import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  GiftIcon,
  SnowflakeIcon,
  CloudIcon,
  FlowerIcon,
} from "../../assets/icons";
import { NAMES, SEGMENTS } from "./constants/spin";
import type { Segment } from "./constants/spin";
import { InfoCard } from "./InfoCard";
import { RoulettePointer } from "./RoulettePointer";
import { RouletteSpinButton } from "./RouletteSpinButton";
import { getTextColorClass } from "./utils/spin";
import { WinningModal } from "./WinningModal";
import { useGlobalStore } from "../../stores/useGlobalStore";

const renderIcon = (segment: Segment, className: string) => {
  switch (segment.iconType) {
    case "gift":
      return <GiftIcon className={className} />;
    case "snowflake":
      return <SnowflakeIcon className={className} />;
    case "cloud":
      return <CloudIcon className={className} />;
    case "flower":
      return <FlowerIcon className={className} />;
    default:
      return null;
  }
};

const NUM_SEGMENTS = SEGMENTS.length;
const SEGMENT_ANGLE = 360 / NUM_SEGMENTS;
const WHEEL_SIZE = 600;

export const Roulette = ({
  isSpinning,
  setIsSpinning,
}: {
  isSpinning: boolean;
  setIsSpinning: (value: boolean) => void;
}) => {
  const controls = useAnimation();

  const [rotation, setRotation] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { winner, setWinner } = useGlobalStore();

  const normalize = (deg: number) => ((deg % 360) + 360) % 360;

  const handleSpin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    const winnerIndex = 1;
    const targetAngle = winnerIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;

    const current = normalize(rotation);
    const spins = 10;

    const finalRotation = rotation + spins * 360 - current - targetAngle;

    await controls.start({
      rotate: finalRotation,
      transition: {
        duration: 4,
        ease: [0.2, 0.8, 0.2, 1],
      },
    });

    setWinner(SEGMENTS[winnerIndex].name);
    setRotation(finalRotation);
    setIsOpen(true);
    setIsSpinning(false);
  };

  const backgroundGradient = useMemo(() => {
    const total = NUM_SEGMENTS;
    const seg = 100 / total;

    const stops: string[] = [];

    for (let i = 0; i < total; i++) {
      const start = i * seg;
      const end = (i + 1) * seg;
      stops.push(`${SEGMENTS[i].color} ${start}% ${end}%`);
    }

    return `conic-gradient(${stops.join(", ")})`;
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isOpen) root.classList.add("overflow-hidden");
    else root.classList.remove("overflow-hidden");

    return () => root.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center justify-center md:min-h-screen font-sans overflow-hidden">
      <WinningModal {...{ isOpen, setIsOpen, winner }} />

      <div className="relative -top-36 sm:-top-10 md:top-0 scale-50 sm:scale-75 md:scale-100">
        <RoulettePointer />

        {/* --- 转盘外框 --- */}
        <div
          className="rounded-full bg-[#7A4B27] shadow md:shadow-2xl flex items-center justify-center border-16 border-[#653C1D]"
          style={{ width: WHEEL_SIZE + 52, height: WHEEL_SIZE + 52 }}
        >
          {/* --- 旋转主体 --- */}
          <motion.div
            className="relative rounded-full overflow-hidden shadow-inner shadow-[#5f3515]"
            style={{
              width: WHEEL_SIZE,
              height: WHEEL_SIZE,
              background: backgroundGradient,
              transform: "rotate(-90deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            animate={controls}
            initial={{ rotate: 0 }}
          >
            {/* ✅ 关键：加一层“边缘柔化 overlay” */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `
                  radial-gradient(circle at center,
                    rgba(0,0,0,0.00) 0%,
                    rgba(0,0,0,0.04) 55%,
                    rgba(0,0,0,0.10) 100%
                  )
                `,
                mixBlendMode: "multiply",
              }}
            />

            {/* ✅ 关键：加一层“扇形分割阴影线”（超细，不会像白线那样突兀） */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `
                  repeating-conic-gradient(
                    rgba(0,0,0,0.12) 0deg 0.25deg,
                    rgba(0,0,0,0.00) 0.25deg ${SEGMENT_ANGLE}deg
                  )
                `,
                mixBlendMode: "multiply",
                opacity: 0.35,
              }}
            />

            {/* --- 扇形内容 --- */}
            {SEGMENTS.map((segment, i) => {
              const rotate = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;

              return (
                <div
                  key={i}
                  className="absolute top-0 left-1/2 h-1/2 flex flex-col items-center justify-start origin-bottom pt-3"
                  style={{
                    transform: `translateX(-50%) rotate(${rotate}deg)`,
                    width: "60px",
                    pointerEvents: "none",
                  }}
                >
                  <span
                    className={`text-[13px] font-bold mb-1 ${getTextColorClass(
                      segment.color,
                    )}`}
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      textOrientation: "mixed",
                      textShadow: "0 1px 0 rgba(0,0,0,0.10)",
                    }}
                  >
                    {segment.name}
                  </span>

                  <div
                    className={`mt-1 transform rotate-180 opacity-70 ${getTextColorClass(
                      segment.color,
                    )}`}
                  >
                    {renderIcon(segment, "w-4 h-4")}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* --- 中心 SPIN 按钮 --- */}
        <RouletteSpinButton {...{ handleSpin, isSpinning }} />
      </div>

      <div className="absolute bottom-0 flex sm:hidden flex-col sm:flex-row gap-6 mb-12 w-full justify-center items-center">
        <InfoCard
          title="Status"
          titleColor="#E63946"
          value={isSpinning ? "Spinning..." : "Ready to Spin"}
          bgColor="#FFD6D6"
        />
        <InfoCard
          title="Participants"
          titleColor="#92400E"
          value={`${NAMES.length} Elves`}
          bgColor="#FEFAE0"
        />
      </div>
    </div>
  );
};
