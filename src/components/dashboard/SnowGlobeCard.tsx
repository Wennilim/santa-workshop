type SnowGlobeCardProps = {
  title?: string;
  time?: {
    days: number;
    hours: number;
    minutes: number;
  };
};

export const SnowGlobeCard = ({
  title = "The Big Reveal in",
  time = { days: 5, hours: 14, minutes: 30 },
}: SnowGlobeCardProps) => {
  const pad2 = (n: number) => String(n).padStart(2, "0");

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

          {/* 时间：用 clamp() 自动缩放，避免小屏溢出 */}
          <div className="mt-2 sm:mt-3 flex items-end gap-2 sm:gap-3 font-[dynapuff] uppercase text-black">
            <span className="leading-none text-[clamp(28px,7vw,52px)]">
              {pad2(time.days)}
            </span>

            <span className="leading-none text-black/60 text-[clamp(14px,3.5vw,24px)]">
              :
            </span>

            <span className="leading-none text-[clamp(28px,7vw,52px)]">
              {pad2(time.hours)}
            </span>

            <span className="leading-none text-black/60 text-[clamp(14px,3.5vw,24px)]">
              :
            </span>

            <span className="leading-none text-[clamp(28px,7vw,52px)]">
              {pad2(time.minutes)}
            </span>
          </div>
          <div className="mt-1.5 sm:mt-2 grid grid-cols-3 gap-4 sm:gap-6 text-[10px] sm:text-[12px] uppercase text-neutral-300">
            <span className="text-center font-[dynapuff]">Days</span>
            <span className="text-center font-[dynapuff]">Hours</span>
            <span className="text-center font-[dynapuff]">Minutes</span>
          </div>
        </div>
      </div>
      <img
        src="/images/tree.png"
        alt="christmas tree"
        loading="lazy"
        className="
          pointer-events-none absolute left-1/2 -translate-x-1/2
          bottom-12 md:bottom-12
          w-18 sm:w-20 md:w-28
        "
      />
    </section>
  );
};
