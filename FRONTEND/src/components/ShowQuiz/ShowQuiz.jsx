import { useState } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ShowQuiz() {
  let [title, setTitle] = useState("Title Of The Question");
  const [questions, setQuestions] = useState([
    {
      text: "What is the capital of France?",
      options: ["Paris", "London", "Rome", "Berlin"],
    },
    {
      text: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
    },
    {
      text: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Dolphin"],
    },
    {
      text: "Who wrote 'Romeo and Juliet'?",
      options: [
        "William Shakespeare",
        "Charles Dickens",
        "J.K. Rowling",
        "Mark Twain",
      ],
    },
  ]);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(answers);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center flex-col my-8"
    >
      <h1 className="text-4xl font-semibold text-gray-900">{title}</h1>

      {questions.map((question, idx) => (
        <div
          key={idx}
          className="bg-slate-300 w-1/2 rounded-sm min-h-96 my-4 flex flex-col justify-center items-center gap-4 py-4"
        >
          <h3 key={idx} className="text-xl font-semibold text-gray-800">
            {question.text}
          </h3>
          {question.options.map((option, optIdx) => (
            <RadioGroup key={optIdx} name="radio-buttons-group">
              <FormControlLabel
                name={`question-${idx}`}
                value={option}
                control={<Radio />}
                label={option}
                checked={answers[idx] === option}
                onChange={() => handleAnswerChange(idx, option)}
              />
            </RadioGroup>
          ))}
        </div>
      ))}

      <Button type="submit" className="!bg-orange-700 !text-white">
        Submit
      </Button>
    </form>
  );
}
