import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Main from "../pages/Main";
import store from "../redux/config/configStore";
import Theme from "../styles/Theme";

describe("Main Test", () => {
  it("Main Render Test", () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <Provider store={store}>
            <Main />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>,
    );
  });
});
