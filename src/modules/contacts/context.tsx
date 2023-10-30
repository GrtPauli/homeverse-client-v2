import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { useRouter } from 'next/router'
import { useAcceptContactRequest, useGetContactInfo, useGetConversationListId } from './gql/query'
import { useGetUser } from '../profile/gql/query'
import {
  serverTimestamp,
  DocumentData,
  DocumentReference,
  Firestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { User } from 'firebase/auth'

interface IContactState {
  loading: boolean
  getContactInfo: (firestoreDb: Firestore, id: string) => Promise<void>
  acceptContactRequest: (firestoreDb: Firestore, sender: any, receiver: User) => Promise<void>
  getConversationListId: (
    firestoreDb: Firestore,
    id: string,
  ) => Promise<DocumentReference<DocumentData, DocumentData>>
  contactRequests: any[]
  contacts: any[]
  contact: any
  setContact: Dispatch<SetStateAction<any>>
}

const ContactContext = createContext<IContactState>({
  loading: true,
  getContactInfo() {
    return null as any
  },
  acceptContactRequest() {
    return null as any
  },
  getConversationListId() {
    return null as any
  },
  contactRequests: [],
  contacts: [],
  contact: {},
  setContact() {},
})

const useContactContext = () => {
  const context = useContext(ContactContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface IProps {
  children: ReactNode
}

const ContactContextProvider: FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [contactRequests, setContactRequests] = useState<any[]>([])
  const [contacts, setContacts] = useState<any[]>([])
  const [contact, setContact] = useState<any>({})
  const [converstionListRef, setConverstionListRef] =
    useState<DocumentReference<DocumentData, DocumentData>>(null)

  const router = useRouter()
  const getContactInfoQuery = useGetContactInfo((rs: any) => {})
  const getConversationListIdQuery = useGetConversationListId((rs: any) => {})
  const getUserQuery = useGetUser((rs: any) => {})
  const acceptContactRequestQuery = useAcceptContactRequest((rs: any) => {})

  const getContactInfo = (firestoreDb: Firestore, id: string): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getContactInfoQuery[0]({ variables: { id } })
        .then(async (rs) => {
          if (rs?.data?.getUserProfile) {
            setContactRequests(rs?.data?.getUserProfile.contactRequests)
            setContacts(rs?.data?.getUserProfile.contacts)
            const docRef = doc(
              firestoreDb,
              'conversations',
              rs?.data?.getUserProfile.conversationListId,
            )
            setConverstionListRef(docRef)

            // getContactRequests(rs?.data?.getMyProfile.contactRequests)
            // getContacts(rs?.data?.getMyProfile.contacts)
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

  const getConversationListId = (
    firestoreDb: Firestore,
    id: string,
  ): Promise<DocumentReference<DocumentData, DocumentData>> => {
    return new Promise((resolve, reject) => {
      getConversationListIdQuery[0]({ variables: { id } }).then(async (rs) => {
        if (rs?.data?.getUserProfile) {
          const docRef = doc(
            firestoreDb,
            'conversations',
            rs?.data?.getUserProfile.conversationListId,
          )
          resolve(docRef)
        } else {
          reject()
        }
      })
    })
  }

  const getConversationList = async (firestoreDb: Firestore, id: string) => {
    const docRef = doc(firestoreDb, 'conversations', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  const getContactRequests = (contactRequestIds: any[]) => {
    let requests: any[] = []
    setLoading(true)

    contactRequestIds.forEach((item: any) => {
      getUserQuery[0]({
        variables: {
          id: item.contactId,
        },
      }).then(async (rs) => {
        if (rs?.data?.getUser) {
          requests.push(rs?.data?.getUser)
        }
      })
    })
    setLoading(false)
    setContactRequests(requests)
  }

  const getContacts = (contactIds: any[]) => {
    let requests: any[] = []
    let contact
    setLoading(true)

    contactIds.forEach((item: any) => {
      getUserQuery[0]({
        variables: {
          id: item.contactId,
        },
      }).then(async (rs) => {
        if (rs?.data?.getUser) {
          contact = {
            ...rs?.data?.getUser,
            ...item,
            key: rs?.data?.getUser._id,
          }
          requests.push(contact)
        }
        if (requests.length == contactIds.length) {
          setLoading(false)
          // setTimeout(() => {setLoading(false)}, 3000)
        }
      })
    })
    setContacts(requests)
  }

  const acceptContactRequest = (
    firestoreDb: Firestore,
    sender: any,
    receiver: User,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      getConversationListId(firestoreDb, sender.id).then((ref) => {
        acceptContactRequestQuery[0]({
          variables: {
            senderId: sender.id,
            receiverId: receiver.uid,
          },
        })
          .then(async (rs) => {
            if (rs?.data?.acceptContactRequest) {
              let senderConversation = {
                id: receiver.uid,
                photo: receiver.photoURL,
                name: receiver.displayName,
                message: 'CTSC',
                unread: 0,
                updatedAt: Date.now(),
              }

              let receiverConversation = {
                id: sender.id,
                photo: sender.photo,
                name: sender.name,
                message: 'CTSC',
                unread: 0,
                updatedAt: Date.now(),
              }
              await updateDoc(converstionListRef, {
                list: arrayUnion(receiverConversation),
              })

              await updateDoc(ref, {
                list: arrayUnion(senderConversation),
              })
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
    })
  }

  return (
    <ContactContext.Provider
      value={{
        loading,
        getContactInfo,
        contactRequests,
        contacts,
        acceptContactRequest,
        contact,
        setContact,
        getConversationListId,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export { ContactContextProvider, useContactContext }
