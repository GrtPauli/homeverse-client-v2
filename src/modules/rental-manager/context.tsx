import useHvNotification from '@/hooks/notification'
import { useRouter } from 'next/router'
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { useCreateRental, useGetRental, useGetUserRentals, useUpdateRental } from './gql/query'
import { IRental, IRentalInput } from './model'
import { useAuthContext } from '../auth/context'

interface IRentalState {
  initLoading: boolean
  loading: boolean
  userRentals: IRental[]
  rental: IRental
  updatedRental: IRentalInput
  step: number
  subStep: number
  stepPercent: number
  setUpdatedRental: Dispatch<SetStateAction<IRentalInput>>
  setStep: Dispatch<SetStateAction<number>>
  setSubStep: Dispatch<SetStateAction<number>>
  setStepPercent: Dispatch<SetStateAction<number>>
  createRental: (rental: IRentalInput) => Promise<void>
  getUserRentals: (noLoading?: boolean) => Promise<void>
  updateRental: (rental: IRentalInput, id: string) => Promise<void>
  getRental: (id: string) => Promise<void>
}

const RentalContext = createContext<IRentalState>({
  initLoading: true,
  loading: false,
  userRentals: [],
  rental: null as any,
  step: 0,
  stepPercent: 0,
  subStep: 0,
  updatedRental: null,
  setUpdatedRental() {},
  setSubStep() {},
  setStep() {},
  setStepPercent() {},
  createRental(rental) {
    return null as any
  },
  getUserRentals() {
    return null as any
  },
  updateRental(rental, id) {
    return null as any
  },
  getRental(id) {
    return null as any
  },
})

const useRentalContext = () => {
  const context = useContext(RentalContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface IProps {
  children: ReactNode
}

const RentalContextProvider: FC<IProps> = ({ children }) => {
  const [userRentals, setUserRentals] = useState<IRental[]>([])
  const [rental, setRental] = useState<IRental>()
  const [updatedRental, setUpdatedRental] = useState<IRentalInput>()
  const [loading, setLoading] = useState<boolean>(false)
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const [step, setStep] = useState<number>(0)
  const [subStep, setSubStep] = useState<number>(1)
  const [stepPercent, setStepPercent] = useState<number>(0)

  const createRentalQuery = useCreateRental((rs: any) => {})
  const getUserRentalsQuery = useGetUserRentals((rs: any) => {})
  const updateRentalQuery = useUpdateRental((rs: any) => {})
  const getRentalQuery = useGetRental((rs: any) => {})

  const router = useRouter()
  const { errorMsg, notificationContext, successMsg } = useHvNotification()
  const { firebaseAuth } = useAuthContext()

  const createRental = (rental: IRentalInput): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      createRentalQuery[0]({
        variables: {
          rental,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.createRental) {
            successMsg('Success', 'Rental created successfully')
            // router.push('/dashboard/listings')
            resolve()
          } else {
            errorMsg('Error', 'Creation of rental was not successful')
            reject()
          }
        })
        .finally(() => setLoading(false))
    })
  }

  const getRental = (id: string): Promise<void> => {
    setInitLoading(true)
    return new Promise((resolve, reject) => {
      getRentalQuery[0]({
        variables: { id },
      })
        .then(async (rs) => {
          if (rs?.data?.getRental) {
            setStep(rs?.data?.getRental.creationStep)
            setSubStep(rs?.data?.getRental.creationSubStep)
            setRental(rs?.data?.getRental)
            const updated = rs?.data?.getRental
            delete updated._id
            delete updated.updatedAt
            delete updated.createdAt
            delete updated.__typename

            setUpdatedRental(updated)
            resolve()
          }
          reject()
        })
        .finally(() =>
          setTimeout(() => {
            setInitLoading(false)
          }, 1000),
        )
    })
  }

  const getUserRentals = (noLoading?: boolean): Promise<void> => {
    noLoading ? setInitLoading(false) : setInitLoading(true)
    return new Promise((resolve, reject) => {
      getUserRentalsQuery[0]({
        variables: { input: { ownerId: firebaseAuth.currentUser.uid } },
      })
        .then(async (rs) => {
          if (rs?.data?.getUserRentals) {
            setUserRentals(rs?.data?.getUserRentals)
            resolve()
          }
          reject()
        })
        .finally(() =>
          setTimeout(() => {
            setInitLoading(false)
          }, 1000),
        )
    })
  }

  const updateRental = (rental: IRentalInput, id: string): Promise<void> => {
    setLoading(true)
    return new Promise<void>((resolve, reject) => {
      updateRentalQuery[0]({
        variables: {
          rental,
          id,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.updateRental) {
            successMsg('Success', 'Rental updated successfully')
            resolve()
          } else {
            errorMsg('Error', 'Update was not successful')
            reject()
          }
        })
        .finally(() => setLoading(false))
    })
  }

  return (
    <RentalContext.Provider
      value={{
        setUpdatedRental,
        updatedRental,
        getRental,
        rental,
        createRental,
        getUserRentals,
        initLoading,
        loading,
        updateRental,
        userRentals,
        subStep,
        setSubStep,
        setStep,
        setStepPercent,
        step,
        stepPercent,
      }}
    >
      <>
        {notificationContext}
        {children}
      </>
    </RentalContext.Provider>
  )
}

export { useRentalContext, RentalContextProvider }
