import { useContext, useEffect } from "react"
import { AuthContext } from "../components/AuthContext"
import { useRouter } from "next/router"

export default function Auth(): JSX.Element {
  const { login } = useContext(AuthContext)
  const router = useRouter()
  const { jwt } = router.query

  useEffect(() => {
    if (!jwt) return
    login(jwt as string)
    router.replace("/")
  }, [jwt])
  return <div></div>
}
