import { fetchJSON, makeApiUrl } from 'api'

export interface ILoginData {
  email: string
  password: string
}

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
}

export const login = (payload: ILoginData): Promise<ILoginResponse> =>
  fetchJSON<ILoginData, ILoginResponse>(makeApiUrl('auth/authenticate'), {
    values: payload,
  })
