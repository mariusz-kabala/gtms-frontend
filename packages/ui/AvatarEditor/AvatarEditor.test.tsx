import React from 'react'
import { render } from '@testing-library/react'
import { AvatarEditor } from './index'
import styles from './styles.scss'

describe('<AvatarEditor />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(<AvatarEditor />)

    expect(getByTestId('avatar-editor')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <AvatarEditor additionalStyles="testingClass" />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
