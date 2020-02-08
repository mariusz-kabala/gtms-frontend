import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { ElementLike } from 'react-hook-form/dist/types'

export const Input: FC<{
  additionalStyles?: string
  defaultValue?: string
  name?: string
  onClick?: () => unknown
  placeholder?: string
  reference?: (ref: ElementLike | null) => void
  type?: 'text' | 'email' | 'password'
}> = ({
  additionalStyles,
  defaultValue,
  name,
  onClick,
  placeholder,
  reference,
  type = 'text',
}) => (
  <input
    type={type}
    data-testid="formInput"
    className={cx(styles.input, additionalStyles)}
    defaultValue={defaultValue}
    name={name}
    id={name}
    placeholder={placeholder}
    ref={reference}
    onClick={onClick}
  />
)
