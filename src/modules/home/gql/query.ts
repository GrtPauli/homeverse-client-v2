import { gql, useLazyQuery } from '@apollo/client'
import { HomePageFragment } from './fragment'

const HOME_PAGE = gql`
  query HomePage {
    homePage {
      ...HomePage
    }
  }
  ${HomePageFragment}
`

export const useHomePage = (callback: any) => {
  return useLazyQuery(HOME_PAGE, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.homePage) {
        callback(res.homePage)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}
