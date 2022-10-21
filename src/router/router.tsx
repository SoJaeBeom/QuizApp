import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Quiz from "../pages/Quiz";
import QuizResult from "../pages/QuizResult";
import WrongAnswerNote from "../pages/WrongAnswerNote";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/wronganswer" element={<WrongAnswerNote />} />
          <Route path="/result" element={<QuizResult />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="*" element={<div>404 Error</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
