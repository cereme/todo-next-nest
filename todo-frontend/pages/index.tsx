import { useContext } from "react"
import { LocalLoginForm } from "../components/Auth/LocalLoginForm"
import TodoList from "../components/TodoList"
import { AuthContext } from "../components/AuthContext"

export default function Home(): JSX.Element {
  const { authToken, logout } = useContext(AuthContext)
  return (
    <div className="container px-4 py-4">
      {!authToken && (
        <div>
          <LocalLoginForm />
        </div>
      )}
      {authToken && <button onClick={logout}>logout</button>}
      <TodoList />
    </div>
  )
}
