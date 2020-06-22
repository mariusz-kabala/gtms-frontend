import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const NavigationTabs: FC<{
  additionalStyles?: string
  children: ReactNode
}> = ({
  additionalStyles,
  children
}) => {
  return (
    <div className={cx(styles.wrapper, additionalStyles)}>
      {children}
    </div>
  )
}
