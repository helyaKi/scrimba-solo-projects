import clsx from "clsx";

export default function Questionbox({
  testIndex,
  question,
  choices,
  correctIndex,
  selectedIndex,
  showAnswers,
  onSelect,
}) {
  return (
    <section className="test-body">
      <h3 className="stem">{question}</h3>

      <form className="choice-wrapper">
        {choices.map((choice, index) => (
          <label
            key={index}
            className={clsx("choice", {
              correct:
                showAnswers && index === correctIndex && selectedIndex !== null,
              incorrect:
                showAnswers &&
                index === selectedIndex &&
                index !== correctIndex,
              "not-selected":
                showAnswers &&
                index !== selectedIndex &&
                index !== correctIndex,
            })}
          >
            <input
              type="radio"
              name={`q-${testIndex}`}
              checked={selectedIndex === index}
              disabled={showAnswers}
              onChange={() => onSelect(testIndex, index)}
            />
            {choice}
          </label>
        ))}
      </form>
      <hr className="divider" />
    </section>
  );
}
