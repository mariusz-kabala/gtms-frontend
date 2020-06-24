import { IAccountDetails } from './accountDetails'
import { IUser } from './user'

export interface IComment {
  id: string
  text: string
  lastSubComments: {
    owner: string
    createdAt: string
    updatedAt: string
    text: string
  }[]
  tags: string[]
  owner: IUser | IAccountDetails
  createdAt: string
  updatedAt: string
}
