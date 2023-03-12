import st from "./Task.module.css";
import { removeTask, toggleTaskStatus } from "../../../../app/taskSlice";
import { useAppDispatch } from "../../../../app/hooks";

type PropsType = {
  id: number;
  content: string;
  completed: boolean;
};

export const Task: React.FC<PropsType> = ({ id, content, completed }) => {
  const dispatch = useAppDispatch();
  const checkboxChangeHandler = () => {
    dispatch(
      toggleTaskStatus({
        id,
        content,
        completed: !completed,
      })
    );
  };
  const deleteClickHandler = () => {
    dispatch(removeTask({ id }));
  };

  return (
    <li className={st.item}>
      <label className={st.label}>
        <input
          type='checkbox'
          className={st.checkbox}
          checked={completed}
          onChange={checkboxChangeHandler}
        />
        <span className={st.customCheckbox}></span>
      </label>
      <span className={st.text}>{content}</span>
      <button className={st.deleteButton} onClick={deleteClickHandler}>
        Х
      </button>
    </li>
  );
};
