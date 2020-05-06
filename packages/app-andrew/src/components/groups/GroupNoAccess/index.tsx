import React, { FC } from 'react'
import { Button } from '@gtms/ui/Button'
import styles from './styles.scss'

export const GroupNoAccess: FC = () => {
  return (
    <div className={styles.wrapper} data-testid="group-no-access">
      <h2>ACCESS DENY</h2>
      <p>You have no access to see this group, fuck off</p>
      <Button>Delete Account</Button>
    </div>
  )
}
