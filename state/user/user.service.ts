import { fetchJSON, makeApiUrl } from 'api'
import {
  IRegistrationData,
  IRegistrationResponse,
  ILoginData,
  ILoginResponse,
} from './user.model'
import { userStore } from './user.store'

export const registerUserAccount = async (
  payload: IRegistrationData
): Promise<IRegistrationResponse> => {
  const response = await fetchJSON<IRegistrationData, IRegistrationResponse>(
    makeApiUrl('auth/users'),
    { values: payload }
  )

  userStore.update({
    ...response,
    isBlocked: false,
    isActive: false,
    roles: [],
  })

  return response
}

export const loginUser = async (
  payload: ILoginData
): Promise<ILoginResponse> => {
  const response = await fetchJSON<ILoginData, ILoginResponse>(
    makeApiUrl('auth/authenticate'),
    { values: payload }
  )

  userStore.update({
    session: {
      ...response,
      time: new Date(),
    },
  })

  return response
}

export const fbLogin = (payload: any) =>
  fetchJSON(makeApiUrl('auth/facebook'), { values: payload })
