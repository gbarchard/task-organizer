import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import typeDefs from '@/graphql/schema/schema.graphql'

const resolvers = {
  Query: {
    hello: () => 'world',
  },
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
})

const handler = startServerAndCreateNextHandler(server)

export { handler as GET, handler as POST }
