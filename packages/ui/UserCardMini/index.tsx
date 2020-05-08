import React, { FC } from 'react'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'

export const UserCardMini: FC<{
  image: string
  name: string
  desc: string
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
        alt="user avatar"
        className={styles.image}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={styles.desc}>
        <h2 className={styles.nameSurname}>{name}</h2>
        <span className={styles.members}>{t('members')}: 201</span>
        <div className={styles.desc}>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  )
}
