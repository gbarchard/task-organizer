'use client'

import HELLO_WORLD from '@/graphql/queries/helloWorld.gql'
import { useQuery } from '@apollo/client'

export default function Home() {
  const { data } = useQuery(HELLO_WORLD)
  console.log('data', data)
  return <main>Hello World</main>
}
