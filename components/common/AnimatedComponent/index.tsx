import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const AnimatedComponent: FC<{
  additionalStyles?: string
  children: ReactNode
  infinite?: boolean
  onClick?: () => unknown
}> = ({ additionalStyles, infinite, children }) => (
  <div className={styles.animated}>
    <div
      className={cx(styles.content, additionalStyles, {
        [styles.infinite]: infinite,
      })}
    >
      {children}
    </div>
  </div>
)
