import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from '@gtms/commons/i18n'
import { IGroup } from '@gtms/commons/models'
import {
  myGroupsQuery,
  userQuery,
  joinGroup,
  leaveGroup,
} from '@gtms/state-user'
import { openLoginModal } from '../../../state'
import styles from './styles.scss'
import { Spinner } from '@gtms/ui/Spinner'

export const JoinLeaveButton: FC<{ group: IGroup }> = ({ group }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
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
  const { t } = useTranslation('groupPage')

  if (status.isLoading || isLoading) {
    return (
      <button className={styles.btn}>
        <Spinner />
      </button>
    )
  }

  if (status.errorOccurred || status.isGroupAdmin || status.isGroupOwner) {
    return null
  }

  return (
    <button
      className={styles.btn}
      onClick={() => {
        if (!userQuery.isLogged()) {
          return openLoginModal()
        }

        setIsLoading(true)

        const method = status.canJoinGroup ? joinGroup : leaveGroup

        method(group).finally(() => setIsLoading(false))
      }}
    >
      {status.canJoinGroup || !userQuery.isLogged()
        ? t('join-this-group')
        : t('leave-this-group')}
    </button>
  )
}
