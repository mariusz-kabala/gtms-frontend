import React from 'react'
import { render } from '@testing-library/react'
import { ShareGroup } from './index'

describe('<RemindPasswordForm />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<ShareGroup />)

    expect(getByTestId('share-group-component')).toBeInTheDocument()
  })
})
