import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const UserNameSurname: FC<{
  additionalStyles?: string
  children?: ReactNode
  onClick?: () => unknown
}> = ({ additionalStyles, children, onClick }) => (
  <span
    data-testid="user-name-surname"
    onClick={onClick}
    className={cx(styles.container, additionalStyles)}
  >
    {children}
  </span>
)
