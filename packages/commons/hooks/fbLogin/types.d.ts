declare global {
  interface Window {
    fbAsyncInit?: () => void
    FB: {
      init: (params: {
        version: string
        appId: string
        xfbml: boolean
        cookie: boolean
      }) => void
      api: (
        endpoint: string,
        params: {
          locale: string
          fields: string
        },
        callback: (me: any) => unknown
      ) => void
      login: (
        callback: (params: IFBResponse) => unknown,
        payload: boolean | any
      ) => void
      getLoginStatus: (callback: (response: IFBResponse) => unknown) => void
    }
  }
}

export interface IFBResponse {
  status: string
  authResponse: IFBAuthResponse
}

export interface IFBAuthResponse {
  accessToken: string
  data_access_expiration_time: number
  id: string
  expiresIn: number
  signedRequest: string
  userID: string
  email?: string
  name?: string
  picture?: {
    data: {
      height: number
      width: number
      url: string
      is_silhouette: boolean
    }
  }
}
