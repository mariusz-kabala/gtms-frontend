import React from 'react'
import { render } from '@testing-library/react'
import { SearchBar } from './index'
import styles from './styles.scss'

describe('<SearchBar />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(<SearchBar />)

    expect(getByTestId('searchBar')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.searchBar}`)).toBeInTheDocument()
  })
})
