import React, { FC, useState } from 'react'
import styles from './styles.scss'
import { ToggleCheckbox } from '@gtms/ui/Forms/ToggleCheckbox'

export const PushNotifications: FC = () => {
  const [state, setState] = useState<boolean>(false)

  return (
    <div
      data-testid="push-notifications-switcher"
      className={styles.wrapper}
      onClick={() => setState(!state)}
    >
      <span className={styles.label}>Push notifications</span>
      <ToggleCheckbox checked={state} />
    </div>
  )
}
