import React, { FC, useState, useEffect } from 'react'
import { Link } from '@gtms/commons/i18n'
import { IGroup } from '@gtms/commons/models'
import styles from './styles.scss'
import { myGroupsQuery, userQuery } from '@gtms/state-user'

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
      sub.unsubscribe()
    }
  }, [])

  if (!status.isGroupAdmin && !status.isGroupOwner) {
    return null
  }

  return (
    <Link href={`/group/${group.slug}/settings`}>
      <button className={styles.btn}>Change group settings</button>
    </Link>
  )
}
