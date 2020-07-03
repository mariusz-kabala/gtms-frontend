import React, { FC } from 'react'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'

export const UserCardMini: FC<{
  image: { jpg: string; webp?: string }
  name: string
  desc?: string
  onClick?: () => unknown
}> = ({ desc, name, image, onClick }) => {
  const { t } = useTranslation('userCardMiniComponent')

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
