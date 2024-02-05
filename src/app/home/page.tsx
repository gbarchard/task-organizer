'use client'

import { useSession } from 'next-auth/react'
import Loading from '../loading'

export default function App() {
  const { data: session, status } = useSession({
    required: true,
  })

  if (status === 'loading') {
    return <Loading />
  }

  return (
    <main>
      Signed in as {session?.user?.email} <br />
      {session?.user?.image && (
        <img src={session.user.image} width={30} height={30} />
        // <Image alt="" src={session.user.image} width={30} height={30} />
      )}
      <div>{`id: ${session?.user?.id}`}</div>
    </main>
  )
}
