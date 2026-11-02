import { motion, type Variants } from "framer-motion";
import {
  GiftIcon,
  SnowflakeIcon,
  PinHeartIcon,
  CashIcon,
} from "../assets/icons";
import { cn } from "../utils/cn";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

const GUIDE_STEPS = [
  {
    title: "Keep it Secret",
    description:
      "Shhhh! Half the fun is the mystery. Don't reveal your identity until the big day of the gift exchange.",
    icon: CashIcon,
    iconColor: "text-[#D97706]",
    border: "border-[#FEF3C7]",
    text: "text-[#92400E]",
  },
  {
    title: "The Tagging Ritual",
    description:
      "Write or print the Recipient's Gift Code and attach it firmly to the outside of your gift. This is the secret key to our holiday magic!",
    icon: PinHeartIcon,
    iconColor: "text-[#E63946]",
    border: "border-[#FEE2E2]",
    text: "text-[#991B1B]",
  },
  {
    title: "The Big Reveal",
    description:
      "At 1:00 PM sharp on the day of the party, check your dashboard to reveal your secret gift code.",
    icon: SnowflakeIcon,
    iconColor: "text-[#2D6A4F]",
    border: "border-[#D8F3DC]",
    text: "text-[#1B4332]",
  },
  {
    title: "Claim Your Treasure",
    description:
      "Show your revealed code to the Party Admin to redeem your gift and join the celebration!",
    icon: GiftIcon,
    iconColor: "text-[#457B9D]",
    border: "border-[#E1EAF2]",
    text: "text-[#1D3557]",
  },
] as const;

const GuideCard = ({
  icon: Icon,
  title,
  description,
  border,
  text,
  iconColor,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  border: string;
  text: string;
  iconColor: string;
}) => {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "flex flex-col gap-4 p-6 rounded-[32px] bg-white border-4 border-dashed",
        border,
        text,
      )}
    >
      <div className="size-12 rounded-2xl bg-neutral-50 flex items-center justify-center">
        <Icon className={cn("size-6", iconColor)} />
      </div>

      <div>
        <h3 className="text-xl font-bold font-[dynapuff] mb-2">{title}</h3>
        <p className="text-neutral-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export const GiftGivingGuidePage = () => {
  return (
    <motion.section
      id="gift-giving-guide"
      className="lg:p-4 max-w-5xl mx-auto"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-12 text-center">
        <motion.h1
          variants={fadeUp}
          className="text-[36px] md:text-[54px] font-bold font-[dynapuff] mb-4 text-[#8B4513]"
        >
          Gift Giving Guide
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-xl text-[#2d6a4f] max-w-2xl"
        >
          Follow these magical steps to ensure every gift finds its rightful
          owner under the twinkling lights!
        </motion.p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {GUIDE_STEPS.map((step) => (
          <GuideCard key={step.title} {...step} />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        variants={fadeUp}
        className="mt-16 p-8 rounded-[40px] bg-white/40 backdrop-blur-sm border-2 border-white text-center"
      >
        <h2 className="text-2xl font-bold font-[dynapuff] mb-4 text-[#2d6a4f]">
          Merry Gift Giving!
        </h2>
        <p className="text-neutral-600">
          Remember, the best gifts come from the heart. Have fun searching for
          that perfect something!
        </p>
      </motion.div>
    </motion.section>
  );
};
