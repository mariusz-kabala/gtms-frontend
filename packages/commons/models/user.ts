import { FileStatus } from '../enums'
import { IImage } from '../types/image'

export interface IUserAvatar {
  status: FileStatus
  files: {
    '35x35'?: IImage
    '50x50'?: IImage
    '200x200'?: IImage
    '800x800'?: IImage
    '1300x1300'?: IImage
  }
}

export interface IUser {
  id: string
  name?: string
  surname?: string
  phone?: string
  email: string
  avatar: IUserAvatar
  countryCode: string
  languageCode: string
  tags: string[]
  description?: string
}
