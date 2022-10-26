import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Quiz from "../pages/Quiz";
import store from "../redux/config/configStore";
import Theme from "../styles/Theme";

describe("Quiz Test", () => {
  it("Quiz Render Test", () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <Provider store={store}>
            <Quiz />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>,
    );
  });
});
