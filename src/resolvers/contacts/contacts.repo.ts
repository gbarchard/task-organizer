import { getDb } from '@/services/database.service'
import { Contact } from './contacts.model'
import { ObjectId } from 'mongodb'
import { ContactInput } from '@/gql-types.generated'

const CONTACTS_COLLECTION = 'contacts'

async function contactsColl() {
  const db = await getDb()
  return db.collection<Contact>(CONTACTS_COLLECTION)
}

export async function getContactsByOwnerId(userId: ObjectId) {
  const coll = await contactsColl()
  return coll.find({ userId }).toArray()
}

export async function getContactById(_id: ObjectId) {
  const coll = await contactsColl()
  return coll.findOne({ _id })
}

export async function createContact(contact: Contact) {
  const coll = await contactsColl()
  return coll.insertOne(contact)
}

export async function updateContact(_id: ObjectId, contact: ContactInput) {
  const coll = await contactsColl()
  // idk if this works like this
  return coll.updateOne(
    { _id },
    { $set: { firstName: contact.firstName, lastName: contact.lastName } }
  )
}

export async function deleteContactById(_id: ObjectId) {
  const coll = await contactsColl()
  return await coll.deleteOne({ _id })
}
