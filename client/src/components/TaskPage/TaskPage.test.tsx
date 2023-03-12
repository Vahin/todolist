import { render, screen } from "@testing-library/react";
import { TaskPage } from "./TaskPage";
import * as reduxHooks from "../../app/hooks";

jest.mock("../../app/hooks");
const mockedDispatch = jest.spyOn(reduxHooks, "useAppDispatch");
const mockedSelector = jest.spyOn(reduxHooks, "useAppSelector");

describe("TaskPage:", () => {
  it("should be renders with Loading", () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    mockedSelector.mockReturnValue({ status: "pending", error: null });
    render(<TaskPage />);

    expect(dispatch).toHaveBeenCalledTimes(1);

    expect(screen.getByText(/список задач/i)).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should be renders with error", () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    mockedSelector.mockReturnValue({
      status: "pending",
      error: "Some error occured",
    });
    render(<TaskPage />);

    expect(dispatch).toHaveBeenCalledTimes(1);

    expect(screen.getByText(/some error occured/i)).toBeInTheDocument();
  });
});
