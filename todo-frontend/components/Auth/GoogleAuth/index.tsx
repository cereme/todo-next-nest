import axios from "axios"
import Link from "next/link"

const API_ROOT = process.env.API_ROOT

export const GoogleAuth: React.FC = () => {
  return (
    <Link href={`${API_ROOT}/auth/google`} passHref={true}>
      <button className="bg-gray-200 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded my-2">
        구글로 시작하기
      </button>
    </Link>
  )
}
