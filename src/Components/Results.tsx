import { motion } from "framer-motion";
import { formatPercentage } from "../Utils/Helper";
import { State } from "../Hooks/useEngine";

interface ResultsProps {
  state: State;
  errors: number;
  accuracyPercentage: number;
  total: number;
  className?: string;
}

const Results: React.FC<ResultsProps> = ({ state, errors, accuracyPercentage, total, className }) => {
  if (state !== "finish") {
    return null;
  }

  const resultsData = [
    { label: "Results", value: "", delay: 0, className: "text-xl font-semibold text-center text-green-500" },
    { label: "Accuracy", value: `${formatPercentage(accuracyPercentage)}`, delay: 0.5, className:"text-green-500" },
    { label: "Errors", value: `${errors}`, delay: 1, className: "text-red-500" },
    { label: "Typed", value: `${total}`, delay: 1.4, className: "text-blue-500" },
  ];

  return (
    <motion.ul
      className={`flex flex-col items-center text-primary-400 space-y-3 ${className || ""}`}
    >
      {resultsData.map(({ label, value, delay, className = "" }, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay }}
          className={className}
        >
          {label}: {value}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Results;
