import React from 'react'
import { render } from '@testing-library/react'
import { Pagination } from './index'
import styles from './styles.scss'

describe('<Pagination />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(<Pagination />)

    expect(getByTestId('pagination')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <Pagination additionalStyles={'testingClass'} />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
