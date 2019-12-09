import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Button: FC<{
  additionalStyles?: string
  children: ReactNode
  disabled?: boolean
  onClick?: () => unknown
  size?: string
  width?: string
  type?: 'button' | 'submit' | 'reset'
}> = ({
  additionalStyles,
  children,
  disabled,
  onClick,
  size,
  type = 'button',
  width,
}) => {
  return (
    <button
      className={cx(styles.button, additionalStyles, {
        [styles.sizeSmall]: size === 'small',
        [styles.width100]: width === '100',
      })}
      data-testid={'action-button'}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
