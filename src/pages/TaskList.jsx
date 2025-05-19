import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log(tasks);

  return (
    <div>
      <h1>Lista Task</h1>
    </div>
  );
}
