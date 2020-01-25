import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { ElementLike } from 'react-hook-form/dist/types'

export const Textarea: FC<{
  additionalStyles?: string
  defaultValue?: string
  name?: string
  placeholder?: string
  onClick?: () => unknown
  reference?: (ref: ElementLike | null) => void
}> = ({
  additionalStyles,
  defaultValue,
  name,
  placeholder,
  onClick,
  reference,
}) => (
  <textarea
    data-testid="formTextarea"
    className={cx(styles.input, additionalStyles)}
    defaultValue={defaultValue}
    id={name}
    name={name}
    onChange={() => alert('aa')}
    placeholder={placeholder}
    ref={reference}
    onClick={onClick}
  />
)
