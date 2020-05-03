import React, { ReactNode, FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export interface MenuItemProps {
  collapsedContent: ReactNode
  expandedContent: ReactNode
  additionalStyles?: string
}

export const MenuItem: FC<MenuItemProps> = ({
  collapsedContent,
  expandedContent,
  additionalStyles,
}) => {
  return (
    <div className={cx(styles.sideMenuItem, additionalStyles)}>
      <div className={styles.icon}>{collapsedContent}</div>
      <div className={styles.link}>{expandedContent}</div>
    </div>
  )
}
