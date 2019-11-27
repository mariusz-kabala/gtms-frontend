import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Input: FC<{
  additionalStyles?: string
  defaultValue: string
  name: string
  placeholder: string
  // reference @todo
  onClick: () => unknown
}> = ({
  additionalStyles,
  defaultValue,
  name,
  placeholder,
  onClick,
  reference,
}) => (
  <input
    className={cx(styles.input, additionalStyles)}
    defaultValue={defaultValue}
    // onChange={e => update(e.target.value)}
    name={name}
    placeholder={placeholder}
    ref={reference}
    onClick={onClick}
  />
)
