import type { TargetAndTransition } from "framer-motion";
import type { DecoLoop } from "../constants/spin";

export const getTextColorClass = (hex: string) => {
  // hex: "#RRGGBB"
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);

  // 亮度公式（越大越亮）
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // 你可以调这个阈值：0.6~0.7之间通常很好用
  return luminance < 0.6 ? "text-white" : "text-slate-700/80";
};

export const getLoopAnimation = (loop?: DecoLoop): TargetAndTransition | undefined => {
  if (!loop) return undefined;

  if (loop.type === "float") {
    return {
      y: [0, -loop.amount, 0],
      transition: {
        duration: loop.duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    };
  }

  return {
    rotate: [loop.from, loop.to, loop.from],
    transition: {
      duration: loop.duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };
}