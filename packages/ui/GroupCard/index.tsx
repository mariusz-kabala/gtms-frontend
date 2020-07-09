import React, { FC } from 'react'
import cx from 'classnames'
import { ImageWithLightbox } from '../ImageWithLightbox'
import { Tag } from '../Tag'
import { TagGroup } from '../TagGroup'
import { Spinner } from '../Spinner'
import { UserAvatar } from '../UserAvatar'
import { useTranslation } from '@gtms/commons/i18n'
import { Link } from '@gtms/commons/i18n'
import { IUser } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { IImage } from '@gtms/commons/types/image'
import styles from './styles.scss'

export const GroupCard: FC<{
  name: string
  description?: string
  slug: string
  tags: string[]
  logo: IImage
  noUserAvatar: { [key: string]: IImage }
  isLoading: boolean
  members: IUser[]
  additionalStyles?: string
}> = ({
  additionalStyles,
  name,
  description,
  tags,
  logo,
  slug,
  isLoading,
  members,
  noUserAvatar,
}) => {
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
            <ImageWithLightbox additionalStyles={styles.image} src={logo} />
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
            {isLoading && (
              <p className={styles.spinner}>
                <Spinner />
              </p>
            )}
            {!isLoading && members.length > 0 && (
              <ul
                className={cx(styles.users, additionalStyles)}
                data-testid="recently-registered-users"
              >
                {members.map((member) => (
                  <li className={styles.user} key={`member-${member.id}`}>
                    <UserAvatar
                      image={getImage('50x50', member.avatar, noUserAvatar)}
                      additionalStyles={styles.userAvatar}
                    />
                    <span />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
