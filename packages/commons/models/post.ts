import { IUser } from './user'
import { IComment } from './comment'

export interface IPost {
  id: string
  group: string
  text: string
  tags: string[]
  owner: IUser
  commentsCounter: number
  firstComments: IComment[]
  application: string
  createdAt: string
  updatedAt: string
}
