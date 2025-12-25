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

  useEffect(() => {
    async function load() {
      try {
        const arr = await getDecodedAPIResponse();
        if (arr && arr.length > 0) {
          setTestArr(arr);
          const answers = arr.map((q) => q.answerIndex);
          setCorrectAnswers(answers);
          console.log(answers.map((ans) => ans + 1));
          setUserAnswers(new Array(arr.length).fill(null));
        } else {
          setTestArr([]); // explicitly set empty if fetch fails
        }
      } catch (error) {
        setTestArr([]);
        console.log(error);
      }
    }

    load();
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
          {testArr.length > 0 ? (
            <main> {getTests()}</main>
          ) : (
            <p className="error-msg">
              unable to load the questions. please refresh the page
            </p>
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
