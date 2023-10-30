import { split, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { environment } from './Environment'
import { getSession } from 'next-auth/react'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = createHttpLink({
  uri: environment.Uri.Graphql,
})

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: 'ws://localhost:4000/graphql',
        }),
      )
    : null

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  const session: any = await getSession()
  const token = session?.token

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const mainLink = authLink.concat(httpLink)

const splitLink =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query)
          return def.kind === 'OperationDefinition' && def.operation === 'subscription'
        },
        wsLink,
        mainLink,
      )
    : mainLink

const AppClient = new ApolloClient({
  link: splitLink, //authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default AppClient
