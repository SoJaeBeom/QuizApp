import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "../modules/quizSlice";

const store = configureStore({
  reducer: { quizSlice },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
