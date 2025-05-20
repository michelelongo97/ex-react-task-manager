import { useMemo, useRef, useState, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

export default function AddTask() {
  const { addTask } = useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();

  const taskTitleError = useMemo(() => {
    if (!title.trim()) return "Il nome della task non può essere vuoto";
    if ([...title].some((char) => symbols.includes(char)))
      return "Il nome della task non può contenere simboli";
    return "";
  }, [title]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (taskTitleError) return;

    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    try {
      await addTask(newTask);
      alert("Task creata con successo");
      setTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Aggiungi Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome del task
          <input
            type="text"
            placeholder="nome"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        {taskTitleError && <p style={{ color: "red" }}>{taskTitleError}</p>}
        <br />
        <label>
          Descrizione
          <textarea ref={descriptionRef} placeholder="descrizione" />
          <br />
        </label>
        <label>
          Stato
          <select ref={statusRef} defaultValue={"To Do"}>
            <option value="To Do">To Do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
          <br />
        </label>
        <button type="submit">Aggiungi Task</button>
      </form>
    </div>
  );
}
