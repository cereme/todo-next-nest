import axios from "axios"
import useSWR from "swr"

import FormInsertTodo from "./FormInsertTodo"
import TodoItem from "./TodoItem"

type TodoListProps = {
  userId: number
  username: string
}

const todoListFetcher = (url) => axios.get(url).then((res) => res.data)

export default function TodoList({ userId, username }: TodoListProps): JSX.Element {
  const { data, error } = useSWR(`/todo?owner=${userId}`, todoListFetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className="border-2 flex-column px-4 py-2">
      <h2 className="text-center">{username}&apos;s Todo List</h2>
      {data.map((e) => (
        <TodoItem
          title={e.title}
          id={e.id}
          key={e.id}
          description={e.description}
          userId={userId}
        />
      ))}
      <FormInsertTodo userId={userId} />
    </div>
  )
}
