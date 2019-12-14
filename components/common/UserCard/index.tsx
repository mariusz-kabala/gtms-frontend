import React, { FC } from 'react'
import styles from './styles.scss'

export const UserCard: FC<{
  image: string
}> = ({ image }) => (
  <div className={styles.container}>
    {/* @todo add translations when needed */}
    <img className={styles.avatar} src={image} alt="user avatar" />
    <div className={styles.content}>
      <span className={styles.userName}>Johnny Silverhand</span>
      <p className={styles.desc}>
        Id in veniam sunt labore. Adipisicing proident dolor nulla cillum
        cupidatat. Do sint labore cupidatat commodo veniam tempor tempor
        exercitation commodo aute nostrud nostrud.
      </p>
    </div>
  </div>
)
