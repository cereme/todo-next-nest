import axios from "axios"
import { useState } from "react"
import { mutate } from "swr"

type FormInsertTodoProps = {
  userId: number
}

export default function FormInsertTodo({ userId }: FormInsertTodoProps): JSX.Element {
  const [todoTitle, setTodoTitle] = useState("")
  const postTodoItem = async () => {
    mutate(
      `/todo?owner=${userId}`,
      (data) => [...data, { title: todoTitle, id: -Math.random() }],
      false
    )
    await axios.post(`${process.env.API_ROOT}/todo`, { title: todoTitle })
    mutate(`/todo?owner=${userId}`)
    setTodoTitle("")
  }

  return (
    <div className="flex flex-row">
      <input
        type="text"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        className="flex-grow"
      />
      <button
        onClick={postTodoItem}
        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 ml-2 rounded"
      >
        Submit
      </button>
    </div>
  )
}
