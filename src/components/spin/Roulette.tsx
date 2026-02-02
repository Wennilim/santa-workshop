import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
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

export const Roulette = () => {
  const controls = useAnimation();
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const normalize = (deg: number) => ((deg % 360) + 360) % 360;

  const handleSpin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    const winnerIndex = 0;
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

  const backgroundGradient = `conic-gradient(
    ${SEGMENTS.map((seg, i) => {
      const start = i * (100 / NUM_SEGMENTS);
      const end = (i + 1) * (100 / NUM_SEGMENTS);
      return `${seg.color} ${start}% ${end}%`;
    }).join(", ")}
  )`;

  useEffect(() => {
    const root = document.documentElement;
    if (isOpen) {
      root.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
    }
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
            }}
            animate={controls}
            initial={{ rotate: 0 }}
          >
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
                  }}
                >
                  {/* 文字 - 修正为垂直对齐指向圆心 */}
                  <span
                    className={`text-[13px] font-bold mb-1 ${getTextColorClass(segment.color)}`}
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      textOrientation: "mixed",
                    }}
                  >
                    {segment.name}
                  </span>

                  {/* 图标 - 修正旋转以保持直立感 */}
                  <div
                    className={`mt-1 transform rotate-180 opacity-70 ${getTextColorClass(segment.color)}`}
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
          value={isSpinning ? "Spinning" : "Ready to Spin"}
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
