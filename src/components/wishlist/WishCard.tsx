
import { motion, type Variants } from "framer-motion";
import { cn } from "../../utils/cn";

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

export const WishCard = ({
  index,
  color,
}: {
  index: number;
  color: string;
}) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
      className="bg-[#FFFEF9] p-6 md:p-12 rounded-[40px] md:rounded-[70px] border-4 border-[#C5BC9A]/50 border-dashed w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex flex-col gap-4">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="text-[24px] font-bold font-[dynapuff] text-[#2D6A4F]"
        >
          WISH {index + 1}:
        </motion.span>

        <motion.div
          className={cn("w-full p-4 md:p-6 rounded-xl border-4 shadow", color)}
          whileFocus={{ scale: 1.01 }}
        >
          <motion.input
            type="text"
            placeholder="Enter your wish ..."
            className="w-full focus:outline-none text-[18px] font-semibold font-[dynapuff] placeholder:text-[14px] md:placeholder:text-[18px] bg-transparent"
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
      </div>

      <div className="flex flex-col gap-4 mt-12">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="text-[24px] font-bold font-[dynapuff] text-[#2D6A4F]"
        >
          LINK {index + 1}:
        </motion.span>

        <motion.div
          className={cn("w-full p-4 md:p-6 rounded-xl border-4 shadow", color)}
        >
          <input
            type="text"
            placeholder="Do you have a link ...?"
            className="w-full focus:outline-none text-[18px] font-semibold font-[dynapuff] placeholder:text-[14px] md:placeholder:text-[18px] bg-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
