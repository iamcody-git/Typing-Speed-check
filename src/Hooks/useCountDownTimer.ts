import { useCallback, useEffect, useRef, useState } from "react";

const useCountDownTimer = (
  seconds: number,
  onComplete?: () => void
) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timeLeftRef = useRef(timeLeft);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const startCountDown = useCallback(() => {
    if (intervalRef.current !== null) return;

    const endTime = Date.now() + timeLeftRef.current * 1000;
    setIsRunning(true);

    intervalRef.current = window.setInterval(() => {
      const newTimeLeft = Math.round((endTime - Date.now()) / 1000);
      if (newTimeLeft <= 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setIsRunning(false);
        setTimeLeft(0);
        onComplete?.();
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 250);
  }, [onComplete]);

  const pauseCountdown = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  }, []);

  const resetCountdown = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    timeLeftRef.current = seconds;
    setTimeLeft(seconds);
    setIsRunning(false);
  }, [seconds]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return { timeLeft, isRunning, startCountDown, pauseCountdown, resetCountdown };
};

export default useCountDownTimer;
