import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
import { Link } from '@gtms/commons/i18n'
import { IGroup } from '@gtms/commons/models'
import { myGroupsQuery, userQuery } from '@gtms/state-user'
import { useRouter } from 'next/router'
// ui
import { GoSettings } from 'react-icons/go'
// styles
import styles from './styles.scss'

export const SettingsButton: FC<{
  additionalStyles?: string
  group: IGroup
}> = ({ additionalStyles, group }) => {
  const router = useRouter()
  const isActive = router.pathname === '/group/[slug]/settings'
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
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="settings-button"
    >
      <Link
        href={
          isActive ? `/group/${group.slug}` : `/group/${group.slug}/settings`
        }
      >
        <button
          className={cx(styles.btn, {
            [styles.active]: isActive,
          })}
        >
          <i>
            <GoSettings />
          </i>
          <span>Group settings</span>
        </button>
      </Link>
    </div>
  )
}
