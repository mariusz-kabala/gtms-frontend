import { FileStatus } from '../enums'

export interface IUser {
  id: string
  name?: string
  surname?: string
  phone?: string
  email: string
  avatar: {
    status: FileStatus
    files: {
      '35x35'?: {
        jpg: string
        webp: string
      }
      '50x50'?: {
        jpg: string
        webp: string
      }
      '200x200'?: {
        jpg: string
        webp: string
      }
      '800x800'?: {
        jpg: string
        webp: string
      }
      '1300x1300'?: {
        jpg: string
        webp: string
      }
    }
  }
  countryCode: string
  languageCode: string
}
