import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Error: FC<{
  additionalStyles?: string
  text: string
}> = ({ additionalStyles, text }) => (
  <span data-testid="form-error" className={cx(styles.error, additionalStyles)}>
    {text}
  </span>
)
