import useGetMe from '@/hooks/useGetMe'

interface GuardProps {
  children: React.ReactNode
  excludedRoutes?: string[]
}

const Guard = ({ children, excludedRoutes }: GuardProps) => {
  const { data: user } = useGetMe()
  console.log(user)

  return <>{children}</>
}

export default Guard
