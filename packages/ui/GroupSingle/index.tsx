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
  name: string
  description?: string
  slug: string
  tags?: string[]
  activeTags?: string[]
  avatar?: IGroupAvatar
  noUserAvatar: { [key: string]: IImage }
  members?: IUser[]
}> = ({
  name,
  description,
  slug,
  tags = [],
  avatar,
  members,
  noUserAvatar,
  activeTags = [],
}) => {
  const { t } = useTranslation('groupSingleComponent')

  return (
    <div data-testid="group-single" className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.partOne}>
          <Link href={`/group/${slug}`}>
            <a>
              <Picture
                additionalStyles={styles.avatar}
                {...getImage('200x200', avatar, noUserAvatar)}
              />
            </a>
          </Link>
          <div className={styles.nameDesc}>
            <div className={styles.desc}>
              <Link href={`/group/${slug}`}>
                <h2 className={styles.header}>{name}</h2>
              </Link>
              {description && <p className={styles.desc}>{description}</p>}
            </div>
          </div>
          <div className={cx(styles.users)}>
            <h3 className={styles.header}>{t('groupsMembers')}</h3>

            {Array.isArray(members) && members.length > 0 && (
              <ul
                className={styles.items}
                data-testid="recently-registered-users"
              >
                {members.map((member) => (
                  <li className={styles.user} key={`member-${member.id}`}>
                    <UserAvatar
                      image={getImage('50x50', member.avatar, noUserAvatar)}
                      additionalStyles={styles.userAvatar}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.partTwo}>
          <div className={styles.tags}>
            {Array.isArray(tags) && tags.length > 0 ? (
              tags.map((tag) => (
                <Tag
                  additionalStyles={cx({
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
      </div>
    </div>
  )
}
