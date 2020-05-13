import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'

export const ErrorInfo: FC<{
  additionalStyles?: string
  children: ReactNode
}> = ({ additionalStyles, children }) => {
  return (
    <div className={styles.wrapper} data-testid="error-info">
      <div>
        <p className={additionalStyles}>{children}</p>
      </div>
    </div>
  )
}
