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
      {!authToken && (
        <div>
          <LocalLoginForm />
          <GoogleAuth />
          <KakaoAuth />
        </div>
      )}
      {jwtInfo && <p className={"break-all"}> {JSON.stringify(jwtInfo)} </p>}
      {authToken && <button onClick={logout}>logout</button>}
      <TodoList />
    </div>
  )
}
