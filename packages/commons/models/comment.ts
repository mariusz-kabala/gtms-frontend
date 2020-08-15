import { IAccountDetails } from './accountDetails'
import { IUser } from './user'

export interface ISubComment {
  id: string
  owner: IUser | IAccountDetails
  createdAt: string
  updatedAt: string
  text: string
  html: string
  tags: string[]
}

export interface IComment {
  id: string
  text: string
  html: string
  subComments: ISubComment[]
  tags: string[]
  owner: IUser | IAccountDetails
  createdAt: string
  updatedAt: string
}
