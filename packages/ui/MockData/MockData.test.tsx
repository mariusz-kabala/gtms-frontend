import React from 'react'
import { render } from '@testing-library/react'
import { MockData, MockUsers } from './index'
import styles from './styles.scss'

describe('<MockData />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(<MockData />)

    expect(getByTestId('mock-data')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(<MockData additionalStyles={'testingClass'} />)

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})

describe('<MockUsers />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(<MockData />)

    expect(getByTestId('mock-users')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(<MockData additionalStyles={'testingClass'} />)

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
