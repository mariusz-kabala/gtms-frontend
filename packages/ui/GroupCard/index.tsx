import React, { FC } from 'react'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { Link } from '@gtms/commons/i18n'
import { IUser } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { IImage } from '@gtms/commons/types/image'
// ui
import styles from './styles.scss'
import { Picture } from '../Picture'
import { Tag } from '../Tag'
import { Button } from '@gtms/ui/Button'
import { Spinner } from '../Spinner'
import { UserAvatar } from '../UserAvatar'
import { IoIosArrowDropright, IoIosArrowDown } from 'react-icons/io'

export const GroupCard: FC<{
  name: string
  description?: string
  slug: string
  tags: string[]
  logo: IImage
  noUserAvatar: { [key: string]: IImage }
  isActive: boolean
  isLoading: () => unknown
  onClose: boolean
  members: IUser[]
  additionalStyles?: string
}> = ({
  additionalStyles,
  name,
  description,
  tags,
  logo,
  slug,
  isActive,
  isLoading,
  onClose,
  members,
  noUserAvatar,
}) => {
  const { t } = useTranslation('groupCardComponent')

  return (
    <div
      className={cx(styles.wrapper, additionalStyles, {
        [styles.active]: isActive,
      })}
      data-testid="group-card"
    >
      <>
        <div className={styles.content}>
          <div className={styles.partOne}>
            <Picture additionalStyles={styles.avatar} {...logo} />
            <div className={styles.nameDesc}>
              <div className={styles.desc}>
                <h2 className={styles.header}>{name}</h2>
                {description && <p className={styles.desc}>{description}</p>}
              </div>
            </div>
            <div className={cx(styles.users)}>
              <h3 className={styles.header}>{t('groupsMembers')}</h3>

              {isLoading && <Spinner additionalStyles={styles.spinner} />}

              {!isLoading && members.length > 0 && (
                <ul data-testid="recently-registered-users">
                  {members.map((member) => (
                    <>
                      <li className={styles.user} key={`member-${member.id}`}>
                        <UserAvatar
                          image={getImage('50x50', member.avatar, noUserAvatar)}
                          additionalStyles={styles.userAvatar}
                        />
                      </li>
                    </>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={styles.partTwo}>
            <div className={styles.tags}>
              <h3 className={styles.header}>{t('groupTags')}:</h3>
              {Array.isArray(tags) && tags.length > 0 ? (
                tags.map((tag) => <Tag key={`tag-${tag}`} label={tag} />)
              ) : (
                <p>{t('tags-not-added-yet')}</p>
              )}
            </div>
          </div>
        </div>
        <Link href={`/group/${slug}`}>
          <Button additionalStyles={styles.btn}>
            <i>
              <IoIosArrowDropright />
            </i>
            Open this group
          </Button>
        </Link>
        <Button onClick={onClose} additionalStyles={styles.btn}>
          <i>
            <IoIosArrowDown />
          </i>
          close it
        </Button>
      </>
    </div>
  )
}
