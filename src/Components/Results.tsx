import { motion } from "framer-motion";
import { formatPercentage } from "../Utils/Helper";
import { State } from "../Hooks/useEngine";

const Results = ({
  state,
  errors,
  accuracyPercentage,
  total,
  className,
}: {
  state: State;
  errors: number;
  accuracyPercentage: number;
  total: number;
  className?: string;
}) => {
  const initial = { opacity: 0 }; // Fixed case for opacity
  const animate = { opacity: 1 }; // Fixed case for opacity
  const duration = { duration: 0.3 }; // Fixed duration property

  if (state !== "finish") {
    return null; // Only render when state is 'finish'
  }

  return (
    <motion.ul
      className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        className="text-xl font-semibold text-center"
        transition={{ ...duration, delay: 0 }}
      >
        Results
      </motion.li>

      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
      >
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>

      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>

      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1.4 }}
      >
        Typed: {total}
      </motion.li>
    </motion.ul>
  );
};

export default Results;
