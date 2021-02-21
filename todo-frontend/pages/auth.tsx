import { useContext, useEffect } from "react"
import { AuthContext } from "../components/AuthContext"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

export default function Auth(): JSX.Element {
  const { login } = useContext(AuthContext)
  const router = useRouter()
  useEffect(() => {
    const jwt = Cookies.get("jwt")
    login(jwt)
    router.replace("/")
  }, [])
  return <div></div>
}
