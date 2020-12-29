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
    { jpg: '/images/festival-logos/festivallogo1.png' },
    { jpg: '/images/festival-logos/festivallogo2.png' },
    { jpg: '/images/festival-logos/festivallogo3.png' },
    { jpg: '/images/festival-logos/festivallogo4.png' },
    { jpg: '/images/festival-logos/festivallogo5.png' },
    { jpg: '/images/festival-logos/festivallogo6.png' },
    { jpg: '/images/festival-logos/festivallogo7.png' },
    { jpg: '/images/festival-logos/festivallogo8.png' },
    { jpg: '/images/festival-logos/festivallogo9.png' },
    { jpg: '/images/festival-logos/festivallogo10.png' },
    { jpg: '/images/festival-logos/festivallogo11.png' },
    { jpg: '/images/festival-logos/festivallogo12.png' },
    { jpg: '/images/festival-logos/festivallogo13.png' },
    { jpg: '/images/festival-logos/festivallogo14.png' },
    { jpg: '/images/festival-logos/festivallogo15.png' },
    { jpg: '/images/festival-logos/festivallogo16.png' },
    { jpg: '/images/festival-logos/festivallogo17.png' },
    { jpg: '/images/festival-logos/festivallogo18.png' },
    { jpg: '/images/festival-logos/festivallogo19.png' },
    { jpg: '/images/festival-logos/festivallogo20.png' },
    { jpg: '/images/festival-logos/festivallogo21.png' },
    { jpg: '/images/festival-logos/festivallogo22.png' },
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
