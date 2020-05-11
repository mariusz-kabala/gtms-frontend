import React, { FC, useState } from 'react'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { UserNameChangeForm } from './Form'

export const UserName: FC<{
  additionalStyles?: string
  name?: string
  surname?: string
}> = ({ additionalStyles, name, surname }) => {
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false)
  const getName = () => {
    if (!name && !surname) {
      return 'Your name is missing :('
    }

    return `${name} ${surname}`.trim()
  }
  return (
    <div
      className={additionalStyles}
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
