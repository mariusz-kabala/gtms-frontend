import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'

export const ExpandingItem: FC<{
  children: ReactNode
  label: ReactNode
  isActive: boolean
}> = ({ children, isActive, label }) => {
  return (
    <div data-testid="expandingItem" className={styles.wrapper}>
      {isActive && (
        <div data-testid="expandingItemContent" className={styles.content}>
          {children}
        </div>
      )}
      {!isActive && (
        <div data-testid="expandingItemLabel" className={styles.label}>
          {label}
        </div>
      )}
    </div>
  )
}
