import React, { FC, useRef, useState, useEffect } from 'react'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { getImage } from '@gtms/commons/helpers'
import { GroupAvatarNoImage } from 'enums'
// state
import { groupQuery } from '@gtms/state-group'
import {
  IGroupSidebarState,
  groupSidebarState,
  groupSidebarState$,
} from './state.query'
// components
import { GroupAvatar } from 'components/group/GroupAvatar'
import { GroupDescription } from 'components/group/GroupDescription'
// styles
import styles from './styles.scss'

export const GroupSidebar: FC<{}> = ({ children }) => {
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
        <div className={styles.avatarNameDesc}>
          <div className={styles.avatarName}>
            <GroupAvatar
              additionalStyles={styles.groupAvatar}
              files={getImage('50x50', state.group.avatar, GroupAvatarNoImage)}
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
        {children}
      </div>
    </div>
  )
}
