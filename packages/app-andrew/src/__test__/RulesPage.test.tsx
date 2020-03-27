import React from 'react'
import { render } from '@testing-library/react'
import { RulesPage } from '../pages/rules'

describe('<RulesPage />', () => {
  it('Should render the page', () => {
    const { getByTestId } = render(<RulesPage />)

    expect(getByTestId('rules-page')).toBeInTheDocument()
  })

  it('Should return translations namespace from getInitialProps', async (done) => {
    if (!RulesPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
    } = await RulesPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['rules'])

    done()
  })
})
