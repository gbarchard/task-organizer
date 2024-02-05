import { Spinner } from 'flowbite-react'

export default function Loading() {
  return (
    <div className="grow flex items-center justify-center">
      <Spinner color="info" size="xl" />
    </div>
  )
}
