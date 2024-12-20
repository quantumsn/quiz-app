import { QuestionBox } from "../QuestionBox/QuestionBox";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizForm() {
  let [questions, setQuestions] = useState([
    { quesText: "", options: [""], answer: "" },
  ]);
  let [title, setTitle] = useState("");

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_BACKEND_API_URL;
    let bodyContent = {
      quiz: {
        title,
        questions: questions.map((ques) => ({
          ...ques,
          answer:
            ques.answer[0].toUpperCase() +
            ques.answer.slice(1).toLowerCase().trim(),
        })),
      },
    };
    try {
      let res = await fetch(`${url}/quiz/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bodyContent),
      });

      if (!res.ok) {
        throw new Error("Bhag bsdk");
      } else {
        let resData = await res.json();
        navigate(`/quiz/${resData.quizId}`);
        console.log(resData);
      }
    } catch (err) {
      console.error("Error sending data to Backend : ", err);
    }
    setTitle("");
    setQuestions([{ quesText: "", options: [""], answer: "" }]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen text-white flex items-center justify-center flex-col"
    >
      <h1 className="text-gray-900 font-bold text-3xl m-8">Create New Quiz</h1>
      <h1 className="md:w-1/2">
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
