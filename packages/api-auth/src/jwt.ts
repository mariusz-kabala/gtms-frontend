import { IUser } from '@gtms/state-user'

export interface IJWT extends IUser {
  iat: number
  exp: number
}
