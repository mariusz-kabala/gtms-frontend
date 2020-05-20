import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { IoMdCloseCircle } from 'react-icons/io'
import { Picture } from '../../Picture'
import { CircularProgressbar } from 'react-circular-progressbar'

export const NotificationSingle: FC<{
  additionalStyles?: string
  icon: { jpg: string; webp?: string }
  isActive: boolean
  onClose: () => unknown
  text: string
}> = ({ additionalStyles, icon, isActive, onClose, text }) => {
  return (
    <li
      data-testid={'notificationSingle'}
      className={cx(styles.wrapper, additionalStyles, {
        [styles.opened]: isActive,
      })}
    >
      <Picture additionalStyles={styles.notificationIcon} jpg={icon} />
      <div>
        <p className={styles.desc}>{text}</p>
      </div>
      <div className={styles.close}>
        <i className={styles.iconClose}>
          <IoMdCloseCircle onClick={() => onClose()} />
        </i>
        <CircularProgressbar
          className={styles.CircularProgressbar}
          value={66}
        />
      </div>
    </li>
  )
}
