import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { IGroup, FileStatus } from '@gtms/commons'
import { Link } from '@gtms/commons/i18n'
import { Picture } from '@gtms/ui/Picture'

export const GroupsList: FC<{
  additionalStyles?: string
  groups: IGroup[]
  noRecords: ReactNode
  onFavsClick: (group: IGroup) => unknown
  renderFavsIcon: (group: IGroup) => ReactNode
  renderGroupMenu: (group: IGroup) => ReactNode | null
}> = ({
  additionalStyles,
  groups,
  noRecords,
  renderFavsIcon,
  renderGroupMenu,
  onFavsClick,
}) => {
  return (
    <div className={cx(styles.wrapper, additionalStyles)}>
      {groups.length === 0 && noRecords}
      {groups.length > 0 && (
        <ul className={styles.list}>
          {groups.map((group) => (
            <li key={`owner-${group.id}`}>
              <i className={styles.likeIcon} onClick={() => onFavsClick(group)}>
                {renderFavsIcon(group)}
              </i>
              <Link href={`/group/${group.slug}`}>
                <a>
                  {group.avatar &&
                  group.avatar.status === FileStatus.ready &&
                  group.avatar.files['50x50'] ? (
                    <Picture {...group.avatar.files['200x200']} />
                  ) : (
                    <img src="http://via.placeholder.com/200x200" />
                  )}
                  <div className={styles.groupName}>
                    <h2>{group.name}</h2>
                  </div>
                </a>
              </Link>
              {renderGroupMenu(group)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
