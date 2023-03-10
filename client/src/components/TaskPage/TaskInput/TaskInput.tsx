import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { createNewTask } from "../../../app/taskSlice";
import { InputField } from "./InputField/InputField";

export const TaskInput: React.FC = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const addTaskHandler = () => {
    if (!text.trim()) return;

    dispatch(createNewTask({ content: text }));
    setText("");
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <InputField
      text={text}
      changeHandler={changeHandler}
      addTaskHandler={addTaskHandler}
    />
  );
};
