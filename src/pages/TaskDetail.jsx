import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Modal from "../components/Modal";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask } = useContext(GlobalContext);

  const task = tasks.find((task) => task.id === parseInt(id));

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!task) {
    return <h1>Task non trovata</h1>;
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Dettaglio della Task</h1>
      <p>Nome: {task.title}</p>
      <p>Nome: {task.description}</p>
      <p>Nome: {task.status}</p>
      <p>Nome: {new Date(task.createdAt).toLocaleDateString()}</p>
      <button onClick={() => setShowDeleteModal(true)}>Elimina Task</button>
      <Modal
        title="Conferma Eliminazione"
        content={<p>Sei sicuro di voler eliminare la task?</p>}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />
    </div>
  );
}
