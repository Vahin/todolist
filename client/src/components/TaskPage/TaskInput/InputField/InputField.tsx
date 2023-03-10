import s from "./InputField.module.css";

type TProps = {
  text: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTaskHandler: () => void;
};

export const InputField: React.FC<TProps> = ({
  text,
  changeHandler,
  addTaskHandler,
}) => {
  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") addTaskHandler();
  };

  return (
    <div className={s.wrapper}>
      <button className={s.addButton} onClick={addTaskHandler}>
        +
      </button>
      <input
        type='text'
        placeholder='Add new task...'
        value={text}
        className={s.input}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
    </div>
  );
};
