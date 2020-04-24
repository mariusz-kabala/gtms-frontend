import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const UserAvatar: FC<{
  additionalStyles?: string
  image: string
  onClick?: () => unknown
}> = ({ additionalStyles, image, onClick }) => (
  <div
    data-testid="user-avatar"
    onClick={onClick}
    className={cx(styles.wrapper, additionalStyles)}
  >
    <img data-testid="user-avatar-image" src={image} alt="user avatar" />
  </div>
)
