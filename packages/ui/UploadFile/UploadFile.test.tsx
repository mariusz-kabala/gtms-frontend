import React from 'react'
import { render } from '@testing-library/react'
import { UploadFile } from './index'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'

describe('<UploadFile />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(
      <UploadFile onDrop={() => null} />
    )

    expect(getByTestId('upload-file')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('uploadFileComponent')
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <UploadFile onDrop={() => null} additionalStyles="testingClass" />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
