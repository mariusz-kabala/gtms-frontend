import React, { FC, useState } from 'react'
import cx from 'classnames'
import { IGroup, IUser } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { fetchGroupMembers } from '@gtms/api-group'
import { GroupAvatarNoImage, UserAvatarNoImage } from 'enums'
// ui
import { GroupCard } from '@gtms/ui/GroupCard'
import { Modal } from '@gtms/ui/Modal'
import { GridCard } from '@gtms/ui/GridCard'
import styles from './styles.scss'

export const RecentlyCreatedGroups: FC<{
  groups: IGroup[]
  additionalStyles?: string
}> = ({ additionalStyles, groups }) => {
  const [modalState, setModalState] = useState<{
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
      {modalState.isOpen && (
        <Modal
          additionalStyles={styles.modalContent}
          onClose={() =>
            setModalState({
              ...modalState,
              isOpen: false,
            })
          }
        >
          {modalState.current && (
            <GroupCard
              isLoading={modalState.isLoading}
              members={modalState.users}
              name={modalState.current.name}
              description={modalState.current.description}
              tags={modalState.current.tags || []}
              slug={modalState.current.slug}
              noUserAvatar={UserAvatarNoImage}
              logo={getImage(
                '200x200',
                modalState.current.avatar,
                GroupAvatarNoImage
              )}
            />
          )}
        </Modal>
      )}
      {groups.map((group) => (
        <GridCard
          onClick={async () => {
            setModalState({
              isLoading: true,
              isOpen: true,
              users: [],
              current: group,
            })

            const { docs } = await fetchGroupMembers(group.slug, 0, 6)

            setModalState({
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
