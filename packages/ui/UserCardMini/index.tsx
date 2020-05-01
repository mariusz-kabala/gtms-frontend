import React, { FC } from 'react'
import styles from './styles.scss'

export const UserCardMini: FC<{
  image: string
  onClick?: () => unknown
}> = ({ image, onClick }) => {
  return (
    <div
      className={styles.wrapper}
      data-testid="user-card-mini"
      onClick={onClick}
    >
      <img className={styles.avatar} src={image} alt="user avatar" />
      <div className={styles.desc}>
        <h2 className={styles.nameSurname}>Johnny Silverhand</h2>
        <span className={styles.members}>205 członków</span>
        <div className={styles.desc}>
          <p>
            Id in veniam sunt labore. Adipisicing proident dolor nulla cillum
            cupidatat. Do sint labore cupidatat.
          </p>
        </div>
      </div>
    </div>
  )
}
