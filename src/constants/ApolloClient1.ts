import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { API_URL } from './Routes'
import { getSession } from 'next-auth/react'
import { onError } from '@apollo/link-error'
import { ApolloLink } from 'apollo-link'
import { GraphQLClient } from 'graphql-request'
import { environment } from './Environment'

const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
  credentials: 'same-origin',
})

const authLink = setContext(async (_, { headers }) => {
  const session: any = await getSession()
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${session?.token}`,
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors as any) {
      switch (err.extensions.code) {
        // Apollo Server sets code to UNAUTHENTICATED
        // when an AuthenticationError is thrown in a resolver
        case 'UNAUTHENTICATED':
          // Modify the operation context with a new token
          const oldHeaders = operation.getContext().headers
          operation.setContext({
            headers: {
              ...oldHeaders,
              // authorization: getNewToken(),
            },
          })
          // Retry the request, returning the new observable
          return forward(operation)
      }
    }
  }

  // To retry on network errors, we recommend the RetryLink
  // instead of the onError link. This just logs the error.
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const AppClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, authLink] as any) as any,
})

export default AppClient

export const gqlClient = new GraphQLClient(environment.Uri.Graphql, {
  credentials: 'include',
})

export const graphClient = async (token?: string) => {
  gqlClient.setHeader('Authorization', `Bearer ${token}`)
  return gqlClient
}
