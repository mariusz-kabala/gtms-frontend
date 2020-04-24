import React from 'react'
import { render } from '@testing-library/react'
import { UploadFile } from './index'
import styles from './styles.scss'

describe('<UploadFile />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(
      <UploadFile />
    )

    expect(getByTestId('upload-file')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <UploadFile additionalStyles="testingClass" />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
