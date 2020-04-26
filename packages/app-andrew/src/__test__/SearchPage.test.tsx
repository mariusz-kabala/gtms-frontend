import React from 'react'
import { render, waitFor, act } from '@testing-library/react'
import { SearchPage } from '../pages/search-page'
import { redirect } from '@gtms/commons/helpers/redirect'
import { userStore, IUserStore } from '@gtms/state-user'

jest.mock('@gtms/commons/helpers/redirect', () => ({
  redirect: jest.fn(),
}))

describe('<SearchPage />', () => {
  it('Should render the page', () => {
    const { getByTestId } = render(<SearchPage />)

    expect(getByTestId('search-page')).toBeInTheDocument()
  })

  it('Should return translations namespace from getInitialProps', async (done) => {
    if (!SearchPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
    } = await SearchPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['searchPage'])

    done()
  })

  it('Should redirect to /login if auth session is not valid', async () => {
    render(<SearchPage />)

    await waitFor(() => {
      expect(redirect).toBeCalledTimes(1)
      expect(redirect).toBeCalledWith('/login', null)
    })
  })

  it('Should not redirect if auth session is valid', async () => {
    ;(redirect as jest.Mock).mockClear()
    render(<SearchPage />)

    act(() => {
      const now = new Date().getTime()
      const update: Partial<IUserStore> = {
        isInitialized: true,
        isActive: true,
        isBlocked: false,
        session: {
          accessToken: {
            expiresAt: now + 100,
            value: '',
          },
          refreshToken: {
            expiresAt: now + 100,
            value: '',
          },
          createdAt: now,
        },
      }

      userStore.update(update)
    })

    await waitFor(() => {
      expect(redirect).not.toBeCalled()
    })
  })
})
