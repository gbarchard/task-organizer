'use client'

import { Sidebar } from 'flowbite-react'
import { signOut } from 'next-auth/react'
import { PropsWithChildren } from 'react'

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex grow">
      <Sidebar>
        <Sidebar.Logo href="" img="">
          Website
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="./contacts">Contacts</Sidebar.Item>
            <Sidebar.Item className="cursor-pointer" onClick={signOut}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      {children}
    </div>
  )
}
