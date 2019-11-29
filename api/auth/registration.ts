import { fetchJSON, makeApiUrl } from '../index'

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

export const registerAccount = (
  payload: IRegistrationData
): Promise<IRegistrationResponse> =>
  fetchJSON<IRegistrationData, IRegistrationResponse>(
    makeApiUrl('auth/users'),
    { values: payload }
  )
