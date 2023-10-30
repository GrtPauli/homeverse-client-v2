import { ApolloProvider } from '@apollo/client'
import AppContextProvider from './AppContext'
import AppClient from '@/constants/ApolloClient'
import { SessionProvider } from 'next-auth/react'
import { HvFirebaseContextProvider } from '@/modules/firebase/context'

interface IProps {
  children: any
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return (
    // <SessionProvider>
    <ApolloProvider client={AppClient}>
      {/* <HvFirebaseContextProvider> */}
      <AppContextProvider>{children}</AppContextProvider>
      {/* </HvFirebaseContextProvider> */}
    </ApolloProvider>
    // </SessionProvider>
  )
}

export default AppProvider
