import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createNewTask, fetchTasks } from "../../app/taskSlice";
import { Loader } from "../common/Loader/Loader";
import { InputField } from "./TaskInput/InputField/InputField";
import { TaskInput } from "./TaskInput/TaskInput";
import { TaskList } from "./TaskList/TaskList";
import cn from "./TaskPage.module.css";

export const TaskPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (error) return <h3>{error}</h3>;

  return (
    <div className={cn.taskpage}>
      <h1 className={cn.header}>Список задач:</h1>

      {status === "pending" ? (
        <Loader />
      ) : (
        <div>
          <TaskInput />
          <TaskList />
        </div>
      )}
    </div>
  );
};
