import { useState } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ShowParticipents from "../ShowParticipents/ShowParticipents";
import ShareIcon from "@mui/icons-material/Share";
import ShareQuiz from "../ShareQuiz/ShareQuiz";
import Animations from "../Loader/Animations";

export default function ShowQuiz() {
  let [title, setTitle] = useState("Title Of The Question");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  let { id } = useParams();
  const [marks, setMarks] = useState(null);
  const [afterSub, setAfterSub] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [participents, setParticipents] = useState(null);
  const [shareBox, setShareBox] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const url = import.meta.env.VITE_BACKEND_API_URL;
      let res = await fetch(`${url}/quiz/${id}`, {
        method: "GET",
        credentials: "include",
      });
      let allData = await res.json();
      let newData = [Array(questions.length)];
      allData.data.questions.map(
        (question, idx) => (newData[idx] = { _id: question._id, ans: null })
      );

      if (allData.isOwner) {
        setAfterSub(true);
        setIsOwner(true);
      }
      setTitle(allData.data.title);
      setParticipents(allData.data.participents);
      setQuizId(allData.data._id);
      setQuestions(allData.data.questions);
      setAnswers(newData);

      setIsLoading(false);
    }
    getData();
  }, []);

  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex].ans = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let marksCount = 0;
    answers.map((el) => {
      let actAns = questions.find((ques) => ques._id == el._id);
      actAns.answer == el.ans ? marksCount++ : null;
    });
    setMarks(marksCount);
    setAfterSub(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // const url = import.meta.env.VITE_BACKEND_API_URL;
    // let result = { marks: marksCount, quizId };
    // try {
    //   let res = await fetch(`${url}/result`, {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(result),
    //   });
    //   if (!res.ok) {
    //     let errorData = await res.json();
    //     console.error(
    //       "Error to sending data to the backned : ",
    //       errorData.error
    //     );
    //   } else {
    //     let resData = await res.json();
    //     console.log(resData);
    //   }
    // } catch (err) {
    //   console.log("Error to sending data to the backned : ", err);
    // }
  };

  if (isLoading) {
    return <Animations />; // Show a loading UI until data is fetched
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center flex-col my-8"
    >
      {marks != null ? (
        <div className="md:w-2/3 mx-4 h-32 mb-4 shadow-md rounded-md text-center bg-orange-200 px-8 py-4">
          <h1 className="text-4xl font-semibold text-gray-900">
            Marks You Got - {marks}/{questions.length}
          </h1>
        </div>
      ) : null}

      <div className="md:w-1/2 p-4">
        <h1 className="text-4xl text-center font-semibold text-gray-900">
          {title}
        </h1>
      </div>

      {questions.map((question, idx) => (
        <div
          key={question._id}
          className={`bg-slate-300 md:w-1/2 rounded-md min-h-96 m-4 flex flex-col justify-center items-center gap-4 p-4`}
        >
          <h3 key={idx} className="text-xl font-semibold text-gray-800">
            {question.quesText}
          </h3>
          {question.options.map((option, optIdx) => (
            <RadioGroup key={optIdx} name="radio-buttons-group">
              <FormControlLabel
                name={`question-${idx}`}
                value={option}
                control={<Radio />}
                label={option}
                checked={answers[idx].ans === option}
                onChange={() => handleAnswerChange(idx, option)}
                required
                disabled={afterSub}
              />
            </RadioGroup>
          ))}
          {afterSub && (
            <p className="bg-green-600 text-white p-4 rounded-md min-w-60 text-center font-semibold">
              {question.answer}
            </p>
          )}
        </div>
      ))}

      {afterSub == false && (
        <Button type="submit" className="!bg-orange-700 !text-white">
          Submit
        </Button>
      )}

      {isOwner && (
        <>
          <Button
            type="button"
            onClick={() => setShareBox(!shareBox)}
            className="!bg-orange-700 !text-white !text-xl !p-3"
          >
            <ShareIcon className="mr-2" />
            Share
          </Button>
          {shareBox && <ShareQuiz />}
          <hr className="w-full mt-4" />
          <div className="flex flex-row justify-center flex-wrap md:w-1/2 mt-6">
            {participents.map((participent) => (
              <ShowParticipents
                key={participent._id}
                participent={participent.user}
                marks={participent.marks}
              />
            ))}
          </div>
        </>
      )}
    </form>
  );
}
