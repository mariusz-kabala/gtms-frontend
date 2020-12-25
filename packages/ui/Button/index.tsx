import React, { FC, ReactNode, forwardRef, Ref } from 'react'

export const Button: FC<{
  additionalStyles?: string
  children: ReactNode
  disabled?: boolean
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => unknown
  testid?: string
  type?: 'button' | 'submit' | 'reset'
}> = forwardRef(
  (
    { additionalStyles, children, disabled, onClick, testid, type = 'button' },
    ref: Ref<any>
  ) => {
    return (
      <button
        ref={ref}
        className={additionalStyles}
        data-testid={testid ?? 'action-button'}
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
