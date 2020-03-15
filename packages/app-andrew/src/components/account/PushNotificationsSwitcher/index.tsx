import React, { FC } from 'react'
import { ToggleCheckbox } from '@gtms/ui/Forms/ToggleCheckbox'
import styles from './styles.scss'

export const PushNotificationsSwitcher: FC = () => {
  return (
    <div data-testid="push-notifications-switcher" className={styles.wrapper}>
      <ToggleCheckbox
        labelChecked="Notifications turned ON"
        labelUnchecked="Notifications turned OFF"
      />
    </div>
  )
}
