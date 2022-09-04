import { useState } from "react";

const Form = (props) => {
  const { tasks, setTasks } = props;

  const [task, setTask] = useState("");

  // tasks.length + 1 // 10:12 lunes 29/08
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const newTask = { id: tasks.length + 1, task: task, done: false };

        setTasks([...tasks, newTask]);
      }}
    >
      <label htmlFor="task">Tarea:</label>
      <input
        type="text"
        calue={task}
        onChange={(event) => {
          setTask(event.target.value);
        }}
        maxLength="100"
      />

      <button type="submit">Crear tarea</button>
    </form>
  );
};

export default Form;
