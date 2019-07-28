import { fetchJSON, makeApiUrl } from 'api/common'

export interface IRegisterUserReqPayload {
    email: string
    password: string
    name?: string
    confirmPassword: string
}

export interface ILoginUserReqPayload {
    email: string
    password: string
}

export const registerUser = (payload: IRegisterUserReqPayload) => fetchJSON<IRegisterUserReqPayload>(makeApiUrl('auth/users'), { values: payload })

export const loginUser = (payload: ILoginUserReqPayload) =>
    fetchJSON<ILoginUserReqPayload>(makeApiUrl('auth/authenticate'), { values: payload })
