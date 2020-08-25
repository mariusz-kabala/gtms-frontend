import React, { FC, useState, useEffect } from 'react'
import { Link } from '@gtms/commons/i18n'
import { IGroup } from '@gtms/commons/models'
import { myGroupsQuery, userQuery } from '@gtms/state-user'
// ui
import { IoIosHeart } from 'react-icons/io'
import styles from './styles.scss'

export const SettingsButton: FC<{ group: IGroup }> = ({ group }) => {
  const [status, setStatus] = useState<{
    isGroupAdmin: boolean
    isGroupOwner: boolean
    isGroupMember: boolean
    canJoinGroup: boolean
    errorOccurred: boolean
    isLoading: boolean
  }>({
    ...myGroupsQuery.status(),
    ...myGroupsQuery.groupStatus(group.id),
  })
  useEffect(() => {
    if (!userQuery.isLogged()) {
      return
    }

    const sub = myGroupsQuery.groupStatus$(group.id).subscribe((value) =>
      setStatus({
        ...status,
        ...value,
      })
    )
    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (!status.isGroupAdmin && !status.isGroupOwner) {
    return null
  }

  return (
    <Link href={`/group/${group.slug}/settings`}>
      <button className={styles.btn}>
        <i>
          <IoIosHeart />
        </i>
        Group settings
      </button>
    </Link>
  )
}
