import { useContext } from "react"
import { LocalLoginForm } from "../components/Auth/LocalLoginForm"
import TodoList from "../components/TodoList"
import { AuthContext } from "../components/AuthContext"
import { GoogleAuth } from "../components/Auth/GoogleAuth"
import { KakaoAuth } from "../components/Auth/KakaoAuth"

export default function Home(): JSX.Element {
  const { authToken, jwtInfo, logout } = useContext(AuthContext)
  return (
    <div className="container px-4 py-4">
      <h1 className="text-center text-2xl mb-4">Todo-next-nest</h1>
      {!authToken && (
        <div>
          <LocalLoginForm />
          <div className="flex flex-col px-2 my-2">
            <GoogleAuth />
            <KakaoAuth />
          </div>
        </div>
      )}
      {authToken && (
        <div className="flex flex-col">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white mx-6 py-1 px-2 rounded mb-4"
          >
            logout
          </button>
          <TodoList userId={jwtInfo.id} username={jwtInfo.username} />
        </div>
      )}
    </div>
  )
}
