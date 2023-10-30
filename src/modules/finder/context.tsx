import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { QueryResult, OperationVariables } from '@apollo/client'
import { useGetAgents } from './gql/query'

interface IFinderState {
  loading: boolean
  getAgents: () => Promise<void>
  agents: any[]
}

const FinderContext = createContext<IFinderState>({
  loading: false,
  getAgents() {
    return null as any
  },
  agents: [],
})

const useFinderContext = () => {
  const context = useContext(FinderContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface IProps {
  children: ReactNode
}

const FinderContextProvider: FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [agents, setAgents] = useState<any[]>([])

  const getAgentsQuery = useGetAgents((rs: any) => {})
  const router = useRouter()

  const getAgents = (): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getAgentsQuery[0]({})
        .then(async (rs) => {
          if (rs?.data?.getAgents) {
            setAgents(rs?.data?.getAgents)
            resolve()
          }
          reject()
        })
        .finally(() =>
          setTimeout(() => {
            setLoading(false)
          }, 3000),
        )
    })
  }

  return (
    <FinderContext.Provider
      value={{
        loading,
        getAgents,
        agents,
      }}
    >
      {children}
    </FinderContext.Provider>
  )
}

export { FinderContextProvider, useFinderContext }
