import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { IoMdCloseCircle } from 'react-icons/io'
import { Picture } from '../../Picture'
import { CircularProgressbar } from 'react-circular-progressbar'

export const NotificationSingle: FC<{
  additionalStyles?: string
  icon: { jpg: string; webp?: string }
  text: string
}> = ({ additionalStyles, icon, text }) => {
  return (
    <li
      data-testid={'notification-single'}
      className={cx(styles.wrapper, additionalStyles)}
    >
      <Picture
        additionalStyles={styles.notificationIcon}
        jpg={icon.jpg}
        webp={icon.webp ?? icon.webp}
      />
      <p className={styles.desc}>{text}</p>
      <div className={styles.close}>
        <i className={styles.iconClose}>
          <IoMdCloseCircle />
        </i>
        <CircularProgressbar
          className={styles.CircularProgressbar}
          value={66}
        />
      </div>
    </li>
  )
}
