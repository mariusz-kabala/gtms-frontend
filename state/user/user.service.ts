import {
  registerAccount,
  login,
  IRegistrationData,
  IRegistrationResponse,
  ILoginData,
  ILoginResponse,
} from 'api/auth'
import { IJWT } from 'api/auth'
import { userStore } from './user.store'
import { parseJwt } from 'helpers/jwt'

export const init = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string
  refreshToken: string
}) => {
  const storeValue = userStore.getValue()

  if (storeValue.isInitialized) {
    return storeValue
  }

  const parsedToken = parseJwt<IJWT>(accessToken)
  const parsedRefreshToken = parseJwt<IJWT>(refreshToken)

  const update = {
    isInitialized: true,
    id: parsedToken.id,
    name: parsedToken.name,
    surname: parsedToken.surname,
    email: parsedToken.email,
    countryCode: parsedToken.countryCode,
    languageCode: parsedToken.languageCode,
    roles: parsedToken.roles,
    isActive: parsedToken.isActive,
    session: {
      accessToken: {
        value: accessToken,
        expiresAt: new Date(parsedToken.exp * 1000).getTime(),
      },
      refreshToken: {
        value: refreshToken,
        expiresAt: new Date(parsedRefreshToken.exp * 1000).getTime(),
      },
      createdAt: new Date().getTime(),
    },
  }

  userStore.update(update)

  return update
}

export const registerUserAccount = async (
  payload: IRegistrationData
): Promise<IRegistrationResponse> => {
  const response = await registerAccount(payload)

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
  const response = await login(payload)

  const parsedToken = parseJwt<IJWT>(response.accessToken)
  const parsedRefreshToken = parseJwt<IJWT>(response.refreshToken)

  userStore.update({
    id: parsedToken.id,
    name: parsedToken.name,
    surname: parsedToken.surname,
    email: parsedToken.email,
    countryCode: parsedToken.countryCode,
    languageCode: parsedToken.languageCode,
    roles: parsedToken.roles,
    isActive: parsedToken.isActive,
    session: {
      accessToken: {
        value: response.accessToken,
        expiresAt: new Date(parsedToken.exp * 1000).getTime(),
      },
      refreshToken: {
        value: response.refreshToken,
        expiresAt: new Date(parsedRefreshToken.exp * 1000).getTime(),
      },
      createdAt: new Date().getTime(),
    },
  })

  return response
}

export const logoutUser = () => {
  userStore.update({
    isInitialized: true,
  })
}
