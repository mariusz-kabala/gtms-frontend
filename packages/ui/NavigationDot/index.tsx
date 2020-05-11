import React, { FC, useState, useEffect } from 'react'
import styles from './styles.scss'
import { Link } from '@gtms/commons/i18n'
import { IGroup, FileStatus } from '@gtms/commons'
import { loadMyGroups, myGroupsQuery } from '@gtms/state-user'

export const NavigationDot: FC = () => {
  const [groups, setGroups] = useState<IGroup[]>(myGroupsQuery.favGroups())
  useEffect(() => {
    if (!myGroupsQuery.isLoaded()) {
      loadMyGroups()
    }

    const groupSub = myGroupsQuery.favGroups$.subscribe((value) =>
      setGroups(value)
    )
    return () => {
      groupSub.unsubscribe()
    }
  }, [])

  if (groups.length === 0) {
    return null
  }

  return (
    <ul className={styles.navigationDot} data-testid="navigationDot">
      {groups.map((value) => (
        <li key={value.id}>
          <Link href={`/group/${value.slug}`}>
            <div
              className={styles.circle}
              style={{
                backgroundImage: `url(${
                  value.avatar &&
                  value.avatar.status === FileStatus.ready &&
                  value.avatar.files['200x200']
                    ? value.avatar?.files['200x200'].jpg
                    : 'http://via.placeholder.com/50x50'
                })`,
              }}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
