import React, { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"

interface AuthContextValue {
  authToken?: string
  jwtInfo?: any
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
    setAuthToken(localStorage.getItem("authToken"))
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
