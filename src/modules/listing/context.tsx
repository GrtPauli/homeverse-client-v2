import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { IListing, IListingFilter, IUserListingFilter } from './model'
import {
  useCreateListing,
  useGetListing,
  useGetListings,
  useGetUserListings,
  useUpdateListing,
} from './gql/query'
import useHvNotification from '@/hooks/notification'
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage'
import { uid } from 'uid'
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useAuthContext } from '../auth/context'

interface IListingState {
  initLoading: boolean
  loading: boolean
  filterLoading: boolean
  createListing: (listing: IListing, photos: any[]) => Promise<void>
  getUserListings: (filter: IUserListingFilter) => Promise<void>
  getListings: (filter?: IListingFilter) => Promise<void>
  getListing: (id: string, noLoading?: boolean) => Promise<void>
  updateListing: (id: string, listing: Partial<IListing>) => Promise<void>
  listing: Partial<IListing>
  listings: Partial<IListing[]>
  userListings: IListing[]
}

const ListingContext = createContext<IListingState>({
  initLoading: true,
  loading: false,
  filterLoading: false,
  createListing(listing) {
    return null as any
  },
  updateListing(listing) {
    return null as any
  },
  getUserListings() {
    return null as any
  },
  getListing() {
    return null as any
  },
  getListings() {
    return null as any
  },
  userListings: [],
  listing: {},
  listings: [],
})

const useListingContext = () => {
  const context = useContext(ListingContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface IProps {
  children: ReactNode
}

const ListingContextProvider: FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const [filterLoading, setFilterLoading] = useState<boolean>(false)

  const [userListings, setUserListings] = useState<IListing[]>([])
  const [listing, setListing] = useState<Partial<IListing>>({})
  const [listings, setListings] = useState<Partial<IListing[]>>([])

  const createListingQuery = useCreateListing((rs: any) => {})
  const getUserListingsQuery = useGetUserListings((rs: any) => {})
  const getListingQuery = useGetListing((rs: any) => {})
  const getListingsQuery = useGetListings((rs: any) => {})
  const updateListingQuery = useUpdateListing((rs: any) => {})
  const { firestoreDb } = useAuthContext()
  const router = useRouter()
  const { errorMsg, notificationContext, successMsg } = useHvNotification()

  const updateListing = (id: string, listing: Partial<IListing>): Promise<void> => {
    setLoading(true)
    return new Promise<void>((resolve, reject) => {
      updateListingQuery[0]({
        variables: {
          id,
          listing,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.updateListing) {
            successMsg('Success', 'Listing updated successfully')
            resolve()
          } else {
            errorMsg('Error', 'Action was not successful')
            reject()
          }
        })
        .finally(() => setLoading(false))
    })
  }

  const createListing = (listing: IListing, photos: any[]): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      uploadFiles(photos).then((rs) => {
        addDoc(collection(firestoreDb, 'listings'), {
          ...listing,
          photos: rs,
        }).then(() => {
          setLoading(false)
          resolve()
        })
      })
    })
  }

  const uploadFiles = async (photos: any[]) => {
    let uploadedFiles: string[] = []
    const storage = getStorage()

    return new Promise<string[]>((resolve, reject) => {
      photos.forEach((item) => {
        const storageRef = ref(storage, `${uid()}-listing`)
        uploadString(storageRef, item.uri, 'data_url').then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            uploadedFiles = [...uploadedFiles, downloadURL]
            if (uploadedFiles.length == photos.length) {
              resolve(uploadedFiles)
            }
          })
        })
      })
    })
  }

  // const createListing = (listing: IListing): Promise<void> => {
  //   setLoading(true)
  //   return new Promise((resolve, reject) => {
  //     createListingQuery[0]({
  //       variables: {
  //         listing,
  //       },
  //     })
  //       .then(async (rs) => {
  //         if (rs?.data?.createListing) {
  //           successMsg('Success', 'Listing created successfully')
  //           router.push('/dashboard/listings')
  //           resolve()
  //         } else {
  //           errorMsg('Error', 'Creation of listing was not successful')
  //           reject()
  //         }
  //       })
  //       .finally(() => setLoading(false))
  //   })
  // }

  const getUserListings = (filter: IUserListingFilter): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getUserListingsQuery[0]({
        variables: { filter },
      })
        .then(async (rs) => {
          if (rs?.data?.getUserListings) {
            setUserListings(rs?.data?.getUserListings)
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

  const getListings = (filter?: IListingFilter): Promise<void> => {
    let listingsArr: any[] = []
    filter ? setFilterLoading(true) : setLoading(true)
    return new Promise((resolve, reject) => {
      getDocs(collection(firestoreDb, 'listings')).then((data) => {
        data.forEach((doc) => {
          listingsArr = [...listingsArr, { id: doc.id, ...doc.data() }]
        })

        filter ? setFilterLoading(false) : setLoading(false)
        setListings(listingsArr)
        resolve()
      })
    })
  }

  // const getListings = (filter?: IListingFilter): Promise<void> => {
  //   filter ? setFilterLoading(true) : setLoading(true)
  //   return new Promise((resolve, reject) => {
  //     getListingsQuery[0]({ variables: { filter } })
  //       .then(async (rs) => {
  //         if (rs?.data?.getListings) {
  //           setListings(rs?.data?.getListings)
  //           resolve()
  //         }
  //         reject()
  //       })
  //       .finally(() =>
  //         setTimeout(() => {
  //           filter ? setFilterLoading(false) : setLoading(false)
  //         }, 1000),
  //       )
  //   })
  // }

  const getListing = (id: string, noLoading?: boolean): Promise<void> => {
    noLoading ? setInitLoading(false) : setInitLoading(true)
    return new Promise((resolve, reject) => {
      const listingRef = doc(firestoreDb, 'listings', id)
      getDoc(listingRef)
        .then((rs) => {
          setListing({
            id: rs.id,
            ...rs.data(),
          })
          resolve()
        })
        .catch((err) => reject(err))
        .finally(() => setInitLoading(false))
    })
  }

  // const getListing = (id: string, noLoading?: boolean): Promise<void> => {
  //   noLoading ? setInitLoading(false) : setInitLoading(true)
  //   return new Promise((resolve, reject) => {
  //     getListingQuery[0]({ variables: { id } })
  //       .then(async (rs) => {
  //         if (rs?.data?.getListing) {
  //           setListing(rs?.data?.getListing)
  //           resolve()
  //         }
  //         reject()
  //       })
  //       .finally(() =>
  //         setTimeout(() => {
  //           setInitLoading(false)
  //         }, 3000),
  //       )
  //   })
  // }

  return (
    <ListingContext.Provider
      value={{
        filterLoading,
        updateListing,
        initLoading,
        getListings,
        listings,
        loading,
        createListing,
        getUserListings,
        userListings,
        getListing,
        listing,
      }}
    >
      <>
        {notificationContext}
        {children}
      </>
    </ListingContext.Provider>
  )
}

export { ListingContextProvider, useListingContext }
