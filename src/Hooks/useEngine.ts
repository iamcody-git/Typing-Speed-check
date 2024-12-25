import { useCallback, useEffect, useState } from "react";
import useWords from "./useWords";
import useCountDownTimer from "./useCountDownTimer";
import useTyping from "../Utils/useTyping";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 30;
const COUNTDOWN_SECONDS = 30;

// Function to count errors between typed text and expected text
const countErrors = (typed: string, wordsReached: boolean) => {
  if (!wordsReached) return 0; 
  let errors = 0;
  const typedArray = typed.split("");
  for (let i = 0; i < typedArray.length; i++) {
    if (typedArray[i] !== typedArray[i]) {
      errors++; 
    }
  }
  return errors;
};

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const { timeLeft, startCountDown, resetCountdown } = useCountDownTimer(COUNTDOWN_SECONDS);
  const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTyping(state !== "finish");

  const [errors, setErrors] = useState(0);

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const sumErrors = useCallback(() => {
    const wordsReached = cursor === words.length;
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));  
  }, [typed, words, cursor]);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountDown();
    }
  }, [isStarting, startCountDown, cursor]);

  useEffect(() => {
    if (areWordsFinished) {
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [cursor, words, clearTyped, typed, areWordsFinished, updateWords, sumErrors]);

  const restart = useCallback(() => {
    resetCountdown();
    resetTotalTyped();
    resetCountdown();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  // Return everything, including restart
  return { state, words, timeLeft, typed, errors, totalTyped, restart };
};

export default useEngine;
