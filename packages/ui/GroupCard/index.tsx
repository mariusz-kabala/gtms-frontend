import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { ImageWithLightbox } from '@gtms/ui/ImageWithLightbox'
import { Tag } from '@gtms/ui/Tag'
import { TagGroup } from '@gtms/ui/TagGroup'
import { useTranslation } from '@gtms/commons/i18n'
import { UserAvatar } from '../UserAvatar'
import { Link } from '@gtms/commons/i18n'

export const GroupCard: FC<{
  name: string
  description?: string
  slug: string
  tags: string[]
  avatar: {
    jpg: string
    webp?: string
  }
  additionalStyles?: string
}> = ({ additionalStyles, name, description, tags, avatar, slug }) => {
  const { t } = useTranslation('groupCardComponent')

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="group-card"
    >
      <div className={styles.content}>
        <div className={styles.left}>
          <Link href={`/group/${slug}`}>
            {/* THIS SHOULD BE A REGURAL IMAGE SO USER CAN CLICK AND OPEN GROUP PAGE */}
            <ImageWithLightbox additionalStyles={styles.image} src={avatar} />
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.desc}>
            <Link href={`/group/${slug}`}>
              <h2 className={styles.nameSurname}>{name}</h2>
            </Link>
            {description && (
              <Link href={`/group/${slug}`}>
                <p className={styles.desc}>{description}</p>
              </Link>
            )}
            <h3>{t('groupTags')}</h3>
            {Array.isArray(tags) && tags.length > 0 ? (
              <TagGroup additionalStyles={styles.userTags}>
                {tags.map((tag) => (
                  <Tag key={`tag-${tag}`} label={tag} />
                ))}
              </TagGroup>
            ) : (
              <p>{t('tags-not-added-yet')}</p>
            )}
            <h3>{t('groupsMembers')}</h3>
            <ul
              className={cx(styles.users, additionalStyles)}
              data-testid="recently-registered-users"
            >
              <li className={styles.user}>
                <UserAvatar
                  image={{ jpg: '/images/avatars/avatar-1.png' }}
                  additionalStyles={styles.userAvatar}
                />
                <span>Tim Cook</span>
              </li>
              <li className={styles.user}>
                <UserAvatar
                  image={{ jpg: '/images/avatars/avatar-2.png' }}
                  additionalStyles={styles.userAvatar}
                />
                <span>Larry Ellison</span>
              </li>
              <li className={styles.user}>
                <UserAvatar
                  image={{ jpg: '/images/avatars/avatar-3.png' }}
                  additionalStyles={styles.userAvatar}
                />
                <span>Sundar Pichai</span>
              </li>
              <li className={styles.user}>
                <UserAvatar
                  image={{ jpg: '/images/avatars/avatar-4.png' }}
                  additionalStyles={styles.userAvatar}
                />
                <span>Johnatan Ive</span>
              </li>
              <li className={styles.user}>
                <UserAvatar
                  image={{ jpg: '/images/avatars/avatar-5.png' }}
                  additionalStyles={styles.userAvatar}
                />
                <span>Bill Atkinson</span>
              </li>
              <li className={styles.user}>
                <UserAvatar
                  image={{ jpg: '/images/avatars/avatar-6.png' }}
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
