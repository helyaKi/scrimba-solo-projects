import clsx from "clsx";
export default function Footer({
  onShowAnswers,
  showAnswers,
  score,
  total,
  onPlayAgain,
  allAnswered,
}) {
  return (
    <footer>
      {showAnswers ? (
        <>
          <p className="score-text">
            You scored{" "}
            <span
              className={clsx({
                pass: score >= Math.ceil(total / 2),
                fail: score < Math.ceil(total / 2),
              })}
            >
              {score}/{total}
            </span>{" "}
            correct answers
          </p>
          <button className="common" onClick={onPlayAgain}>
            play again
          </button>
        </>
      ) : (
        <button
          className="show-answer-btn common"
          onClick={onShowAnswers}
          disabled={!allAnswered}
        >
          show answers
        </button>
      )}
    </footer>
  );
}
