'use client'

import { useParams, useRouter } from 'next/navigation'
import {
  GetContactQuery,
  useDeleteContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from './contact.generated'
import Loading from '@/app/loading'
import Link from 'next/link'
import { Button, Label, Modal, Spinner, TextInput } from 'flowbite-react'
import { FormEvent, useCallback, useState } from 'react'

export default function App() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [updateContactLoading, setUpdateContactLoading] = useState(false)
  const params = useParams()
  const route = useRouter()

  const [updateContact] = useUpdateContactMutation()

  const { loading, data, error } = useGetContactQuery({
    variables: { id: params.contact },
  })

  const contact = data?.getContact

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      setUpdateContactLoading(true)
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      await updateContact({
        variables: {
          id: contact?._id ?? '',
          contact: {
            firstName: formData.get('firstName')?.toString() ?? '',
            lastName: formData.get('lastName')?.toString() ?? '',
          },
        },
      })
      setUpdateContactLoading(false)
      route.push('./')
    },
    [contact?._id, route, updateContact]
  )

  if (loading) return <Loading />

  return (
    <form onChange={() => setIsDirty(true)} onSubmit={onSubmit}>
      <DeleteContactModal
        contact={contact}
        onClose={() => setShowDeleteModal(false)}
        show={showDeleteModal}
      />
      <header className="p-6 border-b border-gray-500 flex items-center gap-x-2">
        <Link href="./">Back</Link>
        <h1 className="text-2xl font-semibold grow overflow-hidden text-ellipsis">
          {contact?.firstName} {contact?.lastName}
        </h1>
        <Button
          color="blue"
          type="submit"
          disabled={!isDirty || updateContactLoading}
        >
          {updateContactLoading ? <Spinner /> : 'Save'}
        </Button>
        <Button color="failure" onClick={() => setShowDeleteModal(true)}>
          Delete
        </Button>
      </header>
      <main className="overflow-auto p-4">
        <div className="flex gap-x-2">
          <div className="grow">
            <Label>First Name</Label>
            <TextInput
              name="firstName"
              defaultValue={contact?.firstName ?? ''}
            />
          </div>
          <div className="grow">
            <Label>Last Name</Label>
            <TextInput name="lastName" defaultValue={contact?.lastName ?? ''} />
          </div>
        </div>
      </main>
    </form>
  )
}

function DeleteContactModal(props: {
  show: boolean
  onClose: () => void
  contact: GetContactQuery['getContact']
}) {
  const { contact, onClose, show } = props

  const [loading, setIsLoading] = useState(false)

  const router = useRouter()
  const [deleteContactMutation] = useDeleteContactMutation()
  const deleteContact = useCallback(async () => {
    setIsLoading(true)
    await deleteContactMutation({ variables: { id: contact?._id } })
    router.push('./')
  }, [contact?._id, deleteContactMutation, router])

  return (
    <Modal show={show} onClose={onClose} dismissible>
      <Modal.Header>
        Delete {contact?.firstName} {contact?.lastName}
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {contact?.firstName} {contact?.lastName}
        ?
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={onClose}>
          Canel
        </Button>
        <Button color="failure" onClick={deleteContact}>
          {loading ? <Spinner /> : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
