import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Picture } from '../Picture'

export const UserAvatar: FC<{
  additionalStyles?: string
  alt?: string
  image: {
    jpg: string
    webp?: string
  }
  onClick?: () => unknown
}> = ({ additionalStyles, alt, image, onClick }) => (
  <div
    data-testid="user-avatar"
    onClick={onClick}
    className={cx(styles.wrapper, additionalStyles)}
  >
    <Picture alt={alt} {...image} />
  </div>
)
