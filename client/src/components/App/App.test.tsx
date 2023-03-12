import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import App from "./App";

describe("App: ", () => {
  it("Находим в компоненте текст 'Список задач'", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Список задач/i)).toBeInTheDocument();
  });
});
