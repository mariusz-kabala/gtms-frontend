import React from 'react'
import { render } from '@testing-library/react'
import { UserCard } from './index'
import styles from './styles.scss'

describe('<UserCard />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<UserCard />)

    expect(getByTestId('user-card')).toBeInTheDocument()
  })
})
