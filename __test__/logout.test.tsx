import React from 'react'
import { render } from '@testing-library/react'
import { LogoutPage } from 'pages/logout'
import { destroyCookie } from 'nookies'
import { Router } from 'i18n'

jest.mock('nookies', () => ({
  destroyCookie: jest.fn(),
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

  it('Should return proper translations namespace from initial func', async done => {
    if (!LogoutPage.getInitialProps) {
      return done()
    }

    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
    } = await LogoutPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['logout'])

    done()
  })
})
