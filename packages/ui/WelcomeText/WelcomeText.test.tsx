import React from 'react'
import { render } from '@testing-library/react'
import { WelcomeText } from './index'

describe('<WelcomeText />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <WelcomeText>
        <a>testing</a>
      </WelcomeText>
    )

    expect(getByTestId('welcome-text')).toBeInTheDocument()
  })
})
