import { FileStatus } from '../enums'

export interface IPromotedTagLogo {
  status: FileStatus.ready
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
  }
}

export interface IPromotedTagUploadedLogo {
  status: FileStatus.uploaded | FileStatus.processing
  files: string[]
}

export interface IPromotedTag {
  id: string
  tag: string
  description: string
  order: number
  logo: IPromotedTagLogo | IPromotedTagUploadedLogo
}
