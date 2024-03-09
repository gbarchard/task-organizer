import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { GraphQLContext } from '@/graphql/context'
import resolvers from '@/resolvers/resolvers'
import typeDefs from '@/resolvers/typeDefs'
import { GraphQLError } from 'graphql'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/authOptions'

const server = new ApolloServer<GraphQLContext>({
  resolvers,
  typeDefs,
})

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      throw new GraphQLError('Unauthenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      })
    }
    return { user: session.user }
  },
})

export { handler as GET, handler as POST }
