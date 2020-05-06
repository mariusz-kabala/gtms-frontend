import React, { FC, ReactNode } from 'react'

export const ErrorInfo: FC<{
  additionalStyles?: string
  children: ReactNode
  onClick?: () => unknown
}> = ({ additionalStyles, children, onClick }) => {
  return (
    <p className={additionalStyles} data-testid="error-info" onClick={onClick}>
      {children}
    </p>
  )
}
