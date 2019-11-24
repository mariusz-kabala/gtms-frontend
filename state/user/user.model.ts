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
}

export interface IRegistrationData {
  email: string
  username?: string
  password: string
  passwordConfirmation: string
}

export interface IRegistrationResponse {
  countryCode: string
  email: string
  id: string
  languageCode: string
}
