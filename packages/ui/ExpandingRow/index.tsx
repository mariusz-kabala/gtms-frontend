import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const ExpandingRow: FC<{
  additionalStyles?: string
  children: ReactNode
}> = ({ additionalStyles, children }) => {
  return (
    <div
      data-testid="expanding-row"
      className={cx(styles.wrapper, additionalStyles)}
    >
      {children}
    </div>
  )
}
