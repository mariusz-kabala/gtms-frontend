import React, { FC } from 'react'
import cx from 'classnames'
import { IImage } from '@gtms/commons/types/image'
import { Picture } from '../Picture'
import styles from './styles.scss'

export const UserAvatar: FC<{
  additionalStyles?: string
  alt?: string
  image: IImage
  onClick?: () => unknown
  size?: string
}> = ({ additionalStyles, alt, image, onClick, size }) => (
  <div
    className={cx(styles.wrapper, additionalStyles, {
      [styles.md]: size === 'md',
    })}
    data-testid="user-avatar"
    onClick={onClick}
  >
    <Picture alt={alt} {...image} />
  </div>
)
