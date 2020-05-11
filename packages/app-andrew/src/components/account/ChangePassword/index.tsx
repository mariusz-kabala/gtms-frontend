import React, { FC, useState } from 'react'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { ChangePasswordForm } from './Form'

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
      <ExpandingItem
        isActive={isEditModeActive}
        closeOnClickOutsie={false}
        label="Change password"
        onClose={() => {
          setIsEditModeActive(false)
        }}
      >
        <ChangePasswordForm onSuccess={() => setIsEditModeActive(false)} />
      </ExpandingItem>
    </div>
  )
}
