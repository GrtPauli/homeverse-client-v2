import { gql, useLazyQuery, useMutation } from '@apollo/client'

const GET_AGENTS = gql`
  query GetProfiles($filter: FilterProfileInput!) {
    getProfiles(filter: $filter) {
      _id
      userId
      displayName
      photo
      phone
      country
      countryFlag
      state
      city
    }
  }
`

export const useGetAgents = (callback: any) => {
  return useLazyQuery(GET_AGENTS, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.getProfiles) {
        callback(res.getProfiles)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}
