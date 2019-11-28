import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { ElementLike } from 'react-hook-form/dist/types'

export const Input: FC<{
  additionalStyles?: string
  defaultValue?: string
  name?: string
  placeholder?: string
  ref?: (ref: ElementLike | null) => void
  onClick?: () => unknown
}> = ({ additionalStyles, defaultValue, name, placeholder, onClick, ref }) => (
  <input
    data-testid="form-input"
    className={cx(styles.input, additionalStyles)}
    defaultValue={defaultValue}
    name={name}
    placeholder={placeholder}
    ref={ref}
    onClick={onClick}
  />
)
