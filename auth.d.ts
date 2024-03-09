import { ObjectId } from 'mongodb'
import 'next-auth'
import { User } from 'next-auth'

declare module 'next-auth' {
  export interface User extends User {
    id: ObjectId
  }
  export interface Session extends Session {
    user?: User
  }
}
