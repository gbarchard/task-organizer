'use client'

import { Button } from 'flowbite-react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Loading from './loading'

export default function Home() {
  const { data: session, status } = useSession()

  const router = useRouter()

  useEffect(() => {
    if (session?.user) {
      router.push('/home')
    }
  }, [router, session])

  if (status === 'loading') {
    return <Loading />
  }

  return (
    <Button pill className="mx-auto my-auto w-1/2" onClick={() => signIn()}>
      Sign In
    </Button>
  )
}
