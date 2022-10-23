import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../apis/api";
import { IQuizInitialState, ISelectSetting } from "../../types/SelectorTypes";

const initialState: IQuizInitialState = {
  quizList: [],
  quizItem: {
    id: 0,
    question: "",
    correct_answer: "",
    answers: [],
  },
  quizAnswer: [],
  isFinish: false,
};

export const __getQuizList = createAsyncThunk(
  "quizSlice/__getQuizList",
  async (payload: ISelectSetting, thunkAPI) => {
    try {
      const data = await apis.getQuizList(payload);
      return thunkAPI.fulfillWithValue(data.data.results);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const quizSlice = createSlice({
  name: "quizSlice",
  initialState,
  reducers: {
    getQuizItem: (state, action) => {
      state.quizItem = {
        id: action.payload,
        question: state.quizList[action.payload].question,
        answers: [
          ...state.quizList[action.payload].incorrect_answers,
          state.quizList[action.payload].correct_answer,
        ].sort(() => Math.random() - 0.5),
        correct_answer: state.quizList[action.payload].correct_answer,
      };
    },

    checkQuizAnswer: (state, action) => {
      state.quizAnswer = [...state.quizAnswer, action.payload];
    },

    reset: state => {
      state.quizAnswer = [];
    },
  },
  extraReducers: {
    [__getQuizList.pending.type]: state => {
      state.isFinish = false;
    },
    [__getQuizList.fulfilled.type]: (state, action) => {
      state.quizList = action.payload;
      state.quizItem = {
        id: 0,
        question: action.payload[0].question,
        correct_answer: action.payload[0].correct_answer,
        answers: [
          ...action.payload[0].incorrect_answers,
          action.payload[0].correct_answer,
        ].sort(() => Math.random() - 0.5),
      };
      state.isFinish = true;
    },
    [__getQuizList.rejected.type]: state => {
      state.isFinish = true;
    },
  },
});

export const { getQuizItem, checkQuizAnswer, reset } = quizSlice.actions;

export default quizSlice.reducer;
