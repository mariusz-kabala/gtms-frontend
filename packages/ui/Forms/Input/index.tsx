import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Input: FC<{
  additionalStyles?: string
  defaultValue?: string
  name?: string
  placeholder?: string
  maxLength?: number
  type?: 'text' | 'email' | 'password'
  reference?: (
    ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  ) => void
  onClick?: () => unknown
}> = ({
  additionalStyles,
  defaultValue,
  name,
  placeholder,
  onClick,
  reference,
  maxLength,
  type = 'text',
}) => (
  <input
    type={type}
    data-testid="form-input"
    className={cx(styles.input, additionalStyles)}
    defaultValue={defaultValue}
    name={name}
    id={name}
    maxLength={maxLength}
    placeholder={placeholder}
    ref={reference}
    onClick={onClick}
  />
)
