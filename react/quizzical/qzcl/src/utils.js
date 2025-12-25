import { decode } from "html-entities";

export default async function getDecodedAPIResponse() {
  const TRIVIA_API = import.meta.env.VITE_TRIVIA_API_URL;

  const response = await fetch(TRIVIA_API);
  const data = await response.json();

  const decodedResults = data.results.map((testObj) => {
    const question = decode(testObj.question);
    const correctAnswer = decode(testObj.correct_answer);
    const incorrectAsnwers = testObj.incorrect_answers.map((ans) =>
      decode(ans)
    );
    const { choices, answerIndex } = getFullAnswers(
      incorrectAsnwers,
      correctAnswer
    );

    return {
      question: question,
      answer: correctAnswer,
      choices: choices,
      answerIndex: answerIndex,
    };
  });
  return decodedResults;
}
function getFullAnswers(arr, item) {
  const randomIndex = Math.floor(Math.random() * (arr.length + 1));
  const choices = [
    ...arr.slice(0, randomIndex),
    item,
    ...arr.slice(randomIndex),
  ];
  return { choices, answerIndex: randomIndex };
}
