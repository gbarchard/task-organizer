'use client'

import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { data: session, status } = useSession()

  const router = useRouter()

  useEffect(() => {
    if (session?.user) {
      router.push('/home')
    }
  }, [router, session])

  if (status === 'loading') {
    return 'loading...'
  }
  return <button onClick={() => signIn()}>Sign in</button>
}
