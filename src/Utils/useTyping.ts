import { useCallback, useEffect, useRef, useState } from 'react';

const isKeyboardCodeAllowed = (key: string) => {
    return (
        key === 'Backspace' || // Allow backspace
        key === ' ' ||         // Allow spacebar
        /[a-zA-Z0-9]/.test(key) // Allow alphanumeric characters (letters and digits)
    );
};

const useTyping = (enabled: boolean) => {
    const [cursor, setCursor] = useState(0);
    const [typed, setTyped] = useState<string>("");
    const totalTyped = useRef(0);
    const cursorRef = useRef(cursor);

    useEffect(() => {
        cursorRef.current = cursor;
    }, [cursor]);

    const keydownHandler = useCallback(
        ({ key }: KeyboardEvent) => {
            if (!enabled || !isKeyboardCodeAllowed(key)) {
                return;
            }
            switch (key) {
                case 'Backspace':
                    setTyped((prev) => prev.slice(0, -1));
                    setCursor(cursorRef.current - 1); // Use ref here
                    totalTyped.current -= 1;
                    break;
                default:
                    setTyped((prev) => prev.concat(key));
                    setCursor(cursorRef.current + 1); // Use ref here
                    totalTyped.current += 1;
            }
        },
        [enabled] // Only include `enabled` in dependencies
    );

    const clearTyped = useCallback(() => {
        setTyped("");
        setCursor(0);
    }, []);

    const resetTotalTyped = useCallback(() => {
        totalTyped.current = 0;
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', keydownHandler);

        return () => {
            console.log("Removing event listener"); // Debug log
            window.removeEventListener('keydown', keydownHandler);
        };
    }, [keydownHandler]);

    return { typed, cursor, clearTyped, resetTotalTyped, totalTyped: totalTyped.current };
};

export default useTyping;
