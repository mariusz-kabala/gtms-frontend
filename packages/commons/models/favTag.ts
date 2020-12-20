import { FavTagType } from '../enums'
import { IPromotedTagLogo } from './promotedTag'

export interface IFavTag {
  id: string
  tag: string
  type: FavTagType
  logo?: IPromotedTagLogo
}
