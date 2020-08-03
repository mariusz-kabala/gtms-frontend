import React, { FC } from 'react'
import { IGroup } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { GroupAvatarNoImage, UserAvatarNoImage } from 'enums'
// ui
import { GroupCard } from '@gtms/ui/GroupCard'
import { MockData } from '@gtms/ui/MockData'
import { Spinner } from '@gtms/ui/Spinner'
import styles from './styles.scss'

export const GroupsList: FC<{ records: IGroup[]; isLoading: boolean }> = ({
  records,
  isLoading,
}) => {
  return (
    <div className={styles.wrapper} data-testid="groups-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        records.length > 0 &&
        records.map((group) => (
          // something else should be used here to display a group
          <GroupCard
            key={`group-${group.id}`}
            isLoading={false}
            members={[]}
            name={group.name}
            description={group.description}
            tags={group.tags || []}
            slug={group.slug}
            noUserAvatar={UserAvatarNoImage}
            logo={getImage('200x200', group.avatar, GroupAvatarNoImage)}
          />
        ))}
      {!isLoading && records.length === 0 && (
        <MockData
          additionalStyles={styles.noRecords}
          theme="dark"
          numberOfElements={4}
        />
      )}
    </div>
  )
}
