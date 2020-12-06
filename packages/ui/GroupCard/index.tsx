import React, { FC } from 'react'
import cx from 'classnames'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { IUser } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { IImage } from '@gtms/commons/types/image'
// ui
import { Picture } from '../Picture'
import { Tag } from '../Tag'
import { Button } from '../Button'
import { Spinner } from '../Spinner'
import { UserAvatar } from '../UserAvatar'
import { IoIosArrowDropright } from 'react-icons/io'
// styles
import styles from './styles.scss'

export const GroupCard: FC<{
  additionalStyles?: string
  description?: string
  isLoading: boolean
  logo: IImage
  members?: IUser[]
  name: string
  noUserAvatar: { [key: string]: IImage }
  slug: string
  tags: string[]
}> = ({
  additionalStyles,
  description,
  isLoading,
  logo,
  members,
  name,
  noUserAvatar,
  slug,
  tags,
}) => {
  const { t } = useTranslation('groupCardComponent')

  if (true) {
    return <Spinner additionalStyles={styles.spinner} />
  }

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="group-card"
    >
      <Picture additionalStyles={styles.avatar} {...logo} />
      <div className={styles.cover} />
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <h2 className={styles.header}>{name}</h2>
          {description && <p className={styles.desc}>{description}</p>}
          <div className={styles.tags}>
            {Array.isArray(tags) && tags.length > 0 ? (
              <>
                <h3 className={styles.headerSection}>{t('groupTags')}:</h3>
                {tags.map((tag) => (
                  <Tag
                    additionalStyles={styles.tag}
                    key={`tag-${tag}`}
                    label={tag}
                  />
                ))}
              </>
            ) : (
              <p>{t('tags-not-added-yet')}</p>
            )}
          </div>
        </div>
        <div className={cx(styles.users)}>
          <h3 className={styles.headerSection}>{t('groupsMembers')}</h3>
          {!isLoading && Array.isArray(members) && members.length > 0 && (
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
      <div className={styles.btnWrapper}>
        <Link href={`/group/${slug}`}>
          <Button additionalStyles={styles.btn}>
            <i>
              <IoIosArrowDropright />
            </i>
            Open this group
          </Button>
        </Link>
      </div>
    </div>
  )
}
