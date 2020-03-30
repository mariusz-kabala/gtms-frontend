import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import styles from './styles.scss'
import { Button } from '@gtms/ui/Button'
import { ChangeGroupName } from '../../components/group-settings/ChangeGroupName'

export const GroupSettingsPage: NextPage<{}> = () => {
  const { t } = useTranslation('groupSettings')

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

      <ChangeGroupName formData={{ name: 'Some Group Name' }} />
    </div>
  )
}

GroupSettingsPage.getInitialProps = () => {
  return {
    namespacesRequired: ['groupSettings'],
  }
}

export default GroupSettingsPage
