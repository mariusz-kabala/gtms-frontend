import React, { FC, useState } from 'react'
import styles from './styles.scss'
import { ToggleCheckbox } from 'components/common/Forms/ToggleCheckbox'

export const PushNotifications: FC = () => {
  const [state, setState] = useState<boolean>(false)

  return (
    <div className={styles.wrapper}>
      <ToggleCheckbox checked={state} onChange={() => setState(!state)} />
      <span onClick={() => setState(!state)} className={styles.label}>
        push notifications{' '}
      </span>
    </div>
  )
}
