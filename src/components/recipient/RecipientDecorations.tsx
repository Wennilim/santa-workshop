import { cn } from "../../utils/cn";
import { motion, useReducedMotion } from "framer-motion";

const float = (delay = 0) => ({
  opacity: [0, 1],
  scale: [0.98, 1],
  y: [0, -6, 0, 5, 0],
  transition: {
    opacity: { duration: 0.45, ease: "easeOut" as const, delay },
    scale: { duration: 0.45, ease: "easeOut" as const, delay },
    y: {
      duration: 5.5,
      ease: "easeInOut" as const,
      repeat: Infinity,
      delay,
    },
  },
});

type DecorationItem = {
  src: string;
  alt: string;
  className: string;
  style?: React.CSSProperties;
};

const DECORATIONS: DecorationItem[] = [
  {
    src: "/icons/cake.svg",
    alt: "cake",
    className: "absolute top-0 left-0 -rotate-70 size-9",
  },
  {
    src: "/icons/tree.svg",
    alt: "tree",
    className: "absolute -top-20 right-100 size-12",
  },
  {
    src: "/images/candy-canes3.png",
    alt: "candy canes",
    className: "absolute -top-30 left-170 size-6",
  },


  {
    src: "/images/candy-canes3.png",
    alt: "candy canes",
    className: "absolute top-70 right-10 size-12",
  },
  {
    src: "/icons/pink-love.svg",
    alt: "pink love",
    className: "absolute top-100 left-10 size-6",
  },
  {
    src: "/icons/yellow-gelato.svg",
    alt: "yellow love",
    className: "absolute top-80 right-10 size-6",
  },
  {
    src: "/images/snow.png",
    alt: "snow",
    className: "absolute bottom-10 right-100 size-5",
  },
  {
    src: "/images/snow.png",
    alt: "snow",
    className: "absolute bottom-12 left-100 size-6",
  },
  {
    src: "/icons/blue-car.svg",
    alt: "blue car",
    className: "absolute -bottom-10 left-30 size-8",
  },
  {
    src: "/icons/pink-gelato.svg",
    alt: "pink gelato",
    className: "absolute -bottom-10 right-30 size-5",
  },
];

export const RecipientDecorations = ({ className }: { className?: string }) => {
  const reduceMotion = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        "hidden md:block",
        className,
      )}
    >
      {DECORATIONS.map((item, idx) => (
        <motion.img
          key={`${item.alt}-${idx}`}
          src={item.src}
          alt={item.alt}
          className={item.className}
          style={item.style}
          draggable={false}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={reduceMotion ? { opacity: 1 } : float(idx * 0.08)}
        />
      ))}
    </div>
  );
};
