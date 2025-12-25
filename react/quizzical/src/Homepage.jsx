export default function Homepage({ startGame }) {
  return (
    <section className="hero-content">
      <h1>Quizzical</h1>
      <button className="common" onClick={startGame}>
        start quiz
      </button>
    </section>
  );
}
