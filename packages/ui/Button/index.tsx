import React, { FC, ReactNode, forwardRef, Ref } from 'react'
import cx from 'classnames'
import styles from './styles.scss'

export const Button: FC<{
  additionalStyles?: string
  children: ReactNode
  disabled?: boolean
  onClick?: () => unknown
  type?: 'button' | 'submit' | 'reset'
}> = forwardRef(
  (
    { additionalStyles, children, disabled, onClick, type = 'button' },
    ref: Ref<any>
  ) => {
    return (
      <button
        ref={ref}
        className={cx(styles.button, additionalStyles)}
        data-testid={'action-button'}
        disabled={disabled}
        onClick={onClick}
        // @ts-ignore
        type={type}
      >
        {children}
      </button>
    )
  }
)
