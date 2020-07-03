import React, { FC } from 'react'
import styles from './styles.scss'

export const UserCardMini: FC<{
  image: { jpg: string; webp?: string }
  name: string
  desc?: string
  onClick?: () => unknown
}> = ({ desc, name, image, onClick }) => {
  return (
    <div
      className={styles.wrapper}
      data-testid="user-card-mini"
      onClick={onClick}
    >
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image.jpg})` }}
      />
      <div className={styles.desc}>
        <h2 className={styles.header}>{name}</h2>
        {desc && <p>{desc}</p>}
      </div>
    </div>
  )
}
