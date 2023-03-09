import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createNewTask, fetchTasks } from "../../app/taskSlice";
import { Loader } from "../common/Loader/Loader";
import { InputField } from "./InputField/InputField";
import { Task } from "./Task/Task";

import st from "./TaskList.module.css";

export const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, status, error } = useAppSelector((state) => state.tasks);

  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const addTaskHandler = () => {
    if (!text.trim()) return;

    dispatch(createNewTask({ content: text }));
    setText("");
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  if (error) return <h3>{error}</h3>;

  return (
    <div className={st.tasklist}>
      <h1 className={st.header}>Список задач:</h1>

      {status === "pending" ? (
        <Loader />
      ) : (
        <div>
          <InputField
            text={text}
            changeHandler={changeHandler}
            addTaskHandler={addTaskHandler}
          />
          <ul className={st.list}>
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
