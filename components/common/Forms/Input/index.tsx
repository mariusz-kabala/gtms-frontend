import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Input: FC<{
  additionalStyles?: string
  defaultValue?: string
  name?: string
  placeholder?: string
  // reference @todo
  onClick?: () => unknown
}> = ({
  additionalStyles,
  defaultValue,
  name,
  placeholder,
  onClick,
  // reference, @todo do it
}) => (
  <input
    className={cx(styles.input, additionalStyles)}
    defaultValue={defaultValue}
    name={name}
    placeholder={placeholder}
    // ref={reference}
    onClick={onClick}
  />
)
