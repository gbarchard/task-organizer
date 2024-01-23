import { QueryResolvers } from '@/graphql/generated/resolvers'

export const hello: QueryResolvers['hello'] = () => {
  return 'world'
}
