import { FC, ReactNode, createContext, useContext, useState } from 'react'
import {
  ICreateTourInput,
  ICreateTourRequestInput,
  IGetTourInfoInput,
  IGetToursInput,
  ITour,
  ITourRequest,
  IUpdateTourInput,
  TourRequestStatus,
  TourStatus,
} from './model'
import {
  useCreateTour,
  useCreateTourRequest,
  useGetTourRequests,
  useGetTours,
  useUpdateTour,
  useUpdateTourRequestStatus,
} from './gql/query'
import { useRouter } from 'next/router'
import useHvNotification from '@/hooks/notification'

interface ITourState {
  loading: boolean
  initLoading: boolean
  tourRequests: ITourRequest[]
  tours: ITour[]
  createTourRequest: (request: ICreateTourRequestInput) => Promise<void>
  getTours: (input: IGetTourInfoInput, noInitLoader?: boolean) => Promise<void>
  getTourInfo: (input: IGetTourInfoInput) => Promise<void>
  updateTourRequest: (id: string, requestStatus: TourRequestStatus, vc?: boolean) => Promise<void>
  updateTour: (id: string, tour: IUpdateTourInput) => Promise<void>
  createTour: (tour: ICreateTourInput) => Promise<void>
}

const TourContext = createContext<ITourState>({
  loading: false,
  initLoading: true,
  tourRequests: [],
  tours: [],
  createTourRequest() {
    return null as any
  },
  getTours() {
    return null as any
  },
  createTour() {
    return null as any
  },
  getTourInfo() {
    return null as any
  },
  updateTour() {
    return null as any
  },
  updateTourRequest() {
    return null as any
  },
})

const useTourContext = () => {
  const context = useContext(TourContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface IProps {
  children: ReactNode
}

const TourContextProvider: FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const [tourRequests, setTourRequests] = useState<ITourRequest[]>([])
  const [tours, setTours] = useState<ITour[]>([])

  const createTourRequestQuery = useCreateTourRequest((rs: any) => {})
  const createTourQuery = useCreateTour((rs: any) => {})
  const getToursQuery = useGetTours((rs: any) => {})
  const getTourRequestsQuery = useGetTourRequests((rs: any) => {})
  const updateTourQuery = useUpdateTour((rs: any) => {})
  const updateTourRequestQuery = useUpdateTourRequestStatus((rs: any) => {})
  const { errorMsg, notificationContext, successMsg } = useHvNotification()
  const router = useRouter()

  const createTour = (tour: ICreateTourInput): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      createTourQuery[0]({
        variables: {
          tour: { ...tour, vcRoomId: randomID(5) },
        },
      })
        .then(async (rs) => {
          if (rs?.data?.createTour) {
            successMsg('Success', 'Tour sent successfully')
            resolve()
          } else {
            errorMsg('Error', 'Tour sent failed')
            reject()
          }
        })
        .finally(() => setLoading(false))
    })
  }

  const createTourRequest = (request: ICreateTourRequestInput): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      createTourRequestQuery[0]({
        variables: {
          request,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.createTourRequest) {
            resolve()
          } else {
            reject()
          }
        })
        .finally(() => setLoading(false))
    })
  }

  const getTourInfo = (input: IGetTourInfoInput): Promise<void> => {
    setInitLoading(true)
    return new Promise((resolve, reject) => {
      getTourRequests(input).then(() => {
        getTours(input)
          .then(() => resolve())
          .finally(() => setInitLoading(false))
      })
    })
  }

  const getTours = (input: IGetTourInfoInput, noInitLoader?: boolean): Promise<void> => {
    noInitLoader ? setLoading(true) : setInitLoading(true)
    return new Promise((resolve, reject) => {
      getToursQuery[0]({
        variables: {
          input,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.getTours) {
            setTours(rs?.data?.getTours)
            resolve()
          } else {
            reject()
          }
        })
        .finally(() => {
          noInitLoader ? setLoading(false) : setInitLoading(false)
        })
    })
  }

  const getTourRequests = (input: IGetTourInfoInput): Promise<void> => {
    // setInitLoading(true)
    return new Promise((resolve, reject) => {
      getTourRequestsQuery[0]({
        variables: {
          input,
        },
      }).then(async (rs) => {
        if (rs?.data?.getTourRequests) {
          setTourRequests(rs?.data?.getTourRequests)
          resolve()
        } else {
          reject()
        }
      })
      // .finally(() => setInitLoading(false))
    })
  }

  const updateTour = (id: string, tour: IUpdateTourInput): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      updateTourQuery[0]({
        variables: {
          id,
          tour,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.updateTour) {
            successMsg('Success', 'Tour Updated Successfully')
            resolve()
          } else {
            errorMsg('Error', 'Tour Update Failed')
            reject()
          }
        })
        .finally(() => setLoading(false))
    })
  }

  function randomID(len: number) {
    let result = ''
    if (result) return result
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i
    len = len || 5
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return result
  }

  const updateTourRequest = (
    id: string,
    requestStatus: TourRequestStatus,
    vc?: boolean,
  ): Promise<void> => {
    let variables: any
    if (vc) {
      variables = { id, request: { requestStatus }, vcRoomId: randomID(5) }
    } else {
      variables = { id, request: { requestStatus } }
    }

    setLoading(true)
    return new Promise((resolve, reject) => {
      updateTourRequestQuery[0]({
        variables,
      })
        .then(async (rs) => {
          if (rs?.data?.updateTourRequestStatus) {
            resolve()
          } else {
            reject()
          }
        })
        .finally(() => setLoading(false))
    })
  }

  return (
    <TourContext.Provider
      value={{
        updateTourRequest,
        getTourInfo,
        loading,
        initLoading,
        tourRequests,
        tours,
        getTours,
        updateTour,
        createTour,
        createTourRequest,
      }}
    >
      <>
        {notificationContext}
        {children}
      </>
    </TourContext.Provider>
  )
}

export { useTourContext, TourContextProvider }
