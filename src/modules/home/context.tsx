import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import useHvNotification from '@/hooks/notification'
import { useHomePage } from './gql/query'
import { IListing } from '../listing/model'
import { IProfile } from '../profile/model'
import { IAgent } from '../agent/model'

interface IHomeState {
  loading: boolean
  initLoading: boolean
  newListings: IListing[]
  topAgents: IAgent[]
  homePage: () => Promise<void>
}

const HomeContext = createContext<IHomeState>({
  loading: false,
  initLoading: true,
  newListings: [],
  topAgents: [],
  homePage() {
    return null as any
  },
})

const useHomeContext = () => {
  const context = useContext(HomeContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface IProps {
  children: ReactNode
}

const HomeContextProvider: FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const [newListings, setNewListings] = useState<IListing[]>([])
  const [topAgents, setTopAgents] = useState<IAgent[]>([])
  const homePageQuery = useHomePage((rs: any) => {})

  const { errorMsg, notificationContext, successMsg } = useHvNotification()
  const router = useRouter()

  const homePage = (): Promise<void> => {
    setInitLoading(true)
    return new Promise((resolve, reject) => {
      homePageQuery[0]()
        .then(async (rs) => {
          if (rs?.data?.homePage) {
            setNewListings(rs?.data?.homePage.newListings)
            setTopAgents(rs?.data?.homePage.topAgents)
            resolve()
          } else {
            reject()
          }
        })
        .finally(() => setInitLoading(false))
    })
  }

  return (
    <HomeContext.Provider
      value={{
        newListings,
        topAgents,
        homePage,
        loading,
        initLoading,
      }}
    >
      <>
        {notificationContext}
        {children}
      </>
    </HomeContext.Provider>
  )
}

export { useHomeContext, HomeContextProvider }
