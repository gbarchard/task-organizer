// TODO - dynamic imports

import { mergeResolvers } from '@graphql-tools/merge'
import { resolvers as contacts } from './contacts/contacts.resolve'
import { GraphQLObjectID } from './scalars'

export default mergeResolvers([contacts, { ObjectId: GraphQLObjectID }])
