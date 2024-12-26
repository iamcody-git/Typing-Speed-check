import { ReloadIcon } from "@radix-ui/react-icons";
import { useRef } from "react";

interface RestartBtnProps {
  onRestart: () => void;
  className?: string;
  disabled?: boolean; // Optional prop to disable the button
  iconSize?: string; // Customizable icon size
  iconColor?: string; // Customizable icon color
}

const RestartBtn: React.FC<RestartBtnProps> = ({
  onRestart: handleRestart,
  className = "",
  disabled = false,
  iconSize = "6", 
    iconColor = "black", 
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    btnRef.current?.blur();
    handleRestart();
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      disabled={disabled}
      className={`block rounded px-8 py-2 hover:bg-state-700/50 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      aria-label="Restart"
    >
      <ReloadIcon className={`w-${iconSize} h-${iconSize} text-${iconColor}`} />
    </button>
  );
};

export default RestartBtn;
