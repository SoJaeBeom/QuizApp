import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Selector from "../components/Selector";
import { useAppDispatch } from "../hooks/reduxHooks";
import { __getQuizList } from "../redux/modules/quizSlice";
import {
  amountOfQuestions,
  categoryOfQuestions,
  difficultyOfQuestions,
  ISelectSetting,
} from "../types/SelectorTypes";

const Main = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectSetting, setSelectSetting] = useState<ISelectSetting>({
    category: "",
    difficulty: "",
    amount: "",
  });

  const startQuiz = () => {
    if (
      !selectSetting.category ||
      !selectSetting.difficulty ||
      !selectSetting.amount
    ) {
      alert("선택하지 않은 세팅을 확인해주세요!");
    } else {
      convertValue();
    }
  };

  const convertValue = () => {
    if (selectSetting.category === "랜덤") {
      selectSetting.category = "";
    } else if (selectSetting.category === "책") {
      selectSetting.category = "10";
    } else if (selectSetting.category === "영화") {
      selectSetting.category = "11";
    } else if (selectSetting.category === "음악") {
      selectSetting.category = "12";
    }

    if (selectSetting.difficulty === "랜덤") {
      selectSetting.difficulty = "";
    } else if (selectSetting.difficulty === "쉬움") {
      selectSetting.difficulty = "easy";
    } else if (selectSetting.difficulty === "중간") {
      selectSetting.difficulty = "medium";
    } else if (selectSetting.difficulty === "어려움") {
      selectSetting.difficulty = "hard";
    }

    if (selectSetting.amount === "10 문제") {
      selectSetting.amount = "10";
    } else if (selectSetting.amount === "20 문제") {
      selectSetting.amount = "20";
    } else if (selectSetting.amount === "30 문제") {
      selectSetting.amount = "30";
    } else if (selectSetting.amount === "40 문제") {
      selectSetting.amount = "40";
    } else if (selectSetting.amount === "50 문제") {
      selectSetting.amount = "50";
    }

    dispatch(__getQuizList(selectSetting));
    navigate("/quiz");
  };

  return (
    <MainLayout>
      <MainWrapper>
        <MainBox>
          <h1>Quiz APP</h1>
          <SelectWrapper>
            <SelectSection>
              <Selector
                props={categoryOfQuestions}
                selectSetting={selectSetting}
                setSelectSetting={setSelectSetting}
              />
            </SelectSection>
            <SelectSection>
              <Selector
                props={difficultyOfQuestions}
                selectSetting={selectSetting}
                setSelectSetting={setSelectSetting}
              />
            </SelectSection>
            <SelectSection>
              <Selector
                props={amountOfQuestions}
                selectSetting={selectSetting}
                setSelectSetting={setSelectSetting}
              />
            </SelectSection>
          </SelectWrapper>

          <Button onClick={startQuiz}>
            <span>퀴즈 풀기</span>
          </Button>
        </MainBox>
      </MainWrapper>
    </MainLayout>
  );
};

export default Main;

const MainLayout = styled.div`
  margin: auto;
`;
const MainWrapper = styled.div`
  width: 1360px;
  margin: auto;
`;

const MainBox = styled.div`
  width: 1280px;
  margin: auto;

  h1 {
    margin-top: 60px;
    margin-bottom: 125px;
    font-style: normal;
    font-weight: 400;
    font-size: 50px;
    line-height: 60px;
    color: #000000;
    text-align: center;
  }
`;
const SelectWrapper = styled.div`
  display: flex;
`;
const SelectSection = styled.div`
  width: 401px;
  height: 492px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 125px;
  margin-right: 39px;
  border: 2px solid black;
`;

const Button = styled.button`
  width: 1280px;
  height: 120px;
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 50px;
    line-height: 61px;
    color: #000000;
  }
`;
