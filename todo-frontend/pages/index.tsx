import TodoList from "../components/TodoList"

export default function Home(): JSX.Element {
  return (
    <div className="container px-4 py-4">
      <TodoList />
    </div>
  )
}
