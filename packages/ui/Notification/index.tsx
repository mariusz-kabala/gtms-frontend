import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { IoMdCloseCircle } from 'react-icons/io'
import { Picture } from '../Picture'
import { CircularProgressbar } from 'react-circular-progressbar'

export const Notification: FC<{
  additionalStyles?: string
  icon: { jpg: string; webp?: string }
  text: string
  left: number
  onClick?: () => unknown
}> = ({ additionalStyles, icon, text, left, onClick }) => {
  return (
    <li
      data-testid={'notification-single'}
      className={cx(styles.wrapper, additionalStyles)}
    >
      <Picture additionalStyles={styles.notificationIcon} {...icon} />
      <p className={styles.desc}>{text}</p>
      <div className={styles.close}>
        <i onClick={onClick} className={styles.iconClose}>
          <IoMdCloseCircle />
        </i>
        <CircularProgressbar
          className={styles.CircularProgressbar}
          value={left}
        />
      </div>
    </li>
  )
}
