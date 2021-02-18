import axios from "axios"
import React, { useContext, useState } from "react"
import { AuthContext } from "../../AuthContext"

export const LocalLoginForm: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useContext(AuthContext)

  const requestLogin = async () => {
    try {
      const res = await axios.post("/auth/login/local", {
        email,
        password,
      })
      login(res.data.access_token)
      console.log(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col border-2 flex-column px-4 py-2">
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="email"
        type="email"
        className="mx-4 my-2"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="password"
        type="password"
        className="mx-4 my-2"
      />
      <button
        onClick={requestLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white mx-6 py-1 px-2 rounded"
      >
        login
      </button>
    </div>
  )
}
