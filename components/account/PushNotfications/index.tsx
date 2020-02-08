import React, { FC, useState } from 'react'
import styles from './styles.scss'
import { ToggleCheckbox } from 'components/common/Forms/ToggleCheckbox'

export const PushNotifications: FC = () => {
  const [state, setState] = useState<boolean>(false)

  return (
    <div
      className={styles.wrapper}
      onClick={() => setState(!state)}
      data-testid="pushNotifications"
    >
      <span className={styles.label}>Push notifications</span>
      <ToggleCheckbox checked={state} />
    </div>
  )
}
