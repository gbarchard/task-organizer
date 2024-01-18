import { Resolvers } from '../generated/graphql'

const resolvers: Resolvers = {
  Query: {
    hello: () => {
      return 'world'
    },
  },
}

export default resolvers
