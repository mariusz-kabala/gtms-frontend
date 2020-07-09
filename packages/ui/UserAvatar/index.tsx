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
}> = ({ additionalStyles, alt, image, onClick }) => (
  <div
    data-testid="user-avatar"
    onClick={onClick}
    className={cx(styles.wrapper, additionalStyles)}
  >
    <Picture alt={alt} {...image} />
  </div>
)
