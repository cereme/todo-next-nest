import "tailwindcss/tailwind.css"
import { AppProps } from "next/app"
import axios from "axios"
import { AuthProvider } from "../components/AuthContext"

axios.defaults.baseURL = process.env.API_ROOT

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
