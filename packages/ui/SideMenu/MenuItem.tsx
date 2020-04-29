import React, { ReactNode, FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export interface MenuItemProps {
  CollapsedContent: ReactNode
  ExpandedContent: ReactNode
  isExpanded?: boolean
  additionalStyles?: string
}

export const MenuItem: FC<MenuItemProps> = ({
  CollapsedContent,
  ExpandedContent,
  additionalStyles,
}) => {
  return (
    <div className={cx(styles.sideMenuItem, additionalStyles)}>
      <div className={styles.icon}>{CollapsedContent}</div>
      <div className={styles.link}>{ExpandedContent}</div>
    </div>
  )
}
