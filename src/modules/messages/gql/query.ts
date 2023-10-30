import { gql, useLazyQuery, useMutation, useSubscription } from '@apollo/client'

const GET_MESSAGE_ROOM = gql`
  query GetMessageRoom($id: String!) {
    getMessageRoom(id: $id) {
      _id
      members
      messages {
        senderId
        content
      }
    }
  }
`
export const NEW_MESSAGE = gql`
  subscription NewMessage($messageRoomId: String!) {
    newMessage(messageRoomId: $messageRoomId) {
      senderId
      content
    }
  }
`

export const useGetMessageRoom = (callback: any) => {
  return useLazyQuery(GET_MESSAGE_ROOM, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.getMessageRoom) {
        callback(res.getMessageRoom)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}

export const useNewMessageSubscription = () => {
  return useSubscription(NEW_MESSAGE, {
    onError(error) {
      console.log(error)
    },
  })
}
