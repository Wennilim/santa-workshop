import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SnowGlobeCardProps = {
  title?: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
};

const AnimatedNumber = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  return (
    <span className="relative inline-flex overflow-hidden leading-none">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 18, opacity: 0, filter: "blur(2px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -18, opacity: 0, filter: "blur(2px)" }}
          transition={{
            type: "spring",
            stiffness: 520,
            damping: 32,
            mass: 0.7,
          }}
          className={className}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export const SnowGlobeCard = ({ title = "The Big Reveal in" }: SnowGlobeCardProps) => {
  const pad2 = (n: number) => String(n).padStart(2, "0");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const [isChristmas, setIsChristmas] = useState(false);

  const getTargetChristmas = (now: Date) => {
    const thisYear = now.getFullYear();
    const christmasThisYear = new Date(thisYear, 11, 24, 0, 0, 0);

    if (now.getTime() > christmasThisYear.getTime()) {
      return new Date(thisYear + 1, 11, 24, 0, 0, 0);
    }

    return christmasThisYear;
  };

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const target = getTargetChristmas(now);

      const diff = target.getTime() - now.getTime();

      const isXmas = diff <= 0;
      setIsChristmas(isXmas);

      if (isXmas) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    };

    tick();
    const id = setInterval(tick, 60 * 1000);

    return () => clearInterval(id);
  }, []);

  const daysText = pad2(timeLeft.days);
  const hoursText = pad2(timeLeft.hours);
  const minutesText = pad2(timeLeft.minutes);

  return (
    <section
      id="snow-globe"
      aria-label="Snow globe countdown"
      className="
        relative aspect-square w-full
        max-w-[340px] sm:max-w-[380px] md:max-w-[400px]
        bg-[url('/images/snow-globe.png')] bg-contain bg-center bg-no-repeat self-center
      "
    >
      <div className="absolute inset-0 grid place-items-center px-4 sm:px-6">
        <div className="flex flex-col items-center text-center -translate-y-7 sm:-translate-y-8">
          <h5 className="font-[dynapuff] uppercase text-[#E63946] text-[16px] sm:text-[18px] md:text-[22px]">
            {title}
          </h5>

          <div className="mt-2 sm:mt-3 flex items-end gap-2 sm:gap-3 font-[dynapuff] uppercase text-black">
            <AnimatedNumber
              value={daysText}
              className="leading-none text-[clamp(28px,7vw,52px)]"
            />

            <motion.span
              aria-hidden
              animate={{ opacity: [0.35, 0.85, 0.35] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="leading-none text-black/60 text-[clamp(14px,3.5vw,24px)]"
            >
              :
            </motion.span>

            <AnimatedNumber
              value={hoursText}
              className="leading-none text-[clamp(28px,7vw,52px)]"
            />

            <motion.span
              aria-hidden
              animate={{ opacity: [0.35, 0.85, 0.35] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="leading-none text-black/60 text-[clamp(14px,3.5vw,24px)]"
            >
              :
            </motion.span>

            <AnimatedNumber
              value={minutesText}
              className="leading-none text-[clamp(28px,7vw,52px)]"
            />
          </div>

          <div className="mt-1.5 sm:mt-2 grid grid-cols-3 gap-4 sm:gap-8 text-[10px] sm:text-[12px] uppercase text-neutral-300">
            <span className="text-center font-[dynapuff]">Days</span>
            <span className="text-center font-[dynapuff]">Hours</span>
            <span className="text-center font-[dynapuff]">Minutes</span>
          </div>
        </div>
      </div>

      {isChristmas ? (
        <img
          src="/images/tree3.png"
          alt="christmas tree"
          loading="lazy"
          className="
            pointer-events-none absolute left-1/2 -translate-x-[45%]
            bottom-10 sm:bottom-12 
            w-40
          "
        />
      ) : (
        <img
          src="/images/tree.png"
          alt="christmas tree"
          loading="lazy"
          className="
            pointer-events-none absolute left-1/2 -translate-x-1/2
            bottom-12 
            w-18 sm:w-20 md:w-28
          "
        />
      )}

      {isChristmas && (
        <motion.p
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[520%] sm:translate-y-[600%] md:translate-y-[530%] text-white font-bold font-[dynapuff] uppercase text-[16px] md:text-[19px]"
        >
          Merry Christmas!
        </motion.p>
      )}
    </section>
  );
};
