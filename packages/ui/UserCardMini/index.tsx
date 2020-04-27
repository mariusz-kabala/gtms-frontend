import React, { FC } from 'react'
import styles from './styles.scss'

export const UserCardMini: FC<{
  image: string
}> = ({ image }) => {
  return (
    <div className={styles.wrapper} data-testid="user-card-mini">
      <img className={styles.avatar} src={image} alt="user avatar" />
      <div className={styles.desc}>
        <h2 className={styles.nameSurname}>Johnny Silverhand</h2>
        <div className={styles.desc}>
          <p>
            Id in veniam sunt labore. Adipisicing proident dolor nulla cillum
            cupidatat. Do sint labore cupidatat.
          </p>
          <p>
            Id in veniam sunt labore. Adipisicing proident dolor nulla cillum
            cupidatat. Do sint labore cupidatat.
          </p>
        </div>
      </div>
    </div>
  )
}
