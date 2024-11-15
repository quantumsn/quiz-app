import { QuestionBox } from "../QuestionBox/QuestionBox";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function QuizForm() {
  let [questions, setQuestions] = useState([{ quesText: "", options: [""] }]);
  let [title, setTitle] = useState("");

  const addQuesBox = () => {
    setQuestions((prevQuestions) => {
      return [...prevQuestions, { quesText: "", options: [""] }];
    });
  };

  const onQuesUpdate = (idx, updatedQues) => {
    setQuestions((prevQuestions) => {
      prevQuestions[idx] = updatedQues;
      return [...questions];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(questions);
    setQuestions([{ quesText: "", options: [""] }]);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen text-white flex items-center justify-center flex-col"
    >
      <h1 className="w-1/2">
        <input
          type="text"
          placeholder="Write your Quiz tiltle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full text-xl bg-transparent py-3 box-border rounded-sm focus:outline-none border-b text-black"
        />
      </h1>

      {questions.map((question, idx) => (
        <QuestionBox
          key={idx}
          quesIdx={idx}
          question={question}
          onUpdate={(updatedQuestion) => onQuesUpdate(idx, updatedQuestion)}
        />
      ))}

      <Button onClick={addQuesBox} className=" !text-orange-700">
        Add Question
      </Button>
      <Button type="submit" className="!bg-green-600 !text-white !mt-4">
        Submit
      </Button>
    </form>
  );
}
