'use client'

import { ApolloProvider } from '@apollo/client'
import { PropsWithChildren } from 'react'
import client from '../graphql/apollo-client'

export function Providers(props: PropsWithChildren) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
