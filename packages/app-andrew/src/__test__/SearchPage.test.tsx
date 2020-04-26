import React from 'react'
import { render } from '@testing-library/react'
import { SearchPage } from '../pages/search-page'

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
})
