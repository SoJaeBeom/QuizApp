import { useAppSelector } from "../hooks/reduxHooks";

const Quiz = () => {
  const { quizList, isFinish } = useAppSelector(state => state.quizSlice);
  if (isFinish) {
    console.log(quizList);
    return <h1>Quiz 입니다!</h1>;
  } else {
    return <div>로딩중</div>;
  }
};

export default Quiz;
