import React, { FC, useState } from 'react'
import { UserNameChangeForm } from './Form'
// ui
import { Modal } from '@gtms/ui/Modal'

export const UserName: FC<{
  name?: string
  surname?: string
}> = ({ name, surname }) => {
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false)
  const getName = () => {
    if (!name && !surname) {
      return 'Your name is missing :('
    }

    return `${name || ''} ${surname || ''}`.trim()
  }
  return (
    <div
      data-testid="user-name"
      onClick={() => (!isEditModeActive ? setIsEditModeActive(true) : null)}
    >
      <span>{getName()}</span>
      {isEditModeActive && (
        <Modal
          additionalStyles={styles.modal}
          onClose={() => {
            setIsEditModeActive(false)
          }}
        >
          <UserNameChangeForm
            name={name}
            surname={surname}
            onSaveSuccess={() => setIsEditModeActive(false)}
            onSaveFail={() => setIsEditModeActive(false)}
          />
        </Modal>
      )}
    </div>
  )
}
