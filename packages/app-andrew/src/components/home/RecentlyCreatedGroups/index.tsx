import React, { FC, useState } from 'react'
import cx from 'classnames'
import { IGroup, IUser } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { fetchGroupMembers } from '@gtms/api-group'
import { GroupAvatarNoImage, UserAvatarNoImage } from 'enums'
// ui
import { GroupCard } from '@gtms/ui/GroupCard'
import { GridCard } from '@gtms/ui/GridCard'
import { Modal } from '@gtms/ui/Modal'
import { CreateYourOwnGroup } from '@gtms/ui/CreateYourOwnGroup'
// styles
import styles from './styles.scss'

export const RecentlyCreatedGroups: FC<{
  groups: IGroup[]
  additionalStyles?: string
  createYourOwnGroup?: boolean
}> = ({ additionalStyles, groups, createYourOwnGroup = false }) => {
  const [groupCard, setGroupCard] = useState<{
    current?: IGroup
    isLoading: boolean
    isOpen: boolean
    users: IUser[]
  }>({
    isLoading: false,
    isOpen: false,
    users: [],
  })

  const groupsToRender: Array<IGroup | null> =
    createYourOwnGroup && groups.length > 0 ? [...groups] : groups

  if (createYourOwnGroup && groups.length) {
    groupsToRender.splice(groups.length / 2, 0, null)
  }

  const images = [
    { jpg: '/images/temp-images/group_bg_4.png' },
    { jpg: '/images/temp-images/logo-wioska-2.png' },
    { jpg: '/images/temp-images/logo-wioska-3.png' },
    { jpg: '/images/temp-images/logo-wioska-4.png' },
    { jpg: '/images/temp-images/logo-wioska-5.png' },
    { jpg: '/images/temp-images/logo-wioska-6.png' },
    { jpg: '/images/temp-images/group_bg.png' },
    { jpg: '/images/temp-images/group_bg_2.png' },
    { jpg: '/images/temp-images/group_bg_3.png' },
    { jpg: '/images/temp-images/logo-wioska-1.png' },
    { jpg: '/images/temp-images/group_bg_5.png' },
    { jpg: '/images/temp-images/group_bg_4.png' },
    { jpg: '/images/temp-images/logo-wioska-2.png' },
    { jpg: '/images/temp-images/logo-wioska-3.png' },
    { jpg: '/images/temp-images/logo-wioska-4.png' },
    { jpg: '/images/temp-images/logo-wioska-5.png' },
    { jpg: '/images/temp-images/logo-wioska-6.png' },
    { jpg: '/images/temp-images/group_bg.png' },
    { jpg: '/images/temp-images/group_bg_2.png' },
    { jpg: '/images/temp-images/group_bg_3.png' },
    { jpg: '/images/temp-images/logo-wioska-1.png' },
    { jpg: '/images/temp-images/group_bg_5.png' },
  ]

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="recently-created-groups"
    >
      {groupCard.current && groupCard.isOpen && (
        <Modal
          onClose={() =>
            setGroupCard({
              isLoading: false,
              isOpen: false,
              users: [],
              current: undefined,
            })
          }
        >
          <GroupCard
            description={groupCard.current.description}
            isLoading={groupCard.isLoading}
            logo={getImage(
              '200x200',
              groupCard.current.avatar,
              GroupAvatarNoImage
            )}
            members={groupCard.users}
            name={groupCard.current.name}
            noUserAvatar={UserAvatarNoImage}
            slug={groupCard.current.slug}
            tags={groupCard.current.tags || []}
          />
        </Modal>
      )}
      {groupsToRender && groupsToRender.length > 0 && (
        <ul className={styles.items}>
          {groupsToRender.map((group, index) => {
            if (group === null) {
              return (
                <li key="createYourOwnGroupButton">
                  <CreateYourOwnGroup />
                </li>
              )
            }
            return (
              <li key={`recent-group-${group.id}`}>
                <GridCard
                  additionalStyles={styles.gridCard}
                  desc={group.description}
                  image={images[index]}
                  // image={getImage('200x200'}, group.avatar, GroupAvatarNoImage)}
                  name={group.name}
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
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
