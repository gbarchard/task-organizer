'use client'

import { Button, Card, Label, Modal, Spinner, TextInput } from 'flowbite-react'
import {
  GetContactsDocument,
  useCreateContactMutation,
  useGetContactsQuery,
} from './contacts.generated'
import { FormEvent, useCallback, useState } from 'react'
import Loading from '@/app/loading'

export default function App() {
  const [showAddContactModal, setShowAddContactModal] = useState(false)
  const { loading, data, error } = useGetContactsQuery()

  if (loading) return <Loading />
  return (
    <div className="w-full grow flex flex-col overflow-hidden">
      <header className="p-4 border-b border-gray-300 dark:border-gray-500">
        <Button
          className="w-full"
          color="blue"
          onClick={() => setShowAddContactModal(true)}
        >
          Create Contact
        </Button>
      </header>
      <AddContactModal
        show={showAddContactModal}
        onClose={() => setShowAddContactModal(false)}
      />
      <ul className="grow p-4 space-y-3 overflow-scroll">
        {data?.getContacts?.map((c) => (
          <li key={c._id.toString()}>
            <Card
              href={`contacts/${c._id}`}
            >{`${c.firstName} ${c.lastName}`}</Card>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AddContactModal(props: { show: boolean; onClose: () => void }) {
  const [submitLoading, setSubmitLoading] = useState(false)

  const [createContact] = useCreateContactMutation()

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      setSubmitLoading(true)
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const res = await createContact({
        variables: {
          contact: {
            firstName: formData.get('firstName')?.toString() ?? '',
            lastName: formData.get('lastName')?.toString() ?? '',
          },
        },
        refetchQueries: [GetContactsDocument],
      })
      setSubmitLoading(false)
      props.onClose()
    },
    [createContact, setSubmitLoading, props]
  )

  return (
    <Modal {...props} dismissible>
      <form onSubmit={onSubmit}>
        <Modal.Header>Create Contact</Modal.Header>
        <Modal.Body>
          <div className="flex gap-x-2">
            <div className="grow">
              <Label htmlFor="first-name">First Name</Label>
              <TextInput id="first-name" name="firstName" />
            </div>
            <div className="grow mb-2">
              <Label htmlFor="last-name">Last Name</Label>
              <TextInput id="last-name" name="lastName" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={submitLoading} type="submit">
            {submitLoading ? <Spinner /> : 'Submit'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
