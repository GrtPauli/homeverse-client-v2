import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { useUpdateProfile } from '../profile/gql/query'
import { UserType } from '../profile/model'
import useHvNotification from '@/hooks/notification'
import { User, updateProfile } from 'firebase/auth'
import { useGetAgents } from './gql/query'
import { AgentRequestStatus, IAgent, IClient, IClientRequest, IFilterProfileInput } from './model'
import { useAuthContext } from '../auth/context'
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { UserRole } from '../auth/model'
import { useRouter } from 'next/router'

interface IAgentState {
  loading: boolean
  initLoading: boolean
  agents: IAgent[]
  agent: IAgent
  clientRequests: IClientRequest[]
  clients: IClient[]
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
  getClientRequests: () => Promise<void>
  updateClientRequest: (clientRequest: IClientRequest, type: "accept" | "reject") => Promise<void>
  getClients: () => Promise<void>
}

const AgentContext = createContext<IAgentState>({
  loading: false,
  initLoading: true,
  agent: null,
  agents: [],
  clientRequests: [],
  clients: [],
  getClients() {
    return null as any
  },
  getClientRequests() {
    return null as any
  },
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
  updateClientRequest(clientRequest, type) {
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
  const [clientRequests, setClientRequests] = useState<IClientRequest[]>([])
  const [clients, setClients] = useState<IClient[]>([])
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

  const getClientRequests = async (): Promise<void> => {
    let clientRequestsArr: any[] = []
    setInitLoading(true)
    const clientRequestsRef = collection(firestoreDb, 'clientRequests')
    const q = query(clientRequestsRef, where('agent.userId', '==', firebaseAuth.currentUser.uid))

    return new Promise((resolve, reject) => {
      getDocs(q).then((data) => {
        data.forEach((doc) => {
          clientRequestsArr = [...clientRequestsArr, { id: doc.id, ...doc.data() }]
        })

        setInitLoading(false)
        setClientRequests(clientRequestsArr)
        resolve()
      })
    })
  }

  const getClients = async (): Promise<void> => {
    let clientsArr: any[] = []
    setInitLoading(true)
    const clientsRef = collection(firestoreDb, 'clients')
    const q = query(clientsRef, where('agentId', '==', firebaseAuth.currentUser.uid))

    return new Promise((resolve, reject) => {
      getDocs(q).then((data) => {
        data.forEach((doc) => {
          clientsArr = [...clientsArr, { id: doc.id, ...doc.data() }]
        })

        setInitLoading(false)
        setClients(clientsArr)
        resolve()
      })
    })
  }

  const sendAgentRequest = async (): Promise<void> => {
    setLoading(true)
    return new Promise<void>((resolve, reject) => {
      addDoc(collection(firestoreDb, 'clientRequests'), {
        agent: {
          userId: agent.userId,
          displayName: agent.displayName,
          photo: agent?.photo || null,
          email: agent.email
        },
        client: {
          userId: firebaseAuth.currentUser.uid,
          photo: firebaseAuth.currentUser.photoURL,
          displayName: firebaseAuth.currentUser.displayName,
          email: firebaseAuth.currentUser.email
        },
        status: AgentRequestStatus.PENDING,
        message: "This is my optional message",
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

  const updateClientRequest = async (clientRequest: IClientRequest, type: "accept" | "reject"): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      const clientRequestRef = doc(firestoreDb, 'clientRequests', clientRequest.id)
      if(type == "accept"){
        updateDoc(clientRequestRef, { status: AgentRequestStatus.ACCEPTED }).then(() => {
          addDoc(collection(firestoreDb, 'clients'), {
            agentId: firebaseAuth.currentUser.uid,
            client: {
              ...clientRequest.client
            },
            createdAt: serverTimestamp()
          }).then(() => {
            setLoading(false)
            resolve()
            successMsg('Success', 'Client request accepted')
            router.push('/hub/clients')
          })
        })
      } else {
        updateDoc(clientRequestRef, { status: AgentRequestStatus.REJECTED })
        .then(() => {
          setLoading(false)
          resolve()
          successMsg('Success', 'Client request rejected')
        })
      }
    })
  }

  return (
    <AgentContext.Provider
      value={{
        clients,
        getClients,
        updateClientRequest,
        clientRequests,
        getClientRequests,
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