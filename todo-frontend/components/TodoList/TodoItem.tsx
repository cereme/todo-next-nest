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
    <div className="flex flex-row items-center my-2">
      <span className="flex-grow">{title}</span>
      <input type="checkbox" className="mx-2"/>
      <button onClick={deleteTodoItem} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">Delete</button>
    </div>
  )
}