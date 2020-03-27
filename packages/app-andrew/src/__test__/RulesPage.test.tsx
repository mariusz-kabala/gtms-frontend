import React from 'react'
import { render } from '@testing-library/react'
import { RulesPage } from '../pages/rules'

describe('<RulesPage />', () => {
  it('Should render the page', () => {
    const { getByTestId } = render(<RulesPage />)

    expect(getByTestId('rules-page')).toBeInTheDocument()
  })
})
