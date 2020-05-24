import { IUser } from './user'

export interface IPost {
  id: string
  group: string
  text: string
  tags: string[]
  owner: IUser
  commentsCounter: number
  application: string
  createdAt: string
  updatedAt: string
}
