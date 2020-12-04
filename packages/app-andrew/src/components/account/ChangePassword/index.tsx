import React, { FC, useState } from 'react'
import { MdLockOutline } from 'react-icons/md'
import { ChangePasswordForm } from './Form'
import { Button } from '@gtms/ui/Button'
import { Modal } from '@gtms/ui/Modal'
import styles from './styles.scss'

export const ChangePassword: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false)

  return (
    <div
      className={additionalStyles}
      data-testid="user-password-change"
      onClick={() => (!isEditModeActive ? setIsEditModeActive(true) : null)}
    >
      {isEditModeActive && (
        <Modal
          additionalStyles={styles.modal}
          onClose={() => setIsEditModeActive(false)}
        >
          <ChangePasswordForm onSuccess={() => setIsEditModeActive(false)} />
        </Modal>
      )}
      <Button
        additionalStyles={styles.btn}
        onClick={() => setIsEditModeActive(true)}
      >
        <i>
          <MdLockOutline />
        </i>{' '}
        Change password
      </Button>
    </div>
  )
}
