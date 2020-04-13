import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Input: FC<{
  additionalStyles?: string
  defaultValue?: string
  name?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  reference?: (
    ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  ) => void
  onClick?: () => unknown
  atributes?: React.InputHTMLAttributes<HTMLInputElement>
}> = ({
  additionalStyles,
  defaultValue,
  name,
  placeholder,
  onClick,
  reference,
  type = 'text',
  atributes,
}) => (
  <input
    type={type}
    data-testid="form-input"
    className={cx(styles.input, additionalStyles)}
    defaultValue={defaultValue}
    name={name}
    id={name}
    placeholder={placeholder}
    ref={reference}
    onClick={onClick}
    onFocus={(element) => element.currentTarget.select()}
    {...atributes}
  />
)
