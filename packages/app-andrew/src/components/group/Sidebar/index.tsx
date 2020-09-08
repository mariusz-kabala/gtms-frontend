import React, { FC, useRef, useState, useEffect } from 'react'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
// state
import { groupQuery } from '@gtms/state-group'
import {
  IGroupSidebarState,
  groupSidebarState,
  groupSidebarState$,
} from './state.query'
import { toggleGroupSidebar } from 'state'
// components
import { FavsButton } from 'components/group/FavsButton'
import { FollowButton } from 'components/group/FollowButton'
import { GroupAvatar } from 'components/group/GroupAvatar'
import { GroupDescription } from 'components/group/GroupDescription'
import { GroupMembers } from 'components/group/GroupMembers'
import { JoinLeaveButton } from 'components/group/JoinLeaveButton'
import { SettingsButton } from 'components/group/SettingsButton'
// ui
import { Button } from '@gtms/ui/Button'
import { SearchBar } from '@gtms/ui/SearchBar'
import { IoMdGrid } from 'react-icons/io'
import { GoDatabase, GoGitCompare, GoRepoForked, GoGift } from 'react-icons/go'
// styles
import styles from './styles.scss'

export const GroupSidebar: FC<{}> = () => {
  const [state, setState] = useState<IGroupSidebarState>(groupSidebarState())
  const groupHeaderRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('groupPage')

  useEffect(() => {
    const sub = groupSidebarState$.subscribe((value) => {
      setState(value)
    })

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (!state.group) {
    return null
  }

  return (
    <div
      className={cx(styles.groupSidebar, {
        [styles.active]: state.isOpen,
      })}
      ref={groupHeaderRef}
    >
      <div className={styles.makeItSticky}>
        <div className={styles.avatarNamedDesc}>
          <div className={styles.avatarName}>
            <GroupAvatar
              additionalStyles={styles.groupAvatar}
              files={groupQuery.getAvatar('50x50', state)}
              filesStatus={groupQuery.getAvatarFileStatus()}
              isEditAllowed={groupQuery.hasAdminRights()}
            />
            <h2
              className={styles.header}
              data-tip={t('click-here-to-edit')}
              data-type="dark"
            >
              {state.group?.name}
            </h2>
          </div>
          <GroupDescription
            additionalStyles={styles.desc}
            isEditAllowed={groupQuery.hasAdminRights()}
            slug={state.group?.slug || ''}
            text={
              !state.group?.description
                ? groupQuery.hasAdminRights()
                  ? 'you did not add group description yet, click here to change it'
                  : ''
                : state.group?.description || ''
            }
          />
        </div>
        <div className={styles.actionButtons}>
          <FavsButton group={state.group} />
          <JoinLeaveButton group={state.group} />
          <SettingsButton group={state.group} />
          <FollowButton group={state.group} />
        </div>
        <Button
          additionalStyles={cx(styles.btnTags, {
            [styles.active]: false,
          })}
          onClick={() => alert('how will this work?')}
        >
          <i>
            <IoMdGrid />
          </i>
          <span>Tags</span>
        </Button>
        <ul className={styles.navmock}>
          <li className={styles.item}>
            <i>
              <GoDatabase />
            </i>
            <span>Users</span>
          </li>
          <li className={styles.item}>
            <i>
              <GoGitCompare />
            </i>
            <span>Tags</span>
          </li>
          <li className={styles.item}>
            <i>
              <GoRepoForked />
            </i>
            <span>Settings</span>
          </li>
          <li
            className={styles.item}
            onClick={() => state.group && toggleGroupSidebar(state.group.id)}
          >
            <i>
              <GoGift />
            </i>
            <span>Posts</span>
          </li>
        </ul>
        <GroupMembers
          additionalStyles={styles.groupMembers}
          {...state.members}
        />
        <div className={styles.searchInput}>
          <div className={styles.search}>
            <SearchBar
              onTagAdd={() => null}
              onTagRemove={() => null}
              onLoadSuggestion={() => null}
              onQueryChange={() => null}
              onLoadSuggestionCancel={() => null}
              tags={state.activeTags || []}
              users={state.activeUsers}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
