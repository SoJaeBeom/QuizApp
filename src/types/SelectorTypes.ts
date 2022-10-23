export const categoryOfQuestions = [
  { filterKey: "카테고리", value: "랜덤" },
  { filterKey: "카테고리", value: "책" },
  { filterKey: "카테고리", value: "영화" },
  { filterKey: "카테고리", value: "음악" },
];
export const difficultyOfQuestions = [
  { filterKey: "난이도", value: "랜덤" },
  { filterKey: "난이도", value: "쉬움" },
  { filterKey: "난이도", value: "중간" },
  { filterKey: "난이도", value: "어려움" },
];
export const amountOfQuestions = [
  { filterKey: "개수", value: "10 문제" },
  { filterKey: "개수", value: "20 문제" },
  { filterKey: "개수", value: "30 문제" },
  { filterKey: "개수", value: "40 문제" },
  { filterKey: "개수", value: "50 문제" },
];

export interface IFilterList {
  filterKey: string;
  value: string;
}

export interface ISelectSetting {
  category: string;
  difficulty: string;
  amount: string;
}

export interface IQuizList {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface IQuizItem {
  id: number;
  question: string;
  answers: string[];
  correct_answer: string;
}

export interface IQuizAnswer {
  id: number;
  status: boolean;
  myChoice: string;
  orginAnswer: string;
  answerList: string[];
}

export interface IQuizInitialState {
  quizList: IQuizList[];
  quizItem: IQuizItem;
  quizAnswer: IQuizAnswer[];
  isFinish: boolean;
}
