import { useState, useEffect } from "react";
import Homepage from "./Homepage";
import Test from "./Test";
import Footer from "./Footer";
import getDecodedAPIResponse from "./utils";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [testArr, setTestArr] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  // used to trigger a re-fetch when playing again
  const [gameId, setGameId] = useState(0);
  const [isLoading, setIsLoading] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let timeoutId;

    async function load() {
      setIsLoading(true);
      setHasError(false);

      timeoutId = setTimeout(() => {
        setHasError(true);
        setIsLoading(false);
      }, 10000);

      try {
        const arr = await getDecodedAPIResponse();

        if (arr && arr.length > 0) {
          clearTimeout(timeoutId);

          setTestArr(arr);
          setCorrectAnswers(arr.map((q) => q.answerIndex));
          setUserAnswers(new Array(arr.length).fill(null));
          setIsLoading(false);
        } else {
          throw new Error("Empty response");
        }
      } catch (error) {
        clearTimeout(timeoutId);
        setHasError(true);
        setIsLoading(false);
        console.error(error);
      }
    }

    load();

    return () => clearTimeout(timeoutId);
  }, [gameId]); // rerender whenever gameId changes

  function updateAnswer(questionIndex, selectedIndex) {
    setUserAnswers((prev) => {
      const copy = [...prev];
      copy[questionIndex] = selectedIndex;
      return copy;
    });
  }

  function playAgain() {
    setShowAnswers(false);
    setTestArr([]);
    setGameId((prev) => prev + 1);
  }

  // calculate score by comparing userAnswers to correctAnswers
  const score = userAnswers.filter(
    (ans, idx) => ans === correctAnswers[idx]
  ).length;

  function getTests() {
    return testArr.map((obj, index) => (
      <Test
        key={`${gameId}-${index}`}
        testIndex={index}
        question={obj.question}
        choices={obj.choices}
        correctIndex={correctAnswers[index]}
        selectedIndex={userAnswers[index]}
        showAnswers={showAnswers}
        onSelect={updateAnswer}
      />
    ));
  }
  const allAnswered = userAnswers.every((ans) => ans !== null);

  return (
    <>
      {!hasStarted ? (
        <Homepage startGame={() => setHasStarted(true)} />
      ) : (
        <>
          {isLoading && <p className="message">Loading questions…</p>}

          {!isLoading && hasError && (
            <p className="message">
              Unable to load the questions. Please refresh the page.
            </p>
          )}

          {!isLoading && !hasError && testArr.length > 0 && (
            <main>{getTests()}</main>
          )}

          {testArr.length > 0 && (
            <Footer
              score={score}
              total={testArr.length}
              showAnswers={showAnswers}
              onShowAnswers={() => setShowAnswers(true)}
              onPlayAgain={playAgain}
              allAnswered={allAnswered}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
