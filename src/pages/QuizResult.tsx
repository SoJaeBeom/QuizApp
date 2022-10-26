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
            <Chart>
              <ReactApexChart
                options={options}
                series={options.series}
                type="donut"
                width="100%"
                height="100%"
              />
            </Chart>
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
  width: 70vw;
  margin: auto;
`;

const QuizResultBox = styled.div`
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

const QuizResultInfo = styled.div`
  display: flex;
  width: 66vw;
  height: 41vh;
  margin-top: 7vh;
  background-color: #ffffff;
  padding: 5px;
  border: 1px solid black;
  box-shadow: 0 5px 5px grey;
  border-radius: 9px;
`;

const Chart = styled.div`
  width: 26vw;
  margin-top: 3vh;
`;

const Info = styled.div`
  width: 26vw;
  margin-top: 3vh;
  margin-left: 8vw;
  margin-right: 5vw;

  div {
    display: flex;
    justify-content: space-between;
  }

  p {
    margin-top: 5vh;
    font-style: normal;
    font-weight: 400;
    font-size: 2vw;
    line-height: 4vh;

    color: #000000;
  }

  span {
    margin-left: 1vw;
    font-style: normal;
    font-weight: 400;
    font-size: 2vw;
    line-height: 4vh;

    color: #000000;
  }
`;
const Button = styled.button`
  width: 30.5vw;
  height: 20vh;
  margin-top: 10vh;
  margin-right: 5vw;
  border: 1px solid black;
  box-shadow: 0 5px 5px grey;
  border-radius: 9px;
  background-color: transparent;

  &:nth-child(2n) {
    margin-right: 0;
  }

  &:hover {
    border: 1px solid black;
    box-shadow: 0 15px 15px grey;
  }

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 2vw;
    line-height: 4vh;

    color: #000000;
  }
`;
