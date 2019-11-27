import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Button: FC<{
  additionalStyles?: string
  children: ReactNode
  disabled?: boolean
  onClick?: () => unknown
  type?: JSX.IntrinsicElements['button']['type']
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
