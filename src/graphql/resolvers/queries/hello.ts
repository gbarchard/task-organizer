import { QueryResolvers } from '@/graphql/generated/resolvers'
import { getDb } from '@/services/database.service'

const HELLO_COLLECTION = 'hello'

type HelloCollection = { hello: string }

export const hello: QueryResolvers['hello'] = async (_, __, context) => {
  const db = await getDb()
  const helloCollection = db.collection<HelloCollection>(HELLO_COLLECTION)
  const doc = await helloCollection.findOne()
  if (!doc) {
    throw Error('')
  }
  return doc.hello
}
