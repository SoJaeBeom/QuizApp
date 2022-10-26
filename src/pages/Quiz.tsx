import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
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
    return <Loading />;
  }
};

export default Quiz;

const QuizLayout = styled.div`
  margin: auto;
`;
const QuizWrapper = styled.div`
  width: 70vw;
  margin: auto;
`;

const QuizBox = styled.div`
  width: 66vw;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    margin-top: 6vh;
    font-style: normal;
    font-weight: 400;
    font-size: 3vw;
    line-height: 4vh;

    color: #000000;
  }

  img {
    width: 1vw;
    height: 2vh;
    cursor: pointer;
  }
`;

const Question = styled.div`
  display: flex;
  align-items: center;
  width: 66vw;
  height: 14vh;
  margin-top: 7vh;

  border: 1px solid black;
  box-shadow: 0 5px 5px grey;
  border-radius: 9px;

  h1 {
    margin-left: 1vw;
    font-style: normal;
    font-weight: 500;
    font-size: 2vw;
    line-height: 4vh;
    color: #000000;
  }
`;

const Answers = styled.div`
  display: flex;
  margin-top: 10vh;
`;

const Answer = styled.div`
  display: grid;
  align-items: center;
  text-align: center;
  width: 16vw;
  height: 48vh;
  margin-right: 1vw;
  border: 1px solid black;
  box-shadow: 0 5px 5px grey;
  border-radius: 9px;
  cursor: pointer;

  &:nth-child(4n) {
    margin-right: 0;
  }

  &:hover {
    border: 1px solid black;
    box-shadow: 0 15px 15px grey;
  }

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 1vw;
    line-height: 4vh;

    color: #000000;
  }
`;

const SelectAnswer = styled.div`
  display: grid;
  align-items: center;
  width: 16vw;
  height: 48vh;
  border: 2px solid
    ${props => (props.className === "correct" ? "#bffbe2" : "pink")};
  box-shadow: 0 15px 15px grey;
  border-radius: 9px;
  margin-right: 1vw;
  bottom: ${props => (props.className === "correct" ? "3vh" : "0")};
  text-align: center;

  &:nth-child(4n) {
    margin-right: 0;
  }

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 1vw;
    line-height: 4vh;

    color: #000000;
  }
`;

const Button = styled.button`
  position: fixed;
  right: 0.5vw;
  bottom: 1vh;
  width: 16vw;
  height: 8vh;
  background-color: transparent;
  border: 1px solid black;
  box-shadow: 0 5px 5px grey;
  border-radius: 9px;

  &:hover {
    border: 1px solid black;
    box-shadow: 0 15px 15px grey;
  }
`;
