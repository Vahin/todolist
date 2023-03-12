import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputField } from "./InputField";

describe("InputField: ", () => {
  it("should be renders", () => {
    render(
      <InputField
        text={"testing"}
        changeHandler={jest.fn()}
        addTaskHandler={jest.fn()}
      />
    );

    expect(screen.getByDisplayValue("testing")).toBeInTheDocument();
  });

  it("should be use callback on change", async () => {
    const user = userEvent.setup();
    const changeHandler = jest.fn();

    render(
      <InputField
        text={""}
        changeHandler={changeHandler}
        addTaskHandler={jest.fn()}
      />
    );

    await user.type(screen.getByRole("textbox"), "hello");

    expect(changeHandler).toHaveBeenCalledTimes(5);
  });

  it("should be use callback on button press", async () => {
    const user = userEvent.setup();
    const changeHandler = jest.fn();
    const addTaskHandler = jest.fn();

    render(
      <InputField
        text={""}
        changeHandler={changeHandler}
        addTaskHandler={addTaskHandler}
      />
    );

    await user.click(screen.getByRole("button"));

    expect(addTaskHandler).toHaveBeenCalledTimes(1);
  });
});
