import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'

export const ExpandingItem: FC<{
  children: ReactNode
  label: ReactNode
  isActive: boolean
}> = ({ children, isActive, label }) => {
  return (
    <div data-testid="expanding-item" className={styles.wrapper}>
      {isActive && (
        <div data-testid="expanding-item-content" className={styles.content}>
          {children}
        </div>
      )}
      {!isActive && (
        <span data-testid="expanding-item-label" className={styles.label}>
          {label}
        </span>
      )}
    </div>
  )
}
