import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskInput } from "./TaskInput";
import * as reduxHooks from "../../../app/hooks";
import * as actions from "../../../app/taskSlice";

jest.mock("../../../app/hooks");

const mockedDispatch = jest.spyOn(reduxHooks, "useAppDispatch");

describe("InputField: ", () => {
  it("should be renders", () => {
    mockedDispatch.mockReturnValue(jest.fn());
    render(<TaskInput />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shold calls dispatch and action on the button press", async () => {
    const user = userEvent.setup();
    const dispatch = jest.fn();
    const mockedCreateNewTask = jest.spyOn(actions, "createNewTask");
    mockedDispatch.mockReturnValue(dispatch);
    render(<TaskInput />);

    await user.type(screen.getByRole("textbox"), "test");
    await user.click(screen.getByRole("button"));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(mockedCreateNewTask).toHaveBeenCalledWith({ content: "test" });
  });

  it("sholdn't calls dispatch with empty field", async () => {
    const user = userEvent.setup();
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    render(<TaskInput />);

    await user.click(screen.getByRole("button"));

    expect(dispatch).toHaveBeenCalledTimes(0);
  });
});
