import React, { FC } from 'react'
import { Link } from '@gtms/commons/i18n'
import { getImage } from '@gtms/commons/helpers'
import { Picture } from '@gtms/ui/Picture'
import { GroupAvatarNoImage } from '@app/enums'
import { IGroup } from '@gtms/commons/models'
import { Spinner } from '@gtms/ui/Spinner'
import { NoRecords } from '../NoRecords'
import { TagGroup } from '@gtms/ui/TagGroup'
import { Tag } from '@gtms/ui/Tag'
import { FavsButton } from '@app/components/group/FavsButton'
import { FollowButton } from '@app/components/group/FollowButton'
import { SettingsButton } from '@app/components/group/SettingsButton'
import styles from './styles.scss'

export const GroupsList: FC<{
  groups: IGroup[]
  noRecordsText: string
  isLoading?: boolean
  showFavsButton?: boolean
}> = ({ groups, noRecordsText, isLoading = false, showFavsButton = true }) => {
  if (isLoading) {
    return <Spinner />
  }

  if (groups.length === 0) {
    return <NoRecords text={noRecordsText} />
  }

  return (
    <ul
      data-testid="navigation-dots-full-view-groups-member"
      className={styles.list}
    >
      {groups.map((group) => (
        <li key={`group-${group.id}`} className={styles.item}>
          <Link href={`/group/${group.slug}`}>
            <a>
              <Picture
                additionalStyles={styles.image}
                {...getImage('50x50', group.avatar, GroupAvatarNoImage)}
              />
              <div className={styles.desc}>
                <Link href={`/group/${group.slug}`}>
                  <h2>{group.name}</h2>
                </Link>
                <ul className={styles.details}>
                  <li>
                    Members: <span>{group.membersCounter}</span>
                  </li>
                  <li>
                    Posts: <span>{group.postsCounter}</span>
                  </li>
                </ul>
                <p>{group.description || 'No description'}</p>
                {group.tags && group.tags.length > 0 && (
                  <TagGroup additionalStyles={styles.tags}>
                    {group.tags.map((tag) => (
                      <Tag key={`tag-${tag}`} label={tag} />
                    ))}
                  </TagGroup>
                )}
                <div className={styles.actions}>
                  <FollowButton group={group} />
                  {showFavsButton && <FavsButton group={group} />}
                  <SettingsButton group={group} />
                </div>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
