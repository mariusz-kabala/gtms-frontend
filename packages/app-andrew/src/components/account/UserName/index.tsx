import React, { FC, useState } from 'react'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { UserNameChangeForm } from './Form'

export const UserName: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false)

  return (
    <div
      className={additionalStyles}
      data-testid="user-name"
      onClick={() => (!isEditModeActive ? setIsEditModeActive(true) : null)}
    >
      <ExpandingItem
        isActive={isEditModeActive}
        label="Larry Ellison"
        onClose={() => {
          setIsEditModeActive(false)
        }}
      >
        <UserNameChangeForm />
      </ExpandingItem>
    </div>
  )
}
