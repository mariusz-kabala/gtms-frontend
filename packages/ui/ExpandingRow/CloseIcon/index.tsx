import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { IoMdCloseCircle } from 'react-icons/io'

export const CloseIcon: FC<{
  additionalStyles?: string
  onClick: () => unknown
}> = ({ additionalStyles, onClick }) => {
  return (
    <i
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="close-icon"
    >
      <IoMdCloseCircle onClick={onClick} />
    </i>
  )
}
