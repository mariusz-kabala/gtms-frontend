import React, { FC, ReactNode } from 'react'
import cx from 'classnames'
import styles from './styles.scss'
import { Picture } from '@gtms/ui/Picture'

export const ErrorWrapper: FC<{
  additionalStyles?: string
  children: ReactNode
}> = ({ additionalStyles, children }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="error-wrapper"
    >
      <div>
        <Picture jpg={'/images/white-theme/oops-robot.png'} />
        {children}
      </div>
    </div>
  )
}
