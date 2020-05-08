import React, { FC, useState } from 'react'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { EmailChangeForm } from './Form'

export const UserEmail: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false)

  return (
    <div
      className={additionalStyles}
      data-testid="user-email"
      onClick={() => (!isEditModeActive ? setIsEditModeActive(true) : null)}
    >
      <ExpandingItem
        isActive={isEditModeActive}
        label="Larry@oracle.com"
        onClose={() => {setIsEditModeActive(false)}}
      >
        <EmailChangeForm />
      </ExpandingItem>
    </div>
  )
}
