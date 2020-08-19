import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { IGroup } from '@gtms/commons'
import { getImage } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
import { Picture } from '@gtms/ui/Picture'
import { TagGroup } from '@gtms/ui/TagGroup'
import { Tag } from '@gtms/ui/Tag'
import { GroupAvatarNoImage } from 'enums'

export const GroupsList: FC<{
  additionalStyles?: string
  groups: IGroup[]
  noRecords: ReactNode
  renderGroupMenu: (group: IGroup) => ReactNode | null
}> = ({ additionalStyles, groups, noRecords, renderGroupMenu }) => {
  return (
    <div className={cx(styles.wrapper, additionalStyles)}>
      {groups.length === 0 && noRecords}
      {groups.length > 0 && (
        <ul className={styles.items}>
          {groups.map((group) => (
            <li className={styles.item} key={`owner-${group.id}`}>
              <div className={styles.avatar}>
                <Link href={`/group/${group.slug}`}>
                  <a>
                    <Picture
                      {...getImage('50x50', group.avatar, GroupAvatarNoImage)}
                    />
                  </a>
                </Link>
              </div>
              <div className={styles.headerAndDesc}>
                <h2 className={styles.header}>{group.name}</h2>
                <p className={styles.desc}>{group.description || 'no description'}</p>
                {group.tags && group.tags.length > 0 && (
                  <TagGroup>
                    {group.tags.map((tag) => (
                      <Tag key={`tag-${tag}`} label={tag} />
                    ))}
                  </TagGroup>
                )}
              </div>
              <div className={styles.stats}>
                <ul className={styles.items}>
                  <li>
                    Members: <span>{group.membersCounter}</span>
                  </li>
                  <li>
                    Posts: <span>{group.postsCounter}</span>
                  </li>
                </ul>
              </div>
              <div className={styles.actions}>{renderGroupMenu(group)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
