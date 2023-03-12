import { render, screen } from "@testing-library/react";
import * as reduxHooks from "../../../app/hooks";
import { TTask } from "../../../app/taskSlice";
import { TaskList } from "./TaskList";

jest.mock("../../../app/hooks");

const mockedSelector = jest.spyOn(reduxHooks, "useAppSelector");

const tasks: TTask[] = [
  {
    id: 1,
    content: "test 1",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 1,
    content: "test 2",
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

describe("TaskList:", () => {
  it("should be renders", () => {
    mockedSelector.mockReturnValue({ tasks });
    render(<TaskList />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText(/test 1/i)).toBeInTheDocument();
    expect(screen.getByText(/test 2/i)).toBeInTheDocument();
  });

  it("should be renders without empty list", () => {
    mockedSelector.mockReturnValue({ tasks: [] });
    render(<TaskList />);

    expect(screen.queryByRole("list")).toBeNull();
  });
});
