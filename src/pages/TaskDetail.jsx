import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useContext(GlobalContext);

  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return <h1>Task non trovata</h1>;
  }

  const handleDelete = () => {
    console.log(task.id);
  };

  return (
    <div>
      <h1>Dettaglio della Task</h1>
      <p>Nome: {task.title}</p>
      <p>Nome: {task.description}</p>
      <p>Nome: {task.status}</p>
      <p>Nome: {new Date(task.createdAt).toLocaleDateString()}</p>
      <button onClick={handleDelete}>Elimina Task</button>
    </div>
  );
}
