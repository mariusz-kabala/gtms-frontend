import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Textarea: FC<{
  additionalStyles?: string
  name?: string
  placeholder?: string
  reference?: (
    ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  ) => void
}> = ({ additionalStyles, name, placeholder, reference }) => (
  <textarea
    data-testid="form-textarea"
    className={cx(styles.textarea, additionalStyles)}
    name={name}
    placeholder={placeholder}
    ref={reference}
  />
)
