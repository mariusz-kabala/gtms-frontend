import React, { FC } from 'react'
import { Button } from '@gtms/ui/Button'
import styles from './styles.scss'

export const GroupNotFound: FC = () => {
  return (
    <div className={styles.wrapper} data-testid="group-not-found">
      <h2>Group not found</h2>
      Consectetur esse officia dolor amet in dolor quis elit non eiusmod quis.
      <Button>Delete Account</Button>
    </div>
  )
}
