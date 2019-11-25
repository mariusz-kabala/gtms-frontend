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
    accessToken: string
    refreshToken: string
    time: Date
  }
}

export interface IRegistrationData {
  email: string
  username?: string
  password: string
  passwordConfirmation: string
}

export interface ILoginData {
  email: string
  password: string
}

export interface IRegistrationResponse {
  countryCode: string
  email: string
  id: string
  languageCode: string
}

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
}
