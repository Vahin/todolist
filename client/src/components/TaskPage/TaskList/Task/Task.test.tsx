import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reduxHooks from "../../../../app/hooks";
import * as actions from "../../../../app/taskSlice";
import { Task } from "./Task";

jest.mock("../../../../app/hooks");

const mockedDispatch = jest.spyOn(reduxHooks, "useAppDispatch");

describe("Task:", () => {
  it("should be renders", () => {
    mockedDispatch.mockReturnValue(jest.fn());

    render(<Task id={1} content={"Testing content"} completed={true} />);

    expect(screen.getByRole("listitem")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText(/testing content/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should be calls dispatch and action toggle task status", async () => {
    const user = userEvent.setup();
    const dispatch = jest.fn();
    const mockedToggleTaskStatus = jest.spyOn(actions, "toggleTaskStatus");

    mockedDispatch.mockReturnValue(dispatch);

    render(<Task id={123} content={"Testing content"} completed={true} />);

    await user.click(screen.getByRole("checkbox"));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(mockedToggleTaskStatus).toHaveBeenCalledWith({
      id: 123,
      content: "Testing content",
      completed: false,
    });
  });

  it("should be calls dispatch and action remove task", async () => {
    const user = userEvent.setup();
    const dispatch = jest.fn();
    const mockedRemoveTask = jest.spyOn(actions, "removeTask");

    mockedDispatch.mockReturnValue(dispatch);

    render(<Task id={123} content={"Testing content"} completed={true} />);

    await user.click(screen.getByRole("button"));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(mockedRemoveTask).toHaveBeenCalledWith({ id: 123 });
  });
});
