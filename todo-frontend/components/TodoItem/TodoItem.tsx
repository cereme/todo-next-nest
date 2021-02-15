import { mutate } from "swr";

export type TodoItemProps = {
  title: string
  id: number
}

export default function TodoItem({title, id}: TodoItemProps){

  const deleteTodoItem = async () => {
    mutate("/todo", data => data.filter(e => e.id !== id), false);
    await fetch(`http://localhost:7000/todo/${id}`,{
      method: "DELETE"
    });
    mutate("/todo");
  }

  return (
    <div className="flex flex-row items-center ma-2">
      <span className="flex-grow">{title}</span>
      <input type="checkbox"/>
      <button onClick={deleteTodoItem} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Delete</button>
    </div>
  )
}