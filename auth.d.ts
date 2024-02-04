import 'next-auth'
import { User } from 'next-auth'

declare module 'next-auth' {
  export interface User extends User {
    id: string
  }
  export interface Session extends Session {
    user?: User
  }
}
