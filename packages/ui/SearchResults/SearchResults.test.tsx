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

  /**
   * @todo this test is temporaty until we actualy use this component
   */
  it('Should display search results', () => {
    const { getByTestId } = render(<SearchResults tempActive={true} />)

    expect(getByTestId('search-result-0')).toBeInTheDocument()
    expect(getByTestId('search-result-1')).toBeInTheDocument()
    expect(getByTestId('search-result-2')).toBeInTheDocument()
    expect(getByTestId('search-result-3')).toBeInTheDocument()
    expect(getByTestId('search-result-4')).toBeInTheDocument()
    expect(getByTestId('search-result-5')).toBeInTheDocument()
  })
})
