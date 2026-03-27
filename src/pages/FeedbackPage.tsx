import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { Rating } from "../components/Rating";
import { cn } from "../utils/cn";
import { SubmittedFeedbackPage } from "./SubmittedFeedbackPage";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
    },
  },
};

const RATING_QUESTIONS = [
  { id: "overall", label: "Overall Satisfaction" },
  { id: "gift", label: "Gift Satisfaction Level" },
  { id: "games", label: "Games & Activities" },
  { id: "catering", label: "Event Catering" },
];

export const FeedbackPage = () => {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [futureExpectations, setFutureExpectations] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      overall_satisfaction: ratings["overall"] ?? 0,
      gift_satisfaction_level: ratings["gift"] ?? 0,
      games_activities: ratings["games"] ?? 0,
      event_catering: ratings["catering"] ?? 0,
      future_expectation: futureExpectations,
    };

    console.log(payload);
    // await api.post('/feedback', payload);

    setSubmitted(true);
  };

  if (submitted) return <SubmittedFeedbackPage />;

  return (
    <section
      id="feedback"
      aria-label="Feedback"
      className="relative overflow-hidden"
    >
      <motion.img
        src="/icons/croissant.svg"
        alt="Croissant"
        className="absolute top-24 left-16 w-16 pointer-events-none hidden md:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, y: [-10, 10] }}
        transition={{
          duration: 0.6,
          y: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      />
      <motion.img
        src="/icons/bulb.svg"
        alt="Bulb"
        className="absolute top-24 right-16 w-8 pointer-events-none hidden md:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, y: [-10, 10], rotate: [-5, 5] }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          y: {
            duration: 2.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      />
      <motion.img
        src="/images/candy-canes.png"
        alt="Candy canes 1"
        className="absolute bottom-24 left-10 w-14 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0, y: [-10, 10], rotate: [5, -5] }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          y: {
            duration: 3.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      />
      <motion.img
        src="/images/candy-canes.png"
        alt="Candy canes 2"
        className="absolute bottom-24 right-10 w-14 pointer-events-none hidden lg:block"
        style={{ transform: "scaleX(-1)" }}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0, y: [-12, 12], rotate: [-5, 5] }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          y: {
            duration: 3.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        className="flex flex-col items-center gap-8 pt-10 pb-16 px-4 sm:px-6 md:px-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex justify-center items-end gap-4 md:gap-8">
          <motion.div
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <h1 className="text-[36px] sm:text-[52px] lg:text-[56px] font-bold font-[dynapuff] text-[#2D6A4F] leading-none text-center">
              We Value Your Feedback
            </h1>
            <p
              className={cn(
                "text-center font-thin text-[#2D6A4F]",
                "text-[16px] sm:text-[18px] md:text-[22px]",
                "mt-3 max-w-[360px] sm:max-w-[460px]",
              )}
            >
              Help us make next year's Secret Santa even more magical!
            </p>
            <motion.span
              className="mt-2 inline-block bg-[#FFD6D6]/60 text-[#E63946] font-bold font-[dynapuff] text-[13px] sm:text-[15px] px-4 py-1 rounded-full border border-[#FF6B6B]/40"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ONLY Available Dec 26–31
            </motion.span>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className={cn(
            "w-full max-w-[680px]",
            "bg-[#FFFEF9]",
            "border-4 border-dashed border-[#C5BC9A]/50",
            "rounded-[32px] sm:rounded-[44px]",
            "px-6 py-8 sm:px-10 sm:py-10",
          )}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <motion.div
                className="flex flex-col gap-6 items-center sm:items-start"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {RATING_QUESTIONS.map(({ id, label }) => (
                  <motion.div
                    key={id}
                    variants={itemVariants}
                    className="flex flex-col gap-2"
                  >
                    <label
                      htmlFor={id}
                      className="font-bold font-[dynapuff] text-[#613E0F] text-[15px] sm:text-[17px] tracking-wide"
                    >
                      {label}
                    </label>
                    <Rating
                      value={ratings[id] ?? 0}
                      onChange={(val) =>
                        setRatings((prev) => ({ ...prev, [id]: val }))
                      }
                      size={34}
                    />
                  </motion.div>
                ))}
              </motion.div>
              <img
                src="/images/feedback.png"
                alt="Feedback"
                className="size-60 hidden sm:block"
              />
            </div>

            <div className="border-t-2 border-dashed border-[#C5BC9A]/40" />

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label
                htmlFor="futureExpectations"
                className="font-bold font-[dynapuff] text-[#613E0F] text-[15px] sm:text-[17px] tracking-wide"
              >
                Future Expectations
              </label>
              <textarea
                id="futureExpectations"
                name="futureExpectations"
                value={futureExpectations}
                onChange={(e) => setFutureExpectations(e.target.value)}
                placeholder="Share your thoughts and suggestions for making next year's Secret Santa even better!"
                rows={5}
                className={cn(
                  "w-full resize-none rounded-2xl px-4 py-3",
                  "bg-[#FFF8F0] border-2 border-[#C5BC9A]/50",
                  "text-[#613E0F] font-[quicksand] text-[14px] sm:text-[15px]",
                  "placeholder:text-[#C5BC9A]",
                  "focus:outline-none focus:border-[#2D6A4F]/50 transition-colors",
                )}
              />
            </motion.div>

            <motion.button
              type="submit"
              className={cn(
                "self-center mt-2",
                "bg-[#468CFF] text-white uppercase font-bold font-[dynapuff]",
                "text-[18px] sm:text-[22px]",
                "px-10 py-4 rounded-full",
                "border-4 border-[#C1D9FF]/50",
                "shadow-lg cursor-pointer",
              )}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(70, 140, 255, 0.35)",
                y: -4,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Send to Santa
            </motion.button>
            <p className="text-center uppercase text-[#C5BC9A] text-[12px] sm:text-[14px]">
              Anonymous & confidential feedback
            </p>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};
