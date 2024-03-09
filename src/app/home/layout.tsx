'use client'

import { Sidebar } from 'flowbite-react'
import { signOut } from 'next-auth/react'
import { PropsWithChildren } from 'react'

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex grow overflow-hidden">
      <Sidebar>
        <Sidebar.Logo href="/home" img="">
          Website
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/home/contacts">Contacts</Sidebar.Item>
            <Sidebar.Item href="/home/calendar">Calendar</Sidebar.Item>
            <Sidebar.Item href="/home/tasks">Tasks</Sidebar.Item>
            <Sidebar.Item href="/home/journal">Journal</Sidebar.Item>
            <Sidebar.Item className="cursor-pointer" onClick={signOut}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="flex flex-col grow h-full">{children}</div>
    </div>
  )
}
