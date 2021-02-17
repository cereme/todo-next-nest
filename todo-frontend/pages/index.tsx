import { useContext } from "react"
import TodoList from "../components/TodoList"
import { AuthContext } from "../components/AuthContext"

export default function Home(): JSX.Element {
  const { authToken } = useContext(AuthContext)
  return (
    <div className="container px-4 py-4">
      {!authToken && <div>not logged in</div>}
      <TodoList />
    </div>
  )
}
