import React, { FC } from 'react'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { IoIosPeople } from 'react-icons/io'

export const UserCardMini: FC<{
  image: string
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
        style={{ backgroundImage: `url(${image})` }}
      />
      <h2 className={styles.header}>{name}</h2>
      <span className={styles.members}>
        <IoIosPeople /> {t('members')}: 201
      </span>
      <div className={styles.desc}>
        <h2 className={styles.nameSurname}>{name}</h2>
        <span className={styles.members}>{t('members')}: 201</span>
        {desc && (
          <div className={styles.desc}>
            <p>{desc}</p>
          </div>
        )}
      </div>
    </div>
  )
}
