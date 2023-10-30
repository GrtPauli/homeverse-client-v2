import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { RentalFragment } from './fragment'

const CREATE_RENTAL = gql`
  mutation CreateRental($rental: RentalInput!) {
    createRental(rental: $rental) {
      _id
    }
  }
`

const UPDATE_RENTAL = gql`
  mutation UpdateRental($rental: RentalInput!, $id: String!) {
    updateRental(rental: $rental, id: $id) {
      _id
    }
  }
`

const GET_USER_RENTALS = gql`
  query GetUserRentals($input: GetRentalsInput!) {
    getUserRentals(input: $input) {
      ...Rental
    }
  }
  ${RentalFragment}
`

const GET_RENTAL = gql`
  query GetRental($id: String!) {
    getRental(id: $id) {
      ...Rental
    }
  }
  ${RentalFragment}
`

export const useCreateRental = (callback: any) => {
  return useMutation(CREATE_RENTAL, {
    onCompleted: (res: any) => {
      if (res.createRental) {
        callback(res.createRental)
      }
    },
    onError: (err: any) => {
      console.log(err)
    },
  })
}

export const useUpdateRental = (callback: any) => {
  return useMutation(UPDATE_RENTAL, {
    onCompleted: (res: any) => {
      if (res.updateRental) {
        callback(res.updateRental)
      }
    },
    onError: (err: any) => {
      console.log(err)
    },
  })
}

export const useGetRental = (callback: any) => {
  return useLazyQuery(GET_RENTAL, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.getRental) {
        callback(res.getRental)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}

export const useGetUserRentals = (callback: any) => {
  return useLazyQuery(GET_USER_RENTALS, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.getUserRentals) {
        callback(res.getUserRentals)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}
