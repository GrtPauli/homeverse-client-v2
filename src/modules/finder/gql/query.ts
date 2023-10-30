import { gql, useLazyQuery, useMutation } from '@apollo/client'

const GET_AGENTS = gql`
  query GetAgents {
    getAgents {
      firstname
      _id
      lastname
      email
      userType
      profileId
      photo
    }
  }
`

export const useGetAgents = (callback: any) => {
  return useLazyQuery(GET_AGENTS, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.getAgents) {
        callback(res.getAgents)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}
