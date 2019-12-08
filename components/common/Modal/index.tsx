import React, { FC, ReactNode, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Overlay } from 'components/common/Overlay'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export const Modal: FC<{
  additionalStyles?: string
  children: ReactNode
  onClick: () => unknown
}> = ({ children, additionalStyles, onClick }) => {
  useEffect(() => {
    disableBodyScroll(document.body)

    return () => enableBodyScroll(document.body)
  }, [])

  return (
    <div className={cx(styles.modal, additionalStyles)}>
      <div className={styles.content}>{children}</div>
      <Overlay onClick={onClick} />
    </div>
  )
}
