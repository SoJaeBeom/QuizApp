import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  checkQuizAnswer,
  getQuizItem,
  reset,
} from "../redux/modules/quizSlice";

const Quiz = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { quizItem, quizList, isFinish } = useAppSelector(
    state => state.quizSlice,
  );
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    dispatch(reset());
    setStartTime(getCurrentTime());
  }, []);

  const getCurrentTime = () => {
    return new Date().getTime();
  };

  const moveToHome = () => {
    navigate(-1);
  };

  const nextQuiz = () => {
    if (quizItem.id + 1 === quizList.length) {
      const elapsedTime = (getCurrentTime() - startTime) / 1000;
      alert("모든 퀴즈를 풀었습니다! 퀴즈가 종료됩니다!");
      navigate("/result", {
        state: { elapsedTime: Math.floor(elapsedTime) },
      });
      dispatch(getQuizItem(0));
    } else {
      dispatch(getQuizItem(quizItem.id + 1));
    }
    setIsSelect(false);
  };

  const test = (event: MouseEvent<HTMLDivElement>) => {
    const eventTarget = event.target as HTMLDivElement;
    if (!isSelect) {
      if (eventTarget.innerText === quizItem.correct_answer) {
        dispatch(
          checkQuizAnswer({
            id: quizItem.id,
            status: true,
            myChoice: eventTarget.innerText,
            orginAnswer: quizItem.correct_answer,
            answerList: quizItem.answers,
          }),
        );
        alert("정답입니다! 맞추셨네요!");
      } else {
        dispatch(
          checkQuizAnswer({
            id: quizItem.id,
            status: false,
            myChoice: eventTarget.innerText,
            orginAnswer: quizItem.correct_answer,
            answerList: quizItem.answers,
          }),
        );
        alert("오답입니다! 틀리셨네요!");
      }

      setIsSelect(true);
    }
  };

  if (isFinish) {
    return (
      <QuizLayout>
        <QuizWrapper>
          <QuizBox>
            <Header>
              <span>
                {quizItem.id + 1} / {quizList.length}개
              </span>
              <span>
                <img
                  onClick={moveToHome}
                  src={process.env.PUBLIC_URL + "/cancel.png"}
                  alt="cancel"
                />
              </span>
            </Header>
            <Question>
              <h1>{quizItem.question}</h1>
            </Question>

            {isSelect ? (
              <Answers>
                {quizItem.answers.map((answer, index) => {
                  if (answer === quizItem.correct_answer) {
                    return (
                      <SelectAnswer
                        className="correct"
                        key={index}
                        onClick={test}
                      >
                        <span>{answer}</span>
                      </SelectAnswer>
                    );
                  } else {
                    return (
                      <SelectAnswer
                        className="inCorrect"
                        key={index}
                        onClick={test}
                      >
                        <span>{answer}</span>
                      </SelectAnswer>
                    );
                  }
                })}
              </Answers>
            ) : (
              <Answers>
                {quizItem.answers.map((answer, index) => {
                  return (
                    <Answer key={index} onClick={test}>
                      <span>{answer}</span>
                    </Answer>
                  );
                })}
              </Answers>
            )}

            {isSelect ? <Button onClick={nextQuiz}>다음 문제</Button> : ""}
          </QuizBox>
        </QuizWrapper>
      </QuizLayout>
    );
  } else {
    return <div>로딩중</div>;
  }
};

export default Quiz;

const QuizLayout = styled.div`
  margin: auto;
`;
const QuizWrapper = styled.div`
  width: 85rem;
  margin: auto;
`;

const QuizBox = styled.div`
  width: 80rem;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    margin-top: 3.75rem;
    font-style: normal;
    font-weight: 400;
    font-size: 3.12rem;
    line-height: 2.5rem;

    color: #000000;
  }

  img {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
  }
`;

const Question = styled.div`
  display: flex;
  align-items: center;
  width: 80rem;
  height: 8.75rem;
  margin-top: 4rem;

  border: 1px solid black;
  box-shadow: 0 5px 5px grey;
  border-radius: 9px;

  h1 {
    margin-left: 1.25rem;
    font-style: normal;
    font-weight: 500;
    font-size: 1.87rem;
    line-height: 2.5rem;
    color: #000000;
  }
`;

const Answers = styled.div`
  display: flex;
  margin-top: 5.93rem;
`;

const Answer = styled.div`
  display: grid;
  align-items: center;
  text-align: center;
  width: 18.75rem;
  height: 29rem;
  margin-right: 1.56rem;
  border: 1px solid black;
  box-shadow: 0 5px 5px grey;
  border-radius: 9px;
  cursor: pointer;

  &:nth-child(4n) {
    margin-right: 0px;
  }

  &:hover {
    border: 1px solid black;
    box-shadow: 0 15px 15px grey;
  }

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 2.5rem;

    color: #000000;
  }
`;

const SelectAnswer = styled.div`
  display: grid;
  align-items: center;
  width: 18.75rem;
  height: 29rem;
  border: 2px solid
    ${props => (props.className === "correct" ? "#bffbe2" : "pink")};
  box-shadow: 0 15px 15px grey;
  border-radius: 9px;
  margin-right: 1.56rem;
  bottom: ${props => (props.className === "correct" ? "30px" : "0px")};
  text-align: center;

  &:nth-child(4n) {
    margin-right: 0px;
  }

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 2.5rem;

    color: #000000;
  }
`;

const Button = styled.button`
  position: fixed;
  right: 0.62rem;
  bottom: 0.9rem;
  width: 18.75rem;
  height: 5rem;
  background-color: transparent;
  border: 1px solid black;
  box-shadow: 0 5px 5px grey;
  border-radius: 9px;

  &:hover {
    border: 1px solid black;
    box-shadow: 0 15px 15px grey;
  }
`;
