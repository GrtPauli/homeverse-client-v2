import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react'
import { useGetUser } from '../profile/gql/query'
import { useGetMessageRoom, useNewMessageSubscription } from './gql/query'
import AC, { AgoraChat } from 'agora-chat'
import { agoraEventHandler } from './handler'
import { useSession } from 'next-auth/react'

interface IMessageState {
  loading: boolean
  initials: boolean
  showIntroBox: boolean
  recipientId: string
  recipient: any
  messageRoom: any
  agoraConn: AgoraChat.Connection
  conversationList: AgoraChat.ConversationInfo
  historyMessages: AgoraChat.MessageBody[]
  getMessageRoom: (id: string, userId: string) => Promise<void>
  addNewMessage: (message: any) => void
  createAgoraConn: () => void
  getContacts: () => void
  setAgoraEventHandler: () => void
  getConversationList: () => void
  closeIntroBox: (item: any) => void
  getHistoryMessages: (targetId: string) => void
  agoraSignin: (username: string) => void
  fetchContactInfos: (usernames: string[]) => void
  acceptContactInvite: (username: string) => void
  setInitials: Dispatch<SetStateAction<boolean>>
  setShowIntroBox: Dispatch<SetStateAction<boolean>>
  setRecipientId: Dispatch<SetStateAction<string>>
}

const MessageContext = createContext<IMessageState>({
  loading: true,
  initials: true,
  showIntroBox: null,
  recipientId: null,
  conversationList: null,
  getMessageRoom(id, userId) {
    return null as any
  },
  addNewMessage(message) {},
  createAgoraConn() {},
  closeIntroBox() {},
  recipient: {},
  messageRoom: {},
  agoraConn: null,
  historyMessages: null,
  setAgoraEventHandler() {},
  agoraSignin() {},
  setInitials() {},
  setRecipientId() {},
  setShowIntroBox() {},
  getContacts() {},
  getHistoryMessages() {},
  acceptContactInvite() {},
  fetchContactInfos() {},
  getConversationList() {},
})

const useMessageContext = () => {
  const context = useContext(MessageContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface IProps {
  children: ReactNode
}

const MessageContextProvider: FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [recipient, setRecipient] = useState<any>({})
  const [messageRoom, setMessageRoom] = useState<any>({})
  const getUserQuery = useGetUser((rs: any) => {})
  const getMessageRoomQuery = useGetMessageRoom((rs: any) => {})
  const [initials, setInitials] = useState<boolean>(true)
  const [conversationList, setConversationList] = useState<AgoraChat.ConversationInfo>(null)
  const [historyMessages, setHistoryMessages] = useState<AgoraChat.MessageBody[]>(null)
  const [recipientId, setRecipientId] = useState<string>(null)
  const [showIntroBox, setShowIntroBox] = useState<boolean>(true)

  // const agoraConn =  useRef<AgoraChat.Connection>(null)
  // const newMessageQuery = useNewMessageSubscription()

  const [agoraConn, setAgoraConn] = useState<AgoraChat.Connection>(null)

  const getMessageRoom = (id: string, userId: string): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getMessageRoomQuery[0]({
        variables: {
          id,
        },
      }).then(async (rs) => {
        if (rs?.data?.getMessageRoom) {
          setMessageRoom(rs?.data?.getMessageRoom)
          getUserQuery[0]({
            variables: {
              id: rs?.data?.getMessageRoom?.members?.filter((item: any) => item != userId)[0],
            },
          }).then(async (rs) => {
            if (rs?.data?.getUser) {
              setRecipient(rs?.data?.getUser)
              setLoading(false)
            }
          })
        }
      })
    })
  }

  const addNewMessage = (message: any) => {
    const msgRoom = {
      ...messageRoom,
      messages: [...messageRoom?.messages, message],
    }
    setMessageRoom(msgRoom)
  }

  const createAgoraConn = () => {
    setAgoraConn(
      new AC.connection({
        appKey: '411020257#1191665',
      }),
    )
  }

  const setAgoraEventHandler = () => {
    agoraEventHandler({
      conn: agoraConn,
      onConnectedListener: [getContacts, getConversationList],
      onTextMessageListener: (msg) => onTextMessage(msg),
    })
  }

  const closeIntroBox = (item: any) => {
    setRecipientId(item?.lastMessage?.ext?.username)
    setShowIntroBox(false)
    agoraConn.addEventHandler('MessageEventHandler', {
      onTextMessage: (msg) => {
        // let msgs
        // msgs = [...historyMessages, msg]
        console.log(historyMessages, msg)
      },
    })
  }

  const onTextMessage = (msg: any) => {
    // let msgs
    // console.log(recipientId)
    // if(showIntroBox == false) {
    //     msgs = [...historyMessages, msg]
    //     console.log(msgs)
    //     // setHistoryMessages([
    //     // ])
    // }
    // console.log(msg)
  }

  const getAgoraToken = (userId?: string) => {
    const url1 = 'http://localhost:8090/chat/app/token'
    const url2 = `http://localhost:8090/chat/user/${userId}/token`

    return new Promise<any>((resolve, reject) => {
      let url = userId ? url2 : url1
      fetch(url)
        .then((res) => res.text())
        .then((token) => {
          resolve(token)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const agoraSignin = (username: string) => {
    getAgoraToken(username)
      .then((rs) => {
        agoraConn.open({
          user: username,
          agoraToken: rs,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getContacts = () => {
    agoraConn
      .getContacts()
      .then((rs) => {
        console.log(rs)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const acceptContactInvite = (username: string) => {
    agoraConn.acceptContactInvite(username)
  }

  const fetchContactInfos = (usernames: string[]) => {
    agoraConn
      .fetchUserInfoById(['Jake123'])
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getConversationList = () => {
    agoraConn
      .getConversationlist({ pageNum: 1, pageSize: 20 })
      .then((res) => {
        setConversationList(res.data)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getHistoryMessages = (targetId: string) => {
    var options: any = {
      targetId,
      pageSize: 20,
      cursor: -1,
      chatType: 'singleChat',
      searchDirection: 'down',
    }

    agoraConn
      .getHistoryMessages(options)
      .then((res) => {
        console.log(res.messages)
        setHistoryMessages(res.messages)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  // const newMessageSubscription = () => {
  //     return new Promise((resolve, reject) => {
  //         newMessageQuery.variables
  //     })
  // }

  return (
    <MessageContext.Provider
      value={{
        closeIntroBox,
        showIntroBox,
        setShowIntroBox,
        recipientId,
        setRecipientId,
        historyMessages,
        conversationList,
        initials,
        setInitials,
        loading,
        agoraConn,
        getMessageRoom,
        recipient,
        messageRoom,
        addNewMessage,
        createAgoraConn,
        setAgoraEventHandler,
        agoraSignin,
        getContacts,
        acceptContactInvite,
        fetchContactInfos,
        getConversationList,
        getHistoryMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export { MessageContextProvider, useMessageContext }
