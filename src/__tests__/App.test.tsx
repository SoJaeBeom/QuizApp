import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { ThemeProvider } from "styled-components";
import Theme from "../styles/Theme";
import store from "../redux/config/configStore";
import { Provider } from "react-redux";

describe("App Test", () => {
  it("App Render Test", () => {
    render(
      <ThemeProvider theme={Theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>,
    );
  });
});
