import React from 'react'
import { render } from '@testing-library/react'
import { HomePage } from '../pages/index'
import { useTranslation } from '@gtms/commons/i18n'

describe('<HomePage />', () => {
  it('Should render group main page', () => {
    const { getByTestId } = render(<HomePage />)

    expect(getByTestId('home-page')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('homePage')
    expect(getByTestId('recently-registered-users')).toBeInTheDocument()
  })

  it('Should return translations namespace from getInitialProps', async (done) => {
    if (!HomePage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
    } = await HomePage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(new Set(props.namespacesRequired)).toContain('homePage')

    done()
  })
})
