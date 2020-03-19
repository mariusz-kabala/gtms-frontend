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
        label="Change password"
        onClose={() => {
          setIsEditModeActive(false)
        }}
      >
        <ChangePasswordForm onSuccess={() => alert('success')} />
      </ExpandingItem>
    </div>
  )
}
