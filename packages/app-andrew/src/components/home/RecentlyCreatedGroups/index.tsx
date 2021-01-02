import React, { FC } from 'react'
import cx from 'classnames'
import { IGroup } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { GroupAvatarNoImage } from 'enums'
import { showGroupPreview } from 'state/groupPreview'
// ui
import { GridCard } from '@gtms/ui/GridCard'
import { CreateYourOwnGroup } from '@gtms/ui/CreateYourOwnGroup'
// styles
import styles from './styles.scss'

export const RecentlyCreatedGroups: FC<{
  groups: IGroup[]
  additionalStyles?: string
  createYourOwnGroup?: boolean
}> = ({ additionalStyles, groups, createYourOwnGroup = false }) => {
  const groupsToRender: Array<IGroup | null> =
    createYourOwnGroup && groups.length > 0 ? [...groups] : groups

  if (createYourOwnGroup && groups.length) {
    groupsToRender.splice(groups.length / 2, 0, null)
  }

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="recently-created-groups"
    >
      {groupsToRender && groupsToRender.length > 0 && (
        <ul className={styles.items}>
          {groupsToRender.map((group) => {
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
                  image={getImage('200x200', group.avatar, GroupAvatarNoImage)}
                  name={group.name}
                  onClick={() => showGroupPreview(group)}
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
