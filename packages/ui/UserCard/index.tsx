import React, { FC } from 'react'
import cx from 'classnames'
import { IImage } from '@gtms/commons/types/image'
import { Picture } from '../Picture'
import styles from './styles.scss'

export const UserCard: FC<{
  additionalStyles?: string
  alt?: string
  // @todo remove any
  image: any
  // image: IImage
  onClick?: () => void
  size?: string
}> = ({ additionalStyles, alt, image, onClick }) => (
  <div
    className={cx(styles.wrapper, additionalStyles)}
    data-testid="user-avatar"
    onClick={onClick}
  >
    <img src={image} />
    {/* <Picture alt={alt} {...image} /> */}
  </div>
)
