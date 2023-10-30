import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { IProfile, IUser } from './model'
import {
  useGetMe,
  useGetMyProfile,
  useGetMyProfilePic,
  useGetUser,
  useGetUserProfile,
  useUpdateProfile,
  useUpdateUser,
} from './gql/query'
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage'
import { IImage } from '../model'
import {
  Auth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth'
import { useAuthContext } from '../auth/context'
import useHvNotification from '@/hooks/notification'

let up = updateProfile

interface IProfileState {
  loading: boolean
  initLoading: boolean
  updateLoading: boolean
  profilePicLoading: boolean
  updateUser: (user: IUser) => Promise<void>
  updateProfile: (profile: IProfile) => Promise<void>
  getUser: (id: string) => Promise<void>
  getUserProfile: (noLoader?: boolean) => Promise<void>
  getUserInfo: (id: string) => Promise<void>
  getMe: () => Promise<void>
  getMyProfile: () => Promise<void>
  getMyProfilePic: () => Promise<void>
  getMyInfo: () => Promise<void>
  updateProfilePic: (image: IImage) => Promise<void>
  updateDisplayName: (displayName: string) => Promise<void>
  updateUserPassword: (currentPassword: string, newPassword: string) => Promise<void>
  updateUserEmail: (currentPassword: string, email: string) => Promise<void>
  user: Partial<IUser>
  profile: Partial<IProfile>
  profilePic: string
}

const ProfileContext = createContext<IProfileState>({
  loading: false,
  initLoading: true,
  updateLoading: false,
  profilePicLoading: false,
  updateUser(user) {
    return null as any
  },
  updateUserPassword() {
    return null as any
  },
  updateUserEmail() {
    return null as any
  },
  updateProfile() {
    return null as any
  },
  updateProfilePic() {
    return null as any
  },
  updateDisplayName() {
    return null as any
  },
  getUser(id) {
    return null as any
  },
  getUserProfile(id) {
    return null as any
  },
  getUserInfo(id) {
    return null as any
  },
  getMe() {
    return null as any
  },
  getMyInfo() {
    return null as any
  },
  getMyProfile() {
    return null as any
  },
  getMyProfilePic() {
    return null as any
  },
  user: {},
  profilePic: '',
  profile: {},
})

const useProfileContext = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface IProps {
  children: ReactNode
}

const ProfileContextProvider: FC<IProps> = ({ children }) => {
  const updateUserQuery = useUpdateUser((rs: any) => {})
  const updateProfileQuery = useUpdateProfile((rs: any) => {})
  const getUserQuery = useGetUser((rs: any) => {})
  const getUserProfileQuery = useGetUserProfile((rs: any) => {})
  const getMeQuery = useGetMe((rs: any) => {})
  const getMyProfileQuery = useGetMyProfile((rs: any) => {})
  const getMyProfilePicQuery = useGetMyProfilePic((rs: any) => {})

  const [loading, setLoading] = useState<boolean>(false)
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const [updateLoading, setUpdateLoading] = useState<boolean>(true)
  const [profilePicLoading, setProfilePicLoading] = useState<boolean>(false)
  const [profilePic, setProfilePic] = useState<string>('')
  const [user, setUser] = useState<Partial<IUser>>({})
  const [profile, setProfile] = useState<Partial<IProfile>>({})
  const { errorMsg, notificationContext, successMsg } = useHvNotification()
  const router = useRouter()
  const { firebaseAuth } = useAuthContext()

  const updateProfilePic = (image: IImage): Promise<void> => {
    setLoading(true)
    const storage = getStorage()
    const storageRef = ref(storage, `${firebaseAuth.currentUser.uid}-profile-pic`)

    return new Promise<void>((resolve, reject) => {
      uploadString(storageRef, image.uri, 'data_url').then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          updateProfileQuery[0]({
            variables: {
              id: firebaseAuth.currentUser.uid,
              profile: { photo: downloadURL },
            },
          }).then((rs) => {
            if (rs?.data?.updateProfile) {
              up(firebaseAuth.currentUser, { photoURL: downloadURL })
                .then(() => {
                  successMsg('Success', 'Profile photo updated successfully')
                  resolve()
                })
                .catch((error) => {
                  errorMsg('Error', error.message)
                  reject()
                })
                .finally(() => setLoading(false))
            } else {
              errorMsg('Error', '')
              setLoading(false)
              reject()
            }
          })
        })
      })
    })
  }

  const updateDisplayName = (displayName: string): Promise<void> => {
    setLoading(true)
    return new Promise<void>((resolve, reject) => {
      updateProfileQuery[0]({
        variables: {
          id: firebaseAuth.currentUser.uid,
          profile: { displayName },
        },
      }).then((rs) => {
        if (rs?.data?.updateProfile) {
          up(firebaseAuth.currentUser, {
            displayName,
          })
            .then(() => {
              successMsg('Success', 'Name updated successfully')
              resolve()
            })
            .catch((error) => {
              errorMsg('Error', error.message)
              reject()
            })
            .finally(() => setLoading(false))
        } else {
          errorMsg('Error', '')
          setLoading(false)
          reject()
        }
      })
    })
  }

  const updateUserPassword = (currentPassword: string, newPassword: string): Promise<void> => {
    setLoading(true)
    return new Promise<void>((resolve, reject) => {
      const credential = EmailAuthProvider.credential(
        firebaseAuth.currentUser.email,
        currentPassword,
      )
      reauthenticateWithCredential(firebaseAuth.currentUser, credential)
        .then(() => {
          updatePassword(firebaseAuth.currentUser, newPassword)
            .then(() => {
              successMsg('Success', 'Password updated successfully')
              resolve()
            })
            .catch((error) => {
              errorMsg('Error', error.message)
              reject()
            })
            .finally(() => setLoading(false))
        })
        .catch((error) => {
          errorMsg('Error', error.message)
          setLoading(false)
          reject()
        })
    })
  }

  const updateUserEmail = (currentPassword: string, email: string): Promise<void> => {
    setLoading(true)
    return new Promise<void>((resolve, reject) => {
      const credential = EmailAuthProvider.credential(
        firebaseAuth.currentUser.email,
        currentPassword,
      )
      reauthenticateWithCredential(firebaseAuth.currentUser, credential)
        .then(() => {
          updateEmail(firebaseAuth.currentUser, email)
            .then(() => {
              successMsg('Success', 'Email updated successfully')
              resolve()
            })
            .catch((error) => {
              errorMsg('Error', error.message)
              reject()
            })
            .finally(() => setLoading(false))
        })
        .catch((error) => {
          errorMsg('Error', error.message)
          setLoading(false)
          reject()
        })
    })
  }

  const updateUser = (user: IUser): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      updateUserQuery[0]({
        variables: {
          user,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.updateUser) {
            console.log(rs?.data?.updateUser)
            router.push('/')
            resolve()
          }
          reject()
        })
        .finally(() => setLoading(false))
    })
  }

  const updateProfile = (profile: IProfile): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      updateProfileQuery[0]({
        variables: {
          id: firebaseAuth.currentUser.uid,
          profile,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.updateProfile) {
            successMsg('Success', 'Profile updated successfully')
            router.push('/dashboard/profile')
            resolve()
          } else {
            errorMsg('Error', rs.errors[0].message)
            reject()
          }
        })
        .finally(() => setLoading(false))
    })
  }

  const getUser = (id: string): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getUserQuery[0]({
        variables: {
          id,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.getUser) {
            setUser(rs?.data?.getUser)
            resolve()
          }
          reject()
        })
        .finally(() => setLoading(false))
    })
  }

  const getUserProfile = (noLoader?: boolean): Promise<void> => {
    noLoader ? setInitLoading(false) : setInitLoading(true)
    return new Promise((resolve, reject) => {
      getUserProfileQuery[0]({
        variables: {
          id: firebaseAuth?.currentUser?.uid,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.getUserProfile) {
            setProfile(rs?.data?.getUserProfile)
            resolve()
          }
          reject()
        })
        .finally(() =>
          setTimeout(() => {
            setInitLoading(false)
          }, 3000),
        )
    })
  }

  const getUserInfo = (id: string): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getUserQuery[0]({
        variables: {
          id,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.getUser) {
            setUser(rs?.data?.getUser)
            getUserProfileQuery[0]({
              variables: {
                id,
              },
            }).then(async (rs) => {
              if (rs?.data?.getUserProfile) {
                setProfile(rs?.data?.getUserProfile)
                resolve()
              }
              reject()
            })
          }
        })
        .finally(() =>
          setTimeout(() => {
            setLoading(false)
          }, 3000),
        )
    })
  }

  const getMe = (): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getMeQuery[0]()
        .then(async (rs) => {
          if (rs?.data?.getMe) {
            setUser(rs?.data?.getMe)
            resolve()
          }
          reject()
        })
        .finally(() => setLoading(false))
    })
  }

  const getMyProfile = (): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getMyProfileQuery[0]()
        .then(async (rs) => {
          if (rs?.data?.getMyProfile) {
            setProfile(rs?.data?.getMyProfile)
            resolve()
          }
          reject()
        })
        .finally(() => setLoading(false))
    })
  }

  const getMyProfilePic = (): Promise<void> => {
    setProfilePicLoading(true)
    return new Promise((resolve, reject) => {
      getMyProfilePicQuery[0]()
        .then(async (rs) => {
          if (rs?.data?.getMyProfile) {
            setProfilePic(rs?.data?.getMyProfile?.photo)
            resolve()
          }
          reject()
        })
        .finally(() => setProfilePicLoading(false))
    })
  }

  const getMyInfo = (): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getMeQuery[0]()
        .then(async (rs) => {
          if (rs?.data?.getMe) {
            setUser(rs?.data?.getMe)
            getMyProfileQuery[0]().then(async (rs) => {
              if (rs?.data?.getMyProfile) {
                setProfile(rs?.data?.getMyProfile)
                resolve()
              }
              reject()
            })
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
    <ProfileContext.Provider
      value={{
        updateUserEmail,
        updateUserPassword,
        initLoading,
        updateDisplayName,
        updateProfilePic,
        profilePic,
        profilePicLoading,
        getMyProfilePic,
        loading,
        updateLoading,
        updateUser,
        getUser,
        getUserProfile,
        profile,
        user,
        getUserInfo,
        getMe,
        getMyInfo,
        getMyProfile,
        updateProfile,
      }}
    >
      <>
        {notificationContext}
        {children}
      </>
    </ProfileContext.Provider>
  )
}

export { ProfileContextProvider, useProfileContext }
