import { IUserState } from '@gtms/state-user'

export interface IJWT extends IUserState {
  iat: number
  exp: number
}
