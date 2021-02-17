import React, { useEffect, useState } from "react"

interface AuthContextValue {
  authToken?: string
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

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken"))
  }, [])

  const value: AuthContextValue = {
    authToken,
    login: (token: string) => {
      setAuthToken(token)
      localStorage.setItem("authToken", token)
    },
    logout: () => {
      setAuthToken(null)
      localStorage.removeItem("authToken")
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
