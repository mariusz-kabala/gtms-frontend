import { IUser } from 'state/user'

export interface IJWT extends IUser {
  iat: number
  exp: number
}
