import React, { FC, ReactNode, forwardRef, Ref } from 'react'

export const Button: FC<{
  additionalStyles?: string
  children: ReactNode
  testid?: string
  disabled?: boolean
  onClick?: (x: any) => unknown
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
