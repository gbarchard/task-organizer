import { MongoClient } from 'mongodb'

let clientPromise: Promise<MongoClient>

const url = process.env.MONGO_URL || 'mongodb://localhost:27017'
const client = new MongoClient(url)
clientPromise = client.connect()

export default clientPromise

export const getDb = async () => {
  return (await clientPromise).db('task_organizer')
}
