'use client'

import { useHelloWorldQuery } from '@/graphql/generated/graphql'

export default function Home() {
  const { data } = useHelloWorldQuery()
  console.log('data', data)
  return <main>Hello World</main>
}
