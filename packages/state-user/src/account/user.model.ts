import { IUser } from '@gtms/commons/models'

export interface IToken {
  value: string
  expiresAt: number
}

export interface IUserState extends IUser {
  isBlocked: boolean
  isActive: boolean
  roles: string[]
  tags: string[]
  session?: {
    accessToken: IToken
    refreshToken: IToken
    createdAt: number
  }
}
