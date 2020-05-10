import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Picture } from '../Picture'

export const UserAvatar: FC<{
  additionalStyles?: string
  image: {
    jpg: string
    webp?: string
  }
  onClick?: () => unknown
}> = ({ additionalStyles, image, onClick }) => (
  <div
    data-testid="user-avatar"
    onClick={onClick}
    className={cx(styles.wrapper, additionalStyles)}
  >
    <Picture {...image} />
  </div>
)
