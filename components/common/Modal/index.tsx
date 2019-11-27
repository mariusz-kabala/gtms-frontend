import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import Overlay from 'components/common/Overlay'

export const Modal: FC<{
  additionalStyles?: string
  children: ReactNode
  onClick: () => unknown
}> = ({ children, additionalStyles, onClick }) => (
  <div className={cx(styles.modal, additionalStyles)}>
    <div className={styles.content}>{children}</div>
    <Overlay onClick={onClick} />
  </div>
)
