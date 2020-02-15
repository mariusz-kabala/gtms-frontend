import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { UserNameSurname } from './index'
import styles from './styles.scss'

describe('<UserNameSurname />', () => {
  it('Should be on the page and render all elements', () => {
    const { getByTestId, container } = render(
      <UserNameSurname onClick={jest.fn()} />
    )

    expect(getByTestId('user-name-surname')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.container}`)).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <UserNameSurname additionalStyles="testingClass" onClick={jest.fn()} />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })

  it('Should trigger callback when clicking on name or surname (text)', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<UserNameSurname onClick={callback} />)

    fireEvent.click(getByTestId('user-name-surname'))

    expect(callback).toBeCalledTimes(1)
  })
})
