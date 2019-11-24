import { fetchJSON, makeApiUrl } from 'api'
import { IRegistrationData, IRegistrationResponse } from './user.model'
import { userStore } from './user.store'

export const registerUserAccount = async (payload: IRegistrationData) => {
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

export const loginUser = (payload: any) =>
  fetchJSON(makeApiUrl('auth/authenticate'), { values: payload })

export const fbLogin = (payload: any) =>
  fetchJSON(makeApiUrl('auth/facebook'), { values: payload })
