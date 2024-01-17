import Link from 'next/link'

export default function NotFound() {
  return (
    <span className="m-auto">
      {'The page you are looking for cannot be found. Click '}
      <Link className="text-blue-600 hover:underline" href="/">
        here
      </Link>
      {' to go home.'}
    </span>
  )
}
