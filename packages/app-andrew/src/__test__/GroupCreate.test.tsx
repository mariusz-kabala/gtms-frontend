import React from 'react'
import { render, waitFor, act } from '@testing-library/react'
import { GroupCreatePage } from '../pages/group-create'
import { redirect } from '@gtms/commons/helpers/redirect'
import { userStore, IUserStore } from '@gtms/state-user'

jest.mock('@gtms/commons/helpers/redirect', () => ({
  redirect: jest.fn(),
}))

describe('<GroupCreatePage />', () => {
  it('Should render the page', () => {
    const { getByTestId } = render(<GroupCreatePage />)

    expect(getByTestId('group-create-page')).toBeInTheDocument()
    expect(getByTestId('group-create')).toBeInTheDocument()
  })

  it('Should return translations namespace from getInitialProps', async (done) => {
    if (!GroupCreatePage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
    } = await GroupCreatePage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['groupCreate'])

    done()
  })

  it('Should redirect to /login if auth session is not valid', async () => {
    render(<GroupCreatePage />)

    await waitFor(() => {
      expect(redirect).toBeCalledTimes(1)
      expect(redirect).toBeCalledWith('/login', null)
    })
  })

  it('Should not redirect if auth session is valid', async () => {
    ;(redirect as jest.Mock).mockClear()
    render(<GroupCreatePage />)

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
