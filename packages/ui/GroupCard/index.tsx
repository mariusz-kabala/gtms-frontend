import React, { FC } from 'react'
import cx from 'classnames'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { IUser } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { IImage } from '@gtms/commons/types/image'
// ui
import { IoIosArrowDropright } from 'react-icons/io'
import { Button } from '../Button'
import { Picture } from '../Picture'
import { Spinner } from '../Spinner'
import { Tag } from '../Tag'
import { UserAvatar } from '../UserAvatar'
// styles
import styles from './styles.scss'

export const GroupCard: FC<{
  additionalStyles?: string
  description?: string
  isLoading: boolean
  isLoadingMembers: boolean
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
  isLoadingMembers,
  logo,
  members,
  name,
  noUserAvatar,
  slug,
  tags,
}) => {
  const { t } = useTranslation('groupCardComponent')

  if (isLoading) {
    return <Spinner additionalStyles={styles.spinner} />
  }

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="group-card"
    >
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
          {!isLoading &&
            !isLoadingMembers &&
            Array.isArray(members) &&
            members &&
            members.length > 0 && (
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
          {isLoadingMembers && <Spinner />}
          {!isLoading &&
            !isLoadingMembers &&
            (!Array.isArray(members) || members.length === 0) && (
              <p>group has no members, join now!</p>
            )}
        </div>
        {!isLoading && Array.isArray(members) && members && members.length > 0 && (
          <div className={cx(styles.users)}>
            <h3 className={styles.headerSection}>{t('groupsMembers')}</h3>
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
          </div>
        )}
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
