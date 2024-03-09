import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/services/database.service'
import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { ObjectId } from 'mongodb'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = new ObjectId(user.id)
      }
      return session
    },
    redirect: ({ url, baseUrl }) => {
      const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : url
      if (fullUrl === baseUrl) {
        return '/home'
      }
      return baseUrl
    },
  },
  adapter: MongoDBAdapter(clientPromise, { databaseName: 'task_organizer' }),
  secret: process.env.NEXTAUTH_SECTRET,
}
