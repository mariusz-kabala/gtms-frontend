import React from 'react'
import { render } from '@testing-library/react'
import { LogoutPage } from 'pages/logout'
import { destroyCookie } from 'nookies'
import Router from 'next/router'
import { useTranslation } from 'i18n'

jest.mock('nookies', () => ({
  destroyCookie: jest.fn(),
}))

jest.mock('next/router', () => ({
  push: jest.fn(),
}))

jest.mock('i18n', () => ({
  useTranslation: jest.fn().mockImplementation(() => ({
    i18n: {},
  })),
}))

describe('Logout Page', () => {
  it('Should destroy auth cookies', async done => {
    if (LogoutPage.getInitialProps) {
      // eslint-disable-next-line
      const ctx: any = null

      await LogoutPage.getInitialProps(ctx)

      expect(destroyCookie).toBeCalledTimes(2)
      expect(destroyCookie).toBeCalledWith(null, 'accessToken')
      expect(destroyCookie).toBeCalledWith(null, 'refreshToken')
    }

    done()
  })

  it('Should redirect to login page', () => {
    render(<LogoutPage />)

    expect(Router.push).toBeCalled()
    expect(Router.push).toBeCalledWith({ pathname: '/login' })
  })

  it('Should redirect to login page with language', () => {
    ;(useTranslation as jest.Mock).mockImplementation(() => ({
      i18n: {
        language: 'en',
      },
    }))

    render(<LogoutPage />)

    expect(Router.push).toBeCalled()
    expect(Router.push).toBeCalledWith({ pathname: '/en/login' })
  })
})
