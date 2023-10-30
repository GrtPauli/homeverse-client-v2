import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { ProfileFragment, UserFragment } from './fragment'

const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      _id
      firstname
      lastname
      email
      userType
      profileId
    }
  }
`
const UPDATE_AGENT_INFO = gql`
  query GetUserListings {
    getUserListings {
      _id
      price
      user
    }
  }
`
const GET_USER = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      ...User
    }
  }
  ${UserFragment}
`
const GET_ME = gql`
  query GetMe {
    getMe {
      ...User
    }
  }
  ${UserFragment}
`
const GET_MY_PROFILE = gql`
  query GetMyProfile {
    getMyProfile {
      ...Profile
    }
  }
  ${ProfileFragment}
`
const GET_MY_PROFILE_PIC = gql`
  query GetMyProfile {
    getMyProfile {
      photo
    }
  }
`
const GET_USER_PROFILE = gql`
  query GetUserProfile($id: String!) {
    getUserProfile(id: $id) {
      ...Profile
    }
  }
  ${ProfileFragment}
`

const GET_USER_TYPE = gql`
  query GetUserProfile($id: String!) {
    getUserProfile(id: $id) {
      userType
    }
  }
`

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($id: String!, $profile: UpdateProfileInput!) {
    updateProfile(id: $id, profile: $profile)
  }
`
const CREATE_PROFILE = gql`
  mutation CreateProfile($userId: String!) {
    createProfile(userId: $userId) {
      _id
    }
  }
`
// const CREATE_PROFILE = gql`
//   mutation CreateProfile($userId: String!, $conversationListId: String!) {
//     createProfile(userId: $userId, conversationListId: $conversationListId){
//       _id
//     }
//   }
// `
export const useGetUserType = (callback: any) => {
  return useLazyQuery(GET_USER_TYPE, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.getUserProfile) {
        callback(res.getUserProfile)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}

export const useCreateProfile = (callback: any) => {
  return useMutation(CREATE_PROFILE, {
    onCompleted: (res: any) => {
      if (res.createProfile) {
        callback(res.createProfile)
      }
    },
    onError: (err: any) => {
      console.log(err)
    },
  })
}

export const useUpdateProfile = (callback: any) => {
  return useMutation(UPDATE_PROFILE, {
    onCompleted: (res: any) => {
      if (res.updateProfile) {
        callback(res.updateProfile)
      }
    },
    onError: (err: any) => {
      console.log(err)
    },
  })
}

export const useUpdateUser = (callback: any) => {
  return useMutation(UPDATE_USER, {
    onCompleted: (res: any) => {
      if (res.updateUser) {
        callback(res.updateUser)
      }
    },
    onError: (err: any) => {
      console.log(err)
    },
  })
}

export const useGetMe = (callback: any) => {
  return useLazyQuery(GET_ME, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.getMe) {
        callback(res.getMe)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}

export const useGetUser = (callback: any) => {
  return useLazyQuery(GET_USER, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.getUser) {
        callback(res.getUser)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}

export const useGetMyProfile = (callback: any) => {
  return useLazyQuery(GET_MY_PROFILE, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.getMyProfile) {
        callback(res.getMyProfile)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}

export const useGetMyProfilePic = (callback: any) => {
  return useLazyQuery(GET_MY_PROFILE_PIC, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.getMyProfile) {
        callback(res.getMyProfile)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}

export const useGetUserProfile = (callback: any) => {
  return useLazyQuery(GET_USER_PROFILE, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.getUserProfile) {
        callback(res.getUserProfile)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}
