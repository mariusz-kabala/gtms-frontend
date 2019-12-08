import React from 'react'
import { render } from '@testing-library/react'
import { Modal } from './index'
import styles from './styles.scss'

describe('<Modal />', () => {
  it('Should be on the page', () => {
    const { getByTestId, getByText, container } = render(
      <Modal>
        <span>content</span>
      </Modal>
    )

    expect(getByTestId('modal')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.modal}`)).toBeInTheDocument()
    expect(getByText('content')).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <Modal additionalStyles={'testingClass'}>
        <span />
      </Modal>
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
