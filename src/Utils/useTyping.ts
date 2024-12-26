import { useCallback, useEffect, useRef, useState } from "react";

const isKeyboardCodeAllowed = (key: string): boolean => {
  return (
    key === "Backspace" || // Allow backspace
    key === " " || // Allow spacebar
    /^[a-zA-Z0-9]$/.test(key) // Allow alphanumeric characters (letters and digits)
  );
};

const useTyping = (enabled: boolean) => {
  const [typed, setTyped] = useState<string>("");  // Tracks the typed characters
  const totalTyped = useRef(0);  // Tracks the total typed characters, to avoid triggering re-renders
  const cursorRef = useRef(0);  // Ref for tracking the cursor position

  // Sync cursor state with its ref
  const updateCursor = useCallback((newCursor: number) => {
    cursorRef.current = Math.max(0, newCursor);  // Ensure cursor doesn't go negative
  }, []);

  const keydownHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (!enabled || !isKeyboardCodeAllowed(key)) return;

      switch (key) {
        case "Backspace":
          setTyped((prev) => prev.slice(0, -1));
          updateCursor(cursorRef.current - 1);
          totalTyped.current = Math.max(0, totalTyped.current - 1);  // Ensure totalTyped is not negative
          break;

        default:
          setTyped((prev) => prev + key);
          updateCursor(cursorRef.current + 1);
          totalTyped.current += 1;
      }
    },
    [enabled, updateCursor]
  );

  const clearTyped = useCallback(() => {
    setTyped("");
    updateCursor(0);  // Reset cursor position when clearing typed
    totalTyped.current = 0;  // Reset the total typed characters
  }, [updateCursor]);

  const resetTotalTyped = useCallback(() => {
    totalTyped.current = 0;  // Reset only the total typed count
  }, []);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler, enabled]);

  return {
    typed,
    cursor: cursorRef.current,  // Use cursorRef for current cursor position
    clearTyped,
    resetTotalTyped,
    totalTyped: totalTyped.current,  // Access totalTyped directly from the ref
  };
};

export default useTyping;
