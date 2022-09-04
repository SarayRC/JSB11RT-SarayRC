import Task from "./Task";

const Lista = (props) => {
  const { tasks, setTasks } = props;

  return (
    <ul>
      {tasks.map((taskObject) => {
        const { id, task, done } = taskObject;

        return (
          <li key={id}>
            <Task
              id={id}
              task={task}
              done={done}
              setTasks={setTasks}
              tasks={tasks}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Lista;
