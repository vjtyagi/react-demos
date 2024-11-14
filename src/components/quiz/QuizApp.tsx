import { useCallback, useMemo, useState } from "react";
import { QuestionType, quiz, Response } from "./data";
export default function QuizApp() {
  const questions = quiz.questions;
  const [index, setIndex] = useState(0);
  const [isResult, setIsResult] = useState(false);
  const current = questions[index];
  const hasNext = index < questions.length - 1 ? true : false;
  const hasPrev = index > 0;
  const [userResponses, setUserResponses] = useState<Response[]>([]);
  const handleSelect = (value: string, isSelected: boolean) => {
    if (isSelected) {
      const existingResponse = userResponses.find(
        (resp: Response) => resp.question.id == current.id
      );
      if (existingResponse) {
        setUserResponses(
          userResponses.map((resp: Response) => {
            if (resp.question.id === existingResponse.question.id) {
              return {
                ...resp,
                answers: [...resp.answers, { text: value }],
              };
            } else {
              return resp;
            }
          })
        );
      } else {
        setUserResponses([
          ...userResponses,
          { question: current, answers: [{ text: value }] },
        ]);
      }
    } else {
      //deselection
      setUserResponses(
        userResponses.map((resp: Response) => {
          if (resp.question.id === current.id) {
            return {
              ...resp,
              answers: resp.answers.filter((answer) => answer.text != value),
            };
          } else {
            return resp;
          }
        })
      );
    }
  };
  const handleNext = useCallback(() => {
    hasNext && setIndex(index + 1);
  }, [hasNext, index]);
  const handlePrev = useCallback(() => {
    hasPrev && setIndex(index - 1);
  }, [hasPrev, index]);
  const userResponse = useMemo(
    () => userResponses.find((resp) => resp.question.id == current.id),
    [userResponses, current]
  );
  const handleSubmit = useCallback(() => {
    setIsResult(true);
  }, []);

  return (
    <div className="quiz-app">
      {isResult ? (
        <Result responses={userResponses} />
      ) : (
        <>
          <Question
            data={current}
            onSelect={handleSelect}
            userResponse={userResponse}
          />
          <button disabled={!hasNext} onClick={handleNext}>
            Next
          </button>
          <button disabled={!hasPrev} onClick={handlePrev}>
            Prev
          </button>
          {!hasNext && <button onClick={handleSubmit}>Submit Quiz</button>}
        </>
      )}
    </div>
  );
}
export function Question({
  data,
  onSelect,
  userResponse,
}: {
  data: QuestionType;
  onSelect: Function;
  userResponse?: Response;
}) {
  return (
    <div className="question">
      <h2>{data.text}</h2>
      <div className="options">
        {data.options.map((option) => (
          <Option
            key={option.text}
            value={option.text}
            onSelect={onSelect}
            isSelected={
              userResponse &&
              userResponse.answers.some((ans) => ans.text === option.text)
            }
          />
        ))}
      </div>
    </div>
  );
}
function Option({
  value,
  isSelected = false,
  onSelect,
}: {
  value: string;
  isSelected?: boolean;
  onSelect: Function;
}) {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isSelected = event.target.checked;
      onSelect(value, isSelected);
    },
    [value, isSelected]
  );
  return (
    <div className="option">
      <input type="checkbox" onChange={handleChange} checked={isSelected} />
      {value}
    </div>
  );
}
function Result({ responses }: { responses: Response[] }) {
  let score = useMemo(
    () =>
      responses.reduce((acc, curr) => {
        if (curr.answers.length == curr.question.answer.length) {
          const answers = curr.question.answer.map((answer) => answer.text);
          const isCorrect = curr.answers.every((ans) =>
            answers.includes(ans.text)
          );
          return isCorrect ? curr.question.marks + acc : 0;
        } else {
          return acc;
        }
      }, 0),
    [responses]
  );
  return <div className="result-screen">Total Score : {score}</div>;
}
