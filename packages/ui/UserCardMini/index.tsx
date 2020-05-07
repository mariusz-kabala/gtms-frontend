import React, { FC } from 'react'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'

export const UserCardMini: FC<{
  image: string
  name: string
  onClick?: () => unknown
}> = ({ image, name, onClick }) => {
  const { t } = useTranslation('userCardMiniComponent')

  return (
    <div
      className={styles.wrapper}
      data-testid="user-card-mini"
      onClick={onClick}
    >
      <img className={styles.avatar} src={image} alt="user avatar" />
      <div className={styles.desc}>
        <h2 className={styles.nameSurname}>{name}</h2>
        <span className={styles.members}>205 członków</span>
        <div className={styles.desc}>
          <p>{t('subheader')}</p>
        </div>
      </div>
    </div>
  )
}
