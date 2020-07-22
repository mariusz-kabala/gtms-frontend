import { IUserAvatar } from './user'

export interface IAccountDetails {
  id: string
  name?: string
  surname?: string
  username: string
  description?: string
  postsCounter: number
  phone?: string
  email: string
  roles: string[]
  tags: string[]
  avatar: IUserAvatar
}
