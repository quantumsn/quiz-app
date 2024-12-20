import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import {
  QuizForm,
  ShowQuiz,
  Login,
  SignUp,
  Quizzes,
  ErrorPage,
  Animations,
} from "./components";
import ProtectedRoute from "./contexts/ProtectedRoute.jsx";
import AlreadyLogged from "./contexts/AlreadyLogged.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path=""
        element={
          // <ProtectedRoute>
          <Suspense fallback={<Animations />}>
            <Quizzes />
          </Suspense>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/quiz/:id"
        element={
          // <ProtectedRoute>
          <Suspense fallback={<Animations />}>
            <ShowQuiz />
          </Suspense>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/quiz/new"
        element={
          // <ProtectedRoute>
          <Suspense fallback={<Animations />}>
            <QuizForm />
          </Suspense>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          // <AlreadyLogged>
          <Suspense fallback={<Animations />}>
            <Login />
          </Suspense>
          // </AlreadyLogged>
        }
      />
      <Route
        path="/signup"
        element={
          // <AlreadyLogged>
          <Suspense fallback={<Animations />}>
            <SignUp />
          </Suspense>
          // </AlreadyLogged>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
