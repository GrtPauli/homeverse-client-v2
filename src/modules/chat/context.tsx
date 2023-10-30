import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react'
import {
  DocumentData,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { useAuthContext } from '../auth/context'
import { ChatRequestStatus, IChatRequest, IConversation } from './model'
import useHvNotification from '@/hooks/notification'

interface IChatState {
  loading: boolean
  initLoading: boolean
  chatRequest: IChatRequest
  conversations: IConversation[]
  getConversations: () => Promise<any>
  requestChat: (agent: { id: string; name: string; photo: string }) => Promise<void>
  checkChatRequestStatus: (agentId: string) => Promise<void>
}

const ChatContext = createContext<IChatState>({
  loading: false,
  initLoading: true,
  chatRequest: null,
  conversations: [],
  getConversations() {
    return null as any
  },
  requestChat(agent) {
    return null as any
  },
  checkChatRequestStatus(agentId) {
    return null as any
  },
})

const useChatContext = () => {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface ChatContextProviderProps {
  children: ReactNode
}

const ChatContextProvider: FC<ChatContextProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const [conversations, setConverstions] = useState<IConversation[]>([])
  const { firestoreDb, firebaseAuth } = useAuthContext()
  const { errorMsg, notificationContext, successMsg } = useHvNotification()
  const [chatRequest, setChatRequest] = useState<IChatRequest>()

  const checkChatRequestStatus = async (agentId: string) => {
    const chatRequestsRef = collection(firestoreDb, 'chatRequests')
    const q = query(
      chatRequestsRef,
      where(`agent.id`, '==', agentId),
      where(`sender.id`, '==', firebaseAuth.currentUser.uid),
    )
    return new Promise<void>((resolve, reject) => {
      getDocs(q)
        .then((data) => {
          setChatRequest(data.docs[0].data() as any)
          // setLoading(false)
          // setUserRole(data.docs[0].data().role)
          resolve()
        })
        .catch((err) => {
          // setLoading(false)
          reject()
        })
    })
  }

  const requestChat = async (agent: { id: string; name: string; photo: string }) => {
    setLoading(true)
    return new Promise<void>((resolve, reject) => {
      addDoc(collection(firestoreDb, 'chatRequests'), {
        agent,
        sender: {
          id: firebaseAuth.currentUser.uid,
          name: firebaseAuth.currentUser.displayName,
          photo: firebaseAuth.currentUser.photoURL,
        },
        status: ChatRequestStatus.PENDING,
        sentAt: serverTimestamp(),
      }).then(() => {
        setLoading(false)
        resolve()
        successMsg('Success', 'Request sent successfully')
      })
    })
  }

  const getConversations = async () => {
    return new Promise<any>((resolve, reject) => {
      const conversationsRef = collection(firestoreDb, 'conversations')
      const q = query(conversationsRef, where('userId', '==', firebaseAuth.currentUser.uid))

      getDocs(q)
        .then((data) => {
          setConverstions(data.docs[0].data().list)
          resolve(data.docs[0].data())
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  const setConverstionsList = async (list: any[]) => {
    return new Promise<any>((resolve, reject) => {
      list.map((item, i) => {
        const docRef = doc(firestoreDb, 'users', item.sender.id)
        getDoc(docRef).then((data) => {
          console.log(data.data())
        })
      })
    })
  }

  return (
    <ChatContext.Provider
      value={{
        chatRequest,
        checkChatRequestStatus,
        requestChat,
        initLoading,
        loading,
        getConversations,
        conversations,
      }}
    >
      <>
        {notificationContext}
        {children}
      </>
    </ChatContext.Provider>
  )
}

export { ChatContextProvider, useChatContext }
