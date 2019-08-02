import { ID } from '@datorama/akita'

export interface IToken {
  expiresAt: number
  value: string
}

export interface IUser {
  id: ID
  name: string
  surname: string
  email: string
  countryCode: string
  languageCode: string
  roles: string[]
  isActive: boolean
}

export interface IJwt extends IUser {
  iat: number
  exp: number
}
