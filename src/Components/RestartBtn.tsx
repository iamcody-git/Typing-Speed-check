import { ReloadIcon } from '@radix-ui/react-icons';
import { useRef } from 'react';

const RestartBtn = ({
    onRestart: handleRestart,
    className = "",
}: {
    onRestart: () => void;
    className?: string;
}) => {
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        btnRef.current?.blur();
        handleRestart();
    };

    return (
        <>
            <button
                ref={btnRef}
                onClick={handleClick} 
                className={`block rounded px-8 py-2 hover:bg-state-700/50 ${className}`}
            >
                <ReloadIcon className="w-6 h-6" />
            </button>
        </>
    );
};

export default RestartBtn;
