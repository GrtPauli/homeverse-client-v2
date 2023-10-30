import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { useUpdateProfile } from '../profile/gql/query'
import { UserType } from '../profile/model'
import useHvNotification from '@/hooks/notification'
import { User, updateProfile } from 'firebase/auth'
import { useGetAgents } from './gql/query'
import { IAgent, IFilterProfileInput } from './model'
import { useAuthContext } from '../auth/context'
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { UserRole } from '../auth/model'
import { useRouter } from 'next/router'

interface IAgentState {
  loading: boolean
  agents: IAgent[]
  updateUserType: (
    id: string,
    currentUser: User,
    displayName: string,
    phone: string,
  ) => Promise<void>
  getAgents: (filter: IFilterProfileInput) => Promise<void>
  convertToAgent: () => Promise<void>
}

const AgentContext = createContext<IAgentState>({
  loading: false,
  agents: [],
  updateUserType() {
    return null as any
  },
  getAgents() {
    return null as any
  },
  convertToAgent() {
    return null as any
  },
})

const useAgentContext = () => {
  const context = useContext(AgentContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface IProps {
  children: ReactNode
}

const AgentContextProvider: FC<IProps> = ({ children }) => {
  const updateProfileQuery = useUpdateProfile((rs: any) => {})
  const getAgentsQuery = useGetAgents((rs: any) => {})
  const { errorMsg, notificationContext, successMsg } = useHvNotification()
  const [loading, setLoading] = useState<boolean>(false)
  const [agents, setAgents] = useState<IAgent[]>([])
  const { firebaseAuth, firestoreDb } = useAuthContext()
  const router = useRouter()

  const convertToAgent = async () => {
    setLoading(true)
    return new Promise<void>((resolve, reject) => {
      const usersRef = collection(firestoreDb, 'users')
      const q = query(usersRef, where('userId', '==', firebaseAuth.currentUser.uid))

      getDocs(q)
        .then((data) => {
          const userRef = doc(firestoreDb, 'users', data.docs[0].id)
          updateDoc(userRef, { role: UserRole.AGENT }).then(() => {
            addDoc(collection(firestoreDb, 'agentProfiles'), {
              userId: firebaseAuth.currentUser.uid,
            }).then(() => {
              setLoading(false)
              resolve()
              successMsg('Success', 'Account created successfully')
              router.push('/agent/hub/dashboard')
            })
          })
        })
        .catch((err) => {
          reject()
          setLoading(false)
          console.log(err)
        })
    })
  }

  const updateUserType = (
    id: string,
    currentUser: User,
    displayName: string,
    phone: string,
  ): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      updateProfile(currentUser, {
        displayName,
      })
        .then(() => {
          updateProfileQuery[0]({
            variables: {
              id,
              profile: { userType: UserType[1], phone, displayName },
            },
          })
            .then(async (rs) => {
              if (rs?.data?.updateProfile) {
                successMsg('Success', 'Converted to agent account successfully')
                resolve()
              } else {
                errorMsg('Error', 'Convert to agent account failed')
                reject()
              }
            })
            .finally(() =>
              setTimeout(() => {
                setLoading(false)
              }, 3000),
            )
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  const getAgents = (filter: IFilterProfileInput): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getAgentsQuery[0]({ variables: { filter } })
        .then((rs) => {
          if (rs?.data?.getProfiles) {
            setAgents(rs?.data?.getProfiles)
            resolve()
          } else {
            reject()
          }
        })
        .finally(() =>
          setTimeout(() => {
            setLoading(false)
          }, 3000),
        )
    })
  }

  return (
    <AgentContext.Provider
      value={{
        convertToAgent,
        loading,
        agents,
        getAgents,
        updateUserType,
      }}
    >
      <>
        {notificationContext}
        {children}
      </>
    </AgentContext.Provider>
  )
}

export { useAgentContext, AgentContextProvider }
