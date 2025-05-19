import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log(tasks);

  return (
    <div>
      <h1>Lista Task</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Status</th>
              <th>Data di Creazione</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
