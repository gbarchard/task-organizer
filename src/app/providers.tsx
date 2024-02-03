'use client'

import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import client from '../graphql/apollo-client'

export function Providers(props: PropsWithChildren) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </SessionProvider>
  )
}
