interface IToken {
  value: string
  expiresAt: number
}

export interface IUser {
  id: string
  name?: string
  surname?: string
  phone?: string
  email: string
  countryCode: string
  languageCode: string
  isBlocked: boolean
  isActive: boolean
  roles: string[]
  session?: {
    accessToken: IToken
    refreshToken: IToken
    createdAt: number
  }
}
