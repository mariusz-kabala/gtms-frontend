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
  uploadUserAvatar,
} from '@gtms/api-auth'
import { IJWT } from '@gtms/api-auth'
import { userStore } from './user.store'
import {
  parseJwt,
  FileStatus,
  parseFiles,
  IAccountDetails,
} from '@gtms/commons'
import {
  addSuccessNotification,
  addErrorNotification,
} from '@gtms/state-notification'

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

export const markAsLoading = () =>
  userStore.update({
    isLoadingDetails: true,
    errorOccured: false,
  })

export const getAccountDetails = async () => {
  userStore.update({
    isLoadingDetails: true,
    errorOccured: false,
  })
  try {
    const details = await fetchAccountDetails()

    if (
      Array.isArray(details.avatar?.files) &&
      details.avatar?.status === FileStatus.ready
    ) {
      details.avatar.files = parseFiles(details.avatar.files)
    }

    userStore.update({
      ...(details as IAccountDetails),
      isLoadingDetails: false,
      errorOccured: false,
    })
  } catch (err) {
    userStore.update({
      isLoadingDetails: false,
      errorOccured: true,
    })
  }
}

export const initAccountDetails = (details: IAccountDetails) => {
  userStore.update(details)
}

export const updateAccountDetails = async (payload: IAccountUpdatePayload) => {
  try {
    const details = await updateAccountAPI(payload)

    if (
      Array.isArray(details.avatar?.files) &&
      details.avatar?.status === FileStatus.ready
    ) {
      details.avatar.files = parseFiles(details.avatar.files)
    }

    userStore.update(details as IAccountDetails)

    addSuccessNotification('Your profile has been updated')
  } catch (err) {
    addErrorNotification('Can not update your profile now, please try later')
  }
}

export const updateAccountAvatar = async (file: File) => {
  const state = userStore.getValue()

  userStore.update({
    avatar: {
      ...state.avatar,
      status: FileStatus.uploaded,
    },
  })

  await uploadUserAvatar(state.id, file)

  setTimeout(getAccountDetails, 2500)
}
