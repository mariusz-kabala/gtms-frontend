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
