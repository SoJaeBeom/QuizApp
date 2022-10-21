import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../apis/api";
import { IQuizInitialState, ISelectSetting } from "../../types/SelectorTypes";

const initialState: IQuizInitialState = {
  quizList: [],
  isLoading: false,
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
  reducers: {},
  extraReducers: {
    [__getQuizList.pending.type]: state => {
      state.isLoading = true;
    },
    [__getQuizList.fulfilled.type]: (state, action) => {
      state.quizList = action.payload;
      state.isLoading = false;
      state.isFinish = true;
    },
    [__getQuizList.rejected.type]: state => {
      state.isFinish = true;
    },
  },
});

export default quizSlice.reducer;
