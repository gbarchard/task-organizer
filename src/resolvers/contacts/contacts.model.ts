import { Contact as _Contact } from '../resolvers.generated'

export interface Contact extends Omit<_Contact, '__typename' | '_id'> {}
