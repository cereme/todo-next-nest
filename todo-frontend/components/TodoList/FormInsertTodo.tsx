import { useState } from "react"
import { mutate } from "swr";

export default function FormInsertTodo(){
  const [todoTitle, setTodoTitle] = useState("");
  const postTodoItem = async () => {
    await fetch("http://localhost:7000/todo", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({title: todoTitle})
    });
    mutate("/todo");
    setTodoTitle("");
  }

  return (
    <div className="flex flex-row">
      <input type="text" value={todoTitle} onChange={e => setTodoTitle(e.target.value)} className="flex-grow"/>
      <button onClick={postTodoItem} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 ml-2 rounded">Submit</button>
    </div>
  )
}