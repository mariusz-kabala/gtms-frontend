import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const UserAvatar: FC<{
  additionalStyles?: string
  image: string
  onClick: () => unknown
  userName: string
}> = ({ additionalStyles, image, onClick, userName }) => (
  <div
    data-testid="user-avatar"
    onClick={onClick}
    className={cx(styles.container, additionalStyles)}
  >
    <img
      data-testid="user-avatar-image"
      className={styles.avatar}
      src={image}
      alt="user avatar"
    />
    <span data-testid="user-avatar-label" className={styles.nameSurname}>
      {userName}
    </span>
  </div>
)
