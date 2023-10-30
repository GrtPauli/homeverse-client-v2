import { gql, useLazyQuery, useMutation } from '@apollo/client'

const ACCEPT_CONTACT_REQUEST = gql`
  mutation AcceptContactRequest($senderId: String!, $receiverId: String!) {
    acceptContactRequest(senderId: $senderId, receiverId: $receiverId)
  }
`

// const GET_CONTACT_INFO = gql`
//     query GetMyProfile {
//         getMyProfile {
//             contacts {
//                 contactId
//                 messageRoomId
//                 createdAt
//                 status
//             }
//             contactRequests {
//                 contactId
//                 position
//             }
//         }
//     }
// `

const GET_CONTACT_INFO = gql`
  query GetUserProfile($id: String!) {
    getUserProfile(id: $id) {
      _id
      conversationListId
      contacts {
        id
        name
        photo
        email
        createdAt
        status
      }
      contactRequests {
        id
        name
        photo
        email
        msg
        createdAt
        position
      }
    }
  }
`

const GET_CONVERSATION_LIST_ID = gql`
  query GetUserProfile($id: String!) {
    getUserProfile(id: $id) {
      _id
      conversationListId
    }
  }
`

export const useAcceptContactRequest = (callback: any) => {
  return useMutation(ACCEPT_CONTACT_REQUEST, {
    onCompleted: (res: any) => {
      if (res.acceptContactRequest) {
        callback(res.acceptContactRequest)
      }
    },
    onError: (err: any) => {
      console.log(err)
    },
  })
}

export const useGetContactInfo = (callback: any) => {
  return useLazyQuery(GET_CONTACT_INFO, {
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

export const useGetConversationListId = (callback: any) => {
  return useLazyQuery(GET_CONVERSATION_LIST_ID, {
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
