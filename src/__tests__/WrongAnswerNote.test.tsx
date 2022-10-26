import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import WrongAnswerNote from "../pages/WrongAnswerNote";
import store from "../redux/config/configStore";
import Theme from "../styles/Theme";

describe("WrongAnswerNote Test", () => {
  it("WrongAnswerNote Render Test", () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <Provider store={store}>
            <WrongAnswerNote />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>,
    );
  });
});
