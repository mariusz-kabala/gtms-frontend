import React, { FC, ReactNode } from 'react'
import cx from 'classnames'
import { Picture } from '@gtms/ui/Picture'
import styles from './styles.scss'

export const ErrorWrapper: FC<{
  additionalStyles?: string
  children: ReactNode
  buttons?: ReactNode
}> = ({ additionalStyles, buttons, children }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="error-wrapper"
    >
      <div className={styles.content}>
        <Picture jpg={'/images/white-theme/oops-robot.png'} />
        <div>{children}</div>
      </div>
      {buttons}
    </div>
  )
}
