import { gql, useLazyQuery, useMutation } from '@apollo/client'

const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      _id
      email
      firstname
      lastname
      userType
      profileId
    }
  }
`

const SEND_OTP = gql`
  query SendOTP($number: String!) {
    sendOTP(number: $number)
  }
`

export const useSignUp = (callback: any) => {
  return useMutation(CREATE_USER, {
    onCompleted: (res: any) => {
      if (res.createUser) {
        callback(res.createUser)
      }
    },
    onError: (err: any) => {
      console.log(err)
    },
  })
}

export const useSendOtp = (callback: any) => {
  return useLazyQuery(SEND_OTP, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.sendOTP) {
        callback(res.sendOTP)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}
