import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const UserAvatar: FC<{
  additionalStyles?: string
  image: string
  onClick?: () => unknown
  responsive: boolean
}> = ({ additionalStyles, image, onClick, responsive = false }) => (
  <div
    data-testid="user-avatar"
    onClick={onClick}
    className={cx(styles.container, additionalStyles, {
      [styles.responsive]: responsive,
    })}
  >
    <img
      data-testid="user-avatar-image"
      className={styles.avatar}
      src={image}
      alt="user avatar"
    />
  </div>
)
