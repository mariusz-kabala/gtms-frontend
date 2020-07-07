import { FileStatus } from '../enums'
import { IImage } from '../types/image'

export interface IPromotedTagLogo {
  status: FileStatus.ready
  files: {
    '35x35'?: IImage
    '50x50'?: IImage
    '200x200'?: IImage
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
