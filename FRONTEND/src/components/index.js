// import { InputBox } from "./InputBox/InputBox.jsx";
// import { QuestionBox } from "./QuestionBox/QuestionBox";
// import { OptionsBox } from "./OptionsBox/OptionsBox.jsx";
// import QuizForm from "./QuizForm/QuizForm.jsx";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Animations from "./Loader/Animations.jsx";
// import Quizzes from "./Quizzes/Quizzes.jsx";
// import ShowQuiz from "./ShowQuiz/ShowQuiz.jsx";
// import Login from "./Login/Login.jsx";
// import SignUp from "./SignUp/SignUp.jsx";
// import ErrorPage from "./ErrorPage/ErrorPage.jsx";

export {
  //   InputBox,
  //   QuestionBox,
  //   OptionsBox,
  //   QuizForm,
  Header,
  Footer,
  Animations,
  //   Quizzes,
  //   ShowQuiz,
  //   Login,
  //   SignUp,
  //   ErrorPage,
};

// components/index.js
import { lazy } from "react";

export const QuizForm = lazy(() => import("./QuizForm/QuizForm"));
export const ShowQuiz = lazy(() => import("./ShowQuiz/ShowQuiz"));
export const Login = lazy(() => import("./Login/Login"));
export const SignUp = lazy(() => import("./SignUp/SignUp"));
export const Quizzes = lazy(() => import("./Quizzes/Quizzes"));
export const ErrorPage = lazy(() => import("./ErrorPage/ErrorPage"));
