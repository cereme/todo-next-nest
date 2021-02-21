import axios from "axios"
import Link from "next/link"

const API_ROOT = process.env.API_ROOT

export const GoogleAuth: React.FC = () => {
  return (
    <Link href={`${API_ROOT}/auth/google`} passHref={true}>
      <a>구글로 시작하기</a>
    </Link>
  )
}
