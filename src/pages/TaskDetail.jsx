import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);

  const task = tasks.find((task) => task.id === parseInt(id));

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleUpdate = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Dettaglio della Task</h1>
      <p>Nome: {task.title}</p>
      <p>Descrizione: {task.description}</p>
      <p>Status: {task.status}</p>
      <p>Data: {new Date(task.createdAt).toLocaleDateString()}</p>
      <button onClick={() => setShowDeleteModal(true)}>Elimina Task</button>
      <button onClick={() => setShowEditModal(true)}>Modifica Task</button>
      <Modal
        title="Conferma Eliminazione"
        content={<p>Sei sicuro di voler eliminare la task?</p>}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />
      <EditTaskModal
        task={task}
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdate}
      />
    </div>
  );
}
