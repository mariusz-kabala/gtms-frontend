import React from 'react'
import { render } from '@testing-library/react'
import { SearchResults } from './index'
import styles from './styles.scss'

describe('<SearchResults />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(<SearchResults />)

    expect(getByTestId('searchResults')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
  })
})
