import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import typeDefs from '@/graphql/schema/schema.graphql'
import resolvers from '@/graphql/resolvers/resolvers'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

const server = new ApolloServer({
  resolvers,
  typeDefs,
})

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    const session = await getServerSession(authOptions)
    console.log('the session', session)
    return {}
  },
})

export { handler as GET, handler as POST }
