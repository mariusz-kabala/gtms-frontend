import React, { FC, useCallback } from 'react'
import { IGroup } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
// ui
import { Picture } from '../../Picture'
// styles
import styles from './styles.scss'

export const GroupDetails: FC<{
  onGroupClick?: (group: IGroup) => unknown
  group: IGroup
}> = ({ onGroupClick, group }) => {
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (!onGroupClick) {
        return
      }

      e.preventDefault()
      e.stopPropagation()

      onGroupClick(group)
    },
    [onGroupClick, group]
  )

  return (
    <div data-testid="group-details" className={styles.wrapper}>
      <div className={styles.image}>
        <Link href={`/group/${group.slug}`}>
          <a onClick={onClick}>
            <Picture {...getImage('50x50', group.avatar)} alt={name} />
          </a>
        </Link>
      </div>
      <div className={styles.details}>
        <div className={styles.name}>
          <Link href={`/group/${group.slug}`}>
            <a onClick={onClick}>
              <span>{group.name}</span>
            </a>
          </Link>
          <div className={styles.stats}>
            <ul>
              <li>
                Posts: <span>{group.postsCounter}</span>
              </li>
              <li>
                Members: <span>{group.membersCounter}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
