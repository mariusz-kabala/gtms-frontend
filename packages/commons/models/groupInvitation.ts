import { IUser } from './user'

export interface IGroupInvitation {
  id: string
  from: IUser
  user: IUser
  code: string
  description?: string
  createdAt: string
  updatedAt: string
}
