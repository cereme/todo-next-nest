import React, { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import axios from "axios"

interface JwtInfo {
  username: string
  email: string
  id: number
  activated: boolean
  iat: number
  exp: number
}

interface AuthContextValue {
  authToken?: string
  jwtInfo?: JwtInfo
  login: (token: string) => void
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue>({
  authToken: null,
  login: null,
  logout: null,
})

const AuthProvider = ({ children }): JSX.Element => {
  const [authToken, setAuthToken] = useState(null)
  const [jwtInfo, setJwtInfo] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      setAuthToken(token)
      setJwtInfo(jwt_decode(token))
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
  }, [])

  const value: AuthContextValue = {
    authToken,
    jwtInfo,
    login: (token: string) => {
      setAuthToken(token)
      setJwtInfo(jwt_decode(token))
      localStorage.setItem("authToken", token)
    },
    logout: () => {
      setAuthToken(null)
      setJwtInfo(null)
      localStorage.removeItem("authToken")
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
