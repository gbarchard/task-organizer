import { Resolvers } from '../resolvers.generated'
import {
  getContactById,
  getContactsByOwnerId,
  createContact,
  deleteContactById,
  updateContact,
} from './contacts.repo'

export const resolvers: Resolvers = {
  Query: {
    getContact: async (_, args) => {
      return await getContactById(args.id)
    },
    getContacts: async (_, __, context) => {
      return await getContactsByOwnerId(context.user.id)
    },
  },
  Mutation: {
    createContact: async (_, args, context) => {
      await createContact({
        ...args.contact,
        userId: context.user.id,
      }).then((d) => d.acknowledged)
      return {
        code: 200,
        sucess: true,
        message: 'sucessfully created contact',
      }
    },
    deleteContact: async (_, args) => {
      await deleteContactById(args.id)
      return {
        code: 200,
        sucess: true,
        message: 'sucessfully deleted contact',
      }
    },
    updateContact: async (_, args) => {
      const { contact, id } = args
      await updateContact(id, contact)
      return {
        code: 200,
        sucess: true,
        message: 'sucessfully updated contact',
      }
    },
  },
}
