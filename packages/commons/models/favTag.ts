import { FavTagType } from '../enums'
import { IPromotedTag } from './promotedTag'

export interface IFavTag {
  id: string
  tag?: string
  groupTag: IPromotedTag
  type: FavTagType
  createdAt: string
  updatedAt: string
}
