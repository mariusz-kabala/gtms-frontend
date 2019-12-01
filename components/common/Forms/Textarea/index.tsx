import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { ElementLike } from 'react-hook-form/dist/types'

export const Textarea: FC<{
  additionalStyles?: string
  name?: string
  placeholder?: string
  reference?: (ref: ElementLike | null) => void
  onClick?: () => unknown
}> = ({ additionalStyles, name, placeholder, onClick, reference }) => (
  <textarea
    data-testid="form-textarea"
    className={cx(styles.input, additionalStyles)}
    name={name}
    placeholder={placeholder}
    ref={reference}
    onClick={onClick}
  />
)
