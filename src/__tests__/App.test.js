import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { LocationProvider } from "@reach/router";

import App from "../App";

describe("App.js", () => {
  const mockStore = configureStore();

  beforeEach(() => {
    const store = mockStore({
      user: {
        username: "user"
      },
      accounts: {
        list: {
          "0001": { 
              "name": "Main Account",
              "type": "Current Account",
              "balance": 1000,
              "interestRate": 0.01
          }
        }
      }
    });

    render(
      <Provider store={store}>
        <LocationProvider>
          <App />
        </LocationProvider>
      </Provider>
    );
  });

  it("Renders App Bar", () => {
    const titleText = screen.getByText(/Brilliant Banking/i);
    expect(titleText).toBeInTheDocument();
  });
});
