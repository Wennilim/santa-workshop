import { motion } from "framer-motion";

export const SantaAssignmentCard = () => {
  return (
    <div className="bg-[#D8F3DC] rounded-[50px] border-8 border-white shadow-lg p-8 md:p-12 relative w-full">
      <div className="flex flex-col justify-between h-full relative">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <img
              src="/icons/gift.svg"
              alt="gift box icon"
              className="size-12 hidden sm:block"
            />
            <h2 className="text-[24px] sm:text-[26px] md:text-[29px] font-bold font-[dynapuff] text-[#2d6a4f] text-center sm:text-left">
              Secret Santa Assignment
            </h2>
          </div>
          <p className="text-[16px] sm:text-[18px] md:text-[22px] text-[#2d6a4f] max-w-[480px] text-center sm:text-left">
            Find out who you’ve been secretly assigned to surprise this
            Christmas.
          </p>
        </div>

        <button className="bg-[#2d6a4f] mt-8 lg:mt-0 cursor-pointer text-white rounded-[50px] py-2 md:py-4 px-4 md:px-8 flex justify-center md:justify-start items-center gap-2 w-full sm:w-fit">
          <img src="/icons/eye.svg" alt="eye icon" />
          <p className="text-[14px] md:text-[16px] font-semibold">
            Reveal My Recipient
          </p>
        </button>

        <img
          src="/images/gifts.png"
          alt="gifts"
          className="absolute bottom-0 right-0 size-24 xl:size-32 hidden md:block"
        />
      </div>

      <motion.img
        src="/images/santa.png"
        alt="santa"
        className="absolute -top-10 right-10 md:-top-13 md:right-10 size-9 md:size-12"
        style={{ transformOrigin: "50% 100%" }}
        whileHover={{
          rotate: [0, -12, 12, -8, 8, 0],
          transition: {
            duration: 0.8,
            ease: "easeInOut",
          },
        }}
      />
    </div>
  );
};
