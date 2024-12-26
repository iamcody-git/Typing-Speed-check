import { useCallback, useEffect, useState } from "react";
import useWords from "./useWords";
import useCountDownTimer from "./useCountDownTimer";
import useTyping from "../Utils/useTyping";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 30;
const COUNTDOWN_SECONDS = 30;

// Function to count errors between typed text and expected text
const countErrors = (typed: string, expected: string) => {
  let errors = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] !== expected[i]) {
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

  // Summing up errors when a word set is completed
  const sumErrors = useCallback(() => {
    setErrors((prevErrors) => prevErrors + countErrors(typed, words));
  }, [typed, words]);

  // Transition from "start" to "run" state
  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountDown();
    }
  }, [isStarting, startCountDown]);

  // Handle word completion
  useEffect(() => {
    if (areWordsFinished) {
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [areWordsFinished, sumErrors, updateWords, clearTyped]);

  // Handle timer expiration
  useEffect(() => {
    if (timeLeft === 0 && state === "run") {
      setState("finish");
    }
  }, [timeLeft, state]);

  // Restart logic
  const restart = useCallback(() => {
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [resetCountdown, resetTotalTyped, updateWords, clearTyped]);

  return { state, words, timeLeft, typed, errors, totalTyped, restart };
};


export default useEngine;
