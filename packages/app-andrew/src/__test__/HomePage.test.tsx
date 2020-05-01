import React from 'react'
import { render } from '@testing-library/react'
import { AppMainPage } from '../pages/home-page'
import { useTranslation } from '@gtms/commons/i18n'

describe('<AppMainPage />', () => {
  it('Should render group main page', () => {
    const { getByTestId } = render(<AppMainPage />)

    expect(getByTestId('app-main-page')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('appMainPage')
    expect(getByTestId('recently-registered-users')).toBeInTheDocument()
  })

  it('Should return translations namespace from getInitialProps', async (done) => {
    if (!AppMainPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
    } = await AppMainPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(new Set(props.namespacesRequired)).toContain('appMainPage')

    done()
  })
})
