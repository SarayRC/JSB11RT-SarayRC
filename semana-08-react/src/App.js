import "./App.css";
import Lista from "./components/Lista";
import Form from "./components/Form";
import { useState } from "react";

function App(props) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: "Ir a la compra",
      done: false,
    },
    {
      id: 2,
      task: "Hacer ejercicios de react",
      done: true,
    },
  ]);

  return (
    <div className="App">
      <Form tasks={tasks} setTasks={setTasks} />
      <Lista tasks={tasks} setTasks={setTasks} />

      <img src="/foto1.jpg" alt="img"></img>
    </div>
  );
}

export default App;
