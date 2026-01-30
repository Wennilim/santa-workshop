import {
  motion,
  type TargetAndTransition,
  type Transition,
  type Variants,
} from "framer-motion";
import { PinHeartIcon } from "../assets/icons";
import { DecorativeIcon } from "../components/wishlist/DecorativeIcon";
import { WishCard } from "../components/wishlist/WishCard";

const BG_COLORS = [
  "border-[#FF6B6B]/50 bg-[#FFD6D6]/50",
  "border-[#FF8D28]/50 bg-[#FEFAE0]",
  "border-[#0D7618] bg-[#B9FBC0]/25",
];

interface AnimationConfig {
  initial: TargetAndTransition;
  whileInView: TargetAndTransition;
  animate: TargetAndTransition;
  transition?: Transition;
  loopTransition?: Transition;
}

export interface DecorationData {
  src: string;
  alt: string;
  className: string;
  config: AnimationConfig;
  style?: React.CSSProperties;
}

const SHARED_FLOAT_TRANSITION: Transition = {
  duration: 3,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeInOut" as const,
};

const DECORATIONS: DecorationData[] = [
  {
    src: "/icons/croissant.svg",
    alt: "croissant",
    className: "top-22 left-20 w-16",
    config: {
      initial: { opacity: 0, scale: 0 },
      whileInView: { opacity: 1, scale: 1 },
      animate: { y: [-10, 10] },
      transition: { duration: 0.6 },
    },
  },
  {
    src: "/icons/bulb.svg",
    alt: "bulb",
    className: "top-22 right-20 w-8",
    config: {
      initial: { opacity: 0, scale: 0 },
      whileInView: { opacity: 1, scale: 1 },
      animate: { y: [-10, 10], rotate: [-5, 5] },
      transition: { duration: 0.6, delay: 0.2 },
    },
  },
  {
    src: "/images/candy-canes.png",
    alt: "candy canes",
    className:
      "top-52 right-1 sm:top-52 sm:right-1 md:top-60 md:right-22 lg:top-76 lg:right-42 w-15",
    config: {
      initial: { opacity: 0, y: -50, scale: 0.5 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
      animate: { y: [-15, 15], rotate: [-5, 5] },
      transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.3 },
      loopTransition: { ...SHARED_FLOAT_TRANSITION, duration: 4 },
    },
  },
  {
    src: "/images/candy-canes.png",
    alt: "candy canes",
    className: "top-230 left-15 hidden lg:block w-15",
    config: {
      initial: { opacity: 0, x: -100 },
      whileInView: { opacity: 1, x: 0 },
      animate: { y: [-10, 10], rotate: [5, -5] },
      transition: { duration: 0.8, delay: 0.2 },
      loopTransition: { ...SHARED_FLOAT_TRANSITION, duration: 3.5 },
    },
  },
  {
    src: "/images/bones.png",
    alt: "bones",
    className: "bottom-23 left-60 hidden lg:block w-12",
    config: {
      initial: { opacity: 0, scale: 0 },
      whileInView: { opacity: 1, scale: 1 },
      animate: { y: [-8, 8], rotate: [-10, 10] },
      transition: { duration: 0.6, delay: 0.4 },
      loopTransition: { ...SHARED_FLOAT_TRANSITION, duration: 2.5 },
    },
  },
  {
    src: "/images/ball.png",
    alt: "ball",
    className: "bottom-23 right-60 hidden lg:block w-11",
    config: {
      initial: { opacity: 0, scale: 0 },
      whileInView: { opacity: 1, scale: 1 },
      animate: { y: [-12, 12], x: [-5, 5] },
      transition: { duration: 0.6, delay: 0.5 },
    },
  },
  {
    src: "/images/candy-canes.png",
    alt: "candy canes",
    className: "bottom-103 right-40 hidden lg:block font-white w-15",
    style: { transform: "scaleX(-1)" },
    config: {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      animate: { y: [-10, 10] },
      transition: { duration: 0.8, delay: 0.3 },
      loopTransition: { ...SHARED_FLOAT_TRANSITION, duration: 3.2 },
    },
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

// --- Main Page Component ---

export const WishListPage = () => {
  return (
    <section
      id="wishlist"
      aria-label="Wishlist"
      className="relative overflow-hidden"
    >
      {/* 标题区域 */}
      <motion.div
        className="flex flex-col items-center gap-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex justify-center gap-6 items-end pt-12 md:pt-6">
          <motion.img
            src="/images/tree2.png"
            alt="Christmas tree"
            className="lg:w-50 md:w-40 hidden md:block"
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              rotate: [-5, 5],
              transition: { duration: 0.5 },
            }}
          />

          <motion.h1
            className="relative text-[40px] lg:text-[80px] sm:text-[60px] font-bold font-[dynapuff] text-[#2D6A4F] leading-none"
            variants={itemVariants}
          >
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 15,
                delay: 0.5,
              }}
              whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, -5, 5, 0],
                transition: { duration: 0.5 },
              }}
              className="absolute -top-6.5 left-0"
            >
              <PinHeartIcon className="w-8 sm:w-12 text-[#E63946]" />
            </motion.div>
            DEAR SANTA...
            <motion.img
              src="/images/gingerman.png"
              alt="gingerman"
              className="absolute -right-3 -top-6 lg:-top-3 rotate-4 lg:right-0 w-12 sm:w-16"
              initial={{ opacity: 0, x: 50, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: 4 }}
              transition={{
                type: "spring",
                stiffness: 200,
                delay: 0.6,
                duration: 0.8,
              }}
              whileHover={{
                scale: 1.2,
                rotate: [4, -10, 4],
                transition: { duration: 0.5 },
              }}
            />
          </motion.h1>
        </div>

        <motion.p
          className="text-center md:text-[24px] text-[18px] font-thin text-[#2D6A4F] max-w-100 md:max-w-137.5"
          variants={itemVariants}
        >
          Time share your heart's desires for this year's Secret Santa!
        </motion.p>
      </motion.div>

      {/* 愿望列表 */}
      <motion.div
        className="flex flex-col items-center gap-12 lg:mx-48 md:mx-12 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {BG_COLORS.map((color, index) => (
          <WishCard key={index} index={index} color={color} />
        ))}

        <motion.button
          className="bg-[#468CFF] cursor-pointer mt-6 md:mt-12 text-white uppercase font-bold md:text-[24px] text-[18px] font-[dynapuff] border-5 border-[#C1D9FF]/50 md:px-12 md:py-4 py-4 px-8 rounded-full shadow-lg"
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(70, 140, 255, 0.4)",
            y: -5,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          send to santa
        </motion.button>
      </motion.div>

      {/* 浮动装饰元素 (z-20 provided by component, pointer-events-none on wrapper) */}
      <div className="pointer-events-none">
        {DECORATIONS.map((item, idx) => (
          <DecorativeIcon key={idx} item={item} />
        ))}
      </div>
    </section>
  );
};
