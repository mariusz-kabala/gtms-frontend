import React, { FC, useState } from 'react'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { EmailChangeForm } from './Form'

export const UserEmail: FC<{
  additionalStyles?: string
  email: string
}> = ({ additionalStyles, email }) => {
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false)

  return (
    <div
      className={additionalStyles}
      data-testid="user-email"
      onClick={() => (!isEditModeActive ? setIsEditModeActive(true) : null)}
    >
      <ExpandingItem
        isActive={isEditModeActive}
        closeOnClickOutsie={false}
        label={email}
        onClose={() => {
          setIsEditModeActive(false)
        }}
      >
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
      </ExpandingItem>
    </div>
  )
}
