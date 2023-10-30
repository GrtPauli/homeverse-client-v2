import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Analytics, getAnalytics } from 'firebase/analytics'
import { environment } from '@/constants/Environment'
import {
  signOut,
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {
  getDoc,
  Firestore,
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore'
import { useCreateProfile } from '../profile/gql/query'
import { useRouter } from 'next/router'

interface IHvFirebaseState {
  loading: boolean
  app: FirebaseApp
  auth: Auth
  analytics: Analytics
  firestoreDb: Firestore
  fbCreateUserWithEmailAndPassword: (displayName: string, email: string, password: string) => void
  fbsignInWithEmailAndPassword: (email: string, password: string) => void
}

const HvFirebaseContext = createContext<IHvFirebaseState>({
  loading: true,
  app: null,
  analytics: null,
  auth: null,
  firestoreDb: null,
  fbCreateUserWithEmailAndPassword() {},
  fbsignInWithEmailAndPassword() {},
})

const useHvFirebaseContext = () => {
  const context = useContext(HvFirebaseContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface HvFirebaseContextProviderProps {
  children: ReactNode
}

const HvFirebaseContextProvider: FC<HvFirebaseContextProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [app, setApp] = useState<FirebaseApp>(null)
  const [auth, setAuth] = useState<Auth>(null)
  const [analytics, setAnalytics] = useState<Analytics>(null)
  const [firestoreDb, setFirestoreDb] = useState<Firestore>(null)
  const createProfileQuery = useCreateProfile((rs: any) => {})
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    if (typeof window !== undefined) {
      let app = initializeApp(environment.FirebaseConfig)
      let auth = getAuth()
      let analytics = getAnalytics(app)
      let firestoreDb = getFirestore(app)

      setApp(app)
      setAuth(auth)
      setAnalytics(analytics)
      setFirestoreDb(firestoreDb)

      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoading(false)
          // console.log(user)
        } else {
          console.log('Signed Out')
        }
      })
    }
  }, [])

  const fbCreateUserWithEmailAndPassword = (
    displayName: string,
    email: string,
    password: string,
  ) => {
    const conversationsRef = collection(firestoreDb, 'conversations')

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, { displayName }).then(() => {
          addDoc(conversationsRef, {
            userId: userCredential.user.uid,
            list: [],
            createdAt: serverTimestamp(),
          }).then(async (rs) => {
            const docSnap = await getDoc(rs)
            createProfileQuery[0]({
              variables: { userId: userCredential.user.uid, conversationListId: docSnap.id },
            }).then((rs) => {
              if (rs?.data?.createProfile) {
                router.push('/')
              }
            })
          })
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fbsignInWithEmailAndPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fbUpdateProfile = (payload: any) => {
    updateProfile(auth.currentUser, payload)
      .then(() => {
        console.log('User Updated')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fbSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
  }

  return (
    <HvFirebaseContext.Provider
      value={{
        loading,
        analytics,
        app,
        auth,
        firestoreDb,
        fbCreateUserWithEmailAndPassword,
        fbsignInWithEmailAndPassword,
      }}
    >
      {children}
    </HvFirebaseContext.Provider>
  )
}

export { HvFirebaseContextProvider, useHvFirebaseContext }
