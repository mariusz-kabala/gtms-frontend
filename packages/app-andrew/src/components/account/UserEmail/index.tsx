import React, { FC, useState } from 'react'
import { EmailChangeForm } from './Form'
// ui
import { Modal } from '@gtms/ui/Modal'
import styles from './styles.scss'

export const UserEmail: FC<{
  email: string
}> = ({ email }) => {
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false)

  return (
    <div
      className={styles.wrapper}
      data-testid="user-email"
      onClick={() => (!isEditModeActive ? setIsEditModeActive(true) : null)}
    >
      <span>{email}</span>
      {isEditModeActive && (
        <Modal onClose={() => setIsEditModeActive(false)}>
          <EmailChangeForm
            email={email}
            onSaveSuccess={() => {
              setIsEditModeActive(false)
            }}
            onSaveFail={() => {
              setIsEditModeActive(false)
              // todo show here error notification
            }}
          />
        </Modal>
      )}
    </div>
  )
}
