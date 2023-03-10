import cn from "./TaskList.module.css";

import { Task } from "./Task/Task";
import { useAppSelector } from "../../../app/hooks";

export const TaskList: React.FC = () => {
  const { tasks } = useAppSelector((state) => state.tasks);

  return (
    <ul className={cn.list}>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
};
