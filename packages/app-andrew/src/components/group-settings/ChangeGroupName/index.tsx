import React, { FC, useState } from 'react'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { GroupNameForm } from './Form'
import { ChangeGroupNameProps, GroupNameData } from './interfaces'

export const ChangeGroupName: FC<ChangeGroupNameProps> = ({
  additionalStyles,
  formData,
}) => {
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false)

  const onSubmit = (formData: GroupNameData) => {
    setIsEditModeActive(false)
    alert(JSON.stringify(formData))
  }

  return (
    <div
      className={additionalStyles}
      data-testid="group-name"
      onClick={() => (!isEditModeActive ? setIsEditModeActive(true) : null)}
    >
      <ExpandingItem
        isActive={isEditModeActive}
        label={formData.name}
        onClose={() => setIsEditModeActive(false)}
        contentLabel="Edit Group Name"
      >
        <GroupNameForm formData={formData} onSubmit={onSubmit} />
      </ExpandingItem>
    </div>
  )
}
