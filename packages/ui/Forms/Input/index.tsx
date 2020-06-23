import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Input: FC<{
  additionalStyles?: string
  defaultValue?: string
  maxLength?: number
  name?: string
  onClick?: () => unknown
  placeholder?: string
  reference?: (
    ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  ) => void
  type?: 'text' | 'email' | 'password'
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
    className={cx(styles.input, additionalStyles)}
    data-testid="form-input"
    defaultValue={defaultValue}
    id={name}
    maxLength={maxLength}
    name={name}
    onClick={onClick}
    placeholder={placeholder}
    ref={reference}
    type={type}
  />
)
