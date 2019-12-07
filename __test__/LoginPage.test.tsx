import React from 'react'
import { render, act } from '@testing-library/react'
import { LoginPage } from 'pages/login'
import { LoginForm } from 'components/login/Form'
import { SocialButtons } from 'components/login/SocialButtons'
import { Router, useTranslation } from 'i18n'
import { parseCookies, destroyCookie } from 'nookies'

jest.mock('nookies', () => ({
  destroyCookie: jest.fn(),
  parseCookies: jest.fn().mockImplementation(() => ({
    redirectTo: '/fake/redirect',
  })),
}))

jest.mock('components/login/Form', () => ({
  LoginForm: jest.fn().mockImplementation(() => <></>),
}))

jest.mock('components/login/SocialButtons', () => ({
  SocialButtons: jest.fn().mockImplementation(() => <></>),
}))

describe('<LoginPage />', () => {
  beforeEach(() => {
    ;(LoginForm as jest.Mock).mockClear()
    ;(SocialButtons as jest.Mock).mockClear()
    ;(useTranslation as jest.Mock).mockClear()
    ;(Router.push as jest.Mock).mockClear()
    ;(destroyCookie as jest.Mock).mockClear()
    ;(parseCookies as jest.Mock).mockClear()
  })

  it('Should render the page', () => {
    const { getByTestId, queryByTestId } = render(<LoginPage />)

    expect(getByTestId('login-page')).toBeInTheDocument()
    expect(LoginForm).toBeCalledTimes(1)
    expect(SocialButtons).toBeCalledTimes(1)

    expect(queryByTestId('login-page-error')).toBeNull()

    expect(useTranslation).toBeCalledWith('login')
  })

  it('Should show error when login with social services fails', () => {
    let onFailureCallback: () => void
    ;(SocialButtons as jest.Mock).mockImplementation(
      ({ onFailure }: { onFailure: () => void }) => {
        onFailureCallback = onFailure
        return <></>
      }
    )

    const { getByTestId } = render(<LoginPage />)

    act(() => {
      onFailureCallback()
    })

    expect(getByTestId('login-page-error')).toBeInTheDocument()
  })

  it('Should redirect to / when onSuccess callback from Social Buttons has been triggered', () => {
    let onSuccessCallback: () => void
    ;(SocialButtons as jest.Mock).mockImplementation(
      ({ onSuccess }: { onSuccess: () => void }) => {
        onSuccessCallback = onSuccess
        return <></>
      }
    )

    render(<LoginPage />)

    act(() => {
      onSuccessCallback()
    })

    expect(Router.push).toBeCalledTimes(1)
    expect(Router.push).toBeCalledWith({
      pathname: '/',
    })
  })

  it('Should redirect to / when onSuccess callback from Login form has been triggered', () => {
    let onSuccessCallback: () => void
    ;(LoginForm as jest.Mock).mockImplementation(
      ({ onSuccess }: { onSuccess: () => void }) => {
        onSuccessCallback = onSuccess
        return <></>
      }
    )

    render(<LoginPage />)

    act(() => {
      onSuccessCallback()
    })

    expect(Router.push).toBeCalledTimes(1)
    expect(Router.push).toBeCalledWith({
      pathname: '/',
    })
  })

  it('Should return translations namespace and redirectTo from getInitialProps', async done => {
    if (!LoginPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
      redirectTo?: string
    } = await LoginPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['login'])
    expect(props).toHaveProperty('redirectTo')
    done()
  })

  it('Should parse cookies to return proper redirection after login URL from getInitialProps', async done => {
    if (!LoginPage.getInitialProps) {
      return done()
    }

    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
      redirectTo?: string
    } = await LoginPage.getInitialProps(ctx)

    expect(props).toHaveProperty('redirectTo')
    expect(props.redirectTo).toEqual('/fake/redirect')

    expect(destroyCookie).toBeCalledTimes(1)
    expect(parseCookies).toBeCalledTimes(1)

    expect(destroyCookie).toBeCalledWith(null, 'redirectTo')
    done()
  })
})
