import { renderHook, act } from '@testing-library/react-hooks'
import { useFacebookLogin } from './index'
// eslint-disable-next-line
// @ts-ignore
import { isMobile } from 'react-device-detect'
import { redirectToFB } from './redirectToFB'

document.getElementById = jest.fn()
document.getElementsByTagName = jest.fn()
document.createElement = jest.fn()
document.body.appendChild = jest.fn()

window.FB.init = jest.fn()
window.FB.login = jest.fn()
window.FB.api = jest.fn()

jest.mock('react-device-detect', () => ({
  isMobile: false,
}))

jest.mock('./redirectToFB', () => ({
  redirectToFB: jest.fn(),
}))

describe('useFacebookLogin hook', () => {
  // eslint-disable-next-line
  ;(process as any).browser = true

  beforeEach(() => {
    ;(document.getElementById as jest.Mock).mockClear()
    ;(document.getElementsByTagName as jest.Mock).mockClear()
    ;(document.createElement as jest.Mock).mockClear()
  })

  it('Should return isProgress and onClick callback', () => {
    ;(document.getElementById as jest.Mock).mockImplementation(() => true)

    const { result } = renderHook(() =>
      useFacebookLogin({
        appId: 'testing',
        onFailure: jest.fn(),
        onSuccess: jest.fn(),
      })
    )

    expect(document.getElementById).toBeCalledTimes(2)
    expect(result.current.isProcessing).toBe(false)
    expect(typeof result.current.onClick).toBe('function')
  })

  it('Should load SKD if not loaded', () => {
    ;(document.getElementById as jest.Mock).mockImplementation(
      (id: 'facebook-jssdk' | 'fb-root') => {
        const mapper = {
          'facebook-jssdk': undefined,
          'fb-root': true,
        }

        return mapper[id]
      }
    )
    ;(document.createElement as jest.Mock).mockImplementation(() => ({}))
    ;(document.getElementsByTagName as jest.Mock).mockImplementation(() => [
      {
        insertBefore: jest.fn(),
      },
    ])

    renderHook(() =>
      useFacebookLogin({
        appId: 'testing',
        onFailure: jest.fn(),
        onSuccess: jest.fn(),
      })
    )

    expect(document.getElementById).toBeCalledTimes(3)
    expect(document.createElement).toBeCalledWith('script')
    expect(document.getElementsByTagName).toBeCalledWith('script')
  })

  it('Should create fb-root if it does not exist', () => {
    const fbRoot: { id?: string } = {}
    ;(document.getElementById as jest.Mock).mockImplementation(() => undefined)
    ;(document.createElement as jest.Mock).mockImplementation(id => {
      if (id === 'div') {
        return fbRoot
      }

      return {}
    })
    ;(document.getElementsByTagName as jest.Mock).mockImplementation(() => [
      {
        insertBefore: jest.fn(),
      },
    ])

    renderHook(() =>
      useFacebookLogin({
        appId: 'testing',
        onFailure: jest.fn(),
        onSuccess: jest.fn(),
      })
    )

    expect(document.createElement).toBeCalledWith('div')
    expect(fbRoot.id).toBe('fb-root')
    expect(document.body.appendChild).toBeCalledWith(fbRoot)
  })

  it('Should init FB SKD with proper params', () => {
    ;(document.getElementById as jest.Mock).mockImplementation(
      (id: 'facebook-jssdk' | 'fb-root') => {
        const mapper = {
          'facebook-jssdk': undefined,
          'fb-root': true,
        }

        return mapper[id]
      }
    )
    ;(document.createElement as jest.Mock).mockImplementation(() => ({}))
    ;(document.getElementsByTagName as jest.Mock).mockImplementation(() => [
      {
        insertBefore: jest.fn(),
      },
    ])

    renderHook(() =>
      useFacebookLogin({
        appId: 'testing',
        onFailure: jest.fn(),
        onSuccess: jest.fn(),
      })
    )

    expect(typeof window.fbAsyncInit).toBe('function')

    act(() => {
      ;(window as { fbAsyncInit: () => void }).fbAsyncInit()
    })

    expect(window.FB.init).toBeCalledTimes(1)
    expect(window.FB.init).toBeCalledWith({
      version: 'v3.1',
      appId: 'testing',
      xfbml: false,
      cookie: false,
    })
  })

  it('Should call FB.login when triggering onClick func', () => {
    ;(document.getElementById as jest.Mock).mockImplementation(() => true)

    const { result } = renderHook(() =>
      useFacebookLogin({
        appId: 'testing',
        onFailure: jest.fn(),
        onSuccess: jest.fn(),
      })
    )

    act(() => {
      result.current.onClick()
    })

    expect(window.FB.login).toBeCalledTimes(1)
    expect((window.FB.login as jest.Mock).mock.calls[0][1]).toEqual({
      scope: 'public_profile,email',
      // eslint-disable-next-line
      return_scopes: false,
      // eslint-disable-next-line
      auth_type: '',
    })
  })

  it('Should fetch user info from FB API', () => {
    ;(document.getElementById as jest.Mock).mockImplementation(() => true)

    const { result } = renderHook(() =>
      useFacebookLogin({
        appId: 'testing',
        onFailure: jest.fn(),
        onSuccess: jest.fn(),
      })
    )

    // eslint-disable-next-line
    let checkLoginStatus: any
    ;(window.FB.login as jest.Mock).mockImplementation(callback => {
      checkLoginStatus = callback
    })

    act(() => {
      result.current.onClick()
    })

    expect(result.current.isProcessing).toBe(true)

    act(() =>
      checkLoginStatus({
        authResponse: true,
      })
    )

    expect(result.current.isProcessing).toBe(false)

    expect(window.FB.api).toBeCalledTimes(1)

    expect((window.FB.api as jest.Mock).mock.calls[0][0]).toBe('/me')
    expect((window.FB.api as jest.Mock).mock.calls[0][1]).toEqual({
      locale: 'en_US',
      fields: 'name',
    })
  })

  it('Should call onFailure when FB.login fails', () => {
    ;(document.getElementById as jest.Mock).mockImplementation(() => true)

    const onFailure = jest.fn()
    const { result } = renderHook(() =>
      useFacebookLogin({
        appId: 'testing',
        onFailure,
        onSuccess: jest.fn(),
      })
    )

    // eslint-disable-next-line
    let checkLoginStatus: any
    ;(window.FB.login as jest.Mock).mockImplementation(callback => {
      checkLoginStatus = callback
    })

    act(() => {
      result.current.onClick()
      checkLoginStatus({
        authResponse: false,
        status: 'failed',
      })
    })

    expect(onFailure).toBeCalled()
    expect(onFailure).toBeCalledWith({
      status: 'failed',
    })
  })

  it('Should redirect to FB when triggering onClick func and it is a mobile device', () => {
    ;(document.getElementById as jest.Mock).mockImplementation(() => true)

    const { result } = renderHook(() =>
      useFacebookLogin({
        appId: 'testing',
        onFailure: jest.fn(),
        onSuccess: jest.fn(),
      })
    )

    // eslint-disable-next-line
    // @ts-ignore
    isMobile = true

    act(() => {
      result.current.onClick()
    })

    expect(redirectToFB).toBeCalledTimes(1)
  })

  // this should always run as the last one because it set FB object to undefined, and will make other tests to fail
  it('Should call onFailure callback when triggering onClick and FB SDK is not loaded', () => {
    ;(document.getElementById as jest.Mock).mockImplementation(() => true)

    // eslint-disable-next-line
    // @ts-ignore
    isMobile = false
    const onFailure = jest.fn()

    const { result } = renderHook(() =>
      useFacebookLogin({
        appId: 'testing',
        onFailure,
        onSuccess: jest.fn(),
      })
    )

    window.FB = undefined as any

    act(() => {
      result.current.onClick()
    })

    expect(onFailure).toBeCalledTimes(1)
  })
})
