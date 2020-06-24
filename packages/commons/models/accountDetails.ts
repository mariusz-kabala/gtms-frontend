import { IUserAvatar } from './user'

export interface IAccountDetails {
  id: string
  name?: string
  surname?: string
  description?: string
  phone?: string
  email: string
  roles: string[]
  tags: string[]
  avatar: IUserAvatar
}
