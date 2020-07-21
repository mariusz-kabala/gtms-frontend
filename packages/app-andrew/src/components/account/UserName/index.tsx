import React, { FC, useState } from 'react'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { UserNameChangeForm } from './Form'

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
      <ExpandingItem
        isActive={isEditModeActive}
        label={getName()}
        closeOnClickOutsie={false}
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
      </ExpandingItem>
    </div>
  )
}
