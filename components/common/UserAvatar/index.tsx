import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const UserAvatar: FC<{
  additionalStyles?: string
  image: string
  onClick: () => unknown
  userName: string
}> = ({ additionalStyles, image, onClick, userName }) => (
  <div onClick={onClick} className={cx(styles.container, additionalStyles)}>
    <img className={styles.avatar} src={image} alt="user avatar" />
    <span className={styles.nameSurname}>{userName}</span>
  </div>
)
