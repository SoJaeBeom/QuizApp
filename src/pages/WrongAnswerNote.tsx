import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../hooks/reduxHooks";

const WrongAnswerNote = () => {
  const navigate = useNavigate();
  const { quizAnswer, quizList } = useAppSelector(state => state.quizSlice);
  const wrongAnswerList = quizAnswer.filter(answer => {
    return answer.status === false;
  });

  const moveToHome = () => {
    navigate(-3);
  };

  return (
    <WrongAnswerNoteLayout>
      <WrongAnswerNoteWrapper>
        <WrongAnswerNoteBox>
          <Header>
            <span>오답 노트</span>
            <span>
              <img
                onClick={moveToHome}
                src={process.env.PUBLIC_URL + "/cancel.png"}
                alt="cancel"
              />
            </span>
          </Header>
          {wrongAnswerList.map((value, index) => {
            return (
              <WrongAnswerCardList key={index}>
                <Question>
                  <p>
                    Q{value.id + 1}. {quizList[value.id].question}
                  </p>
                </Question>
                <Answer>
                  <MyAnswer>
                    <p>
                      내가 선택한 답 : <span>{value.myChoice}</span>
                    </p>
                  </MyAnswer>
                  <p>
                    1.
                    {value.answerList[0] === value.orginAnswer ? (
                      <Span className="originAnswer">
                        {value.answerList[0]}
                      </Span>
                    ) : (
                      <Span>{value.answerList[0]}</Span>
                    )}
                  </p>
                  <p>
                    2.
                    {value.answerList[1] === value.orginAnswer ? (
                      <Span className="originAnswer">
                        {value.answerList[1]}
                      </Span>
                    ) : (
                      <Span>{value.answerList[1]}</Span>
                    )}
                  </p>
                  <p>
                    3.
                    {value.answerList[2] === value.orginAnswer ? (
                      <Span className="originAnswer">
                        {value.answerList[2]}
                      </Span>
                    ) : (
                      <Span>{value.answerList[2]}</Span>
                    )}
                  </p>
                  <p>
                    4.
                    {value.answerList[3] === value.orginAnswer ? (
                      <Span className="originAnswer">
                        {value.answerList[3]}
                      </Span>
                    ) : (
                      <Span>{value.answerList[3]}</Span>
                    )}
                  </p>
                </Answer>
              </WrongAnswerCardList>
            );
          })}
        </WrongAnswerNoteBox>
      </WrongAnswerNoteWrapper>
    </WrongAnswerNoteLayout>
  );
};

const WrongAnswerNoteLayout = styled.div`
  margin: auto;
`;

const WrongAnswerNoteWrapper = styled.div`
  width: 85rem;
  margin: auto;
`;

const WrongAnswerNoteBox = styled.div`
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

const WrongAnswerCardList = styled.div`
  display: flex;
  width: 80rem;
  height: 25rem;
  margin-top: 4rem;

  &:last-child {
    margin-bottom: 4rem;
  }
`;

const Question = styled.div`
  width: 50rem;
  display: flex;
  align-items: center;
  border: 1px solid black;
  box-shadow: 0 5px 5px grey;
  border-radius: 9px;
  margin-right: 5rem;
  padding: 1.25rem;

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 1.87rem;
    line-height: 2.5rem;

    color: #000000;
  }
`;

const Answer = styled.div`
  width: 25rem;
  border: 1px solid black;
  box-shadow: 0 5px 5px grey;
  border-radius: 9px;

  p {
    margin-left: 1.25rem;
    font-style: normal;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 2.5rem;

    color: #000000;
  }
`;

const MyAnswer = styled.div`
  border-bottom: 1px solid black;

  p {
    margin-left: 1.25rem;
    font-style: normal;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 2.5rem;

    color: #000000;
  }

  span {
    background-color: pink;
  }
`;

const Span = styled.span`
  background-color: ${props =>
    props.className === "originAnswer" ? "#bffbe2" : ""};
`;

export default WrongAnswerNote;
