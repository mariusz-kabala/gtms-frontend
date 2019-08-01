import { fetchJSON, makeApiUrl } from 'api/common'

export interface IRegisterUserReqPayload {
  email: string
  password: string
  name?: string
  confirmPassword: string
}

export interface ILoginRequestPayload {
  email: string
  password: string
}

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
}

export const registerUser = (payload: IRegisterUserReqPayload) =>
  fetchJSON<IRegisterUserReqPayload, any>(makeApiUrl('auth/users'), {
    values: payload,
  })

export const loginUser = (payload: ILoginRequestPayload) =>
  fetchJSON<ILoginRequestPayload, ILoginResponse>(
    makeApiUrl('auth/authenticate'),
    { values: payload }
  )
