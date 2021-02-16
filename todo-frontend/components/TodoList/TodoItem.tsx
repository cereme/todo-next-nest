import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";

export type TodoItemProps = {
  title: string
  description: string
  id: number
}

export default function TodoItem({title, id, description}: TodoItemProps){
  const [expanded, setExpanded] = useState(false);

  const deleteTodoItem = async () => {
    mutate("/todo", data => data.filter(e => e.id !== id), false);
    await axios.delete(`/todo/${id}`);
    mutate("/todo");
  }

  const toggleAccordion = () => setExpanded(v => !v);

  return (
    <>
      <div className="flex flex-row items-center my-2 px-2 py-2 bg-gray-100 shadow">
        <span className="flex-grow" onClick={toggleAccordion}>{title}</span>
        <input type="checkbox" className="mx-2"/>
        <button onClick={deleteTodoItem} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">Delete</button>
      </div>
      <div className={`transition-all ease-in duration-500 ${expanded ? "": "hidden"}`}>
        <p className={`inline-block truncate}`}>
          {description}
        </p>
      </div>
    </>
  )
}