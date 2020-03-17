import React, { FC } from 'react'
import styles from './styles.scss'

export const UserCard: FC<{
  image: string
}> = ({ image }) => {
  {
    /* @this component is just a mock */
  }

  return (
    <div className={styles.wrapper} data-testid="user-card">
      <img className={styles.avatar} src={image} alt="user avatar" />
      <div className={styles.desc}>
        <h2 className={styles.nameSurname}>Johnny Silverhand</h2>
        <p className={styles.desc}>
          Id in veniam sunt labore. Adipisicing proident dolor nulla cillum
          cupidatat. Do sint labore cupidatat.
        </p>
      </div>
    </div>
  )
}
