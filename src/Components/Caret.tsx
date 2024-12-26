import { motion } from "framer-motion";

interface CaretProps {
  color?: string; // Customize the caret color
  height?: string; // Customize the caret height
  enabled?: boolean; // Control visibility
}

const Caret: React.FC<CaretProps> = ({ color = "bg-yellow-500", height = "h-7", enabled = true }) => {
  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden={true}
      className={`inline-block ${color} w-0.5 ${height}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
    />
  );
};

export default Caret;
