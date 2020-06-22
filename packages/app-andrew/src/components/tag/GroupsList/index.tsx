import React, { FC } from 'react'
import { IGroup } from '@gtms/commons/models'
import { Spinner } from '@gtms/ui/Spinner'
import { GroupCard } from '@gtms/ui/GroupCard'
import { getImage } from '@gtms/commons/helpers'
import { GroupAvatarNoImage, UserAvatarNoImage } from 'enums'

export const GroupsList: FC<{ records: IGroup[]; isLoading: boolean }> = ({
  records,
  isLoading,
}) => {
  return (
    <div data-testid="groups-list">
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
      {!isLoading && records.length === 0 && <p>No groups found</p>}
    </div>
  )
}
