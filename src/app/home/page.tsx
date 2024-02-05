'use client'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function App() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => router.push('../'),
  })

  if (status === 'loading') {
    return 'loading...'
  }

  return (
    <>
      Signed in as {session?.user?.email} <br />
      {session?.user?.image && (
        <img src={session.user.image} width={30} height={30} />
        // <Image alt="" src={session.user.image} width={30} height={30} />
      )}
      <div>{`id: ${session?.user?.id}`}</div>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}
