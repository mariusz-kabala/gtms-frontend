import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

const FB_SDK_ID = 'facebook-jssdk'

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
        callback: (params: any) => unknown,
        payload: boolean | any
      ) => void
      getLoginStatus: (callback: (response: any) => unknown) => void
    }
  }
}

function decodeParam(paramString: string, key: string) {
  return decodeURIComponent(
    paramString.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i'
      ),
      '$1'
    )
  )
}

function getParamsFromObject(params: {
  [key: string]: string | boolean | number
}) {
  return (
    '?' +
    Object.keys(params)
      .map(param => `${param}=${encodeURIComponent(params[param])}`)
      .join('&')
  )
}

function isRedirectedFromFb(): boolean {
  const params = window.location.search

  return !!(
    decodeParam(params, 'code') || decodeParam(params, 'granted_scopes')
  )
}

function checkIfSDKIsLoaded(): boolean {
  return !!document.getElementById(FB_SDK_ID)
}

function setFbAsyncInit({
  appId,
  xfbml,
  cookie,
  version,
  onInit,
}: {
  appId: string
  xfbml: boolean
  cookie: boolean
  version: string
  onInit: () => void
}) {
  if (!window) {
    return
  }

  window.fbAsyncInit = () => {
    window.FB.init({
      version,
      appId,
      xfbml,
      cookie,
    })

    onInit()
  }
}

function loadSDK(language: string) {
  const fbScript = document.createElement('script')
  fbScript.id = FB_SDK_ID
  fbScript.src = `https://connect.facebook.net/${language}/sdk.js`

  const scriptTag = document.getElementsByTagName('script')[0]
  const container = scriptTag.parentNode

  container && container.insertBefore(fbScript, scriptTag)
}

function createFBRoot() {
  const id = 'fb-root'

  if (document.getElementById(id)) {
    return
  }

  const fbRoot = document.createElement('div')
  fbRoot.id = 'fb-root'
  document.body.appendChild(fbRoot)
}

export function useFacebookLogin({
  appId,
  language = 'en_US',
  xfbml = false,
  cookie = false,
  authType = '',
  scope = 'public_profile,email',
  state = 'facebookdirect',
  responseType = 'code',
  fields = 'name',
  version = '3.1',
  returnScopes = false,
  autoLoad = false,
  redirectUrl = typeof window !== 'undefined' ? window.location.href : '/',
  onFailure,
  callback,
}: {
  appId: string
  language?: string
  xfbml?: boolean
  cookie?: boolean
  authType?: string
  fields?: string
  scope?: string
  responseType?: string
  version?: string
  autoLoad?: boolean
  state?: string
  returnScopes?: boolean
  redirectUrl?: string
  onFailure?: (params: { status: string }) => unknown
  callback: (params: { status: string }) => unknown
}) {
  const [isSDKLoaded, setIsSDKLoaded] = useState<boolean>(checkIfSDKIsLoaded())
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const checkLoginStatus = (response: any) => {
    setIsProcessing(false)

    if (response.authResponse) {
      return window.FB.api(
        '/me',
        {
          locale: language,
          fields,
        },
        me =>
          callback({
            ...me,
            ...response.authResponse,
          })
      )
    }

    if (onFailure) {
      return onFailure({
        status: response.status,
      })
    }

    callback({
      status: response.status,
    })
  }

  const checkLoginAfterRefresh = (response: any) => {
    if (response.status === 'connected') {
      return checkLoginStatus(response)
    }

    window.FB.login(
      (loginResponse: any) => checkLoginStatus(loginResponse),
      true
    )
  }

  const onInit = () => {
    setIsSDKLoaded(true)

    if (autoLoad || isRedirectedFromFb()) {
      window.FB.getLoginStatus(checkLoginAfterRefresh)
    }
  }

  const onClick = () => {
    setIsProcessing(true)

    /* eslint-disable */
    const params = {
      client_id: appId,
      redirect_uri: redirectUrl,
      state,
      return_scopes: returnScopes,
      scope,
      response_type: responseType,
      auth_type: authType,
    }
    /* eslint-enable */

    if (isMobile) {
      window.location.href = `https://www.facebook.com/dialog/oauth${getParamsFromObject(
        params
      )}`
      return
    }

    if (!window.FB && onFailure) {
      return onFailure({ status: 'FBNotLoaded' })
    }

    /* eslint-disable */
    window.FB.login(checkLoginStatus, {
      scope,
      return_scopes: returnScopes,
      auth_type: params.auth_type,
    })
    /* eslint-enable */
  }

  useEffect(() => {
    if (checkIfSDKIsLoaded()) {
      return
    }

    setFbAsyncInit({
      appId,
      xfbml,
      cookie,
      version,
      onInit,
    })
    loadSDK(language)
    createFBRoot()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!isSDKLoaded || !autoLoad) {
      return
    }

    window.FB.getLoginStatus(checkLoginAfterRefresh)
    // eslint-disable-next-line
  }, [isSDKLoaded, autoLoad])

  return { onClick, isProcessing }
}
