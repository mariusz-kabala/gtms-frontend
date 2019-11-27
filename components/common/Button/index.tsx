import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Button: FC<{
  children: ReactNode
  additionalStyles?: string
  onClick: () => unknown
}> = ({ children, additionalStyles, onClick }) => {
  return (
    <button onClick={onClick} className={cx(styles.button, additionalStyles)}>
      {children}
    </button>
  )
}
