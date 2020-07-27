import React, { FC } from 'react'
import { IImage } from '@gtms/commons/types/image'
import cx from 'classnames'
import { IoMdCloseCircle } from 'react-icons/io'
import { Picture } from '../Picture'
import { CircularProgressbar } from 'react-circular-progressbar'
import styles from './styles.scss'

export const Notification: FC<{
  additionalStyles?: string
  icon: IImage
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
          className={styles.circularProgressbar}
          value={left}
        />
      </div>
    </li>
  )
}
