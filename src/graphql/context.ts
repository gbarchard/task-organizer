import { User } from 'next-auth'

export interface GraphQLContext {
  user: User
}
