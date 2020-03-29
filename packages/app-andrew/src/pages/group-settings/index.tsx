
import React, { useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import styles from './styles.scss'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { Button } from '@gtms/ui/Button'
import { GroupNameForm } from '../../components/group-settings/forms/GroupName'


interface GroupSettingsProps {
  groupDetails: {
    name: string
    description: string
  }
}

// interface TetherProps {
//   children: ReactNode
//   show: boolean
//   target: string
// }

export const GroupSettingsPage: NextPage<GroupSettingsProps> = ({
  groupDetails,
}) => {
  const [showEditGroupNameForm, setEditGroupName] = useState(false)
  const { t } = useTranslation('groupSettings')

  const editGroupName = () => {
    setEditGroupName(!showEditGroupNameForm)
  }

  const onEditGroupNameSubmit = (a: any) => {
    debugger;
    setEditGroupName(false)

  }

  return (
    <div className={styles.wrapper} data-testid="settings-page">
      <div className={styles.groupImage}>
        <img
          src="https://images.unsplash.com/photo-1464863979621-258859e62245"
          alt={t('groupImage')}
          className={styles.image}
        />
        <Button additionalStyles={styles.changeImage}>Change image</Button>
      </div>

      <div id="groupName" className={styles.groupInput} onClick={editGroupName}>
        <ExpandingItem
          isActive={showEditGroupNameForm}
          label="Group Name"
          additionalStyles={styles.groupName}
          onClose={() => {
            console.log('onClose')
          }}
        >
          <GroupNameForm />
        </ExpandingItem>
      </div>

      <div className={styles.groupInput} onClick={editGroupName}>
        Some Props
      </div>

      <div className={styles.groupInput} onClick={editGroupName}>
        Some Props
      </div>

      {/*<div className={styles.buttons}>
        <Button additionalStyles={`${styles.button} ${styles.delete}`}>DELETE GROUP</Button>
        <Button additionalStyles={styles.button}>SAVE CHANGES</Button>
      </div>*/}
    </div>
  )
}

GroupSettingsPage.getInitialProps = () => {
  return {
    namespacesRequired: ['groupSettings'],
    groupDetails: {
      name: '',
      description: '',
    },
  }
}

export default GroupSettingsPage
