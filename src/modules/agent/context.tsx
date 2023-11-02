import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { useUpdateProfile } from '../profile/gql/query'
import { UserType } from '../profile/model'
import useHvNotification from '@/hooks/notification'
import { User, updateProfile } from 'firebase/auth'
import { useGetAgents } from './gql/query'
import { AgentRequestStatus, IAgent, IFilterProfileInput } from './model'
import { useAuthContext } from '../auth/context'
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { UserRole } from '../auth/model'
import { useRouter } from 'next/router'

interface IAgentState {
  loading: boolean
  initLoading: boolean
  agents: IAgent[]
  agent: IAgent
  updateUserType: (
    id: string,
    currentUser: User,
    displayName: string,
    phone: string,
  ) => Promise<void>
  getAgents: (filter?: IFilterProfileInput) => Promise<void>
  sendAgentRequest: () => Promise<void>
  getAgent: (id: string) => Promise<void>
  convertToAgent: () => Promise<void>
}

const AgentContext = createContext<IAgentState>({
  loading: false,
  initLoading: true,
  agent: null,
  agents: [],
  updateUserType() {
    return null as any
  },
  getAgent(id) {
    return null as any
  },
  getAgents() {
    return null as any
  },
  sendAgentRequest() {
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
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const updateProfileQuery = useUpdateProfile((rs: any) => {})
  const getAgentsQuery = useGetAgents((rs: any) => {})
  const { errorMsg, notificationContext, successMsg } = useHvNotification()
  const [loading, setLoading] = useState<boolean>(false)
  const [agents, setAgents] = useState<IAgent[]>([])
  const [agent, setAgent] = useState<IAgent>()
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

  const getAgents = async (filter?: IFilterProfileInput): Promise<void> => {
    let usersArr: any[] = []
    setLoading(true)
    const usersRef = collection(firestoreDb, 'users')
    const q = query(usersRef, where('role', '==', UserRole.AGENT))

    return new Promise((resolve, reject) => {
      getDocs(q).then((data) => {
        data.forEach((doc) => {
          usersArr = [...usersArr, { id: doc.id, ...doc.data() }]
        })

        setLoading(false)
        setAgents(usersArr)
        resolve()
      })
    })

    // return new Promise((resolve, reject) => {
    //   getAgentsQuery[0]({ variables: { filter } })
    //     .then((rs) => {
    //       if (rs?.data?.getProfiles) {
    //         setAgents(rs?.data?.getProfiles)
    //         resolve()
    //       } else {
    //         reject()
    //       }
    //     })
    //     .finally(() =>
    //       setTimeout(() => {
    //         setLoading(false)
    //       }, 3000),
    //     )
    // })

    // return new Promise<void>((resolve, reject) => {
    //   const usersRef = collection(firestoreDb, 'users')
    //   const q = query(usersRef, where('userId', '==', firebaseAuth.currentUser.uid))
    //   getDocs(q)
    //     .then((data) => {
    //       setLoading(false)
    //       setUserRole(data.docs[0].data().role)
    //       resolve()
    //     })
    //     .catch((err) => {
    //       setLoading(false)
    //       reject()
    //       console.log(err)
    //     })
    // })
  }

  const getAgent = async (id: string): Promise<void> => {
    setInitLoading(true)
    return new Promise((resolve, reject) => {
      const agentRef = doc(firestoreDb, 'users', id)
      getDoc(agentRef)
        .then((rs) => {
          setAgent({
            id: rs.id,
            ...rs.data(),
          } as any)          
          resolve()
        })
        .catch((err) => reject(err))
        .finally(() => setInitLoading(false))
    })
  }

  const sendAgentRequest = async (): Promise<void> => {
    setLoading(true)
    return new Promise<void>((resolve, reject) => {
      addDoc(collection(firestoreDb, 'agentRequests'), {
        agent: {
          userId: agent.userId,
          displayName: agent.displayName,
          photo: agent?.photo || null,
          email: agent.email
        },
        sender: {
          userId: firebaseAuth.currentUser.uid,
          photo: firebaseAuth.currentUser.photoURL,
          displayName: firebaseAuth.currentUser.displayName,
          email: firebaseAuth.currentUser.email
        },
        status: AgentRequestStatus.PENDING,
        message: "",
        createdAt: serverTimestamp()
      }).then(() => {
        setLoading(false)
        resolve()
        successMsg('Success', 'Request sent successfully')
        // router.push('/agent/hub/dashboard')
      })
      .catch((err) => {
        reject()
        setLoading(false)
        console.log(err)
      })
    })
  }

  return (
    <AgentContext.Provider
      value={{
        agent,
        sendAgentRequest,
        getAgent,
        initLoading,
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
