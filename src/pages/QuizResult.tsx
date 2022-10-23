import styled from "styled-components";
import { useAppSelector } from "../hooks/reduxHooks";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useLocation, useNavigate } from "react-router-dom";

const QuizResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizAnswer } = useAppSelector(state => state.quizSlice);
  const state = location.state as { elapsedTime: number };

  const correctAmount = quizAnswer.filter(answer => {
    return answer.status;
  }).length;

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    series: [correctAmount, quizAnswer.length - correctAmount],
    labels: ["정답", "오답"],
    legend: {
      position: "bottom",
    },

    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    colors: ["#3BD998", "#EEB2B2"],
  };

  const moveToHome = () => {
    navigate(-2);
  };

  const reStartQuiz = () => {
    navigate(-1);
  };

  const moveToWrongAnswerNote = () => {
    navigate("/wronganswer");
  };

  const convertTime = (elapsedTime: number) => {
    const hour =
      Math.floor(elapsedTime / 3600) < 10
        ? "0" + Math.floor(elapsedTime / 3600)
        : Math.floor(elapsedTime / 3600);

    const min =
      Math.floor((elapsedTime % 3600) / 60) < 10
        ? "0" + Math.floor((elapsedTime % 3600) / 60)
        : Math.floor((elapsedTime % 3600) / 60);

    const sec =
      elapsedTime % 60 < 10 ? "0" + (elapsedTime % 60) : elapsedTime % 60;

    return hour + " : " + min + " : " + sec;
  };

  return (
    <QuizResultLayout>
      <QuizResultWrapper>
        <QuizResultBox>
          <Header>
            <span>시험 결과</span>
            <span>
              <img
                onClick={moveToHome}
                src={process.env.PUBLIC_URL + "/cancel.png"}
                alt="cancel"
              />
            </span>
          </Header>
          <QuizResultInfo>
            <div>
              <ReactApexChart
                options={options}
                series={options.series}
                type="donut"
                width="500"
              />
            </div>
            <Info>
              <div>
                <p>걸린시간</p>
                <p>{convertTime(state.elapsedTime)}</p>
              </div>
              <div>
                <p>정답</p>
                <p>
                  {correctAmount} 문제 / {quizAnswer.length} 문제
                </p>
              </div>
              <div>
                <p>오답</p>
                <p>
                  {quizAnswer.length - correctAmount} 문제 / {quizAnswer.length}
                  문제
                </p>
              </div>
            </Info>
          </QuizResultInfo>
          <Button onClick={reStartQuiz}>
            <span>다시 풀기</span>
          </Button>
          <Button onClick={moveToWrongAnswerNote}>
            <span>오답 노트</span>
          </Button>
        </QuizResultBox>
      </QuizResultWrapper>
    </QuizResultLayout>
  );
};

export default QuizResult;

const QuizResultLayout = styled.div`
  margin: auto;
`;
const QuizResultWrapper = styled.div`
  width: 85rem;
  margin: auto;
`;

const QuizResultBox = styled.div`
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

const QuizResultInfo = styled.div`
  display: flex;
  width: 80rem;
  height: 25rem;
  margin-top: 4rem;
  background-color: #ffffff;
  padding: 5px;
  border: 1px solid black;
  box-shadow: 0 5px 5px grey;
  border-radius: 9px;
`;

const Info = styled.div`
  width: 31.25rem;
  margin-left: 9.37rem;

  div {
    display: flex;
    justify-content: space-between;
  }

  p {
    margin-top: 3.12rem;
    font-style: normal;
    font-weight: 400;
    font-size: 2.5rem;
    line-height: 2.5rem;

    color: #000000;
  }

  span {
    margin-left: 1.25rem;
    font-style: normal;
    font-weight: 400;
    font-size: 1.87rem;
    line-height: 2.5rem;

    color: #000000;
  }
`;
const Button = styled.button`
  width: 37rem;
  height: 12rem;
  margin-top: 6.4rem;
  margin-right: 5.6rem;
  border: 1px solid black;
  box-shadow: 0 5px 5px grey;
  border-radius: 9px;
  background-color: transparent;

  &:nth-child(2n) {
    margin-right: 0px;
  }

  &:hover {
    border: 1px solid black;
    box-shadow: 0 15px 15px grey;
  }

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 2.5rem;

    color: #000000;
  }
`;
