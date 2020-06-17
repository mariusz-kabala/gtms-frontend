import React, { FC, useState } from 'react'
import { IGroup } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { Picture } from '@gtms/ui/Picture'
import { GroupAvatarNoImage } from 'enums'
import cx from 'classnames'
import styles from './styles.scss'

enum Tabs {
  groupsMember,
  groupsAdmin,
  groupsOwner,
}

const GroupsList: FC<{ groups: IGroup[] }> = ({ groups }) => {
  return (
    <div>
      <ul>
        {groups.map((group) => (
          <li key={`group-${group.id}`}>
            <Picture
              {...getImage('200x200', group.avatar, GroupAvatarNoImage)}
            />
            <h3>{group.name}</h3>
            <p>
              czlonkow: {group.membersCounter} / postow: {group.postsCounter}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const Groups: FC<{
  groupsMember: IGroup[]
  groupsAdmin: IGroup[]
  groupsOwner: IGroup[]
}> = ({ groupsMember, groupsAdmin, groupsOwner }) => {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.groupsMember)

  return (
    <div data-testid="user-groups" className={styles.wrapper}>
      <nav>
        <ul>
          <li
            className={cx({
              [styles.currentTab]: currentTab === Tabs.groupsMember,
            })}
          >
            <a onClick={() => setCurrentTab(Tabs.groupsMember)}>my groups</a>
          </li>
          <li
            className={cx({
              [styles.currentTab]: currentTab === Tabs.groupsAdmin,
            })}
          >
            <a onClick={() => setCurrentTab(Tabs.groupsAdmin)}>as admin</a>
          </li>
          <li
            className={cx({
              [styles.currentTab]: currentTab === Tabs.groupsOwner,
            })}
          >
            <a onClick={() => setCurrentTab(Tabs.groupsOwner)}>as owner</a>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>
        {currentTab === Tabs.groupsMember && groupsMember.length > 0 && (
          <GroupsList groups={groupsMember} />
        )}
        {currentTab === Tabs.groupsMember && groupsMember.length === 0 && (
          <p>User did not join any group yet</p>
        )}

        {currentTab === Tabs.groupsAdmin && groupsAdmin.length > 0 && (
          <GroupsList groups={groupsAdmin} />
        )}
        {currentTab === Tabs.groupsAdmin && groupsAdmin.length === 0 && (
          <p>User has no admin rights</p>
        )}

        {currentTab === Tabs.groupsOwner && groupsOwner.length > 0 && (
          <GroupsList groups={groupsOwner} />
        )}
        {currentTab === Tabs.groupsOwner && groupsOwner.length === 0 && (
          <p>User did not create any group</p>
        )}
      </div>
    </div>
  )
}
