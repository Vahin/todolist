import st from "./Task.module.css";
import { removeTask, toggleTaskStatus, TTask } from "../../../app/taskSlice";
import { useAppDispatch } from "../../../app/hooks";

type PropsType = {
  task: TTask;
};

export const Task: React.FC<PropsType> = ({ task }) => {
  const dispatch = useAppDispatch();
  const checkboxChangeHandler = () => {
    dispatch(
      toggleTaskStatus({
        id: task.id,
        content: task.content,
        completed: !task.completed,
      })
    );
  };
  const deleteClickHandler = () => {
    dispatch(removeTask({ id: task.id }));
  };

  return (
    <li className={st.item}>
      <label className={st.label}>
        <input
          type='checkbox'
          className={st.checkbox}
          checked={task.completed}
          onChange={checkboxChangeHandler}
        />
        <span className={st.customCheckbox}></span>
      </label>
      <span className={st.text}>{task.content}</span>
      <button className={st.deleteButton} onClick={deleteClickHandler}>
        Х
      </button>
    </li>
  );
};
