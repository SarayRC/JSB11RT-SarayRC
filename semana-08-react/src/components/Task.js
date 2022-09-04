const Task = (props) => {
  const { id, task, done, tasks, setTasks } = props;

  //10:53 29/08

  return (
    <>
      <p className={done ? "line-through" : ""}>{task}</p>
      <label htmlFor="done">Done:</label>
      <input
        id="done"
        type="checkbox"
        checked={done}
        onChange={(event) => {
          const tasksUpdated = tasks.map((taskObject) => {
            if (taskObject.id === id) {
              taskObject.done = event.target.checked;
            }
            return taskObject;
          });

          setTasks(tasksUpdated);
        }}
      />
    </>
  );
};

export default Task;
