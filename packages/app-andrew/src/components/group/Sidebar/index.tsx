import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from '@gtms/commons/i18n'
import { getImage } from '@gtms/commons/helpers'
import { GroupAvatarNoImage } from 'enums'
import cx from 'classnames'
// state
import { groupQuery, IGroupState } from '@gtms/state-group'
// components
import { GroupAvatar } from 'components/group/GroupAvatar'
import { GroupSidebarContent } from './GroupSidebarContent'
// import { GroupDescription } from 'components/group/GroupDescription'
// ui
import { BsFillGridFill } from 'react-icons/bs'
import { Button } from '@gtms/ui/Button'
import styles from './styles.scss'

export const GroupSidebar: FC<{
  setShowPromoted: any
  showPromoted: boolean
  setShowUsers: any
  showUsers: boolean
}> = ({ setShowPromoted, showPromoted, showUsers, setShowUsers }) => {
  const [state, setState] = useState<IGroupState>(groupQuery.getValue())
  const { t } = useTranslation('groupPage')

  useEffect(() => {
    const sub = groupQuery.allState$.subscribe((value) => {
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
    <div className={styles.groupSidebar}>
      <div className={styles.avatarAndName}>
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
      {/* <GroupDescription
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
      /> */}
      <Button
        onClick={() => setShowPromoted(!showPromoted)}
        additionalStyles={cx(styles.tagsbutton, {
          [styles.active]: showPromoted,
        })}
      >
        <i>
          <BsFillGridFill />
        </i>
        <span>Tags</span>
      </Button>
      <Button
        onClick={() => setShowUsers(!showUsers)}
        additionalStyles={cx(styles.tagsbutton, {
          [styles.active]: showUsers,
        })}
      >
        <i>
          <BsFillGridFill />
        </i>
        <span>Users</span>
      </Button>
      <GroupSidebarContent />
    </div>
  )
}
