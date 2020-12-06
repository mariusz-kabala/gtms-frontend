import React, { FC } from 'react'
import cx from 'classnames'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { IImage } from '@gtms/commons/types/image'
import { IUser } from '@gtms/commons/models'
import { getImage, getDisplayName } from '@gtms/commons/helpers'
// ui
import { Picture } from '../Picture'
import { Tag } from '../Tag'
// styles
import styles from './styles.scss'

export const UserSingle: FC<
  IUser & {
    noUserAvatar: { [key: string]: IImage }
    activeTags?: string[]
  }
> = ({
  activeTags = [],
  avatar,
  description,
  noUserAvatar,
  surname,
  tags,
  username,
}) => {
  const { t } = useTranslation('userSingleComponent')

  return (
    <div data-testid="user-single" className={styles.wrapper}>
      <div className={styles.avatarAndName}>
        <Link href={`/user/${username}`}>
          <a>
            <Picture
              additionalStyles={styles.avatar}
              {...getImage('50x50', avatar, noUserAvatar)}
            />
          </a>
        </Link>
        <div>
          <h2>{getDisplayName({ name, username, surname })}</h2>
          {description && <p>{description}</p>}
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
      </div>
    </div>
  )
}
