import React, { FC, useState } from 'react'
import cx from 'classnames'
import { IGroup, IUser } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { fetchGroupMembers } from '@gtms/api-group'
import { GroupAvatarNoImage, UserAvatarNoImage } from 'enums'
// ui
import { GroupCard } from '@gtms/ui/GroupCard'
import { GridCard } from '@gtms/ui/GridCard'
import styles from './styles.scss'

export const RecentlyCreatedGroups: FC<{
  groups: IGroup[]
  additionalStyles?: string
}> = ({ additionalStyles, groups }) => {
  const [groupCard, setGroupCard] = useState<{
    isOpen: boolean
    isLoading: boolean
    current?: IGroup
    users: IUser[]
  }>({
    isOpen: false,
    isLoading: false,
    users: [],
  })

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="recently-created-groups"
    >
      <div
        className={cx(styles.groupCardWrapper, {
          [styles.active]: groupCard.isOpen,
        })}
      >
        {groupCard.current && (
          <GroupCard
            isLoading={groupCard.isLoading}
            onClose={() =>
              setGroupCard({
                isLoading: false,
                isOpen: false,
                users: [],
                current: undefined,
              })
            }
            members={groupCard.users}
            name={groupCard.current.name}
            description={groupCard.current.description}
            tags={groupCard.current.tags || []}
            slug={groupCard.current.slug}
            noUserAvatar={UserAvatarNoImage}
            logo={getImage(
              '200x200',
              groupCard.current.avatar,
              GroupAvatarNoImage
            )}
          />
        )}
      </div>
      {groups.map((group) => (
        <GridCard
          onClick={async () => {
            setGroupCard({
              isLoading: true,
              isOpen: true,
              users: [],
              current: group,
            })

            const { docs } = await fetchGroupMembers(group.slug, 0, 6)

            setGroupCard({
              isLoading: false,
              isOpen: true,
              users: docs,
              current: group,
            })
          }}
          key={`recent-group-${group.id}`}
          name={group.name}
          desc={group.description}
          image={getImage('200x200', group.avatar, GroupAvatarNoImage)}
        />
      ))}
    </div>
  )
}
