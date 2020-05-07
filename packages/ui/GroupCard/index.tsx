import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { ImageWithLightbox } from '@gtms/ui/ImageWithLightbox'
import { Tag } from '@gtms/ui/Tag'
import { TagGroup } from '@gtms/ui/TagGroup'
import { useTranslation } from '@gtms/commons/i18n'
import { UserAvatar } from '../UserAvatar'

export const GroupCard: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const { t } = useTranslation('groupCardComponent')

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="group-card"
    >
      <div className={styles.content}>
        <div className={styles.left}>
          <ImageWithLightbox
            additionalStyles={styles.image}
            alt="user avatar"
            src={'/images/temp_images/logo-patrol-2.png'}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.desc}>
            <h2 className={styles.nameSurname}>Johnny Silverhand</h2>
            <p className={styles.desc}>
              Id in veniam sunt labore. Adipisicing proident dolor nulla
              cillum cupidatat. Do sint labore cupidatat.
            </p>
            <h3>{t('myTags')}</h3>
            <TagGroup additionalStyles={styles.userTags}>
              <Tag label="Mechanik" />
              <Tag label="Oddam" />
              <Tag label="SerwisRowerowy" />
              <Tag label="Impreza" />
              <Tag label="DzienKobiet" />
              <Tag label="Znaleziono" />
              <Tag label="Polityka" />
            </TagGroup>
            <h3>{t('groupsMember')}</h3>
            <ul
              className={cx(styles.users, additionalStyles)}
              data-testid="recently-registered-users"
            >
              <li className={styles.user}>
                <UserAvatar
                  image="/images/avatars/avatar-1.png"
                  additionalStyles={styles.userAvatar}
                />
                <span>Tim Cook</span>
              </li>
              <li className={styles.user}>
                <UserAvatar
                  image="/images/avatars/avatar-2.png"
                  additionalStyles={styles.userAvatar}
                />
                <span>Larry Ellison</span>
              </li>
              <li className={styles.user}>
                <UserAvatar
                  image="/images/avatars/avatar-3.png"
                  additionalStyles={styles.userAvatar}
                />
                <span>Sundar Pichai</span>
              </li>
              <li className={styles.user}>
                <UserAvatar
                  image="/images/avatars/avatar-4.png"
                  additionalStyles={styles.userAvatar}
                />
                <span>Johnatan Ive</span>
              </li>
              <li className={styles.user}>
                <UserAvatar
                  image="/images/avatars/avatar-5.png"
                  additionalStyles={styles.userAvatar}
                />
                <span>Bill Atkinson</span>
              </li>
              <li className={styles.user}>
                <UserAvatar
                  image="/images/avatars/avatar-6.png"
                  additionalStyles={styles.userAvatar}
                />
                <span>Bill Fernandez</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
