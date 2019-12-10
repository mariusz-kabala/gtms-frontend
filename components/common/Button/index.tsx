import React, { FC, ReactNode } from 'react'
import cx from 'classnames'
import styles from './styles.scss'

export const Button: FC<{
  additionalStyles?: string
  children: ReactNode
  disabled?: boolean
  onClick?: () => unknown
  width?: string
  type?: 'button' | 'submit' | 'reset'
}> = ({ additionalStyles, children, disabled, onClick, type = 'button' }) => {
  return (
    <button
      className={cx(styles.button, additionalStyles)}
      data-testid={'action-button'}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
