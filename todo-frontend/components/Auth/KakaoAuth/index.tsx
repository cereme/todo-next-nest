import Link from "next/link"

const API_ROOT = process.env.API_ROOT

export const KakaoAuth: React.FC = () => {
  return (
    <Link href={`${API_ROOT}/auth/kakao`} passHref={true}>
      <a>카카오로로 시작하기</a>
    </Link>
  )
}
