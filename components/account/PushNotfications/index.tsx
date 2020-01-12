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
      <ToggleCheckbox checked={state} />
      <span className={styles.label}>push notifications</span>
    </div>
  )
}
