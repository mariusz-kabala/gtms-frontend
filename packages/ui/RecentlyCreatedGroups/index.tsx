import React, { FC, useState } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { GroupCard } from '@gtms/ui/GroupCard'
import { Modal } from '@gtms/ui/Modal'
import { UserCardMini } from '@gtms/ui/UserCardMini'
import { IGroup } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'

export const RecentlyCreatedGroups: FC<{
  groups: IGroup[]
  additionalStyles?: string
}> = ({ additionalStyles, groups }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentGroup, setCurrentGroup] = useState<IGroup | null>(null)
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="recently-created-groups"
    >
      {isModalOpen && (
        <Modal
          additionalStyles={styles.modalContent}
          onClose={() => setIsModalOpen(false)}
        >
          {currentGroup && (
            <GroupCard
              name={currentGroup.name}
              description={currentGroup.description}
              tags={currentGroup.tags || []}
              slug={currentGroup.slug}
              avatar={
                currentGroup.avatar &&
                currentGroup.avatar.status === FileStatus.ready &&
                currentGroup.avatar.files['200x200']
                  ? currentGroup.avatar?.files['200x200']
                  : { jpg: '//via.placeholder.com/200x200' }
              }
            />
          )}
        </Modal>
      )}
      {groups.map((group) => (
        <UserCardMini
          onClick={() => {
            setCurrentGroup(group)
            setIsModalOpen(true)
          }}
          key={`recent-group-${group.id}`}
          name={group.name}
          desc={group.description}
          image={
            group.avatar &&
            group.avatar.status === FileStatus.ready &&
            group.avatar.files['200x200']
              ? group.avatar?.files['200x200']
              : { jpg: '//via.placeholder.com/200x200' }
          }
        />
      ))}
    </div>
  )
}
