import React from "react";
import RestartBtn from "./Components/RestartBtn";
import Results from "./Components/Results";
import UserTyping from "./Components/UserTyping";
import useEngine from "./Hooks/useEngine";
import { caculatedAccuracyPercentage } from "./Utils/Helper";

function App() {
  const { state, words, timeLeft, typed, errors, restart, totalTyped } = useEngine();

  return (
    <>
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GenerateWords words={words} />
        <UserTyping
          className="absolute inset-0"
          userInput={typed}
          words={words}
          enabled={state !== "finish"}  // Enabling typing based on the state
        />
      </WordsContainer>

      <RestartBtn
        className={"mx-auto mt-10 text-slate-500"} // Restart button styling
        onRestart={restart} // Call the restart function
      />

      <Results
        state={state}
        className="mt-10" // Styling for results
        errors={errors} // Pass errors count
        accuracyPercentage={caculatedAccuracyPercentage(errors, totalTyped)} // Calculate accuracy
        total={totalTyped} // Pass total typed characters
      />
    </>
  );
}

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-xl leading-relaxed break-all mt-3">
      {children} {/* Render child components */}
    </div>
  );
};

const GenerateWords = ({ words }: { words: string }) => {
  return <div className="text-slate-500">{words}</div>;
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return (
    <div className="text-4xl text-center text-slate-500">
      {timeLeft}
    </div>
  );
};

export default App;
