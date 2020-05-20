import React from 'react'
import { render } from '@testing-library/react'
import { Spinner } from './index'
import styles from './styles.scss'

describe('<Spinner />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(<Spinner />)

    expect(getByTestId('spinner')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.spinner}`)).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(<Spinner additionalStyles={'testingClass'} />)

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
