import axios from "axios";
import { ISelectSetting } from "../types/SelectorTypes";

const api = axios.create({
  baseURL: "https://opentdb.com",
});

export const apis = {
  getQuizList: (selectSetting: ISelectSetting) =>
    api.get("/api.php", {
      params: {
        amount: selectSetting.amount,
        category: selectSetting.category,
        difficulty: selectSetting.difficulty,
        type: "multiple",
      },
    }),
};
