import React, { FC, ReactNode } from 'react'
import cx from 'classnames'
// ui
import { Picture } from '@gtms/ui/Picture'
import styles from './styles.scss'

export const ErrorWrapper: FC<{
  additionalStyles?: string
  buttons?: ReactNode
  children: ReactNode
  withFullBg?: true
}> = ({ additionalStyles, buttons, children, withFullBg }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles, {
        [styles.withFullBg]: withFullBg,
      })}
      data-testid="error-wrapper"
    >
      <div className={styles.content}>
        <Picture jpg={'/images/theme-images/oops-robot.png'} />
        <div>{children}</div>
      </div>
      {buttons}
    </div>
  )
}
