import React, { FC } from 'react'
import cx from 'classnames'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { IUser, IGroupAvatar } from '@gtms/commons/models'
import { IImage } from '@gtms/commons/types/image'
import { getImage } from '@gtms/commons/helpers'
// ui
import { Picture } from '../Picture'
import { Tag } from '../Tag'
import { UserAvatar } from '../UserAvatar'
// styles
import styles from './styles.scss'

export const GroupSingle: FC<{
  activeTags?: string[]
  avatar?: IGroupAvatar
  description?: string
  members?: IUser[]
  name: string
  noUserAvatar: { [key: string]: IImage }
  slug: string
  tags?: string[]
}> = ({
  activeTags = [],
  avatar,
  description,
  members,
  name,
  noUserAvatar,
  slug,
  tags = [],
}) => {
  const { t } = useTranslation('groupSingleComponent')

  return (
    <div data-testid="group-single" className={styles.wrapper}>
      <Link href={`/group/${slug}`}>
        <a className={styles.avatarNameDesc}>
          <Picture
            additionalStyles={styles.avatar}
            {...getImage('200x200', avatar, noUserAvatar)}
          />
          <div>
            {' '}
            {/* for aliging vertically */}
            <h2 className={styles.header}>{name}</h2>
            {description && <p className={styles.desc}>{description}</p>}
          </div>
        </a>
      </Link>
      {Array.isArray(members) && members.length > 0 && (
        <div className={cx(styles.users)}>
          <h3 className={styles.header}>{t('groupsMembers')}</h3>
          <ul className={styles.items} data-testid="recently-registered-users">
            {members.map((member) => (
              <li className={styles.user} key={`member-${member.id}`}>
                <UserAvatar
                  image={getImage('50x50', member.avatar, noUserAvatar)}
                  additionalStyles={styles.userAvatar}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.tags}>
        {Array.isArray(tags) && tags.length > 0 ? (
          tags.map((tag) => (
            <Tag
              additionalStyles={cx(styles.tag, {
                [styles.activeTag]: activeTags.includes(tag),
              })}
              key={`tag-${tag}`}
              label={tag}
            />
          ))
        ) : (
          <p>{t('tags-not-added-yet')}</p>
        )}
      </div>
    </div>
  )
}
