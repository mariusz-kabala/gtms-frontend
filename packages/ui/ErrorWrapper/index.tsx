import React, { FC, ReactNode } from 'react'
import cx from 'classnames'
import styles from './styles.scss'

export const ErrorWrapper: FC<{
  additionalStyles?: string
  children: ReactNode
}> = ({ additionalStyles, children }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="error-wrapper"
    >
      <div>{children}</div>
    </div>
  )
}
