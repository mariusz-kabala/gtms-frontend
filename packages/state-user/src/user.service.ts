import {
  registerAccount,
  login,
  IRegistrationData,
  IRegistrationResponse,
  ILoginData,
  ILoginResponse,
  fbLogin,
  IFbLoginData,
  IFbLoginResponse,
  googleLogin,
  IGoogleLoginData,
  IGoogleLoginResponse,
  fetchAccountDetails,
  updateAccountAPI,
  IAccountUpdatePayload,
} from '@gtms/api-auth'
import { IJWT } from '@gtms/api-auth'
import { userStore } from './user.store'
import { parseJwt, FileStatus, parseFiles } from '@gtms/commons'

export const init = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string
  refreshToken: string
}) => {
  const storeValue = userStore.getValue()

  const parsedToken = parseJwt<IJWT>(accessToken)
  const parsedRefreshToken = parseJwt<IJWT>(refreshToken)

  if (storeValue.isInitialized) {
    userStore.update({
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
    })

    return userStore.getValue()
  }

  if (
    Array.isArray(parsedToken.avatar?.files) &&
    parsedToken.avatar?.status === FileStatus.ready
  ) {
    parsedToken.avatar.files = parseFiles(parsedToken.avatar.files)
  }

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
    avatar: parsedToken.avatar,
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

const updateStoreWithJWT = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string
  refreshToken: string
}) => {
  const parsedToken = parseJwt<IJWT>(accessToken)
  const parsedRefreshToken = parseJwt<IJWT>(refreshToken)

  if (
    Array.isArray(parsedToken.avatar?.files) &&
    parsedToken.avatar?.status === FileStatus.ready
  ) {
    parsedToken.avatar.files = parseFiles(parsedToken.avatar.files)
  }

  userStore.update({
    id: parsedToken.id,
    name: parsedToken.name,
    surname: parsedToken.surname,
    email: parsedToken.email,
    countryCode: parsedToken.countryCode,
    languageCode: parsedToken.languageCode,
    roles: parsedToken.roles,
    isActive: parsedToken.isActive,
    avatar: parsedToken.avatar,
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
  })
}

export const fbLoginUser = async (
  payload: IFbLoginData
): Promise<IFbLoginResponse> => {
  const response = await fbLogin(payload)

  updateStoreWithJWT(response)

  return response
}

export const googleLoginUser = async (
  payload: IGoogleLoginData
): Promise<IGoogleLoginResponse> => {
  const response = await googleLogin(payload)

  updateStoreWithJWT(response)

  return response
}

export const loginUser = async (
  payload: ILoginData
): Promise<ILoginResponse> => {
  const response = await login(payload)

  updateStoreWithJWT(response)

  return response
}

export const logoutUser = () => {
  userStore.destroy()
}

export const getAccountDetails = async () => {
  const details = await fetchAccountDetails()

  userStore.update(details)
}

export const updateAccountDetails = async (payload: IAccountUpdatePayload) => {
  const details = await updateAccountAPI(payload)

  userStore.update(details)
}
