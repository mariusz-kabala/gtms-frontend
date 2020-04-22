import React, { FC, useState } from 'react'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { GroupDescriptionForm } from './Form'

export const GroupDescription: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false)

  return (
    <div
      className={additionalStyles}
      data-testid="group-edit-description"
      onClick={() => (!isEditModeActive ? setIsEditModeActive(true) : null)}
    >
      <ExpandingItem
        isActive={isEditModeActive}
        label="Here should be group description that is already added, it it's empty it should say add your group description"
        onClose={() => {
          setIsEditModeActive(false)
        }}
      >
        <GroupDescriptionForm onError={() => null} />
      </ExpandingItem>
    </div>
  )
}
