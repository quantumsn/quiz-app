import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import Animations from "../Loader/Animations";
import { useFlashMsg } from "../../contexts/FlashMsgProvidor";
import FlashMsg from "../FlashMsg/FlashMsg";

export default function Quizzes() {
  let [quizzes, setQuizzes] = useState([]);
  let { flashMsg } = useFlashMsg();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getdata() {
      const url = import.meta.env.VITE_BACKEND_API_URL;
      try {
        let res = await fetch(`${url}/home`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          let errorData = await res.json();
          console.log(
            "Error to fetching data from backend : ",
            errorData.error
          );
        } else {
          let data = await res.json();
          setQuizzes(data);
        }
      } catch (err) {
        console.error(err.message);
      }
      setIsLoading(false);
    }
    getdata();
  }, []);

  if (isLoading) {
    return <Animations />; // Show a loading UI until data is fetched
  }

  return (
    <div className="md:min-h-screen flex items-center flex-col px-8 gap-4 text-gray-900">
      {flashMsg != null && <FlashMsg />}
      <h1 className="font-bold text-3xl my-8">Your Quizzes</h1>
      {quizzes.length === 0 && (
        <>
          <div className="p-4 flex flex-col justify-center items-center my-16">
            <ImportContactsIcon className="!h-12 !w-12 text-gray-400" />
            <p className="font-bold p-2">No quizzes yet</p>
            <p>Get started by creating a new quiz</p>
          </div>
        </>
      )}
      {quizzes.map((quiz) => (
        <Link
          className="md:w-3/4 w-full"
          key={quiz._id}
          to={`/quiz/${quiz._id}`}
        >
          <div
            key={quiz._id}
            className="shadow-md rounded-md hover:shadow-lg p-4 mx-4"
          >
            <h4 className="text-xl font-semibold">{quiz.title}</h4>
            <div className="flex gap-4">
              <ImportContactsIcon className="text-gray-500" />
              <p className="text-gray-500">Questions {quiz.questions.length}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
