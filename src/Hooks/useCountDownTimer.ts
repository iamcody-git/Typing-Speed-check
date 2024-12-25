import { useCallback, useEffect, useRef, useState } from "react";

const useCountDownTimer = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef<number | null>(null);
  const timeLeftRef = useRef(timeLeft); // Store the latest timeLeft value

  // Update the ref value whenever timeLeft changes
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  // Function to start the countdown
  const startCountDown = useCallback(() => {
    if (intervalRef.current !== null) return; // Prevent multiple intervals

    intervalRef.current = window.setInterval(() => {
      timeLeftRef.current -= 1; // Decrement directly
      setTimeLeft(timeLeftRef.current); // Update state with the new value
      if (timeLeftRef.current <= 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, 1000);
  }, []);

  // Function to reset the countdown
  const resetCountdown = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    timeLeftRef.current = seconds; // Reset ref value
    setTimeLeft(seconds); // Reset state
  }, [seconds]);

  // Cleanup when timeLeft reaches 0 or when the component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return { timeLeft, startCountDown, resetCountdown };
};

export default useCountDownTimer;
