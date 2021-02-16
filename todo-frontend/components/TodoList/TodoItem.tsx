import axios from "axios";
import { mutate } from "swr";

export type TodoItemProps = {
  title: string
  id: number
}

export default function TodoItem({title, id}: TodoItemProps){

  const deleteTodoItem = async () => {
    mutate("/todo", data => data.filter(e => e.id !== id), false);
    await axios.delete(`/todo/${id}`);
    mutate("/todo");
  }

  return (
    <div className="flex flex-row items-center my-2 px-2 py-2 bg-gray-100 shadow">
      <span className="flex-grow">{title}</span>
      <input type="checkbox" className="mx-2"/>
      <button onClick={deleteTodoItem} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">Delete</button>
    </div>
  )
}