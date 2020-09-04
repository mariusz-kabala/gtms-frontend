import { IUser } from './user'
import { IComment } from './comment'
import { IImage } from '../types/image'
import { FileStatus } from '../enums'

export interface IPostImage {
  status: FileStatus
  files: {
    '200x200'?: IImage
    '1300x1300'?: IImage
  }
}
export interface IPost {
  id: string
  group: string
  text: string
  html: string
  tags: string[]
  owner: IUser
  favs: string[]
  commentsCounter: number
  firstComments: IComment[]
  application: string
  createdAt: string
  updatedAt: string
  images: IPostImage[]
}
