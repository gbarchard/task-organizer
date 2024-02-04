'use client'

import { useHelloWorldQuery } from '@/graphql/generated/hooks'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Home() {
  const { data } = useHelloWorldQuery()
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return 'loading...'
  }
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        {session.user?.image && (
          <img src={session.user.image} width={30} height={30} />
          // <Image alt="" src={session.user.image} width={30} height={30} />
        )}
        <div>{`id: ${session.user.id}`}</div>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
