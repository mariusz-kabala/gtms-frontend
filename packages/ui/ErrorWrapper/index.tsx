import React, { FC, ReactNode } from 'react'
import cx from 'classnames'
// ui
import { Overlay } from '@gtms/ui/Overlay'
import { Picture } from '@gtms/ui/Picture'
import styles from './styles.scss'

export const ErrorWrapper: FC<{
  additionalStyles?: string
  withBg?: true
  buttons?: ReactNode
  children: ReactNode
}> = ({ additionalStyles, buttons, children, withBg }) => {
  return (
    <>
      <div
        className={cx(styles.wrapper, additionalStyles, {
          [styles.withBg]: withBg,
        })}
        data-testid="error-wrapper"
      >
        <div className={styles.content}>
          <Picture jpg={'/images/theme-images/oops-robot.png'} />
          <div>{children}</div>
        </div>
        {buttons}
      </div>
      <Overlay />
    </>
  )
}
